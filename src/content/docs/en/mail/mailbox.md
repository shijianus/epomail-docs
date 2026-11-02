---
title: Mailbox Interface & Message Detail
description: EpoCanvas Mail mailbox interface guide — the eight views, every message-detail action, the compose overlay and conversation threading, step by step.
---

**Updated: November 2, 2026 | Version: 5.25**

This page walks through every view of the mailbox main interface and every action on the message-detail page. The routes of each view and the interface skeleton are in the [Interface & Route Map](/en/mail/interface/); the search and rules behind organising are in the [Search & Rules Reference](/en/mail/search/).

![EpoCanvas Mail inbox: three-pane split, verification-code badges and official-sender marks (interface in Simplified Chinese)](/images/mail/en/ui/views-guide.png)

*Figure: the inbox. List, reading pane and sidebar work in concert; counters refresh on the spot.*

<details>
<summary>Walkthrough: The inbox at a glance —  the four entries you reach for first</summary>

Four annotated regions of the inbox, matching the four most-used entries: writing a new message, revisiting starred mail, checking deferred items and auditing what was sent.

1. **Compose (top sidebar button)**: The single entry point for new mail: it opens the compose overlay (not a route). On mobile it becomes a floating button, and the `?composeTo=<address>` deep link pre-fills the recipient. Available from any view.
2. **Starred (sidebar folder)**: Every starred message gathers here across folders: tap the star on a list row to add one. Use it for mail you must keep at hand; the sidebar count updates in real time.
3. **Snoozed (sidebar folder)**: A holding area for deferred follow-ups in two tiers (urgent and waiting). Choose "Snooze" on a message with a time; it returns to the top of the inbox automatically when due.
4. **Sent (sidebar folder)**: The archive of everything this account sent. Outbound volume is capped by the role's daily quota; in-site mail is delivered directly, off-site mail goes through the delivery channel.

</details>

## 1. The eight views

| View | Behaviour |
| --- | --- |
| Inbox | Default view; ascending/descending time order, polled incremental insertion of new mail, virtualised list, unread dots, conversation grouping |
| All Mail | Cross-folder aggregate; clicking a sidebar label filters by that label |
| Sent | Mail sent by this account |
| Drafts | Local IndexedDB `draft` records and `att` attachments; ordinary logout preserves drafts, while deleting a list entry removes both in one transaction |
| Starred | Collection of starred mail |
| Snoozed | Urgent and waiting tiers; returns to the inbox automatically when due |
| Spam | Scheduled tasks use mail creation time; by default, mail older than 7 days moves to Trash. This does not guarantee a further 7 days after moving mail to Spam |
| Trash | The fixed 7-day threshold also uses creation time, so physical deletion may occur in the same run as transfer from Spam; deletion while usage exceeds 90% of quota may also erase mail physically straight away |

## 2. Message-detail actions

| Group | Actions |
| --- | --- |
| Replying | Reply, reply all, forward; inline reply and emoji reactions |
| Organising | Star, read/unread, move to (Inbox / Spam / Trash), archive, snooze (preset time or custom), add label, report spam / not spam |
| AI | Full-text translation requires a data-destination notice and confirmation each time; OCR is off by default. Automatic code recognition is off by default and requires personal opt-in and a configured service |
| Output | Print a single message or conversation, reconstruct and download .eml from existing fields, and view the provided header fields; self-service export excludes complete raw MIME temporarily stored for delivery recovery |
| Governance | Block sender, create a filter from this message (label / mark read / send to Spam / send to Trash) |

## 3. The compose overlay

Composing is an overlay (not a route of its own), entered from three places: the sidebar "Compose" button, the mobile floating button (send permission required) and the deep link `?composeTo=<address>` (recipient prefilled).

- Recipients support contact picking; mail to in-instance mailboxes is delivered directly, off-instance mail goes through the channel configured by the operator;
- A 17-item rich-text toolbar: paragraph, font size, bold, italic, underline, strikethrough, colour, alignment, ordered and unordered lists, quote, horizontal rule, link, image, table, emoji, and translation and source-code modes;
- Attachment capability is enabled per account role; the single-attachment limit follows the instance settings.

## 4. Conversations and typography

Message detail supports conversation threading, layered typography and hover quick reply. Displayed headers and downloaded .eml files remain reconstructed from fields, not downloads of complete raw MIME; see [Data Export & Storage](/en/mail/data/) for the encrypted delivery-recovery copy and cleanup deadline. This round's local implementation blocks remote images, network-loading styles and active content by default. In ordinary reading, you may allow images for the current message after being told that loading can reveal your IP address and the opening of the message. Printing still blocks remote content by default, and Telegram shared reading does not offer remote-content loading. Safe inline images and verified site attachments are distinct from third-party tracking resources.

Ordinary logout clears the current session, current-message cache and recipient history, but preserves other account sessions and local drafts. Clearing all this site's local data requires separate confirmation through the [Data-page cleanup action](/en/mail/data/). These behaviours describe the local code, not confirmation that every live deployment has been updated. See Section 4.3 of the [Privacy Policy](/en/mail/privacy-policy/) for storage boundaries and [Official Mail Specification & Tamper-Proof Verification](/en/mail/tamper-proof/) for official-mail marks.

<details>
<summary>Walkthrough: the mailbox views and message detail</summary>

![Mailbox views and message detail](/images/mail/en/ui/views.png)

1. After signing in you land in the Inbox by default (`/mail/u/0/#inbox`); the top buttons switch between ascending and descending time order.
2. New mail is inserted at the top of the list automatically by polling, and unread messages carry a red dot; the sidebar folder tree switches between the eight views.
3. Clicking a sidebar label switches the list to "All Mail", filtered by that label.
4. Clicking any message opens the detail view (`#message/<hash>`); replying, starring, snoozing, adding labels, translation and downloading the .eml are all in the on-page action bar.

</details>

## 5. Related documents

| Resource | Link |
| --- | --- |
| View routes and interface skeleton | [Interface & Route Map](/en/mail/interface/) |
| Search operators and filter conditions | [Search & Rules Reference](/en/mail/search/) |
| Labels and the rule builder | [Labels & Classification Management](/en/mail/labels/) |
| Data handling of translation | [Privacy Policy](/en/mail/privacy-policy/), Section 6 |
