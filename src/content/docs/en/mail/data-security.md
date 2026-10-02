---
title: Data Processing & Security Operations
description: Technical architecture, cryptographic standards, data lifecycle matrix, dual-nature governance, and global regulatory compliance for EpoCanvas Mail.
---

**Effective Date: October 1, 2026 | Version: 5.6**

<div class="google-hero-card">
  <div class="google-hero-lead">
    EpoCanvas Mail operates under a core engineering ethos: "Privacy is a Fundamental Human Right" and "Code is the Contract." Our platform is structured upon a foundational Dual-Nature Fusion: combining a zero-telemetry, zero-ad managed cloud service with an autonomous, open-source software project. This document discloses our end-to-end data lifecycle, cryptographic at-rest storage matrix, four-tier defense-in-depth engineering, and multi-jurisdictional compliance boundaries across global legal frameworks.
  </div>
  <div class="google-hero-meta">
    <span class="google-pill">🛡️ Strict Zero Telemetry</span>
    <span class="google-pill">🔐 AES-256-GCM At-Rest Encryption</span>
    <span class="google-pill">⚡ Ephemeral V8 Edge Compute</span>
    <span class="google-pill">🌐 Global Compliance (GDPR / CCPA)</span>
  </div>
</div>

This document is governed by our [Privacy Policy](/en/mail/privacy-policy/) and [Terms of Service](/en/mail/terms-of-service/). It serves as an authoritative guide for users verifying our privacy guarantees, as an operational baseline for self-hosted node administrators, and as an audit specification for regulatory authorities.

## 1. End-to-End Data Lifecycle & Edge Processing Model

The lifecycle of personal communications within EpoCanvas Mail is strictly delineated into six distinct operational phases: Collection, Processing, Utilization, Transmission, Storage, and Irreversible Disposal. Every stage executes statelessly across Cloudflare's global Anycast edge network, preventing unauthorized data persistence and cross-tenant leakage.

![EpoCanvas Mail Data Lifecycle: Collect -> Process -> Use -> Transfer -> Retain -> Destroy with storage media mapping and legal criteria](/images/mail/data-flow.svg)

*Figure 1: Full-lifecycle personal data pipeline. Every phase strictly enforces the principle of data minimization and cryptographic isolation; see Section 5 of the [Privacy Policy](/en/mail/privacy-policy/) for legal processing bases.*

### 1.1 Minimalist Ingestion & Zero Telemetry Commitment

The ingestion phase enforces strict data minimization. The system collects only the minimal identifiers necessary for account authentication (username and email aliases). We never ingest address books, device telemetry, gyroscope readings, clipboard buffers, or cross-site tracking markers. We make an absolute commitment: **EpoCanvas Mail enforces a strict Zero Telemetry policy across both our official hosted instance and our open-source codebase**. No commercial analytics SDKs, advertising trackers, or telemetry beacons exist within the application; user interactions remain strictly confined to the local client environment.

### 1.2 Ephemeral Execution & Isolated V8 Memory

When incoming messages arrive or user actions are initiated, application logic executes instantaneously within ephemeral Cloudflare Workers V8 Isolates deployed at edge nodes geographically closest to the user. V8 Isolates are initialized in nanoseconds and physically destroyed immediately upon request completion. Decrypted payloads exist exclusively within volatile runtime memory and are never written to physical host disks. This stateless design architecturally eliminates persistent memory contamination, resident worker leaks, and multi-tenant side-channel vulnerabilities.

### 1.3 Cryptographic Erasure & Irreversible Purge

To honor the statutory "Right to be Forgotten," EpoCanvas Mail enforces an automated, irrevocable data disposal schedule. Messages moved to the Trash are retained for a 7-day recovery buffer, after which an automated edge Cron Trigger permanently purges database records. If mailbox quota exceeds 90%, soft-deleted messages are proactively scrubbed to preserve system health. When an account is terminated by the user, the platform not only expunges all relational records from D1 and KV caches, but also securely overwrites derived encryption key material, rendering historical communications mathematically irrecoverable.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Comprehensive Data Processing Matrix & Storage Media Standards

The following matrix categorizes all data items processed by the platform, detailing processing purposes, underlying storage media, security criteria, and retention lifecycles:

| Data Category | Specific Data Elements | Processing Purpose | Storage Media & Security Standard | Retention & Disposal Lifecycle |
| --- | --- | --- | --- | --- |
| Account Credentials | Email address, username, salted password hash, TOTP secret (AES-GCM encrypted), backup codes, Passkey public key | Account registration, authentication, 2FA enforcement, credential recovery | Cloudflare D1; PBKDF2 (100,000 salted iterations), TOTP at-rest encryption | Retained until account termination; permanently purged upon deletion |
| Network & Device Metadata | Registration IP, recent sign-in IP, OS, User-Agent, device classification | Security auditing, anomaly detection, rate-limiting enforcement | Cloudflare D1; restricted to administrative audit access | Retained until account physical deletion |
| Session & Gateway State | JWT tokens, RBAC permission roles, active mailbox bindings | Edge gateway authorization, API request routing | Cloudflare KV; maximum 30-day sliding TTL | Revoked upon logout; naturally expired after 30 days of inactivity |
| Mailbox Payloads | Sender, recipients, CC/BCC, subject, timestamps, read state, labels, stars, message body | Mail delivery, conversation threading, full-text search | Cloudflare D1 (metadata); message bodies encrypted via AES-256-GCM | Controlled by data subject; 7-day Trash auto-purge; quota emergency purge at 90% |
| Message Attachments | Original filename, MIME type, byte size, raw binary payload | Attachment transport, inline preview, secure downloading | Instance object storage (S3 BYO-Storage > Cloudflare R2 > Cloudflare KV fallback) | Bound to message lifecycle; expunged upon parent message deletion |
| Security & Abuse Telemetry | Failed login counters, registration rate-limit trackers, AI quota records | Brute-force mitigation, anti-abuse throttling | Cloudflare KV; fixed-window counters | Failed logins expire in 12 hours; registration logs cleared daily; AI records 60 days |
| Environmental Fingerprints | Known device hashes, Geo-location, ASN network markers, 1h quiet timestamps | Environmental anomaly detection, alarm fatigue suppression | Cloudflare KV (`USER_KNOWN_ENV_` prefix); retains 15 recent fingerprints | Expunged after 90 days of inactivity or upon account deletion |
| Client UI Preferences | Selected language (6 locales), dark/light theme, notification flags | Interface consistency and user experience | Browser localStorage; optionally synchronized to D1 | Retained until client cache clear or manual preference reset |

### 2.1 Credential Sanitization & PBKDF2 / WebAuthn Storage Standards

User authentication credentials receive rigorous unidirectional cryptographic protection. Password authentication strictly avoids plaintext or legacy MD5/SHA algorithms, utilizing PBKDF2 with high-entropy salts over 100,000 iterations to withstand GPU-accelerated offline rainbow table attacks. Two-Factor Authentication (TOTP RFC 6238) secrets are symmetrically encrypted using AES-256-GCM before storage in D1. Passkeys (FIDO2 / WebAuthn) rely on asymmetric cryptography: the server only stores the public key credential, while the private key never leaves the user's hardware Secure Enclave, mathematically eliminating server-side credential exfiltration risks.

### 2.2 Storage Tiering & Bring-Your-Own (BYO) Storage Architecture

For attachments and binary payloads, EpoCanvas Mail provides a decoupled, tiered storage architecture. Storage channels resolve intelligently: prioritizing self-hosted S3-compatible buckets (Bring-Your-Own Storage), secondary Cloudflare R2 edge native buckets, and graceful fallback to Cloudflare KV for lightweight deployments. User-configured storage maintains isolated credentials, providing enterprise data sovereignty. All attachment delivery endpoints enforce mandatory `Content-Disposition: attachment` and `X-Content-Type-Options: nosniff` headers to neutralize browser-side inline payload execution.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Four-Tier Defense-in-Depth Architecture & Cryptographic Standards

To protect user communications against complex global threat actors, EpoCanvas Mail implements an architectural four-tier defense-in-depth strategy spanning network boundaries, authentication layers, persistent storage, and client runtime:

![EpoCanvas Mail Four-Tier Defense-in-Depth Infrastructure Model](/images/mail/partition-security.svg)

*Figure 2: Four-tier defensive model. Each tier operates autonomously and redundantly; a potential threat at an individual layer is contained before compromising core data assets.*

The following matrix documents our implementation of 11 critical technical, administrative, and organizational security standards:

| Security Domain | Technical Implementation & Governance Standard |
| --- | --- |
| Personnel & Access Management | Designated instance administrators with strict RBAC permission tiering |
| Personal Data Boundary Definition | Explicit data processing inventory defined in Section 2 of this document |
| Risk Assessment & Management | Three selectable mail encryption modes, failed login lockouts, rate limiting; open-source public audit |
| Incident Prevention & Response | Standardized 4-step emergency response SOP detailed in Section 6 |
| Internal Management Procedures | Formal data processing activity mappings defined in Privacy Policy Section 5 |
| Access Control & Authorization | Cryptographic HMAC route obfuscation, fail-closed authorization, gateway parameter stripping |
| Training & Community Awareness | Independent self-hoster operational guidelines; official technical documentation |
| Infrastructure Physical Security | Cloudflare edge infrastructure certifications (SOC 2 Type II, ISO/IEC 27001); secret environment injection |
| Security Audit & Verification | Auditable security logs (IP, device, failures); instant sliding session revocation |
| Evidentiary & Trail Preservation | Authentication audit logs preserved until deletion; abuse evidence handled per Acceptable Use Policy |
| Continuous Security Improvement | Open-source project version cadence; responsible vulnerability disclosures and CVE patches |

### 3.1 Layer 1: Edge Gateway & Anti-Abuse Hardening

Operating as our primary shield, Cloudflare's Anycast edge network absorbs and mitigates distributed denial-of-service (DDoS) attacks while enforcing strict TLS 1.3 encryption and HSTS preloading to neutralize man-in-the-middle interception and downgrade vulnerabilities. Edge gateways incorporate aggressive Server-Side Request Forgery (SSRF) filters: outbound requests from webhooks or image scrapers attempting access to private subnets (RFC 1918) or cloud metadata endpoints (e.g., 169.254.169.254) are rejected at the edge.

### 3.2 Layer 2: WebAuthn & Phishing-Resistant Credentials

Our authentication tier eliminates reliance on brittle passwords through deep FIDO2 / WebAuthn integration. Passkeys are cryptographically bound to the deployment domain, neutralizing real-time phishing reverse proxies. For password-based flows, adaptive rate limiting enforces exponential backoff and 12-hour lockouts after consecutive failed attempts. An environmental fingerprint baseline (retaining the 15 most recent devices and network ASNs) triggers automated tiered security notifications upon unrecognized logins.

### 3.3 Layer 3: AES-256-GCM At-Rest Encryption & Key Isolation

All persistent storage implements authenticated AES-256-GCM encryption at rest. Prior to insertion into Cloudflare D1 databases, message bodies are encrypted with contextual key material and assigned an authentication tag, safeguarding against unauthorized database snapshot analysis or offline disk theft. Cryptographic keys are injected dynamically via runtime environment variables and segregated from persistent tables, ensuring data remains unreadable even if raw database storage is compromised.

### 3.4 Layer 4: Client-Side Shadow DOM Sandbox & Immutable Integrity

The presentation interface enforces strict client-side sandbox isolation. Incoming HTML email payloads are sanitized via DOMPurify to strip `<script>`, `<style>`, `<iframe>`, `<form>`, and inline event handlers, and are rendered within an isolated Shadow DOM container to prevent UI redress, session theft, and DOM-based XSS. Furthermore, official documentation is cryptographically anchored with SHA-256 digests and Git release commits to guarantee transparent, immutable audit trails.

:::caution[Scope & Technical Limitations of Encryption]
The "All / Privacy / Encrypted" mail modes provided by EpoCanvas Mail refer to authenticated server-side encryption at rest (Server-side Encryption at Rest). Encryption keys are derived from instance runtime environment secrets and user identity contexts. This mechanism guards against infrastructure leaks, physical media theft, and database dump exposures; it does not constitute End-to-End Encryption (E2EE). Operators with root access to runtime environment variables possess technical decryption capability. For sensitive correspondence requiring zero operator visibility, users must encrypt message bodies locally using GPG/PGP tools prior to transmission.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. Dual-Nature Governance & Open-Source Responsibilities

EpoCanvas Mail embodies a fundamental "Dual Nature": it functions both as a free managed community mail service and as an open-source software project licensed under the MIT License. Establishing clear legal boundaries between these dimensions preserves a healthy, transparent ecosystem:

![EpoCanvas Mail Responsibility Boundaries: Upstream Open-Source Project -> Instance Operator -> Data Subject](/images/mail/self-host-responsibilities.svg)

*Figure 3: Dual-nature governance architecture. The upstream open-source repository provides code only; instance operators act as autonomous data controllers bearing sole operational liability; users retain complete freedom to choose hosted convenience or sovereign self-hosting.*

### 4.1 Hosted Service Operations & Liability Limitations

The official hosted instance at `mail.epocanvas.com` is maintained by the core project team as an independent operator. We commit to maintaining high node availability, strict zero-telemetry compliance, and verifiable cryptographic integrity. However, as a free community-supported service, it is provided without commercial enterprise SLAs (Service Level Agreements). We disclaim liability for indirect damages arising from force majeure, third-party upstream cloud outages, or user-side credential negligence. Users bear ultimate responsibility for their communications and should regularly export mailbox backups.

### 4.2 Open-Source Licensing, Forks & Distribution Guidelines

The EpoCanvas Mail codebase is distributed globally under the permissive MIT License. Anyone has the unrestricted legal right to inspect, audit, fork, customize, or deploy independent private mail clusters. When distributing derivative works or deploying public services, developers must adhere to these governing guidelines:
1. **Brand & Trademark Protection**: Independent operators and forks may not use "EpoCanvas Mail Official," "Official Node," or confusingly similar trademarks in domains, UI headers, or marketing to deceive the public or misrepresent affiliation with the upstream team;
2. **Attribution & Notice Preservation**: All redistributed copies or substantial portions of the software must retain original copyright notices and the MIT License text;
3. **Independent Legal Terms**: Operators offering public mailbox accounts must publish their own terms of service and privacy notices, and must not point to official project domains as their legal coverage.

### 4.3 Autonomous Self-Hosted Node Compliance Mandate

When an individual or enterprise deploys EpoCanvas Mail on their own Cloudflare account or infrastructure, **that operator acts as the sole and exclusive "Data Controller" for their instance**. Upstream open-source contributors and hosted instance operators possess zero physical access, zero administrative keys, and zero legal liability for third-party deployments. Self-hosted administrators must independently fulfill regional regulatory duties: securing environment variables, publishing privacy notices, processing deletion requests, and complying with lawful regulatory subpoenas.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. Global Regional Compliance & Cross-Border Frameworks

EpoCanvas Mail operates across the global Internet. To guarantee unimpeded communication access while ensuring users comprehend their data sovereignty rights and jurisdictional risks, we align our operations with major international regulatory frameworks:

### 5.1 EU / EEA General Data Protection Regulation (GDPR)

For users residing in the European Union (EU) and European Economic Area (EEA), the platform aligns with the GDPR:
- **Data Subject Rights (Articles 15–22)**: Users hold statutory rights to access, rectify, export, restrict processing, and demand permanent erasure of their personal data;
- **Lawful Bases for Processing (Article 6)**: Data processing is grounded strictly upon contractual necessity for service delivery (Art. 6(1)(b)) or explicit user consent (Art. 6(1)(a));
- **International Data Transfers (Chapter V)**: Cloudflare's Anycast routing may transit data through international edge nodes. Hosted service operations rely upon Cloudflare's standard EU Standard Contractual Clauses (SCCs) and GDPR Data Processing Addendum to guarantee lawful cross-border transfers.

### 5.2 United States Jurisdictions (CCPA / CPRA)

In compliance with California and other state consumer privacy statutes, EpoCanvas Mail provides explicit statutory disclosures:
- **Zero Sale or Sharing of Personal Information**: We affirm that we have not sold or shared personal information in the preceding 12 months, and will never sell, rent, or share personal data with commercial data brokers or advertisers;
- **Notice at Collection & Non-Discrimination**: California consumers possess statutory rights to request information disclosure and deletion. EpoCanvas Mail never discriminates in service quality, storage allocations, or latency against users exercising their privacy rights.

### 5.3 Asia-Pacific Regulations & User Risk Awareness

For users across the Asia-Pacific region (including Taiwan PDPA, Singapore PDPA, and Japan APPI), the managed service `mail.epocanvas.com` is operated by a Taiwan-based team in accordance with local data protection frameworks. Given the architecture of the open Internet, users acknowledge and accept:
1. **Multi-Jurisdictional Routing**: Cross-border email transiting standard SMTP relays inevitably passes through international intermediate exchange nodes subject to transit telecom regulations;
2. **Client Security Responsibility**: Users bear primary responsibility for endpoint security (maintaining OS patches, updating browsers, utilizing Passkeys or TOTP) to prevent credential compromise;
3. **Acceptable Use Enforcement**: Communications involving cyberattacks, unsolicited spamming, phishing, or statutory violations will be terminated pursuant to our [Acceptable Use Policy](/en/mail/acceptable-use/).

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. Security Incident Response & Regulatory Cooperation

To maintain rapid containment and absolute transparency during potential security incidents or vulnerability disclosures, EpoCanvas Mail enforces a standardized Incident Response SOP:

### 6.1 72-Hour Containment & Breach Notification Pipeline

Upon detecting or receiving notice of a security event involving unauthorized data access, modification, or exposure, the operations team executes a 4-step emergency protocol:
1. **Immediate Threat Isolation**: Within minutes of detection, edge gateways block malicious IPs, invalidate compromised JWT sessions, and execute cryptographic key rotations;
2. **Forensic Audit & Impact Assessment**: Detailed edge logs are isolated to determine affected account scopes, exposed data elements, and risk severity;
3. **72-Hour Statutory Notification**: Where required by law, affected data subjects receive in-app notifications and official emails within 72 hours, and formal incident filings are submitted to regulatory authorities;
4. **Root Cause Remediation & Advisory**: Identified vulnerabilities are patched in the upstream open-source codebase, and public Security Advisories are issued to alert self-hosted operators globally.

### 6.2 Regulatory Cooperation & Official Reporting Channels

The official hosted service `mail.epocanvas.com` cooperates with lawful administrative inquiries. This document and our legal policies serve as our foundational compliance baseline. Operators of independent self-hosted instances must independently respond to regulatory oversight within their home jurisdictions. If you identify a security vulnerability, forged official communication, or integrity anomaly, report immediately via our trusted channels:
- **Security Incident Response Center**: `announcement@epocanvas.com`
- **Data Protection & Privacy Office**: `privacy@epocanvas.com`
