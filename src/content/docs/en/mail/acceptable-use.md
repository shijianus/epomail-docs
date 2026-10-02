---
title: Acceptable Use Policy
description: The EpoCanvas Mail Acceptable Use Policy — the list of prohibited conduct, the operator's enforcement measures, and the appeal procedure.
---

**Effective Date: October 3, 2026 | Version: 5.9**

This policy concretises Section 7 ("Acceptable Use") of the [Terms of Service](/en/mail/terms-of-service/) and sets the boundaries of conduct when you use the EpoCanvas Mail service (the "Service"). If you violate this policy, the operator may act under the "Enforcement measures" chapter; conduct suspected of being criminal will also be handled according to law.

Much of the conduct listed here may also be unlawful under the law of your or the operator's location in addition to breaching this policy; the definitive characterisation belongs to the competent authorities, and this document is not legal advice.

The Traditional Chinese (Taiwan) versions of this site's legal documents are the authoritative versions; translations into other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version prevails. The legal and technical documents on this site follow the open-source implementation of the service and aim to establish transparent, rigorous, non-commercial community communication norms.

## 1. Unlawful and Harmful Content

You must not use the Service to transmit, store, or distribute the following:

| Prohibited conduct | Operator's response |
| --- | --- |
| Sexual exploitation of children and juveniles, including photographing, producing, reproducing, holding, distributing, broadcasting, delivering, publicly displaying, or selling sexual imagery of children or juveniles, or sexually related drawings, audio, or objects | Zero tolerance: on discovery, the content is deleted and the account terminated, evidence is preserved and handed to the competent authorities; the appeal buffer does not apply |
| Distributing or broadcasting violence, gore, pornography, obscenity, or gambling harmful to the physical or mental health of children and juveniles | Zero-tolerance procedure: access restricted or content removed first |
| Recording, reproducing, or distributing non-consensual intimate imagery, or producing fabricated sexual imagery by computer synthesis (see Section 2) | Browsing restricted or content removed first; evidence kept at least 180 days; cooperation with investigations |
| Distribution, broadcasting, sale, or public display of obscene text, drawings, sound, images, or other objects | Handled upon report; unlawful content is removed and dealt with according to severity |
| Fraud, phishing, impersonation (including forged senders or impersonating government agencies and officials) in mail or content | Fraud-related content quarantined or deleted; suspected crimes handed to the competent authorities |
| Distributing malware, viruses, or ransomware; mail aimed at credential theft; unauthorised intrusion, obtaining, deleting or altering electronic records, or interfering with computer systems | Immediate quarantine and account termination; suspected crimes handed to the competent authorities |
| Content infringing copyright, trademark, privacy, or reputation | Removed after a valid notice from the rights holder and handled under the relevant law |

## 2. Non-Consensual Intimate Imagery

Anyone who uploads, transmits, or stores non-consensual intimate imagery using the Service will have it restricted or removed on discovery, and the following applies:

1. **Criminal prohibition**: recording, reproducing, or distributing another person's intimate imagery without consent, or producing and distributing fabricated sexual imagery by computer synthesis or similar technology, is a criminal offence in most jurisdictions.
2. **Platform removal duty**: when the operator becomes aware of facts suggesting a sexual-offence crime, it restricts access to or removes the material concerned first; that material, the suspect's personal data, and network usage records are kept at least 180 days for judicial and police investigation.
3. **Handling**: after receiving a notice or report, the operator restricts access or removes the content first, preserves evidence, and cooperates with judicial and police investigations. The appeal buffer of Section 7 does not apply to this chapter.

## 3. Spam and Abuse

You must not:

1. Send unsolicited bulk commercial mail (UBE/UCE), market to recipients who have not consented, use the Service for mailbox warm-up, or run address-verification bombardment. Such conduct may violate the law of the recipients' location (such as the US CAN-SPAM Act, the EU ePrivacy Directive, or Canada's CASL); for cross-border sending, the law of the destination applies. Where personal data is used for marketing, marketing must stop immediately when the data subject objects.
2. Register accounts in bulk programmatically, bypass human verification (Turnstile), bypass registration keys or quota limits.
3. Use the Service as an anonymous relaying springboard or a short-lived bulk-sending pool, or repeatedly re-register to evade enforcement.

## 4. Attacks and Interference

You must not:

1. Scan, probe, or brute-force the Service or third-party systems; attempt unauthorised access to other people's mailboxes, the admin interface, or other users' data. Such conduct may constitute a crime, and the operator may additionally seek civil and administrative remedies.
2. Use shared resources such as AI translation, attachments, or the API in a way that is unjustified and degrades other users' normal use.
3. Harass, defame, or abuse the rights of Cloudflare, the upstream open-source community, or the operator.
4. Violate the terms of third-party services (Cloudflare, Resend, Mailjet, Telegram, and others).

## 5. General Obligations on Resource Use

1. Use resources within your account's storage quota; quotas are set by the operator per role.
2. Do not lend, rent out, or transfer accounts or API tokens to third parties.
3. If you bring your own external storage (BYOS) or external database, you must ensure those services meet your location's legal requirements for international transfers.

## 6. Enforcement Measures

The operator takes measures proportionate to the nature and severity of the violation; the zero-tolerance ladder-buffer for child sexual exploitation does not apply — such cases go straight to the zero-tolerance procedure.

![EpoCanvas Mail enforcement ladder of the Acceptable Use Policy: five levels from warning, rate limiting, quarantine to spam, and account suspension to physical deletion, with an appeal path, and a zero-tolerance shortcut to deletion for child sexual exploitation](/images/mail/en/aup-ladder.svg)

*Figure: the enforcement ladder. Measures escalate step by step on the principle of proportionality; physical deletion is the irreversible final measure. The dashed zero-tolerance path, for child sexual exploitation and non-consensual intimate imagery, leads directly to deletion with evidence preserved.*

| Level | Measure | Applies to |
| --- | --- | --- |
| 1 | Warning | minor or first-time violations |
| 2 | Rate limiting | sending volume and API frequency restricted |
| 3 | Quarantine | outbound mail diverted to the spam folder |
| 4 | Account suspension | account access stopped, data kept for review |
| 5 | Physical deletion | account and all data deleted, irreversible |

Technical basis of the enforcement ladder: outbound volume is constrained by the sending quota of the account role (base users 5 messages/day, LV.0 8/day, LV.1 10/day, administrators 100/day; the master account is unlimited), with daily counters reset each day; spam is quarantined for 7 days and then moved to trash; when mailbox usage exceeds 90% of quota, mail already marked as deleted is hard-deleted immediately. These parameters vary with role and instance settings; the instance's actual configuration prevails.

Where conduct may be unlawful, the operator may preserve the necessary evidence (at least 180 days in the Section 2 cases) and cooperate with the competent authorities' investigations. If your conduct causes the operator to be penalised by Cloudflare or upstream providers, the operator may seek compensation from you under Section 10 of the [Terms of Service](/en/mail/terms-of-service/).

## 7. Appeals and Reports

1. **Appeals**: if you believe a measure was mistaken, appeal through the channels listed in Section 13 of the [Terms of Service](/en/mail/terms-of-service/); the operator will review and answer within a reasonable period. Except in urgent situations, you will be given a chance to explain before a measure of level 4 or above.
2. **Reports**: anyone who discovers conduct violating this policy or a security hazard (spam sources, phishing mail, unauthorised-access attempts, and the like) may report it through the same channels; good-faith reports are always verified and handled.
3. **Exception**: for child sexual exploitation content or the non-consensual intimate imagery of Section 2, the operator does not apply the appeal buffer: content is deleted and the account terminated directly, evidence preserved, and the matter handed to the competent authorities.

## 8. Copyright and Intellectual Property Notice and Counter-Notice

A rights holder who believes content stored on the Service infringes their copyright, trademark, or other lawful rights may send the operator a notice. The notice must state: a description of the infringed right and proof of ownership, information sufficient to locate the content (such as the recipient address and mail subject), contact details, and a duly signed good-faith statement that the use is unauthorised. After verification, the operator removes the content or restricts access to it and informs the notifier of the outcome.

A user whose content has been removed and who believes the removal was mistaken may submit a counter-notice stating the reasons and a good-faith declaration; the operator forwards the counter-notice to the original notifier. Users who repeatedly infringe the rights of others face escalation under the Section 6 enforcement ladder, up to hard deletion. Notices and counter-notices made in bad faith that harm others may give rise to legal liability.