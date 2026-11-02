---
title: EpoCanvas Mail Feature Guide
description: EpoCanvas Mail feature guide — inbox organisation, composing and sending, search syntax, the labelling rule engine, verification-code extraction, spam governance, forwarding and push, AI capabilities, and the open platform.
---

**Updated: November 2, 2026 | Version: 5.25**

This page describes the EpoCanvas Mail implementation after this round of changes. Existing interface screenshots illustrate where controls are located; they do not establish that these changes have been deployed to production or that every feature is enabled. For project positioning, development history, and deployment, see the [Project Overview](/en/mail/project/); data handling and retention are covered in [Data Processing & Security Maintenance](/en/mail/data-security/).

The Traditional Chinese (Taiwan) version of the legal documents on this site is the authoritative version; other languages are reference translations. Where meanings diverge, the authoritative version prevails.

![EpoCanvas Mail inbox overview: the left pane holds the compose button, the folder tree (Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash) and colour-coded labels (Social, Subscriptions, Promotions, Work); the message list on the right shows senders, subjects, snippets, verification-code badges, and the official-mail verified marker](/images/mail/ui/ui-inbox-en.png)

*Caption: the inbox. Verification-code badges (green) and the verified marker for official mail (blue check) appear directly in the list; folder and label counters update in real time.*

<details>
<summary>Walkthrough: The inbox in English and how it mirrors the Chinese build</summary>

The inbox in English: structurally identical to the Chinese UI; dictionary symmetry across six languages is enforced by static audit scripts.

- **Sidebar**: Compose, Starred, Snoozed, Sent and the Social/Subscriptions/Promotions/Work labels mirror the Chinese taxonomy.
- **List**: Sender, subject, preview and verification-code badges sit in exactly the same positions, sizes and colours as in the Chinese build: localisation swaps strings only, never layout, which is why screenshots and instructions carry across languages. Dates, numbers and counters are formatted per UI language too.
- **Switching**: Where the UI language is set: one of six (simplified Chinese, traditional Chinese, English, Espanol, Francais, Nederlands) in the Language group of general settings, applied at once with no sign-out. Display and delivery are separate — system notices and welcome mail are generated in each recipient's own language, not the sender's UI language.

</details>

## 1. Inbox and Organisation

| Capability | Description |
| --- | --- |
| Mail views | eight views — Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash — with live counters |
| Reading layout | Three-pane split, conversation threads, inline replies and emoji reactions. Displayed headers are still reconstructed and cannot establish encryption in transit or at rest. Inbound recovery separately stages complete original MIME bytes in object storage using server-side AES-256-GCM, not end-to-end encryption; retention limits are in Section 9. Remote images and CSS are blocked by default; ordinary reading offers image loading for this message only after a risk notice. Printing remains blocked by default, and Telegram sharing has no external-resource loading button |
| Organising actions | star, snooze (to a chosen time), report spam / not spam, move to trash, hard delete |
| Verification-code badge | codes extracted by Workers AI surface directly in the list and detail view (see Section 5) |
| Official-mail marker | mail from official senders such as announcement@epocanvas.com carries a verified marker and an explanatory banner (see [Anti-Tampering & Official Specs](/en/mail/tamper-proof/)) |

## 2. Composing and Sending

![EpoCanvas Mail compose window: the sender is locked to the current mailbox, recipients offer a contact picker, and below the subject sits a rich-text toolbar (paragraph, size, bold, lists, quote, divider, link, image, table, emoji, translate, and source mode) with attachment and send buttons at the bottom](/images/mail/en/ui/compose-guide.png)

*Caption: composing. The rich-text editor offers 17 formatting tools; mail to local recipients is delivered in-instance, mail off-site goes through the delivery channel.*

<details>
<summary>Walkthrough: The compose overlay —  four stops from styling to sending</summary>

Four regions of the compose overlay covering a message from styling to delivery: the toolbar decides the look, recipients and subject decide where it goes, and Send dispatches it.

1. **Rich-text toolbar (above the body)**: 17 formatting tools: paragraph and font size, bold/italic/underline/strikethrough, colour, alignment, ordered and unordered lists, quote, divider, link, image, table, emoji, translation and source-code mode — all rendered as you write.
2. **Recipient line**: Pick contacts or type addresses. In-site mailboxes are delivered directly (no external transfer); off-site addresses go through the operator-configured channel (Resend/Mailjet, etc.).
3. **Subject line**: The first thing recipients see, shown in lists and push notifications together with the body preview. A descriptive subject pays off later via the `subject:` operator.
4. **Send button (bottom right)**: One click dispatches: direct and instant in-site, via the delivery channel off-site; check the Sent view afterwards. Attachment rights depend on the role, with the per-file cap set per instance (25 MB factory default).

</details>

- **Rich text**: paragraph styles, size, bold/italic/underline/strikethrough, colour, alignment, ordered and unordered lists, quote, divider, link, image, table, emoji, translate, and source mode;
- **Attachments**: attachment sending and receiving is enabled per account role; the per-attachment size limit follows the instance setting (25 MB by default; it applies only to users on the operator's shared storage, while users who bring their own storage are not subject to it); storage counts against the role quota;
- **Delivery scope**: mail to local mailboxes is delivered in-instance (no external transfer); off-site mail goes through the operator-configured channel (Resend / Mailjet, among others) — the third parties involved are listed in the [Sub-processor List](/en/mail/sub-processors/);
- **Send management**: the Sent view records outbound mail; daily sending quotas apply per role (see Section 6).

## 3. Search Syntax

![EpoCanvas Mail search bar with from:github entered: the list shows only the matching GitHub notification, with sidebar counters in sync](/images/mail/en/ui/search-guide.png)

*Caption: search. Field operators combine freely with keywords; the hit list refreshes immediately.*

<details>
<summary>Walkthrough: Search —  the two positions that matter in one query</summary>

Two regions demonstrating one full search: type an operator or keyword in the search box, and the hit list filters instantly with the matches highlighted.

1. **Top search box**: Searches mail on mail pages and settings entries on settings pages. Ten field operators (`from:`, `to:`, `subject:`, `body:`, …) plus flags like `is:` and `global:`; space-separated conditions combine as AND, and Tab completes operators.
2. **Hit list**: Only messages satisfying every condition are listed, with hits highlighted natively by the browser (`hl:off` disables it). Opening a row scrolls the excerpt to the match, keeping context.

</details>

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

*Caption: only when the global, instance-notice, and user-choice conditions below are all met may automatic extraction send the complete subject and up to 6,000 JavaScript characters of body text to Workers AI. The subject does not count towards the body limit. See Section 6 of the [Privacy Policy](/en/mail/privacy-policy/) for processing bases.*

<details>
<summary>Walkthrough: Verification-code extraction in the reading pane</summary>

Verification-code extraction in the reading pane: the 6-digit code in large type, with a green badge on both list and detail.

- **Large-code region**: The code extracted by Workers AI from the subject and the first 6,000 characters of the body, displayed large for easy copying.
- **Green badge**: The green mark that appears on both the list row and the detail: it means this message carries an extracted verification code, so you can spot such mail straight from the list without opening each one. It appears only on a successful extraction — absence does not mean the mail is safe, merely that there is no code to copy.
- **Boundary**: Automatic extraction requires global `aiCode`, instance `contentProcessing.verificationCodeEnabled`, a valid `noticeUrl`, and the user's `privacyPreferences.aiVerificationCode === true` together. The user preference defaults to `false` and can be turned off in Data Settings to stop subsequent requests. This choice does not replace complete notice, a processing basis, or provider agreements; see Section 6 of the privacy policy.

</details>

## 6. Spam Governance

- Quarantine and retention: the daily task measures spam retention from mail creation time and, by default, moves mail to Trash after 7 days. Trash also uses creation time against a fixed 7-day threshold, so physical deletion may occur in the same run, without an additional 7-day retention period. Spam / not-spam reports update personal trust lists according to the particular flow;
- Outbound constraints: daily sending quotas are set per role (base users 5 messages, LV.0 8, LV.1 10, administrators 100; the master account is unlimited) with counters reset daily; quota abuse is handled under [Acceptable Use Policy](/en/mail/acceptable-use/), Section 6;
- Responsibility for the content of outgoing mail rests with the sender; unsolicited bulk commercial mail is a prohibited act (see [Acceptable Use Policy](/en/mail/acceptable-use/), Section 3).

## 7. Forwarding and Push

- **Personal forwarding**: mail can auto-forward to other addresses with cc support. `rules` is unavailable and sends nothing; an empty `alias` list also sends nothing. `keepCopy` is fixed at `true` to retain the original and cannot be turned off in the UI. Saving enabled `rules` or enabled forwarding with `keepCopy: false` is rejected; coordinated frontend/backend upgrades are required;
- **Global forwarding**: administrators can configure system-level forwarding rules, constrained by the mail mode (disabled in encrypted mode);
- **Telegram push**: Personal `all` covers all mail; `important` requires an exact `重要` or `important` label, an actual stored star, or an existing code. `notifyCodeOnly` is a separate opt-in for an existing-code copy button, default `false`, not a mail filter or new extraction. `includePreview`, also default `false`, controls the excerpt and reading button. Compatibility `privacy` sends only a generic notice with no subject, sender, recipient, code, excerpt, or link; other personal modes also omit sender and recipient. System notifications independently use system fields. Every sending path checks live user, mailbox, and message states and the D1 revocation version, even with preview off; reading and attachment access also check them. Changing personal notifications or using Data Settings revokes old links independently of future notifications. Legacy unscoped and OSS v1 tokens require refreshed links; chat copies cannot be recalled. Coordinated frontend/backend upgrades are required, not proof of production deployment; see the [Notifications & Forwarding Guide](/en/mail/notify/);

## 8. AI Capabilities

| Capability | Trigger | Description |
| --- | --- | --- |
| Code extraction | Automatic on new mail only when all Section 5 conditions are met; off by default for users | Workers AI inference; Data Settings can stop subsequent extraction |
| Full-text translation | Opening the bar or changing language sends nothing; each external translation requires explicit confirmation | Global AI, `contentProcessing.translationEnabled`, and a valid notice URL must be enabled. Each request carries `confirmed: true` and a `noticeUrl` exactly matching the current configuration; missing conditions disable it. Matching official bundled translations stay local. MyMemory/Google public fallback and missing-segment calls have been removed from `ai-service`. `contentProcessing.publicTranslationFallbackEnabled` is always `false`, saving `true` is rejected, and the admin option is marked unavailable. Current recipients are listed in the [Sub-processor List](/en/mail/sub-processors/) |
| Image text recognition | Confirmed translation with server-side `contentProcessing.ocrEnabled === true` and explicit `enableOcr: true` for this request | Otherwise `false`; text-only translation is available and old OCR preferences are not reused. Embedded images or remote image URLs may be processed; decorative-image filtering remains heuristic |
| AI Hub | administrator-configured | multi-model endpoints on OpenAI-compatible protocols, 0-token latency probing, models authorised per role |

The operator does not itself use mail as a model-training dataset; third-party retention, training and reuse must be confirmed against actual contracts and settings. Where processing requires consent, withdrawal should be freely available and as easy as giving consent. Processing must be disabled where a workable choice is missing; interface buttons alone cannot establish compliance. See Sections 6 and 9 of the [Privacy Policy](/en/mail/privacy-policy/).

## 9. Open Platform and Data Autonomy

- **OAuth 2.0 / OIDC centre**: Applications can be authorised and grants revoked; returned data may include email addresses, names, avatars and role fields, without necessarily being minimised according to the requested scope. Revocation does not recall data already provided, ID tokens already issued or third-party sessions; see the Sub-processor List;
- **Integration guide**: registering apps on the admin side, endpoints and integration code appear in [Open Platform & API Access](/en/mail/api/);
- **Data export**: Settings exports selected profile fields, fields of mail not marked deleted, and `customLabels`, excluding attachment files, complete contacts, rules, security settings, and audit records; the backend does not apply the selected time range. Exports exclude staged original MIME, and individual .eml files remain reconstructed. Raw-mail staging has a 7-day application deadline that retries may renew; success does not delete it immediately, and scheduled batch cleanup may fail and leave objects behind, so this is not a guaranteed TTL. D1 inbound claims contain metadata, not the raw body. All three public-profile statistics-hiding settings also constrain the API; deleted or disabled users return 404, without automatic physical deletion of static avatars. The new account-closure flow disables the account, revokes access, and records `manual_review`, not completed erasure. See [Data Export & Storage](/en/mail/data/);

## 10. Interface and Mobile

- Six interface languages (Simplified Chinese, Traditional Chinese, English, Français, Español, Nederlands) with fully symmetric front-end and back-end dictionaries;
- Light and dark themes, 300+ offline vector icons, responsive layout, PWA installation, and an Android app (epomail). Vue has removed external Google Fonts links and uses system fonts; React fonts are self-hosted. Avatars, Turnstile, and other external resources may still make requests, so this is not a claim of zero external requests.

![EpoCanvas Mail inbox overview in the Simplified Chinese interface: the left pane holds the compose button, the folder tree (Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash) and colour-coded labels (Social, Subscriptions, Promotions, Work); the message list on the right shows senders, subjects, snippets, verification-code badges, and the official-mail verified marker](/images/mail/en/ui/views-guide.png)

*Caption: the inbox in the Simplified Chinese interface. Verification-code badges (green) and the verified marker for official mail (blue check) appear directly in the list; the interface language is switchable in Settings across six languages.*

<details>
<summary>Walkthrough: The inbox at a glance —  the four entries you reach for first</summary>

Four annotated regions of the inbox, matching the four most-used entries: writing a new message, revisiting starred mail, checking deferred items and auditing what was sent.

1. **Compose (top sidebar button)**: The single entry point for new mail: it opens the compose overlay (not a route). On mobile it becomes a floating button, and the `?composeTo=<address>` deep link pre-fills the recipient. Available from any view.
2. **Starred (sidebar folder)**: Every starred message gathers here across folders: tap the star on a list row to add one. Use it for mail you must keep at hand; the sidebar count updates in real time.
3. **Snoozed (sidebar folder)**: A holding area for deferred follow-ups in two tiers (urgent and waiting). Choose "Snooze" on a message with a time; it returns to the top of the inbox automatically when due.
4. **Sent (sidebar folder)**: The archive of everything this account sent. Outbound volume is capped by the role's daily quota; in-site mail is delivered directly, off-site mail goes through the delivery channel.

</details>

![EpoCanvas Mail inbox on mobile: the responsive layout at 375 px width, with the sidebar collapsed into a drawer and the list fully readable](/images/mail/ui/ui-inbox-mobile.png)

*Caption: mobile. The same instance adapts to desktop and mobile browsers and can be installed via PWA or the Android app.*

<details>
<summary>Walkthrough: The mobile inbox and its responsive trade-offs</summary>

The inbox at 375 px: the sidebar collapses into a drawer while the list stays fully readable.

- **Drawer sidebar**: Below 1025 px wide the left rail collapses into a drawer: the hamburger opens it over a scrim, and picking any view closes it again so the reading pane stays unobstructed. Desktop and mobile share one sidebar structure, so counters and labels read identically in both forms.
- **Floating compose button**: The mobile counterpart of the desktop Compose button: pinned bottom-right, persistent while scrolling, and opening a full-screen composer on tap. It appears only for accounts with sending rights — a Visitor or a role with sending turned off never sees it, and so cannot reach the composer at all.
- **List**: The same virtualised list as on desktop: a long mailbox renders only the rows in view, so first paint does not slow down as the mailbox grows. Touch targets are enlarged for mobile reachability, while information density and column structure stay identical — mobile screenshots remain valid for checking fields.

</details>

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
