---
title: Privacy Policy
description: Comprehensive privacy framework for EpoCanvas Mail detailing data collection, processing mechanisms, edge network transmission, and global user rights.
---

# Privacy Policy

**Effective Date: October 1, 2026 | Version: 5.5**

At EpoCanvas Mail, we engineer privacy into the foundation of our architecture. This Privacy Policy details the lifecycle of your personal data when you interact with our official hosted service (`mail.epocanvas.com`). We are committed to absolute transparency regarding what we collect, how it traverses our edge network, and the strict limits we place on its processing. 

![EpoCanvas Mail Privacy and Data Architecture](/images/mail/partition-privacy.svg)

## Information We Collect and Process

To provide a functional, secure, and reliable email routing and storage service, we must process certain technical and personal data. We adhere to the principle of data minimization, collecting only what is strictly necessary to deliver the service you expect.

### 1. Account and Identity Data

When you register for EpoCanvas Mail, we require a baseline of information to establish your identity and secure your account.

**Authentication Credentials:** We collect your chosen username, a secure hash of your password, and public keys associated with modern authentication methods such as Passkeys (WebAuthn).
**Recovery Information:** We may collect an alternate email address strictly for the purpose of account recovery and critical security notifications.
**Account Settings:** We store your preferences, including UI language choices, timezone, and custom filtering rules, to provide a personalized experience.

### 2. Communication and Payload Data

As an email service provider, the core of our operation involves processing the messages you send and receive.

**Email Content and Attachments:** We store the body of your emails and any attached files. This data is encrypted at rest within our database infrastructure. We do not scan the content of your communications for advertising or profiling purposes.
**Routing Metadata:** To successfully route messages across the internet, we process metadata such as sender addresses, recipient addresses, timestamps, Message-IDs, and routing headers.
**Ephemeral Processing:** Messages passing through our inbound and outbound workers are processed in memory and only persisted to the database upon successful validation.

> [!NOTE]
> All emails placed in the "Trash" or "Spam" folders are subject to a strict 30-day automatic deletion cycle. Once purged, this data is physically destroyed and cannot be recovered.

## Global Infrastructure and Edge Transmission

EpoCanvas Mail leverages a modern, serverless edge architecture to deliver fast and resilient service worldwide. This architectural choice inherently involves cross-border data routing.

### 1. Cloudflare Anycast Network

Our infrastructure is built entirely on top of the Cloudflare network, utilizing Workers, D1 databases, and R2 object storage.

**Edge Routing:** When you access EpoCanvas Mail or send a message, your request is routed to the nearest available Cloudflare Anycast node. This means your data may momentarily transit through servers in various global jurisdictions to ensure the fastest delivery path.
**Encryption in Transit:** All connections between your device and our edge nodes, as well as server-to-server communications, are secured using TLS 1.3 encryption. We enforce strict transport security to prevent interception.

### 2. Third-Party Subprocessors

We minimize our reliance on third parties. However, to operate the service securely, we utilize Cloudflare as our exclusive infrastructure subprocessor. Cloudflare acts under our explicit instruction and is bound by rigorous data processing agreements to ensure compliance with global privacy standards.

## Global Compliance and Your Rights

We recognize and respect the legal frameworks established to protect digital privacy worldwide. We grant these fundamental rights to all users, regardless of their geographical location.

### 1. European Economic Area (EEA) & UK (GDPR / UK GDPR)

For users protected by European data protection laws, we process your data under specific, documented legal bases.

**Legal Bases for Processing:** We process your Account and Communication data based on **Article 6(1)(b) (Performance of a Contract)** to deliver the EpoCanvas Mail service. We process technical logs and abuse-prevention metrics based on **Article 6(1)(f) (Legitimate Interests)** to ensure the security and integrity of the platform.
**Data Subject Rights:** You possess the complete spectrum of GDPR rights. You may access your data, request corrections, demand the erasure of your account (Right to be Forgotten), restrict processing, or request a structured export of your data (Data Portability). You also maintain the right to lodge a formal complaint with your local Data Protection Authority.

### 2. California Privacy Rights (CCPA / CPRA)

For residents of California, we provide transparent disclosures required by state law.

**No Sale or Sharing:** We explicitly declare that EpoCanvas Mail does **not** sell your personal information. Furthermore, we do **not** share your personal data for cross-context behavioral advertising. Our revenue and operational models are entirely divorced from data monetization.
**Non-Discrimination:** You will not face any degradation of service, altered pricing, or discrimination for exercising your CCPA privacy rights. We collect the categories of identifiers and electronic network activity information solely for operational delivery.

> [!IMPORTANT]
> To exercise any of your data privacy rights, please contact our dedicated legal team at `privacy@epocanvas.com`. We are committed to responding to all legitimate requests within 30 days.

## Open Source and Self-Hosting Governance

EpoCanvas Mail (`github.com/shijianus/epomail`) is an open-source project. If you choose to deploy your own instance of the software rather than using our official service, your relationship with data processing fundamentally changes.

### The Role of the Self-Hoster

**Sole Data Controller:** When you run a self-hosted instance, you, or your organization, become the exclusive Data Controller. You are legally responsible for securing the infrastructure, managing user data, and drafting your own compliant privacy policies.
**Zero Telemetry Codebase:** We guarantee that the EpoCanvas Mail source code contains zero telemetry. We do not receive "pingbacks," usage statistics, or crash reports from independent deployments. We have absolutely no access to the data residing on third-party servers.

> [!TIP]
> If you are using an EpoCanvas Mail instance that is **not** hosted at `mail.epocanvas.com`, you must direct all privacy inquiries and data deletion requests to the specific administrator of that instance.
