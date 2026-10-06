---
title: Privacy and Terms Overview
description: Overview of the EpoCanvas Mail legal documents — platform identity, data-processing roles, document architecture, order of precedence, and contact channels.
---

**Effective Date: October 5, 2026 | Version: 5.16**

This page is the guide to all legal documents of the EpoCanvas Mail service (the "Service"); it explains the roles of the parties, the document architecture, and the order in which the documents apply. Before registering for or using the Service, you should read this page together with the [Privacy Policy](/en/mail/privacy-policy/) and the [Terms of Service](/en/mail/terms-of-service/).

![EpoCanvas Mail legal document architecture: the Terms of Service as the contract layer; the Privacy Policy and Acceptable Use Policy as the policy layer; data processing and security, the sub-processor list, and key terms as supporting documents — all standing on the base of applicable law and security-maintenance duties](/images/mail/en/legal-architecture.svg)

*Figure: the architecture of this site's legal documents. The Terms of Service set the contractual conditions; the Privacy Policy carries the notice and processing standards for personal data; the Acceptable Use Policy sets conduct boundaries; Data Processing & Security, the Sub-processor List, and Key Terms are supporting documents. The law applicable to each instance is determined by its operator's location.*

## 1. Platform Identity

EpoCanvas Mail is an open-source e-mail service built on Cloudflare's edge infrastructure (Workers, D1, KV, R2), with its source code released under the MIT license. The service can be provided in two forms:

1. **Hosted instance**: the public site operated by the operations team (`mail.epocanvas.com`), together with the companion mobile app (epomail);
2. **Self-hosted instances**: private sites that any individual, team, or organization deploys on their own domain and Cloudflare account from the open-source code.

## 2. Data-Processing Roles

The legal documents of the service use the "data controller / data processor" division, broadly equivalent to the classification used by the GDPR and similar regimes; the law applicable to each instance is determined by its operator's location.

![EpoCanvas Mail responsibility boundaries: the upstream open-source project (MIT license) provides source code; the instance you use is operated independently by its operator, who bears data-controller responsibility; your account and mail data reside in that instance's Cloudflare resources](/images/mail/en/self-host-responsibilities.svg)

*Figure: the responsibility boundaries among the software, the operator, and the user. The upstream open-source authors operate no e-mail service and are not responsible for any instance's conduct.*

| Scenario | Data controller | Data processor |
| --- | --- | --- |
| Hosted instance | the operations team (for account data and security-audit records); for the content of mail you send and receive, the operator processes it to the extent necessary to provide the communication service | Cloudflare, Resend, and other entrusted processors |
| Self-hosted instance | the individual or organization that deployed the instance (sole and exclusive data controller) | the infrastructure providers that deployer has configured |

The open-source code itself collects nothing, uploads nothing, and sends back no telemetry; apart from external services the instance operator configures itself, the upstream authors never touch any instance's operating data. The open-source project provides no service and assumes none of any instance's compliance obligations: from the moment of deployment, the deployer becomes the data controller for its users and must fulfil the notice, security-maintenance, and oversight obligations required by the law applicable at its location, and may use the documents on this site as a template for its own notices and terms.

## 3. Document Architecture

The legal documents on this site are organised by topic and refer to one another; together they form the complete agreement:

| Document | Contents |
| --- | --- |
| [Privacy Policy](/en/mail/privacy-policy/) | collection, processing, and use of personal data; the nature of processing; your rights; international transfers |
| [Terms of Service](/en/mail/terms-of-service/) | contractual conditions of use, rights and obligations, limitation of liability, governing law, and jurisdiction |
| [Acceptable Use Policy](/en/mail/acceptable-use/) | conduct boundaries, the list of prohibited conduct, and the operator's enforcement and appeal procedures |
| [Data Processing & Security Maintenance](/en/mail/data-security/) | the data lifecycle, the processing matrix, security measures, incident response, and cooperation with oversight |
| [Sub-processor List](/en/mail/sub-processors/) | entrusted processors, shared objects, the data involved, and international-transfer safeguards |
| [Key Terms](/en/mail/key-terms/) | definitions of the technical and legal terms used across this site's legal documents |
| [Official Mail & Tamper-Proof Verification](/en/mail/tamper-proof/) | official mail specifications and identification, the official flag, immutable delivery, and document tamper-proof verification |

This site is organised along two complementary reading routes: readers who want to learn about the project, prepare a self-deployment or study its use can start from the [Project Overview](/en/mail/project/) and go deeper through the [Interface & Route Map](/en/mail/interface/), the [Search & Rules Reference](/en/mail/search/), the [Deployment Guide](/en/mail/deployment/) and the [Development Guide](/en/mail/development/); readers who want the scope of the service and its privacy and legal covenants can reach the legal documents below from this page. The two routes meet at the [Features Guide](/en/mail/features/) and [Operating Modes](/en/mail/modes/).
## 4. Order of Precedence

1. For privacy matters the [Privacy Policy](/en/mail/privacy-policy/) is the specific provision; for conditions of use the [Terms of Service](/en/mail/terms-of-service/) is the specific provision; all other matters are interpreted according to the architecture on this page.
2. Where the documents are inconsistent, the document most directly concerned with the subject matter prevails.
3. The Traditional Chinese (Taiwan) versions of this site's legal documents are the authoritative versions; translations into other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version prevails. The law applicable to each instance is determined by its operator's location (see Section 2).

## 5. Contact Channels

- **Privacy matters and data-protection complaints**: `privacy@epocanvas.com`
- **In-product contact**: in-site message or `admin@epocanvas.com`
- **Open-source project**: GitHub repository Issues (`github.com/shijianus/epomail`)
- **Self-hosted sites**: contact the operator contact information published by that site
