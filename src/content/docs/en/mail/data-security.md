---
title: Data Processing and Security Maintenance
description: EpoCanvas Mail data life cycle, processing matrix, security maintenance measures established under Article 20-1 of the PDPA and Article 12 of the Enforcement Rules, incident response, and cooperation with inspections.
---

# Data Processing and Security Maintenance

**Effective date: September 29, 2026 | Version: 4.1**

Following Section 10 of the [Privacy Policy](/en/mail/privacy-policy/), this document describes the life cycle of personal data in the Service, the processing matrix for each category of data, and the security maintenance measures established by the Operator under Article 20-1 of the Taiwan Personal Data Protection Act (個人資料保護法, "PDPA") (a non-governmental agency that maintains personal data files shall implement security maintenance measures to prevent personal data from being stolen, altered, damaged, lost, or leaked) and Article 12 of the Enforcement Rules of the Personal Data Protection Act. This document also serves as the base document for inspection by the competent authority under Article 22 of the PDPA and for access by data subjects.

## 1. Data Life Cycle

![EpoCanvas Mail data life cycle: collection (registration and sending and receiving email), processing (parsing and encryption at edge nodes), use (providing the service and security protection), transfer (entrusted processors and data subject-triggered functions), retention (D1/KV/R2), and destruction (7-day routine cleanup and physical deletion), with each stage anchored in Articles 19, 20, and 21 of the PDPA](/images/mail/data-flow.svg)

*Figure: The life cycle of personal data in the Service. The legal basis for each stage is set out in Section 5 of the [Privacy Policy](/en/mail/privacy-policy/).*

## 2. Data Processing Matrix

| Data category | Specific items | Processing purpose | Storage medium and security baseline | Retention and destruction |
| --- | --- | --- | --- | --- |
| Account credentials | Email address, username, password hash and salt, TOTP secret (encrypted with AES-GCM), backup code hashes, Passkey public keys | Registration, verification, two-step verification, credential recovery | Cloudflare D1; passwords PBKDF2 (100,000 iterations, salted); TOTP encrypted at rest | Retained until account termination; purged immediately upon physical deletion |
| Network and device data | Registration IP, most recent login IP, operating system, browser User-Agent, device type | Security auditing, anomalous login identification, rate limiting | Cloudflare D1; access restricted to administrator audit | Retained until physical deletion of the account |
| Session state | JWT tokens, RBAC role identifiers, selected mailbox | Edge gateway authorization, request routing | Cloudflare KV; maximum validity 30 days | Revoked upon logout; expires naturally after 30 days of inactivity |
| Communication data | Sender and recipient, CC/BCC, subject, timestamps, read status, labels, stars, body | Email delivery, conversation organization, search | Cloudflare D1 (metadata); encrypted at rest with AES-256-GCM depending on the mode | Controlled by the data subject; trash physically deleted after 7 days; when usage exceeds 90%, email already marked deleted is physically deleted outright |
| Attachments | Original file name, MIME type, file size, binary content | Attachment transfer, inline display, secure download | Cloudflare R2 or S3-compatible storage; downloads use defensive headers | Follow the life cycle of the associated email; purged together upon physical deletion |
| Security and rate-limiting records | Login failure counts, human verification status, sliding-window request counts | Brute-force protection, abuse prevention | Cloudflare KV; sliding-window counters | Automatically expire and reset within 12 hours after a threshold is triggered |
| Interface preferences | Language (6 languages), light and dark modes, notification flags | Interface consistency | Browser localStorage, selectively synced to D1 | Retained until the cache is cleared or manually reset |

## 3. Security Maintenance Measures (Mapped to Article 12 of the Enforcement Rules)

Article 12 of the Enforcement Rules of the Personal Data Protection Act lists the items that "appropriate security maintenance measures" may include. The Operator establishes the following measures under that Article; all eleven items are covered:

| Item under Article 12 of the Enforcement Rules | Implementation in the Service |
| --- | --- |
| 1. Allocation of dedicated personnel and comparable resources | The instance Operator designates administrators and divides permissions through multi-level RBAC roles |
| 2. Defining the scope of personal data | The processing matrix in Section 2 of this document clearly defines each category of data |
| 3. Risk assessment and management mechanisms for personal data | Encryption options across the three mail modes, lockout on failure, and rate-limiting and quota mechanisms; the open source code is publicly subject to community review |
| 4. Mechanisms for incident prevention, notification, and response | See Section 4 of this document |
| 5. Internal management procedures for collection, processing, and use | The processing-activity mapping table in Section 5 of the [Privacy Policy](/en/mail/privacy-policy/) |
| 6. Data security management and personnel management | Cryptographic hash routing (preventing unauthorized access), fail-closed permission checks, and stripping of non-allowlisted parameters at the gateway |
| 7. Awareness promotion and education and training | Operators of self-hosted instances shall conduct these themselves; the documents on this site may serve as training material |
| 8. Equipment security management | Cloudflare edge infrastructure bears physical and virtual equipment security (SOC 2 Type II, ISO/IEC 27001); keys are injected as environment variables and never enter the code base |
| 9. Data security audit mechanisms | Security logs (login IP, device, failure records) are retained with audit-restricted access; sessions can be revoked immediately |
| 10. Retention of usage records, trace data, and evidence | Login and security logs are retained until physical deletion of the account; evidence of abuse incidents is retained under the [Acceptable Use Policy](/en/mail/acceptable-use/) |
| 11. Overall continuous improvement of security maintenance | The open source project evolves continuously; material security fixes are released with versions and announced |

Key technical measures: site-wide HTTPS/TLS; HTML email is sanitized with DOMPurify in an isolated Shadow DOM before rendering (blocking scripts, inline event handlers, and external imports); attachment downloads enforce `Content-Disposition: attachment` and `X-Content-Type-Options: nosniff`; SSRF protection is applied to webhooks and external storage endpoints (blocking private network ranges and cloud metadata addresses); email IDs are routed through HMAC obfuscation to prevent unauthorized enumeration.

:::caution[Scope and Limits of Encryption]
The encryption of the Service's three email modes—"all", "private", and "encrypted"—is server-side encryption at rest: keys are derived from the instance server's environment variables and the user's identity. This mechanism protects against the risk of database files being stolen or snapshots leaked; it is not end-to-end encryption, and an Operator holding the server and the keys technically has the ability to decrypt. Where confidentiality against the Operator as well is required, encrypt the email body yourself with an end-to-end encryption tool such as GPG before sending it.
:::

## 4. Incident Response and Notification

When the Operator becomes aware that personal data has been stolen, altered, damaged, lost, or leaked, it takes the following measures:

1. immediately block the source of the intrusion (revoke sessions, block the source, rotate keys);
2. assess the scope of impact and retain records (trace data and evidence retention under Article 12, Subparagraph 10, of the Enforcement Rules);
3. notify affected data subjects and report to the competent authority in accordance with the security maintenance regime issued under Article 20-1, Paragraph 2, of the PDPA and the rules of the competent authority; the notification includes the facts of the incident, the possible harms, the response measures already taken, and the self-protective measures data subjects can take;
4. review the cause of the incident and reinforce the corresponding security measures (continuous improvement under Article 12, Subparagraph 11, of the Enforcement Rules).

## 5. Cooperation with Inspections

Under Article 1-1 of the PDPA, the competent authority for the Act is the Personal Data Protection Commission. Under Article 22 of the same Act, where the competent authority considers that a non-governmental agency may have violated the Act, or considers it necessary in order to review the agency's implementation of the Act, it may order the agency to state its position, require it to furnish necessary documents, data, or items, or—on its own or together with the central competent authority for the industry concerned, a special municipality government, or a county (city) government—send personnel carrying proof of their official duties to conduct an on-site inspection. The Operator of the Service accepts inspection and audit by the competent authority and may not evade, obstruct, or refuse without legitimate reason; it maintains security maintenance measures under Article 20-1 of the PDPA and Article 12 of the Enforcement Rules of the Personal Data Protection Act. This document and the [Privacy Policy](/en/mail/privacy-policy/) serve as the base documents for inspection.

Under Article 25 of the PDPA, for violations the competent authority may, in addition to imposing fines, order the cessation of collection, processing, or use, order the deletion of personal data files, confiscate or order the destruction of unlawfully collected personal data, or publicize the violation; the Operator will comply with the contents of any such disposition.

Operators of self-hosted instances shall independently fulfill all of the obligations listed in this section for their instance and face audit by the competent authority where they are located; this document may serve as a template for establishing their security maintenance plan.
