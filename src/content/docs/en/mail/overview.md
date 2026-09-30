---
title: Privacy and Terms Overview
description: Overview of the EpoCanvas Mail legal documents—platform identity, data processing roles, document architecture, order of precedence, and contact channels.
---

# Privacy and Terms

**Effective date: September 30, 2026 | Version: 5.2**

This page is a guide to all of the legal documents of the EpoCanvas Mail service (the "Service"), explaining the roles of the parties, the document architecture, and the order of application. Before registering for or using the Service, you should read this page, together with the [Privacy Policy](/en/mail/privacy-policy/) and the [Terms of Service](/en/mail/terms-of-service/).

![EpoCanvas Mail legal document architecture: the Terms of Service as the contract layer; the Privacy Policy and the Acceptable Use Policy as the policy layer; Data Processing and Security Maintenance, the Third-Party Processor List, and Key Terms as supporting documents—all standing on the foundation of applicable law and security maintenance duties](/images/mail/legal-architecture.svg)

*Figure: The architecture of the legal documents on this site. The Terms of Service set the contractual conditions; the Privacy Policy carries the notifications for and the processing standards applied to personal data; the Acceptable Use Policy sets the boundaries of conduct; Data Processing and Security Maintenance, the Third-Party Processor List, and Key Terms are supporting documents. The applicable law of each instance is determined by its Operator's location.*

## 1. Platform Identity

EpoCanvas Mail is an open source email service built on the Cloudflare edge computing architecture (Workers, D1, KV, R2), with its source code released under the MIT License. The Service may be provided in the following two forms:

1. **Hosted instance**: a public site (`mail.epocanvas.com`) operated by the operations team, together with its companion mobile app (epomail);
2. **Self-hosted instance**: a private site that any individual, team, or organization deploys on its own domain and within its own Cloudflare account using the open source code.

## 2. Definition of Data Processing Roles

The legal documents of the Service adopt the distinction between a "data controller" and an "entrusted processor", which corresponds to the general classification used in the EU General Data Protection Regulation (GDPR) and similar legal systems; the applicable law of each instance is determined by its Operator's location.

![EpoCanvas Mail allocation of responsibilities: the upstream open source project (MIT License) provides the source code; the instance you use is run independently by its Operator, which bears data controller responsibility; your account and email data are stored in that instance's Cloudflare resources](/images/mail/self-host-responsibilities.svg)

*Figure: The boundaries of responsibility among the software, the Operator, and users. The upstream open source authors do not operate any email service and are not responsible for the conduct of any instance.*

| Scenario | Data controller | Data processor |
| --- | --- | --- |
| Hosted instance | The operations team (with respect to account data and security audit records); with respect to the content of email exchanged by users, the Operator processes it to the extent necessary for providing the communication service | Entrusted processors such as Cloudflare and Resend |
| Self-hosted instance | The individual or organization that deployed the instance (the sole and exclusive data controller) | The infrastructure providers configured by that deployer |

The open source code itself does not collect, upload, or send back any telemetry; the upstream authors have no access to the operational data of any instance. The open source project provides no service itself and bears no instance's compliance obligations: from the moment of deployment, the deployer becomes the data controller for its users and must fulfill the duties of notification, security maintenance, and subjection to oversight under the applicable law at its own location, and may use the documents on this site as base templates for its notifications and terms.

## 3. Document Architecture

The legal documents on this site are organized by topic; the documents cross-reference one another and together constitute the complete agreement:

| Document | Content |
| --- | --- |
| [Privacy Policy](/en/mail/privacy-policy/) | The collection, processing, and use of personal data; the nature of processing; data subject rights; and international transfers |
| [Terms of Service](/en/mail/terms-of-service/) | The contractual conditions for use of the Service; rights and obligations; limitations of liability; governing law; and jurisdiction |
| [Acceptable Use Policy](/en/mail/acceptable-use/) | The boundaries of user conduct; the list of prohibited conduct and the Operator's handling measures; and enforcement procedures |
| [Data Processing and Security Maintenance](/en/mail/data-security/) | The data life cycle; the processing matrix; security maintenance measures; incident response; and cooperation with inspections |
| [Third-Party Processor List](/en/mail/sub-processors/) | Entrusted processors, sharing recipients, the data involved, and safeguards for international transfers |
| [Key Terms](/en/mail/key-terms/) | Definitions of the technical and legal terms used in the legal documents on this site |

## 4. Order of Precedence

1. For privacy matters, the [Privacy Policy](/en/mail/privacy-policy/) is the specific provision; for the conditions of use of the Service, the [Terms of Service](/en/mail/terms-of-service/) is the specific provision; all other matters are interpreted according to the architecture set out on this page.
2. In the event of any inconsistency between documents, the document directly related to the subject matter prevails.
3. The Traditional Chinese (Taiwan) versions of the legal documents on this site are the authoritative versions; translations in other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version shall prevail. The applicable law of each instance is determined by its Operator's location (see Section 2).

## 5. Contact Channels

- **Privacy matters and data protection complaints**: `privacy@epocanvas.com`
- **In-product contact**: in-app messages or `admin@epocanvas.com`
- **Open source project**: GitHub repository Issues (`github.com/shijianus/epomail`)
- **Self-hosted sites**: contact the Operator through the contact details published by that site
