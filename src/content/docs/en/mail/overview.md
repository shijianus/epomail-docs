---
title: Privacy and Terms Overview
description: Project purpose, actual data-processing roles, legal documents, order of precedence and contact details for EpoCanvas Mail.
---

**Updated: November 2, 2026 | Version: 5.21**


<!-- legal-review-draft -->
:::caution[Legal review draft: not the current notice]
This draft records proposed terms and matters still requiring verification. It does not replace the current live notice or certify compliance. It must not be used to enable processing before the operator identity and legally required contact information, actual legal bases, recipients and transfer safeguards, retention and deletion arrangements have been verified and the required notice provided. References to an authoritative version mean the Traditional Chinese drafting baseline, not entry into force. Existing statutory duties and user rights remain unaffected.
:::

This page guides you through the EpoCanvas Mail legal documents. Read the [Terms of Service](/en/mail/terms-of-service/) and [Privacy Policy](/en/mail/privacy-policy/) before creating an account; do not register if you do not accept the service conditions. Reading a document does not constitute consent to every personal-data processing activity.

The Traditional Chinese (Taiwan) version is the official version; other languages are translations for comparison. This arrangement does not limit clear information required by applicable law, interpretation favourable to consumers or rights that cannot be waived. The update date records a text revision, not automatic application of changes to all users.

![Relationship between the terms, privacy policy and supporting documents](/images/mail/en/legal-architecture.svg)

*Figure: each document addresses its subject; mandatory law, data-protection rights and consumer rights take precedence over the agreed document hierarchy.*

## 1. Platform Identity

EpoCanvas Mail is an individually maintained, non-profit side project for learning and testing. Its source code is released under MIT and uses services such as Cloudflare Workers, D1, KV and R2. Free or non-profit operation does not exempt it from applicable GDPR, communications-confidentiality or consumer obligations.

1. The hosted instance is `mail.epocanvas.com`, uses EpoCanvas as its contact name and has a companion mobile app. The actual operator's identifiable identity, location and contact details must be disclosed under Privacy Policy Section 2; a team name does not establish a separate legal entity.
2. Self-hosted instances are managed by their actual operators, who must publish notices and terms suited to their configuration and applicable law, rather than simply copy the hosted instance's name or promises.

The hosted service is for learning, development and ordinary communication tests by people aged 16 or over with the required contractual capacity. No SLA, round-the-clock staffing, permanent hosting or compliance certification is promised. It is unsuitable for emergency communications, statutory recordkeeping or a sole important backup; see [Service Scope & Support](/en/mail/service-scope/).

## 2. Data-Processing Roles

Roles depend on who actually determines the purposes and means of each processing activity, not simply on an open-source, self-hosting or contractual label. Applicable law also depends on more than the operator's location. GDPR applicability requires assessment of factors such as establishment activities, offering goods or services to people in the EU, or monitoring their behaviour there; accessibility of a website from the EU is not sufficient by itself.

![Roles in source-code publication, instance operation and use](/images/mail/en/self-host-responsibilities.svg)

*Figure: publishing source code alone is not operation of another person's instance; authors who also operate a service or determine processing remain responsible for their actual role.*

| Scenario | Data controller | Data processor |
| --- | --- | --- |
| Hosted instance | The operator is responsible for account, security and communication-service processing whose purposes and means it determines; roles for message content depend on actual use | Providers supplying infrastructure or delivery under valid arrangements and instructions; the same provider may have a different role for processing it determines itself |
| Self-hosted instance | The deployer usually controls processing it determines; joint control, independent control or processing on another's behalf may also occur, without automatic exclusive control | Determined by the deployment's actual services, contracts and instructions, not copied directly from the hosted instance's list |

Authors and contributors who only publish code or submit fixes do not thereby assume operating or controller duties for others' deployments. That distinction does not exempt them when they actually operate a service. Individual users are not automatically controllers instructing the operator merely because they send or receive mail. Organisational processing requires prior confirmation that the use is supported and a separate data processing agreement (DPA) where necessary; an agreement cannot override the actual roles.

The absence of upstream usage analytics does not mean there are no third-party network requests. See the [Sub-processor List](/en/mail/sub-processors/) for delivery, cloud infrastructure, human verification, fonts and optional features.

## 3. Document Architecture

Each document addresses different matters. A privacy notice is neither blanket consent to processing nor certification of software or service compliance.

| Document | Contents |
| --- | --- |
| [Privacy Policy](/en/mail/privacy-policy/) | Data sources, processing purposes and grounds, retention, rights and international transfers |
| [Terms of Service](/en/mail/terms-of-service/) | Contract formation, use, changes, termination, liability and remedies |
| [Acceptable Use Policy](/en/mail/acceptable-use/) | Prohibited abuse, authorised testing, proportionate action and appeals |
| [Data Processing & Security](/en/mail/data-security/) | Data lifecycle, security controls, encryption and export limitations |
| [Sub-processor List](/en/mail/sub-processors/) | Providers, data received, triggers and transfer arrangements |
| [Key Terms](/en/mail/key-terms/) | Scope of legal and technical terminology |
| [Official Mail & Integrity Verification](/en/mail/tamper-proof/) | System-mail identification and document-integrity checks, not government or third-party certification |

For functions and deployment, see the [Features Guide](/en/mail/features/), [Operating Modes](/en/mail/modes/), [Deployment Guide](/en/mail/deployment/) and [Open-Source & Self-Hosting Legal](/en/mail/open-source/).

## 4. Order of Precedence

1. Mandatory applicable law and non-waivable data-protection and consumer rights prevail. Governing-law and court clauses cannot remove statutory access to local courts or supervisory authorities.
2. Within those limits, the Privacy Policy addresses privacy, the Terms of Service address service conditions, and the Acceptable Use Policy addresses conduct. Interpret uncertainties by subject and applicable law; supporting documents do not expand exclusions of liability.
3. Official status of the Traditional Chinese version is subject to the language and consumer safeguards at the start of this page. Notice, necessary consent and application of material changes follow Terms Section 12 and the Privacy Policy; continued use is not automatically consent to new processing purposes.

Consult the [official GDPR text](https://eur-lex.europa.eu/eli/reg/2016/679/oj) for EU legal scope and the [EDPB members list](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en) for supervisory authorities.

## 5. Contact Channels

- Privacy, rights requests and data-protection complaints: `privacy@epocanvas.com`.
- Accounts, service and general appeals: in-site messages or `admin@epocanvas.com`; email remains available if you cannot log in.
- Source-code issues: [GitHub Issues](https://github.com/shijianus/epomail/issues). Do not publish personal data, credentials or undisclosed vulnerabilities.
- Self-hosted instances: contact the actual operator identified by that site.

A privacy mailbox does not mean a data protection officer (DPO) or EU representative has been appointed. The operator must assess appointment duties against the actual conditions, make appointments where legally required and publish verifiable contact information.
