---
title: Data Processing & Security Maintenance
description: Verified data lifecycle mechanisms, security measures and limits, and requirements for rights requests, deletion, and incident handling in a small non-profit instance.
---

**Updated: November 2, 2026 | Version: 5.25**

This page supplements the [Privacy Policy](/en/mail/privacy-policy/), distinguishing mechanisms implemented in the open-source code from measures the operator must put into practice in an actual deployment. The technical account includes the current code changes in `shijianus/epomail`. Actual instances must be upgraded and configured; source code does not establish completed live deployment, provider agreements or individual deletions.

The Traditional Chinese (Taiwan) version is authoritative; translations must not limit mandatory law or data subject rights. The service is an individually maintained, non-profit project for learning and testing, using measures proportionate to risk. This page does not promise ISO certification, insurance, round-the-clock staffing, or enterprise-level service levels.

![Security layers for transmission, processing, storage, and credentials](/images/mail/en/security-trust-shield.svg)

*Figure: controls at each layer reduce different risks; the existence of a mechanism, its correct configuration, and its verification in practice are separate matters.*

## 1. Security Features and Known Limits

### 1.1 Transmission and confidentiality of communications

The website and API should use correctly configured HTTPS/TLS. A browser connection using TLS alone cannot guarantee end-to-end encryption across the entire path of outbound delivery, recipient systems, external object storage, or users' own forwarding. Upgraded HTML reading blocks remote images, remote CSS and active content by default. Ordinary reading can allow images only for the current message after a warning, with remaining IP and opening-tracking risks. Printing keeps default blocking and Telegram sharing allows no remote resources. Google Fonts links have been removed; Turnstile and external avatars may still contact third parties. See the [Sub-processor List](/en/mail/sub-processors/).

### 1.2 Edge processing and debugging

Business logic uses Cloudflare Workers, with persistent state held by databases and storage services. Mail parsing, translation, delivery, and fallback processing may access plaintext in memory. Sandboxes can be reused, so there is no guarantee that physical memory is destroyed after each request, and the absence of self-managed servers does not establish that the platform has no logs or snapshots.

Logs should redact credentials, mail bodies, and unnecessary identifying data. Testing should prioritise synthetic content and isolated resources. Real mail, keys, or database copies must not be uploaded to public repositories or unapproved AI or diagnostic services to reproduce an error.

### 1.3 Encryption at rest

Mail modes may apply AES-256-GCM server-side encryption at rest to subjects and bodies; the scope depends on the mode and record state. Complete raw MIME is separately encrypted with a server key using AES-256-GCM as described in Section 1.5; attachments and metadata do not automatically receive the same protection. The operator holds the keys and server permissions and is technically able to decrypt data; mode restrictions in the administrative interface do not amount to end-to-end confidentiality. In Private mode, moving mail to Trash can decrypt and store its subject, body, and verification code and bring it within administrative visibility; restoration encrypts it again according to the mode. Encrypted mode's disabling of system-level notifications and forwarding does not cover all individually configured outbound transfers.

An instance should use separate, securely managed keys, complete initialisation and verify the actual encryption state, and plan key rotation and access permissions. The presence of encryption functions in the source code does not establish that every historical record, backup, or third-party copy is encrypted.

### 1.4 Credentials and sessions

In the version checked, newly written password records use PBKDF2-HMAC-SHA256 with a random salt for each user and a default of 210,000 iterations. Parameters are configurable, and legacy SHA-256 or lower-parameter records are still accepted and upgraded during verification. TOTP secrets use AES-256-GCM. Recovery codes have hashes and encrypted copies of the original codes that can be displayed after reauthentication; passkeys are stored as public credential data. Hashing is not a guarantee against guessing, and parameters should continue to be assessed according to risk and the state of the art.

The TOTP setup flow stores the encrypted setup secret in D1's `auth_security_operation` table for 300 seconds. A pending MFA login flow is also stored in that D1 table; its payload contains no entered password. Completing the second step updates only the payload and does not renew the original deadline. Expiry blocks further use but is not physical deletion; scheduled cleanup may process the row later. Disabling TOTP leaves `totpEnabled` on when an active passkey remains. Login-environment lists contain at most 15 entries with a sliding 180-day TTL; IP-based associations across multiple accounts have a 7,200-second TTL; trusted-device credentials may be retained for 60 days and may exempt users from some multi-factor authentication during the first 30 days.

Login-failure limits and session revocation are implemented; JWTs have a default validity period of 30 days. Session-list capacity checks have differing boundary conditions, so the code cannot be claimed to strictly guarantee a maximum of 10 simultaneous sessions. When credentials are stored in browser localStorage, risks from shared devices and script access still need to be addressed.

### 1.5 Data processing matrix

| Category | Storage location and content | Existing cleanup mechanism | Limits the operator must implement |
| --- | --- | --- | --- |
| Accounts and authentication | D1 account, profile, authentication, and settings data; KV sessions | Closure first disables all linked mailboxes, revokes sessions, PATs, trusted devices, pending verification and OAuth grants, and blocks inbound mail before AI | `manual_review` is not complete erasure; failures remain queryable as `cleanup_failed`. Check static avatars and residual copies separately |
| Ordinary mail | D1 subjects, bodies, metadata, and labels | User actions, quota cleanup, and administrative cleanup | Ordinary data must not be retained indefinitely without a purpose; backups and historical copies require separate handling |
| Spam and trash | Mail data and associated objects | The daily branch compares a 7-day threshold against `create_time`; mail moved from spam to trash may qualify for deletion in the same run | This is not a fixed 7-day buffer after moving mail to trash; successful scheduling and retries after failure must be verified |
| System mail | Welcome and announcement content and expiry fields | Some official mail is marked deleted when the list is read, based on its expiry period, which defaults to 7 days, and is then cleaned up by the daily branch | Erasure does not happen independently and immediately at expiry; the instance must disclose its actual periods and verify successful cleanup |
| Attachments and raw mail | Attachments use S3, R2 or KV; complete raw MIME is encrypted with a server key using AES-256-GCM in the owner's selected object storage. D1 claims hold hash, recipient, Message-ID, user, raw key and expiry | Raw MIME has a 7-day application expiry, renewable on retry. COMPLETE does not delete immediately; scheduled runs handle up to 100, deleting objects before claims and retaining failures for retry | Separate from the attachment-deletion queue; not storage TTL or guaranteed erasure within 7 days. Server-key encryption is not end-to-end. Instances need upgrade/configuration; raw cleanup at account closure still requires verification |
| Login and security events | IP addresses, User-Agent, devices, actors, events, and necessary action data | Account fields and individual log mechanisms differ; no general automatic expiry mechanism was found | Set field-minimisation rules, access permissions, and enforceable retention periods |
| Audit, complaints, and decisions | Audit events, risk and ticket status, complaints, notices, and authorisation audit data | Conditional manual cleanup of ordinary old events; no default TTL across all categories | See the retention conditions below; set periods and deletion procedures for each category |
| Exports and local copies | Downloaded JSON and individual .eml files; the `localStorage` `epo_sessions` session-token registry, current message and `epomail_recipient_records:*` recipient records; the tab identity marker in `sessionStorage`; drafts and attachments in IndexedDB | Ordinary logout revokes the current session and clears the current message and in-memory recipient cache, but does not remove `epomail_recipient_records:*` or other accounts; drafts and attachments remain and are deleted together when a draft is deleted | Device clearing in data settings requires explicit confirmation for all local site accounts, drafts, attachments, recipient records, trusted state and caches; blocking or failure is reported. This is not complete server-side deletion |

The local draft database is named after the primary mailbox and contains recipients, subjects, bodies, sending settings, and attachment objects held in a separate table; no application-layer encryption was found. The `epo_sessions` session-token registry, current message and `epomail_recipient_records:*` recipient records use persistent same-origin storage; each tab’s identity marker uses sessionStorage, and different interface paths for multiple accounts do not establish browser-storage or device-access isolation. The PWA automatically registers a Service Worker, but the checked configuration does not cache mail for offline use, and no browser Web Push subscription implementation was found. Local persistence must still be accounted for.

The daily cleanup branch is scheduled for UTC 16:00 (00:00 the following day in Taiwan), with a separate schedule every five minutes. Having a schedule does not mean every cleanup action runs every five minutes. When a user performs deletion and usage already exceeds 90% of quota, the selected mail may be physically deleted directly; cleanup is not limited to background jobs clearing existing trash.

The audit cleanup endpoint accepts only a specific scope: records older than 180 days, classified as general audits, with normal risk and a closed, expired, or rejected status, excluding records referenced by active bans. These are technical cleanup conditions, not statutory minimum retention periods. Other events, complaints, decisions, notices, and authorisation records do not automatically expire as a result. The operator must supply lawful retention rules and workable cleanup; the presence of a cleanup button cannot be described as all logs being deleted on schedule.

## 2. Operational and Open-Source Responsibilities

### 2.1 Hosted test instance

The individually maintained test instance follows an approach of making reasonable efforts to reduce risk: taking into account data sensitivity, processing scope, the state of the art, and reasonable implementation costs, it prioritises defects that may cause greater harm and clearly explains current measures and limitations. Necessary processes may use manual checks, records, and cleanup proportionate to risk; there is no unconditional promise of enterprise-level backups, dedicated on-call staffing, or specific repair times. Where a risk cannot yet be adequately controlled, data should be reduced, features restricted, or the relevant processing suspended. Known limitations and steps users can take are described in Section 1 of the [Privacy Policy](/en/mail/privacy-policy/). Statutory security requirements, rights requests, and notification deadlines remain governed by applicable law.

### 2.2 Source code authors and deployers

Providing source code without determining the purposes or means of processing for a particular instance does not itself create operational obligations for that instance. If the same author separately operates a hosted instance, that author should be responsible for those operations. Roles involving actual joint determination or processing on behalf of another must also be assessed on the facts and cannot be excluded in advance by a document.

### 2.3 Governance proportionate to scale

Small instances may use a concise electronic register recording purposes and bases, categories of data and data subjects, recipients, locations and transfer safeguards, retention and deletion, and security measures. Where processing records are legally required, the register should contain the statutory fields and be available to the competent authority; having fewer than 250 people is not enough for an exemption. Rights requests can be tracked in private tickets recording receipt date, deadline, verification, scope, and completion. Periodic manual review and cleanup may be appropriate, but must actually be performed and leave necessary records.

An EU representative, data protection officer, and impact assessment must each be assessed under their respective statutory conditions; see Section 12 of the privacy policy. A privacy mailbox does not automatically hold these statutory roles. Open-source or non-profit testing status alone does not require incorporation, a dedicated team, insurance, or ISO certification, nor can lack of budget extend statutory deadlines. Even where test resources contain only synthetic mail, processing of real accounts, access logs, and external requests should be checked.

### 2.4 Checks before opening to the public

Operator identity and address, actual third parties and locations, legal bases, log/backup retention, complete deletion and request tracking still require implementation. The code closes new registration if the operator name, country, contact email, terms version or terms/privacy URLs are missing; existing login remains available. The registration terms checkbox starts unchecked; acceptance records version, time, locale and URLs without an additional IP collected as evidence. The privacy policy is separate notice, not blanket processing consent. Complete fields or a tick do not verify identity, agreements or compliance. Disable flows without the necessary basis or safeguards; see Sections 2 and 8 of the [Privacy Policy](/en/mail/privacy-policy/) and Section 7 of the [Sub-processor List](/en/mail/sub-processors/).

## 3. Rights, Deletion, and Incidents

### 3.1 Export and supplementary requests

Self-service JSON exports contain some personal data, mapped mail records not marked deleted, and custom labels. They do not include all recipient fields, attachment binaries, raw mail, all mailbox aliases, or administrative audit data. An individual .eml file is not the stored complete raw MIME and does not represent all personal data in the database. A machine-readable export does not by itself fulfil every access and portability obligation.

Omitted data that may legally be requested is verified and supplied through a manual channel; requests must not be refused because the feature does not provide it. Response deadlines, verification, fees, and complaints are governed by Section 9 of the [Privacy Policy](/en/mail/privacy-policy/).

### 3.2 Deletion procedures

Upgraded account closure first disables all of the user's linked mailboxes in D1, then revokes sessions, PATs, trusted devices, pending verification and OAuth grants; inbound mail is rejected before AI processing. Public endpoints return 404 for inactive or deleted users/mailboxes. Each Telegram reading or attachment request checks user, mailbox and message status and versions. Stopping or changing personal notifications revokes old reading links; data settings separately allow explicit revocation of all links. This does not delete chat messages or downloaded copies. Raw MIME cleanup runs before deleting the user record, retaining locators on failure for retry. `manual_review` still requires human checks of raw data, claims and other residuals, not complete erasure; cleanup failures remain queryable as `cleanup_failed`. No complete erasure within 90 days is promised, and the original static avatar file is not physically deleted by soft deletion.

Ordinary logout revokes only the current session and clears the current message, recipient cache and current account session, retaining drafts, other accounts and credentials outside that revocation. It is not revocation of all sessions or reading links. On shared devices, data settings allow explicit confirmation to clear all local site accounts, drafts/attachments, trusted state and caches. Blocking or failure is reported and must not be ignored. Device clearing, server account closure and complete deletion require separate checks.

Attachment deletion from BYO external storage preserves the original backend locator and necessary configuration until its pending/failed deletion jobs are resolved, then safely removes settings. Raw MIME follows the separate expiry cleanup in Section 1.5, not the attachment queue. Missing original configuration is a failure, not a reason to delete from the default bucket. Operators must check retries and each object's result; queued does not mean deleted.

Deletion requests should have traceable records, with accounts, aliases, mail, objects, authentication and authorisation, audit, and backup systems checked individually. Where retention is required by law, record the basis, isolate use, and provide the reasons and periods that may be disclosed. Do not tell users that "everything has been completely erased" before completion has been confirmed. Internal processes not yet being automated must not cause requests to exceed statutory deadlines.

### 3.3 Minimisation and user choice

Server gates for automatic extraction, translation and OCR default to false; public translation fallback is not currently provided. Automatic extraction also needs `aiCode`, the user's `aiVerificationCode` explicitly true and notice confirmation. Opening translation or changing language sends nothing; the current notice URL must be confirmed. OCR defaults to false and needs a choice for this request plus server permission. MyMemory/Google public fallback has been removed from all paths; the backend rejects true to enable it and the UI option is disabled. Older instances must upgrade rather than rely on the former switch. Actual recipients, agreements, retention and transfer safeguards still require disclosure; confirmation is not proof of full GDPR compliance. Public-profile backend options separately govern statistics/trends/sources and return 404 for inactive or deleted users/mailboxes, while static avatars survive soft deletion. Upgraded personal Telegram enforces notification scope, preview and code-copy controls: in `all` and `important`, the title still uses the subject (or a generic title when absent), up to 200 characters, even with preview off; `notifyCodeOnly` adds a copy button only for an existing extracted code of no more than 256 characters outside `privacy`; explicit `includePreview=true` adds a preview of up to 400 characters and a reading link when configured; `privacy` sends only a generic notice. Reading and attachments check state and versions on every request, including with previews off. Unavailable forwarding rules stop forwarding rather than fall back to all mail; saved `keepCopy` is normalized to `true`, `false` is rejected when forwarding is enabled, and a disabled configuration is also stored as `true`, retaining the original. See the [Notifications & Forwarding Guide](/en/mail/notify/) for fields and choices. These code mechanisms do not establish completed production verification.

### 3.4 Incident response

After an incident is discovered, its impact should be contained, necessary evidence preserved, the data and risks involved assessed, and decisions recorded. GDPR notification to a supervisory authority is subject to risk conditions and should, where feasible, occur within 72 hours of awareness; where there is a high risk, data subjects are notified without undue delay as required by law. See Section 10 of the [Privacy Policy](/en/mail/privacy-policy/) for the full rules; a public vulnerability announcement cannot serve as a substitute for individual notification in every case.

Security issues may be sent privately to `announcement@epocanvas.com`, and privacy and rights requests to `privacy@epocanvas.com`. Public patch notes should avoid incident details that identify users or credentials that remain usable.
