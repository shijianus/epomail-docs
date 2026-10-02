---
title: Acceptable Use Policy
description: Rules and guidelines for utilizing EpoCanvas Mail services and infrastructure.
---

**Effective Date: October 1, 2026 | Version: 5.5**

This Acceptable Use Policy ("AUP") defines the permitted and prohibited uses of EpoCanvas Mail. By self-hosting, accessing, or utilizing any EpoCanvas Mail deployment, you agree to comply with this policy. 

EpoCanvas Mail is an independent, community-driven open-source project. It is strictly non-commercial and is provided without any commercial Service Level Agreement (SLA) or guarantee for business purposes. The software is designed exclusively for personal self-hosting, technical research, and non-commercial community communications.

## 1. Prohibited Activities

To protect the integrity of the ecosystem and ensure reliable operation, you must not use EpoCanvas Mail to engage in, facilitate, or promote any of the following activities:

### 1.1. Spam and Unsolicited Communications (Anti-Spam)
- Distributing unsolicited bulk emails (UBE) or commercial messages.
- Operating open relays, open proxies, or any infrastructure designed to bypass anti-spam filters.
- Scraping or harvesting email addresses from public or private sources without explicit consent.

### 1.2. Phishing and Spoofing
- Forging header information, sender addresses, or utilizing deceptive routing to mask the true origin of communications.
- Hosting, transmitting, or linking to content intended to deceive recipients into disclosing sensitive personal, financial, or authentication data.
- Impersonating any person, entity, or service, including EpoCanvas Mail administrators or core contributors.

### 1.3. Infrastructure Abuse and Brute Force Attacks
- Bypassing or attempting to bypass platform-enforced rate limits.
- Utilizing automated scripts, botnets, or brute-force methodologies to compromise authentication mechanisms.
- Deliberately generating excessive loads on the underlying Cloudflare infrastructure (Workers, D1, KV, R2) that negatively impacts service availability.

## 2. Platform Safeguards and Enforcement

EpoCanvas Mail deployments utilize automated safeguards to enforce this AUP and maintain operational stability. Violations are subject to a graduated enforcement ladder:

1. **Warning**: Automated alerts triggered by initial anomalies or minor policy deviations.
2. **Rate Limit**: Aggressive throttling applied to endpoints or specific accounts upon detecting anomalous spikes in traffic or authentication failures.
3. **Suspension**: Temporary deactivation of user accounts or API access following severe or repeated violations.
4. **Deletion**: Permanent removal of the offending account and associated data for egregious violations, including verified phishing campaigns or coordinated infrastructure attacks.

Administrators of self-hosted instances retain the authority and technical capability to modify these thresholds, but the core software defaults to these strict protective measures to ensure a secure baseline.

## 3. Reporting Abuse

As an open-source project, the core maintainers do not have access to or control over independent self-hosted instances. If you encounter abuse originating from an EpoCanvas Mail deployment, you must direct your reports to the administrator of that specific instance or the underlying infrastructure provider (e.g., Cloudflare) utilizing their respective abuse reporting channels.
