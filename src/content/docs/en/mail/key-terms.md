---
title: Key Terms
description: Definitions of the technical and legal terms used in the EpoCanvas Mail legal documents—using the general definitions of data-protection law, interpreted according to the architecture of the Service.
---

# Key Terms

**Effective date: September 30, 2026 | Version: 5.1**

This page defines the terms used in the legal documents on this site. Legal terms use the general definitions of data-protection law; technical terms are interpreted according to the actual implementation in the Service's open source code.

## 1. Legal Terms

| Term | Definition |
| --- | --- |
| Personal data | A natural person's name, date of birth, contact details, social activities, and other data by which that person can be identified directly or indirectly. For the Service, this consists mainly of email addresses, account credentials, and network activity records |
| Highly sensitive personal data | Personal data concerning medical history, medical treatment, genetic information, sexual life, health examinations, and criminal records, which falls into highly sensitive categories whose processing is strictly restricted in most jurisdictions |
| Collection / processing / use | "Collection" means acquiring personal data by any means; "processing" means the recording, input, storage, editing, correction, replication, retrieval, deletion, output, linking, or internal transmission of data in order to establish or use personal data files; "use" means employing collected personal data for purposes other than processing |
| Data controller | The entity that decides the purposes and methods of the collection, processing, and use of personal data; this includes the Operator of a hosted instance and the deployer of a self-hosted instance |
| Entrusted processor | An entity that processes personal data for the controller on the controller's instructions (such as Cloudflare and Resend) |
| Data subject | The natural person identified by the personal data; the "you" referred to in the documents on this site |
| International transfer | The processing or use of personal data across national borders; follows the requirements of applicable law and safeguard mechanisms such as standard contractual clauses |
| Notification duty | The duty, when collecting personal data from a data subject, to notify the data subject of the collector's identity, the purposes of collection, the categories of data, the period, region, recipients, and means of use, the rights the data subject may exercise, and the consequences of not providing the data; where personal data is not obtained from the data subject, the source is notified before processing or use |
| Specific purpose | The specific purpose that must exist for the collection or processing of personal data; use must remain within the extent necessary for that purpose |
| Right to refuse marketing | When a data subject indicates refusal to accept marketing, use of the personal data for marketing ceases immediately; at the first marketing, the means of indicating refusal is provided |
| Competent authority | The authority responsible for personal-data protection matters under applicable law; for the hosted instance, located in Taiwan, the competent authority is the Personal Data Protection Commission |
| Non-consensual intimate image | An intimate image of another person that was recorded, reproduced, or distributed without consent, and a fabricated intimate image made by computer synthesis or other technological means; recording, reproducing, or distributing such images without consent constitutes crimes in most jurisdictions, and a platform notified of them restricts access to or removes them first |
| Child and youth sexual exploitation | The sexual exploitation of children or youths, including photographing, manufacturing, reproducing, possessing, distributing, broadcasting, delivering, publicly displaying, selling, or being paid to allow the viewing of sexual images of children or youths |
| Governing law | The law applicable to a contract, determined by the Operator's location; Section 11 of the [Terms of Service](/en/mail/terms-of-service/) states the governing law for each instance |
| Standard-form contract | A contract concluded through general clauses with large numbers of unspecified persons; parts that are manifestly unfair do not bind, under applicable law |

## 2. Technical Terms

| Term | Definition |
| --- | --- |
| Instance (site) | One EpoCanvas Mail deployment running within a particular individual's or organization's Cloudflare account, such as `mail.epocanvas.com` |
| Operator | The individual or team that deploys and manages the instance; the "we" referred to in the documents |
| PBKDF2 | A password hashing algorithm. The Service performs 100,000 iterations with HMAC-SHA256 and appends a per-user independent random salt, so that the original password cannot be derived from the hash |
| TOTP | Time-based one-time passwords under RFC 6238; the secret is stored encrypted with AES-256-GCM in the database |
| Passkey | A public key credential under the FIDO2/WebAuthn standards; the Service stores only the public key, while the private key remains on the data subject's device |
| JWT (session token) | A digitally signed credential issued after login, valid for 30 days; at most 10 concurrent sessions per account; revoked server-side upon logout |
| localStorage | A web storage mechanism provided by browsers; data remains on the data subject's device and persists across sessions. The Service's session tokens are stored here; no cookies are used |
| Encryption at rest | Encryption applied when data is written to storage media. The Service's keys are derived from instance server environment variables, making it server-side encryption rather than end-to-end encryption |
| End-to-end encryption (E2EE) | A form of encryption in which only the sender and the recipient can decrypt. The Service does not provide it; those who need it should encrypt in advance themselves with tools such as GPG |
| HMAC obfuscated routing | A mechanism that binds email identifiers to user identity using a hash-based message authentication code, preventing unauthorized access (IDOR) and resource enumeration |
| RBAC | Role-based access control. The Service uses a fail-closed multi-level permission model, with non-allowlisted parameters stripped at the gateway |
| D1 / KV / R2 | Cloudflare's edge SQLite database, globally replicated key-value storage, and S3-compatible object storage, carrying structured data, session caching, and attachment blobs respectively |
| Telemetry | The automatic sending of usage data back to developers by software. The Service's source code contains zero telemetry and sends no instance data upstream |
| Soft deletion / physical deletion | Soft deletion means the item is marked as deleted and may be restored by an administrator; physical deletion means removal from storage together with attachments and indexes, which cannot be recovered |

## 3. Other

Terms not defined on this page are interpreted according to the context of the [Privacy Policy](/en/mail/privacy-policy/) and the [Terms of Service](/en/mail/terms-of-service/) and general legal and technical usage. If any definition is unclear, inquire through the channels listed in Section 14 of the [Privacy Policy](/en/mail/privacy-policy/).
