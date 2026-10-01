---
title: Official Mail Specification & Anti-Tampering Architecture
description: EpoCanvas Mail official system email specifications, 16 tiered security notifications, sender anti-spoofing, immutable delivery, client sandboxing, and document integrity verification.
---

# Official Mail Specification & Anti-Tampering Architecture

**Effective Date: October 1, 2026 | Version: 5.5**

Pursuant to the [Privacy & Terms Overview](/mail/overview/) and [Data Processing & Security](/mail/data-security/), this document specifies the official email issuance framework, security notification notice standards, edge sender anti-spoofing, immutable snapshot delivery, client-side sandbox isolation, and cryptographic document tamper-proof verification mechanisms for EpoCanvas Mail. This specification establishes what constitutes authentic official documentation and provides verifiable technical baseline standards for users and regulatory authorities.

The formal benchmark version of all legal and technical documents on this site is the Traditional Chinese (Taiwan) version; other language versions are provided for reference only. In case of discrepancy, the Traditional Chinese version shall prevail.

![EpoCanvas Mail Anti-Tampering and Official Authentication Architecture: Edge sender anti-spoofing, immutable delivery pipeline, client-side Shadow DOM sandbox physical isolation, and SHA-256 cryptographic manifest](/images/mail/anti-tamper-architecture.svg)

*Figure: System anti-tampering and official authentication architecture. Tier 1 locks official sender identity at the edge and prevents unauthorized spoofing; Tier 2 solidifies immutable delivery snapshots with AES-256-GCM static storage; Tier 3 enforces Shadow DOM client isolation and live in-browser Web Crypto SHA-256 integrity verification.*

## 1. Official Sender Protection & Authentication

To eliminate phishing and sender forgery risks, the service implements a dedicated edge privileged isolation channel separating official system communications from regular user traffic:

1. **Exclusive Official Sender Lock**: All system welcome emails, global operational announcements, and security notices are strictly and exclusively issued from the certified address `announcement@epocanvas.com`;
2. **Edge Anti-Spoofing Gatekeeper**: Cloudflare Workers edge gateway and inbound routing enforce hardcoded filtration. Any external sender, unauthorized connection, or unprivileged internal API attempting to dispatch mail as `announcement@epocanvas.com` is immediately blocked at the edge with HTTP 403 Forbidden;
3. **Certified Badge & Official Checkmark (`isOfficial: 1`)**: Only emails generated through privileged system pipelines receive the tamper-proof `isOfficial = 1` flag, causing the frontend reading pane to automatically render the verified blue shield badge and official banner;
4. **Lifecycle & Retention Principles**: Onboarding system notices are tagged as action items and automatically purged after 7 days; critical security alerts are permanently archived in the database, exempt from routine TTL pruning.

## 2. Security Notification Notice Specifications (16 Events)

The service incorporates critical user and system state mutations into a 4-tier security defensive ladder (Level 1 to Level 4), establishing a real-time notification matrix covering 16 discrete security events. Layouts adhere to a modern de-AI minimalist engineering aesthetic, integrating inline SVG shield vectors, dual-action guidance cards (legitimate action confirmation vs. unauthorized incident remediation), and dark-themed security center action buttons:

| Level | Event Code | Trigger Scenario & Security Context | Injected Metadata & Parameters | Auto Star |
| --- | --- | --- | --- | --- |
| L1 | NEW_DEVICE_LOGIN | First sign-in from an unrecognized device or browser | Timestamp, IP, Location, Device Name, Browser | No |
| L1 | NEW_LOCATION_LOGIN | Sign-in from a new city or country boundary | Timestamp, IP, Country & City, ISP Network | No |
| L1 | NEW_NETWORK_LOGIN | Sign-in from a new Autonomous System (ASN) or ISP | Timestamp, IP, ASN Number, Network Org Name | No |
| L2 | PASSWORD_CHANGED | Account login password successfully updated | Timestamp, IP, Location, Device & Browser | No |
| L2 | PAT_CREATED | New Personal Access Token generated for API access | Token Name, Granted Scopes, Expiration Days | No |
| L2 | PAT_REVOKED | Personal Access Token revoked manually or expired | Token Name, Revocation Time, Client Device | No |
| L2 | OAUTH_AUTHORIZED | Third-party OAuth 2.0 client granted mailbox access | Application Name, Scopes, Client Identifier | No |
| L2 | OAUTH_REVOKED | Third-party OAuth 2.0 application access revoked | Application Name, Revocation Time, Client Info | No |
| L3 | TOTP_ENABLED | Two-Factor Authentication (RFC 6238) enabled | Timestamp, IP, Generated Time, Backup Status | Yes |
| L3 | TOTP_DISABLED | Two-Factor Authentication disabled (single factor) | Timestamp, IP, Device, Remediation Guidance | Yes |
| L3 | PASSKEY_ADDED | New Passkey (FIDO2 / WebAuthn) credential registered | Passkey Name, Authenticator Type, Time | Yes |
| L3 | PASSKEY_REMOVED | Existing Passkey credential unregistered | Passkey Name, Removal Time, Client Device | Yes |
| L3 | AUTO_FORWARD_CHANGED | Email auto-forwarding rule configured or modified | Target Address, Rule Filters, Enabled State | Yes |
| L3 | STORAGE_PURGED | Bring-Your-Own Storage (BYO) configuration reset | Reset Timestamp, Operator IP, Fallback State | Yes |
| L4 | ACCOUNT_LOCKED | Consecutive failed sign-in threshold reached (12h) | Failed Attempts, Lockout Hours, IP, Unlock Steps | Yes |
| L4 | ACCOUNT_DELETED | Account deletion scheduled or physical purge initiated | Request Timestamp, Alias Count, Purge Due | Yes |

To protect users against alert fatigue, an environmental fingerprint baseline (retaining the 15 most recent devices, locations, and networks) is maintained in KV, enforcing a 1-hour quiet debounce window for identical events.

## 3. Immutable Delivery & Client Sandbox Protection

Official communications execute through immutable transfer protocols and client-side security sandboxes to ensure messages cannot be intercepted or modified:

1. **Immutable Delivery Snapshot**: System emails are rendered and solidified into the database at transmission time, remaining unmutated even if the recipient later toggles UI display languages;
2. **Pre-rendered Translation Fallback**: The multilingual engine pre-compiles official templates. When email content matches standard templates, verified translations are served directly; modifications smoothly fall back to full AI translation;
3. **Client-side Shadow DOM Isolation**: The web client renders email bodies within an isolated Shadow DOM container, preventing parent styles and global scripts from penetrating;
4. **DOMPurify Strict Whitelist Sanitization**: Tags such as `<script>`, `<style>`, `<iframe>`, `<object>`, `<embed>`, `<form>`, and all inline event handlers are stripped, thwarting XSS and UI redress attacks.

## 4. Documentation Anti-Tampering & Integrity Verification

The official documentation site (`epomail-docs`) employs an open cryptographic hash verification framework, empowering users to verify document authenticity online or offline:

| Defensive Dimension | Implementation Mechanism | Verification Standard | Target Threat Scenario |
| --- | --- | --- | --- |
| Deterministic Manifest | `public/tamper-proof.json` | SHA-256 Content Hash & Byte Length | Mirror tampering, malicious doc substitution |
| Version Traceability | Git Commit Tree Object | Git Commit SHA & Author PGP Signature | Silent tampering, unauthorized revisionism |
| In-browser Verification | Web Crypto API In-Memory | `crypto.subtle.digest('SHA-256')` | MITM injection, CDN cache poisoning |
| Offline Terminal Audit | OpenSSL / sha256sum Tooling | Raw Markdown Local Hash Comparison | Offline audits, regulatory compliance checks |
| Authoritative Origin | `https://docs.epocanvas.com/epomail` | DNSSEC Validation & Strict TLS | Imposter websites, phishing doc portals |

:::tip[Live Verification Guide]
An interactive "🛡️ Official Tamper-Proof & Integrity Verification" card is embedded at the base of every documentation page. Clicking "🔍 Verify Page Integrity Live" computes the live in-memory SHA-256 digest and cross-checks it against the official manifest. Users may also run `curl -sSL https://docs.epocanvas.com/epomail/tamper-proof.json | jq .` in terminal environments.
:::

## 5. Responsibilities & Security Incident Notification

1. **Hosted Instance Responsibilities**: Official system email issuance, sender verification, and documentation integrity on `mail.epocanvas.com` are maintained by the core operations team;
2. **Self-hosted Responsibilities**: Operators deploying independent instances configure their own Cloudflare resources and must safeguard secrets per [Data Processing & Security](/mail/data-security/) to prevent unauthorized access;
3. **Reporting & Support Channels**: In the event of forged official emails, integrity verification failures, or vulnerabilities, contact:
   - Official Security Center & Notification Channel: `announcement@epocanvas.com`
   - Privacy & Data Protection Office: `privacy@epocanvas.com`
