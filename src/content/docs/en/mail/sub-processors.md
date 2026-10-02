---
title: Authorized Sub-Processors
description: Information regarding the third-party infrastructure and services utilized by EpoCanvas Mail.
---

**Effective Date: October 1, 2026 | Version: 5.5**

The architectural foundation of EpoCanvas Mail is built upon a highly optimized, edge-native technology stack. To deliver global scalability, robust security, and unparalleled performance, we leverage specific, carefully vetted third-party infrastructure providers. Understanding the dual-nature of EpoCanvas Mail is critical: for the managed service (`mail.epocanvas.com`), these sub-processors handle the underlying compute and storage on our behalf. For users running self-hosted instances (`epocanvas-mail`), these same technologies represent the infrastructure required within your own accounts. This document defines the technical processing scope, boundaries, and isolation guarantees of our authorized sub-processors.

> [!IMPORTANT]
> **Self-Hosted Autonomy**: When you self-host EpoCanvas Mail, you establish direct agreements with these infrastructure providers (e.g., Cloudflare) under your own account. EpoCanvas Mail, as the software authors, acts purely as the provider of the open-source code and has no access to, or control over, the data processed within your independent environment.

### Cloudflare Workers: Edge Compute Framework

Cloudflare Workers serve as the primary execution environment for the EpoCanvas Mail application logic. Operating at the network edge, Workers utilize V8 isolates to provide secure, ephemeral compute resources globally. The processing scope of this sub-processor includes handling all incoming HTTP requests, executing API endpoints, and orchestrating authentication flows. Cloudflare's isolation guarantees ensure that EpoCanvas Mail processes are strictly separated from other tenants on their network, preventing cross-tenant memory access and mitigating the risk of side-channel attacks during execution.

### Cloudflare D1: Relational Database Storage

For structured data persistence, EpoCanvas Mail utilizes Cloudflare D1, a globally distributed relational database built on SQLite. The processing scope of D1 encompasses the storage of user profiles, configuration metadata, routing rules, and the indexing of mailbox contents. Data written to D1 is encrypted at rest using AES-256-GCM and replicated across Cloudflare's network for high availability. The technical boundary is strictly maintained; Cloudflare provides the storage infrastructure, while the cryptographic access control and application-level encryption keys remain securely managed within the EpoCanvas Mail logic.

### Cloudflare KV and R2: Object and Key-Value Stores

Ephemeral state, session data, and large unstructured objects (such as email attachments and raw message payloads) are managed by Cloudflare KV (Key-Value) and R2 (Object Storage). KV provides ultra-low latency access for rapidly changing data, such as rate-limiting counters and active session tokens. R2 offers durable, S3-compatible storage for larger blobs. Both sub-processors enforce strict access control policies and encryption at rest. EpoCanvas Mail architectures leverage these services to decouple compute from storage, ensuring that large attachments do not bottleneck the edge workers while maintaining strict geographical data distribution controls.

> [!NOTE]
> All data transmitted between the Cloudflare compute instances (Workers) and the storage layers (D1, KV, R2) remains within Cloudflare's private network backbone, bypassing the public internet and significantly reducing exposure to external interception.

### Resend: Optional Transactional Mail Delivery

While EpoCanvas Mail is capable of handling direct SMTP routing, administrators of self-hosted instances may optionally integrate with Resend to manage complex transactional email delivery and ensure high deliverability rates. If configured, Resend acts as a sub-processor responsible strictly for the final outbound delivery of specifically designated transactional messages. The technical boundary is clear: Resend processes only the outbound payload and headers required for delivery. EpoCanvas Mail ensures that internal service communications, private drafts, and non-transactional data are entirely isolated and never exposed to the Resend API.
