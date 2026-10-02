---
title: Data Processing & Security Operations
description: Technical architecture and cryptographic standards protecting EpoCanvas Mail data.
---

**Effective Date: October 1, 2026 | Version: 5.5**

EpoCanvas Mail is engineered with a security-first architecture, prioritizing data confidentiality, integrity, and isolation. Our platform is defined by a fundamental "Dual-Nature Fusion": the managed service environment (`mail.epocanvas.com`) provides seamless, highly available communication, while the open-source ecosystem (`epocanvas-mail`) empowers users with complete data sovereignty through self-hosting. This document outlines the rigorous cryptographic standards and architectural boundaries designed to protect your data across both deployment models, ensuring that security is never compromised for convenience.

![EpoCanvas Mail Data Processing and Infrastructure Security Defense](/images/mail/partition-security.svg)

> [!IMPORTANT]
> **The Principle of Zero Telemetry**: EpoCanvas Mail is built upon a foundation of absolute privacy. We enforce a strict Zero Telemetry policy across both our managed and open-source distributions. The software does not transmit usage analytics, behavioral metrics, or diagnostic data back to any centralized authority. Your operational data remains entirely within your control.

### AES-256-GCM Static Data Encryption

The protection of data at rest is a cornerstone of our security model. All persistent user data, including mailbox contents, metadata, and configuration profiles stored within the underlying D1 database and KV storage, is subjected to robust AES-256-GCM encryption. This Galois/Counter Mode provides not only high-speed encryption but also authenticated encryption, ensuring data integrity alongside confidentiality. The encryption keys are securely derived and isolated from the application logic, meaning that even in the event of a raw storage compromise, the data remains cryptographically inaccessible without the corresponding contextual key material.

### TLS 1.3 Transport Layer Security

To safeguard data in transit against interception and tampering, EpoCanvas Mail mandates the use of TLS 1.3 for all network communications. Whether accessing the web interface, communicating via APIs, or transmitting emails between edge nodes, the transport layer is heavily encrypted using modern cipher suites. TLS 1.3 significantly reduces the attack surface by deprecating obsolete cryptographic algorithms and accelerating the handshake process, providing both enhanced security and improved performance for our globally distributed user base. Downgrade attacks are actively prevented through strict transport security headers.

### WebAuthn and Passkey Credential Isolation

Authentication within EpoCanvas Mail represents a departure from vulnerable legacy password systems. We have deeply integrated WebAuthn and Passkey technologies to provide phishing-resistant, hardware-backed authentication. Cryptographic credentials are bound specifically to the domain of the deployment, completely isolating user identities from traditional credential stuffing or password breach vectors. When deploying a self-hosted instance, the WebAuthn relying party identity is tied strictly to your chosen domain, ensuring that credentials cannot be exported or reused maliciously across different environments. 

> [!NOTE]
> Passkeys rely on asymmetric cryptography. The private key never leaves your device's secure enclave, while the EpoCanvas Mail server only stores the corresponding public key, rendering server-side credential theft mathematically impossible.

### Asymmetric Key Rotation and Lifecycle Management

To maintain long-term cryptographic resilience, our architecture supports robust asymmetric key rotation protocols. Security keys used for signing system events, verifying internal service communications, and managing session integrity are subject to automated rotation schedules. This limits the potential impact of any hypothetical key compromise, bounding the validity period of cryptographic material. Administrators of self-hosted instances are provided with seamless CLI tooling to initiate key rotation events without disrupting active user sessions or causing downtime, ensuring continuous compliance with modern security lifecycle practices.

### Ephemeral Processing and Memory Safety

Operating heavily on the Cloudflare Workers edge network, EpoCanvas Mail leverages the inherent security benefits of ephemeral, V8 isolate-based execution. Application logic is executed in isolated environments that are created on-demand and destroyed immediately upon request completion. This architecture prevents memory leaks, neutralizes persistent cross-request contamination, and ensures that sensitive data, such as decrypted payloads or session tokens, exist in memory only for the absolute minimum duration required. This stateless approach fundamentally hardens the application against traditional server-side persistence attacks.
