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

User personal data and mailstreams flow through six strictly demarcated lifecycle phases: Collection, Processing, Utilization, Transfer, Retention, and Cryptographic Shredding. All phases execute statelessly across Cloudflare's global Anycast edge network, preventing persistent storage remnants or unauthorized lateral access.

![EpoCanvas Mail Data Processing & Security Pipeline: Minimalist Ingestion, Edge V8 Isolate Compute, AES-256-GCM Envelope Encryption, Tiered Cloudflare Storage, and Cryptographic Shredding](/images/mail/data-security-pipeline.svg)

*Figure 1: End-to-end data lifecycle pipeline. Data minimization and rigorous cryptographic isolation are enforced at every stage; for legal definitions, refer to [Privacy Policy](/en/mail/privacy-policy/) Section 5.*

### 1.1 Minimalist Collection & Strict Zero-Telemetry Guarantee

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Data Minimization & Absolute Zero Telemetry</div>
    <span class="google-pill">Zero Tracking · Zero Profiling</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Strict Data Minimization</strong>: Beyond the account identifiers strictly necessary for registration and routing (username, mailbox alias) and authentication credentials, the system never requests or accesses address books, clipboard buffers, device gyroscopes, or cross-site tracking data.</p>
    <p><strong>Unconditional Zero-Telemetry Policy</strong>: EpoCanvas Mail maintains a strict zero-telemetry architecture across both its official hosted deployment and open-source codebase. We embed zero commercial analytics SDKs, advertising pixel trackers, or third-party monitoring scripts. All interactions execute purely within your local client sandbox.</p>
  </div>
</div>

### 1.2 Ephemeral Edge Compute & V8 Memory Isolation

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚡ Ephemeral Edge Isolates & Volatile RAM Sandboxing</div>
    <span class="google-pill">Cloudflare V8 · Zero Disk Spooling</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Stateless Nanosecond Isolates</strong>: When emails arrive or users initiate requests, business logic executes instantaneously within Cloudflare Workers V8 isolates physically closest to the user. Each isolate environment terminates in nanoseconds post-execution.</p>
    <p><strong>Zero Host Disk Residue</strong>: Decrypted mail payloads and routing parameters reside exclusively in volatile server RAM and are never spooled to physical host drives. This architecture fundamentally eliminates data leaks from long-running daemons, uncollected memory residues, or cross-tenant side-channel attacks.</p>
  </div>
</div>

### 1.3 Cryptographic Key Shredding & Right to Erasure

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🗑️ Cryptographic Shredding & Permanent Erasure</div>
    <span class="google-pill">7-Day Retention · Key Shredding</span>
  </div>
  <div class="google-card-desc">
    <p><strong>7-Day Recovery Window & Routine Purges</strong>: Deleted messages placed in the Trash are held for a 7-day safety window before being irreversibly overwritten by edge Cron triggers; mailboxes exceeding 90% quota trigger automatic physical deletion of trashed items to ensure storage resilience.</p>
    <p><strong>Irreversible Cryptographic Key Shredding</strong>: When an account is terminated, relational database records in D1 and cache entries in KV are purged, and the cryptographic master encryption keys are overwritten in hardware storage, ensuring data becomes mathematically and physically irrecoverable forever.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Data Processing Matrix & Storage Media Specifications

The table below catalogs all data categories, collected fields, processing purposes, underlying storage media, and retention lifecycles. We apply tiered cryptographic controls across all data sensitivity levels:

| Data Category | Specific Items | Processing Purpose | Storage Media & Security Standard | Retention & Disposal |
| --- | --- | --- | --- | --- |
| Account Credentials | Email address, username, password hash & salt, TOTP secret (AES-GCM), recovery hash, Passkey public key | Registration, verification, 2FA, credential recovery | Cloudflare D1; PBKDF2 (100,000 iterations + salt), TOTP at-rest encryption | Retained until termination; purged upon deletion |
| Network & Device Data | Registration IP, last login IP, OS, browser User-Agent, device classification | Security audit, anomaly detection, rate limiting | Cloudflare D1; restricted to administrative audit access | Retained until physical account deletion |
| Session State | JWT token, RBAC role claims, selected mailbox identifier | Edge gateway authorization, routing | Cloudflare KV; maximum 30-day lifetime | Revoked on logout; expires after 30 days inactivity |
| Communications Data | Sender/recipient, CC/BCC, subject, timestamps, read flags, tags, stars, body content | Email delivery, threading, full-text search | Cloudflare D1 (metadata); payload encrypted with AES-256-GCM | Controlled by user; Trash purged after 7 days; auto-purged over 90% quota |
| Attachments | Original filename, MIME type, byte size, raw binary payload | Attachment transport, preview rendering, secure download | Instance object storage (precedence: BYO-S3, Cloudflare R2, fallback KV); defensive headers | Bound to parent email lifecycle; purged together |
| Security & Rate Limits | Failed login attempts, signup rate limits, AI consumption counters | Brute-force defense, anti-abuse throttling | Cloudflare KV; sliding-window counters | Failed logins expire in 12h; signups purged daily; AI logs kept 60 days |
| Security Anomaly Fingerprints | Known devices, login Geo, network ASN fingerprints, 1-hour anti-fatigue markers | Abnormal environment alerts, alert deduplication | Cloudflare KV (`USER_KNOWN_ENV_`); top 15 fingerprints | Purged after 90 days inactivity or account deletion |
| UI Preferences | Locale (6 languages), dark/light theme, notification flags | Interface consistency | Browser localStorage, optional D1 sync | Retained until cache clear or manual reset |

### 2.1 Credential De-identification & PBKDF2 / WebAuthn Standards

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔐 One-Way Cryptographic Salting & Hardware Key Security</div>
    <span class="google-pill">PBKDF2 100k · WebAuthn FIDO2</span>
  </div>
  <div class="google-card-desc">
    <p><strong>PBKDF2 100,000 Iterations Key Stretching</strong>: Password credentials are never stored in plaintext or basic hashes. We mandate cryptographically secure per-user random salts with 100,000 PBKDF2 iterations, providing robust mathematical defense against precomputed rainbow tables and specialized GPU clusters.</p>
    <p><strong>Hardware-Isolated TOTP & FIDO2 Passkeys</strong>: TOTP secrets undergo AES-256-GCM envelope encryption before persistence; Passkeys rely on asymmetric public-key cryptography where private keys never leave user Secure Enclaves, making phishing and credential replay attacks architecturally impossible.</p>
  </div>
</div>

### 2.2 Storage Tiering & BYO-Storage Architecture

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📦 Storage Decoupling & Defensive HTTP Response Headers</div>
    <span class="google-pill">BYO-S3 · Native R2 · KV Fallback</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Three-Tier Dynamic Storage Pipeline</strong>: Attachments resolve via a strict hierarchy: enterprise/user-provided S3-compatible storage (BYO-Storage) first, native Cloudflare R2 second, with KV acting as a lightweight fallback. Bring-Your-Own storage empowers operators with sovereign control over physical file assets.</p>
    <p><strong>Defensive Browser Security Headers</strong>: All file downloads are streamed with mandatory <code>Content-Disposition: attachment</code> and <code>X-Content-Type-Options: nosniff</code> headers, neutralizing malicious in-browser script execution and blocking drive-by download vectors.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Four-Tier Defense-in-Depth Model & Cryptographic Implementation

To insulate communications against complex internet threats, EpoCanvas Mail implements a four-tier defense-in-depth model spanning edge gateways, authentication pipelines, storage encryption, and client sandboxes:

![EpoCanvas Mail Four-Tier Defense-in-Depth Security Model: Layer 1 Edge Gateway, Layer 2 FIDO2 WebAuthn Passkeys, Layer 3 AES-256-GCM At-Rest Encryption, and Layer 4 Client Sandbox & Cryptographic Manifest](/images/mail/defense-layers-architecture.svg)

*Figure 2: Four-tier defense-in-depth model. Each tier operates independently to safeguard data assets even under extreme adversarial pressure.*

The table below outlines our technical, procedural, operational, and auditing standards across 11 key security controls:

| Security Control | Implementation Baseline |
| --- | --- |
| Personnel & RBAC Allocation | Instance operators assign administrators using strict role-based access control (RBAC) |
| Personal Data Demarcation | Scope strictly delineated in Section 2 Data Matrix |
| Risk Assessment & Management | Three encryption modes, lockout thresholds, rate limiting; public source code audit |
| Incident Prevention & Escalation | Governed by Section 4 incident response procedures |
| Operational Processing Protocols | Standard operating procedures mapped in [Privacy Policy](/en/mail/privacy-policy/) Section 5 |
| Access Control & Personnel Vetting | Cryptographic hash routing (anti-IDOR), fail-closed permission checks, parameter sanitization |
| Security Awareness & Training | Mandatory for self-hosted operators; official docs serve as training baselines |
| Facility & Infrastructure Security | Cloudflare edge facilities provide SOC 2 Type II & ISO/IEC 27001 certified physical security |
| Security Audit Trails & Logging | Audit logs (login IP, device fingerprint, failures) kept with strict access; session revocation |
| Evidentiary Retention & Records | Logs kept until account termination; abuse logs preserved per [Acceptable Use Policy](/en/mail/acceptable-use/) |
| Continuous Security Improvement | Open-source project evolution; critical vulnerabilities remediated via public advisories |

### 3.1 Edge Network Infrastructure & Anti-SSRF Gateways

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌐 Edge DDoS Scrubbing & Intelligent Anti-SSRF Protection</div>
    <span class="google-pill">Tier 1 · TLS 1.3 / HSTS</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Global Anycast Edge Scrubbing</strong>: Cloudflare edge infrastructure absorbs and scrubs distributed denial-of-service (DDoS) traffic at scale, enforcing TLS 1.3 encryption and HSTS preloading to eradicate man-in-the-middle interception and protocol downgrade attacks.</p>
    <p><strong>Inbound Anti-SSRF Defense Filter</strong>: Outbound webhooks, image proxies, and URL crawlers pass through rigorous IP validation routines. Ingress requests targeting internal subnets (RFC 1918) or cloud metadata endpoints (e.g., 169.254.169.254) are dropped at the edge barrier.</p>
  </div>
</div>

### 3.2 Strong Authentication & Passwordless Passkeys

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔑 Domain-Bound Passkeys & Adaptive Rate Limiting</div>
    <span class="google-pill">Tier 2 · Fingerprint Anomaly Defense</span>
  </div>
  <div class="google-card-desc">
    <p><strong>FIDO2 WebAuthn Passkey Integration</strong>: Modern passkeys cryptographically bind credentials to our exact root origin, neutralizing credential stuffing and phishing; hardware tokens (YubiKey) and platform biometrics are supported natively.</p>
    <p><strong>Exponential Backoff & Environment Fingerprinting</strong>: Password authentication triggers exponential backoff and a 12-hour lockout upon repeated failures; logins are cross-checked against the top 15 known device/ASN fingerprints, raising real-time alerts upon novel environments.</p>
  </div>
</div>

### 3.3 At-Rest Encryption & Key Segregation

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔒 Industrial-Grade AES-256-GCM Envelope Encryption</div>
    <span class="google-pill">Tier 3 · Cryptographic Segregation</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Per-Message Authentication Tags (Tag)</strong>: Email contents are encrypted with unique keys deriving authenticated ciphertexts (AES-256-GCM) before reaching D1 databases, protecting records against offline database extortion and storage snapshot leaks.</p>
    <p><strong>Runtime Secret Injection</strong>: Primary encryption keys are injected strictly via encrypted Cloudflare Workers runtime variables, never touching source control or storage disks, ensuring absolute physical segregation between storage media and decryption logic.</p>
  </div>
</div>

### 3.4 Client-Side Sandboxing & Tamper-Proof Audit

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Shadow DOM Isolation & Manifest Integrity Verification</div>
    <span class="google-pill">Tier 4 · DOMPurify Sanitization</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Dual-Layer Client HTML Sandboxing</strong>: Untrusted inbound HTML emails pass through strict DOMPurify whitelists, stripping <code>&lt;script&gt;</code>, <code>&lt;iframe&gt;</code>, and inline event handlers, and render within an isolated Shadow DOM to block style leakage and session theft.</p>
    <p><strong>Immutable Public Verification Manifest</strong>: Official documentation specifications are cryptographically cross-verified against Git Commit hashes and SHA-256 digests, ensuring transparency and verifiable integrity across public deployments.</p>
  </div>
</div>

:::caution[Scope & Technical Limitations of Encryption]
The "All / Privacy / Encrypted" storage modes provide Server-side Encryption at Rest. Encryption keys derive from instance runtime secrets and authenticated session contexts. This architecture mitigates risks from physical disk theft, backup extraction, and unauthorized database access; it is not End-to-End Encryption (E2EE), as server administrators technically retain the ability to inspect payloads during processing. For state-level confidentiality or untrusted host environments, users must apply client-side cryptographic tools such as GPG / PGP locally prior to message dispatch.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. Dual-Nature Fusion & Open-Source Governance Boundaries

EpoCanvas Mail embodies a fundamental "Dual-Nature": it operates as a free, publicly accessible managed cloud service, while simultaneously standing as an MIT-licensed open-source software project. Clear demarcation between these facets is vital to our community ecosystem:

![EpoCanvas Mail Dual-Nature Governance & Global Compliance Matrix: Hosted Cloud Service vs. Open-Source Project boundaries, alongside GDPR, CCPA, and APAC regulatory alignments](/images/mail/dual-nature-compliance-matrix.svg)

*Figure 3: Dual-nature governance boundaries and global compliance matrix. Upstream developers supply codebase artifacts; independent operators serve as sole Data Controllers; users enjoy complete autonomy over hosting choices.*

### 4.1 Hosted Service Commitments & Limitations of Liability

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">☁️ Official Hosted Cloud Service Commitments</div>
    <span class="google-pill">mail.epocanvas.com · Non-Commercial SLA</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Public Service Availability</strong>: The official hosted platform at <code>mail.epocanvas.com</code> is maintained by the core engineering team as an independent operator. We commit to maintaining high node availability, zero-telemetry operations, and cryptographic integrity standards.</p>
    <p><strong>Disclaimer & User Backup Responsibilities</strong>: Provided as a free community public service, the hosted deployment does not provide commercial enterprise SLAs, nor does it assume liability for upstream cloud outages (such as Cloudflare disruptions) or user credential negligence. Users remain ultimate custodians of their communication records and must maintain periodic local backups.</p>
  </div>
</div>

### 4.2 Open-Source Licensing, Secondary Forks & Distribution Rules

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📜 MIT Codebase Rights & Brand Governance Redlines</div>
    <span class="google-pill">MIT License · Trademark Isolation · Disclaimers</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Source Code Freedom & Auditability</strong>: The underlying codebase is licensed under the permissive MIT License. Anyone possesses the legal right to inspect code, conduct audits, build private commercial services, or maintain public forks.</p>
    <p><strong>Mandatory Distribution Redlines</strong>:</p>
    <ul>
      <li><strong>Trademark & Brand Isolation</strong>: Third-party deployments or modified distributions may not use "Official EpoCanvas Mail", "Official Node", or deceptive brandings in their domain names, logos, or marketing;</li>
      <li><strong>License & Copyright Preservation</strong>: All redistributed source code copies or substantial portions must retain original author copyright notices and the MIT License verbatim;</li>
      <li><strong>Independent Privacy Notices</strong>: Downstream developers hosting public instances must display their own legal entity identities and privacy policies, and may not link to official policies as operational guarantees.</li>
    </ul>
  </div>
</div>

### 4.3 Self-Hosted Operator Obligations as Sole Data Controllers

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚖️ Independent Operator Duties & Autonomous Control</div>
    <span class="google-pill">Exclusive Data Controller · Zero Upstream Recourse</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Exclusive Data Controller Status</strong>: When a third-party deploys an instance on their own Cloudflare account or infrastructure, <strong>that operator acts as the sole, exclusive Data Controller</strong>. Upstream open-source authors possess zero access, zero technical control, and zero joint liability.</p>
    <p><strong>Jurisdictional Compliance Responsibilities</strong>: Self-hosted operators bear sole legal responsibility for configuring secure environment secrets, establishing localized privacy notices, executing user erasure requests, and handling lawful regulatory inquiries independently.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. Global Jurisdictional Compliance & Cross-Border Data Flows

EpoCanvas Mail serves a global community. To empower users with clear awareness of their rights and jurisdictional realities across borders without restricting service access, we adhere to international data protection principles:

### 5.1 European Economic Area (GDPR) Rights & Cross-Border Safeguards

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇪🇺 EU GDPR Statutory Rights & Transfer Safeguards</div>
    <span class="google-pill">GDPR Art. 15-22 · Art. 6 · SCCs</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Data Subject Statutory Rights (Articles 15–22)</strong>: European users hold unequivocal rights to access, rectify, export, restrict processing, and demand permanent erasure of their personal mailboxes.</p>
    <p><strong>Lawful Processing & Standard Contractual Clauses (SCCs)</strong>: Processing relies upon contractual necessity (Art. 6(1)(b)) or explicit informed consent (Art. 6(1)(a)); cross-border transit across Cloudflare's Anycast nodes is legally safeguarded by EU Standard Contractual Clauses (SCCs) and GDPR data processing addenda.</p>
  </div>
</div>

### 5.2 United States (CCPA / CPRA) Privacy Rights & No-Sale Pledge

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇺🇸 California CCPA / CPRA Consumer Rights</div>
    <span class="google-pill">Do Not Sell / Share · Non-Discrimination</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Absolute No Sale or Sharing Pledge</strong>: We state unequivocally: we have not sold or shared, and will never sell, rent, or share personal data or communications with data brokers, ad networks, or commercial entities (Do Not Sell or Share My Personal Information).</p>
    <p><strong>Right to Know & Non-Discrimination</strong>: California residents enjoy rights to know collected categories, commercial purposes, and to request deletion; we will never discriminate against users in bandwidth, capacity, or performance for exercising privacy rights.</p>
  </div>
</div>

### 5.3 Asia-Pacific Frameworks & User Self-Protection Responsibilities

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌏 Asia-Pacific Compliance & User Security Responsibilities</div>
    <span class="google-pill">Taiwan PDPA · Cross-Border Transit · Client Security</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Jurisdiction & Transit Pathway Realities</strong>: Hosted operations are headquartered in Taiwan, adhering strictly to Taiwan's Personal Data Protection Act (PDPA). Users acknowledge that public internet SMTP routing may traverse intermediate global exchange points subject to international transit laws.</p>
    <p><strong>Endpoint Security & Anti-Abuse Standards</strong>: Users maintain responsibility for securing their client environments (patching OS, avoiding malware, activating Passkeys/TOTP); abusing services for cyberattacks or unsolicited bulk spam triggers immediate termination under our [Acceptable Use Policy](/en/mail/acceptable-use/).</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. Security Incident Response & Regulatory Cooperation

To maintain rapid containment and absolute transparency during potential security incidents or vulnerability disclosures, EpoCanvas Mail enforces a standardized Incident Response SOP:

### 6.1 72-Hour Containment & Breach Notification Pipeline

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🚨 Emergency Incident Response Standard Operating Procedure</div>
    <span class="google-pill">72h Notice · Rapid Quarantine · Upstream Patching</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Four-Step Incident Response Protocol</strong>:</p>
    <ul>
      <li><strong>Immediate Threat Quarantine</strong>: Malicious IPs are blocked at edge gateways, compromised JWT sessions are revoked, and master secrets rotated within minutes;</li>
      <li><strong>Forensic Auditing & Scope Assessment</strong>: Edge audit logs are isolated to determine affected account scopes, exposed data elements, and risk severity;</li>
      <li><strong>72-Hour Statutory Notification</strong>: Where mandated, affected users receive in-app notifications and official emails within 72 hours alongside formal regulatory filings;</li>
      <li><strong>Upstream Patching & Public Advisory</strong>: Root vulnerabilities are remediated in the public GitHub repository with synchronized Security Advisories for global self-hosters.</li>
    </ul>
  </div>
</div>

### 6.2 Regulatory Cooperation & Official Reporting Channels

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📮 Official Incident Reporting & Compliance Inquiries</div>
    <span class="google-pill">Official Liaison · Vulnerability Reports</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Compliance Audits & Operator Segregation</strong>: The official hosted platform <code>mail.epocanvas.com</code> cooperates with lawful administrative oversight. Operators of independent self-hosted nodes must formulate separate internal policies and independently interface with their regional regulators. Security researchers discovering vulnerabilities should report directly via official channels:</p>
    <ul>
      <li><strong>Security Incident Response Center</strong>: <code>announcement@epocanvas.com</code></li>
      <li><strong>Data Protection & Privacy Office</strong>: <code>privacy@epocanvas.com</code></li>
    </ul>
  </div>
</div>
