---
title: EpoCanvas Mail Feature Guide
description: EpoCanvas Mail feature guide — inbox organisation, composing and sending, search syntax, the labelling rule engine, verification-code extraction, spam governance, forwarding and push, AI capabilities, and the open platform.
---

**Effective Date: October 5, 2026 | Version: 5.15**

This page documents the actual features of EpoCanvas Mail, each verified against the open-source code; the interface screenshots come from the hosted instance in real operation. For the project positioning, development history, and deployment, see the [Project Overview](/en/mail/project/); the data handling and retention implications of each feature are covered in [Data Processing & Security Maintenance](/en/mail/data-security/).

The Traditional Chinese (Taiwan) version of the legal documents on this site is the authoritative version; other languages are reference translations. Where meanings diverge, the authoritative version prevails.

![EpoCanvas Mail inbox overview: the left pane holds the compose button, the folder tree (Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash) and colour-coded labels (Social, Subscriptions, Promotions, Work); the message list on the right shows senders, subjects, snippets, verification-code badges, and the official-mail verified marker](/images/mail/ui/ui-inbox-en.png)

*Caption: the inbox. Verification-code badges (green) and the verified marker for official mail (blue check) appear directly in the list; folder and label counters update in real time.*

## 1. Inbox and Organisation

| Capability | Description |
| --- | --- |
| Mail views | eight views — Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash — with live counters |
| Reading layout | three-pane split, conversation threads, inline replies and emoji reactions; raw headers viewable in the detail view |
| Organising actions | star, snooze (to a chosen time), report spam / not spam, move to trash, hard delete |
| Verification-code badge | codes extracted by Workers AI surface directly in the list and detail view (see Section 5) |
| Official-mail marker | mail from official senders such as announcement@epocanvas.com carries a verified marker and an explanatory banner (see [Anti-Tampering & Official Specs](/en/mail/tamper-proof/)) |

## 2. Composing and Sending

![EpoCanvas Mail compose window: the sender is locked to the current mailbox, recipients offer a contact picker, and below the subject sits a rich-text toolbar (paragraph, size, bold, lists, quote, divider, link, image, table, emoji, translate, and source mode) with attachment and send buttons at the bottom](/images/mail/ui/ui-compose.png)

*Caption: composing. The rich-text editor offers 17 formatting tools; mail to local recipients is delivered in-instance, mail off-site goes through the delivery channel.*

- **Rich text**: paragraph styles, size, bold/italic/underline/strikethrough, colour, alignment, ordered and unordered lists, quote, divider, link, image, table, emoji, translate, and source mode;
- **Attachments**: attachment sending and receiving is enabled per account role; the per-attachment size limit follows the instance setting (25 MB by default; it applies only to users on the operator's shared storage, while users who bring their own storage are not subject to it); storage counts against the role quota;
- **Delivery scope**: mail to local mailboxes is delivered in-instance (no external transfer); off-site mail goes through the operator-configured channel (Resend / Mailjet, among others) — the third parties involved are listed in the [Sub-processor List](/en/mail/sub-processors/);
- **Send management**: the Sent view records outbound mail; daily sending quotas apply per role (see Section 6).

## 3. Search Syntax

![EpoCanvas Mail search bar with from:github entered: the list shows only the matching GitHub notification, with sidebar counters in sync](/images/mail/ui/ui-search.png)

*Caption: search. Field operators combine freely with keywords; the hit list refreshes immediately.*

| Operator | Example | Meaning |
| --- | --- | --- |
| `from:` | `from:github` | filter by sender |
| `to:` | `to:boss` | filter by recipient |
| `subject:` | `subject:code` | filter by subject |
| `body:` / `subject_or_body:` | `body:invoice` | filter by body, or subject-or-body |
| `larger:` / `smaller:` | `larger:10M` | filter by message size |
| `before:` / `after:` | `after:2026-10-01` | filter by date |
| `label:` | `label:work` | filter by label |
| `global:` | `global:project` | cross-mailbox site-wide search |
| `is:` | `is:sent`, `is:spam`, `is:trash` | filter by state |

Hits are highlighted through the CSS Highlights API; site-wide search and in-page find coexist at two levels.The complete reference of every field operator, flag and rule condition appears in the [Search & Rules Reference](/en/mail/search/).

## 4. Labels and the Classification Rule Engine

- Four labels ship by default: **Social** (auto-classified by common public mailbox domains), **Subscriptions**, **Promotions**, and **Work**; colours and icons are customisable;
- Rule conditions compose (sender address includes, subject keywords, system settings, and others), with exceptions and priorities; incoming mail is labelled automatically, and manual labelling works too;
- Global governance tools: sender blacklist, subject and content keyword blacklists, whitelist mode, empty-sender-name blocking, not-addressed-to-me blocking, executable-attachment blocking, and hard-block rejection counts;
- Label statistics (total, unread) appear live in the sidebar, and classification results can be reviewed on the analytics page.

## 5. Verification-Code Extraction

![EpoCanvas Mail message detail: the six-digit code in a Cloudflare verification mail is displayed in large type, with green verification-code badges in both list and detail](/images/mail/ui/ui-detail-verification.png)

*Caption: code extraction. This is the only AI processing not triggered manually: only the subject and the first 6,000 characters of the body go to Workers AI. Scope and opt-out are described in [Privacy Policy](/en/mail/privacy-policy/), Section 6.*

## 6. Spam Governance

- Quarantine and retention: spam is quarantined for 7 days and then moves to trash automatically; report-spam / not-spam actions maintain your personal trust lists once confirmed;
- Outbound constraints: daily sending quotas are set per role (base users 5 messages, LV.0 8, LV.1 10, administrators 100; the master account is unlimited) with counters reset daily; quota abuse is handled under [Acceptable Use Policy](/en/mail/acceptable-use/), Section 6;
- Responsibility for the content of outgoing mail rests with the sender; unsolicited bulk commercial mail is a prohibited act (see [Acceptable Use Policy](/en/mail/acceptable-use/), Section 3).

## 7. Forwarding and Push

- **Personal forwarding**: mailbox mail can auto-forward to other addresses, with cc support;
- **Global forwarding**: administrators can configure system-level forwarding rules, constrained by the mail mode (disabled in encrypted mode);
- **Telegram push**: after binding a bot, subject, sender, body, and codes are pushed per configuration with a 7-day in-site reading link; each pushed field can be hidden.

## 8. AI Capabilities

| Capability | Trigger | Description |
| --- | --- | --- |
| Code extraction | automatic on new mail (optional) | Workers AI edge inference, see Section 5 |
| Full-text translation | manual click | multilingual translation preserving the original layout, shards in parallel; model endpoints and fallbacks in [Privacy Policy](/en/mail/privacy-policy/), Section 6 |
| Image text recognition | manual upload | OCR-generated captions; purely decorative images are skipped |
| AI Hub | administrator-configured | multi-model endpoints on OpenAI-compatible protocols, 0-token latency probing, models authorised per role |

The operator never trains models on mail content; consented AI processing can be withdrawn at any time (see [Privacy Policy](/en/mail/privacy-policy/), Section 6).

## 9. Open Platform and Data Autonomy

- **OAuth 2.0 / OIDC centre**: administrators register third-party apps; scope is limited to openid / profile / email, access tokens last 2 hours, and data subjects can review and revoke grants at any time on the third-party apps page;
- **Integration guide**: registering apps on the admin side, endpoints and integration code appear in [Open Platform & API Access](/en/mail/api/);
- **Data export**: one click in Settings produces a complete JSON copy (profile plus all undeleted mail in full text); single messages download as .eml;

## 10. Interface and Mobile

- Six interface languages (Simplified Chinese, Traditional Chinese, English, Français, Español, Nederlands) with fully symmetric front-end and back-end dictionaries;
- Light and dark themes, 300+ offline vector icons (zero external requests), responsive layout, and PWA installation; an Android app (epomail) is also available.

![EpoCanvas Mail inbox overview in the Simplified Chinese interface: the left pane holds the compose button, the folder tree (Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash) and colour-coded labels (Social, Subscriptions, Promotions, Work); the message list on the right shows senders, subjects, snippets, verification-code badges, and the official-mail verified marker](/images/mail/ui/ui-inbox-zh.png)

*Caption: the inbox in the Simplified Chinese interface. Verification-code badges (green) and the verified marker for official mail (blue check) appear directly in the list; the interface language is switchable in Settings across six languages.*

![EpoCanvas Mail inbox on mobile: the responsive layout at 375 px width, with the sidebar collapsed into a drawer and the list fully readable](/images/mail/ui/ui-inbox-mobile.png)

*Caption: mobile. The same instance adapts to desktop and mobile browsers and can be installed via PWA or the Android app.*

## 11. Related Documents

| Resource | Link |
| --- | --- |
| OAuth app registration and endpoint integration tutorial | [OAuth app registration and endpoint integration tutorial](/en/mail/api/) |
| Search operators, admin search and rule conditions | [Search & Rules Reference](/en/mail/search/) |
| Interface routes and where the settings sections live | [Interface & Route Map](/en/mail/interface/) |
| Operating Modes: deployment forms, mail modes and sign-in | [Operating Modes](/en/mail/modes/) |
| Settings Guide: personal settings and the admin console | [Settings Guide](/en/mail/settings/) |
| Positioning and deployment | [Project Overview](/en/mail/project/) |
| Architecture and security design | [Technical Architecture](/en/mail/architecture/) |
| Official mail and anti-tampering checks | [Anti-Tampering & Official Specs](/en/mail/tamper-proof/) |
| Data handling and retention | [Data Processing & Security Maintenance](/en/mail/data-security/) |
| Privacy Policy (AI notice and rights) | [Privacy Policy](/en/mail/privacy-policy/) |
