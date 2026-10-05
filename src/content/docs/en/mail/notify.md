---
title: Notifications & Forwarding Guide
description: The EpoCanvas Mail notifications and forwarding guide — binding Telegram push, push preferences and field visibility, and the destination and trigger types of auto-forwarding.
---

**Effective date: 5 October 2026 | Version: 5.15**

This page walks through the two capabilities of the "Mail & message forwarding" area on the "Settings → Data" page: Telegram message push and auto-forwarding. Whether an account sees them is decided by the admin's "User Data Control" card; when off, the blocks are hidden. Data export and storage live on the same page, see the [Settings Guide](/en/mail/settings/), Section 5.

![EpoCanvas Mail mail and message forwarding area: Telegram push status and auto-forwarding settings](/images/mail/ui/ui-notify-forward.png)

*Figure: the mail & message forwarding area. Telegram push carries its status and setup entry; auto-forwarding shows destinations and advanced options.*

## 1. Telegram message push

Push uses your own private Telegram bot; new mail reaches your chat in real time:

1. Create a private bot with @BotFather and take the Bot Token (of the form `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`);
2. Get the Chat ID between you and that bot (send the bot any message and read it via getUpdates; groups are negative, channels look like `-100123456789`);
3. On the "Telegram message push" item press the gear, enter the Bot Token and Chat ID; when receiving inside a group topic, also fill the Topic ID;
4. Choose the push preference: all mail, or only important and verification-code mail;
5. Press "Send test message" to verify connectivity, then enable push.

The field-visibility preferences of push content (sender, recipient, body) are configured globally by the administrator in the mail-push card of system settings; the official site-wide bot and your private bot do not conflict.

## 2. Auto-forwarding

| Setting | Description |
| --- | --- |
| Enable auto-forwarding | Master switch; the options below appear when on |
| Forwarding destinations | One or more target addresses, comma-separated |
| Trigger type | Forward every message as CC; or forward only when the receiving mailbox matches a given prefix or letter alias (such as `billing`, `dev-*`) |
| Subject header | Optionally add a `[Fwd]` header to the forwarded subject so it is recognisable in the target mailbox |

:::note
The interface also offers "smart rule filtered forwarding" and "keep the original in the inbox"; the current forwarding engine treats the smart-rule mode as all mail and does not yet honour the keep-original option — test these behaviours before relying on them.
:::

## 3. Delivery path and loop protection

Forwarding goes through the platform's native forward channel first, falling back to the system delivery channel with the optional `[Fwd]` header on failure; destinations equal to the recipient or the original sender are skipped to prevent loops. The rule semantics of trigger types also appear in the [Search & Rules Reference](/en/mail/search/), Section 7.

## 4. Related documents

| Resource | Link |
| --- | --- |
| Where the Data page sits in settings | [Settings Guide](/en/mail/settings/) |
| Data processing of forwarding and push | [Data Processing & Security](/en/mail/data-security/) |
| Two-step verification and account security | [Account Security Guide](/en/mail/security/) |
| The admin's user-data-control switches | [Operating Modes](/en/mail/modes/) |
