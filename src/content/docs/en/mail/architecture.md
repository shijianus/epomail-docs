---
title: EpoCanvas Mail Technical Architecture
description: EpoCanvas Mail technical architecture — the Cloudflare edge deployment topology, dual-database isolation, the three-mode encryption scheme, the attachment storage chain, the role and permission model, mail lifecycle, and application security design.
---

**Updated: November 2, 2026 | Version: 5.21**

This page documents how EpoCanvas Mail is built: the deployment topology, data encryption, storage chains, the permission model, and the mail lifecycle. Every technical statement follows the actual open-source implementation and can be audited directly; the privacy implications for individuals and the statutory notices are covered in [Data Processing & Security Maintenance](/en/mail/data-security/) and the [Privacy Policy](/en/mail/privacy-policy/).

The Traditional Chinese (Taiwan) version of the legal documents on this site is the authoritative version; other languages are reference translations. Where meanings diverge, the authoritative version prevails.

![EpoCanvas Mail system architecture: the client layer (web app, Android app, OAuth third-party apps) connects through the Cloudflare edge; Workers host the API, inbound mail parsing, and AI capabilities, with outbound delivery via Resend and Telegram; data lands in the dual D1 databases, KV, and object storage](/images/mail/en/project-architecture.svg)

*Caption: clients connect through the edge; Email Routing receives and parses incoming mail, and configured channels deliver outgoing mail. Data may also reach external storage and services; see the [Sub-processor List](/en/mail/sub-processors/).*

## 1. Deployment Topology

| Component | Implementation |
| --- | --- |
| Compute | Cloudflare Workers (V8 Isolate sandbox) processes requests; the server can access plaintext during processing. The source does not guarantee sandbox destruction or erasure of all plaintext when a request ends |
| Inbound | Cloudflare Email Routing receives mail; postal-mime parses body, headers, and attachments |
| Outbound | three channels resolved in order: the Cloudflare Email Workers binding, the Resend API, and Mailjet; mail between local mailboxes is written to the database directly |
| Structured storage | Cloudflare D1 supports separate user and mail databases, with a single-database fallback; the user database holds accounts, roles and settings, and the mail database holds mail, stars and attachment metadata. Live bindings require separate verification |
| Key-value storage | Workers KV: session tokens, login risk counters, TOTP intermediate state, user profiles, and the object-storage fallback |
| Edge inference | Workers AI (code extraction and similar; llama-3.1-8b-instruct by default) |
| Scheduled jobs | Daily at 16:00 UTC (00:00 the next day in Taiwan): clear verification counters, reset sending counts, clean trash and unbound OAuth identities, and refresh analytics. Every 5 minutes: process notices and object deletions. A 30-minute branch exists but is not registered in the repository configuration |
| Human verification | Cloudflare Turnstile (HTTP API verification, on registration and new mailboxes) |

## 2. Technology Stack

| Layer | Technology |
| --- | --- |
| Client | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie (local drafts, never on the server), Vite 7, vite-plugin-pwa |
| Login surface | React 18, Tailwind CSS 4, Vite 6 (built separately, shipped with the front-end bundle) |
| Server | Hono 4.12, Drizzle ORM, postal-mime, i18next, Resend SDK |
| Interface assets | 300+ offline vector icons (zero external requests), light and dark themes, six-language dictionaries |

## 3. Data Encryption Scheme

- **Three storage modes**: All-Mail leaves mail fields unencrypted; Privacy selects encryption according to spam, trash and unassigned status; Encrypted encrypts selected fields. The scope is `subject/content/text/code`, not all data; see [Data Processing & Security Maintenance](/en/mail/data-security/);
- **Mail encryption**: AES-256-GCM uses a random 12-byte IV, with per-user keys derived through HKDF-SHA256. Key sources are `email_enc_key`, then `totp_enc_key`, then `jwt_secret`; if all are missing, encryption fails rather than using a built-in default key;
- **Credential protection**: new passwords default to salted PBKDF2-HMAC-SHA256 with 210,000 iterations; this is configurable and older hashes are upgraded at login. Enabled TOTP secrets use AES-256-GCM; recovery codes have both SHA-256 hashes and an encrypted copy of the original codes; passkeys store public keys and credential metadata. Temporary authentication data and other storage exceptions are covered in [Data Processing & Security Maintenance](/en/mail/data-security/);
- **Boundary**: the above is server-side encryption at rest, not end-to-end encryption; attachments are outside the encryption scope.

## 4. Attachment Storage Chain

Attachment storage resolves in order: user S3 → operator S3 → Cloudflare R2 → KV fallback. Metadata lives in D1; downloads use signed links and defensive headers. Physical mail deletion removes attachment metadata and queues object deletion, with remaining-reference checks; automatic retries stop after 10 failures. This does not guarantee simultaneous deletion of every object. External copies are covered in the [Sub-processor List](/en/mail/sub-processors/).

## 5. Sessions and Role Permissions

JWTs (HS256) default to 30 days. KV stores a session allowlist and a user snapshot with some sensitive fields removed. The code checks whether the count exceeds 10 before adding a session, so it can normally retain 11, not a strict maximum of 10; activity or some operations can renew or shorten the KV lifetime. Logout removes the current session, and deactivation deletes the account session record. Permissions follow RBAC with six seeded roles:

| Role | Daily send | Storage quota | Attachments | Additional powers |
| --- | --- | --- | --- | --- |
| Visitor | prohibited | 0 | no | read-only sandbox |
| Base user | 5 messages | 5 MB | no | basic mail |
| Base user LV.0 | 8 messages | 10 MB | no | blog-level linkage upgrade |
| Base user LV.1 | 10 messages | 25 MB | yes | basic mail with attachments |
| Administrator | 100 messages | 500 MB | yes | user management, all-mail management (constrained by mail mode) |
| Master | unlimited | 1024 MB | yes | full permissions |

Protected routes check JWTs, KV sessions and applicable role permissions; some public endpoints have separate verification. Deactivation deletes normal session records without synchronously clearing every grant, data item or third-party copy.

## 6. Mail Lifecycle

| Stage | Behaviour |
| --- | --- |
| Deletion | Normal deletion sets `is_del=1`; the daily job clears trash when `email.create_time` is older than 7 days, not 7 days after moving to trash. Explicit permanent deletion or quota conditions can trigger physical deletion directly |
| Spam quarantine | `spamRetentionDays` defaults to 7 days from mail creation; mail moves to trash and may meet the physical-deletion condition in the same run |
| Quota cleanup | When the user requests deletion and existing storage usage strictly exceeds 90% of quota, selected mail is physically deleted; no background purge is triggered solely by reaching 90% |
| Official mail | Reading the mail list marks expired messages from designated official senders as deleted, using creation time and `welcomeExpireDays` (default 7 days); the trash job handles later physical cleanup |
| Cascade deletion | Normal permanent deletion and trash cleanup remove attachment metadata and stars and queue object-deletion retries; coverage differs between administrator bulk-deletion paths |
| Account deactivation | Only the user row is marked deleted and sessions removed; mailbox, mail and profile records are not marked deleted together. No automatic physical deletion 90 days later is scheduled; see the [Privacy Policy](/en/mail/privacy-policy/) |

## 7. Application Security Design

- **Anti-enumeration routing**: mail URLs always use 20-character HMAC-SHA256-signed random hashes bound to the user and tenant, never exposing auto-increment IDs — enumeration and BOLA/IDOR are designed out;
- **Triple XSS defence**: DOMPurify allowlist sanitisation, body-style injection filtering, and attachment output behind a MIME allowlist with strict CSP and `nosniff`;
- **SSRF blocking**: outbound requests are checked against public addresses; loopback, RFC 1918, and cloud-metadata addresses are rejected outright;
- **Login protection**: failures are counted per entered login identifier; 5 failures block login and each failure writes a 12-hour TTL. This is not an atomic account lock shared by every alias. Turnstile and TOTP / Passkey verification also apply;
- **Official-mail integrity**: official sender identity locking, immutable snapshot delivery, and document anti-tampering checks — see [Anti-Tampering & Official Specs](/en/mail/tamper-proof/).

## 8. Observability and Quality Assurance

- The repository enables Cloudflare observability; D1 / KV also hold identity operations, reports, decisions and login-environment data. Most audit records have no expiry job; platform log retention requires verification. See the [Privacy Policy](/en/mail/privacy-policy/);
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
