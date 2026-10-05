---
title: Labels & Classification Management
description: EpoCanvas Mail labels and classification — creating labels, icons and colours, heuristic maintenance of the four factory labels, the classification rule builder and statistics.
---

**Effective date: 6 October 2026 | Version: 5.15**

Labels and classification rules are managed under "Settings → Labels" (`#settings/labels`). The full field table of rule conditions is in Section 7 of the [Search & Rules Reference](/en/mail/search/); this page covers the operations and statistics of the labels themselves.

## 1. Creating labels and their appearance

| Operation | Description |
| --- | --- |
| New label | Create and name a label in the sidebar label area (up to 7) or on the labels page |
| Icon | Choose freely from the built-in icon library; custom SVG is also supported |
| Colour | Custom label colours; the list and the sidebar stay in sync |
| Delete | Deleting a label also removes its references in rules |

## 2. The four factory labels

| Label | How it is maintained |
| --- | --- |
| Social | The default rule sorts by common public mailbox domains automatically |
| Subscriptions | Built-in heuristics: senders without reply prefixes, e-mail-marketing platform domains, unsubscribe signals |
| Promotions | Built-in heuristics: discount and limited-time subject words, marketing-word density in the body |
| Work | Maintained manually or by your own rules |

The four factory labels can be edited and deleted; heuristic sorting applies only to new mail not yet handled manually.

## 3. The classification rule builder

- A rule consists of two steps, "conditions + exceptions": the action runs when every condition matches and no exception does;
- The condition fields (sender, recipient, subject, body, address-contains and so on) and the multi-value syntax are in Section 7 of the [Search & Rules Reference](/en/mail/search/); value inputs come with backend autocompletion;
- The `priority` number decides the execution order (lower first); `stopProcessing` halts all later rules once matched;
- Rules run automatically on incoming mail, and can also be applied manually to existing mail from the labels page.

## 4. Statistics and review

- The sidebar label area shows each label's total and unread counts in real time;
- Classification results can be reviewed by source distribution on the admin [Analytics](/en/mail/analysis/) page; site-wide allow/block lists and hard interception are configured by administrators under [Classification](/en/mail/category/).

## 5. Related documents

| Resource | Link |
| --- | --- |
| Rule conditions and search operators | [Search & Rules Reference](/en/mail/search/) |
| Site-wide lists and hard interception | [Classification](/en/mail/category/) |
| Classification statistics dashboards | [Analytics](/en/mail/analysis/) |
| Where the labels section lives in settings | [Settings Guide](/en/mail/settings/) |
