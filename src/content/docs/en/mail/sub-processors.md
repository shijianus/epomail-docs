---
title: Authorized Sub-Processors
description: Information regarding the third-party infrastructure and services utilized by EpoCanvas Mail.
---

**Effective Date: October 1, 2026 | Version: 5.5**

As an open-source, non-commercial project designed for self-hosting, EpoCanvas Mail does not operate central servers or process user data on behalf of its user base. Instead, administrators deploy the software onto their own infrastructure. 

This document outlines the standard third-party sub-processors and infrastructure providers utilized when deploying EpoCanvas Mail in its default, recommended configuration.

## 1. Core Infrastructure Provider

The EpoCanvas Mail architecture is heavily optimized for edge deployment, primarily utilizing the **Cloudflare** ecosystem. When an administrator deploys the project, Cloudflare acts as the primary infrastructure sub-processor.

### Cloudflare, Inc.
- **Cloudflare Workers**: Serverless execution environment handling API requests, routing, and application logic.
- **Cloudflare D1**: Serverless SQL database utilized for storing structured relational data, user accounts, and email metadata.
- **Cloudflare KV**: Global, low-latency key-value data store used for session management, caching, and rate limiting states.
- **Cloudflare R2**: S3-compatible object storage utilized for storing email attachments and large payload data.

**Isolation Requirements**: Data stored within the Cloudflare ecosystem is governed by the administrator's direct relationship with Cloudflare. EpoCanvas Mail enforces encryption at rest and limits data access scopes, but relies on Cloudflare's inherent tenant isolation models to prevent cross-account contamination.

## 2. Optional Integrations

Depending on the administrator's configuration, additional optional sub-processors may be enabled to handle specific functionalities:

### Resend
- **Purpose**: Outbound transactional email delivery.
- **Scope**: Processes outgoing email addresses, subject lines, and message bodies solely for the purpose of transmission.

### Sentry
- **Purpose**: Error tracking and application monitoring.
- **Scope**: Captures stack traces, runtime errors, and limited environmental metadata to assist the administrator in debugging self-hosted deployments. Administrators are strongly advised to configure data scrubbing rules to prevent the leakage of PII (Personally Identifiable Information) into Sentry logs.

## 3. Administrator Responsibilities

Self-hosting administrators act as the primary Data Controllers. It is the administrator's responsibility to review the Data Processing Agreements (DPAs) and privacy policies of Cloudflare and any optional sub-processors to ensure compliance with their local jurisdictional requirements before deploying EpoCanvas Mail.
