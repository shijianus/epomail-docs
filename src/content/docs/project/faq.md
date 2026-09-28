---
title: 常见问题与故障排查 FAQ
description: 汇总 EpoMail 部署运维、冷启动、收发邮件异常、DNS 防伪报错与数据库排查的常见问题解决方案。
---

## ❓ 常见问题速查指南

本章汇总了在部署、运维和日常使用 EpoMail 过程中最常遇到的技术问题与官方排查指引。

---

### Q1：为什么执行 `/api/init/<secret>` 冷启动接口返回 401 Unauthorized？
- **原因分析**：请求 URL 路径末段附带的 Secret 与云端实际注入的环境变量 `jwt_secret` 不匹配。
- **排查步骤**：
  1. 检查是否正确执行了 `npx wrangler secret put jwt_secret`；
  2. 确认输入给 curl 的路径中未包含多余的空格或特殊转义字符；
  3. 若在本地开发环境测试，检查 `mail-worker/.dev.vars` 中的 `jwt_secret` 是否正确填写。

---

### Q2：发信可以正常收到，但外部发来的邮件收不到，收件箱始终为空？
- **原因分析**：通常是 Cloudflare Email Routing 的入站路由规则未正确生效或 DNS MX 记录被 CDN 代理。
- **排查步骤**：
  1. 检查域名 DNS 中的 3 条 MX 记录是否指向了 `*.mx.cloudflare.net`；
  2. **确保 MX 记录未开启小黄云代理 (必须为 DNS Only)**；
  3. 进入 Cloudflare Dashboard ➡️ **Email Routing ➡️ Routing Rules**；
  4. 确认 Catch-all 规则已开启，且目标动作绑定了 `epomail` Worker；
  5. 检查 Cloudflare Dashboard 的 **Email Routing ➡️ Overview** 页面，查看是否有被拒信的入站日志。

---

### Q3：发出的邮件能够投递，但经常直接掉进 Gmail 或 Outlook 的垃圾箱？
- **原因分析**：出站域名的 SPF、DKIM 或 DMARC 防伪记录未通过严格对齐校验。
- **排查步骤**：
  1. 登录发信服务商控制台（如 Resend），确认 3 条 DKIM CNAME 记录的状态显示为绿色的 `Verified`；
  2. 使用命令行执行 `dig TXT mybrand.com +short`，确认包含合法的 SPF 记录（如 `include:amazonses.com`）；
  3. 确认已配置 `_dmarc` 记录；
  4. 向 [mail-tester.com](https://www.mail-tester.com/) 发送测试邮件，查看评分报告中扣分的具体项目（如正文缺乏取消订阅链接或 HTML 标签不闭合）。

---

### Q4：大附件上传或下载失败，提示网络错误或 500？
- **原因分析**：Worker 后端与 Cloudflare R2 存储桶绑定名不匹配，或触发了单次请求内存限制。
- **排查步骤**：
  1. 检查 `wrangler.toml` 中的 `[[r2_buckets]]` 配置，确认 `binding = "r2"` 未被擅自更改（后端代码默认绑定名必须为 `r2`）；
  2. 检查绑定的 `bucket_name` 是否与 Cloudflare R2 中实际创建的桶名完全一致；
  3. 单个附件建议控制在 25MB 以内（符合大多数国际邮件协议推荐标准）。超过 25MB 的大文件建议使用网盘外链分享。

---

### Q5：如何彻底清空系统数据重新开始？
- **重置方法**：
  1. 使用 Wrangler 命令行清空生产 D1 数据库：
     ```bash
     npx wrangler d1 execute epomail --remote --command="PRAGMA writable_schema = 1; DELETE FROM sqlite_master WHERE type IN ('table', 'index', 'trigger'); PRAGMA writable_schema = 0; VACUUM;"
     ```
  2. 清空 KV 缓存中的统计与会话；
  3. 重新向 `/api/init/<jwt_secret>` 发起初始化请求，即可完成 100% 洁净的系统重生。
