---
title: Privacy and Terms Overview
description: Overview of the EpoCanvas Mail legal framework, including platform identity, the responsibility triad, document architecture, and contact channels.
---

# Privacy and Terms Overview

**Effective Date: October 1, 2026 | Version: 5.5**

This document serves as the foundational guide to the legal and privacy framework of EpoCanvas Mail (the "Service"). It outlines the structural relationship between the open-source software, the instance operators, and the end users. Before deploying, registering for, or using the Service, please review this page alongside our [Privacy Policy](/en/mail/privacy-policy/) and [Terms of Service](/en/mail/terms-of-service/).

![EpoCanvas Mail legal document architecture: the Terms of Service as the contract layer; the Privacy Policy and the Acceptable Use Policy as the policy layer; Data Processing and Security Maintenance, the Third-Party Processor List, and Key Terms as supporting documents](/images/mail/legal-architecture.svg)

*Figure: The architecture of our legal framework. The Terms of Service govern the conditions of use; the Privacy Policy details data processing and privacy rights; the Acceptable Use Policy defines community standards; while supporting documents provide technical specifics on data security and third-party processors.*

## 1. Platform Identity & Non-Commercial Nature

EpoCanvas Mail is a community-driven, open-source email platform built on edge computing architecture (Cloudflare Workers, D1, KV, R2). The upstream source code is released under the permissive MIT License. 

The Service is provided strictly for personal self-hosting, technical research, and non-commercial community communication. We do not operate a commercial email enterprise, we do not offer enterprise-grade Service Level Agreements (SLAs), and we do not guarantee suitability for commercial or mission-critical business operations. The Service exists in two primary deployment models:

1. **Hosted Community Instance**: A public demonstration site (`mail.epocanvas.com`) operated by the EpoCanvas maintainers, provided "as is" for community use.
2. **Self-Hosted Instance**: A private deployment where any individual or organization runs the open-source codebase on their own domain and infrastructure.

## 2. The Responsibility Triad

Because EpoCanvas Mail is fundamentally a self-hostable open-source project, data processing responsibilities are strictly divided into three distinct roles. 

![EpoCanvas Mail allocation of responsibilities](/images/mail/self-host-responsibilities.svg)

### A. Upstream Open-Source Project
The EpoCanvas Mail upstream project and its core maintainers act solely as the **Code Provider**. 
- **Zero Telemetry**: The codebase contains no hidden tracking, telemetry, or "phone home" mechanisms.
- **No Data Access**: Upstream maintainers have absolutely no access to the databases, encryption keys, or email contents of any self-hosted instance.
- **No Compliance Liability**: The open-source project itself is not a service provider and bears no compliance, regulatory, or operational liability for deployed instances.

### B. Instance Operator / Deployer
The individual or organization deploying the software is the **Sole Data Controller** and **Infrastructure Manager**.
- **Data Governance**: The Operator exercises complete control over the instance's Cloudflare resources, database, and object storage.
- **Key Custodian**: The Operator holds the master encryption keys and is responsible for instance security.
- **Compliance**: The Operator is legally responsible for maintaining privacy compliance, responding to user requests, and establishing their own local policies in their jurisdiction.

### C. End User
The individual utilizing an EpoCanvas Mail account.
- **Credential Protection**: The user is exclusively responsible for securing their account through strong passwords and Two-Factor Authentication (Passkey/TOTP).
- **Fair Use**: The user must comply with the Acceptable Use Policy and refrain from utilizing the service for spam, abuse, or illegal activities.
- **Content Ownership**: The user retains full ownership of their transmitted data and is responsible for its legality.

## 3. Document Architecture

Our legal framework is organized into specific, cross-referencing documents that collectively constitute your agreement with the Operator:

| Document | Purpose & Scope |
| --- | --- |
| [Privacy Policy](/en/mail/privacy-policy/) | Details why data is processed, how it is protected, when sharing occurs, your privacy rights, and data retention schedules. |
| [Terms of Service](/en/mail/terms-of-service/) | Establishes the contractual conditions, non-commercial warranty disclaimers, rights, obligations, and limitations of liability. |
| [Acceptable Use Policy](/en/mail/acceptable-use/) | Defines prohibited conduct, abuse mitigation strategies, and enforcement procedures. |
| [Data Processing & Security](/en/mail/data-security/) | Outlines the technical data lifecycle, encryption at rest, incident response, and security measures. |
| [Third-Party Processors](/en/mail/sub-processors/) | Lists external processors (e.g., Cloudflare, Resend), authorized data sharing, and international transfer safeguards. |
| [Anti-Tampering Specs](/en/mail/tamper-proof/) | Documents our 16-tier security notices, anti-spoofing mechanisms, and tamper-proof verification protocols. |

## 4. Order of Precedence

1. For matters concerning personal data, the [Privacy Policy](/en/mail/privacy-policy/) shall govern. For operational usage rules, the [Terms of Service](/en/mail/terms-of-service/) apply. 
2. In the event of a conflict between documents, the policy most specific to the subject matter shall prevail.
3. This English version is an authoritative, standalone document. It governs your relationship with the Service independently of any other language versions.

## 5. Contact Channels

- **Privacy & Data Rights**: `privacy@epocanvas.com`
- **General Inquiries**: `admin@epocanvas.com` or via in-app messaging.
- **Upstream Open Source Project**: GitHub Issues at `github.com/shijianus/epomail`.
- **Self-Hosted Instances**: Please contact the Operator directly via the administrative email provided on their deployment.
