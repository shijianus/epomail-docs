---
title: Analytics
description: EpoCanvas Mail analytics page — dashboards of mail volume, interception rate, source distribution, growth curves and AI usage for administrators.
---

**Effective date: 6 October 2026 | Version: 5.17**

The Analytics page is the admin area's data dashboard (`#manage/admin/analysis`, permission key `analysis:query`), aggregating the instance's mail, user and AI usage metrics. How each metric is measured varies with the mail mode: in encrypted mode (Level 3) the admin side does not read user mail content and the related counts are metadata-level.

![Figure: the analytics page](/images/mail/en/ui/analysis-guide.png)

*Figure: the analytics page*

<details>
<summary>Walkthrough: The analytics headline —  three gauges, three questions</summary>

The three headline gauges of the analysis page: the source mix answers where mail comes from, the two growth curves answer how active the instance is.

1. **Mail source mix**: The inbound mix across direct in-site delivery and external channels, a health check for the delivery channel; revisit the classification rules to verify filtering results.
2. **User growth curve**: Registered versus active users over time; read it against the role quotas to decide when to expand or change the default role.
3. **Mail growth curve**: Sent and received volume over time; together with the AI-usage trend on the same page, it tells you whether the AI Hub's daily quota and rate limits still fit.

</details>

## 1. Metrics at a glance

| Dashboard | Contents |
| --- | --- |
| Mail totals | Total received, total sent, deleted mail count |
| Users | Registered users, active users, deleted users |
| Governance | System interception rate, spam volume |
| Distribution | Mail source distribution (in-instance direct delivery / external channels and so on) |
| Trends | User growth curve, mail growth curve |
| AI | AI call counts and token-consumption trends, AI model usage distribution |

## 2. Typical uses

- Assess whether each identity group's quota needs adjusting (against the factory values in [Permissions](/en/mail/roles/));
- Watch the interception rate and the spam volume, and adjust the lists and keywords under [Classification](/en/mail/category/) accordingly;
- Follow AI call trends and check that the AI Hub daily quota and rate limit in [System Settings Cards](/en/mail/system/) are sensible.

<details>
<summary>Walkthrough: the Analytics page</summary>

1. Open the admin area's Analytics page (permission key `analysis:query`).
2. Read the three groups of metric cards: mail totals, users and governance.
3. The growth curves follow user and mail trends; the source distribution checks the inbound mix.
4. AI call and token trends and the model usage distribution serve to check the quota and rate limit configured in the system settings.

</details>

## 3. Related documents

| Resource | Link |
| --- | --- |
| User-dimension detail management | [User List](/en/mail/users/) |
| AI engine configuration | [System Settings Cards](/en/mail/system/) |
| Granting permission keys per group | [Permissions](/en/mail/roles/) |
