---
title: Data Processing & Security Maintenance
description: EpoCanvas Mail end-to-end data security, dual-nature cloud and open-source governance, and global regulatory compliance.
---

**Effective Date: October 1, 2026 | Archived Versions | Version: 5.6**

When you use EpoCanvas Mail, you trust us with your personal communications and data. We understand that this is a major responsibility and work hard to protect your information, uphold absolute transparency, and ensure that you remain in complete control of your data at all times.

This document is governed by our [Privacy Policy](/en/mail/privacy-policy/) and [Terms of Service](/en/mail/terms-of-service/). It serves as an authoritative guide for users on our official hosted platform (mail.epocanvas.com), while establishing clear legal boundaries for the open-source codebase (epocanvas-mail) and the independent data controller liabilities of self-hosted operators.

<div class="privacy-checkup-row">
  <div class="privacy-checkup-icon">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#E8F0FE"/>
      <path d="M20 9L29 13V19C29 24.5 25.2 29.6 20 31C14.8 29.6 11 24.5 11 19V13L20 9Z" fill="#1967D2"/>
      <path d="M17 20L19.2 22.2L23.8 17.6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="privacy-checkup-content">
    <div class="privacy-checkup-title">Privacy & Security Quick Guide</div>
    <div class="privacy-checkup-desc">Looking to review your mailbox security, configure FIDO2 Passkeys, enable two-factor authentication (TOTP), or export your data?</div>
    <a href="/en/mail/overview/" class="privacy-checkup-link">Go to Security Overview ↗</a>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 1. We Build Security into Our Services to Protect Your Information

All data processed across our official hosted cloud service (mail.epocanvas.com) is safeguarded by multiple layers of built-in defense-in-depth engineering. We openly detail every phase of data processing so you can verify our cryptographic safeguards.

<div class="google-illustration-container">
  <img src="/images/mail/security-trust-shield.svg" alt="EpoCanvas Mail Security and Trust Guarantees" width="416" height="276" />
</div>

### 1.1 Encryption in Transit & Network Channel Security

We enforce modern Transport Layer Security (TLS 1.3) with HTTP Strict Transport Security (HSTS) preloading across all inbound and outbound network connections. Whether you interact with the web client, access the backend via authenticated REST APIs, or route email across intermediate relays, your communication stays encrypted in transit, neutralizing eavesdropping, packet tampering, and downgrade attacks.

### 1.2 Ephemeral Edge Compute & Memory Isolation

When you send or receive mail, business logic executes instantaneously within Cloudflare Workers V8 isolates physically nearest to you. Mail payloads are decrypted only in volatile server RAM during transit and are wiped in nanoseconds as the isolate terminates. No decrypted data is ever spooled to physical host disks, eradicating side-channel leaks, lingering daemon residues, and cross-tenant memory snooping.

### 1.3 Industrial-Grade Storage Encryption at Rest (AES-256-GCM)

Before emails and sensitive metadata are committed to Cloudflare D1 relational databases, payloads are sealed with distinct, dynamically generated initialization vectors (IVs) using authenticated AES-256-GCM encryption. Encryption keys are injected dynamically via secure Cloudflare runtime environment secrets—never stored in repositories, committed to disks, or exposed in logs. Even if underlying database volumes or offline snapshots were compromised, all records remain mathematically unreadable.

### 1.4 Credential Hashing & Hardware-Bound Passkeys

Account credentials are never stored in plaintext or simple hashes. Passwords undergo 100,000 rounds of PBKDF2 iteration with cryptographically secure random salts, resisting offline rainbow tables and GPU brute-force attacks. Two-factor TOTP secrets are encrypted at rest with the instance master key. The platform natively supports FIDO2 / WebAuthn Passkeys, where private keys reside immutably inside your device's Secure Enclave, providing mathematical immunity to phishing.

### 1.5 Comprehensive Data Processing Matrix

The following table itemizes all categories of data collected, specific fields, processing purposes, storage media, and retention periods:

| Data Category | Specific Fields Collected | Core Processing Purpose | Storage Media & Protection | Retention & Erasure Schedule |
| --- | --- | --- | --- | --- |
| **Account Credentials** | Email address, username, password hash and salt, TOTP secret, backup codes, Passkey public key | User registration, authentication, 2FA validation, credential recovery | Cloudflare D1; PBKDF2 (100,000 iterations), TOTP AES encrypted | Retained until account termination; permanently overwritten upon account deletion |
| **Communications** | Sender, recipients, CC/BCC, subject, timestamps, read flags, custom labels, message body | Message routing, mailbox organization, search indexing | Cloudflare D1 (metadata); body strictly sealed via AES-256-GCM | Controlled by user; Trash retains 7-day recovery buffer before automated cryptographic erasure |
| **Network & Device Data** | Registration IP, recent login IP, OS, User-Agent, device type identifier | Account security audits, anomaly detection, rate limiting, brute-force defense | Cloudflare D1; restricted to administrative security audits; never used for commercial profiling | Retained until account entity deletion |
| **Session & Authorization** | JWT session tokens, RBAC roles, active mailbox context | Edge API gateway authorization, microservice routing | Cloudflare KV; maximum 30-day lifetime | Revoked immediately upon logout; expires naturally after 30 days of inactivity |
| **Attachment Assets** | Original filename, MIME type, byte size, binary payload | Safe asset transfer, inline preview, streaming downloads | Configurable BYO-S3 bucket, Cloudflare R2, or KV; served with defensive security headers | Follows parent email lifecycle; purged simultaneously upon hard deletion |
| **Security Fingerprints** | Known devices, geographical ASN footprint, anti-alarm fatigue timestamps | Identifying unfamiliar logins, credential stuffing prevention | Cloudflare KV (`USER_KNOWN_ENV_` prefix); retains top 15 fingerprints | Pruned automatically after 90 days of inactivity or upon account deletion |

:::caution[Encryption Scope, Technical Limits & User Risk Acknowledgment]
Encryption provided by our official hosted cloud service constitutes **Server-Side Encryption at Rest**. Cryptographic keys are loaded into server execution memory during active delivery routines. This design protects against database theft, compromised storage media, and offline snapshot extraction, but does not represent end-to-end encryption (E2EE).

Operators with root infrastructure access theoretically retain technical decryption capabilities. We place zero obstacles on anyone utilizing our service, but users must fully understand their own risk profile: If your communications involve state-level sensitivity, extreme trade secrets, or demand zero-trust privacy where no host can ever inspect content, **you must independently employ client-side tools (such as GPG / OpenPGP) to encrypt message bodies locally before transmission**.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Dual-Nature Architecture: Hosted Cloud Service & Open-Source Codebase

EpoCanvas Mail embodies a unique "Dual Nature": it functions both as a free hosted communications service accessible to the public, and as an autonomous open-source software project distributed under the MIT License. Establishing explicit legal boundaries between the two is vital to a healthy, sustainable ecosystem.

<div class="google-illustration-container">
  <img src="/images/mail/dual-nature-scale.svg" alt="EpoCanvas Mail Dual-Nature Governance Balance" width="416" height="276" />
</div>

### 2.1 Hosted Cloud Service Commitments (mail.epocanvas.com)

The official hosted platform at `mail.epocanvas.com` is operated independently by the core development team as a public benefit. We commit to maintaining reliable service availability, strict zero-commercial-ad policies, zero behavioral tracking, and cryptographic integrity.

Because the hosted platform is provided free of charge, it does not carry enterprise commercial Service Level Agreements (SLAs). We disclaim liability for indirect damages arising from upstream backbone outages (such as global Cloudflare fiber cuts) or compromised user devices. Users retain ultimate custodianship over their communications and should maintain regular offline backups.

### 2.2 What We Expect from You & Anti-Abuse Standards

We strive to maintain a safe, welcoming, and dependable communication environment. In accessing or using our hosted platform, you agree to uphold fundamental standards of conduct:

*   **Comply with Applicable Laws**: Do not use the service to violate export controls, economic sanctions, or third-party statutory rights;
*   **Zero Tolerance for Spam**: You are strictly prohibited from transmitting unsolicited bulk marketing emails, marketing blasts, or high-frequency harassment messages;
*   **Prohibition of Phishing & Attacks**: You must not distribute malware, trojans, or ransomware, spoof sender headers, impersonate financial institutions, or conduct adversarial penetration attacks against our systems;
*   **No Automated Exploitation**: You must not use automated bots to register accounts in bulk or bypass rate limits. Accounts violating these standards will be terminated immediately.

### 2.3 Open-Source Licensing, Forks & Secondary Distribution

The complete source code of EpoCanvas Mail is published under the permissive MIT License. Anyone worldwide possesses the unrestricted legal right to inspect, audit, fork, customize, or deploy independent private mail nodes.

When redistributing or modifying the code, developers must respect three strict legal boundaries:

*   **Trademark & Brand Isolation**: Without prior written authorization, no third-party self-hosted instance, commercial derivative, or community fork may use the names "EpoCanvas Mail Official", "Official Node", or official brand logos in domains, app titles, or marketing;
*   **Preservation of Copyright Notices**: All copies, substantial portions, or derivative works must retain the original copyright notice and the full text of the MIT License;
*   **Independent Operator Disclosures**: Any party offering hosted email services to the public based on this code must publish their own corporate identity, terms of service, and privacy policy, and may not cite our official docs as their own legal warranty.

### 2.4 Exclusive Data Controller Responsibility for Self-Hosted Nodes (Legal Shield)

This is the cornerstone legal distinction of our open-source software model:

When third parties deploy this codebase onto their own Cloudflare accounts, private servers, or third-party cloud infrastructure, **that independent operator becomes the sole and exclusive Data Controller for their instance under global privacy laws**.

The upstream open-source authors possess zero technical backdoors, zero telemetry ingestion, and zero physical ability or legal duty to inspect or govern third-party deployments. Any data breach, service downtime, regulatory sanction, or legal dispute occurring on a third-party self-hosted deployment is **the sole, exclusive liability of that self-hosted operator; upstream authors and contributors bear zero joint or secondary liability**.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Controlling Your Data: Export, Deletion & Global Jurisdiction Compliance

EpoCanvas Mail is open to users globally. Regardless of where you reside, you retain absolute ownership and control over your communications. We impose no arbitrary barriers on your use of the service, but provide transparent disclosures regarding legal jurisdictions and transit risks.

<div class="google-illustration-container">
  <img src="/images/mail/data-sovereignty-export.svg" alt="EpoCanvas Mail Data Sovereignty and Export Rights" width="416" height="276" />
</div>

### 3.1 European Economic Area (GDPR) Full Rights Realization

For users within the European Economic Area (EEA), our platform fully enforces data subject rights under GDPR Articles 15 through 22:

*   **Right of Access & Transparency (Article 15)**: You may inspect all personal account parameters, login audit logs, and communications stored in the system at any time;
*   **Data Portability & One-Click Export (Article 20)**: You can export complete copies of your communications at any time in industry-standard `.eml` format accompanied by structured JSON metadata packages for seamless migration to another provider;
*   **Right to Erasure / Right to be Forgotten (Article 17)**: When you delete your account, the system terminates active sessions, purges relational records, and cryptographically overwrites master encryption keys at the physical storage level, achieving permanent, mathematically irreversible destruction;
*   **Cross-Border Transfer Safeguards (SCCs)**: Routing across our global edge relies on European Commission Standard Contractual Clauses (SCCs) and GDPR Data Processing Addenda provided by our underlying infrastructure.

### 3.2 California Consumer Privacy Act (CCPA / CPRA) Commitments

For residents of California and the United States, we provide explicit statutory disclosures under the CCPA/CPRA:

*   **No Sale or Sharing of Personal Information (Do Not Sell or Share)**: We have not sold or shared, and will never sell, rent, monetize, or share personal data, mailbox contents, or usage analytics with data brokers, advertisers, or third parties;
*   **Limitation on Sensitive Data**: Data collected is utilized solely to deliver email functionality and is never used for cross-context behavioral advertising or unauthorized AI model training;
*   **Non-Discrimination Guarantee**: We will never degrade service quality, restrict quotas, or alter features should you choose to exercise any of your statutory privacy rights.

### 3.3 Asia-Pacific Compliance & International Transit Awareness

The core hosted infrastructure team operates from Taiwan and adheres to the Personal Data Protection Act (PDPA). When navigating global communications, users should maintain realistic awareness of underlying technical realities:

Email relies on the federated, global Simple Mail Transfer Protocol (SMTP). Transmitting messages internationally inherently routes packets across multiple global tier-1 backbones subject to the telecommunications regulations of transit countries. Users should maintain robust hygiene on their own endpoints (protecting against local keyloggers, applying OS patches) and leverage FIDO2 Passkeys to strengthen defense.

### 3.4 72-Hour Incident Response & Official Communication Channels

We maintain a standardized Security Incident Response Standard Operating Procedure (SOP):

*   **Rapid Containment**: In the event of an anomaly, the edge gateway drops malicious IP ranges within minutes, revokes compromised JWT tokens, and triggers emergency master key rotation;
*   **72-Hour Breach Notification**: If a verified security incident impacts personal communications, we will notify affected individuals via prominent site notices and direct emails within 72 hours, and file appropriate reports with regulatory bodies;
*   **Upstream Patch Distribution**: Root-cause fixes are merged into the public repository alongside formal Security Advisories to assist self-hosted operators worldwide.

Users and security researchers with vulnerability disclosures, compliance inquiries, or security reports should reach us via our official dedicated channels:

*   **Security Incident Response Team**: `announcement@epocanvas.com`
*   **Privacy & Data Protection Office**: `privacy@epocanvas.com`
