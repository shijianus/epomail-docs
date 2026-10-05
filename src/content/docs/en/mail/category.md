---
title: Classification
description: EpoCanvas Mail classification — send/receive switches, AI recognition settings, allow and block lists and hard-interception rules, the site-level governance layer.
---

**Effective date: 6 October 2026 | Version: 5.15**

Classification is the admin area's site-level governance interface (`#manage/admin/rules`, permission key `setting:query`), layering site-wide inbound governance on top of users' personal rules. Personal label rules are in [Labels & Classification Management](/en/mail/labels/); the semantics of the condition fields are in Section 7 of the [Search & Rules Reference](/en/mail/search/).

## 1. Send/receive and refresh switches

Master switches for receiving, sending and auto-refresh, plus the switch for handling mail without recipients; with receiving off, inbound mail is rejected outright.

## 2. AI recognition

Workers AI verification-code extraction and its rule configuration, and the AI API key / URL / model — the same source as the AI Hub in [System Settings Cards](/en/mail/system/); what is controlled here is the inbound recognition behaviour (verification-code badges and the like).

## 3. Lists and interception

| Mechanism | Description |
| --- | --- |
| Sender block-list | Hits are intercepted; configurable as label mode or outright interception |
| Allow-list mode | Only senders on the allow-list are delivered; the rest are handled by policy |
| Sender hard interception | Rejected outright, with the interception counter accumulating |
| Subject and content keywords | Mail hitting block-list keywords is intercepted |
| Empty-sender interception | Mail without a sender name is rejected |
| Not-to-me interception | Mail whose recipients contain none of this instance's addresses is rejected |
| Executable-attachment interception | Mail carrying executable attachments is rejected |

## 4. Layering against the user side

Site-level lists are maintained by administrators and apply to the whole instance; user-side rules apply only to the user's own mailbox, and hits on either side apply the corresponding label automatically. Behaviour details of the lists and keywords are in Section 9 of the [Search & Rules Reference](/en/mail/search/); abuse handling is in the [Acceptable Use Policy](/en/mail/acceptable-use/).

## 5. Related documents

| Resource | Link |
| --- | --- |
| User-side labels and rules | [Labels & Classification Management](/en/mail/labels/) |
| Reviewing interception rate and source distribution | [Analytics](/en/mail/analysis/) |
| Mail-dimension review | [Full-Store Mail Review](/en/mail/review/) |
| Boundaries of bulk mailing | [Acceptable Use Policy](/en/mail/acceptable-use/) |
