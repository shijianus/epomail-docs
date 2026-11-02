---
title: Open-Source & Self-Hosting Legal
description: Scope of MIT licensing, the distinction between code authors and actual operators, and data-protection duties in self-hosting.
---

**Updated: November 2, 2026 | Version: 5.25**

This page explains EpoCanvas Mail's open-source licence and self-hosting responsibilities. The project is maintained by an individual on a non-profit basis for learning and testing; the hosted service separately follows the [Terms of Service](/en/mail/terms-of-service/) and [Privacy Policy](/en/mail/privacy-policy/). Deployers must provide terms and notices for their actual services.

The Traditional Chinese (Taiwan) version is the official version; other languages are translations for comparison. This arrangement does not limit clear information required by applicable law, interpretation favourable to consumers or rights that cannot be waived. The update date records a text revision and does not rewrite the MIT licence supplied with the code.

![Roles in publishing source code and operating an instance](/images/mail/en/self-host-responsibilities.svg)

*Figure: publishing code alone does not make an author the operator of another person's deployment; authors who operate services or determine processing remain subject to corresponding duties.*

## 1. The Licence

The source code is licensed under its accompanying MIT License. This section is a summary to be read with the original full licence.

1. You may use, copy, modify, merge, publish, distribute, sublicense and sell software copies; the project's non-profit purpose does not withdraw commercial use permitted by MIT.
2. Copies or substantial portions must retain the original copyright and permission notices.
3. The licence includes as-is and no-warranty provisions, effective to the extent permitted by applicable law.
4. Its liability exclusions do not override mandatory law or automatically exempt authors from liability arising from separately operating hosted services, actually processing data or making their own commitments.

## 2. Outside the Licence

- MIT itself grants no trademark endorsement or partnership status. Names and marks remain subject to relevant rights and law; visual assets depend on their actual licences.
- Self-hosted sites must clearly identify their actual operator and must not falsely claim official operation, certification or upstream partnership.
- Derived versions should describe differences from upstream to assist maintenance and security assessment. This page adds no source-code usage restrictions conflicting with MIT.

## 3. The Self-Deployer's Legal Position

- Roles depend on the purposes and means of each processing activity. Deployers usually control processing they determine but may also jointly control it or process for another party; self-hosting does not establish exclusive control, nor is every individual user a controller.
- Applicable law extends beyond the deployer's location. Assess GDPR establishment or extraterritorial conditions, communications confidentiality and non-waivable consumer protection; non-profit status creates no exemption. See [Overview](/en/mail/overview/) Section 2 for roles.
- These documents may inform notices, but identity, contact details, data sources, functions, retention and transfers must be verified. Organisational processing requires prior acceptance and a separate DPA where necessary; copying documents or assigning labels cannot replace a lawful ground and actual measures.
- Third-party relationships follow the actual services and contracts; some providers independently control particular activities. Do not impose all third-party terms on every user. Verify providers and transfer arrangements; the hosted [Sub-processor List](/en/mail/sub-processors/) is not a universal guarantee.

## 4. Technical Threshold and Security Responsibility

Use the [Deployment Guide](/en/mail/deployment/) to configure keys, permissions and updates, and assess backups, deletion, incident handling and necessary security measures. Upstream fixes do not automatically update all deployments. A test environment does not authorise arbitrary use of real data.

Publishing code alone supplies no SLA, round-the-clock support, permanent hosting or compliance certification. Actual operators must still fulfil security and rights-handling duties according to risk and applicable law. Encryption and access controls cannot guarantee against leaks; see [Data Processing & Security](/en/mail/data-security/) for limits.

## 5. Contributions

- Use [GitHub Issues](https://github.com/shijianus/epomail/issues) for bugs and feature proposals and Pull Requests for code. Acceptance of every submission or a response deadline is not promised.
- Contributors must be entitled to submit under the repository's applicable licence and preserve required third-party notices. Contribution alone does not make them instance operators or controllers.
- Report undisclosed vulnerabilities and personal data privately through [Overview](/en/mail/overview/) Section 5. Good-faith reports and lawful research do not lose protection because they criticise the project.

## 6. Related Documents

| Resource | Link |
| --- | --- |
| Legal documents, roles and order of precedence | [Privacy and Terms Overview](/en/mail/overview/) |
| Configuration steps for self-hosting | [Deployment Guide](/en/mail/deployment/) |
| Hosted functions and support limitations | [Service Scope & Support](/en/mail/service-scope/) |
| Legal and technical terminology | [Key Terms](/en/mail/key-terms/) |
