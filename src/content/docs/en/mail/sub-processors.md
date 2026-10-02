---
title: Sub-processor List
description: The complete list of EpoCanvas Mail's entrusted processors, shared objects, data involved, trigger conditions, and international-transfer safeguards.
---

# Sub-processor List

**Effective Date: October 2, 2026 | Version: 5.7**

Following Section 7 of the [Privacy Policy](/en/mail/privacy-policy/), this list sets out in full the third parties involved in the Service's personal data, the sharing conditions, and the safeguard mechanisms. The Service's sharing principle is minimal necessity: data that need not leave the instance do not leave; what must leave states clearly who receives it and what it carries. The Service has no data-sale or advertising-revenue relationship with any party below.

International transfers follow applicable law's requirements and the restrictions lawfully imposed by the competent authority, with transfers safeguarded by mechanisms such as standard contractual clauses. Entrusted processors process data on the controller's instructions and within the scope of the engagement.

The Traditional Chinese (Taiwan) versions of this site's legal documents are the authoritative versions; translations into other languages are provided for reference only, and in case of any discrepancy the Traditional Chinese version prevails. The legal and technical documents on this site follow the open-source implementation of the service and aim to establish transparent, rigorous, non-commercial community communication norms.

![EpoCanvas Mail sharing map: centred on the instance, four routes — entrusted processors, user-authorised, user-triggered AI processing, and legal request — marked with the minimal-necessity principle and the no-sale, no-ads, no-tracking commitments](/images/mail/subprocessor-map.svg)

*Figure: the four third-party sharing routes of the Service. Each route's trigger, data involved, and safeguards are in the tables below.*

## 1. Entrusted Processors (Full-Time Infrastructure)

| Processor | Function | Data involved | Region and safeguards |
| --- | --- | --- | --- |
| Cloudflare, Inc. (USA) | edge compute (Workers), structured storage (D1), sessions and cache (KV), object storage (R2), mail routing (Email Routing), human verification (Turnstile), edge AI (Workers AI), edge logs | request metadata, all stored content, verification requests | global edge network; SOC 2 Type II and ISO/IEC 27001 certified; EU Standard Contractual Clauses (SCC) mechanism offered; transfers TLS-encrypted throughout |
| Resend, Inc. / Mailjet (Sinch) (USA / France) | outbound mail delivery (MTA) | full outbound mail (recipients, subject, body, attachments) | triggered only for mail addressed off-site when the operator has configured a delivery channel; delivery credentials kept as an isolated API token, never written to diagnostic logs |

## 2. Processors Authorised by the Data Subject

| Processor | Function | Data involved | Trigger |
| --- | --- | --- | --- |
| Telegram | instant notification push | configurable: mail subject, sender (hidable), body (hidable), verification codes, 7-day read link | only when a Telegram bot is bound and push is enabled |
| OAuth third-party apps | third-party sign-in or delegated access | scope limited to openid / profile / email (identifier, e-mail address, name, avatar); access tokens valid 2 hours | only on the data subject's active authorisation; revocable any time on the "Third-party apps" page, effective immediately |
| Linux DO | third-party sign-in identity source | the user identifier, nickname, avatar, and trust level returned by OAuth | only when signing in with a Linux DO account |
| Operations blog (blog.epocanvas.com) | blog activity level linkage and quota upgrade | your e-mail address (sent with the query) | only when you view the blog level linkage, queried at that moment |
| Avatar image host (default: the instance's own object storage; the operator may configure an external host via environment variables) | avatar and image storage | the uploaded image file itself | only when uploading an avatar or similar image; with an external host configured, image files transfer to that host |

## 3. AI Processing Chain (User-Triggered by Principle)

| Service | Function | Data involved | Trigger |
| --- | --- | --- | --- |
| The instance's configured model endpoint (OpenAI-compatible protocol by default) | mail translation | the text chunks being translated (whole paragraphs preferred; long texts chunked) | only when you click "Translate" |
| Cloudflare Workers AI | code extraction (edge inference), translation fallback, image text recognition | subject and first 6,000 characters of the body (code extraction); text and images for translation / recognition | code extraction is the only AI processing not manually triggered (operator-optional); the rest are user-triggered |
| MyMemory / Google Translate public interfaces | translation fallback | the text snippets involved | only as fallback when the model endpoint is unavailable |

The operator does not train any model on mail content and sends AI services no user identity information beyond the text needed for translation or recognition.

## 4. External Services Brought by the User or Operator

| Service | Function | Data involved |
| --- | --- | --- |
| S3-compatible storage (AWS S3, Backblaze B2, MinIO, and others) | external storage of attachments and raw mail blobs (BYOS) | attachment binary content and its access credentials |
| Turso / LibSQL and similar external databases | external data redundancy | data copies as configured |

These self-provided services are chosen by whoever configures them; that party must ensure the choice meets its location's legal requirements for international transfers.

## 5. Third-Party Requests at the Interface Layer

| Service | Function | Notes |
| --- | --- | --- |
| Google Fonts | interface font loading | the browser requests fonts from Google when loading pages; the data subject's IP appears in its request logs |
| Cloudflare Turnstile | human verification | run at registration and when adding a mailbox; assesses browser trustworthiness without advertising cookies or cross-site tracking |

## 6. Disclosure on Legal Request

The operator discloses personal data to outside parties only when legally compelled or when a judicial authority requests it through due legal process. The operator verifies the request's lawfulness, discloses only the minimum scope the law requires, and notifies the affected data subjects to the extent the law allows (unless the law forbids it). Self-hosted operators should supplement the corresponding commitments for their own jurisdiction.

## 7. Notice of Processor Changes

Adding or replacing an entrusted processor is a material change under Section 13 of the [Privacy Policy](/en/mail/privacy-policy/); the operator will announce it in advance under that section's procedure and update this list.
