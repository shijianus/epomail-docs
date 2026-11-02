---
title: Data Processing & Security Maintenance
description: Verified data lifecycle mechanisms, security measures and limits, and requirements for rights requests, deletion, and incident handling in a small non-profit instance.
---

**Updated: November 2, 2026 | Version: 5.21**


<!-- legal-review-draft -->
:::caution[Legal review draft: not the current notice]
This draft records proposed terms and matters still requiring verification. It does not replace the current live notice or certify compliance. It must not be used to enable processing before the operator identity and legally required contact information, actual legal bases, recipients and transfer safeguards, retention and deletion arrangements have been verified and the required notice provided. References to an authoritative version mean the Traditional Chinese drafting baseline, not entry into force. Existing statutory duties and user rights remain unaffected.
:::

This page supplements the [Privacy Policy](/en/mail/privacy-policy/), distinguishing mechanisms implemented in the open-source code from measures the operator must put into practice in an actual deployment. The technical baseline is the version pulled from `shijianus/epomail`; source code cannot establish that live configuration, provider agreements, or individual deletions have been completed.

The Traditional Chinese (Taiwan) version is authoritative; translations must not limit mandatory law or data subject rights. The service is an individually maintained, non-profit project for learning and testing, using measures proportionate to risk. This page does not promise ISO certification, insurance, round-the-clock staffing, or enterprise-level service levels.

![Security layers for transmission, processing, storage, and credentials](/images/mail/en/security-trust-shield.svg)

*Figure: controls at each layer reduce different risks; the existence of a mechanism, its correct configuration, and its verification in practice are separate matters.*

## 1. Security Features and Known Limits

### 1.1 Transmission and confidentiality of communications

The website and API must use correctly configured HTTPS/TLS. A browser connection using TLS alone cannot guarantee end-to-end encryption across the entire path of outbound delivery, recipient systems, external object storage, or users' own forwarding. Remote images, public links, and shared reading access may also expose data; see the [Sub-processor List](/en/mail/sub-processors/).

### 1.2 Edge processing and debugging

Business logic uses Cloudflare Workers, with persistent state held by databases and storage services. Mail parsing, translation, delivery, and fallback processing may access plaintext in memory. Sandboxes can be reused, so there is no guarantee that physical memory is destroyed after each request, and the absence of self-managed servers does not establish that the platform has no logs or snapshots.

Logs must redact credentials, mail bodies, and unnecessary identifying data. Testing should prioritise synthetic content and isolated resources. Real mail, keys, or database copies must not be uploaded to public repositories or unapproved AI or diagnostic services to reproduce an error.

### 1.3 Encryption at rest

Mail modes may apply AES-256-GCM server-side encryption at rest to subjects and bodies; the scope depends on the mode and record state. Attachments, raw mail, and metadata do not automatically receive the same application-layer protection. The operator holds the keys and server permissions and is technically able to decrypt data; mode restrictions in the administrative interface do not amount to end-to-end confidentiality.

An instance must use separate, securely managed keys, complete initialisation and verify the actual encryption state, and plan key rotation and access permissions. The presence of encryption functions in the source code does not establish that every historical record, backup, or third-party copy is encrypted.

### 1.4 Credentials and sessions

In the version checked, newly written password records use PBKDF2-HMAC-SHA256 with a random salt for each user and a default of 210,000 iterations. Parameters are configurable, and legacy SHA-256 or lower-parameter records are still accepted and upgraded during verification. TOTP secrets use AES-256-GCM. Recovery codes have hashes and encrypted copies of the original codes that can be displayed after reauthentication; passkeys are stored as public credential data. Hashing is not a guarantee against guessing, and parameters must continue to be assessed according to risk and the state of the art.

TOTP setup secrets may be temporarily stored in KV for 600 seconds. When legacy password upgrades involve multi-factor authentication, the pending flow may temporarily store the entered password in KV for 300 seconds, with possible renewal. It therefore cannot be claimed that no path stores plaintext credentials; the operator must restrict access and address unnecessary temporary storage. Login-environment lists contain at most 15 entries with a sliding 180-day TTL. IP-based associations across multiple accounts have a 7,200-second TTL; trusted-device credentials may be retained for 60 days and may exempt users from some multi-factor authentication during the first 30 days.

Login-failure limits and session revocation are implemented; JWTs have a default validity period of 30 days. Session-list capacity checks have differing boundary conditions, so the code cannot be claimed to strictly guarantee a maximum of 10 simultaneous sessions. When credentials are stored in browser localStorage, risks from shared devices and script access still need to be addressed.

### 1.5 Data processing matrix

| Category | Storage location and content | Existing cleanup mechanism | Limits the operator must implement |
| --- | --- | --- | --- |
| Accounts and authentication | D1 account, profile, authentication, and settings data; KV sessions | Self-service account closure marks the account and clears the main login state | Separately check deletion of other tokens, OAuth data, images, and residual data; do not treat deactivation as complete erasure |
| Ordinary mail | D1 subjects, bodies, metadata, and labels | User actions, quota cleanup, and administrative cleanup | Ordinary data must not be retained indefinitely without a purpose; backups and historical copies require separate handling |
| Spam and trash | Mail data and associated objects | The daily branch compares a 7-day threshold against `create_time`; mail moved from spam to trash may qualify for deletion in the same run | This is not a fixed 7-day buffer after moving mail to trash; successful scheduling and retries after failure must be verified |
| System mail | Welcome and announcement content and expiry fields | Some official mail is marked deleted when the list is read, based on its expiry period, which defaults to 7 days, and is then cleaned up by the daily branch | Erasure does not happen independently and immediately at expiry; the instance must disclose its actual periods and verify successful cleanup |
| Attachments and raw mail | Attachments use configured storage such as S3, R2, or KV; the checked inbound path does not separately persist complete raw MIME | Some physical mail-deletion paths attempt to delete associated objects | Retries after failure, the original storage backend, copies, and orphaned objects must be checked; atomic deletion cannot be promised across all paths |
| Login and security events | IP addresses, User-Agent, devices, actors, events, and necessary action data | Account fields and individual log mechanisms differ; no general automatic expiry mechanism was found | Set field-minimisation rules, access permissions, and enforceable retention periods |
| Audit, complaints, and decisions | Audit events, risk and ticket status, complaints, notices, and authorisation audit data | Conditional manual cleanup of ordinary old events; no default TTL across all categories | See the retention conditions below; set periods and deletion procedures for each category |
| Exports and local copies | User-downloaded JSON, individual .eml files, and browser storage | Users manage their downloaded copies | Explain export scope and local risks; supplement omitted data that must legally be provided through manual requests |

The daily cleanup branch is scheduled for UTC 16:00 (00:00 the following day in Taiwan), with a separate schedule every five minutes. Having a schedule does not mean every cleanup action runs every five minutes. When a user performs deletion and usage already exceeds 90% of quota, the selected mail may be physically deleted directly; cleanup is not limited to background jobs clearing existing trash.

The audit cleanup endpoint accepts only a specific scope: records older than 180 days, classified as general audits, with normal risk and a closed, expired, or rejected status, excluding records referenced by active bans. These are technical cleanup conditions, not statutory minimum retention periods. Other events, complaints, decisions, notices, and authorisation records do not automatically expire as a result. The operator must supply lawful retention rules and workable cleanup; the presence of a cleanup button cannot be described as all logs being deleted on schedule.

## 2. Operational and Open-Source Responsibilities

### 2.1 Hosted test instance

Non-profit status and individual maintenance may affect the scale and implementation of reasonable measures, but they do not remove statutory responsibility for real data. There is no promise of enterprise-level backup, data never being lost, or permanently free operation. Users should keep necessary copies themselves, and the operator must also implement necessary security and handle rights requests.

### 2.2 Source code authors and deployers

Providing source code without determining the purposes or means of processing for a particular instance does not itself create operational obligations for that instance. If the same author separately operates a hosted instance, that author must be responsible for those operations. Roles involving actual joint determination or processing on behalf of another must also be assessed on the facts and cannot be excluded in advance by a document.

### 2.3 Governance proportionate to scale

Small instances may use a concise data inventory, least privilege, key isolation, a checklist for provider agreements and transfers, regular cleanup records, and an incident contact process. They must assess, as required by law, whether processing records, an EU representative, a data protection officer, and impact assessments are necessary. Being open source or a non-profit test project alone does not require promises of certification, a dedicated team, or enterprise procurement specifications.

### 2.4 Checks before opening to the public

An instance must put into practice disclosure of the operator's identity and address, identification of actual third parties and their locations, lawful processing bases, choices and withdrawal for features requiring consent, log and backup retention, complete account deletion, and request tracking. Data flows without the necessary basis or safeguards must be disabled; merely changing a notice does not permit continued processing. See Sections 2 and 8 of the [Privacy Policy](/en/mail/privacy-policy/) and Section 7 of the [Sub-processor List](/en/mail/sub-processors/) for instance details still requiring verification.

## 3. Rights, Deletion, and Incidents

### 3.1 Export and supplementary requests

Self-service JSON exports contain some personal data, mapped mail records not marked deleted, and custom labels. They do not include all recipient fields, attachment binaries, raw mail, all mailbox aliases, or administrative audit data. An individual .eml file is also not guaranteed to represent all personal data in the database. A machine-readable export does not by itself fulfil every access and portability obligation.

Omitted data that may legally be requested is verified and supplied through a manual channel; requests must not be refused because the feature does not provide it. Response deadlines, verification, fees, and complaints are governed by Section 9 of the [Privacy Policy](/en/mail/privacy-policy/).

### 3.2 Deletion procedures

Self-service account closure currently soft-deletes the account and handles the main login state; no automatic, complete physical erasure after 90 days has been verified. Mailbox and inbound checks do not consistently check the soft-deletion flag, so account closure cannot be guaranteed to stop incoming mail. Any enabled public profile page must also be separately disabled and checked. Administrative deletion likewise does not establish that audit data, OAuth authorisations, images, and all objects have been erased.

Retries after deletion failures in externally supplied storage depend on the original storage configuration. If account settings are removed first, later retries may be unable to locate the original backend. Before complete deletion, the necessary information for locating data to delete must be preserved and each object's processing result confirmed, followed by secure removal of the relevant settings.

Deletion requests must have traceable records, with accounts, aliases, mail, objects, authentication and authorisation, audit, and backup systems checked individually. Where retention is required by law, record the basis, isolate use, and provide the reasons and periods that may be disclosed. Do not tell users that "everything has been completely erased" before completion has been confirmed. Internal processes not yet being automated must not cause requests to exceed statutory deadlines.

### 3.3 Minimisation and user choice

Non-essential profile fields, public pages, and external notifications must be optional for users; optional services must transmit only the fields needed. Enabling AI, public translation fallbacks, or remote resources for real personal data requires a valid basis, clear notice, and appropriate safeguards. For public fields and any content accessible to anyone holding a reading link, users must be told who can see it and the limits on revocation.

### 3.4 Incident response

After an incident is discovered, its impact must be contained, necessary evidence preserved, the data and risks involved assessed, and decisions recorded. GDPR notification to a supervisory authority is subject to risk conditions and must, where feasible, occur within 72 hours of awareness; where there is a high risk, data subjects are notified without undue delay as required by law. See Section 10 of the [Privacy Policy](/en/mail/privacy-policy/) for the full rules; a public vulnerability announcement cannot serve as a substitute for individual notification in every case.

Security issues may be sent privately to `announcement@epocanvas.com`, and privacy and rights requests to `privacy@epocanvas.com`. Public patch notes must avoid incident details that identify users or credentials that remain usable.
