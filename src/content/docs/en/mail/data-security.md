---
title: Data Processing & Security Operations
description: Technical architecture and cryptographic standards protecting EpoCanvas Mail data.
---

**Effective Date: October 1, 2026 | Version: 5.5**

EpoCanvas Mail is engineered with a security-first architecture, prioritizing data confidentiality, integrity, and isolation. As a community open-source project intended for personal self-hosting and non-commercial use, the system enforces rigorous cryptographic standards without relying on centralized, commercial data collection.

![EpoCanvas Mail Data Processing and Infrastructure Security Defense](/images/mail/partition-security.svg)

## 1. Zero Telemetry and Data Sovereignty

EpoCanvas Mail operates on a strict **Zero Telemetry** principle. The software does not transmit diagnostic data, usage metrics, or user metadata back to the core maintainers or any third-party analytics services. Administrators of self-hosted instances retain absolute data sovereignty and control over their deployment environment.

## 2. Cryptographic Architecture

### 2.1. Encryption at Rest
All persistent data, including email payloads, attachments, and user metadata stored within the database (Cloudflare D1) and object storage (Cloudflare R2), is encrypted at rest. The system utilizes **AES-256-GCM** (Advanced Encryption Standard with Galois/Counter Mode), ensuring both confidentiality and authenticated encryption to detect any unauthorized modifications.

### 2.2. Encryption in Transit
Network communications between the client application and the server endpoints, as well as server-to-server traffic, strictly require **TLS 1.3**. Downgrade requests to legacy, deprecated transport protocols are automatically rejected at the edge.

### 2.3. Asymmetric Key Rotation
To mitigate the risk of long-term key compromise, EpoCanvas Mail employs automated asymmetric key rotation protocols for internal signing and encryption keys. Cryptographic keys used for JWT issuance and payload verification are systematically rotated, invalidating older keys and ensuring forward secrecy.

## 3. Authentication and Credential Isolation

EpoCanvas Mail adopts modern, phishing-resistant authentication standards:

- **WebAuthn / Passkey Integration**: The platform supports hardware-backed authenticators and platform passkeys via the WebAuthn standard, eliminating reliance on easily compromised passwords.
- **Credential Isolation**: Cryptographic credentials, session tokens, and recovery codes are heavily salted, hashed using memory-hard algorithms (e.g., Argon2id), and isolated from standard transactional data to prevent lateral movement in the event of a database compromise.

## 4. Operational Security and Self-Hosting

Because EpoCanvas Mail is a self-hosted solution, the overall security posture heavily depends on the administrator's operational practices. Administrators are responsible for securely managing their Cloudflare API tokens, environment variables (`.dev.vars` / Wrangler secrets), and DNS configurations (SPF, DKIM, DMARC) in accordance with the project's setup guidelines.
