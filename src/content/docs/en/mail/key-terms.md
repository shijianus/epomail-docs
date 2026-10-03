---
title: Key Terms
description: Definitions of the technical and legal terms used in the EpoCanvas Mail legal documents — general data-protection usage, interpreted by this service's architecture.
---

**Effective Date: October 4, 2026 | Version: 5.10**

This page defines the terms used across this site's legal documents. Legal terms follow general data-protection usage; technical terms are interpreted by the actual implementation of the Service's open-source code.

The Traditional Chinese (Taiwan) versions of this site's legal documents are the authoritative versions; translations into other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version prevails. The legal and technical documents on this site follow the open-source implementation of the service and aim to establish transparent, rigorous, non-commercial community communication norms.

![Map of terms: legal terms (data controller, processor, data subject, specific purpose, and others) and technical terms (instance, D1/KV/R2, encryption at rest, zero telemetry, and others) used consistently across all documents; the interpretation bases are general data-protection usage and the actual open-source implementation](/images/mail/en/key-terms-glossary.svg)

*Figure: the relation between the two groups of definitions. Legal terms follow general data-protection usage; technical terms are interpreted by the open-source implementation; terms not listed are read in the context of the Privacy Policy and the Terms of Service.*

## 1. Legal Terms

| Term | Definition |
| --- | --- |
| Personal data | any data relating to a natural person's name, date of birth, contact details, social activity, and anything else by which that person can be identified directly or indirectly. In this Service it is mainly e-mail addresses, account credentials, and network-activity records |
| Highly sensitive personal data | medical records, healthcare, genetics, sex life, health checks, criminal records, and similar highly sensitive categories, whose processing is strictly restricted in most jurisdictions |
| Collection / processing / use | collection: acquiring personal data by any means; processing: recording, entering, storing, editing, correcting, copying, retrieving, deleting, outputting, linking, or internally transferring data to build or use a personal-data file; use: employing collected personal data for anything other than processing |
| Data controller | the entity that decides the purposes and manner of collecting, processing, and using personal data; the hosted instance's operator and a self-hosted instance's deployer are both controllers |
| Data processor | an entity that processes personal data on a controller's instructions and for it (such as Cloudflare or Resend) |
| Data subject | the natural person identified by personal data — "you" in these documents |
| International transfer | processing or using personal data across national borders; it follows applicable law's requirements and safeguard mechanisms such as standard contractual clauses |
| Notice duty | when collecting personal data from a data subject, the duty to inform of the collector's identity, purposes, data categories, the period, region, recipients, and manner of use, the rights the subject may exercise and how, and the consequences of not providing; for data not obtained from the subject, the source must be disclosed before processing or use |
| Specific purpose | the specific purpose a collection or processing of personal data must have; use must stay within the scope necessary for that purpose |
| Marketing opt-out | when a data subject declines marketing, use of their personal data for marketing stops immediately; the first marketing message must offer a way to decline |
| Competent authority | the authority responsible for personal-data protection under the applicable law; for the hosted instance located in Taiwan it is the Personal Data Protection Commission |
| Non-consensual intimate imagery | intimate imagery of another person recorded, reproduced, or distributed without consent, and fabricated sexual imagery made by computer synthesis or similar means; recording, reproducing, or distributing it without consent is a crime in most jurisdictions, and a platform notified of it should restrict access or remove it first |
| Child sexual exploitation | sexually exploiting children or juveniles, including photographing, producing, reproducing, holding, distributing, broadcasting, delivering, publicly displaying, selling, or being paid to view sexual imagery of children or juveniles |
| Governing law | the law governing the contract, determined by the operator's location; Section 11 of the [Terms of Service](/en/mail/terms-of-service/) states each instance's governing law |
| Standard-form contract | a contract concluded by general terms with many unspecified persons; parts that are grossly unfair may not bind under applicable law |

## 2. Technical Terms

| Term | Definition |
| --- | --- |
| Instance (site) | one deployment of EpoCanvas Mail running within a particular person's or organization's Cloudflare account, such as `mail.epocanvas.com` |
| Operator | the person or team that deploys and manages an instance — "we" in these documents |
| PBKDF2 | a password-hashing algorithm. The Service runs HMAC-SHA256 at 100,000 iterations with a unique random salt per user, so the original password cannot be reversed from the hash |
| TOTP | a time-based one-time password per RFC 6238; its secret is stored in the database encrypted with AES-256-GCM |
| Passkey | a public-key credential per the FIDO2/WebAuthn standards; the Service stores only the public key, and the private key stays on the user's device |
| JWT (session token) | a digitally signed credential issued at login, valid 30 days; at most 10 concurrent sessions per account; revoked server-side on logout |
| localStorage | browser-provided web storage that persists across sessions on the user's device; the Service's session token is stored here, and no cookies are used |
| Encryption at rest | encrypting data as it is written to storage media. The Service's keys are derived from the instance server's environment variables — server-side encryption, not end-to-end encryption |
| End-to-end encryption (E2EE) | encryption in which only the sending and receiving parties can decrypt. The Service does not provide it; if you need it, encrypt with GPG or a similar tool beforehand |
| HMAC masked routing | a mechanism binding mail identifiers to user identity with a hash-based message authentication code, preventing unauthorised access (IDOR) and resource enumeration |
| RBAC | role-based access control. The Service uses a deny-by-default multi-level permission model; non-whitelisted parameters are stripped at the gateway |
| D1 / KV / R2 | Cloudflare's edge SQLite database, globally replicated key-value storage, and S3-compatible object storage, carrying structured data, session caches, and attachment blobs respectively |
| Telemetry | software automatically sending usage data back to its developers. This Service's source code has zero telemetry and sends nothing back about any instance |
| Soft deletion / hard deletion | soft deletion marks records deleted, which an administrator can restore; hard deletion removes them, with attachments and indexes, from the storage itself, irreversibly |
| BYOS | Bring Your Own Storage — keeping attachments in an S3-compatible object store of the operator's or user's own (such as Backblaze B2 or Wasabi); storage credentials are kept by whoever configures it |
| Workers AI | Cloudflare's edge inference service, used for verification-code extraction and other AI processing; see Section 6 of the [Privacy Policy](/en/mail/privacy-policy/) for triggers and data scope |
| Turnstile | Cloudflare's human-verification mechanism, run at registration and when adding a mailbox, assessing browser trustworthiness without advertising cookies or cross-site tracking |
| SSRF protection | blocking of server-side request forgery; requests to external endpoints are always checked against public addresses, and loopback, private ranges, and cloud metadata addresses are rejected |

## 3. Other

Terms not defined on this page are interpreted in the context of the [Privacy Policy](/en/mail/privacy-policy/) and the [Terms of Service](/en/mail/terms-of-service/) and by general legal and technical usage. If a definition is unclear, ask through the channels listed in Section 14 of the [Privacy Policy](/en/mail/privacy-policy/).
