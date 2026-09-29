---
title: 合规技术基线与功能规范 (Technical Baseline)
description: Epocanvas Mail 官方合规与技术基线规范 (Technical Baseline Specification)，支撑隐私政策、服务条款与安全审计。
---

# Product & Services Functional Description for Legal, Privacy & Compliance

| Metadata | Specification Details |
| :--- | :--- |
| **Document Version** | 1.0.0 (Production-Ready) |
| **Applicable Scope** | Epocanvas Mail Official Cloud, Managed Enterprise Instances, and Self-Hosted / Open-Source Deployments |
| **Document Classification** | Legal & Technical Baseline Specification (Supports Privacy Policy, Terms of Service, and Compliance Audits) |

---

## 1. Platform Identity & Classification

### 1.1 Platform Overview
Epocanvas Mail ("the Platform" or "the Service") is a responsive, private email and cloud communications system built on a distributed, serverless edge architecture. Utilizing globally distributed edge computing nodes, the Platform provides individuals, developers, teams, and organizations with high-availability, low-latency email lifecycle management. Core capabilities include inbound ingestion, stream-based parsing, outbound delivery, object-based attachment storage, cryptographic multi-account routing, edge-native AI verification code extraction, and automated notification webhooks.

### 1.2 Data Processing Roles & Legal Classification
Under global data protection frameworks—including the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA), and the Personal Information Protection Law (PIPL):

1. **Cloud-Hosted / Multi-Tenant SaaS Model:**
   * **Data Controller:** The platform operator acts as the Data Controller with respect to account registration metadata, identity authentication records, security telemetry, and audit logs.
   * **Data Processor:** The platform operator acts as a Data Processor regarding user-generated email bodies, subject lines, address books, MIME headers, and attached files stored or routed through the service.
2. **Self-Hosted & Independent Deployments:**
   * When an entity or individual deploys the software on their own domain or private Cloudflare/cloud infrastructure, the deploying party acts as the **sole and exclusive Data Controller**. The software creators and codebase maintainers collect no telemetry, retain no operational access, and store zero communication data.

---

## 2. Core Architectural Philosophy & Privacy Foundation

All product features and data flows adhere to six foundational engineering principles that serve as the baseline for our privacy and regulatory compliance commitments:

### 2.1 Data Sovereignty & Zero Commercial Exploitation
* **Zero Commercial Advertising or Profiling:** The platform operates without behavioral ad tracking, automated profiling engines, or cross-site tracking scripts. Mail contents are never indexed or monitored for advertising purposes.
* **Confidentiality of Correspondence:** All emails, metadata, attachments, and recipient lists remain the exclusive private property of the user. The Platform does not sell, rent, lease, or monetize personal data in any manner.

### 2.2 Edge-Native & Serverless Architecture
* **Stateless Edge Execution:** Application logic runs on the Cloudflare Workers edge network. The platform maintains no persistent standalone virtual servers; compute workloads execute on demand across globally distributed edge nodes nearest to the user.
* **Distributed Edge Storage:**
  * **Structured Data:** Cloudflare D1 (Edge SQLite engine).
  * **Hot Sessions & Rate Limits:** Cloudflare KV (Globally replicated key-value store with millisecond latency).
  * **MIME Blobs & Attachments:** Cloudflare R2 (Distributed, S3-compatible object storage).
  * Edge-localized processing reduces unnecessary cross-border data transfers by terminating sessions and resolving data queries at the closest network edge.

### 2.3 Cryptographic Tenant Isolation & Fail-Closed Security
* **Anti-IDOR Routing:** In multi-account environments, the platform implements a cryptographic hash-routing model. API requests and UI state transitions bind to a unique cryptographic account hash, mitigating Insecure Direct Object References (IDOR) and unauthorized enumeration.
* **Fail-Closed Role-Based Access Control (RBAC):** Access control enforces a default-deny policy across all endpoints across six discrete privilege tiers. Payloads containing non-whitelisted parameters are stripped at the edge gateway before execution.
* **Credential Protection:** Passwords are hashed using salted PBKDF2. Time-based One-Time Password (TOTP) seed secrets are encrypted at rest using AES-GCM before database insertion. Authentication relies on cryptographically signed JSON Web Tokens (JWT) with mandatory expiration (TTL) and instant server-side revocation capabilities via Cloudflare KV.

### 2.4 Edge-Confined Local AI Inference
* **Local One-Time Passcode (OTP) Extraction:** Automated parsing of verification codes from inbound emails is executed exclusively via Cloudflare Workers AI running on edge inference chips.
* **Zero Public LLM Exposure:** Mail content is never dispatched to external third-party public AI providers (e.g., OpenAI, Anthropic, or Google API endpoints). User emails are strictly segregated from public model training datasets.

### 2.5 Deterministic Storage Tiering & 2% Reserved Safeguard
* **6-Stage Threshold Visualizer:** Storage consumption is monitored across six distinct thresholds:
  * <= 10% (Blue)
  * 11% - 25% (Green)
  * 26% - 50% (Yellow)
  * 51% - 80% (Orange)
  * 81% - 98% (Red)
  * >= 98% (Grey / Defensive Hold)
* **2% Hard Isolation Buffer:** Usable account storage is capped at 98%. The final 2% is physically isolated as an emergency reserve zone to guarantee that core system operations, metadata logging, and administrative de-provisioning can execute without database write deadlocks.
* **Automated System Safeguards:**
  * **95% Automatic Trash Purge:** When account consumption reaches 95%, the system automatically and permanently clears soft-deleted records within the Trash container to recover disk space.
  * **98% Inbound Ingestion Circuit Breaker:** When storage reaches 98%, new inbound emails and attachments are temporarily rejected at the edge gateway, returning a standard mailbox-full bounce status (552 / 4.2.2) to prevent silent data truncation or corruption.

### 2.6 Full-Lifecycle Erasure & Cascading Physical Deletion
* **Guaranteed Right to Be Forgotten:** The platform does not rely on permanent soft-delete markers ("is_deleted = true") for finalized deletion workflows.
* **Cascading Wipeout:** Account termination or explicit message deletion triggers a cascading purge across all storage layers: metadata is permanently purged from Cloudflare D1, raw MIME and attachment blobs are deleted from Cloudflare R2, and active session tokens and cached indexes are invalidated across Cloudflare KV.

---

## 3. Comprehensive Functional Breakdown

```
                            [ Cloudflare Edge Mesh ]
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
   Inbound Email Stream         Web Management UI         Developer REST API
 (CF Email Routing / 25MB)     (Turnstile Protected)    (Bearer Token / Rate-Limited)
            │                          │                          │
            ▼                          ▼                          │
   [ Workers AI Sandbox ]      [ Anti-IDOR RBAC Router ]          │
   (Local OTP Parsing Only)    (6 Privilege Tiers)                │
            │                          │                          │
            └──────────────────────────┼──────────────────────────┘
                                       │
                  ┌────────────────────┴────────────────────┐
                  ▼                                         ▼
         [ Cloudflare D1 ]                          [ Cloudflare R2 ]
       (Structured Metadata,                     (Raw MIME Blobs, EML,
      PBKDF2, AES-GCM Secrets)                   Whitelisted Attachments)
                  │                                         │
                  ▼                                         ▼
         [ Cloudflare KV ]                         [ Outbound Dispatch ]
    (Session JWTs, Sliding Rate-                (Resend API / Custom SMTP Relay,
     Limits, Lockout Counters)                    Tracking & Delivery Receipts)
```

### 3.1 Email Communication Services
1. **Inbound Mail Ingestion & Edge Filtering:**
   * Receives incoming messages via Cloudflare Email Routing pipelines and parses MIME structures inside a stateless Worker.
   * Enforces a hard gateway limit of 25MB per email stream; oversized payloads are terminated at the edge to prevent resource exhaustion.
   * Provides global edge blocklists supporting sender address patterns, domain rules, and subject-line keyword blocking.
2. **Outbound Dispatch Architecture:**
   * Delivers outbound messages using authenticated transactional email APIs (e.g., Resend API) or administrator-configured custom SMTP relays.
   * Supports rich HTML message composition, inline images, file attachments, and multi-recipient addressing (To, CC, BCC).
   * Records transactional IDs (e.g., Resend Email ID) to track explicit terminal delivery statuses, including delivered, bounced, and spam-complaint flags.
3. **Mailbox Organization & Conversation Threading:**
   * Groups messages into chronological conversation threads via RFC-standard `In-Reply-To` and `References` headers.
   * Organizes correspondence across standard folders: Inbox, Sent, Drafts, Spam, Trash, and No-Recipient.
   * Provides user-defined custom labels, category classification, message starring, and temporary snooze configurations.
4. **Multi-Field Mailbox Search:**
   * Facilitates complex client- and edge-side searches across sender, recipient, CC/BCC, subject lines, body snippets, and system labels.

### 3.2 Identity, Session & Access Governance
1. **Multi-Account Containerization:**
   * Manages multiple distinct email profiles within a single browser session using cryptographically separated local containers.
   * Prevents cross-account data leakage by verifying an isolated cryptographic hash on every state change and API call.
2. **Multi-Factor Authentication (MFA / 2FA):**
   * Supports Time-based One-Time Passwords (TOTP) compliant with RFC 6238, interoperable with Google Authenticator, 1Password, and standard authenticators.
   * Encrypts TOTP secrets at rest in Cloudflare D1 using AES-GCM. Issues single-use, irreversibly hashed emergency backup recovery codes.
3. **Brute-Force & Credential Stuffing Countermeasures:**
   * Maintains edge-level rate-limiting counters mapped against client IP addresses and targeted usernames within Cloudflare KV.
   * Enforces an automated lockout policy: five consecutive failed authentication attempts trigger an automatic 12-hour circuit breaker.
4. **Cryptographic Session Revocation:**
   * Issues cryptographically signed, short-to-medium-lived JWTs with embedded expiration timestamps (`exp`).
   * Explicit sign-out commands write the token signature to a KV-backed revocation registry, terminating stale sessions across all edge nodes instantly.
5. **Role-Based Access Control (RBAC):**
   * Enforces a six-tier privilege model: Instance Owner, Super Admin, Domain Admin, Standard User, Restricted User, and Guest. Administrative interfaces enforce least-privilege checks before payload processing.

### 3.3 Storage & Object Governance
1. **Decoupled Architecture:**
   * Metadata, thread relationships, and message summaries reside in Cloudflare D1. Raw message bodies, raw MIME `.eml` files, and attachment blobs are isolated in Cloudflare R2 object storage.
2. **Attachment Isolation & Stored-XSS Mitigation:**
   * Disallows inline script execution from file previews through strict MIME-type allowlists.
   * Enforces defensive HTTP response headers for downloaded attachments: `Content-Disposition: attachment; filename="..."`, `X-Content-Type-Options: nosniff`, and restrictive Content Security Policies (CSP) to block document parsing within the application origin.
3. **Bring Your Own Storage (BYOS):**
   * Supports routing attachments and raw message blobs to user-owned, external S3-compatible endpoints (e.g., AWS S3, MinIO, Backblaze B2), allowing users to retain exclusive physical control of media assets.

### 3.4 Automation & Extensibility
1. **Automated Inbound Forwarding:**
   * Supports forwarding rules to re-route incoming messages to up to five validated external recipient addresses.
   * Incorporates loop prevention checks and same-domain hop-count tracking to avoid recursive mail loops.
2. **Instant Messaging Webhook Relays:**
   * Delivers real-time notifications to user-configured Telegram Bot endpoints, transmitting sanitized sender, subject, and preview snippets.
3. **Developer API:**
   * Provides RESTful HTTP endpoints for mailbox provisioning, health checks, and automated ingestion testing, secured via individual scoped bearer tokens subject to rate limiting.

### 3.5 Edge Defense Mesh
1. **Privacy-Preserving Bot Detection:**
   * Integrates Cloudflare Turnstile on public endpoints (registration, password reset, login) to evaluate browser trust without third-party advertising cookies or cross-site tracking.
2. **Sanitized HTML Isolation:**
   * Cleans incoming HTML mail bodies client-side through DOMPurify inside an isolated shadow boundary.
   * Strips ``, `<iframe>`, inline JavaScript event handlers, CSS expressions, and `@import` rules. Dispatches external images through an optional caching proxy to shield the client's public IP address from tracking pixels.
3. **Server-Side Request Forgery (SSRF) Guard:**
   * Evaluates and blocks outbound requests to private or loopback networks (e.g., `127.0.0.1`, RFC 1918 subnets `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`) and cloud metadata endpoints (`169.254.169.254`) across webhooks and external storage endpoints.

---

## 4. Data Processing & Lifecycle Matrix

| Data Classification | Specific Elements & Fields | Processing Purpose | Storage Medium & Security Baseline | Retention & Deletion Schedule |
| :--- | :--- | :--- | :--- | :--- |
| **Account Credentials** | Email address, display name, password hash, salt, TOTP secret, backup codes, registration token. | User registration, authentication, multi-factor verification, credential recovery. | **Cloudflare D1.** Passwords hashed with PBKDF2/Salt. TOTP seeds encrypted with AES-GCM. | Retained until account termination. Hard-deleted immediately upon user-confirmed cancellation. |
| **Network & Device Metadata** | Registration IP, last-seen IP, operating system, User-Agent string, device classification. | Security auditing, unauthorized login identification, edge rate limiting. | **Cloudflare D1.** Restricted to administrative review and individual account audit logs. | Retained during account activity; cleared upon termination or during automated log cycling. |
| **Active Session State** | Session JWT signatures, refresh tokens, active RBAC role masks, selected account IDs. | Edge gateway authorization, API request routing, access token validation. | **Cloudflare KV.** Stored with deterministic TTLs. | Automatically expires after a maximum of 30 days. Purged immediately upon explicit sign-out. |
| **Communications & Metadata** | Sender/recipient headers, CC/BCC, subject line, timestamps, read state, labels, stars. | Core email delivery, conversation threading, mailbox organization, search indexing. | **Cloudflare D1** (Metadata) and **Cloudflare R2** (Raw MIME source blobs). | Governed by user action. Soft-deleted Trash items auto-purged after 7 days or when storage hits 95%. |
| **File Attachments** | Original filename, MIME classification, file size, binary payload blob. | File storage, attachment transfers, inline rendering, safe binary downloads. | **Cloudflare R2** or external user-configured **BYOS S3 buckets**. | Tied to the parent email lifecycle. Deleting an email permanently purges the linked R2 blobs. |
| **Security & Rate Telemetry** | Failed login attempts, captcha challenge status, sliding-window request tallies. | DDoS mitigation, brute-force defense, anti-abuse throttling. | **Cloudflare KV.** Sliding window and fixed-window counters. | Automatically expires and resets within 12 hours of threshold activation. |
| **Interface Preferences** | Locale selection (6 languages), dark/light mode, visual density, notification flags. | UI consistency across browser sessions. | **Browser LocalStorage** combined with optional server sync in **Cloudflare D1**. | Retained until browser cache clearance or manual reset in user settings. |

---

## 5. Authorized Third-Party Sub-Processors

To maintain global delivery, edge availability, and storage infrastructure, the Platform relies on the following vetted third-party sub-processors:

### 5.1 Cloudflare, Inc.
* **Corporate Domicile:** San Francisco, California, United States (Operates under EU Standard Contractual Clauses).
* **Scope of Services:** Edge compute infrastructure (Workers), serverless relational databases (D1), distributed key-value storage (KV), object storage (R2), local edge AI inference (Workers AI), and bot mitigation (Turnstile).
* **Data Involved:** IP addresses, network telemetry, encrypted credentials, application state, email bodies, and file attachments.
* **Compliance Certifications:** SOC 2 Type II, ISO 27001, PCI DSS Level 1, and GDPR compliance. All data in transit is encrypted using TLS 1.3.

### 5.2 Resend, Inc.
* **Corporate Domicile:** United States.
* **Scope of Services:** Outbound Mail Transfer Agent (MTA) integration responsible for dispatching outgoing emails to remote destination MX servers.
* **Data Involved:** Outbound sender addresses, destination recipient addresses, subject lines, message bodies, and outbound attachments.
* **Operational Controls:** Authenticated via isolated, scoped API tokens. Credentials and outbound keys are excluded from diagnostic application logs.

### 5.3 Telegram FZ-LLC (Optional Integration)
* **Preconditions:** Activated only when an administrator or user explicitly provisions a valid Telegram Bot Token and Chat ID.
* **Scope of Services:** One-way dispatch of administrative alerts and incoming email preview summaries.
* **Data Involved:** Sender address, message subject, and user-configured sanitized body snippets. Passwords, session tokens, and file attachments are strictly excluded.

### 5.4 Turso / ChiselStrike, Inc. (Optional Integration)
* **Preconditions:** Activated only when an administrator provisions an external distributed database connection string.
* **Scope of Services:** External libSQL-compatible distributed database synchronization for external data redundancy.

---

## 6. Exercise of Data Subject Rights

The platform natively implements technical workflows to satisfy data subject requests under applicable privacy regulations:

### 6.1 Right of Access & Data Portability
* Users can view their stored personal profile data, authentication event logs, and capacity usage metrics via the account settings panel.
* Users can export individual messages or complete folders into standard RFC 822 `.eml` MIME packages for migration into standard desktop clients (e.g., Thunderbird, Apple Mail).

### 6.2 Right to Rectification
* Users can update profile display names, modify account credentials, rotate or unbind TOTP authentication devices, update forwarding rules, and edit organizational labels via self-service interfaces.

### 6.3 Right to Erasure (Wipeout)
* Users retain the right to terminate their account and purge all associated records.
* Initiating an account termination executes an atomic cascade deletion across all platform tiers: D1 relational rows are dropped, R2 message blobs and attachment objects are deleted, and active session tokens and cached keys in KV are purged.

### 6.4 Right to Object & Processing Restriction
* The platform does not run automated profiling, behavioral credit evaluation, or automated legal-impact decision models.
* Users can disable Workers AI OTP extraction, terminate email forwarding rules, and disconnect notification webhooks at any time without penalty or service denial.

---

## 7. Engineering & Technical Security Safeguards

1. **Transport Layer Encryption:** All external endpoints mandate HTTPS/TLS 1.3 connections, backed by HTTP Strict Transport Security (HSTS) with long-term preloading to mitigate eavesdropping and downgrade attacks.
2. **Defensive Cross-Site Scripting (XSS) Controls:**
   * Rich HTML content is parsed and sanitized through DOMPurify within a shadow tree prior to presentation.
   * Dynamic CSS injection points restrict characters that enable style escapes (blocking `<`, `>`, `{`, `}`, `expression`, `javascript:`, and `@import`).
   * Attachments enforce strict download behaviors and restrictive CSP headers to prevent in-browser execution within the platform's origin.
3. **Strict Input Whitelisting:** Mutation operations (e.g., profile updates, configuration changes) enforce strict server-side property allowlists (`ALLOWED_PROFILE_FIELDS`) at the edge gateway to block parameter tampering and mass-assignment vulnerabilities.
4. **Multilingual Interface Consistency:** System interfaces, warning notices, compliance modals, and error states are mirrored across six supported languages (Simplified Chinese, Traditional Chinese, US English, Spanish, French, and Dutch) to maintain full clarity across user locales.

---

## 8. Terms of Use, Prohibited Conduct & Disclaimers

1. **Lawful Usage:** Users must utilize the platform in strict accordance with the laws of their local jurisdiction and the jurisdictions in which server nodes reside.
2. **Prohibited Activities:** The platform prohibits the following activities:
   * Transmission of unsolicited commercial email (spam) in violation of CAN-SPAM, the ePrivacy Directive, or relevant anti-spam statutes.
   * Distribution of phishing schemes, spoofed headers, ransomware, spyware, or malicious payloads.
   * Port scanning, system exploitation, credential brute-forcing, or denial-of-service (DoS/DDoS) operations.
   * Accounts verified to be engaging in abusive activities are subject to immediate suspension, session revocation, and permanent data purging.
3. **Service Availability & Edge Resiliency:** The platform relies on third-party edge cloud infrastructures. While engineering controls prioritize high availability, automated failover, and data integrity, the platform is provided on an "as-is" and "as-available" basis. Operators disclaim liability for transient upstream outages, global undersea cable disruptions, or force majeure events outside their immediate operational control.