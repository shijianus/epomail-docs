---
title: 开放 API 规范与认证
description: 掌握 EpoMail RESTful API 设计标准、Bearer Token 身份鉴权、统一响应包装、速率限制与错误码定义。
---

## 📡 开放 API 架构设计

EpoMail 提供了一套全面、简洁且符合现代规范的 **RESTful JSON API**。您可以利用该 API 将 EpoMail 无缝嵌入到自己的自动化工作流、CI/CD 构建流水线、微服务系统或移动端应用中。

---

## 🔑 身份认证机制 (Bearer JWT)

除了公开的登录与冷启动接口外，所有受保护的 API 端点均需要通过 HTTP 请求标头中的 `Authorization` 字段传递 JWT Bearer 令牌：

```http
GET /api/v1/mail/inbox HTTP/1.1
Host: epomail.mybrand.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### 获取访问令牌 (Access Token)
调用 `/api/v1/auth/login` 接口，提交用户名、密码与可选的 TOTP 口令即可获取令牌：

```bash
curl -X POST https://epomail.mybrand.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin@mybrand.com",
    "password": "YourStrongPassword123!",
    "totp_code": "849201"
  }'
```

---

## 📦 统一响应格式与状态码规范

所有 API 响应均采用标准 JSON 格式，严格遵循以下契约：

### 成功响应结构 (HTTP 200)
```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "total": 1,
    "items": [
      {
        "id": "msg_9f3b2a8c",
        "from": "noreply@github.com",
        "subject": "Security Alert",
        "is_read": 0,
        "created_at": 1774780800000
      }
    ]
  }
}
```

### 业务错误码定义矩阵

| 状态码 (Code) | HTTP 映射 | 语义说明 | 处理建议 |
| :--- | :--- | :--- | :--- |
| **`200`** | `200 OK` | 操作成功完成 | 正常处理业务数据 |
| **`400`** | `400 Bad Request` | 客户端参数验证失败 | 检查请求 Body 或 Query 参数是否合规 |
| **`401`** | `401 Unauthorized` | 鉴权失败或 Token 过期 | 提示用户重新登录或刷新 Token |
| **`403`** | `403 Forbidden` | 权限不足或操作被风控禁止 | 检查当前角色的 RBAC 权限范围 |
| **`404`** | `404 Not Found` | 请求的目标资源（邮件/用户）不存在 | 检查资源唯一 ID 是否正确 |
| **`429`** | `429 Too Many Requests` | 触发接口限流或发信配额用尽 | 降低调用频率，稍后再试 |
| **`500`** | `500 Internal Error` | 后端服务异常 | 查看 Worker 日志定位排错 |
