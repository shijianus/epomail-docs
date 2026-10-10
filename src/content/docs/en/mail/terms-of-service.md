---
title: Terms of Service
description: The EpoCanvas Mail Terms of Service — acceptance and review, account rules, your content, limitation of liability, governing law, and jurisdiction.
---

**Effective Date: October 5, 2026 | Version: 5.17**

These terms are the agreement between you and the operator of the instance you use concerning the use of the EpoCanvas Mail service (the "Service"). By completing registration, logging in, or otherwise using the Service, you confirm that you have read and agree to all of these terms; if you disagree, do not register or use the Service.

These terms are standard terms, published in full on the registration page for your review, with historical versions archived in the open-source repository. Your electronic consent has the same effect as a physical document and signature. Rights that applicable law does not allow to be excluded or limited by standard terms are unaffected by these terms.

The Traditional Chinese (Taiwan) versions of this site's legal documents are the authoritative versions; translations into other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version prevails. The legal and technical documents on this site follow the open-source implementation of the service and aim to establish transparent, rigorous, non-commercial community communication norms.

![EpoCanvas Mail contract lifecycle of the Terms of Service: electronic consent (agree by registering, same force as writing) → performance (account security, your content, liability limits) → revision (announced before material changes take effect) → termination (deactivation, data export and deletion), on the base of governing law and jurisdiction (the operator's location; Taiwan for the hosted instance)](/images/mail/en/tos-contract.svg)

*Figure: the contract's lifecycle from formation to termination. Electronic consent has the same force as writing; account, content, and liability terms are in Sections 3, 5, and 10; revision in Section 12; termination and data deletion in Section 8; governing law and jurisdiction in Section 11.*

## 1. Definitions

1. **The Service**: all functions running on an EpoCanvas Mail instance, including the web client, the mobile app (epomail), the open API, and related components.
2. **Operator**: the individual or team that deploys and runs the instance you use. For the hosted instance `mail.epocanvas.com`, the EpoCanvas operations team; for self-hosted instances, their deployers.
3. **You (data subject)**: the natural person or organization that registers, logs in, or otherwise uses the Service.
4. **Formation**: you enter into the agreement with the operator of the instance you register on. These terms are a common template: the hosted instance applies them directly; self-hosted operators may adapt them for their sites and must fulfil the notice obligations required by the law applicable at their location towards their users.

## 2. Description of the Service

The Service provides multi-mailbox management, on-site and off-site mail sending and receiving, attachments, labels and stars, spam quarantine, snooze reminders, search, AI translation (optional), automatic code extraction (optional), Telegram push (optional), two-step verification (TOTP / passkeys), an OAuth open platform, and data export; the functions actually available depend on what the instance enables.

The Service is built on an MIT-licensed open-source project and remains open source: the source code is public and auditable, and you may deploy it yourself to obtain the same capabilities. The software is provided "as is"; its license and these terms' liability provisions are consistent (see Section 10).

## 3. Accounts and Security

1. **Registration information**: registration requires a valid mailbox address and password. You must not impersonate another person or use a domain you have no right to use.
2. **Eligibility**: you confirm you are at least 14 years old; children under 14 may not use the Service. Age is taken on your honest declaration at registration; the Service has no separate age-verification mechanism, and where a declaration proves false the operator may terminate the account and delete its data. You must also ensure your registration and use comply with the law of your location.
3. **Credential custody**: you are responsible for safeguarding your password, two-step verification credentials, and API tokens. Operations performed with your credentials are presumed to be yours.
4. **Two-step verification**: enabling TOTP or a passkey is recommended. On instances using the "Encrypted" mail mode, the operator may require it under its security policy.
5. **Login protection**: 5 consecutive wrong passwords lock login for 12 hours; an account keeps at most 10 active sessions, and you can sign out on any device to revoke a token immediately.
6. **Registration restrictions**: identifiers such as `admin` are reserved; the operator may set the instance to require a registration key or close registration — this is instance administration.

## 4. Provision and Changes of the Service

1. **Availability**: the Service runs on Cloudflare's edge infrastructure. The operator makes reasonable efforts to maintain availability but does not promise a specific uptime, delivery time, or recovery deadline, and offers no service level agreement (SLA).
2. **Feature changes**: the open-source project keeps evolving; features may be added, adjusted, or removed. Material changes affecting data-deletion capability will be announced in advance.
3. **Experimental features**: features marked "experimental" or in testing (such as image text recognition and translation) are provided as-is, may be unstable, and may be changed or withdrawn at any time.
4. **Maintenance and interruption**: the operator may suspend part or all of the Service for upgrades, repairs, or abuse handling. Unavailability caused by Cloudflare or upstream AI or delivery providers is not a breach by the operator.

## 5. Your Content

1. **Ownership**: you own the mail you send and receive and its attachments, and are responsible for them. The operator does not use your content for advertising, model training, or assignment.
2. **Processing authorisation**: to provide storage, delivery, search, push, and (optional) translation, you authorise the operator to process technically, only to the extent necessary to run the Service; the authorisation ends when you stop using the Service and your data is deleted.
3. **Sending responsibility**: you are responsible for every mail you send; disputes and legal liability arising from the content you send are yours.
4. **Notice on content accessibility**: the operator does not in principle review your ordinary mail. In "All-mail" mode the administrator is technically able to read all mail (in "Private" mode only spam, deleted, and unassigned mail) and will act on reports or as required by law. Understand an instance's mode before choosing it; for stronger confidentiality see the encryption-scope note in Section 10 of the [Privacy Policy](/en/mail/privacy-policy/).

## 6. Outbound Delivery and Third-Party Services

1. **Outbound delivery**: mail addressed off-site is delivered through the operator's configured channel (Cloudflare Email Workers, Resend, or Mailjet). Third-party delivery may be delayed, bounced, or blocked by the recipient's provider; the operator does not guarantee delivery results.
2. **Third-party terms**: using Telegram push, AI translation, Linux DO sign-in, external S3 storage, and similar features also binds you to those third parties' terms.
3. **OAuth open platform**: if you authorise a third-party app through OAuth, its scope (openid / profile / email) and how to revoke it are in Section 7 of the [Privacy Policy](/en/mail/privacy-policy/); the app's use of the data follows its own terms.

## 7. Acceptable Use

Your use of the Service must comply with the [Acceptable Use Policy](/en/mail/acceptable-use/) in full, including the prohibitions on unlawful content, bulk spam, attacks on the system, and interference with others' use. Violations are handled under that policy's procedures, up to deletion of the account and all data, with evidence preserved as required by law and investigation.

## 8. Retention, Removal, and Account Termination

1. **You terminate**: you can deactivate your account yourself in Settings at any time, or ask the operator to delete it. After deactivation, sessions end immediately and mail enters a soft-deleted state; unless retention is required by law, an administrator performs the hard deletion within 90 days.
2. **Routine cleanup**: spam is quarantined 7 days and then moved to trash; trash mail is hard-deleted (attachments included) 7 days after receipt. Deletion is irreversible; first obtain a JSON copy through "Data Export".
3. **Operator termination**: if you violate the [Acceptable Use Policy](/en/mail/acceptable-use/), the operator may suspend or terminate your use under that policy.
4. **Statutory retention**: where retention is required by law or judicial process, the operator may postpone deletion within the necessary scope and process according to due legal procedure.

## 9. Notice of Enforcement and Remedies

Before suspending or terminating your use under "Acceptable Use" or the previous section, the operator — except in urgent situations (an ongoing attack, transmission of unlawful content) — will notify you and give you a chance to explain or correct. If you believe a measure was mistaken, appeal under the "Appeals and reports" chapter of the [Acceptable Use Policy](/en/mail/acceptable-use/); the operator will review and answer within a reasonable period.

Notices under these terms made electronically are deemed delivered when the document enters the recipient's or its designated information system. The e-mail address you gave at registration is the place of electronic notice, and you should keep it able to receive mail.

## 10. Disclaimers and Limitation of Liability

1. **As-is provision**: the Service (including its software) is provided "as is" and "as available", without any express or implied warranty, including merchantability, fitness for a particular purpose, and non-infringement; this matches the disclaimer scope of the software's MIT license.
2. **Effect boundary**: where the previous item, or any other term reducing the operator's liability, increasing yours, or limiting your rights, is grossly unfair in its circumstances or not permitted by applicable law, that part does not take effect.
3. **Liability cap**: to the maximum extent the law allows, the operator's cumulative liability to you is limited to the higher of what you actually paid the operator in the past 12 months (usually zero on a free instance) and USD 100. The operator is not liable for indirect damage, loss of data, lost profit, or harm to reputation. Back up important mail yourself.
4. **Statutory liability is not limited**: liability that applicable law does not allow to be excluded or limited by agreement (including liability arising from the operator's breach of its personal-data protection duties) is not exempted or capped by the previous item.
5. **Force majeure**: for service interruption or data loss caused by natural disasters, war, government action, backbone network failure, large-scale network attacks, or third-party providers' shutdown, the operator is not liable provided it has made reasonable efforts.

## 11. Governing Law, Jurisdiction, and Administrative Supervision

1. These terms are interpreted, and their validity and performance determined, under the law of the operator's location: Taiwan law for the hosted instance `mail.epocanvas.com`; the deployer's location's law for self-hosted instances.
2. Disputes under these terms are first resolved by negotiation; failing that, for the hosted instance the Taipei District Court of Taiwan is the court of first instance, and for self-hosted instances the jurisdiction the operator publishes applies. Mandatory jurisdictional rules of the law prevail.
3. The hosted instance's personal-data processing is subject to Taiwan law, and the operator accepts inspection and supervision by the competent authority and establishes and continuously improves personal-data file security-maintenance measures (see [Data Processing & Security Maintenance](/en/mail/data-security/)).

## 12. Revision of the Terms

These terms may be revised as the service evolves. Material changes will be announced through an on-site notice or system mail, with the effective date and version number at the top of this page updated. Continuing to use the Service after a change takes effect means you accept the revised terms; if you disagree, stop using the Service and export or delete your data. Material revisions are archived with the open-source repository's version history; revised terms are published for review before taking effect in the manner described above.

## 13. Contact

- **Hosted instance (`mail.epocanvas.com`)**: in-site message or `admin@epocanvas.com`; privacy and appeals `privacy@epocanvas.com`
- **Open-source project**: GitHub repository Issues (`github.com/shijianus/epomail`)
- **Self-hosted sites**: contact the operator published by that site

---

*These terms, the [Privacy Policy](/en/mail/privacy-policy/), and the [Acceptable Use Policy](/en/mail/acceptable-use/) together form the complete agreement between you and the operator; the order of precedence among the documents is in the [Privacy & Terms Overview](/en/mail/overview/). This document is a common template prepared by the open-source community and is not legal advice; operators should consult a lawyer and adapt it to their actual business before formal operation.*
