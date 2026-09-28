---
title: Privacy Policy
description: EpoCanvas Mail Privacy Policy—the notifications, legal bases for collection, processing, and use, data subject rights, international transfers, and security maintenance measures under the Taiwan Personal Data Protection Act.
---

# Privacy Policy

**Effective date: September 29, 2026 | Version: 4.1**

This Policy is drawn up under the notification obligation in Article 8 of the Taiwan Personal Data Protection Act (個人資料保護法, "PDPA") and explains how the EpoCanvas Mail service (the "Service") collects, processes, uses, and transmits your personal data. You should read this Policy before registering for or using the Service; if you do not agree to any part of this Policy, do not use the Service.

The statutory provisions cited in this Policy refer to the versions currently in force as published in the National Laws and Regulations Database (law.moj.gov.tw). The Traditional Chinese (Taiwan) versions of the legal documents on this site are the authoritative versions; translations in other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version shall prevail.

![EpoCanvas Mail Privacy Policy five pillars: collection, use, transfer, security, and data subject rights, anchored respectively in Articles 19, 20, 21, 20-1, and 3 of the Personal Data Protection Act, all standing on the base of the inspection obligation](/images/mail/privacy-pillars.svg)

*Figure: The five main axes of this Policy and the corresponding provisions of the Personal Data Protection Act. Collection and use are limited to the extent necessary for the specific purpose (Articles 19 and 20); international transfers follow the restriction orders of the competent authority (Article 21); security maintenance is implemented under Article 20-1; data subject rights are exercised under Article 3; all five rest on the inspection obligation in Article 22.*

## 1. Scope

This Policy applies to the personal data arising from any use of the Service by you, including:

1. visiting the Service's website (`mail.epocanvas.com`, or the domain of a self-hosted instance);
2. using the mobile app (epomail);
3. connecting to the Service through the open API.

This Policy does not apply to third-party websites and services linked to or embedded in the Service; those third parties have their own privacy policies, for which they are responsible.

An operator that self-hosts EpoCanvas Mail becomes the data controller for its users from the moment of deployment and must itself fulfill the notification obligation under the PDPA toward its users; this Policy may serve as the base text for that notification.

## 2. Data Controllers and Entrusted Processors

| The instance you use | Data controller | Description |
| --- | --- | --- |
| Hosted instance `mail.epocanvas.com` | The EpoCanvas operations team | With respect to account data, authentication records, and security audit logs, the operations team is the data controller; with respect to the content of the email you send and receive, the operations team processes it to the extent necessary for providing the communication service |
| Self-hosted instance | The deployer of that instance | The deployer becomes the data controller from the moment of deployment and independently bears all obligations under the PDPA; the open source code contains no telemetry and does not send instance data back to the upstream authors or any third party |

Entrusted processors process data on the instructions of the controller; see the [Third-Party Processor List](/en/mail/sub-processors/) for the complete list.

## 3. Notification at Collection

Under Article 8, Paragraph 1, of the PDPA, the Service expressly notifies you of the following when it collects personal data from you:

| Statutory notification item | What the Service notifies |
| --- | --- |
| 1. The identity of the collector | The Operator (see Section 2; for a self-hosted instance, its deployer) |
| 2. The purposes of collection | Providing the email communication service; account and information security management; prevention of abuse and fraud; delivery of system announcements; compliance with legal obligations (see the processing-activity mapping table in Section 5) |
| 3. The categories of personal data concerned | Identification data (email address, username); account security data (password hash, two-step verification credentials); interface preference data (language, light and dark modes); network activity data (email records, labels, stars, read status); and any other data by which a person may be identified directly or indirectly (login IP, and the operating system, browser, and device type parsed from the User-Agent)—see Section 4 |
| 4. The period, region, recipients, and means of use | Period: for the life of the account, with fixed retention periods for some items (see the processing matrix in [Data Processing and Security Maintenance](/en/mail/data-security/)); Region: the Service is built on the Cloudflare global edge network, and data may be processed at any edge node worldwide (see Section 7); Recipients: the Operator and its entrusted processors, third-party apps you authorize, and authorities empowered by law (see Section 7); Means: automated storage, transmission, retrieval, push delivery, and edge inference, with no manual review except as required by law or judicial proceedings |
| 5. The rights exercisable by the data subject and how to exercise them | The rights of query and inspection, of obtaining a copy, of supplementation and correction, of cessation of collection, processing, and use, and of deletion under Article 3 of the PDPA; see Section 9 for how to exercise them |
| 6. The consequences of not providing the personal data | The email address and password are required for registration and login; without them an account cannot be created. All other fields (nickname, avatar, bio, and similar) are optional, and not providing them does not affect use of the Service |

When you sign in with a Linux DO account, the Service obtains identifiers such as your user ID, nickname, and avatar from that identity source; this constitutes the collection of personal data not provided directly by you. Under Article 9 of the PDPA, the Operator informs you, before processing or using such data, that the source is the Linux DO account you use to sign in, and that the period, region, recipients, and means of use, and the rights you may exercise and how, are as notified in items 2 through 5 of the table above. The Service collects no other personal data from sources other than you.

## 4. Personal Data Collected

### 4.1 Provided by you

- **Email address and password**: required for registration. The password is stored only as a PBKDF2-HMAC-SHA256 hash (100,000 iterations, with a per-user independent random salt); the original password cannot be recovered from the hash.
- **Two-step verification credentials (optional)**: the TOTP secret is stored encrypted with AES-256-GCM; backup recovery codes are stored only as SHA-256 hashes; passkeys store only the public key, while the private key remains on your device.
- **Profile data (optional)**: nickname, avatar, and bio; avatars are uploaded to the image storage service configured by the Operator.

### 4.2 Your communications

The email you send and receive (including metadata such as sender and recipient, subject, body, and timestamps) and its attachments, together with the labels, stars, read status, and snooze reminders you apply, are stored in the instance's database (Cloudflare D1) and object storage (Cloudflare R2 or an S3-compatible store configured by the Operator). Ownership of and responsibility for email content rest with you; the Operator does not sell email content, does not use it for advertising purposes, and does not integrate any third-party analytics tracking.

### 4.3 Automatically recorded technical data

- **Login and security logs**: the IP address, browser User-Agent, and the operating system, browser, and device type parsed from it, recorded at registration and login, used for information security auditing and the identification of anomalous logins.
- **Session tokens**: the JWT issued after login (valid for 30 days) is stored in your browser's localStorage. The Service does not use cookies, and there is no cross-site tracking.
- **Edge network logs**: Cloudflare processes request metadata under its own policies.

### 4.4 Data the Service does not collect

The Service contains no advertising tracking SDK, no behavioral profiling, no cross-site cookies, and no Google Analytics or any third-party analytics; nor does it read your device's contacts, photo library, location, or data from other apps.

### 4.5 Sensitive personal data

Under Article 6 of the PDPA, personal data concerning medical history, medical treatment, genetic information, sexual life, health examinations, and criminal records may not be collected, processed, or used except in the circumstances prescribed by law. The account and system fields of the Service do not collect sensitive personal data. Content you transmit yourself via email may nevertheless contain such data; the Operator passively stores and transmits it only to the extent necessary for providing the communication service and does not analyze or profile the content. You should decide carefully whether to transmit sensitive personal data in email.

## 5. Legal Bases for Collection, Processing, and Use

Under Article 19 of the PDPA, a non-governmental agency may collect or process personal data only for a specific purpose and only in one of the circumstances listed in Paragraph 1 of that Article. The legal basis for each of the Service's processing activities is as follows:

| Processing activity | Specific purpose | Legal basis |
| --- | --- | --- |
| Account registration, login, and mailbox management | Providing the email service | Article 19, Paragraph 1, Subparagraph 2 (a contractual or similar contractual relationship with the data subject, and appropriate security measures have been taken) |
| Login logs, lockout on failure, and two-step verification | Information security maintenance | Article 19, Paragraph 1, Subparagraph 2, in accordance with the proportionality principle in Article 5 |
| Automatic extraction of verification codes (optional, enabled by the Operator) | Improving service convenience | Article 19, Paragraph 1, Subparagraph 5 (with the data subject's consent; you may request that it be turned off, or switch to an instance where the feature is not enabled) |
| Email translation and image text recognition (triggered by you) | Content assistance | Article 19, Paragraph 1, Subparagraph 5 (with the data subject's consent; nothing is transmitted unless you trigger it) |
| Public profile page (off by default) | Social presentation | Article 19, Paragraph 1, Subparagraph 3 (personal data made public by the data subject or otherwise lawfully made public) |
| System announcements and the official welcome email | Contract performance and user communication | Article 19, Paragraph 1, Subparagraph 2 |

Under Article 20 of the PDPA, personal data may be used only within the extent necessary for the specific purpose of collection; use beyond that purpose is permissible only in the circumstances listed in Paragraph 1 of that Article (express provision of law, advancement of the public interest, the data subject's consent, and so on). The Service does not use your personal data for automated decision-making, user profiling, or any commercial purpose unrelated to providing the Service. Where the Operator markets with personal data, then under Paragraph 2 of the same Article, once you indicate refusal to accept marketing the Operator shall cease such use immediately; and under Paragraph 3, at the time of the first marketing the Operator shall provide you with the means to refuse and bear the costs required to do so.

## 6. Special Notice on AI Processing

The Service involves three types of AI processing; their trigger conditions and the scope of data involved are as follows:

1. **Automatic extraction of verification codes** (optional, enabled by the Operator): when a new email arrives, the system sends the subject and the first 6,000 characters of the body to Cloudflare Workers AI for inference at edge nodes to extract verification codes from the email. This is the only AI processing not triggered manually by you; if you do not want this processing, you may ask the Operator to turn off the feature, or switch to an instance where the feature is not enabled.
2. **Email translation** (triggered by you): after you click "Translate", the email text is sent in chunks to the large model endpoint configured by the instance (OpenAI-compatible protocol by default), with the public APIs of MyMemory and Google Translate as fallback. If you do not trigger translation, the email content is not transmitted to any AI service.
3. **Image text recognition** (triggered by you): an image containing text is sent to the AI services described above only when you upload it; purely decorative images, logos, and icons are skipped automatically.

The Operator does not train any model on email content, nor does it send identity information to AI services beyond the text needed for translation or recognition. Under Article 8, Subparagraph 6, of the PDPA and Article 19, Paragraph 1, Subparagraph 5, you may withdraw consent to the consent-based processing described above at any time by the means listed in Section 9; withdrawal does not affect processing carried out before the withdrawal.

## 7. Sharing with Third Parties and International Transfers

The Service shares personal data with third parties on the principle of minimal necessity, in the following circumstances only (see the [Third-Party Processor List](/en/mail/sub-processors/) for the complete list and safeguards):

1. **Entrusted processing**: Cloudflare (computing, storage, email routing, bot verification, edge AI) and Resend or Mailjet (outbound delivery; only email sent off-site involves the full email);
2. **With your authorization**: Telegram notifications (only the fields you configure are pushed), OAuth third-party apps (scope limited to openid / profile / email, revocable at any time), and Linux DO login;
3. **Triggered by you**: AI translation and image text recognition services (see Section 6);
4. **Legal requirements**: provided only when a competent authority so requires through statutory procedures, with notice to you to the extent permitted by law.

Under Article 21 of the PDPA, the competent authority may restrict a non-governmental agency's international transfer of personal data where it involves major national interests, where a treaty or agreement provides otherwise, where the legal regime protecting personal data in the recipient country is inadequate such that the rights of the data subject may be harmed, or where the transfer circumvents the Act by circuitous transmission to a third country. The Service is built on the Cloudflare global edge network, and your personal data may be processed at nodes outside the country where the Operator is located; the Operator complies with restriction orders issued by the competent authority under that Article and relies on Cloudflare's data protection measures (SOC 2 Type II and ISO/IEC 27001 certifications, and the EU Standard Contractual Clauses (SCC) mechanism) to safeguard transfers. Operators of self-hosted instances shall themselves assess and ensure that their international transfers comply with the same Article.

## 8. Data Retention Periods and Destruction

| Data category | Retention policy |
| --- | --- |
| Inbox email | Retained until you delete it, or until quota cleanup is triggered |
| Spam | Quarantined for 7 days and then moved to the trash |
| Trash email | Physically deleted by a system routine job 7 days after receipt (including attachments and indexes) |
| Mailbox usage above 90% | The system physically deletes email already marked as deleted to free space |
| Account cancellation | Sessions become invalid immediately; email enters a soft-deleted state until an administrator performs physical deletion |
| Physical deletion | Account data, mailboxes, email, attachments, OAuth authorizations, and sessions are removed together and cannot be recovered |
| Instance shutdown | The Operator shall give advance notice and provide a data export window; after shutdown, data is destroyed together with the Cloudflare resources |

Data cannot be recovered after physical deletion. Before deletion, you may obtain a complete copy in JSON format (including profile data and the full text of email not yet deleted) through "Settings → Data Export". For a complete description of the technical measures, see [Data Processing and Security Maintenance](/en/mail/data-security/).

## 9. Data Subject Rights and How to Exercise Them

Under Article 3 of the PDPA, you have the following rights with respect to your personal data, and these rights may not be waived in advance or restricted by special agreement:

1. to query or request inspection;
2. to request a copy (implemented by the Service through the "Data Export" feature);
3. to request supplementation or correction;
4. to request the cessation of collection, processing, or use;
5. to request deletion.

How to exercise them: self-service functions in the interface (export, account cancellation, revocation of OAuth authorization, and logout) take effect immediately; for requests requiring manual handling, the Operator responds and processes them within 30 days of receipt. Contact: `privacy@epocanvas.com`.

If you believe that the Operator's violation of the PDPA has caused damage to your rights, you may claim damages under Article 29, Paragraph 1, of the Act; the Operator is liable unless it proves the absence of intent or negligence, and bears the burden of that proof. Under Paragraph 2 of that Article, as applied through Article 28, Paragraphs 2 to 6: where a victim has difficulty proving the actual amount of damage, the court may determine compensation per person per event between NT$500 and NT$20,000 according to the circumstances of the violation; for a single cause of fact affecting the rights of multiple data subjects, aggregate compensation is capped at NT$200 million, or at the amount of the benefit obtained where that benefit exceeds NT$200 million. You may also file a complaint with the competent authority. Where the Operator, with the intent of securing an unlawful benefit for itself or a third party or of harming another person, collects, processes, or uses personal data in violation of Article 19 or Article 20, Paragraph 1, causing harm to another person, the conduct additionally attracts criminal liability under Article 41 of the Act.

## 10. Security Maintenance Measures

Under Article 20-1 of the PDPA, a non-governmental agency that maintains personal data files shall implement security maintenance measures to prevent personal data from being stolen, altered, damaged, lost, or leaked. The Operator establishes and continuously improves security maintenance measures following the items listed in Article 12 of the Enforcement Rules of the Personal Data Protection Act, including: site-wide HTTPS/TLS encryption in transit; PBKDF2 salted hashing of passwords; AES-256-GCM encryption at rest for TOTP secrets; lockout on failed logins (a 12-hour lockout after 5 consecutive failures); a session cap of 10 with immediate revocation; email routing based on cryptographic hashes (to prevent unauthorized access and resource enumeration); and defensive headers and a MIME allowlist for attachment downloads. For the complete list, mapped item by item to the Enforcement Rules, see [Data Processing and Security Maintenance](/en/mail/data-security/).

:::caution[Scope and Limits of Encryption]
The encryption of the Service's three email modes—"all", "private", and "encrypted"—is server-side encryption at rest: keys are derived from the instance server's environment variables and the user's identity. This mechanism protects against the risk of database files being stolen or snapshots leaked; it is not end-to-end encryption, and an Operator holding the server and the keys technically has the ability to decrypt. The administrator's scope of access depends on the mode: in "all mail" mode the administrator can read all email; in "private" mode, only spam, deleted, and unowned email; in "encrypted" mode, the admin interface does not return user email. Where confidentiality against the Operator as well is required, encrypt the email body yourself with an end-to-end encryption tool such as GPG before sending it.
:::

## 11. Protection of Children and Youths

The Service is not directed at children under 14 years of age and does not knowingly collect children's personal data. A guardian who believes that a child has provided personal data may contact the Operator to request deletion; the request will be processed immediately after verification. Under Article 43 of the Act for the Protection of Children and Youths' Welfare and Rights, no person may distribute or broadcast to children and youths content harmful to their physical or mental health; for related restrictions on use, see the [Acceptable Use Policy](/en/mail/acceptable-use/). Operators of self-hosted instances shall set their own age threshold in accordance with the laws of their jurisdiction.

## 12. Administrative Supervision and Inspection Obligations

Under Article 1-1 of the PDPA, the competent authority for the Act is the Personal Data Protection Commission. Under Article 22 of the same Act, where the competent authority considers that a non-governmental agency may have violated the Act, or considers it necessary in order to review the agency's implementation of the Act, it may order the agency to state its position, require it to furnish necessary documents, data, or items, or—on its own or together with the central competent authority for the industry concerned, a special municipality government, or a county (city) government—send personnel carrying proof of their official duties to conduct an on-site inspection; the inspected party may not evade, obstruct, or refuse such notice, entry, inspection, or disposition without legitimate reason.

The Operator of the Service accepts inspection and audit by the competent authority under those provisions, and maintains security maintenance measures under Article 20-1 of the PDPA and Article 12 of the Enforcement Rules of the Personal Data Protection Act. This Policy and [Data Processing and Security Maintenance](/en/mail/data-security/) serve as the base documents for inspection. Under Article 25 of the same Act, for violations the competent authority may, in addition to imposing fines, order the cessation of collection, processing, or use, order the deletion of personal data files, confiscate or order the destruction of unlawfully collected personal data, or publicize the violation and the name or title of the responsible person; the Operator will comply with the contents of any such disposition.

## 13. Changes to This Policy

This Policy may be revised as the Service or the law changes. Material changes (such as adding a third-party processor, or changing retention policies or encryption modes) will be announced in advance by in-site notice or system email, and the effective date and version number at the top of this page will be updated. If you continue to use the Service after a change takes effect, you are deemed to have accepted the revised Policy; if you do not agree, you may stop using the Service and export or delete your data. Historical versions of material revisions are archived with the version history of the open source repository.

## 14. Contact Channels

- **Privacy matters, exercise of rights, and complaints**: `privacy@epocanvas.com`
- **In-product contact**: in-app messages or `admin@epocanvas.com`
- **Self-hosted sites**: contact the Operator of that site

---

*This document is a compliance document prepared by the EpoCanvas Mail operations team, written in accordance with the Personal Data Protection Act as currently in force and its related regulations; it does not constitute legal advice. Statutory citations refer to the versions currently in force as published in the National Laws and Regulations Database.*
