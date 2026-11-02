---
title: Key Terms
description: Definitions and limits of legal roles, data sources, encryption, access control, retention and deletion.
---

**Updated: November 2, 2026 | Version: 5.21**


<!-- legal-review-draft -->
:::caution[Legal review draft: not the current notice]
This draft records proposed terms and matters still requiring verification. It does not replace the current live notice or certify compliance. It must not be used to enable processing before the operator identity and legally required contact information, actual legal bases, recipients and transfer safeguards, retention and deletion arrangements have been verified and the required notice provided. References to an authoritative version mean the Traditional Chinese drafting baseline, not entry into force. Existing statutory duties and user rights remain unaffected.
:::

This page explains terminology in EpoCanvas Mail's legal documents. It creates no separate processing ground or service guarantee. Legal roles depend on actual activities and applicable law; technical scope follows deployed implementations and [Data Processing & Security](/en/mail/data-security/).

The Traditional Chinese (Taiwan) version is the official version; other languages are translations for comparison. This arrangement does not limit clear information required by applicable law, interpretation favourable to consumers or rights that cannot be waived. The update date records a text revision, not renewed consent.

![Map of legal and technical terminology](/images/mail/en/key-terms-glossary.svg)

*Figure: legal definitions describe rights and roles; technical definitions describe mechanisms and limitations. Neither replaces assessment of the actual facts.*

## 1. Legal Terms

| Term | Definition |
| --- | --- |
| Personal data | Information relating to an identified or identifiable natural person, including accounts, network records and personal information in messages, attachments or metadata; not limited to registration fields |
| Highly sensitive personal data | Information such as health, genetic or sex-life data receiving special legal protection; criminal records may follow separate rules, and categories and conditions vary across jurisdictions |
| Collection / processing / use | Operations including obtaining, recording, storing, retrieving, transmitting, using and deleting data; Taiwan law distinguishes collection, processing and use, while GDPR processing is broader, so the categories are not mechanically interchangeable |
| Data controller | A party determining the purposes and means of particular processing, alone or jointly; determined by facts, without automatic exclusive control on self-hosting or treating every individual user as a controller |
| Data processor | A party processing on a controller's behalf under lawful instructions; the same provider may independently control other activities whose purposes it determines |
| Data subject | A natural person whom data concerns, including users, senders, recipients and people mentioned in mail, whether or not they hold an account |
| International transfer | Activities that legally constitute cross-border provision or access by an overseas recipient; assess valid mechanisms against actual routes, since supplier certification does not automatically satisfy transfer requirements |
| Notice duty | Legally required information on the processing party's identity, purposes, grounds, sources, recipients, retention and rights; indirect sources include senders, identity providers, reporters and integrations, with timing and exceptions governed by applicable law |
| Specific purpose | A purpose defined before processing, which must remain lawful, necessary and compatible; learning or testing does not permit arbitrary use of real mail |
| Marketing opt-out | A person's right under applicable law to reject direct marketing; stop the relevant use after rejection and provide an accessible way to opt out |
| Competent authority | An authority with jurisdiction under current law and the actual processing activity, not necessarily only at the operator's location; EU authorities appear in the [EDPB members list](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en) |
| Non-consensual intimate imagery | Intimate imagery made or distributed without consent, including harmful synthetic imagery; access restrictions, necessary retention and remedies follow the [Acceptable Use Policy](/en/mail/acceptable-use/) |
| Child sexual exploitation | Sexual abuse, exploitation or grooming of children, or producing, possessing or distributing related unlawful material; protection, reporting and evidence retention follow applicable law |
| Governing law | Law validly chosen for a contract or determined by legal rules; mandatory consumer, data-protection and judicial-remedy rights remain, as explained in [Terms of Service](/en/mail/terms-of-service/) Section 11 |
| Standard-form contract | Terms drafted in advance for multiple users; unfair terms or exclusions of non-waivable rights do not become valid simply through clicking acceptance |
| Data processing agreement (DPA) | A necessary agreement covering actual processing on another's behalf, instructions, security, assistance and termination; organisational use requires separate confirmation and agreement, and labels do not alter actual roles |
| Data protection officer (DPO) | An independent data-protection function requiring designation when statutory conditions are met; a general privacy mailbox does not establish appointment of a DPO |
| EU representative | A representative in the EU designated where required for certain GDPR-covered processing outside the EU; distinct from a DPO, and not presumed appointed because European-language interfaces are offered |

## 2. Technical Terms

| Term | Definition |
| --- | --- |
| Instance (site) | An EpoCanvas Mail deployment managed by a particular operator, such as `mail.epocanvas.com`; data flows depend on its infrastructure and feature configuration |
| Operator | The natural person or organisation actually determining and managing an instance's service; an author who also operates it bears corresponding duties |
| PBKDF2 | Derivation of a verification value from a password and salt to increase guessing costs; it does not guarantee weak passwords cannot be cracked; see security documentation for actual parameters |
| TOTP | One-time verification codes generated using a shared secret and time; the server must protect its secret, not just store a public key |
| Passkey | A WebAuthn credential; the server stores the public key, credential identifier and necessary verification metadata. The private key is managed by the authenticator or chosen synchronisation service and is not sent to this service's verification server |
| JWT (session token) | A signed token for login sessions; signing is not encryption, and validity, revocation and session limits follow the deployed implementation |
| localStorage | Browser storage that can persist across sessions and hold login state or preferences; it does not establish that every page or third-party component is cookie-free |
| Encryption at rest | Encryption of stored data; mail subjects and bodies depend on mode, and attachments and metadata are not automatically protected by the same application-layer encryption. Holders of server access and keys may still decrypt |
| End-to-end encryption (E2EE) | A design in which only communication endpoints can decrypt; the service does not provide that guarantee, and using OpenPGP independently does not necessarily hide envelope information or other metadata |
| HMAC masked routing | Binding resource identifiers to user information to reduce enumeration and unauthorised-access risks; server authorisation checks remain necessary, and it cannot guarantee absence of access-control failures |
| RBAC | Restricting actions and data access by role; effectiveness depends on permission configuration, checks and maintenance, without an absolute security guarantee |
| D1 / KV / R2 | Cloudflare database, key-value and object-storage services; actual locations, copies and retention depend on configuration and provider arrangements |
| Telemetry | Automatic reporting of usage or diagnostic data; absence of upstream usage analytics does not mean no third-party traffic, since fonts, verification, delivery and optional services may still make requests |
| Soft deletion / hard deletion | Marking or restricting data use versus removing it from specified storage; neither implies simultaneous removal of backups, external copies and lawful retained evidence, nor certain recoverability or irrecoverability |
| BYOS | Use of configured S3-compatible object storage; endpoints, credentials and files may be processed by the instance to enable access, rather than remaining only on the user's device |
| Workers AI | Cloudflare's inference service; enabled automatic processing and user-triggered functions may send message content, with scope and grounds set out in the [Privacy Policy](/en/mail/privacy-policy/) |
| Turnstile | Cloudflare's human-verification service; verification requests and necessary technical data involve third-party processing, detailed in the [Sub-processor List](/en/mail/sub-processors/) |
| SSRF protection | Checks limiting attempts to induce a server to contact inappropriate destinations; coverage and effectiveness depend on actual request paths and deployment, not elimination of all external-request risks |

## 3. Other

Unlisted terms follow the [Privacy Policy](/en/mail/privacy-policy/), [Terms of Service](/en/mail/terms-of-service/) and applicable law. Consult the [official text](https://eur-lex.europa.eu/eli/reg/2016/679/oj) for GDPR concepts; this page makes no compliance-certification claim. Questions may be sent to `privacy@epocanvas.com`.
