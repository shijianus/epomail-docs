---
title: Privacy Policy
description: The EpoCanvas Mail Privacy Policy — how personal data is collected, processed, and transferred; the nature of processing; your rights; and the security-maintenance standards the operator follows.
---

# Privacy Policy

**Effective Date: October 2, 2026 | Version: 5.7**

This policy explains how the EpoCanvas Mail service (the "Service") collects, processes, and transfers your personal data, and the standards the operator follows to protect it. Please read this policy before registering for or using the Service; if you disagree with any part of it, please do not use the Service.

The technical facts in this document follow the actual implementation of the Service's open-source code. The Traditional Chinese (Taiwan) versions of this site's legal documents are the authoritative versions; translations into other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version prevails. The legal and technical documents on this site follow that implementation and aim to establish transparent, rigorous, non-commercial community communication norms. The law applicable to the instance you use is determined by its operator's location (see Section 12).

![EpoCanvas Mail five pillars of the privacy policy: collection, use, transfer, security, and data-subject rights — grounded in contract and consent, purpose limitation, transfer safeguards, security maintenance, and remedies, all resting on supervisory oversight](/images/mail/privacy-pillars.svg)

*Figure: the five axes of this policy. Collection and use are limited to what specific purposes require; international transfers follow applicable law and standard safeguard mechanisms; security maintenance is continuously improved; data-subject rights are exercised under Section 9; all of it rests on supervisory oversight.*

## 1. Scope

This policy applies to personal data arising from any use of the Service, including:

1. visiting the Service's website (`mail.epocanvas.com` or a self-hosted instance's domain);
2. using the mobile app (epomail);
3. connecting to the Service through its open API.

This policy does not apply to third-party websites and services linked or embedded in the Service; those third parties have their own privacy policies and are responsible for them.

An operator who self-hosts EpoCanvas Mail becomes the data controller for its users from the moment of deployment and must independently fulfil the notice obligations required by the law applicable at its location; this policy may serve as the basis text for such notice.

## 2. Data Controller and Entrusted Processors

| Instance you use | Data controller | Notes |
| --- | --- | --- |
| Hosted instance `mail.epocanvas.com` | the EpoCanvas operations team | the team is the data controller for account data, authentication records, and security-audit logs; for the content of mail you send and receive, it processes that content to the extent necessary to provide the communication service |
| Self-hosted instance | the instance's deployer | the open-source code contains no telemetry; apart from external services the operator configures itself, no instance data is sent back to the upstream authors or any third party |

Entrusted processors process data on the controller's instructions; the complete list is in the [Sub-processor List](/en/mail/sub-processors/).

## 3. Notice at Collection

When collecting personal data, the Service informs you of the following:

| Notice item | What the Service tells you |
| --- | --- |
| 1. Identity of the collector | the operator (see Section 2; for a self-hosted instance, its deployer) |
| 2. Purposes of collection | providing the e-mail communication service; account and information-security management; abuse and fraud prevention; delivery of system announcements; fulfilling legal obligations (see the processing table in Section 5) |
| 3. Categories of personal data | identification (e-mail address, username); account security (password hash, two-step verification credentials); interface preferences (language, light/dark mode); network activity (mail records, labels, stars, read status); anything else directly or indirectly identifying (login IP, operating system, browser, and device type parsed from the User-Agent) — see Section 4 |
| 4. Period, region, recipients, and manner of use | period: while the account exists, with fixed retention for some items (see the processing matrix in [Data Processing & Security Maintenance](/en/mail/data-security/)); region: the Service is built on Cloudflare's global edge network, so data may be processed at any edge node worldwide (see Section 7); recipients: the operator and its entrusted processors, third-party apps you authorise, and competent authorities acting under legal requirements (see Section 7); manner: automated storage, transmission, retrieval, push, and edge inference; no manual review except as required by law or judicial process |
| 5. Your rights and how to exercise them | query and view; obtain a copy; supplement and correct; stop processing; and delete — see Section 9 |
| 6. Consequences of not providing | e-mail address and password are required for registration and login; without them an account cannot be created. All other fields (nickname, avatar, bio) are optional and do not affect use of the Service |

When you sign in with a Linux DO account, the Service obtains your user identifier, nickname, and avatar from that identity source — personal data not provided directly by you. Its source is the Linux DO account you sign in with; the period, region, recipients, and manner of use, and the rights you can exercise, are as stated in items 2 to 5 of the table above. The Service collects no other personal data that you do not provide directly.

## 4. Personal Data Collected

### 4.1 What you provide

- **E-mail address and password**: required for registration. The password is stored only as a PBKDF2-HMAC-SHA256 hash (100,000 iterations, unique random salt per user); the original password cannot be recovered from the hash.
- **Two-step verification credentials (optional)**: the TOTP secret is stored encrypted with AES-256-GCM; backup recovery codes are stored only as SHA-256 hashes; for passkeys only the public key is stored — the private key stays on your device.
- **Profile (optional)**: nickname, avatar, bio; avatar images are stored in the instance's own object storage (KV) by default, and the operator may configure an external image host through environment variables (see the [Sub-processor List](/en/mail/sub-processors/)).

### 4.2 Your communication content

The e-mail you send and receive (sender and recipients, subject, body, timestamps, and other metadata) and its attachments, plus the labels, stars, read status, and snooze reminders you apply, are stored in the instance's database (Cloudflare D1) and object storage (resolved in order for each instance: your own S3-compatible storage, an operator-configured S3-compatible store, a Cloudflare R2 binding; if none is configured, Cloudflare KV). You own your mail content and are responsible for it; the operator does not sell mail content, does not use it for advertising, and connects to no third-party analytics or tracking.

### 4.3 Technical data recorded automatically

- **Login and security logs**: the IP address, browser User-Agent, and the operating system, browser, and device type parsed from it at registration and login, used for security auditing and unusual-login detection.
- **Session tokens**: after login a JWT (valid 30 days) is stored in your browser's localStorage. The Service uses no cookies and performs no cross-site tracking.
- **Edge network logs**: Cloudflare processes request metadata under its own policies.

### 4.4 What the Service does not collect

The Service has no advertising SDKs, no behavioural profiling, no cross-site cookies, and no Google Analytics or any third-party analytics; it also does not read your device's contacts, photo library, location, or other apps' data.

### 4.5 Highly sensitive personal data

Medical records, healthcare, genetics, sex life, health checks, and criminal records are highly sensitive categories whose processing is strictly restricted in most jurisdictions. The Service's account and system fields do not collect such data; content you transmit yourself by e-mail may contain it, and the operator only passively stores and transmits it to the extent necessary to provide the communication service, never analysing or profiling content. Decide carefully whether to transmit highly sensitive data by e-mail.

## 5. Nature of Processing Activities

The nature of each processing activity of the Service:

| Processing activity | Specific purpose | Nature of processing |
| --- | --- | --- |
| Account registration, login, mailbox management | providing the e-mail service | necessary for the contract, with appropriate security measures |
| Login logs, failure lockout, two-step verification | information-security maintenance | necessary for the contract, subject to proportionality |
| Automatic code extraction (operator-optional) | service convenience | with your consent; you may ask for it to be turned off, or use an instance where it is off |
| Mail translation, image text recognition (you trigger) | content assistance | with your consent; nothing is transmitted unless you trigger it |
| Public profile page (off by default) | social display | data you make public yourself |
| System announcements, official welcome mail | contract performance and user communication | necessary for the contract |

Your personal data is used only for the purposes of collection and the scope closely related to them. The Service does not use your personal data for automated decision-making, profiling, or any commercial purpose unrelated to providing the service. Where the operator markets with personal data, marketing stops as soon as you decline; the first marketing message must offer a way to decline.

## 6. Specific Notice on AI Processing

The Service involves three kinds of AI processing; their triggers and data scope:

1. **Automatic code extraction** (operator-optional): when a new mail arrives, the system sends the subject and the first 6,000 characters of the body to Cloudflare Workers AI for inference at the edge to extract verification codes. This is the only AI processing not triggered manually; if you do not want it, ask the operator to turn it off or use an instance where it is off.
2. **Mail translation** (you trigger): after you click "Translate", the mail text is sent in chunks to the model endpoint the instance is configured with (OpenAI-compatible by default), with MyMemory and Google Translate's public interfaces as fallbacks. If you never trigger translation, mail content is not sent to any AI service. For official system mail (welcome mail, global announcements) that the administrator has not modified, translation uses the preset official template in the target language rendered locally, sending nothing to any AI service; modified mail goes through AI translation as described.
3. **Image text recognition** (you trigger): images containing text are sent to the AI services only when you upload them; purely decorative images, logos, and icons are skipped automatically.

The operator does not train any model on mail content and sends AI services no identity information beyond the text needed for translation or recognition. You may withdraw consent for the consent-based processing above at any time in the manner listed in Section 9; withdrawal does not affect processing already carried out.

## 7. Sharing with Third Parties and International Transfers

The Service shares personal data with third parties on a minimal-necessary basis in exactly the following cases (the complete list and safeguards are in the [Sub-processor List](/en/mail/sub-processors/)):

1. **Entrusted processing**: Cloudflare (compute, storage, mail routing, human verification, edge AI), Resend or Mailjet (outbound delivery — full mail content only for mail leaving the Service);
2. **Authorised by you**: Telegram notifications (only the fields you configure), OAuth third-party apps (scope limited to openid / profile / email, revocable at any time), Linux DO sign-in, and the blog level linkage (blog.epocanvas.com — your e-mail address is sent with the query);
3. **Triggered by you**: AI translation and image text recognition services (see Section 6);
4. **Legal requirements**: provided only when a competent authority requires it through due legal process, and notified to you to the extent the law allows.

The Service is built on Cloudflare's global edge network, so your personal data may be processed at nodes outside your operator's country. The operator follows applicable law's requirements for international transfers and the restrictions lawfully imposed by the competent authority, and relies on Cloudflare's data-protection measures (SOC 2 Type II and ISO/IEC 27001 certification, and the EU Standard Contractual Clauses mechanism) to safeguard transfers. Self-hosted operators must assess and ensure on their own that their international transfers meet their location's legal requirements.

## 8. Retention and Deletion

| Data category | Retention policy |
| --- | --- |
| Inbox mail | kept until you delete it, or quota cleanup is triggered |
| Spam | quarantined 7 days, then moved to trash |
| Trash mail | hard-deleted by a scheduled task 7 days after receipt (attachments and indexes included) |
| Official system mail (welcome mail, global announcements) | by default auto-deleted 7 days after delivery; the operator may configure the number of days |
| Mailbox usage over 90% | mail you have marked deleted is hard-deleted immediately to free space |
| Account deactivation | sessions end immediately; mail enters a soft-deleted state until an administrator performs the hard deletion |
| Hard deletion | account data, mailbox, mail, attachments, OAuth authorisations, and sessions are removed together, irreversibly |
| Enforcement | after an account is banned for violations, the operator may forcibly empty its mail and attachments to free space (see the [Acceptable Use Policy](/en/mail/acceptable-use/) enforcement ladder) |
| Instance shutdown | the operator should give advance notice and a data-export window; after shutdown data is destroyed with the Cloudflare resources |

After hard deletion, data cannot be recovered. Before deletion, you can obtain a complete copy in JSON format (profile and full text of undeleted mail) through "Settings → Data Export". The full technical description is in [Data Processing & Security Maintenance](/en/mail/data-security/).

## 9. Your Rights and How to Exercise Them

You have the following rights over your personal data:

1. to query or request access;
2. to request a copy (implemented by the Service's "Data Export" feature);
3. to request supplementation or correction;
4. to request that collection, processing, or use be stopped;
5. to request deletion.

How to exercise them: self-service interface functions (export, deactivation, revoking OAuth authorisations, logout) take effect immediately; requests needing human handling are answered and processed within 30 days of receipt. Contact: `privacy@epocanvas.com`.

If you believe the processing has harmed your rights, you may seek redress from the operator, which is responsible for explaining and substantiating the lawfulness of its processing. You may also complain to the competent authority at the operator's location or seek judicial remedies (applicable law in Section 12).

## 10. Security-Maintenance Measures

The operator establishes and continuously improves the following security-maintenance measures to prevent personal data from being stolen, altered, damaged, lost, or leaked: site-wide HTTPS/TLS transport encryption; PBKDF2 salted password hashing; AES-256-GCM encryption of TOTP secrets at rest; login-failure lockout (12 hours after 5 consecutive failures); at most 10 sessions per account, revocable immediately; HMAC-hash-based mail routing (against unauthorised access and resource enumeration); defensive headers and a MIME allow-list for attachment downloads. The complete list is in [Data Processing & Security Maintenance](/en/mail/data-security/).

:::caution[Scope and Limits of Encryption]
The encryption of the Service's "All / Private / Encrypted" mail modes is server-side encryption at rest: keys are derived from the instance server's environment variables and user identification. This mechanism protects against stolen database files or leaked snapshots; it is not end-to-end encryption, and an operator who holds the server and keys is technically able to decrypt. What administrators can reach depends on the mode: in "All-mail" mode the administrator can read all mail; in "Private" mode only spam, deleted, and unassigned mail; in "Encrypted" mode the admin interface does not return user mail. For confidentiality from the operator as well, encrypt the body yourself with GPG or a similar end-to-end tool before sending.
:::

## 11. Protection of Children and Juveniles

The Service is not directed at children under 14 and does not knowingly collect children's personal data. A guardian who believes a child has provided personal data may contact the operator for deletion, which is handled immediately after verification. No one may use the Service to distribute content harmful to the physical or mental health of children and juveniles; see the [Acceptable Use Policy](/en/mail/acceptable-use/) for restrictions. Self-hosted operators must set the age threshold according to their own jurisdiction's law.

## 12. Applicable Law and Supervision

The open-source code project provides no service and is not responsible for any instance's compliance; the legal obligations rest with the entity operating the service. The law applicable to each instance is that of its operator's location: the hosted instance `mail.epocanvas.com` is operated from Taiwan by the operations team, whose personal-data processing is subject to Taiwan's current law (including the Personal Data Protection Act), and the operator accepts inspection and supervision by that law's competent authority, with this policy and [Data Processing & Security Maintenance](/en/mail/data-security/) serving as the base documents for such inspection. For self-hosted instances, the applicable law is that of the deployer's location, and the deployer independently fulfils the notice, security-maintenance, and supervision obligations.

## 13. Changes to This Policy

This policy may be revised as the service or the law evolves. Material changes (new sub-processors, changed retention or encryption modes, and the like) will be announced in advance through an on-site notice or system mail, with the effective date and version number at the top of this page updated. Continuing to use the Service after a change takes effect means you accept the revised policy; if you disagree, stop using the Service and export or delete your data. Past material revisions are archived with the open-source repository's version history.

## 14. Contact Channels

- **Privacy matters, rights, and complaints**: `privacy@epocanvas.com`
- **In-product contact**: in-site message or `admin@epocanvas.com`
- **Self-hosted sites**: contact the operator published by that site

---

*This document is a compliance document prepared by the EpoCanvas Mail operations team and does not constitute legal advice; the law applicable to each instance is determined by its operator's location.*
