---
title: Key Legal & Technical Terms
description: A glossary of terminology used throughout the EpoCanvas Mail documentation and policies.
---

**Effective Date: October 1, 2026 | Version: 5.5**

This glossary defines critical legal, technical, and operational terms utilized within the EpoCanvas Mail documentation, policies, and configuration guides. These definitions establish a clear, standardized vocabulary to ensure precise understanding of the project's architecture and compliance standards.

## A

**AES-256-GCM**
Advanced Encryption Standard with a 256-bit key in Galois/Counter Mode. The primary symmetric cryptographic algorithm utilized by EpoCanvas Mail to ensure both the confidentiality and integrity (authenticated encryption) of data at rest.

**AUP (Acceptable Use Policy)**
The policy document outlining the permitted and prohibited activities when operating or utilizing an EpoCanvas Mail instance, including rules against spam, phishing, and infrastructure abuse.

## D

**Data Controller**
The entity or individual (typically the self-hosting Administrator) who determines the purposes and means of processing personal data within their specific EpoCanvas Mail deployment.

**D1**
Cloudflare's serverless SQL database, utilized by EpoCanvas Mail as the primary relational data store for user profiles, configuration states, and communication metadata.

## E

**Edge Deployment**
An architectural pattern where application logic (via Cloudflare Workers) is executed close to the end-user geographically, minimizing latency and reducing reliance on centralized, origin servers.

## K

**KV (Key-Value Store)**
Cloudflare's distributed data storage solution used for high-read, low-latency access, primarily leveraged for session validation, caching layers, and enforcing rate limiting rules.

## P

**Phishing**
The fraudulent practice of sending communications purporting to be from reputable sources in order to induce individuals to reveal personal information, such as passwords or cryptographic keys. Strictly prohibited under the AUP.

## R

**R2**
Cloudflare's S3-compatible object storage service, utilized by EpoCanvas Mail for retaining large binary files, such as email attachments and raw message payloads.

**Rate Limiting**
An automated defensive mechanism that restricts the number of requests a user or IP address can make to an API endpoint within a specific timeframe, designed to mitigate brute-force attacks and resource exhaustion.

## S

**Self-Hosting**
The practice of deploying, maintaining, and managing the EpoCanvas Mail software on infrastructure controlled directly by the user or administrator, rather than relying on a centralized SaaS (Software as a Service) provider.

**SLA (Service Level Agreement)**
A formal commitment regarding uptime, performance, and support. EpoCanvas Mail, as an open-source non-commercial project, is provided "as is" without any commercial SLA.

**Spam**
Unsolicited, bulk, or commercial email communications. The distribution of spam is explicitly forbidden across all EpoCanvas Mail instances.

## T

**TLS 1.3 (Transport Layer Security)**
The latest version of the cryptographic protocol designed to provide secure communication over a computer network. EpoCanvas Mail enforces TLS 1.3 for all in-transit data protection.

## W

**WebAuthn / Passkey**
A web standard published by the W3C that allows servers to register and authenticate users utilizing public key cryptography instead of a password, providing robust defense against phishing and credential stuffing.

**Zero Telemetry**
A strict design philosophy ensuring the software does not inherently collect, transmit, or phone home any usage analytics, performance metrics, or diagnostic data to the core developers or third parties.
