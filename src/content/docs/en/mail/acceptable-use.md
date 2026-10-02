---
title: Acceptable Use Policy
description: Rules and guidelines for utilizing EpoCanvas Mail services and infrastructure.
---

**Effective Date: October 1, 2026 | Version: 5.5**

This Acceptable Use Policy ("AUP") defines the rigorous standards and permitted uses of the EpoCanvas Mail infrastructure. Whether you are operating on the managed service environment (`mail.epocanvas.com`) or utilizing the open-source self-hosted ecosystem (`epocanvas-mail`), these rules establish the compliance baseline necessary to maintain operational integrity, protect our network reputation, and ensure a secure communication environment for all users. The dual-nature of our platform means that while users enjoy the freedom of self-hosting under the MIT License, they also bear the responsibility of governing their deployments in accordance with international communication standards.

> [!IMPORTANT]
> **Self-Hosted Compliance Responsibility**: For users deploying EpoCanvas Mail independently, you operate as the sole Data Controller of your instance. You are entirely responsible for managing your own anti-spam policies, adhering to DKIM/SPF/DMARC configurations, and ensuring that your independent deployment does not masquerade as the official EpoCanvas Mail managed service. 

### Anti-Spam and Unsolicited Communications

The transmission of unsolicited commercial email (spam) is strictly prohibited. EpoCanvas Mail maintains a zero-tolerance policy against the abuse of our infrastructure for bulk, non-consensual mail delivery. Operators of self-hosted instances must configure their systems to prevent open relay abuse and are required to honor all unsubscribe requests promptly. Our managed service employs advanced heuristic filtering and reputation monitoring to detect and block unsolicited bulk email before it reaches the broader internet ecosystem. We mandate the correct implementation of SPF, DKIM, and DMARC records for all outbound domains to establish verifiable sender identities and protect against domain spoofing. 

### Anti-Phishing and Identity Protection

Phishing, social engineering, and any attempts to deceptively obtain sensitive user credentials or financial information are direct violations of this policy. You may not forge headers, manipulate sender identities, or employ misleading domain names that imitate legitimate organizations or the EpoCanvas Mail brand. The open-source nature of our platform grants you the right to modify the software, but it strictly prohibits leveraging our codebase to create deceptive portals or to impersonate official communications from the EpoCanvas Mail administrative team. Any instance found engaging in such activities will be immediately blacklisted across our managed infrastructure.

> [!WARNING]
> Any third-party deployment attempting to impersonate the official `mail.epocanvas.com` service will face immediate action. We actively monitor for brand infringement and will report malicious infrastructure to appropriate registrars and hosting providers.

### High-Frequency Attacks and Rate Limiting

To safeguard the availability and performance of our Edge infrastructure, EpoCanvas Mail implements strict rate limiting and high-frequency attack mitigation. Automated scripts, brute-force login attempts, and excessive API polling can severely degrade service quality. Our Cloudflare-backed architecture dynamically scales to absorb legitimate traffic spikes, but sustained, anomalous request volumes will trigger automated rate-limiting thresholds. Application-level safeguards ensure that individual accounts cannot exhaust shared resources, thereby protecting the overall integrity of the multi-tenant environment. 

### Violation Escalation and Disposal Ladder

Enforcement of this AUP follows a structured, graduated escalation process designed to address violations transparently and proportionately. When anomalous or non-compliant behavior is detected, our automated systems and compliance team will initiate the following disposal ladder:

1.  **Warning Notification**: An initial administrative alert is issued to the account owner, detailing the policy violation and requiring immediate corrective action within a specified timeframe.
2.  **Rate Limiting**: If the behavior persists, temporary rate limits and API throttling are applied to the offending account to mitigate immediate risks and prevent infrastructure abuse.
3.  **Account Suspension**: Continued or severe violations will result in the temporary suspension of inbound and outbound mail capabilities, pending a comprehensive security review.
4.  **Permanent Deletion**: In cases of malicious intent, persistent abuse, or illegal activities, the account and all associated data will be permanently and irrevocably deleted from the managed service, with no option for data recovery.

### Cross-Border Communication Compliance

Operating on a global infrastructure requires adherence to complex cross-border data transfer and communication regulations. When routing mail through international boundaries, users must ensure compliance with relevant local laws, including export control regulations and digital communications acts. EpoCanvas Mail routes traffic via Anycast networks to optimize delivery, but the ultimate responsibility for the legality of the transmitted content rests with the user. We do not provide legal counsel, and operators of self-hosted instances must independently verify their compliance with jurisdictions applicable to their user base and server locations.

> [!TIP]
> Administrators of self-hosted environments should regularly review their Cloudflare routing configurations and ensure their privacy policies clearly communicate cross-border data flows to their end-users.
