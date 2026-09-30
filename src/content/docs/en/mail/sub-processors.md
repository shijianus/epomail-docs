---
title: Third-Party Processor List
description: A complete list of EpoCanvas Mail's entrusted processors, sharing recipients, the data involved, trigger conditions, and international transfer mechanisms.
---

# Third-Party Processor List

**Effective date: September 30, 2026 | Version: 5.2**

Following Section 7 of the [Privacy Policy](/en/mail/privacy-policy/), this list sets out in full the third parties involved in the Service's personal data, the conditions of sharing, and the safeguards. The sharing principle of the Service is minimal necessity: data that need not leave the instance do not leave; data that must leave are clearly marked with the recipient and the data carried. The Service has no data sale or advertising revenue-sharing relationship with any of the following parties.

Cross-border transfers follow the requirements of applicable law and lawful restrictions imposed by the competent authorities, with standard contractual clauses and similar mechanisms safeguarding the transfers. Entrusted processors all process data on the instructions of the controller and within the scope of the entrusted purpose.

The Traditional Chinese (Taiwan) versions of the legal documents on this site are the authoritative versions; translations in other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version shall prevail.

![EpoCanvas Mail third-party sharing map: centered on the instance, four categories—entrusted processors, data subject-authorized, data subject-triggered AI processing, and legal requirements—with the minimal necessity principle and the commitments of no selling, no advertising, and no tracking marked out](/images/mail/subprocessor-map.svg)

*Figure: The four channels of third-party sharing in the Service. The trigger conditions, data involved, and safeguards for each category are set out in the tables below.*

## 1. Entrusted Processors (Full-Stack Infrastructure)

| Processor | Function | Data involved | Transfer regions and safeguards |
| --- | --- | --- | --- |
| Cloudflare, Inc. (United States) | Edge computing (Workers), structured storage (D1), sessions and caching (KV), object storage (R2), email routing (Email Routing), human verification (Turnstile), edge AI (Workers AI), and edge logs | Request metadata, all stored content, verification requests | Global edge network; SOC 2 Type II and ISO/IEC 27001 certifications; the EU Standard Contractual Clauses (SCC) mechanism is available; transfers encrypted with TLS throughout |
| Resend, Inc. / Mailjet (Sinch) (United States / France) | Off-site email delivery (MTA) | Full outbound email (recipient, subject, body, attachments) | Triggered only when sending email whose recipients are off-site and the Operator has configured a delivery channel; delivery credentials are kept as isolated API tokens and never enter diagnostic logs |

## 2. Processors Authorized by the Data Subject

| Processor | Function | Data involved | Trigger condition |
| --- | --- | --- | --- |
| Telegram | Real-time notification push | According to configuration: email subject, sender (can be hidden), body (can be hidden), verification codes, and a read link valid for 7 days | Only when a Telegram bot is bound and push is enabled |
| OAuth third-party apps | Third-party login or authorized access | Scope limited to openid / profile / email (identifier, email address, name, avatar); access tokens valid for 2 hours | Only upon active authorization by the data subject; revocable at any time on the "Third-Party Apps" page, and revocation takes effect immediately |
| Linux DO | Third-party login identity source | The user identifier, nickname, avatar, and trust level obtained through OAuth | Only when logging in with a Linux DO account |
| Operator blog (blog.epocanvas.com) | Blog activity level linkage and quota upgrades | Your email address (transmitted in the query request) | Queried in real time only when you view the blog level linkage |
| Operator blog (blog.epocanvas.com) | Blog activity level linkage and quota upgrades | Your email address (transmitted in the query request) | Queried in real time only when you view the blog level linkage |
| Image upload service | Avatar and image storage | The image files themselves | Only when uploading avatars and similar images |

## 3. The AI Processing Chain (Data Subject Initiation as the Principle)

| Service | Function | Data involved | Trigger condition |
| --- | --- | --- | --- |
| Model endpoint configured by the instance (OpenAI-compatible protocol by default) | Email translation | Chunks of the text being translated (whole paragraphs preferred; long texts chunked) | Only when the data subject clicks "Translate" |
| Cloudflare Workers AI | Verification code extraction (edge inference), translation fallback, image text recognition | Subject and the first 6,000 characters of the body (for code extraction); text and images for translation and recognition | Verification code extraction is the only AI processing not triggered manually (optional, enabled by the Operator); the rest is triggered by the data subject |
| MyMemory / Google Translate public APIs | Translation fallback | Extracted text fragments | Only as fallback when the model endpoint is unavailable |

The Operator does not train any model on email content, nor does it send user identity information to AI services beyond the text needed for translation or recognition.

## 4. External Services Provided by the Data Subject or the Operator

| Service | Function | Data involved |
| --- | --- | --- |
| S3-compatible storage (AWS S3, Backblaze B2, MinIO, etc.) | External storage of attachments and raw email blobs (BYOS) | Attachment binary content and its access credentials |
| External databases such as Turso / LibSQL | External redundancy of data | Data replicas as configured |

The foregoing self-provided services are selected by whoever configures them; the configurer shall itself ensure that its choice complies with the requirements for international transfers under the law of its location.

## 5. Third-Party Requests at the Interface Layer

| Service | Function | Description |
| --- | --- | --- |
| Google Fonts | Interface font loading | When the browser loads a page it sends font requests to Google, and the data subject's IP appears in Google's request logs |
| Cloudflare Turnstile | Human verification | Performed at registration and when adding mailboxes; browser trustworthiness is assessed without advertising cookies or cross-site tracking |

## 6. Sharing Under Legal Requirements

The Operator discloses personal data externally only when legally compelled or when a judicial authority requests it through statutory procedures. The Operator will verify the legality of the request, disclose only the minimum scope required by law, and notify the affected data subjects to the extent permitted by law (except where such notice is prohibited by law). Operators of self-hosted instances shall supplement the corresponding commitments for their own jurisdiction.

## 7. Notice of Processor Changes

Adding or replacing an entrusted processor is a material change within the meaning of Section 13 of the [Privacy Policy](/en/mail/privacy-policy/); the Operator will announce it in advance under the procedure in that Section and update this list.
