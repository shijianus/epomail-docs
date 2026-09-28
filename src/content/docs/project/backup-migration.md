---
title: 数据库备份与容灾迁移
description: 深入掌握 Cloudflare D1 关系型数据库的日常冷备份、SQL 转储导出、跨账号无损迁移与表结构平滑升级。
---

## 💾 数据备份理念：冷备份与版本化

由于 EpoMail 采用无服务器架构，底层的物理硬件故障已被 Cloudflare 全球基础设施完全吸收。运维人员在备份与容灾层面的核心任务是：**防范人为误操作、恶意删库以及保留历史法律归档**。

---

## 📤 1. 导出 Cloudflare D1 数据库备份

通过 Wrangler CLI，您可以直接将云端生产 D1 数据库完整导出为标准的 SQL 文件（包含完整的建表 DDL 与数据 INSERT 语句）：

```bash
# 在 mail-worker 目录下，执行云端导出
npx wrangler d1 export epomail --remote --output="./backup_epomail_$(date +%Y%m%d).sql"
```

该命令将直接生成一个标准的 SQLite 兼容 SQL 脚本。您可以在本地使用任何 SQLite 客户端（如 `sqlite3`、DBeaver、TablePlus）直接打开该文件检视或归档至离线冷存储。

---

## 📥 2. 从备份恢复到新数据库

当需要搭建测试环境或执行灾难恢复时，可将导出的 SQL 脚本重新导入到指定的 D1 实例中：

```bash
# 导入数据到指定 D1 数据库
npx wrangler d1 execute epomail --remote --file="./backup_epomail_20260928.sql"
```

---

## 📦 3. R2 附件对象的异地同步与归档

对于存储在 Cloudflare R2 存储桶中的附件与原始 `.eml` 报文，推荐使用标准的 [rclone](https://rclone.org/) 工具配置定时同步到本地 NAS 或异地对象存储（如 Backblaze B2、AWS S3）：

```bash
# 使用 rclone 增量同步 R2 桶中的所有邮件归档
rclone sync cf-r2:epomail-attachments /mnt/nas/backups/epomail-attachments/ --progress
```

---

## 🔄 4. 数据库升级与平滑迁移规范 (Schema Migrations)

当系统迭代发布新版本，需要增加新字段或新数据表时，EpoMail 遵循严格的**向后兼容与平滑迁移原则**：

1. **绝对禁止破坏性语句**：严禁执行 `DROP TABLE`、`DROP COLUMN` 等破坏性指令；
2. **幂等性条件升级**：升级脚本统一在应用启动阶段通过 `PRAGMA table_info` 检测列名是否存在：
   ```sql
   -- 示例：平滑增加 TOTP 绑定时间戳字段
   ALTER TABLE users ADD COLUMN totp_bound_at INTEGER DEFAULT NULL;
   ```
3. **冷启动引导链自愈**：在清空状态或新节点拉起时，仅凭访问 `/api/init/<jwt_secret>` 必须能端到端完成全新建表与系统播种。
