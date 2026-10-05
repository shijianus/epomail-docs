---
title: Data Export & Storage
description: EpoCanvas Mail data export and storage — the full backup, mail-history archive and contacts-configuration exports, and connecting personal object storage.
---

**Effective date: 6 October 2026 | Version: 5.15**

This page covers the export and storage halves of the "Settings → Data" page. Notifications and forwarding on the same page are in the [Notifications & Forwarding Guide](/en/mail/notify/); the legal status of exported data is in [Data Processing & Security Maintenance](/en/mail/data-security/).

![EpoCanvas Mail data page: the three export cards, the storage-usage gauge and the personal object storage entrance (interface in Simplified Chinese)](/images/mail/ui/ui-settings-data.png)

*Figure: the data page. Export and storage management appear on one page; attachment usage counts against the identity group's quota.*

## 1. The three exports

| Export | Format | Scope |
| --- | --- | --- |
| Full-data export | JSON | Complete backup: account details, mail history, contacts, classification and label rules, and security settings |
| Mail history archive | MBOX (universal), JSON or CSV | Sent and received mail only, with an optional time range |
| Contacts and configuration | JSON | Contact list, custom alias rules and personalisation preferences |

A single message can be downloaded as .eml straight from the reading pane. Trash mail is hard-deleted after 7 days and cannot be recovered; export first if you need to keep a message (see Section 8 of the [Terms of Service](/en/mail/terms-of-service/)).

## 2. Storage space

- The attachment-usage gauge shows usage and quota in real time; the quota follows the identity group (factory values in Section 3 of [Operating Modes](/en/mail/modes/));
- Personal object storage can be connected (bring your own Backblaze B2 or S3 bucket): once connected, new attachments are saved straight to your own cloud and no longer count against the instance quota; the platform's B2 recommendation rests on its free tier and zero egress fees;
- The connection can be removed at any time; afterwards new attachments fall back to instance storage.

<details>
<summary>Walkthrough: export and storage</summary>

![Export and storage](/images/mail/en/ui/data.png)

1. Go to "Settings → Data".
2. "Full-data export" downloads a complete JSON backup in one package (personal data, mail history, contacts, rules and security settings).
3. "Mail history archive": choose the MBOX / JSON / CSV format and a time range, then download.
4. "Contacts and configuration" exports the contact list and the personalisation preferences.
5. The storage card shows attachment usage; click "Connect a bucket" to bind your own Backblaze B2 / S3, after which attachments are saved straight to your own cloud.

</details>

## 3. Related documents

| Resource | Link |
| --- | --- |
| Notifications and forwarding (the other half of the page) | [Notifications & Forwarding Guide](/en/mail/notify/) |
| Storage tiers and quota metering | [Technical Architecture](/en/mail/architecture/) |
| Data-subject rights and export frequency | [Privacy Policy](/en/mail/privacy-policy/) |
| Storage-related admin configuration | [System Settings Cards](/en/mail/system/) |
