---
title: Key Terms
description: Definitions of the technical and legal terms used in the EpoCanvas Mail legal documents—interpreted in accordance with the PDPA and the architecture of the Service.
---

# Key Terms

**Effective date: September 29, 2026 | Version: 4.1**

This page defines the terms used in the legal documents on this site. Legal terms follow the definitions in the current provisions of the Taiwan Personal Data Protection Act (個人資料保護法, "PDPA") and related statutes; technical terms are interpreted according to the actual implementation in the Service's open source code.

## 1. Legal Terms

| Term | Definition |
| --- | --- |
| Personal data | Under Article 2 of the PDPA, a natural person's name, date of birth, contact details, social activities, and other data by which that person can be identified directly or indirectly. For the Service, this consists mainly of email addresses, account credentials, and network activity records |
| Sensitive personal data | The personal data concerning medical history, medical treatment, genetic information, sexual life, health examinations, and criminal records listed in Article 6 of the same Act, which may not be collected, processed, or used except in the circumstances prescribed by law |
| Collection / processing / use | Article 2 of the same Act: "collection" means acquiring personal data by any means; "processing" means the recording, input, storage, editing, correction, replication, retrieval, deletion, output, linking, or internal transmission of data in order to establish or use personal data files; "use" means employing collected personal data for purposes other than processing |
| Data controller | The entity that decides the purposes and methods of the collection, processing, and use of personal data; this includes the Operator of a hosted instance and the deployer of a self-hosted instance |
| Entrusted processor | An entity that processes personal data for the controller on the controller's instructions (such as Cloudflare and Resend) |
| Data subject | The natural person identified by the personal data; the "you" referred to in the documents on this site |
| International transfer | Under Article 2 of the same Act, the processing or use of personal data across national borders; governed by Article 21 of the PDPA and by restriction orders of the competent authority |
| Notification duty | Under Article 8 of the same Act, when collecting personal data from a data subject the collector must clearly notify six items: the collector's identity, the purposes of collection, the categories of data, the period, region, recipients, and means of use, the rights the data subject may exercise, and the consequences of not providing the data; where personal data is not obtained from the data subject, Article 9 requires notice of the source before processing or use |
| Specific purpose | Under Article 19 of the same Act, the specific purpose a non-governmental agency must have for collecting or processing personal data; use must remain within the extent necessary for that purpose (Article 20) |
| Right to refuse marketing | Under Paragraph 2 of Article 20 of the same Act, when a data subject indicates refusal to accept marketing, use of the personal data for marketing must cease immediately; at the first marketing, the means of refusal must be provided and the necessary costs borne by the Operator (Paragraph 3) |
| Competent authority | Under Article 1-1 of the PDPA, the competent authority for the Act is the Personal Data Protection Commission |
| Non-consensual intimate image | An intimate image of another person that was recorded, reproduced, or distributed without consent, and a fabricated intimate image made by computer synthesis or other technological means; recording and distributing such images constitute offenses under Article 319-1 to Article 319-4 of the Criminal Code, and the removal obligation of platforms follows Article 13 of the Sexual Assault Crime Prevention Act |
| Child and youth sexual exploitation | The conduct defined in Article 2 of the Child and Youth Sexual Exploitation Prevention Act, including photographing, manufacturing, reproducing, possessing, distributing, broadcasting, delivering, publicly displaying, selling, or paying for the viewing of sexual images of children or youths |
| Governing law | The law agreed to apply to a contract; the [Terms of Service](/en/mail/terms-of-service/) designate the law of the Republic of China |
| Standard-form contract | A contract concluded through general clauses for large numbers of unspecified persons; regulated by Article 247-1 of the Civil Code (invalidity of obviously unfair parts) and by Article 11-1 (review period) and Article 17 (mandatory and prohibited provisions) of the Consumer Protection Act |
| Complaint-based prosecution | Under Article 363 of the Criminal Code, offenses in the chapter on offenses against computer use (Articles 358 to 360) are prosecuted only upon a complaint by the injured party; this does not affect the Operator's remedies through civil or administrative channels or under this site's policies |

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
