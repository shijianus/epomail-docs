---
title: Key Legal & Technical Terms
description: A glossary of terminology used throughout the EpoCanvas Mail documentation and policies.
---

**Effective Date: October 1, 2026 | Version: 5.5**

This glossary defines the critical legal, technical, and operational terminology utilized throughout the EpoCanvas Mail documentation framework, security policies, and architectural guides. By establishing a precise, standardized vocabulary modeled after industry best practices, we ensure clarity for users navigating the dual-nature of our platform—whether utilizing our managed service (`mail.epocanvas.com`) or maintaining an independent, self-hosted deployment (`epocanvas-mail`).

### A-C

**Anycast Edge Routing**
A network routing methodology where multiple geographically distributed edge nodes share the same IP address. EpoCanvas Mail utilizes Cloudflare's Anycast network to route user requests to the nearest physical data center, dramatically reducing latency, enhancing global availability, and inherently mitigating volumetric Distributed Denial of Service (DDoS) attacks by absorbing traffic across the entire edge network.

**Asymmetric Cryptography**
A cryptographic system that uses pairs of keys: public keys, which may be disseminated widely, and private keys, which are known only to the owner. EpoCanvas Mail employs asymmetric cryptography for WebAuthn/Passkey authentication and digital signature verification, ensuring that sensitive private keys are never transmitted across the network or stored on our servers.

**Cloudflare Workers**
The serverless, V8 isolate-based execution environment operating at the network edge, utilized by EpoCanvas Mail to process application logic, handle API requests, and orchestrate security policies globally without the need for traditional origin servers.

### D-E

**Data Controller**
The legal entity or individual that determines the purposes and means of processing personal data. In the context of the EpoCanvas Mail managed service, EpoCanvas acts as the Data Controller. However, in the self-hosted open-source ecosystem, the user or organization deploying the instance assumes full responsibility as the sole Data Controller.

**Data Processor**
An entity that processes personal data on behalf of the Data Controller. When utilizing the managed service, infrastructure providers like Cloudflare act as Sub-Processors. For self-hosted deployments, the hosting provider utilized by the instance administrator functions as their Data Processor.

**Dual-Nature Fusion**
The foundational philosophy of the EpoCanvas Mail project, which explicitly differentiates between the commercially managed hosting environment (`mail.epocanvas.com`) and the freely available, self-hosted open-source software (`epocanvas-mail`), while maintaining parity in security standards and core functionality across both.

### K-P

**Key Lifecycle Management**
The comprehensive process encompassing the generation, distribution, rotation, storage, and eventual destruction of cryptographic keys. EpoCanvas Mail enforces strict key lifecycle management, including automated rotation of system signing keys, to limit the potential impact of any theoretical cryptographic compromise.

**Passkey**
A highly secure, phishing-resistant digital credential bound to a user's device and specific domain (relying party). Built upon the WebAuthn standard, Passkeys replace traditional passwords with asymmetric cryptographic key pairs, virtually eliminating the risk of credential stuffing and remote server breaches.

**Platform Abuse**
Any activity that violates the Acceptable Use Policy, including but not limited to the transmission of spam, phishing attempts, deliberate circumvention of rate limits, or the unauthorized use of the EpoCanvas Mail brand to deceive end-users.

### R-Z

**Resident Key**
Within the WebAuthn ecosystem, a Resident Key (or Discoverable Credential) is a private key stored persistently on the user's authenticating device (e.g., a security key or secure enclave). This enables seamless, passwordless login flows where the user merely needs to verify their physical presence to authenticate to their EpoCanvas Mail account.

**Self-Sovereign Identity**
A digital identity model where the individual maintains complete control over their authentication credentials and personal data, without relying on centralized identity providers. EpoCanvas Mail facilitates this through open-source self-hosting and localized cryptographic key management.

**WebAuthn (Web Authentication)**
A web standard published by the W3C that defines an API enabling the creation and use of strong, attested, scoped, public key-based credentials by web applications, serving as the technical foundation for EpoCanvas Mail's passwordless authentication architecture.

**Zero Telemetry**
A strict privacy mandate ensuring that the software does not collect, transmit, or analyze any usage statistics, behavioral tracking data, or diagnostic metrics. EpoCanvas Mail guarantees Zero Telemetry in both its managed and open-source deployments, ensuring user operations remain completely opaque to the developers.

> [!TIP]
> **Navigating the Docs**: Whenever you encounter these terms in our architectural diagrams or policy documents, refer back to this glossary to ensure you understand the specific operational context within the EpoCanvas Mail ecosystem.
