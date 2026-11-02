---
title: Notifications & Forwarding Guide
description: The EpoCanvas Mail notifications and forwarding guide — binding Telegram push, push preferences and field visibility, and the destination and trigger types of auto-forwarding.
---

**Updated: November 2, 2026 | Version: 5.25**

This page walks through the two capabilities of the "Mail & message forwarding" area on the "Settings → Data" page: Telegram message push and auto-forwarding. Whether an account sees them is decided by the admin's "User Data Control" card; when off, the blocks are hidden. Data export and storage live on the same page, see the [Settings Guide](/en/mail/settings/), Section 5.

![EpoCanvas Mail mail and message forwarding area: Telegram push status and auto-forwarding settings](/images/mail/en/ui/notify-guide.png)

*Figure: the mail & message forwarding area. Telegram push carries its status and setup entry; auto-forwarding shows destinations and advanced options.*

<details>
<summary>Walkthrough: Export and forwarding —  how data leaves, how new mail reaches you</summary>

Three export cards and the forwarding header on the data page: the top half governs how data leaves, the bottom half how incoming mail reaches you in real time.

1. **Data JSON export card**: Downloads selected account fields, fields of mail not marked deleted, and custom labels; it excludes attachment files, complete security settings, and some personal data.
2. **Mail archive card**: The browser converts the same backend response to MBOX, JSON, or CSV; the backend does not apply the selected time range, and complete original MIME and attachment files are not included.
3. **Contacts and preferences card**: Exports the returned subset of profile fields and custom labels; it is not a complete backup of contacts, alias rules, or all preferences.
4. **Forwarding header region**: Entries for Telegram notifications and automatic forwarding. Personal notifications can select all or important mail; preview and code copying are separate choices. Reading and attachment links still recheck live state and the revocation version on every access; see the field and forwarding limits below.

</details>

## 1. Telegram message push

Push uses your own private Telegram bot; new mail reaches your chat in real time:

1. Create a private bot with @BotFather and take the Bot Token (of the form `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`);
2. Get the Chat ID between you and that bot (send the bot any message and read it via getUpdates; groups are negative, channels look like `-100123456789`);
3. On the "Telegram message push" item press the gear, enter the Bot Token and Chat ID; when receiving inside a group topic, also fill the Topic ID;
4. Select `all` or `important` for personal notifications. Important mail is identified only by the exact labels `重要` / `important`, an actual star or an existing verification code, not words in the subject. `notifyCodeOnly` defaults to `false` and only controls an added code-copy button; the button appears only for an existing extracted code of no more than 256 characters, and is not a filter that sends only mail containing codes;
5. Press "Send test message" to check the destination chat, then confirm the transmitted fields and reading link before enabling notifications.

For personal notifications, `includePreview` defaults to `false`. In `all` and `important`, the notification still uses the subject (or a generic title when absent), up to 200 characters, even with preview off; explicit `true` additionally allows a preview of up to 400 characters and a reading link when configured. `privacy` sends only a generic title regardless of the other options, with no subject, sender, recipient, code or link. System notifications independently follow the administrator's system-field settings; the personal preview switch does not disable them. The bot Token and Chat ID are sent to the instance backend, not kept solely on the device. Automatic AI code recognition separately requires personal opt-in and a configured service and is off by default; it is distinct from notification filtering and the code-copy option.

This round's local implementation rechecks link expiry, owner, mailbox and message state, and the revocation version on every Telegram reading or attachment request. Turning personal preview off also blocks access through old personal links. Shared reading does not load remote content. Disabling individual notifications or changing relevant settings revokes old links. The revoke-existing-reading-links button under Settings → Data revokes this account's existing links from both individual and system notifications; future notifications can independently create new links. Ordinary logout does not revoke these links, while account disablement blocks access through the live state checks. Revocation does not delete message content already in Telegram chats or downloaded copies. These mechanisms do not establish that all live deployments have been updated; see the [Sub-processor List](/en/mail/sub-processors/).

## 2. Auto-forwarding

| Setting | Description |
| --- | --- |
| Enable auto-forwarding | Master switch; the options below appear when on |
| Forwarding destinations | One or more target addresses, comma-separated |
| Trigger type | All mail, or literal prefix matching against the receiving mailbox, such as `billing`; `*` is not a wildcard, and an empty alias-prefix list forwards nothing |
| Subject header | Optionally add a `[Fwd]` header to the forwarded subject so it is recognisable in the target mailbox |

:::note
Personal smart-rule forwarding (`rules`) is currently unavailable: at runtime it forwards nothing rather than falling back to all mail, and saving an enabled `rules` configuration is rejected. Saved `keepCopy` is normalized to `true`: `keepCopy=false` is rejected only when forwarding is enabled, and a disabled configuration is also stored as `true`. Forwarding does not automatically delete the original. These are current local-source behaviours; testing is still being repeated and this does not confirm live deployment.
:::

## 3. Delivery path and loop protection

Forwarding first uses the platform's native channel; if it fails, the system delivery channel may be used with `[Fwd]` added according to settings. This fallback call carries fields such as the subject and body, but not ordinary attachments, so the destination is not guaranteed to receive the complete original message. Destinations equal to the recipient or original sender are skipped; this does not guarantee prevention of all multi-hop loops. Earlier system rules may also end the inbound flow before individual notifications and forwarding. For rule semantics, see Section 7 of the [Search & Rules Reference](/en/mail/search/).

## 4. Related documents

| Resource | Link |
| --- | --- |
| Where the Data page sits in settings | [Settings Guide](/en/mail/settings/) |
| Data processing of forwarding and push | [Data Processing & Security](/en/mail/data-security/) |
| Two-step verification and account security | [Account Security Guide](/en/mail/security/) |
| The admin's user-data-control switches | [Operating Modes](/en/mail/modes/) |
