---
title: EpoCanvas Mail Technical Architecture
description: EpoCanvas Mail technical architecture — the Cloudflare edge deployment topology, dual-database isolation, the three-mode encryption scheme, the attachment storage chain, the role and permission model, mail lifecycle, and application security design.
---

**Effective Date: October 5, 2026 | Version: 5.12**

This page documents how EpoCanvas Mail is built: the deployment topology, data encryption, storage chains, the permission model, and the mail lifecycle. Every technical statement follows the actual open-source implementation and can be audited directly; the privacy implications for individuals and the statutory notices are covered in [Data Processing & Security Maintenance](/en/mail/data-security/) and the [Privacy Policy](/en/mail/privacy-policy/).

The Traditional Chinese (Taiwan) version of the legal documents on this site is the authoritative version; other languages are reference translations. Where meanings diverge, the authoritative version prevails.

![EpoCanvas Mail system architecture: the client layer (web app, Android app, OAuth third-party apps) connects through the Cloudflare edge; Workers host the API, inbound mail parsing, and AI capabilities, with outbound delivery via Resend and Telegram; data lands in the dual D1 databases, KV, and object storage](/images/mail/en/project-architecture.svg)

*Caption: system architecture. Clients connect through the edge with no single-point server; inbound mail is received by Email Routing and parsed; outbound mail goes through delivery channels; all state lives inside the deployer's own Cloudflare resources.*

## 1. Deployment Topology

| Component | Implementation |
| --- | --- |
| Compute | Cloudflare Workers (V8 Isolate sandbox): stateless business logic, plaintext exists only in request memory and is released when the request ends |
| Inbound | Cloudflare Email Routing receives mail; postal-mime parses body, headers, and attachments |
| Outbound | three channels resolved in order: the Cloudflare Email Workers binding, the Resend API, and Mailjet; mail between local mailboxes is written to the database directly |
| Structured storage | Cloudflare D1 (dual-database physical isolation: the user database holds accounts, roles, and settings; the mail database holds mail, stars, and attachment metadata; single-database deployments remain 100% backward compatible; the hosted instance currently runs on a single database) |
| Key-value storage | Workers KV: session tokens, login risk counters, TOTP intermediate state, user profiles, and the object-storage fallback |
| Edge inference | Workers AI (code extraction and similar; llama-3.1-8b-instruct by default) |
| Scheduled jobs | Cron triggers run every 30 minutes to refresh the analytics cache; daily runs clear risk-control counters, reset daily send counters, purge trash and spam, and remove unbound OAuth accounts |
| Human verification | Cloudflare Turnstile (HTTP API verification, on registration and new mailboxes) |

## 2. Technology Stack

| Layer | Technology |
| --- | --- |
| Client | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie (local drafts, never on the server), Vite 7, vite-plugin-pwa |
| Login surface | React 18, Tailwind CSS 4, Vite 6 (built separately, shipped with the front-end bundle) |
| Server | Hono 4.12, Drizzle ORM, postal-mime, i18next, Resend SDK |
| Interface assets | 300+ offline vector icons (zero external requests), light and dark themes, six-language dictionaries |

## 3. Data Encryption Scheme

- **Three-mode encryption at rest**: All-Mail mode (no encryption), Privacy mode (everything except spam and trash is encrypted), and Encrypted mode (everything encrypted); mode semantics and administrator visibility are in [Data Processing & Security Maintenance](/en/mail/data-security/), Section 1.3;
- **Mail encryption**: subject and body are encrypted with AES-256-GCM (authentication tag included) using a per-record random initialisation vector; keys derive from the instance-level master-key environment variable via HKDF-SHA256 with a per-user salt, and the master key never enters the database or the codebase;
- **Credential protection**: passwords are hashed with PBKDF2-HMAC-SHA256 at 100,000 iterations with a per-user salt; TOTP secrets are encrypted at rest with AES-256-GCM, backup codes are stored only as SHA-256 hashes, and passkeys store only the public key;
- **Boundary**: the above is server-side encryption at rest, not end-to-end encryption; attachments are outside the encryption scope.

## 4. Attachment Storage Chain

Attachment binaries are stored through the following resolution order: bring-your-own S3-compatible storage (BYOS — AWS S3, Backblaze B2, MinIO, among others) → the operator-configured S3-compatible storage → the Cloudflare R2 binding → Cloudflare KV by default. Metadata (filename, MIME type, size) lives in D1; downloads carry defensive headers and a MIME allowlist; deleting a mail cascades to its attachments through reference counting.

## 5. Sessions and Role Permissions

Sessions are JWTs (HS256) valid for 30 days, held in KV and deeply de-identified; each account keeps at most 10 active sessions, and logout or deactivation revokes them immediately. Permissions follow RBAC with six seeded roles:

| Role | Daily send | Storage quota | Attachments | Additional powers |
| --- | --- | --- | --- | --- |
| Visitor | prohibited | 0 | no | read-only sandbox |
| Base user | 5 messages | 5 MB | no | basic mail |
| Base user LV.0 | 8 messages | 10 MB | no | blog-level linkage upgrade |
| Base user LV.1 | 10 messages | 25 MB | yes | basic mail with attachments |
| Administrator | 100 messages | 500 MB | yes | user management, all-mail management (constrained by mail mode) |
| Master | unlimited | 1024 MB | yes | full permissions |

All administrative and business routes pass a single authorisation gateway; public endpoints (login, registration, OAuth, init) are exempt; account deletion revokes sessions immediately.

## 6. Mail Lifecycle

| Stage | Behaviour |
| --- | --- |
| Deletion | deleted mail enters trash first (soft delete) and is hard-deleted by a scheduled task 7 days after receipt (attachments and indexes included) |
| Spam quarantine | spam is kept for 7 days and then moves to trash; the quarantine period is configurable |
| Quota cleanup | when mailbox usage passes 90% of quota, mail already marked as deleted is hard-deleted immediately |
| Official mail | welcome mail and global announcements expire after 7 days by default (configurable) |
| Cascade deletion | hard deletion runs in chunks (avoiding the D1 per-statement bound-parameter limit), with attachments and stars removed alongside the mail |
| Account deactivation | sessions are revoked immediately and data enters a soft-deleted state until an administrator performs the hard deletion (the time commitment is in [Privacy Policy](/en/mail/privacy-policy/), Section 8) |

## 7. Application Security Design

- **Anti-enumeration routing**: mail URLs always use 20-character HMAC-SHA256-signed random hashes bound to the user and tenant, never exposing auto-increment IDs — enumeration and BOLA/IDOR are designed out;
- **Triple XSS defence**: DOMPurify allowlist sanitisation, body-style injection filtering, and attachment output behind a MIME allowlist with strict CSP and `nosniff`;
- **SSRF blocking**: outbound requests are checked against public addresses; loopback, RFC 1918, and cloud-metadata addresses are rejected outright;
- **Login protection**: 5 consecutive failures lock the account for 12 hours; Turnstile human verification; TOTP / Passkey two-step verification;
- **Official-mail integrity**: official sender identity locking, immutable snapshot delivery, and document anti-tampering checks — see [Anti-Tampering & Official Specs](/en/mail/tamper-proof/).

## 8. Observability and Quality Assurance

- Runtime logs are collected by Cloudflare Workers Logs (the application keeps no self-hosted logs beyond that); the analytics page presents statistical aggregates only, with no content-level data;
- More than a hundred automated test, audit, and inspection scripts: Playwright full-stack browser regression, public-network end-to-end assertions, repository-wide static scanning, and the six-language i18n audit trio (see [Project Overview](/en/mail/project/), Section 7).

## 9. Related Documents

| Resource | Link |
| --- | --- |
| Operating Modes: deployment forms, mail modes and sign-in | [Operating Modes](/en/mail/modes/) |
| Settings Guide: personal settings and the admin console | [Settings Guide](/en/mail/settings/) |
| Feature walkthrough with screenshots | [Feature Guide](/en/mail/features/) |
| Positioning and development history | [Project Overview](/en/mail/project/) |
| Encryption semantics, retention, and rights | [Data Processing & Security Maintenance](/en/mail/data-security/) |
| Official mail specs and anti-tampering checks | [Anti-Tampering & Official Specs](/en/mail/tamper-proof/) |
