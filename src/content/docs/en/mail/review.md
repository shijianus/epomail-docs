---
title: Full-Store Mail Review
description: EpoCanvas Mail full-store mail review — administrator-side mail search, the detail drawer and physical deletion, including how the mail mode affects the entrance.
---

**Updated: November 2, 2026 | Version: 5.25**

Full-Store Mail Review is the admin area's mail-dimension interface (`#manage/admin/mail`, permission key `all-email:query`). The section's name and visible scope vary with the mail mode: All-Mail Mode (Level 1) shows "All Mail"; Privacy Mail Mode (Level 2) shows "Spam", but its actual administrative scope also includes users' trash and ownerless mail; Encrypted Mail Mode (Level 3) hides the entry and restricts administrative list results. These are application-interface restrictions and do not establish that the operator cannot decrypt data on the server; see Section 2 of [Operating Modes](/en/mail/modes/).

![Figure: the full-store mail review](/images/mail/en/ui/review-guide.png)

*Figure: the full-store mail review*

<details>
<summary>Walkthrough: Mail review under private mode —  three visible points</summary>

The mail-review section under private mode (Level 2): the section reads "Spam", and the search box plus the empty state are the two annotated regions.

1. **Search box**: Accepts the `$` syntax across all mail: `$sender`/`$user`/`$to`/`$subject` plus status tokens. Right-click any result to start a new search by its sender, recipient account or owning user.
2. **Section name in the sidebar**: The name and scope follow the mail mode: Level 1 shows "All mail", Level 2 shows "Spam", and Level 3 hides the entry entirely.
3. **Empty state**: A placeholder appears when there are no results; in Private mode, results may include spam, users' trash, or ownerless mail. Opening details requires a lawful and necessary reason; see below for the scope of physical deletion.

</details>

## 1. Search

- The top bar's `$` advanced syntax works across the whole store: `$sender` / `$user` / `$to` / `$subject` plus status tokens; each operator's semantics are in Section 5 of the [Search & Rules Reference](/en/mail/search/);
- Right-clicking any message in the result list starts a new round of search directly from its sender, recipient mailbox or owning user.

## 2. Detail and handling

| Capability | Description |
| --- | --- |
| Detail drawer | View mail content and records within the current mode and permissions; this does not verify all original mail, environment, or transport-security facts |
| Physical deletion | Delete from the relevant application storage; failed-object retries, backups, external copies, and the scope of records require separate checks. This does not mean immediate erasure of all copies |
| Sorting | Sorted by time, to locate recent events |

Mode restrictions on the administrative list do not provide end-to-end encryption or absolute technical isolation from the operator. In Private mode, moving previously protected mail to Trash can decrypt and store its subject, body, and verification code and bring it within administrative visibility. Review still requires a specific, necessary, and lawful reason; the ability to open mail does not authorise using it for learning. See Section 4 of the [Privacy Policy](/en/mail/privacy-policy/).

Suspicious accounts found in review can be jumped to the [User List](/en/mail/users/) for handling; risk events enter [Operation Reports](/en/mail/audit/) by class.

<details>
<summary>Walkthrough: Full-Store Mail Review</summary>

1. Open the admin area's "All Mail" section (shown as "Spam" in Privacy Mail Mode, hidden in Encrypted Mail Mode).
2. Search from the top bar with the `$` advanced syntax, e.g. `$user:<mailbox>`, `$subject:<keyword>`; status tokens filter sent / deleted / no-recipient mail.
3. Right-click any message in the list to start a new search directly from its sender, recipient mailbox or owning user.
4. Open the detail drawer to verify the content and environment details, then physical deletion is available (distinct from the user-side Trash).

</details>

## 3. Related documents

| Resource | Link |
| --- | --- |
| `$` search and status tokens | [Search & Rules Reference](/en/mail/search/) |
| Mail modes and admin-side visibility | [Operating Modes](/en/mail/modes/) |
| Triage of reports and warnings | [Operation Reports](/en/mail/audit/) |
| User-dimension handling | [User List](/en/mail/users/) |
