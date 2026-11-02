---
title: Sub-processor List
description: Known configurable outbound data paths, recipient data and roles, and locations, contracts, retention, and cross-border safeguards that each instance must confirm.
---

**Updated: November 2, 2026 | Version: 5.21**


<!-- legal-review-draft -->
:::caution[Legal review draft: not the current notice]
This draft records proposed terms and matters still requiring verification. It does not replace the current live notice or certify compliance. It must not be used to enable processing before the operator identity and legally required contact information, actual legal bases, recipients and transfer safeguards, retention and deletion arrangements have been verified and the required notice provided. References to an authoritative version mean the Traditional Chinese drafting baseline, not entry into force. Existing statutory duties and user rights remain unaffected.
:::

Following the [Privacy Policy](/en/mail/privacy-policy/), this page describes third-party data flows that may occur in the open-source implementation. The list includes infrastructure processors, independent services, correspondents, and integrations you choose. It does not mean that all the services below are enabled on the hosted instance and cannot replace actual provider agreements and configuration records.

The Traditional Chinese (Taiwan) version is authoritative; translations do not limit applicable law or data subject rights. The operator must enable only paths with a valid processing basis, necessary notice, and appropriate safeguards. Being free or intended for learning and testing is not general permission to transmit real data externally.

![Data flows between an instance and infrastructure, optional integrations, content processing, and recipients under legal requirements](/images/mail/en/subprocessor-map.svg)

*Figure: recipient roles and safeguards must be confirmed for each path; a provider's certification or contract template does not mean that every transfer meets applicable requirements.*

## 1. Infrastructure and Mail Delivery

| Recipient or configuration | Trigger | Data that may be accessed | Role and matters to confirm |
| --- | --- | --- | --- |
| Cloudflare | Workers, D1, KV, R2, Email Routing, Turnstile, Workers AI, and platform logs, enabled according to bindings | Request and verification data, stored accounts and mail, routing, attachments, and content supplied to particular features | Check the contracting entity, each service's data processing terms, log purposes, storage and processing locations, and subprocessors; processing only in Europe is not guaranteed |
| Resend, Mailjet, or configured outbound channels | Sending off-site mail or specific system notices | Addresses, subjects, bodies, attachments, and data needed for delivery reports | Confirm processing arrangements, record retention, and cross-border safeguards for the actual channel; locations cannot be inferred from product names alone |
| Recipients and their mail providers | Sending or forwarding by you or lawfully configured rules | Sent content, routing fields, and attachments | The receiving side usually determines subsequent processing independently; it is not always a processor for this instance, and sent mail may not be retractable |

## 2. Identity, Notifications, and Public Features

| Recipient or configuration | Trigger | Data that may be transmitted or made public | Limits on use and revocation |
| --- | --- | --- | --- |
| Linux DO, GitHub, Google, Microsoft, Apple, or custom SSO identity sources | Using the corresponding SSO login; site-wide external login is off by default in the checked version | OAuth or OIDC exchanges, identifiers, names, avatars, email addresses, trust levels, and attributes actually returned | The source and this instance each process according to their actual roles; login authorisation is not consent to arbitrary subsequent uses |
| Authorised OAuth or OIDC applications | The instance provides authorisation and login to applications | The implementation may return sub, email, verification status, name, username, avatar, and role fields such as is_admin and role, without necessarily minimising each item according to the requested scope | Sharing must not be described as limited to openid, profile, and email; actual fields must be disclosed and releases beyond what is necessary corrected. Revocation does not recall ID tokens already issued or data already obtained by the recipient |
| Telegram and bot services | System-level or individual linking and enabling of notifications or forwarding; site-wide notifications are off by default in the checked version | Chat identifiers and subjects; sender, recipients, and body according to settings; verification codes when extraction produces a result, plus a bearer-access JWT reading link valid for 7 days | Some fields and links are added automatically and cannot be described as all individually optional; copies and forwarding on the chat side are not controlled by the instance, and stopping notifications does not delete existing messages |
| A blog or configured level-linkage endpoint | Login, quota synchronisation, or related query flows run according to configuration | Email identifiers and level or linkage information | Transmission should not be described as occurring only when a level page is opened manually; the endpoint, necessity, legal basis, and update frequency must be confirmed |
| Image hosts, avatar sources, and public profile page visitors | Uploading or displaying external images, or enabling a public page | Images and request data; public pages may include the primary mailbox, role, profile fields, and activity and source statistics | Default storage and external image hosting must be confirmed against configuration; hiding statistics in the interface does not necessarily restrict the API, as explained in Section 4 of the privacy policy |

Reading links may allow access to anyone holding the link; they should not be treated as login authentication or end-to-end confidentiality. Expiry and revocation depend on the actual issuance and verification mechanisms. Until confirmed, there is no promise that all links have a fixed 7-day validity or expire when an account is deactivated.

## 3. AI, Translation, and Image Recognition

| Recipient or configuration | Trigger | Data that may be transmitted | Verified scope and limits |
| --- | --- | --- | --- |
| Cloudflare Workers AI verification-code model | New mail arrives after the site-wide verification-code switch is enabled; it is off by default in the checked version | The complete subject and up to 6,000 JavaScript characters of body text | The subject does not count towards the body limit; no per-user opt-out check was found, and a site-wide switch is not individual consent |
| Configured OpenAI-compatible text models and Workers AI | Translation and its model routing or fallbacks | Translation text, prompts, and any personal or sensitive data within them | A compatible protocol does not mean the recipient is OpenAI; the actual entity, endpoint, and retention conditions must be listed |
| MyMemory and Google Translate public interfaces | Translation fallback or filling in missing text excerpts | Text and prompt excerpts, some sent through URL query parameters | This is not limited to failure of the entire model endpoint; URL content may enter service and intermediary logs. Do not transmit real confidential data before safeguards have been checked |
| Workers AI or a configured external vision model | OCR is enabled in the translation flow; API calls omitting parameters may use different defaults | Embedded image bytes, or remote image URLs including the full path and query parameters; recognised text then enters the translation chain | Processing is not limited to images separately uploaded by the user; icon and tracking-pixel filtering is heuristic and does not guarantee that all are skipped |

The operator does not itself use mail as a model-training dataset. Whether recipients retain data, train on it, review it manually, or use subprocessors must be checked against the actual service and contract; this cannot be inferred from the words "AI", "edge", or statements on this page. Where a valid basis, choice, withdrawal, and cross-border conditions are not in place, the relevant external transfers must be disabled.

## 4. Self-Supplied Storage and External Databases

| Recipient or configuration | Data that may be processed | Responsibilities and deletion limits |
| --- | --- | --- |
| S3-compatible storage, R2, or other object backends selected by a user or the operator | Attachments, object identifiers, and access and configuration credentials | Actual locations, account control, and contracts depend on settings; the instance's backend may obtain access credentials, so they cannot be claimed to remain only on the user's device |
| Turso or LibSQL and HTTP SQL connection-test endpoints | Authentication and test queries are sent during connection tests, potentially including endpoint log data | This review found only configuration and connection probes; D1 is still selected for application data. External replication or routing of application data is not implemented and must not be described as established redundant copies |

A user's choice of provider does not automatically exempt the operator from responsibility for transfers, credential retention, and deletion that it performs itself. Physical deletion of backups and external objects must be checked for each backend; see [Data Processing & Security Maintenance](/en/mail/data-security/).

## 5. Browser and Remote Content Requests

| Recipient or resource | When it occurs | Data that may be received and limits |
| --- | --- | --- |
| Google Fonts or a configured font or static-resource CDN | Loading the interface and external resources | IP addresses, User-Agent, times, and possible referrer information; self-hosting and unnecessary external transfers should be assessed |
| Cloudflare Turnstile | Loading and challenges on relevant registration, verification, or security pages | Device, network, and request data needed for verification; terminal storage and the legal basis must be confirmed against the actual configuration |
| Remote mail images, sender-domain icons, external avatars, or image hosts | Displaying mail and interfaces, loading images, or opening links | IP addresses, request times, and complete image URLs, which may contain recipient identifiers and tracking parameters; a display setting that hides images does not mean all external paths are blocked |
| Hosts of documentation sites, project websites, and external links | You open the site or link | Request and log data for the corresponding site; independent uses by external websites follow their notices, while this instance remains legally responsible for the parts it embeds or actively requests |

The absence of advertising SDKs or third-party analytics tools does not establish that these requests do not occur. See Section 4 of the privacy policy for the conditions concerning browser localStorage, necessary verification, and any non-essential terminal access.

## 6. Legal Requirements, Data Processing Agreements, and Cross-Border Safeguards

Necessary data is provided to competent authorities only on a valid basis, with the request and scope verified and affected people notified where the law allows. Foreign requests do not automatically exclude assessment under the GDPR and confidentiality of communications rules.

Where a recipient is a processor, the operator must, as required by applicable law, put written arrangements in place covering instructions, confidentiality, security, subprocessors, assistance with data subject rights and incidents, return or deletion at the end of processing, and necessary audits. General terms of use or this list do not automatically constitute data processing agreements signed by every provider.

For cross-border transfers restricted by the GDPR, an adequacy decision or other valid safeguards must be confirmed against the actual receiving entity, destination, and service scope. If SCCs are used, appropriate clauses must actually be incorporated, transfer impacts assessed, and necessary supplementary measures evaluated. If an adequacy arrangement under any certification framework is used, the receiving entity's current valid eligibility and covered services must also be checked. SOC or ISO certification, HTTPS, a global edge network, or an SCC template does not by itself establish that the transfer is lawful. Summaries and copies of safeguards that may lawfully be provided can be requested from `privacy@epocanvas.com`.

## 7. Instance Records and List Updates

| Matters an instance must publish or be able to provide as required by law | Status of this document review |
| --- | --- |
| Enabled providers, contracting entities, features, and data scope | Source code can establish available paths; the hosted instance's actual enabled-provider list has not been checked |
| Locations of data storage, inference, logs, and subprocessors | Not verified against deployment and provider records; no promise of restriction to particular regions |
| Specific retention periods for data categories, provider logs, and backups | The instance still needs to supply and verify them; "according to provider policy" must not obscure periods that can already be determined |
| Processing agreements, cross-border mechanisms, and impact assessments | Signing or completion has not been confirmed; this document does not establish that they are in effect |
| Notice, valid consent, and withdrawal for optional features | Source code switches and buttons are not complete proof; actual flows and records must be checked |

The operator must complete the necessary checks before enabling the relevant data flows and provide appropriate notice before adding recipients or purposes or making material changes to safeguards. Where the law requires fresh consent, it must be obtained separately. The update date records only a textual revision; it does not mean all users have been notified or accepted new processing. See also Section 13 of the [Privacy Policy](/en/mail/privacy-policy/) for the basis of the list and how matters not yet implemented are handled.
