---
title: Full-Store Mail Review
description: EpoCanvas Mail full-store mail review — administrator-side mail search, the detail drawer and physical deletion, including how the mail mode affects the entrance.
---

**Effective date: 6 October 2026 | Version: 5.15**

Full-Store Mail Review is the admin area's mail-dimension interface (`#manage/admin/mail`, permission key `all-email:query`). The section's name and visible scope vary with the mail mode: All-Mail Mode (Level 1) shows "All Mail", Privacy Mail Mode (Level 2) shows "Spam", and Encrypted Mail Mode (Level 3) hides the section entirely (see Section 2 of [Operating Modes](/en/mail/modes/)).

## 1. Search

- The top bar's `$` advanced syntax works across the whole store: `$sender` / `$user` / `$to` / `$subject` plus status tokens; each operator's semantics are in Section 5 of the [Search & Rules Reference](/en/mail/search/);
- Right-clicking any message in the result list starts a new round of search directly from its sender, recipient mailbox or owning user.

## 2. Detail and handling

| Capability | Description |
| --- | --- |
| Detail drawer | Open a single message to read its full content and environment details without leaving the list |
| Physical deletion | Hard-delete violating mail (distinct from the user-side Trash); operations leave an audit trail |
| Sorting | Sorted by time, to locate recent events |

Suspicious accounts found in review can be jumped to the [User List](/en/mail/users/) for handling; risk events enter [Operation Reports](/en/mail/audit/) by class.

## 3. Related documents

| Resource | Link |
| --- | --- |
| `$` search and status tokens | [Search & Rules Reference](/en/mail/search/) |
| Mail modes and admin-side visibility | [Operating Modes](/en/mail/modes/) |
| Triage of reports and warnings | [Operation Reports](/en/mail/audit/) |
| User-dimension handling | [User List](/en/mail/users/) |
