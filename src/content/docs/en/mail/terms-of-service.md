---
title: Terms of Service
description: EpoCanvas Mail Terms of Service—acceptance and review of the terms, account rules, user content, limitations of liability, and governing law and jurisdiction, made under the law of the Republic of China.
---

# Terms of Service

**Effective date: September 29, 2026 | Version: 4.1**

These Terms are the agreement between you and the Operator of the instance you use concerning the use of the EpoCanvas Mail service (the "Service"). By completing registration, logging in, or otherwise using the Service, you represent that you have read and agree to the entirety of these Terms; if you do not agree, do not register for or use the Service.

These Terms are standard-form contract terms. Under Article 11-1 of the Consumer Protection Act, before a business operator concludes a standard-form contract with a consumer, the consumer must be given a reasonable period of not more than 30 days to review the entirety of the terms; the full text of these Terms is publicly available on the registration page, and historical versions are archived with the open source repository. The interpretation of these Terms is also subject to Article 247-1 of the Civil Code: where an agreement under standard terms prepared by one party for use in contracts of the same kind is, in the circumstances, obviously unfair, that part of the agreement is invalid. Under Article 4 of the Electronic Signatures Act, your consent given electronically is functionally equivalent to a physical document and signature, and its legal effect may not be denied merely because it is in electronic form.

The Traditional Chinese (Taiwan) versions of the legal documents on this site are the authoritative versions; translations in other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version shall prevail.

## 1. Definitions

1. **The Service**: all functionality running on an EpoCanvas Mail instance, including the web client, the mobile app (epomail), the open API, and related components.
2. **Operator**: the individual or team that deploys and runs the instance you use. For the hosted instance `mail.epocanvas.com`, this means the EpoCanvas operations team; for a self-hosted instance, it means its deployer.
3. **You (the party)**: the natural person or organization that registers, logs in, or otherwise uses the Service.
4. **Formation of the contract**: the contract is formed with the Operator of the instance at which you register. These Terms are a common template: the hosted instance applies them directly; a self-hosting Operator may adapt them as its site terms, and shall fulfill the notification obligation toward its users under Article 8 of the Personal Data Protection Act (PDPA).

## 2. Description of the Service

The Service provides multiple mailbox management, sending and receiving email on and off the site, attachments, labels and stars, spam quarantine, snooze reminders, search, AI translation (optional), automatic extraction of verification codes (optional), Telegram push notifications (optional), two-step verification (TOTP or passkeys), an OAuth open platform, and data export; the functionality actually available is determined by what the instance has enabled.

The Service is built on an open source project under the MIT License and remains open source: the source code is public and auditable, and you may deploy it yourself to obtain equivalent capability. The software itself is provided "as is"; its license terms are consistent with the provisions on liability in these Terms (see Section 10).

## 3. Account Application and Security

1. **Registration information**: registration requires a valid receiving email address and a password. You must not impersonate another person, nor use a domain you are not authorized to use.
2. **Eligibility**: you confirm that you are at least 14 years of age; persons under 14 may not use the Service. You must also ensure that your registration and use comply with the laws of your place of residence.
3. **Credential safekeeping**: you are responsible for safeguarding your password, two-step verification credentials, and API tokens. Operations performed with your credentials are presumed to be your own acts.
4. **Two-step verification**: TOTP or passkeys are recommended. For instances using the "encrypted mail" mode, the Operator may make activation mandatory under its security policy.
5. **Login protection**: 5 consecutive password failures lock login for 12 hours; an account maintains at most 10 active sessions, and you may log out on any device to revoke tokens immediately.
6. **Registration restrictions**: identifiers such as `admin` are reserved by the system; the Operator may configure the instance to require a registration key or to close registration, which falls within the instance's administrative authority.

## 4. Provision and Changes of the Service

1. **Availability**: the Service runs on Cloudflare edge infrastructure; the Operator makes reasonable efforts to maintain availability but does not commit to specific availability rates, delivery times, or recovery deadlines, and does not provide a service level agreement (SLA).
2. **Feature changes**: the open source project evolves continuously, and features may be added, adjusted, or removed; material changes involving the ability to delete data will be announced in advance.
3. **Experimental features**: features marked "experimental" or in testing (such as image text recognition and translation) are provided as is, may be unstable, and may be adjusted or taken offline at any time.
4. **Maintenance and interruptions**: the Operator may suspend part or all of the Service for upgrades, repairs, or abuse handling; unavailability caused by failures of Cloudflare or of upstream AI or delivery providers does not constitute a breach by the Operator.

## 5. Your Content

1. **Ownership**: ownership of and responsibility for the email you send and receive and its attachments rest with you. The Operator does not use your content for advertising, for model training, or for transfer to others.
2. **License to process**: to provide storage, delivery, search, push notification, and (optional) translation functions, you authorize the Operator to perform technical processing only to the extent necessary for operating the Service; the authorization terminates when you stop using the Service and your data has been deleted.
3. **Responsibility for sending**: you are responsible for every email you send; disputes and legal liability arising from the content you send are borne by you.
4. **Notice on content accessibility**: the Operator does not, as a rule, review your normal email. In "all mail" mode, however, an administrator can technically read all email (in "private" mode, only spam, deleted, and unowned email), and will act upon reports or as required by law. Before choosing an instance, you should understand its operating mode; if you have confidentiality requirements, see the explanation of the scope of encryption in Section 10 of the [Privacy Policy](/en/mail/privacy-policy/).

## 6. Outbound Delivery and Third-Party Services

1. **Outbound delivery**: email sent off-site is delivered through the channels configured by the Operator (Cloudflare Email Workers, Resend, or Mailjet). Third-party delivery may be delayed, bounced, or intercepted by the recipient's provider, and the Operator gives no assurance of delivery results.
2. **Third-party terms**: when you use Telegram push, AI translation, Linux DO login, external S3 storage, and similar functions, you are also bound by the terms of those third-party services.
3. **OAuth open platform**: where you authorize third-party apps through OAuth, the scope of authorization (openid / profile / email) and the method of revocation are described in Section 9 of the [Privacy Policy](/en/mail/privacy-policy/); the third-party apps' use of data is governed by their own terms.

## 7. Acceptable Use

Your use of the Service is subject to all of the provisions of the [Acceptable Use Policy](/en/mail/acceptable-use/), including the prohibitions on transmitting unlawful content, sending bulk unsolicited email, attacking the system, or interfering with others' use. Where violated, the Operator may take measures under the procedures set out in that Policy, up to deletion of the account and all data, and will preserve evidence according to law and cooperate with investigations by competent authorities.

## 8. Data Retention, Removal, and Account Termination

1. **Termination by you**: you may cancel your account at any time through self-service in the settings, or request that the Operator delete it. After cancellation, sessions become invalid immediately; email enters a soft-deleted state until an administrator performs physical deletion.
2. **Routine system cleanup**: spam is quarantined for 7 days and then moved to the trash; trash email is physically deleted by the system 7 days after receipt (including attachments). Deletion is irreversible; obtain a JSON copy through "Data Export" first.
3. **Termination by the Operator**: where you violate the [Acceptable Use Policy](/en/mail/acceptable-use/), the Operator may suspend or terminate your use in accordance with that Policy.
4. **Statutory retention**: where retention is required by law or judicial proceedings, the Operator may defer deletion to the extent necessary and process it according to statutory procedures.

## 9. Notice of and Remedy for Enforcement Actions

Before suspending or terminating your use under "Acceptable Use" or the preceding section, the Operator shall notify you and give you an opportunity to explain or remedy the matter, except in urgent circumstances (such as an ongoing attack or the transmission of unlawful content). If you believe the action was mistaken, you may appeal under the procedure in the "Appeals and Reports" section of the [Acceptable Use Policy](/en/mail/acceptable-use/), and the Operator shall review and respond within a reasonable period.

Notices under these Terms given as electronic documents are governed, as to the time of sending and receipt, by Article 9 of the Electronic Signatures Act: where the recipient has designated an information system to receive electronic documents, the time of receipt is the time the document enters that system; where no system has been designated, it is the time the document enters the recipient's information system. The email address you provide at registration is the place of service for electronic notices, and you should keep it able to receive mail.

## 10. Disclaimers and Limitation of Liability

1. **Provided as is**: the Service (including its software) is provided "as is" and "as available", without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement; this is consistent with the disclaimer scope of the MIT License under which the software is released.
2. **Limits of validity**: the foregoing and any other terms exempting or reducing the Operator's liability, increasing your liability, or restricting your rights are subject to the regulation of standard-form contracts under Article 247-1 of the Civil Code and Article 17 of the Consumer Protection Act; where a term is, in the circumstances, obviously unfair, or contravenes the mandatory or prohibited provisions announced by the competent authority, that part is invalid.
3. **Limitation of liability**: to the maximum extent permitted by law, the Operator's aggregate liability to you is limited to the greater of the fees you actually paid to the Operator in the past 12 months (usually zero for a free instance) and USD 100. The Operator is not liable for indirect damages, loss of data, loss of business, or damage to goodwill. You should back up important email independently.
4. **Personal data damages are not capped**: damages for infringement of your rights caused by the Operator's violation of the Personal Data Protection Act are governed by Article 29 of that Act—a non-governmental agency bears no liability only if it can prove the absence of intent or negligence; this statutory liability is not waived or limited by the liability cap in the preceding item.
5. **Force majeure**: for service interruptions and data loss caused by natural disasters, war, acts of government, backbone network failures, large-scale cyberattacks, or the cessation of service by third-party providers, the Operator is not liable, provided it has made reasonable efforts.

## 11. Governing Law, Jurisdiction, and Administrative Supervision

1. These Terms are interpreted, and their validity and performance determined, under the law of the Republic of China.
2. Disputes arising from these Terms shall first be resolved through negotiation; if negotiation fails, the parties agree that the Taiwan Taipei District Court shall be the court of first-instance jurisdiction. Where the law provides otherwise for compulsory jurisdiction, that provision governs.
3. Under Article 1-1 and Article 22 of the PDPA, the Operator accepts inspection and audit by the competent authority (the Personal Data Protection Commission) and may not evade, obstruct, or refuse without legitimate reason; and under Article 20-1 of the same Act and Article 12 of the Enforcement Rules of the Personal Data Protection Act, it establishes and continuously improves its security maintenance plan for personal data files.

## 12. Changes to These Terms

These Terms may be revised as the Service evolves. Material changes will be announced by in-site notice or system email, and the effective date and version number at the top of this page will be updated. If you continue to use the Service after a change takes effect, you are deemed to have accepted the revised Terms; if you do not agree, you should stop using the Service and export or delete your data. Historical versions of material revisions are archived with the version history of the open source repository. Under Article 11-1 of the Consumer Protection Act, revised terms are made publicly available for review in the manner described above before taking effect.

## 13. Contact

- **Hosted instance (`mail.epocanvas.com`)**: in-app messages or `admin@epocanvas.com`; for privacy and complaints, `privacy@epocanvas.com`
- **Open source project**: GitHub repository Issues (`github.com/shijianus/epomail`)
- **Self-hosted sites**: contact the Operator of that site

---

*These Terms, the [Privacy Policy](/en/mail/privacy-policy/), and the [Acceptable Use Policy](/en/mail/acceptable-use/) together constitute the complete agreement between you and the Operator; the order of application among the documents is set out in the [Privacy and Terms Overview](/en/mail/overview/). This document is a common template prepared by the open source community and does not constitute legal advice; before commencing formal operation, the Operator should consult a lawyer and adapt it to its actual business.*
