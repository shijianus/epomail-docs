---
title: Privacy Policy
description: Data sources, purposes and legal bases, AI and third-party transfers, retention limits, and rights where the GDPR applies to the non-profit test mailbox service.
---

**Updated: November 2, 2026 | Version: 5.21**


<!-- legal-review-draft -->
:::caution[Legal review draft: not the current notice]
This draft records proposed terms and matters still requiring verification. It does not replace the current live notice or certify compliance. It must not be used to enable processing before the operator identity and legally required contact information, actual legal bases, recipients and transfer safeguards, retention and deletion arrangements have been verified and the required notice provided. References to an authoritative version mean the Traditional Chinese drafting baseline, not entry into force. Existing statutory duties and user rights remain unaffected.
:::

This policy explains how an EpoCanvas Mail instance processes personal data, including the data of unregistered senders and recipients who communicate with users. It is a notice about data processing, not a contract asking you to give blanket consent to all processing. Reading it, continuing to use the service, or accepting the terms of service does not replace any consent that must be obtained separately under the law. You can make enquiries, object, or exercise your rights as described in Section 9.

The Traditional Chinese (Taiwan) version is this site's authoritative version; other languages are translations for reference. This arrangement cannot exclude understandable notice required by applicable law or the mandatory rights of consumers and data subjects. This document is based on the open-source implementation that has been checked; it does not establish that the live instance has enabled all security settings or obtained compliance certification.

![The privacy policy's five topics: data collection, use, transfer, security, and rights](/images/mail/en/privacy-pillars.svg)

*Figure: processing must have a specific purpose and a valid basis, transfers to third parties must have appropriate safeguards, and data subjects may exercise their rights and complain to a competent authority.*

## 1. Scope and Test Nature of the Service

This policy applies to the website, connected clients, API, accounts, and mail processing of the hosted instance at `mail.epocanvas.com`. This is an individually maintained, non-profit project for learning and testing. It does not sell data or provide advertising services or enterprise-level availability commitments; this status does not exempt it from personal data protection obligations that apply under the law.

Self-hosted operators must adapt and publish their notices to reflect their own identity, settings, recipients, and retention practices, and must not treat this page as proof of their compliance. Merely obtaining or modifying the source code does not give the upstream authors the data from their deployments.

## 2. Who Is Responsible for Your Data

| Usage context | Responsible party | Role and contact |
| --- | --- | --- |
| Hosted test instance | The actual natural person or organisation operating `mail.epocanvas.com` under the EpoCanvas name | The party determining the purposes and means of account, communication service, and security management is the data controller; `privacy@epocanvas.com` |
| Self-hosted instance | The actual operator of that instance | The role depends on who actually determines the purposes and means of processing; contact the channel published by that site |
| Authors and contributors who only publish source code | Those not involved in operating the particular instance | Authorship or contribution alone does not make them that instance's controller or processor |

EpoCanvas is a project name; this page does not establish that the operator is a company, foundation, or registered organisation. Before collecting personal data from the public, an instance must publish accessible operator information stating an identifiable personal or legal name, the actual country of location, and an appropriate contact address. Any physical address or contact details for an EU representative or data protection officer required by applicable law must also be provided. This page has not verified that full identity and address, nor confirmed that any EU representative or data protection officer has been appointed. An email contact does not replace identity information that must be made public under the law.

If the operator processes data on an organisational customer's instructions, the roles must be separately established and a data processing agreement compliant with applicable law must be concluded. A user's possession of mail content does not automatically make every user a controller and the operator a processor.

## 3. Data Sources, Necessity, and Uses

| Category and source | Data and uses | Consequences of not providing it |
| --- | --- | --- |
| Registration, login, or identity sources | Account identifiers, credentials needed to log in, and identifiers, nicknames, avatars, and related attributes returned by identity sources such as Linux DO | The selected login or registration method cannot be completed; required fields differ by method |
| You, your correspondents, and sending and receiving systems | Senders, recipients, CC recipients, subjects, bodies, attachments, times, and delivery and classification status | The relevant mail cannot be sent, received, stored, or organised |
| Automatically generated network and security records | IP addresses, User-Agent, device and login information, operations, and security events | Necessary authentication and security records cannot be disabled individually; you may choose to stop using the service and exercise your rights |
| Optional fields and features | Profile page fields, avatars, notification settings, external storage settings, and content for translation or recognition | The corresponding feature is unavailable; unrelated basic features must not be lost as a result |
| Responses from external services | Delivery reports, identity or level-linkage results, requests from applications you authorise, and notification responses | Processed only when the relevant configuration or operation is involved |

Personal data in mail may be supplied by other senders, recipients, administrators, or services you choose; its sources are not limited to your direct input or Linux DO. Unregistered correspondents can also use the contact channels in Section 14. Where notice of indirect collection is required by law, the operator must provide this policy and any necessary supplementary information; exceptions are available only where their statutory conditions are met.

Where the GDPR applies and data is obtained indirectly, the operator must provide this policy and supplementary information, including the source, within a reasonable period and no later than one month after obtaining it, unless a statutory exception applies. If the first communication with you or disclosure to another recipient occurs sooner, the information must be provided by that time. Merely making this page discoverable does not replace proactive notice. Any impossibility or disproportionate-effort exception must be assessed and documented, with appropriate safeguards including making necessary information publicly available. Where Taiwan's data protection law requires notice before processing or use, or allows it with the first use, that rule applies; being free, in testing, or unregistered is not itself an exemption.

## 4. Actual Scope of Storage and Access

### 4.1 Account and security data

Newly written password-verification records use salted PBKDF2-HMAC-SHA256 with a configurable default of 210,000 iterations. Legacy SHA-256 records or records with lower parameters may be upgraded during verification; there is no guarantee that all existing records have been migrated. TOTP secrets are stored encrypted. Recovery codes have verification hashes, and copies of the original codes are also stored encrypted with a key and can be displayed after reauthentication. Public credential data is stored for passkeys. These measures reduce risk; they do not guarantee that passwords can never be guessed. The TOTP setup flow may temporarily store an unencrypted setup secret in KV for 600 seconds. When a legacy password upgrade involves multi-factor authentication, the pending KV flow may temporarily store the entered password for 300 seconds, with possible renewal, so it cannot be claimed that no path stores plaintext credentials. Profile fields, login sources, operation records, and permission settings may also be stored in the instance's database or KV.

### 4.2 Mail and attachments

Mail data is primarily handled by Cloudflare D1 and the configured object storage. Depending on the user's or operator's configuration, attachments may be stored in S3-compatible storage or R2, or use KV when these are not configured. The inbound path that has been checked reads and parses raw MIME without separately persisting the complete original message; downloading an .eml file does not establish that the original file was retained. External backups, databases, and retention behaviour introduced by local modifications require separate confirmation. Actual data locations cannot be inferred from the source code alone.

The service does not provide end-to-end encryption. Depending on the code and settings, the "Encrypted" and "Private" modes apply server-side encryption at rest to some body and subject content. Attachments and routing metadata are not automatically covered by that protection, and a party with control of the server and keys may technically be able to decrypt the data.

### 4.3 Browsers, logs, and external requests

The browser may store login tokens, language settings, and interface preferences in localStorage. Logout, server-side revocation, and credential validity periods are separate mechanisms. After using a shared device, you should log out and clear local data that does not need to be retained.

Login security mechanisms also process IP-derived country and city information, network ASN, and device information. The known-environment list retains at most the 15 most recent entries with a sliding 180-day TTL; continued use may extend that period. IP-based associations across multiple accounts use a 7,200-second TTL. Trusted-device credentials may be retained for 60 days and may exempt users from some multi-factor authentication during the first 30 days. These periods are separate from retention of account fields or audit logs.

Cookie rules may also cover terminal storage or access such as localStorage. Where ePrivacy terminal-access rules apply, only access solely for transmitting a communication or strictly necessary to provide a service you explicitly request qualifies for the relevant prior-consent exception; a login or security label alone does not establish this. Other terminal access requires clear notice and valid consent before activation and must remain inactive until consent is obtained. Refusal must not disable unrelated basic functions. Withdrawal must be as easy as giving consent and must stop the corresponding access. Not using cookies does not remove these requirements.

Fonts, Turnstile, external images, and other configured resources may receive IP addresses, User-Agent, times, and request data. Loading remote images in mail may also reveal to the sender that the mail has been opened. Having no advertising or analytics SDK does not mean there are no third-party network requests. See the [Sub-processor List](/en/mail/sub-processors/) for the full data flows.

### 4.4 Administrative and debugging access

The administrative interface limits visibility according to mail mode, roles, and permissions; this is not a guarantee that the operator is technically incapable of accessing data. Human access is limited to specific support matters, security incidents, abuse reports, lawful requests, or other necessary matters with a valid basis, using least privilege and keeping appropriate records. Arbitrarily reading real mail for learning, testing, or curiosity is prohibited, as is posting it in public issues or debugging services.

Public profile pages are off by default. When enabled, anonymous visitors can obtain the primary mailbox, profile fields, role, join time, and mail activity and source statistics. Some "hide statistics" settings control only what is displayed and cannot be treated as API access restrictions; account soft deletion has also not been verified to close this public access path. To withdraw public access, you should also turn off the page and ask the operator to check anonymous access. Until this is corrected, do not use the feature to publish unnecessary real data.

### 4.5 Sensitive data and other people's data

Mail may contain special categories of data concerning health, race, religion, political opinions, trade unions, genetics, biometrics, sex life, or sexual orientation; criminal records are subject to separate restrictions. Merely describing processing as "passive storage" or obtaining the account user's general consent does not automatically satisfy the additional legal conditions. Testing should use synthetic or lawfully de-identified content. Handling regulated sensitive data is not currently a purpose of the service, and real data of this kind should not be uploaded before a lawful basis and safeguards have been established.

## 5. Processing Purposes and Legal Bases

Where the GDPR applies, the operator must identify an appropriate basis for each purpose; additional conditions under other applicable laws must still be met.

| Processing activity | Purpose | Basis and limits where the GDPR applies |
| --- | --- | --- |
| Accounts, delivery, storage, and necessary service notices | Providing the mailbox service you request | Necessary to perform the contract with you; data of correspondents who are not parties to that contract is processed separately on the basis of legitimate interests assessed through a balancing test or another appropriate basis |
| Login security, rate limiting, and prevention of specific abuse | Protecting users, communications, and infrastructure | Where necessary, legitimate interests assessed for necessity and through a balancing test; a legal obligation is used as the basis only where that obligation actually applies |
| Translation, OCR, optional notifications, or public fields | Providing additional features you actively choose | Clear, separate notice according to the feature and recipient; where consent is required, it must be freely given, specific, informed, unambiguous, and capable of being withdrawn |
| Automatic verification-code extraction | Helping identify verification codes | Convenience or an operator's feature switch does not automatically make it necessary for a contract; a valid basis, necessary safeguards, and any required individual choice must be established before enabling it |
| Responding to rights requests or competent authorities as required by law | Fulfilling legal requirements that actually apply | A clear legal obligation; foreign orders still require assessment of applicability, confidentiality of communications, and international transfer rules |
| Minimum necessary records for a specific dispute | Establishing, exercising, or defending legal claims | Legitimate interests assessed through a balancing test and applicable statutory retention, with limits on scope and duration |

Where legitimate interests are relied on, those interests are providing the requested communications, maintaining security, or defending specific claims. The operator must retain records of the necessity assessment and balancing test and allow objections as described in Section 9. All features must not be bundled together as "necessary to perform a contract". Selling data, serving advertisements, or training commercial models is not a processing purpose of the service.

Automated classification, rate limiting, or risk signals may affect mail processing and account features. This policy does not authorise decisions based solely on automated processing that have legal or similarly significant effects on you. If an actual deployment involves such decisions, the lawful conditions must first be established, the logic and effects explained, and appropriate human intervention and an appeal route provided.

## 6. AI and Optional Content Processing

The code that has been checked includes verification-code extraction on receipt of mail, as well as translation and image text recognition following your actions. The actual data may include subjects, body excerpts, images, and identifying or sensitive content within them; there is no guarantee that the text contains no personal data. An OpenAI-compatible protocol describes only the interface and does not mean that the recipient is necessarily OpenAI.

The site-wide switch for verification-code extraction is off by default in the version checked. Once enabled, it may automatically send the complete subject and up to 6,000 JavaScript characters of body text to Workers AI when new mail arrives; the subject does not count towards this limit. This is not always triggered by you pressing a button, and no per-user opt-out check was found. A site-wide switch is not equivalent to valid consent from each user. Where a valid basis, required choices, or a workable withdrawal mechanism is missing, the deployer must disable the corresponding external transfer. Asking users to move to another instance cannot replace freely withdrawing consent or establish that consent was previously obtained.

Text translation may use a configured model or Workers AI. Some flows send text excerpts to the public MyMemory or Google Translate interfaces, including through URL query parameters; fallback for missing excerpts is not limited to a failure of the entire endpoint. OCR may send embedded image bytes to Workers AI or a remote image URL to a configured external vision endpoint; the recognised text then enters the translation flow. Client-side OCR is off by default, but API calls that omit parameters may use different defaults, so the interface switch cannot establish that no path processes images.

For mail containing personal or confidential data, the relevant route must be disabled until the recipients, processing agreements, retention, and cross-border safeguards have been established. Clicking translate once is not blanket consent to undisclosed recipients or subsequent model training. Some images may be extracted during the translation workflow, not only images you upload separately.

The operator does not use mail as a dataset for training its own models. Restrictions on third-party retention, training, and reuse must be confirmed against the actual contracts and configuration; this policy does not guarantee them on the third parties' behalf. AI results may be wrong, and you should check verification codes, translations, and recognition outputs. The service does not use these features to provide professional judgments with legal effect. Where applicable, AI features and outputs must be clearly labelled, with necessary transparency notices provided according to the actual role and use. Ordinary translation or recognition does not automatically qualify as a high-risk system merely because it uses AI, nor does it thereby obtain compliance certification.

## 7. Recipients and International Transfers

Depending on the actual configuration, recipients include Cloudflare, outbound delivery services, storage and databases designated by you or the operator, identity sources, AI and translation services, notification platforms, authorised applications, and recipients' mail providers. Whether each party is a processor or an independent controller depends on its actual purposes and contracts; they cannot all be classified as processing only on instructions.

Use of Cloudflare's global network or non-EU providers does not guarantee that data is processed only within the European Economic Area. For cross-border transfers restricted by the GDPR, the actual locations and lawful mechanisms must first be established, such as an adequacy decision covering the relevant scope, or validly concluded Standard Contractual Clauses, a transfer impact assessment, and necessary supplementary measures. SOC 2 or ISO certification, TLS, or a provider's statement that it offers SCCs does not by itself establish that a particular transfer is lawful. Derogations or explicit consent should not serve as the usual substitute for repeated, structural transfers.

You may request a summary of the recipients, locations, and safeguards relevant to your data through the contact channels in Section 14, and obtain safeguard documents where they may lawfully be provided, subject to necessary redactions. For requests from competent authorities, the operator verifies the authority and legal basis, limits the scope of disclosure, and notifies affected people where the law allows and doing so does not prejudice a lawful purpose.

## 8. Retention, Deactivation, and Deletion

| Data category | Actual mechanisms and retention criteria |
| --- | --- |
| Accounts, personal settings, and ordinary mail | Retained to provide the service until deletion, account cleanup, or the end of a lawful need; deactivation does not mean physical erasure |
| Spam and trash | Daily processing counts from the mail's `create_time`; spam moves to trash after the configured retention period, which defaults to 7 days, and the trash threshold is fixed at 7 days, so mail may qualify for physical deletion in the same run; there is no guaranteed additional 7-day buffer after moving it to trash |
| Expired system mail and quota cleanup | Some official mail is marked deleted when the list is read, based on its expiry period, which defaults to 7 days, and is then handled by scheduled tasks; mail may be physically deleted directly if usage already exceeds 90% of quota when deletion is performed |
| Account closure or deactivation | Self-service actions restrict access and change the data's state; no mechanism has been verified that automatically clears all data 90 days after account closure, and deletion requests must be separately tracked to completion |
| Security, login, audit, and rights-request records | Retained only for as long as necessary for the specific purpose; for items without a general automatic expiry mechanism, the operator must separately set and implement the shortest necessary retention period and regular reviews |
| Attachments, raw mail, backups, and external copies | Deletion from each storage and backup system must be confirmed separately; deletion in the interface must not be treated as simultaneous erasure of all copies, and the instance provides supplementary notice of specific cycles |
| Statutory retention or specific disputes | Where there is an actual legal basis, retain only the data needed, restrict other uses, record the reasons and time limits, and erase it when the period ends |
| Planned shutdown | Where reasonably practicable, give advance notice and a period for retrieving data before terminating resources and handling residual copies; unexpected interruptions may limit retrieval |

No fixed 90-day grace period can override a statutory requirement to delete data when it is no longer necessary or the request deadlines in Section 9. If backups can only be overwritten on a cycle, the data must be isolated from further use, the cycle disclosed, and deletions reapplied on restoration. An unverified backup cycle cannot be described as immediate or completely irreversible. Copies already held by senders, recipients, or independent providers generally cannot be deleted unilaterally by this service; any legal duty to notify recipients of rectification, erasure, or restriction must still be fulfilled.

## 9. Data Subject Rights and Response Deadlines

Subject to applicable law and its conditions, you may request information, access and copies, rectification, erasure, restriction of processing, objection to processing based on legitimate interests, withdrawal of consent, and, where the conditions are met, machine-readable data or portability. Withdrawal does not affect lawful processing before withdrawal; use for direct marketing must stop when you object to it. You may also request the applicable safeguards and human intervention for automated decisions with significant effects.

Where the GDPR applies, you may receive personal data concerning you that you provided, processed by automated means on the basis of consent or a contract, in a structured, commonly used, machine-readable format and transmit it to another controller without hindrance. You may request direct transmission where technically feasible. This right must not adversely affect others' rights and freedoms and does not limit access or erasure rights.

Self-service export is one route, but an export file is not a complete copy of all data: profile fields are a selected subset, and the export does not include attachment files, trash mail, complete routing fields, raw MIME, all aliases, or security and administrative audit records. Contact `privacy@epocanvas.com` for omitted data that you are legally entitled to request. The operator must also protect the rights of correspondents and others, using redaction where necessary rather than refusing all access.

:::note[Objecting to processing based on legitimate interests]
Where the GDPR applies, you may object at any time on grounds relating to your particular situation to processing based on legitimate interests, including profiling. Processing must stop unless the operator demonstrates compelling legitimate grounds overriding your interests, rights and freedoms, or necessity for establishing, exercising or defending legal claims. Objections to direct marketing need no particular grounds and that use must stop. Contact `privacy@epocanvas.com`. The operator must bring this right to your attention clearly and separately no later than the first communication.
:::

Where the GDPR applies, responses must be provided without undue delay and within one month of receipt. Where necessary because of the complexity or number of requests, this may be extended by up to two additional months in accordance with the law, but the extension and its reasons must be explained within the first month. If no action is taken, the reasons and the routes for complaints and judicial remedies must also be provided. Any shorter deadline under another applicable law applies.

Ordinary requests are free of charge. A reasonable fee or refusal with an explanation is permitted only where applicable law allows it and the request can be shown to be manifestly unfounded or excessive. Where there are reasonable doubts about identity, only necessary additional verification is requested; identity documents are not required in every case, and being unregistered or unable to log in does not exclude rights.

You may complain directly to a competent data protection authority and seek judicial remedies. Where the GDPR applies, this includes the authority in the place of your habitual residence, workplace, or the alleged infringement. You do not need the operator's prior consent or to exhaust internal complaints first. EU authority contact details are available in the [EDPB member list](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en).

## 10. Security and Incident Response

The operator must take appropriate measures for access control, credential protection, encryption, updates, and incident handling, taking into account the nature of the data, the risks, the state of the art, and reasonable implementation costs. The presence of security features does not guarantee zero risk or a particular certification. Individual maintenance does not require 24-hour support beyond this policy, but it does not extend statutory notification deadlines.

Incidents must be assessed and contained immediately, and records kept. Where the GDPR applies, unless a breach is unlikely to result in a risk to individuals' rights and freedoms, the controller must notify the competent supervisory authority without undue delay and, where feasible, within 72 hours of becoming aware of it. Delays must be explained, and information may be provided in phases as permitted by law. Where a breach is likely to result in a high risk to data subjects, they must be informed directly without undue delay unless a statutory exception applies; public disclosure of incident details is not a substitute for notification in every case. A processor must notify the controller without undue delay. Where other applicable communications laws specify different notification recipients or thresholds, or shorter deadlines, those requirements apply.

## 11. Age and Children's Data

The hosted test service is for people aged 16 or older who have legal capacity to enter into a contract. Where local law requires a higher age or a guardian's permission, those requirements apply. This service threshold does not establish that age verification has been completed and does not replace an assessment under the GDPR's rules on children's consent or other child and youth protection rules. Upon learning that someone who does not meet the threshold has registered, unnecessary processing must be restricted and verification, response, and deletion handled in accordance with the law. Self-hosted operators must separately assess their intended users, ages, and feasible safeguards.

## 12. Applicable Law and Proportionality

The hosted instance operates from Taiwan and must comply with applicable personal data protection and communications laws. Its obligations must be determined according to provisions in force and commencement notes in official databases. Publication of a legislative amendment does not mean that it has entered into force.

The place of operation is not the only criterion. The GDPR may also apply where data is processed in the context of the activities of an establishment in the EU, or where a party outside the EU offers services to people in the EU or monitors their behaviour there and the statutory conditions are met. Mere accessibility of a website from the EU does not by itself constitute offering services there. Being free, serving a public-interest purpose, having an individual author, or being "in testing" does not automatically exclude applicability; a mailbox service open to the public also cannot generally rely on the purely personal or household activity exemption.

Requirements for an EU representative, a data protection officer, impact assessments, and processing records depend on their respective statutory conditions. Small projects are not automatically exempt, nor does accessibility from the EU automatically require appointments in every case. An ongoing mailbox service is usually not occasional processing, and relevant exceptions must be assessed carefully. Measures can reflect scale and risk; publishing source code alone does not require ISO certification or a commitment to enterprise services.

## 13. Updates and New Purposes

Material changes must be clearly notified by appropriate means before new processing begins, specifying the changes and the arrangements that apply. For new purposes or recipients requiring consent, valid consent must be obtained first; refusal must not be interpreted as consent. Before existing data is used for a new purpose, compatibility and the legal basis must be assessed. Continued use does not constitute new privacy consent, and an update date does not mean all instances have implemented the changes.

## 14. Contact Channels

- Privacy, exercise of rights, and complaints: `privacy@epocanvas.com`.
- Account and service issues: `admin@epocanvas.com` or in-site contact.
- Self-hosted instances: the actual operator's contact channel published by that site.

Do not submit complete emails, identity documents, API keys, or login credentials in public issues. See Section 2 for the disclosure status of the operator's identity and legally required address, and the [Sub-processor List](/en/mail/sub-processors/) and [Data Processing & Security Maintenance](/en/mail/data-security/) for data flows and matters still requiring confirmation at deployment.
