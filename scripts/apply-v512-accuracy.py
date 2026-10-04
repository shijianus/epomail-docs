# -*- coding: utf-8 -*-
"""v5.12 专案介绍精度治理轮：全部替换为精确唯一匹配，任一断言失败立即中止。

修复清单（均经 2026-10-05 主仓 HEAD 源码对码）：
  A. modes.md ×6   —— 站长存储配额出厂 1024 MB（界面标示无限制）、
                      信任设备触发改为两步验证步骤的「以后本设备登录不再验证」、
                      移除 Linux DO 登录能力表述（登录 UI 已无该入口）。
  B. settings.md ×6 —— 翻译目标语言 17→16；六张系统设置配置卡名对齐应用实际标题。
  C. features.md ×6 —— 移除 Linux DO 登录条目。
  D. project.md ×6  —— 提交计数与截止日期刷新（逾 660／逾 50，2026-10-05）、
                      里程碑表新增第 14 阶段、主仓与文档仓锚点链追加。
  E. 全站版本号 5.11 → 5.12（78 文件）。
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src" / "content" / "docs"
LANGS = {
    "zh": "mail",
    "zh-tw": "zh-tw",
    "en": "en",
    "es": "es",
    "fr": "fr",
    "nl": "nl",
}

# 主仓与文档仓新锚点（两代码块在六语言中逐字节一致）
MAIN_CHAIN_APPEND = (
    "21af692803770c94ac2cfbdec5c32624e45754ce  2026-10-03  "
    "feat(sys-setting): 新增底层特性开关 ENABLE_OAUTH_INTEGRATION 并默认关闭隐藏第三方认证设置\n"
    "73a2561d3e91867a2b9e442bebe8366a639b5914  2026-10-04  "
    "feat(audit): refactor audit console to user-list standards with RBAC and D1 persistence\n"
    "596e7c1f4e4d022f3573917cfd56f72b65ae0136  2026-10-05  "
    "docs(checklist): 归档 EpomailDocs v5.11 专案介绍扩充轮流水（EpomailDocs ff4e93f+c597fca——运行模式/设置指南两新页×6 语言、9 张真实产品截图、全站 5.11 版本同步、本地视觉验证全绿）"
)
DOCS_CHAIN_APPEND = (
    "68a014ce25cca575ec348f68db746419fd19e2ce  2026-10-04  "
    "chore: sync manifest commit hash for 08448fb\n"
    "08448fb63b011699b129e69266e7150a2174a49e  2026-10-04  "
    "feat(docs): v5.10 独立审计治理轮——P1×3 全量对码修订、P2 全项落地、en 纳入结构对称校验\n"
    "ff4e93f7bb9da6ee1a4729cb2d826b1993fe5167  2026-10-05  "
    "feat(docs): v5.11 专案介绍扩充——运行模式/设置指南两新页 ×6 语言与真实产品截图全量入库\n"
    "c597fca8b14005a6fc7a3482d683b9a2937c55d8  2026-10-05  "
    "chore: sync manifest commit hash for ff4e93f"
)

ROW13_ZH = "| 13. 文档站持续运营 | 2026-10-01 → 10-04 | 本地演示实例与播种工具；v5.8 视觉与入口打磨；v5.9 功能指南／技术架构扩充（×6 语言）与真实产品截图；v5.9 独立审计全量对码 | `26f6c3b` `8a60539` |"
ROW14_ZH = "| 14. 审计治理与介绍扩充 | 2026-10-04 → 10-05 | v5.10 独立审计治理（全量对码修订、en 纳入结构对称）；v5.11 运行模式／设置指南两新页（×6 语言、真实产品截图）；审计控制台重构（RBAC 与 D1 持久化）与 OAuth 特性开关 | `08448fb` `ff4e93f` `596e7c1` |"

# 每种语言的替换对（old, new）；逐条断言恰好命中一次
EDITS = {
    "zh": [
        # A. modes.md
        ("mail/modes.md",
         "*图：权限控制页的架构与分级一览。存储配额、发件上限与附件权限逐分组设定，站长分组的发信与存储不设上限。*",
         "*图：权限控制页的架构与分级一览。存储配额、发件上限与附件权限逐分组设定，站长分组的发信与信箱数不设上限。*"),
        ("mail/modes.md",
         "| 站长 | 最高统领 | 不设上限 | 不设上限 | 不设上限 | 开放 |",
         "| 站长 | 最高统领 | 不设上限 | 不设上限 | 1024 MB | 开放 |"),
        ("mail/modes.md",
         "配额与权限亦可在权限控制页按实例需要调整，上表为出厂播种值。",
         "配额与权限亦可在权限控制页按实例需要调整，上表为出厂播种值。站长分组的发信与信箱数以零值表示不设上限，存储出厂播种为 1024 MB（权限控制页将其标示为「无限制」），可按需要调整。"),
        ("mail/modes.md",
         "- 信任设备：登录时勾选「保持轨道连接」并通过两步验证后，该设备 30 天内登录免重复验证；",
         "- 信任设备：于两步验证步骤勾选「以后本设备登录不再验证」后，该设备 30 天内登录免重复验证；"),
        ("mail/modes.md",
         "未启用的不显示；亦支持以 Linux DO 帐号登录。第三方登录涉及的资料见",
         "未启用的不显示。第三方登录涉及的资料见"),
        # B. settings.md
        ("mail/settings.md",
         "翻译目标语言独立设置，共 17 种，决定 AI 全文翻译的目标语言",
         "翻译目标语言独立设置，共 16 种，决定 AI 全文翻译的目标语言"),
        ("mail/settings.md", "| 界面定制 |", "| 个性化设置 |"),
        ("mail/settings.md", "| AI Hub | AI 提供商", "| AI 智能引擎与大模型接入 | AI 提供商"),
        ("mail/settings.md", "| 用户数据管控 |", "| 用户资料控制 |"),
        ("mail/settings.md", "| Turnstile | 人机验证的站点密钥与开关 |", "| Turnstile 人机验证 | 人机验证的站点密钥与开关 |"),
        ("mail/settings.md", "| 站内公告与欢迎邮件 |", "| 网站公告 |"),
        ("mail/settings.md", "| 审计报告策略 |", "| 操作报告 |"),
        # C. features.md
        ("mail/features.md",
         "- **Linux DO 登录**：支持以 Linux DO 帐号登录（涉及资料见[第三方处理者清单](/mail/sub-processors/)）。\n",
         ""),
        # D. project.md
        ("mail/project.md",
         "截至 2026 年 10 月 4 日，主仓库累计逾 560 个提交；本站（EpomailDocs，独立 git 仓库）另有逾 45 个提交",
         "截至 2026 年 10 月 5 日，主仓库累计逾 660 个提交；本站（EpomailDocs，独立 git 仓库）另有逾 50 个提交"),
        ("mail/project.md", ROW13_ZH, ROW13_ZH + "\n" + ROW14_ZH),
        ("mail/project.md",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查\n" + MAIN_CHAIN_APPEND),
        ("mail/project.md",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a\n" + DOCS_CHAIN_APPEND),
    ],
    "zh-tw": [
        ("zh-tw/mail/modes.md",
         "*圖：權限控制頁的架構與分級一覽。儲存配額、寄件上限與附件權限逐分組設定，站長分組的寄信與儲存不設上限。*",
         "*圖：權限控制頁的架構與分級一覽。儲存配額、寄件上限與附件權限逐分組設定，站長分組的寄信與信箱數不設上限。*"),
        ("zh-tw/mail/modes.md",
         "| 站長 | 最高統領 | 不設上限 | 不設上限 | 不設上限 | 開放 |",
         "| 站長 | 最高統領 | 不設上限 | 不設上限 | 1024 MB | 開放 |"),
        ("zh-tw/mail/modes.md",
         "配額與權限亦可在權限控制頁依實例需要調整，上表為出廠播種值。",
         "配額與權限亦可在權限控制頁依實例需要調整，上表為出廠播種值。站長分組的寄信與信箱數以零值表示不設上限，儲存出廠播種為 1024 MB（權限控制頁將其標示為「無限制」），可依需要調整。"),
        ("zh-tw/mail/modes.md",
         "- 信任裝置：登入時勾選「保持軌道連線」並通過兩步驗證後，該裝置 30 天內登入免重複驗證；",
         "- 信任裝置：於兩步驗證步驟勾選「以後此裝置登入不再驗證」後，該裝置 30 天內登入免重複驗證；"),
        ("zh-tw/mail/modes.md",
         "未啟用的不顯示；亦支援以 Linux DO 帳號登入。第三方登入涉及的資料見",
         "未啟用的不顯示。第三方登入涉及的資料見"),
        ("zh-tw/mail/settings.md",
         "翻譯目標語言獨立設定，共 17 種，決定 AI 全文翻譯的目標語言",
         "翻譯目標語言獨立設定，共 16 種，決定 AI 全文翻譯的目標語言"),
        ("zh-tw/mail/settings.md", "| 介面客製化 |", "| 個性化設定 |"),
        ("zh-tw/mail/settings.md", "| AI Hub | AI 提供者", "| AI 智慧引擎與大模型接入 | AI 提供者"),
        ("zh-tw/mail/settings.md", "| 使用者資料管控 |", "| 使用者資料控制 |"),
        ("zh-tw/mail/settings.md", "| Turnstile | 人機驗證的站點密鑰與開關 |", "| Turnstile 人機驗證 | 人機驗證的站點密鑰與開關 |"),
        ("zh-tw/mail/settings.md", "| 站內公告與歡迎郵件 |", "| 網站公告 |"),
        ("zh-tw/mail/settings.md", "| 稽核報告策略 |", "| 操作報告 |"),
        ("zh-tw/mail/features.md",
         "- **Linux DO 登入**：支援以 Linux DO 帳號登入（涉及資料見[第三方處理者清單](/zh-tw/mail/sub-processors/)）。\n",
         ""),
        ("zh-tw/mail/project.md",
         "截至 2026 年 10 月 4 日，主儲存庫累計逾 560 個提交；本站（EpomailDocs，獨立 git 儲存庫）另有逾 45 個提交",
         "截至 2026 年 10 月 5 日，主儲存庫累計逾 660 個提交；本站（EpomailDocs，獨立 git 儲存庫）另有逾 50 個提交"),
        ("zh-tw/mail/project.md",
         "| 13. 文件站持續營運 | 2026-10-01 → 10-04 | 本地示範實例與播種工具；v5.8 視覺與入口打磨；v5.9 功能指南／技術架構擴充（×6 語言）與真實產品截圖；v5.9 獨立稽核全量對碼 | `26f6c3b` `8a60539` |",
         "| 13. 文件站持續營運 | 2026-10-01 → 10-04 | 本地示範實例與播種工具；v5.8 視覺與入口打磨；v5.9 功能指南／技術架構擴充（×6 語言）與真實產品截圖；v5.9 獨立稽核全量對碼 | `26f6c3b` `8a60539` |\n"
         "| 14. 稽核治理與介紹擴充 | 2026-10-04 → 10-05 | v5.10 獨立稽核治理（全量對碼修訂、en 納入結構對稱）；v5.11 運行模式／設定指南兩新頁（×6 語言、真實產品截圖）；稽核控制台重構（RBAC 與 D1 持久化）與 OAuth 特性開關 | `08448fb` `ff4e93f` `596e7c1` |"),
        ("zh-tw/mail/project.md",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查\n" + MAIN_CHAIN_APPEND),
        ("zh-tw/mail/project.md",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a\n" + DOCS_CHAIN_APPEND),
    ],
    "en": [
        ("en/mail/modes.md",
         "the Master group has no sending or storage cap.*",
         "the Master group has no sending or mailbox cap.*"),
        ("en/mail/modes.md",
         "| Master | Highest authority | Uncapped | Uncapped | Uncapped | Allowed |",
         "| Master | Highest authority | Uncapped | Uncapped | 1024 MB | Allowed |"),
        ("en/mail/modes.md",
         "the table above shows the factory-seeded values.",
         "the table above shows the factory-seeded values. The Master group's sending and mailbox counts are uncapped via zero values, while its storage is factory-seeded at 1024 MB (the permission page labels it as unlimited) and can be adjusted as needed."),
        ("en/mail/modes.md",
         '- Trusted devices: after ticking "keep the orbit connected" at sign-in and passing two-step verification, the device skips re-verification for 30 days;',
         '- Trusted devices: after ticking "Don\'t ask again on this device" during the two-step verification step, the device skips re-verification for 30 days;'),
        ("en/mail/modes.md",
         "a disabled one is not shown at all; sign-in with a Linux DO account is also supported.",
         "a disabled one is not shown at all."),
        ("en/mail/settings.md",
         "the translation target language is set independently with 17 options",
         "the translation target language is set independently with 16 options"),
        ("en/mail/settings.md", "| Interface customisation |", "| Customization |"),
        ("en/mail/settings.md", "| AI Hub | AI provider", "| AI Engine & Model Integration Hub | AI provider"),
        ("en/mail/settings.md", "| User data control |", "| User Data Control |"),
        ("en/mail/settings.md", "| On-site notices & welcome mail |", "| Notice |"),
        ("en/mail/settings.md", "| Audit report policy |", "| Operation Reports |"),
        ("en/mail/features.md",
         "- **Linux DO sign-in**: signing in with a Linux DO account is supported (data involved per the [Sub-processor List](/en/mail/sub-processors/)).\n",
         ""),
        ("en/mail/project.md",
         "As of October 4, 2026 the main repository holds more than 560 commits; this site (EpomailDocs, a separate git repository) has more than 45 commits",
         "As of October 5, 2026 the main repository holds more than 660 commits; this site (EpomailDocs, a separate git repository) has more than 50 commits"),
        ("en/mail/project.md",
         "| 13. Sustained documentation operation | 2026-10-01 → 10-04 | local demo instance and seeding tool; v5.8 visual and entry polish; v5.9 features/architecture expansion (×6 languages) with real product screenshots; v5.9 independent audit with full claim-to-source verification | `26f6c3b` `8a60539` |",
         "| 13. Sustained documentation operation | 2026-10-01 → 10-04 | local demo instance and seeding tool; v5.8 visual and entry polish; v5.9 features/architecture expansion (×6 languages) with real product screenshots; v5.9 independent audit with full claim-to-source verification | `26f6c3b` `8a60539` |\n"
         "| 14. Audit governance and overview expansion | 2026-10-04 → 10-05 | v5.10 independent audit governance (full claim-to-source fixes, en added to structure-symmetry checks); v5.11 running-modes / settings-guide pages (×6 languages, real product screenshots); audit console rebuild (RBAC and D1 persistence) and the OAuth feature flag | `08448fb` `ff4e93f` `596e7c1` |"),
        ("en/mail/project.md",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查\n" + MAIN_CHAIN_APPEND),
        ("en/mail/project.md",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a\n" + DOCS_CHAIN_APPEND),
    ],
    "es": [
        ("es/mail/modes.md",
         "el grupo Maestro no tiene techo de envío ni de almacenamiento.*",
         "el grupo Maestro no tiene techo de envío ni de buzones.*"),
        ("es/mail/modes.md",
         "| Maestro | Autoridad suprema | Sin techo | Sin techo | Sin techo | Permitidos |",
         "| Maestro | Autoridad suprema | Sin techo | Sin techo | 1024 MB | Permitidos |"),
        ("es/mail/modes.md",
         "la tabla anterior recoge los valores sembrados de fábrica.",
         "la tabla anterior recoge los valores sembrados de fábrica. El envío y el número de buzones del grupo Maestro quedan sin techo mediante valores cero, mientras que su almacenamiento se siembra de fábrica en 1024 MB (la página de permisos lo rotula como «sin límite») y puede ajustarse según convenga."),
        ("es/mail/modes.md",
         "- Dispositivos de confianza: tras marcar «mantener la conexión orbital» al iniciar sesión y superar la verificación en dos pasos, el dispositivo queda exento de nueva verificación durante 30 días;",
         "- Dispositivos de confianza: tras marcar «No volver a preguntar en este dispositivo» durante el paso de verificación en dos pasos, el dispositivo queda exento de nueva verificación durante 30 días;"),
        ("es/mail/modes.md",
         "y uno desactivado no se muestra; también se admite el inicio de sesión con cuenta de Linux DO.",
         "y uno desactivado no se muestra."),
        ("es/mail/settings.md",
         "el idioma de destino de la traducción se ajusta de forma independiente, con 17 opciones",
         "el idioma de destino de la traducción se ajusta de forma independiente, con 16 opciones"),
        ("es/mail/settings.md", "| Personalización de la interfaz |", "| Personalización |"),
        ("es/mail/settings.md", "| AI Hub | Proveedor de IA", "| Motor de IA e integración de modelos | Proveedor de IA"),
        ("es/mail/settings.md", "| Avisos en el sitio y correo de bienvenida |", "| Aviso |"),
        ("es/mail/settings.md", "| Política del informe de auditoría |", "| Informes de operaciones |"),
        ("es/mail/features.md",
         "- **Inicio de sesión con Linux DO**: es posible iniciar sesión con una cuenta de Linux DO (los datos implicados figuran en [Subencargados del Tratamiento](/es/mail/sub-processors/)).\n",
         ""),
        ("es/mail/project.md",
         "A fecha de 4 de octubre de 2026, el repositorio principal acumula más de 560 confirmaciones; este sitio (EpomailDocs, repositorio git separado) suma otras más de 45 confirmaciones",
         "A fecha de 5 de octubre de 2026, el repositorio principal acumula más de 660 confirmaciones; este sitio (EpomailDocs, repositorio git separado) suma otras más de 50 confirmaciones"),
        ("es/mail/project.md",
         "| 13. Operación sostenida del sitio de documentación | 2026-10-01 → 10-04 | instancia de demostración local y herramienta de siembra; pulido visual y de entrada v5.8; expansión v5.9 de guías de funciones/arquitectura (×6 idiomas) con capturas reales del producto; auditoría independiente v5.9 con verificación integral afirmación-fuente | `26f6c3b` `8a60539` |",
         "| 13. Operación sostenida del sitio de documentación | 2026-10-01 → 10-04 | instancia de demostración local y herramienta de siembra; pulido visual y de entrada v5.8; expansión v5.9 de guías de funciones/arquitectura (×6 idiomas) con capturas reales del producto; auditoría independiente v5.9 con verificación integral afirmación-fuente | `26f6c3b` `8a60539` |\n"
         "| 14. Gobernanza de auditoría y ampliación de la presentación | 2026-10-04 → 10-05 | gobernanza de auditoría independiente v5.10 (revisión integral afirmación-fuente, «en» incorporada a la simetría estructural); páginas v5.11 de modos de funcionamiento y guía de ajustes (×6 idiomas, capturas reales del producto); reestructuración de la consola de auditoría (RBAC y persistencia en D1) e indicador de función OAuth | `08448fb` `ff4e93f` `596e7c1` |"),
        ("es/mail/project.md",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查\n" + MAIN_CHAIN_APPEND),
        ("es/mail/project.md",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a\n" + DOCS_CHAIN_APPEND),
    ],
    "fr": [
        ("fr/mail/modes.md",
         "le groupe Maître n'a ni plafond d'envoi ni plafond de stockage.*",
         "le groupe Maître n'a ni plafond d'envoi ni plafond de boîtes.*"),
        ("fr/mail/modes.md",
         "| Maître | Autorité suprême | Sans plafond | Sans plafond | Sans plafond | Autorisées |",
         "| Maître | Autorité suprême | Sans plafond | Sans plafond | 1024 Mo | Autorisées |"),
        ("fr/mail/modes.md",
         "le tableau ci-dessus reprend les valeurs semées en usine.",
         "le tableau ci-dessus reprend les valeurs semées en usine. L'envoi et le nombre de boîtes du groupe Maître n'ont aucun plafond (valeurs zéro) ; son stockage est semé en usine à 1024 Mo (la page des permissions le libelle « sans plafond ») et reste ajustable au besoin."),
        ("fr/mail/modes.md",
         "- Appareils de confiance : après avoir coché « maintenir le lien orbite » à la connexion et passé la vérification en deux étapes, l'appareil est dispensé de nouvelle vérification pendant 30 jours ;",
         "- Appareils de confiance : après avoir coché « Ne plus demander sur cet appareil » à l'étape de vérification en deux étapes, l'appareil est dispensé de nouvelle vérification pendant 30 jours ;"),
        ("fr/mail/modes.md",
         "un fournisseur désactivé n'est pas affiché ; la connexion avec un compte Linux DO est également prise en charge.",
         "un fournisseur désactivé n'est pas affiché."),
        ("fr/mail/settings.md",
         "la langue cible de traduction se règle indépendamment, avec 17 options",
         "la langue cible de traduction se règle indépendamment, avec 16 options"),
        ("fr/mail/settings.md", "| Personnalisation de l'interface |", "| Personnalisation |"),
        ("fr/mail/settings.md", "| AI Hub | Fournisseur d'IA", "| Moteur IA et intégration de modèles | Fournisseur d'IA"),
        ("fr/mail/settings.md", "| Avis sur site et courriels de bienvenue |", "| Annonce |"),
        ("fr/mail/settings.md", "| Politique de rapport d'audit |", "| Rapports des opérations |"),
        ("fr/mail/features.md",
         "- **Connexion Linux DO** : connexion possible avec un compte Linux DO (données concernées : voir la [Liste des sous-traitants](/fr/mail/sub-processors/)).\n",
         ""),
        ("fr/mail/project.md",
         "Au 4 octobre 2026, le dépôt principal compte plus de 560 commits ; le présent site (EpomailDocs, dépôt git séparé) compte plus de 45 commits supplémentaires",
         "Au 5 octobre 2026, le dépôt principal compte plus de 660 commits ; le présent site (EpomailDocs, dépôt git séparé) compte plus de 50 commits supplémentaires"),
        ("fr/mail/project.md",
         "| 13. Exploitation continue du site de documentation | 2026-10-01 → 10-04 | instance de démonstration locale et outil d'amorçage ; polissage visuel et d'entrée v5.8 ; extension v5.9 du guide des fonctionnalités et de l'architecture (×6 langues) avec captures réelles du produit ; audit indépendant v5.9 avec vérification intégrale des affirmations par rapport au code | `26f6c3b` `8a60539` |",
         "| 13. Exploitation continue du site de documentation | 2026-10-01 → 10-04 | instance de démonstration locale et outil d'amorçage ; polissage visuel et d'entrée v5.8 ; extension v5.9 du guide des fonctionnalités et de l'architecture (×6 langues) avec captures réelles du produit ; audit indépendant v5.9 avec vérification intégrale des affirmations par rapport au code | `26f6c3b` `8a60539` |\n"
         "| 14. Gouvernance d'audit et extension de la présentation | 2026-10-04 → 10-05 | gouvernance d'audit indépendante v5.10 (corrections intégrales par rapport au code, « en » intégré au contrôle de symétrie structurale) ; pages v5.11 des modes de fonctionnement et du guide des paramètres (×6 langues, captures réelles du produit) ; refonte de la console d'audit (RBAC et persistance D1) et indicateur de fonctionnalité OAuth | `08448fb` `ff4e93f` `596e7c1` |"),
        ("fr/mail/project.md",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查\n" + MAIN_CHAIN_APPEND),
        ("fr/mail/project.md",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a\n" + DOCS_CHAIN_APPEND),
    ],
    "nl": [
        ("nl/mail/modes.md",
         "de groep Meester heeft geen verzend- of opslagplafond.*",
         "de groep Meester heeft geen verzend- of mailboxplafond.*"),
        ("nl/mail/modes.md",
         "| Meester | Hoogste gezag | Geen plafond | Geen plafond | Geen plafond | Toegestaan |",
         "| Meester | Hoogste gezag | Geen plafond | Geen plafond | 1024 MB | Toegestaan |"),
        ("nl/mail/modes.md",
         "de tabel hierboven toont de fabrieksstandaardwaarden.",
         "de tabel hierboven toont de fabrieksstandaardwaarden. Verzending en het aantal mailboxen van de groep Meester hebben geen plafond (nulwaarden); de opslag staat fabrieksstandaard op 1024 MB (de permissionspagina labelt deze als «onbeperkt») en blijft naar behoefte instelbaar."),
        ("nl/mail/modes.md",
         "- Vertrouwde apparaten: na het aanvinken van «Niet opnieuw vragen op dit apparaat» bij aanmelding en het doorlopen van de tweestapsverificatie blijft het apparaat 30 dagen van herverificatie vrijgesteld;",
         "- Vertrouwde apparaten: na het aanvinken van «Niet opnieuw vragen op dit apparaat» tijdens de tweestapsverificatie blijft het apparaat 30 dagen van herverificatie vrijgesteld;"),
        ("nl/mail/modes.md",
         "een uitgeschakelde wordt niet getoond; aanmelden met een Linux DO-account wordt ook ondersteund.",
         "een uitgeschakelde wordt niet getoond."),
        ("nl/mail/settings.md",
         "de doeltaal van vertaling wordt apart ingesteld, met 17 opties",
         "de doeltaal van vertaling wordt apart ingesteld, met 16 opties"),
        ("nl/mail/settings.md", "| Interface-aanpassing |", "| Personalisatie |"),
        ("nl/mail/settings.md", "| AI Hub | AI-aanbieder", "| AI-engine en modelintegratie | AI-aanbieder"),
        ("nl/mail/settings.md", "| Meldingen op de site en welkomstmail |", "| Aankondiging |"),
        ("nl/mail/settings.md", "| Beleid van het auditrapport |", "| Operatierapporten |"),
        ("nl/mail/features.md",
         "- **Aanmelden met Linux DO**: aanmelden met een Linux DO-account wordt ondersteund (betrokken gegevens: zie de [Lijst van verwerkers](/nl/mail/sub-processors/)).\n",
         ""),
        ("nl/mail/project.md",
         "Per 4 oktober 2026 telt de hoofdrepository meer dan 560 commits; deze site (EpomailDocs, een aparte git-repository) komt daar nog eens meer dan 45 commits bij",
         "Per 5 oktober 2026 telt de hoofdrepository meer dan 660 commits; deze site (EpomailDocs, een aparte git-repository) komt daar nog eens meer dan 50 commits bij"),
        ("nl/mail/project.md",
         "| 13. Duurzame exploitatie van de documentatiesite | 2026-10-01 → 10-04 | lokale demo-instantie en seedtool; v5.8 visuele en ingangspolijsting; v5.9 uitbreiding van functiegids/architectuur (×6 talen) met echte productscreenshots; v5.9 onafhankelijke audit met volledige verificatie van claims tegen de broncode | `26f6c3b` `8a60539` |",
         "| 13. Duurzame exploitatie van de documentatiesite | 2026-10-01 → 10-04 | lokale demo-instantie en seedtool; v5.8 visuele en ingangspolijsting; v5.9 uitbreiding van functiegids/architectuur (×6 talen) met echte productscreenshots; v5.9 onafhankelijke audit met volledige verificatie van claims tegen de broncode | `26f6c3b` `8a60539` |\n"
         "| 14. Auditgovernance en uitbreiding van de projectintroductie | 2026-10-04 → 10-05 | v5.10 onafhankelijke auditgovernance (volledige claim-tot-broncorrecties, «en» opgenomen in de structuursymmetrie); v5.11 pagina's voor bedrijfsmodi en instellingsgids (×6 talen, echte productscreenshots); herbouw van de auditconsole (RBAC en D1-persistentie) en OAuth-functievlag | `08448fb` `ff4e93f` `596e7c1` |"),
        ("nl/mail/project.md",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查",
         "33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查\n" + MAIN_CHAIN_APPEND),
        ("nl/mail/project.md",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a",
         "e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a\n" + DOCS_CHAIN_APPEND),
    ],
}

VERSION_PATTERNS = ["版本：5.11", "Version: 5.11", "Versión: 5.11", "Version : 5.11", "Versie: 5.11"]


def main() -> int:
    failures = []
    touched = set()
    for lang, pairs in EDITS.items():
        for rel, old, new in pairs:
            path = ROOT / rel
            text = path.read_text(encoding="utf-8")
            n = text.count(old)
            if n != 1:
                failures.append(f"[{lang}] {rel}: 预期 1 次命中，实际 {n} 次：{old[:60]!r}")
                continue
            path.write_text(text.replace(old, new), encoding="utf-8")
            touched.add(str(path))

    # E. 版本号 5.11 → 5.12（每文件恰一处）
    for lang, sub in LANGS.items():
        for path in sorted((ROOT / sub).glob("**/*.md")):
            text = path.read_text(encoding="utf-8")
            hit = None
            for pat in VERSION_PATTERNS:
                c = text.count(pat)
                if c == 1:
                    hit = pat
                    break
                if c > 1:
                    failures.append(f"[version] {path}: 模式 {pat!r} 命中 {c} 次")
                    hit = None
                    break
            if hit is None and not any(p in text for p in VERSION_PATTERNS):
                failures.append(f"[version] {path}: 未找到 5.11 版本行")
                continue
            if hit:
                path.write_text(text.replace(hit, hit.replace("5.11", "5.12")), encoding="utf-8")
                touched.add(str(path))

    if failures:
        print("FAILED:")
        for f in failures:
            print("  " + f)
        return 1
    print(f"OK: {len(touched)} files touched")
    for t in sorted(touched):
        print("  " + t)
    return 0


if __name__ == "__main__":
    sys.exit(main())
