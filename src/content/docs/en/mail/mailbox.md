---
title: Mailbox Interface & Message Detail
description: EpoCanvas Mail mailbox interface guide — the eight views, every message-detail action, the compose overlay and conversation threading, step by step.
---

**Effective date: 6 October 2026 | Version: 5.16**

This page walks through every view of the mailbox main interface and every action on the message-detail page. The routes of each view and the interface skeleton are in the [Interface & Route Map](/en/mail/interface/); the search and rules behind organising are in the [Search & Rules Reference](/en/mail/search/).

![EpoCanvas Mail inbox: three-pane split, verification-code badges and official-sender marks (interface in Simplified Chinese)](/images/mail/ui/ui-inbox-zh.png)

*Figure: the inbox. List, reading pane and sidebar work in concert; counters refresh on the spot.*

## 1. The eight views

| View | Behaviour |
| --- | --- |
| Inbox | Default view; ascending/descending time order, polled incremental insertion of new mail, virtualised list, unread dots, conversation grouping |
| All Mail | Cross-folder aggregate; clicking a sidebar label filters by that label |
| Sent | Mail sent by this account |
| Drafts | Local drafts; recipients left empty show a placeholder marker |
| Starred | Collection of starred mail |
| Snoozed | Urgent and waiting tiers; returns to the inbox automatically when due |
| Spam | Quarantined for 7 days, then moved to Trash |
| Trash | Hard-deleted 7 days after receipt |

## 2. Message-detail actions

| Group | Actions |
| --- | --- |
| Replying | Reply, reply all, forward; inline reply and emoji reactions |
| Organising | Star, read/unread, move to (Inbox / Spam / Trash), archive, snooze (preset time or custom), add label, report spam / not spam |
| AI | Full-text translation (layout preserved, target language selectable per message), verification-code badge |
| Output | Print a single message or the whole conversation, download .eml, view original headers |
| Governance | Block sender, create a filter from this message (label / mark read / send to Spam / send to Trash) |

## 3. The compose overlay

Composing is an overlay (not a route of its own), entered from three places: the sidebar "Compose" button, the mobile floating button (send permission required) and the deep link `?composeTo=<address>` (recipient prefilled).

- Recipients support contact picking; mail to in-instance mailboxes is delivered directly, off-instance mail goes through the channel configured by the operator;
- A 17-item rich-text toolbar: paragraph, font size, bold, italic, underline, strikethrough, colour, alignment, ordered and unordered lists, quote, horizontal rule, link, image, table, emoji, and translation and source-code modes;
- Attachment capability is enabled per account role; the single-attachment limit follows the instance settings.

## 4. Conversations and typography

Message detail supports conversation threading, layered typography and hover quick reply; viewing original headers helps diagnose delivery problems. Mail from official senders carries the verified marker and an explanatory banner — see [Official Mail Specification & Tamper-Proof Verification](/en/mail/tamper-proof/).

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
