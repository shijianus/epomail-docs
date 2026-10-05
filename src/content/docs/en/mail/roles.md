---
title: Permissions
description: EpoCanvas Mail permissions — the six identity groups, item-by-item permission keys, the default group and group protection, and blog-level tier linkage, for administrators.
---

**Effective date: 6 October 2026 | Version: 5.15**

Permissions is the admin area's identity-group management interface (`#manage/admin/roles`, permission key `role:query`), deciding each group's quotas, permission keys and AI model authorisation. The user-side behaviour of each group is in Section 3 of [Operating Modes](/en/mail/modes/).

![EpoCanvas Mail permissions page: the six-group table with quota, sending-limit, attachment-permission and AI model authorisation columns (interface in Simplified Chinese)](/images/mail/ui/ui-roles.png)

*Figure: the architecture and grading overview on the permissions page. The interface labels the Master group's sending and storage as "unlimited".*

## 1. Groups and quotas

| Group | Positioning | Factory quota |
| --- | --- | --- |
| Visitor | Read-only sandbox | 0 mailboxes / 0 MB / sending banned |
| Regular User | Basic member | 5 messages / 1 mailbox / 5 MB |
| Regular User LV.0 | Certified friend | 8 messages / 2 mailboxes / 10 MB |
| Regular User LV.1 | Active scholar | 10 messages / 3 mailboxes / 25 MB / attachments allowed |
| Moderator | Co-management | 100 messages / 10 mailboxes / 500 MB / attachments allowed |
| Master | Highest authority | Sending and mailbox counts uncapped; storage factory-seeded at 1024 MB (labelled "unlimited" in the interface), adjustable |

## 2. Item-by-item permission keys

Each group is authorised by permission keys (e.g. `user:query` to view the user list, `setting:query` / `setting:set` to reach system settings and operation reports for query / handling). The permission keys each admin interface requires are listed one by one in Section 4 of the [Interface & Route Map](/en/mail/interface/); changes take effect immediately.

## 3. Default group and protection

- The default group new registrations enter is factory-seeded as the Visitor and can be changed to another group;
- The Visitor and Master groups are protected: they cannot be deleted;
- LV.0 and LV.1 sync automatically through blog-level linkage (binding a blog account raises the account to LV.0; active participation raises it to LV.1);
- AI model authorisation is graded per group, working with the AI Hub quota and rate limit in [System Settings Cards](/en/mail/system/).

## 4. Related documents

| Resource | Link |
| --- | --- |
| User-side behaviour of the groups | [Operating Modes](/en/mail/modes/) |
| Changing an account's group | [User List](/en/mail/users/) |
| AI engine and quotas | [System Settings Cards](/en/mail/system/) |
| Where registration meets groups | [Registration Keys](/en/mail/regkeys/) |
