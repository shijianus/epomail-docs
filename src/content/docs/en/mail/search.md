---
title: Search & Rules Reference
description: The complete EpoCanvas Mail search and rules reference — mail field operators, scope flags, precision switches, highlight behaviour, admin $ search, settings search and every classification rule condition.
---

**Effective date: 5 October 2026 | Version: 5.16**

EpoCanvas Mail has two retrieval systems: user-facing mail search (the top-bar search box) and the administrator's full-store search (the admin "All Mail" section); settings pages additionally have their own settings search. This page lists every operator, flag and rule condition, matching the current implementation. Classification rules share the same field semantics as search; the rule engine is described from Section 7 on.

![EpoCanvas Mail search: after typing from:github the list shows only matching mail with the keyword highlighted](/images/mail/ui/ui-search.png)

*Figure: mail search. Operators combine freely with plain keywords; hits light up immediately.*

## 1. Syntax basics

- Multiple conditions are separated by spaces and combine as AND — all must match;
- Values containing spaces are closed in double quotes, as in `subject:"annual report"`;
- A bare keyword without an operator matches across five fields with OR: subject, sender name, sender address, recipient address and body;
- Matching is case-insensitive fuzzy substring matching by default; the precision and case behaviour can be changed with flags (Section 3).

```text
from:github subject:"verification code" after:2026-10-01 exact:true
```

## 2. Field operators

The ten field operators act on their field; values are substring matches (except dates and sizes):

| Operator | Value | Meaning |
| --- | --- | --- |
| `from:<value>` | text | Sender address or sender name contains the value; `from:me` equals `is:sent` |
| `to:<value>` | text | Recipient address or recipient name contains the value |
| `subject:<value>` | text | Matches the subject only |
| `subject_or_body:<value>` | text | Subject or body contains the value |
| `body:<value>` | text | Matches the plain-text body only |
| `larger:<bytes>` | integer | Message size (body plus content length) is at least this many bytes |
| `smaller:<bytes>` | integer | Message size is at most this many bytes |
| `before:<date>` | YYYY-MM-DD | Received before this date |
| `after:<date>` | YYYY-MM-DD | Received after this date |
| `label:<name>` | label name | Mail carrying this label; quote the name when it contains non-ASCII characters |

## 3. Scope and flags

Flags change the search scope or presentation and are stripped from the keywords:

| Flag | Behaviour |
| --- | --- |
| `global:` | Widens the search to all mailboxes, unrestricted by the current view |
| `is:sent` | Forces sent mail into the query |
| `is:spam` | Switches the query domain to Spam |
| `is:trash` | Switches the query domain to Trash |
| `is:draft` | Front-end jump to Drafts (drafts live on the device only) |
| `hl:off` | Disables hit highlighting |
| `exact:true` | Whole-word boundary matching, avoiding substring false positives |
| `case:true` | Turns on case sensitivity |

## 4. Highlighting and snippets

Hits are highlighted in the list and in the detail view; the snippet window slides toward the hit to keep its context. With `exact:true` only whole-word hits light up, with `case:true` case is distinguished, and `hl:off` turns highlighting off entirely. Highlighting is native browser rendering and never alters the message content.

## 5. Admin `$` search

The admin "All Mail" section offers a `$`-prefixed advanced syntax for full-store review:

| Token | Meaning |
| --- | --- |
| `$sender` | Search by sender name or address |
| `$user` | Search by the account owning the mail |
| `$to` | Search by receiving account |
| `$subject` | Search by subject |
| `$received` / `$sent` / `$deleted` / `$norecipient` / `$all` | Status filter: received, sent, deleted, no recipient, all |

Tokens accept English case variants and Chinese aliases (such as `$发件人`, `$用户`, `$收件人`, `$主题`); escape a literal `$` in a value as `\$`. Right-clicking any mail in the list starts a search by its sender, receiving account or owning user directly. In encrypted mode (Level 3) the admin mail list is permanently empty and this syntax is unavailable with it, see [Operating Modes](/en/mail/modes/), Section 2.

## 6. Settings search

On settings pages the search box switches to settings search:

| Input | Behaviour |
| --- | --- |
| no prefix | Searches only the current panel, highlights hits and scrolls them into view, with zero requests |
| `all:` or `global:` | Searches across all settings pages in a grouped drop-down; a click jumps and locates |
| `app:`, `oauth:`, `client:` | Searches OAuth apps in app management |

Suggestions appear while typing; Tab completes an operator.

## 7. Classification rule conditions

The rule builder in the labels section defines each rule in two steps — conditions and exceptions: the action runs when every condition matches and no exception does. The available conditions:

| Condition | Meaning |
| --- | --- |
| `from` (sender is) | Sender address or name matches exactly, comma-separated multi-values supported |
| `to` (recipient is) | Recipient matches exactly, multi-values supported |
| `sender_address_includes` (sender address contains) | Matches by sender domain or address fragment |
| `recipient_address_includes` (recipient address contains) | Matches by recipient domain or address fragment |
| `email_received_for_others` (also sent to others) | The address appears in another recipient slot |
| `subject_include` (subject contains) | Subject keywords, multi-values supported |
| `message_body_includes` (body contains) | Body keywords, multi-values supported |
| `subject_or_body_include` (subject or body contains) | Either one matches |
| `system_setting` (system verdict) | Refers to a system-level verdict (such as an allow-list hit) |

:::note
The builder also offers size (`at_least` / `at_most`), date (`before` / `after`) and message-header (`message_header_includes`) conditions; the current engine version does not yet implement their evaluation — a rule carrying them will not match. They are listed here to prevent misconfiguration.
:::

## 8. Actions and priority

- A matching rule labels the mail with the rule's label;
- The `priority` number decides execution order, lower numbers first;
- With `stopProcessing` enabled, a hit on that rule ends the rule cascade;
- Rules run automatically on arrival and can also be run manually from the labels page.

## 9. Built-in heuristics and site governance

- Four labels ship by default — Social, Subscriptions, Promotions and Work; Subscriptions and Promotions are maintained by built-in heuristics: senders without reply prefixes, e-mail-marketing platform domains and unsubscribe signals land in Subscriptions; discount and urgency subject words together with marketing-word density land in Promotions;
- Site-level governance is configured in the admin "Classification" section: sender allow/block lists, subject and content keywords, allow-list mode, empty-sender interception, not-to-me interception and executable-attachment interception; list hits apply their dedicated labels automatically, and hard interception rejects outright with a counter;
- The behaviour of rules and lists is described further in the [Features Guide](/en/mail/features/), Section 4.

## 10. Related documents

| Resource | Link |
| --- | --- |
| Interface routes and where the search boxes live | [Interface & Route Map](/en/mail/interface/) |
| Where labels and rules are managed | [Settings Guide](/en/mail/settings/) |
| Feature details with screenshots | [Features Guide](/en/mail/features/) |
| How the mail mode bounds the search scope | [Operating Modes](/en/mail/modes/) |
