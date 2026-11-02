---
title: Data Export & Storage
description: EpoCanvas Mail data export and storage — actual fields and limits of the three exports, and connecting personal object storage.
---

**Updated: November 2, 2026 | Version: 5.21**

This page covers the export and storage halves of the "Settings → Data" page. Notifications and forwarding on the same page are in the [Notifications & Forwarding Guide](/en/mail/notify/); the legal status of exported data is in [Data Processing & Security Maintenance](/en/mail/data-security/).

![EpoCanvas Mail data page: the three export cards, the storage-usage gauge and the personal object storage entrance (interface in Simplified Chinese)](/images/mail/en/ui/data-guide.png)

*Figure: the data page. Export and storage management appear on one page; attachment usage counts against the identity group's quota.*

<details>
<summary>Walkthrough: Data —  four regions of personal-data autonomy</summary>

The four cards of the data page: three export formats, a forwarding region, a storage region and a third-party grants region — personal data autonomy in one screen.

1. **Export card**: JSON data, mail archives (MBOX/JSON/CSV), and profile-and-label exports all use the same backend response. The time-range parameter is not applied; individual .eml files are also reconstructed from existing fields.
2. **Forwarding card**: Item-by-item settings for Telegram push and auto-forwarding; whether the account may use them is decided by the operator's "user data control" switches.
3. **Storage card**: shows metered mail and attachment usage and the effective quota. BYO Backblaze B2/S3 receives new attachments and bypasses quota checks in the attachment-storage path; other mail limits still apply. Disconnecting does not migrate old objects.
4. **Third-party apps card**: lists OAuth grants and offers revocation. The backend deletes the grant and records revocation, which userinfo checks to reject access. This does not guarantee simultaneous invalidation of third-party sessions, all existing tokens, or retrieval of data already obtained.

</details>

## 1. The three exports

| Export | Format | Scope |
| --- | --- | --- |
| Full-data export | JSON | Selected account/profile fields, selected fields of `is_del=0` mail, and `customLabels`; excludes attachment files, original MIME, complete contact/alias data, security settings and audit records |
| Mail history archive | MBOX, JSON or CSV | The browser converts mail fields from the same response; the backend ignores `type/format/range`, does not filter the selected time range, and excludes trash |
| Contacts and configuration | JSON | Only the returned profile subset, customLabels and export time; not a complete backup of contacts, alias rules or all preferences |

Individual .eml files and batch MBOX archives are reconstructed from existing fields, without complete original MIME or attachment files. Trash cleanup uses mail creation time older than 7 days, without guaranteeing 7 more days in trash. Save attachments separately before deletion and check the export; see the [Privacy Policy](/en/mail/privacy-policy/).

## 2. Storage space

- The attachment-usage gauge shows usage and quota in real time; the quota follows the identity group (factory values in Section 3 of [Operating Modes](/en/mail/modes/));
- Connect a personal Backblaze B2/S3 bucket to store new attachments using your configuration. The attachment-storage path bypasses system quota checks, but metering and other mail limits remain. Provider fees and external retention require separate confirmation; see the [Sub-processor List](/en/mail/sub-processors/);
- Disconnecting returns storage resolution to system settings; it does not migrate or delete objects in the old bucket or guarantee old attachments remain readable. See deletion limits in [Data Processing & Security Maintenance](/en/mail/data-security/).

<details>
<summary>Walkthrough: export and storage</summary>

![Export and storage](/images/mail/en/ui/data.png)

1. Go to "Settings → Data".
2. "Full-data export" downloads JSON with selected profile fields, undeleted-mail fields and customLabels; handle attachments, complete contacts and security settings separately.
3. "Mail history archive": choose MBOX/JSON/CSV and download; the browser converts the format, while the backend does not apply the time range.
4. "Contacts and configuration" exports the returned profile subset and customLabels; check whether the contacts and preferences you need are included.
5. The storage card shows attachment usage; click "Connect a bucket" to bind your own Backblaze B2 / S3, after which attachments are saved straight to your own cloud.

</details>

## 3. Related documents

| Resource | Link |
| --- | --- |
| Notifications and forwarding (the other half of the page) | [Notifications & Forwarding Guide](/en/mail/notify/) |
| Storage tiers and quota metering | [Technical Architecture](/en/mail/architecture/) |
| Data-subject rights and export frequency | [Privacy Policy](/en/mail/privacy-policy/) |
| Storage-related admin configuration | [System Settings Cards](/en/mail/system/) |
