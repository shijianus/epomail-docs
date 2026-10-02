---
title: Data Processing & Security Maintenance
description: EpoCanvas Mail data security and personal-data protection — security measures, dual-track operating boundaries, exercise of your rights, and security-incident response.
---

**Effective Date: October 3, 2026 | Version: 5.8**

This document describes the measures with which the official hosted instance (mail.epocanvas.com) protects data, the boundaries of responsibility between the hosted service and the open-source project, and how you can query, export, and delete your own data. It is established under the [Privacy Policy](/en/mail/privacy-policy/) and the [Terms of Service](/en/mail/terms-of-service/); the technical facts stated here follow the actual implementation in the open-source code.

The Traditional Chinese (Taiwan) versions of this site's legal documents are the authoritative versions; translations into other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version prevails. The legal and technical documents on this site follow the open-source implementation of the service and aim to establish transparent, rigorous, non-commercial community communication norms.

<div class="privacy-checkup-row">
  <div class="privacy-checkup-icon">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#E8F0FE"/>
      <path d="M20 9L29 13V19C29 24.5 25.2 29.6 20 31C14.8 29.6 11 24.5 11 19V13L20 9Z" fill="#1967D2"/>
      <path d="M17 20L19.2 22.2L23.8 17.6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="privacy-checkup-content">
    <div class="privacy-checkup-title">Security & Privacy Quick Guide</div>
    <div class="privacy-checkup-desc">Looking for how data is collected and protected, how to exercise your rights, or how to verify these documents?</div>
    <a href="/en/mail/overview/" class="privacy-checkup-link">Go to the Documents Overview ↗</a>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 1. Security Built into the Service

Protection on the official hosted instance is organised into four layers: transport, edge processing, storage at rest, and credentials. Every measure is implemented in the open-source code and can be audited independently.

<div class="google-illustration-container">
  <img src="/images/mail/en/security-trust-shield.svg" alt="EpoCanvas Mail defense in depth: encrypted transport, stateless edge processing, encryption at rest, and credential protection, resting on user control" width="416" height="276" />
</div>

*Figure: four layers of protection — transport, edge, storage at rest, and credentials; the base is your own control (self-service export, deletion, and two-step verification).*

### 1.1 Transport Encryption

When you access the service through a browser or the mobile app, every connection is encrypted with HTTPS/TLS, so communication content stays unreadable to intermediaries on public networks. Static site assets are delivered through a content delivery network with caching and security response headers.

### 1.2 Stateless Processing at the Edge

Business logic runs on Cloudflare Workers (V8 Isolate sandboxes): mail plaintext decrypted during processing exists only in the memory of that request; when the request ends, the sandbox is released and no plaintext remains on the host machine's physical disks. The service runs no self-maintained persistent servers and no always-on background processes.

### 1.3 Encryption at Rest

Whether mail subjects and bodies are encrypted depends on the mail mode the instance uses: in "Encrypted" mode every mail's subject and body are stored with AES-256-GCM (with authentication tags); in "Private" mode everything except spam and trash is encrypted; in "All-mail" mode no encryption is applied. Each record uses a random initialization vector. Encryption keys are derived by HKDF-SHA256 from an instance-level master-secret environment variable (`jwt_secret` / `totp_enc_key`) with a per-user salt; the master secret is never written to the database or committed to the repository. Attachments are outside the encryption scope.

:::caution[Scope and Limits of Encryption]
The encryption described above is server-side encryption at rest. It protects against infrastructure-level risks such as stolen database files or leaked snapshots; it is not end-to-end encryption. An operator who controls the instance server and the master secret is technically able to decrypt content. What administrators can see depends on the mail mode: in "All-mail" mode the administrator can read every mail; in "Private" mode only spam, deleted, and unassigned mail; in "Encrypted" mode the admin interface does not return user mail content. If you need confidentiality from every third party, including the operator, encrypt the body yourself with GPG/OpenPGP or a similar client-side tool before sending.
:::

### 1.4 Credential Protection

- **Passwords** are hashed with PBKDF2-HMAC-SHA256 at 100,000 iterations with a unique random salt per user; they are never stored in plaintext or reversible form.
- **Two-step verification**: the TOTP secret is stored encrypted with AES-256-GCM; backup recovery codes are stored only as SHA-256 hashes.
- **Passkeys (WebAuthn/FIDO2)**: the server stores only the public key and credential identifier; the private key stays in the authenticator on your device and never travels over the network.

### 1.5 Data Processing Matrix

The data categories, collected fields, purposes, storage media, and retention periods of the service are as follows:

| Data category | Fields collected | Purpose | Storage and protection | Retention |
| --- | --- | --- | --- | --- |
| Account credentials | e-mail address, username, password hash and salt, TOTP secret (encrypted), backup-code hashes, passkey public keys | registration, login, two-step verification | Cloudflare D1; PBKDF2 (100,000 iterations), TOTP encrypted at rest | while the account exists; sessions revoked on deactivation, unrecoverable after hard deletion |
| Communication data | sender and recipients, CC/BCC, subject, timestamps, read status, labels, mail body | sending, receiving, threading, keyword search | Cloudflare D1 (metadata); subject and body encrypted per mail mode | under your control; trash kept 7 days, then hard-deleted |
| Network and device data | registration IP, latest login IP, operating system, browser and device type | security auditing, unusual-login detection | Cloudflare D1; visible only to administrator audits, never used for commercial profiling | until the account is hard-deleted |
| Edge environment data | the edge country/region code of the request (`cf-ipcountry`) | interface pre-selection (such as the default phone country code) | not persisted; returned only with the response to the browser | not stored; destroyed when the response ends |
| Sessions and authorization | JWT session tokens, role permissions | edge API authentication | Cloudflare KV allow-list; at most 10 active sessions per account | valid 30 days; removed immediately on logout |
| Attachment assets | original file name, MIME type, file size, binary content | attachment transfer, preview, download | instance object storage (resolved in order: your own S3-compatible storage, R2 binding, KV by default); defensive headers on download | removed together with the owning mail |

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Responsibility Boundaries of the Dual-Track Operation

EpoCanvas Mail is both an official hosted service and an open-source project. The definition of the data controller and the division of responsibility among the three parties are set out in Section 2 of the [Privacy & Terms Overview](/en/mail/overview/); this chapter supplements them with the positioning of the hosted instance and the rules for distributing the open-source code.

<div class="google-illustration-container">
  <img src="/images/mail/en/dual-nature-scale.svg" alt="EpoCanvas Mail dual-track governance: one open-source codebase, with the data controller and responsibility boundaries of hosted and self-hosted instances" width="416" height="276" />
</div>

*Figure: two operating tracks over one open-source codebase. The operations team is the data controller of the hosted instance; the deployer is the sole data controller of a self-hosted instance; upstream authors run no service and hold no data.*

### 2.1 Positioning of the Official Hosted Instance

The hosted instance mail.epocanvas.com is operated by the operations team on a non-commercial basis: no advertising is placed, no user data is sold or rented out, and no enterprise-grade service level agreement (SLA) is offered. Availability depends on upstream services such as Cloudflare and the delivery channels; please export backups of important correspondence yourself at regular intervals (see Section 3).

### 2.2 Boundaries of Conduct

Use of the hosted instance is subject to the [Acceptable Use Policy](/en/mail/acceptable-use/) in full, including the prohibitions on spam, phishing and malware distribution, bulk registration, and resource abuse. Violations are handled under that policy's enforcement ladder, up to hard deletion.

### 2.3 Distributing and Modifying the Open-Source Code

The source code is published under the MIT license; any individual or organization may inspect, audit, modify, and self-host it. When distributing or modifying the code:

1. keep the original copyright notice and the full MIT license text intact;
2. do not suggest in domains, interfaces, or promotional material that an instance is operated or endorsed by the official team;
3. if you offer public e-mail registration, publish your own operating entity, terms of service, and privacy policy. The documents on this site may serve as a template; that does not constitute an endorsement.

### 2.4 Independent Responsibility of Self-Hosted Instances

A third party who deploys the open-source code becomes, from the moment of deployment, the sole and exclusive data controller for that instance's users, and must independently fulfil the notice, security-maintenance, and oversight obligations required by the law applicable at its location. Upstream authors and contributors operate no instance, have no access to data on self-hosted instances, and bear no joint liability for any instance's operation, security incidents, or legal disputes.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Control over Your Data

You have the rights of access, copying, correction, stopping processing, and deletion with respect to your own data. This chapter explains which features implement each right; the full definitions are in Section 9 of the [Privacy Policy](/en/mail/privacy-policy/).

<div class="google-illustration-container">
  <img src="/images/mail/en/data-sovereignty-export.svg" alt="EpoCanvas Mail data control: self-service export, deletion with a recycle buffer, and enforceable rights" width="416" height="276" />
</div>

*Figure: three routes of control — self-service export (JSON), deletion (recycle-bin buffer, then hard deletion), and exercising rights (answered within 30 days).*

### 3.1 Access, Export, and Correction

- **Self-service in the interface**: you can review your profile, login records, and all mail in the mailbox interface at any time;
- **Data export**: "Settings → Data Export" produces a complete copy in JSON format (profile and full text of undeleted mail); a single mail can also be downloaded as an .eml file;
- **Manual requests**: requests that need human handling, such as correction or stopping processing, are answered and processed within 30 days of receipt via `privacy@epocanvas.com`.

### 3.2 Deletion

- **Deleting mail**: deleted mail first goes to the trash and is hard-deleted (with attachments and indexes) by a scheduled task 7 days later; deletion is irreversible. When mailbox usage exceeds 90% of quota, deletions you perform are hard-deleted immediately to free space;
- **Account deactivation**: you can deactivate your account yourself in Settings. Sessions are revoked immediately and mail and data enter a soft-deleted state; unless retention is required by law, an administrator performs the hard deletion within 90 days of deactivation. After hard deletion, account data, mail, attachments, and authorizations are removed from the database and object storage and cannot be recovered;
- **Corresponding statutory rights**: the rights of access, copying, and deletion that users in the European Economic Area have under the GDPR, and the rights of notice, deletion, and non-discrimination that California residents have under the CCPA/CPRA, are implemented through the self-service features and the manual request channel above; users elsewhere exercise equivalent rights under the law applicable at their location.

### 3.3 No Selling, No Tracking

- The operator does not sell, rent, or trade your personal data or communication content;
- Data is not used for cross-context behavioral advertising, user profiling, or commercial model training;
- Exercising your privacy rights does not degrade the functionality, quality, or availability of the service.

### 3.4 Security-Incident Response

If personal data is stolen, leaked, altered, or lost, the operator will proceed as follows:

1. **Immediate containment**: force relevant sessions offline and quarantine affected content, pausing parts of the service where necessary to stop the damage from spreading;
2. **Statutory notification**: notify the competent authority within 72 hours of becoming aware of the incident (where applicable law sets a different period, that period applies and notice is given without delay), and inform affected users through an on-site announcement or system mail;
3. **Published remediation**: after the cause is identified, publish fixes and a security advisory in the open-source repository so self-hosted operators can patch in step.

To report a security issue or vulnerability, use:

- **Security & official communications**: `announcement@epocanvas.com`
- **Privacy & data protection**: `privacy@epocanvas.com`
