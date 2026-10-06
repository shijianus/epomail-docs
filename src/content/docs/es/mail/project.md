---
title: Presentación del proyecto EpoCanvas Mail
description: Presentación completa del proyecto EpoCanvas Mail—posicionamiento, funciones principales, arquitectura técnica, diseño de seguridad, historial de desarrollo y cadena completa de commits.
---

**Primer commit: 21 de julio de 2026 | Versión actual: v1.1.0 | Licencia: MIT**

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.16**

EpoCanvas Mail es un servicio de correo electrónico de código abierto que funciona en la red edge de Cloudflare. Con un solo dominio y una cuenta de Cloudflare, puedes montar un servicio de buzones propio con envío y recepción de correo, adjuntos y acceso multiplataforma. El proyecto se explota como instancia alojada en [mail.epocanvas.com](https://mail.epocanvas.com), publica su código fuente completo para autoalojamiento y ofrece una aplicación Android acompañante (epomail). Esta página describe el posicionamiento del proyecto, sus funciones, su arquitectura técnica, su diseño de seguridad y su historial de desarrollo; los términos legales del servicio y las prácticas de privacidad figuran en la [Descripción general de privacidad y condiciones](/es/mail/overview/).

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional. Los documentos jurídicos y técnicos de este sitio siguen la implementación de código abierto del servicio y buscan establecer normas de comunicación comunitarias transparentes, rigurosas y no comerciales.

![Arquitectura del sistema de EpoCanvas Mail: la capa de clientes (aplicación web, aplicación Android, aplicaciones de terceros OAuth) se conecta a través del edge de Cloudflare; los Workers sostienen la API, el análisis del correo entrante y las funciones de IA, con envío saliente vía Resend y Telegram; los datos se guardan en dos bases D1, KV y almacenamiento de objetos](/images/mail/es/project-architecture.svg)

*Figura: Arquitectura del sistema. Los clientes se conectan por el edge, sin servidor de origen único; el correo entrante lo recibe y analiza Email Routing, y el envío saliente pasa por el canal de Resend; todo el estado queda en los recursos de Cloudflare del propio desplegador.*

## 1. Posicionamiento

Operar un sistema de correo propio exige un servidor mantenido a largo plazo, una IP fija y gestión antispam; los servicios de buzón comerciales, por su parte, concentran los datos en manos del proveedor, y el usuario difícilmente puede verificar cómo se tratan. EpoCanvas Mail toma una tercera vía: el servicio completo cabe dentro de la cuota medida de Cloudflare (cómputo Workers, bases de datos D1, caché KV, almacenamiento de objetos R2), se entrega sin servidores, con coste fijo de servidor cero y código totalmente abierto.

- Sin carga de operación: tras el despliegue no hay mantenimiento de sistema ni de certificados; el escalado y la aceleración global los gestiona Cloudflare;
- Propiedad de los datos: todos los datos de una instancia autoalojada residen en la base D1 y el almacenamiento de objetos del propio desplegador; el código no integra ninguna telemetría;
- Doble uso: registrarse en la instancia alojada, o tomar el código fuente y desplegarlo en el dominio propio. La asignación del responsable del tratamiento en cada escenario figura en la sección 2 de la [Descripción general](/es/mail/overview/).

## 2. Resumen de funcionalidades

El proyecto abarca envío y recepción, organización, búsqueda, automatización y plataforma abierta; el detalle de cada función con capturas de pantalla reales está en la [Guía de funciones](/es/mail/features/). Puntos clave: entrada vía Cloudflare Email Routing y salida multicanal; bandeja de entrada con ocho vistas, hilos de conversación y vista de tres paneles; sintaxis de búsqueda avanzada y motor de reglas de clasificación; extracción de códigos de verificación con Workers AI y traducción íntegra que conserva el formato; centro OAuth 2.0 / OIDC y tokens de API personales; y exportación de datos (JSON y .eml).

Cada interfaz y ruta se recorre en el [Mapa de interfaz y rutas](/es/mail/interface/); la referencia completa de los operadores de búsqueda y del motor de reglas de clasificación está en la [Referencia de búsqueda y reglas](/es/mail/search/).
## 3. Resumen de la arquitectura

El servidor funciona sobre Cloudflare Workers (sandbox V8 Isolate sin estado); los datos residen en dos bases D1 físicamente aisladas (base de usuarios y base de correo, con retrocompatibilidad del 100 % en despliegues de una sola base), KV y almacenamiento de objetos (cadena de cuatro niveles: S3 propio, S3 configurado, R2, KV); la entrada llega vía Email Routing, la salida usa canales como Resend / Mailjet, y la IA corre en Workers AI. Topología completa, cifrado, cuotas por rol y ciclo de vida del correo: véase [Arquitectura técnica](/es/mail/architecture/).

## 4. A quién conviene y a quién no

El proyecto conviene en las siguientes situaciones:

- personas o equipos pequeños que ya disponen de un dominio y una cuenta de Cloudflare y desean un buzón sin coste fijo de servidor;
- usuarios que se autoalojan y desean un código fuente auditable con todos los datos dentro de su propia cuenta;
- usuarios individuales que necesitan buzones aislados, clasificación automática y extracción instantánea de códigos de verificación para correos de registro.

Valore una alternativa en las siguientes situaciones:

- escenarios empresariales que exijan compromisos de disponibilidad, soporte formal o conservación de archivos a largo plazo: el servicio no ofrece SLA y el correo de la papelera se suprime físicamente 7 días después de la recepción (véanse los [Términos del servicio](/es/mail/terms-of-service/), Sección 8);
- usos centrados en el envío masivo de marketing: la Política de uso aceptable prohíbe el correo comercial masivo no solicitado (véase la [Política de uso aceptable](/es/mail/acceptable-use/), Sección 3);
- comunicaciones que requieran cifrado de extremo a extremo: el cifrado del servicio es estático en el lado del servidor y no cubre los adjuntos (véase [Tratamiento de datos y seguridad](/es/mail/data-security/), Sección 3);
- usuarios que no deseen mantener los recursos de Cloudflare, el dominio y la configuración de claves: la autoimplementación sigue requiriendo la inyección de secretos y la inicialización (véase la Sección 8).

## 5. Resumen del diseño de seguridad

Las contraseñas se almacenan como hashes PBKDF2-HMAC-SHA256 (100.000 iteraciones) con sal; las claves TOTP se cifran en reposo con AES-256-GCM; las URL del correo usan hashes aleatorios de 20 caracteres firmados con HMAC-SHA256 contra la escalada de privilegios y la enumeración; triple defensa XSS y bloqueo SSRF; entrega del correo oficial como instantáneas inmutables. Estas medidas se cerraron en el endurecimiento integral de seguridad del 22 de septiembre de 2026 (43 aserciones automatizadas en verde); la lista completa está en [Arquitectura técnica](/es/mail/architecture/), Sección 7, y las informaciones y plazos de conservación debidos a las personas en [Procesamiento de Datos y Seguridad](/es/mail/data-security/).

## 6. Historial de desarrollo y cadena de commits

El proyecto se desarrolla de forma continua desde el primer commit del 21 de julio de 2026 (`2bbb582`). A fecha de 5 de octubre de 2026, el repositorio principal acumula más de 660 confirmaciones; este sitio (EpomailDocs, repositorio git separado) suma otras más de 50 confirmaciones (las listas siguientes son de granularidad de hitos; las confirmaciones intermedias y posteriores están en GitHub). La tabla siguiente recoge los hitos por fases con sus commits de anclaje (hash cortos):

| Fase | Periodo | Entregas | Commits de anclaje |
| --- | --- | --- | --- |
| 1. Cimientos | 2026-07-21 → 07-23 | Inicialización del repositorio; interfaz Vue 3 fase uno (paleta global, tipografía, barra lateral clara y oscura); lectura dividida de tres columnas estilo Outlook | `2bbb582` `29f9896` `a531341` |
| 2. Marca y capa de inicio de sesión | 2026-08-05 → 08-09 | Logotipo transparente y favicon unificados; tema oscuro predeterminado y animación de carga de marca; capa de inicio de sesión en React con la animación de viaje espacial | `6572695` `e3e57c6` |
| 3. Prototipo y motor de reglas | 2026-08-12 → 08-17 | Interfaz de prototipo aplicada por completo; sistema de etiquetas sincronizado con el backend; aplazar／spam／papelera; motor de reglas de clasificación (plantillas predeterminadas, heurística, interceptación estricta por listas); sintaxis de búsqueda avanzada; panel analítico de clasificación; bloqueo antifuerza bruta | `8664f84` `803b0e0` `0b7e37d` `643edea` `79f200f` |
| 4. Editor y correo de bienvenida | 2026-08-28 → 08-30 | Cuadro de diálogo a pantalla completa del correo de bienvenida; barra de herramientas TinyMCE Alloy reconstruida con 17 herramientas Markdown | `9f6ece8` `59bfe60` |
| 5. Plataforma abierta y almacenamiento | 2026-09-03 → 09-06 | Centro de autenticación OAuth 2.0／OIDC; aislamiento físico de doble D1; almacenamiento B2／S3 propio con medición de cuotas; centro de gestión de almacenamiento y bases de datos; 6 grupos de roles y entorno de pruebas para visitantes | `9fd02b7` `2cc2801` `b1a6a0e` `6c5bda2` `f09c963` |
| 6. Funciones de IA | 2026-09-06 → 09-13 | Arquitectura de recepción estilo Gmail y traducción completa con IA; más de 300 iconos vectoriales sin conexión; pool de modelos de AI Hub y pruebas a cero tokens; traducción concurrente por fragmentos y subtítulos OCR | `deceaaa` `5676837` `d103cd4` `8a0dc3e` |
| 7. Restricción de permisos y correcciones de seguridad | 2026-09-09 → 09-11 | GitHub Release v1.1.0; corrección de la vulnerabilidad zero-day de escalada de privilegios entre dominios; inicio de sesión de administrador multidominio; panel de aplicaciones de terceros y compartición de datos | `7558fc8` `5855db1` `3234d69` |
| 8. Internacionalización en seis idiomas | 2026-09-14 → 09-17 | Seis idiomas en todo el proyecto con diccionarios sin fugas; plantillas de correo enviadas en el idioma del destinatario; publicación completa en GitHub; puesta en producción en Cloudflare | `aa1955e` `42c33f1` `25985b1` |
| 9. Verificación en dos pasos y auditorías | 2026-09-18 → 09-22 | Inicio de sesión TOTP／Passkey; cadena de arranque de despliegue reconstruida y aislamiento de secretos; lotes de correcciones de la auditoría de IU; endurecimiento de seguridad completo | `b025153` `5cfdaf9` `7ee3a66` |
| 10. Experiencia estilo Gmail | 2026-09-25 → 09-27 | Diseño por capas del detalle del mensaje; respuesta en línea y reacciones con emojis; mejora de las conversaciones; enrutado y enlaces profundos estilo Gmail; enrutado antimanipulación con hash criptográfico | `a8d841a` `4af2985` `4b371a8` |
| 11. Sitio de documentos legales | 2026-09-27 → 09-29 | Conjunto legal de este sitio en seis idiomas y siete documentos; ampliación según el paradigma de las páginas de Google; construcción del sitio con Astro 5 + Starlight; repositorio git separado | `2bed02b` `617cccf` |
| 12. Finalización y auditoría previa al lanzamiento | 2026-09-29 → 09-30 | Integración de la página del proyecto y de la política de privacidad oficial; reescritura completa v5.0 sin citas de números de artículos; calibración de hechos técnicos y ampliación de la lista de encargados del tratamiento antes del lanzamiento | `7ad5ebc` `05c222c` `5197f50` |
| 13. Operación sostenida del sitio de documentación | 2026-10-01 → 10-04 | instancia de demostración local y herramienta de siembra; pulido visual y de entrada v5.8; expansión v5.9 de guías de funciones/arquitectura (×6 idiomas) con capturas reales del producto; auditoría independiente v5.9 con verificación integral afirmación-fuente | `26f6c3b` `8a60539` |
| 14. Gobernanza de auditoría y ampliación de la presentación | 2026-10-04 → 10-05 | gobernanza de auditoría independiente v5.10 (revisión integral afirmación-fuente, «en» incorporada a la simetría estructural); páginas v5.11 de modos de funcionamiento y guía de ajustes (×6 idiomas, capturas reales del producto); reestructuración de la consola de auditoría (RBAC y persistencia en D1) e indicador de función OAuth | `08448fb` `ff4e93f` `596e7c1` |

Cadena completa de commits de anclaje del repositorio principal (hashes completos de 40 caracteres, verificables uno a uno en el historial de GitHub):

```text
2bbb582e19b8a1aca410767a5b5c52ae5d7f4423  2026-07-21  init: initial commit before UI/UX updates
29f98962399ec85c894fbc02ff6ef69d7d496222  2026-07-23  feat(ui): implement 3-column split view layout for mail reading
65726950939d72d82dbaccd974ff1a75ffe1b226  2026-08-06  feat: default dark theme & apply brand loading animation
e3e57c69a6154bc13218be27a6537711e0a21527  2026-08-09  Enhance: Upgrade collision warning to a high-tech sci-fi HUD
8664f84cce7d2fdb038322f8bf66c5189f93f33d  2026-08-12  Phase 1: Refactor UI/UX colors and layout to match prototype style
803b0e05d2d55bbcbb3b0f4d4279524c31524c21  2026-08-13  feat: implement advanced search syntax and highlighting
0b7e37d953e2a25ff74dcf313272632fb60ba9c8  2026-08-13  fix(labels): ensureDefaultRules injection + system rule lock UI + real heuristic engine
643edea268fb8dc4f67b4bfe17db49025f6c7662  2026-08-15  feat(ui): phase 3 - classification management analytics dashboard
79f200fcb1a401e08c4d89ff94b8c3a65b51aef0  2026-08-16  feat: enhance login UX with toast and 12h anti-brute force lockout
9fd02b75dcaa31e1c12c2424b3b9c52b19eab203  2026-09-03  feat(oauth): 管理员专属 OAuth 开放平台与应用管理独立分区上线及个人资料解耦清退
2cc2801ccec3d9ee07d5b1688f2af652d7dc25a2  2026-09-03  feat(db): introduce dual-db physical isolation architecture with 100% single-db backward compatibility
b1a6a0ebe02a5bb196bf5da601a182f022ab1664  2026-09-03  feat(storage): implement Backblaze B2 and S3 object storage with pure WebCrypto SigV4 presigner
6c5bda2b794fef6f9467a5d880ae2fede77824cd  2026-09-04  feat(db): 系统设置「存储与核心数据库」管理中心上线与第三方DB配置体系全量重构
f09c963752e731d3e308893fa6ed09d1212713e8  2026-09-06  feat(role): 细化6大核心管理组权限控制规范、开源参观者沙箱交互、博客等级联动与UI架构透视全景上线
deceaaa5b3e7589c63c2240df97b020bab5c2c14  2026-09-06  feat(content): 学习Gmail收件UI架构，升级to-me详情卡片、顶部操作栏与AI全文翻译及管理面板API密钥集成
56768378f4d83b9eb70e65376930cfa16db16209  2026-09-07  feat(icons): 系统级全量300+离线矢量图标重构、零网络请求秒开与满Icon状态闭环
d103cd4edd4fbedbeaec669fc068bed2c5648dfa  2026-09-08  feat(ai-hub): automated dropdown model detection, multi-model pool role hierarchy, and real prompt live test response
aa1955eeb1b564f11a370892c48ea94f7c21015f  2026-09-14  feat: 全专案主流多语言支持(正体中文/法/西/荷)、多语言欢迎邮件、网站公告全域公告邮件
25985b1d0ca1c71e59222a3ecb3a9c53532834ef  2026-09-17  fix(prod): 生产环境Cloudflare正式上线、Playwright真机视觉全链路核验、Vue-i18n转义与抽屉缺陷修复
b0251537e0a56b7d3b80f794ce79ff839871f945  2026-09-18  feat(auth): 登录界面两步验证 (TOTP/Passkey) 流体动效与丝滑交互重构
5cfdaf910bd628d183f0b6d102134d1042f2e7df  2026-09-19  fix(core): 三大核验缺陷全量修复、全新部署引导链重构与密钥安全体系隔离
7ee3a66d5fb17c44983ff2b7f35534d82c815524  2026-09-22  fix(security): 全量安全加固与漏洞闭环——P0/P1/P2防护/SSRF阻断/XSS三重防御/会话脱敏/权限对齐
a8d841a13c3a0aa31b72c1d82580f2e9c7a1e561  2026-09-25  feat(ui): 对齐 Gmail 邮件详情排版分层与悬浮快捷回复体验
4b371a834458cb2be6ab5766ec15e99a91bc2022  2026-09-27  feat(routing): 严格对齐 Gmail 多账户隔离与密码学 Hash 防越权路由架构
617cccf855a0bd9a0a46d37deaceacc4a8b0ddde  2026-09-29  docs(repo): EpomailDocs 独立为专用 git 仓库，自父仓库解除追踪
4cf8014279669dbc67ff54ceb47239044c943ac8  2026-10-03  docs(checklist): 归档 EpomailDocs v5.8 视觉与入口打磨轮流水（EpomailDocs a1c1e89——翻页卡图标/表格居中/Accept-Language 协商）
8a60539d318eef618b84aa0db4e8a88672c4940d  2026-10-04  docs(checklist): 归档 EpomailDocs v5.9 专案文档拆分扩充轮流水（EpomailDocs beb956a——功能指南/技术架构两新页×6 语言、真实产品截图、内容栏居中根治、本地演示实例）
26f6c3b9750b2bad1c60f35a9a08b4db11dc1a6b  2026-10-04  feat(demo): 本地演示实例播种工具——seed-demo.py 演示邮件生成器与 wrangler-demo.toml 本地配置忽略
33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): EpomailDocs v5.9 独立审计——介绍与法律内容全量对码与完整性核查
21af692803770c94ac2cfbdec5c32624e45754ce  2026-10-03  feat(sys-setting): 新增底层特性开关 ENABLE_OAUTH_INTEGRATION 并默认关闭隐藏第三方认证设置
73a2561d3e91867a2b9e442bebe8366a639b5914  2026-10-04  feat(audit): refactor audit console to user-list standards with RBAC and D1 persistence
596e7c1f4e4d022f3573917cfd56f72b65ae0136  2026-10-05  docs(checklist): 归档 EpomailDocs v5.11 专案介绍扩充轮流水（EpomailDocs ff4e93f+c597fca——运行模式/设置指南两新页×6 语言、9 张真实产品截图、全站 5.11 版本同步、本地视觉验证全绿）
```

Cadena de commits de este sitio (repositorio EpomailDocs separado):

```text
fd57a71ab71d99ff61b83a9a7c4f4b191dd96b99  2026-09-28  feat: initial commit for epomail-docs with open-source and legal compliance documentation
5208abc054626e305a5caac3e7320219706e3785  2026-09-29  docs(legal): 法律文档站 v4.1——台湾法域全量定稿（6 语言 × 7 篇 × 42 页）
5fb18df6a9c317bf064b477d143a53eb0d54bf07  2026-09-29  docs(visual)+chore: aup-ladder.svg 布局重构消除遮挡，视觉验收与归档流水
270cfd12c365b406661b5f40219740547d2b7d99  2026-09-29  fix(site): 补全根路径跳转页，/ 404 → 六语言总览入口
7ad5ebc1bc3b2846d0932c872ef7666b0d07d6bb  2026-09-29  docs(project): 新增六语言专案介绍页——定位、功能、架构、安全与完整提交链路
5cc2b2f12d00f195d0e84cea34911f1b3390ce6b  2026-09-28  feat(legal): integrate official privacy policy and technical baseline spec
d7beca35a2db489e75ff865435f95f20e68fd27f  2026-09-28  docs(audit): enrich architecture & legal compliance per subagent audits
d3d1d309888f92e7c30c217c13a4f5b02781202b  2026-09-29  docs(repo): 采纳远端旧结构文档线为历史祖先，树以本地六语言法律文档站为准
05c222c4ff2531dc17b29994c0806ade1ed99ed0  2026-09-29  docs(legal): 法律文档站 v5.0——全站去条号引用，六语言 × 7 篇 × SVG 配图全量同步
52412e393613a8b2763d133a95f6a3205e8cb6ce  2026-09-30  docs(legal): v5.1 独立审计修订——第三方清单增补博客等级联动披露、时效数据校正与工具补盲
5197f5092861b7db24f1d428991c7db057612ae3  2026-09-30  docs(legal): 上线前审计修订——系统邮件不可变投递事实校准、AI 翻译预置模板披露、robots.txt
79094ac9d2686c1014c25824b25318c6206c9270  2026-09-30  docs(legal): v5.2 内容完善——正式版本条款全站覆盖、专案介绍增补适用边界与常见疑问
90c06edcdd29a90a991bd56ba480c031cf85a9cf  2026-09-30  docs(legal): v5.3——独立复审缺陷治理与发布链路定案（docs.epocanvas.com/epomail）
6da475e6a7bd1f892e00165031ad94d5bacdb872  2026-10-01  docs(legal): v5.4 内容完整性补齐——配图全覆盖、术语补定义、保留期缺项与引用精度
3223e7d6181a6b82192f225eaded3ed8ddab0a56  2026-10-01  feat(legal): integrate official mail specifications and complete anti-tampering verification engine
e6eb758709b6702b3b51fddb1057bee94380a3e7  2026-10-03  docs(legal): v5.7 全站去幻觉与六语言深度整合——源码事实校准、en 九篇 1:1 重译、配图扁平化重绘
c5de61f5e1330726fe31257588ee21fdec178d8e  2026-10-03  feat(figures): 十二张原理图全量六语言本地化——每种语言的文档配该语言的图
fcc1d10f9616b905e1c6b89ccb4e6f8ac953c476  2026-10-03  docs(legal): v5.8 独立复审打磨——P1/P2 全项治理、八项补章、全站单 h1 与首次公网发布
a1c1e89c4e8b85579346304df3d5b37d197b68db  2026-10-03  feat(ui)+feat(infra): v5.8 视觉与入口打磨——翻页卡文档图标、表格居中与 Accept-Language 入口协商
beb956a1b50b5c4b94d3bbc9b9feba8ef774417a  2026-10-03  feat(docs): v5.9 专案文档拆分扩充——功能指南/技术架构两新页 ×6 语言 + 真实产品截图 + 内容栏居中
e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a
68a014ce25cca575ec348f68db746419fd19e2ce  2026-10-04  chore: sync manifest commit hash for 08448fb
08448fb63b011699b129e69266e7150a2174a49e  2026-10-04  feat(docs): v5.10 独立审计治理轮——P1×3 全量对码修订、P2 全项落地、en 纳入结构对称校验
ff4e93f7bb9da6ee1a4729cb2d826b1993fe5167  2026-10-05  feat(docs): v5.11 专案介绍扩充——运行模式/设置指南两新页 ×6 语言与真实产品截图全量入库
c597fca8b14005a6fc7a3482d683b9a2937c55d8  2026-10-05  chore: sync manifest commit hash for ff4e93f
```

La tabla y la cadena de anclaje anteriores están a escala de hitos; cada corrección, prueba y commit de documentación entre fases se conserva en el historial de git y puede rastrearse uno a uno en el [historial de commits de GitHub](https://github.com/shijianus/epomail/commits). El repositorio principal guarda además dos archivos de archivo, `CHECKLIST.log` (registro de ejecución de tareas) y `REPORTS.md` (informes de auditoría en profundidad), en correspondencia uno a uno con los commits.

## 7. Garantía de calidad

- El directorio `tests/` contiene más de un centenar de scripts de pruebas, auditoría e inspección automatizadas, que cubren la regresión de navegador con pila completa Playwright, aserciones extremo a extremo públicas contra producción y análisis estáticos de todo el repositorio;
- Comprobaciones cuantificadas representativas: endurecimiento de seguridad 43／43 aserciones, enrutado público extremo a extremo 32／32, pantalla de inicio de sesión en seis idiomas 62／62, inspección sensorial 33／33 y 369 comparaciones de integridad de producción byte a byte;
- Triple auditoría estática de i18n: `i18n-symmetry` (conjuntos de claves absolutamente simétricos entre los seis idiomas), `i18n-audit` (cero referencias literales ausentes) e `i18n-hardcoded` (cero texto visible codificado sin envolver);
- Cero residuos de datos de prueba: cada caso de prueba limpia físicamente en un bloque `finally`; la base de datos y el KV no contienen datos falsos;
- El desarrollo sigue un SOP de cinco pasos (confirmación del alcance, codificación disciplinada, pruebas con pila completa, commits disciplinados e informe al inicio de la respuesta), con resultados repartidos entre `CHECKLIST.log` y `REPORTS.md`.

## 8. Obtener el proyecto y desplegarlo

| Vía | Descripción |
| --- | --- |
| Instancia alojada | Registrarse y usar directamente [mail.epocanvas.com](https://mail.epocanvas.com) |
| Autoalojamiento | Desplegar en el dominio y la cuenta de Cloudflare propios en tres pasos |
| Código fuente | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) (licencia MIT) |
| Aplicación móvil | La aplicación Android, epomail |

Pasos mínimos de autoalojamiento:

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

Tras el primer despliegue, visita `/api/init/<jwt_secret>` para completar la inicialización de la base de datos y la siembra de los seis roles estándar; los secretos de producción se inyectan siempre con `npx wrangler secret put`, y el desarrollo local usa `.dev.vars` (nunca versionado).

Los requisitos previos completos, la cadena de arranque de la inicialización y la inyección de secretos para el autoalojamiento están en la [Guía de despliegue](/es/mail/deployment/); contribuir, auditar y desarrollar siguen la [Guía de desarrollo](/es/mail/development/).
## 9. Preguntas frecuentes

**¿Usar este servicio cuesta algo?**
El software es gratuito bajo la licencia MIT; el coste de la autoimplementación es su propio consumo de Cloudflare. La instancia alojada actualmente no tiene funciones de pago; el número de buzones, el volumen de envío y las cuotas de almacenamiento se establecen según el rol de la cuenta.

**¿Puede el administrador leer mi correo?**
Depende del modo de correo de la instancia: en el modo «Todo» el administrador puede leer todo el correo; en el modo «Privado» solo el spam, el correo eliminado y el sin propietario; en el modo «Cifrado» la interfaz de administración no devuelve correo de usuario. Véase el alcance del cifrado en la [Política de privacidad](/es/mail/privacy-policy/), Sección 10.

**¿Se puede recuperar el correo eliminado?**
El correo de la papelera se suprime físicamente 7 días después de la recepción y no se puede recuperar; conserve antes una copia mediante «Configuración → Exportar datos» (véase la [Política de privacidad](/es/mail/privacy-policy/), Sección 8).

**¿Qué se necesita para la autoimplementación?**
Un dominio y una cuenta de Cloudflare; los pasos de despliegue y la inyección de secretos están en la Sección 8. Todos los datos permanecen en los recursos de Cloudflare del implementador y el código no contiene telemetría.

## 10. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| La ruta y los elementos de cada interfaz | [Mapa de interfaz y rutas](/es/mail/interface/) |
| Operadores de búsqueda y condiciones de reglas de clasificación | [Referencia de búsqueda y reglas](/es/mail/search/) |
| Pasos completos para el autoalojamiento | [Guía de despliegue](/es/mail/deployment/) |
| Entorno de desarrollo y flujo de ingeniería | [Guía de desarrollo](/es/mail/development/) |
| Lo que ofrece la instancia alojada y sus canales de soporte | [Alcance del servicio y soporte](/es/mail/service-scope/) |
| La licencia de código abierto y la posición jurídica del autoalojamiento | [Marco legal del código abierto y el autoalojamiento](/es/mail/open-source/) |
| Modos de funcionamiento: formas de despliegue, modos de correo e inicio de sesión | [Modos de funcionamiento](/es/mail/modes/) |
| Guía de configuración: configuración personal y consola de administración | [Guía de configuración](/es/mail/settings/) |
| Descripción general de privacidad y condiciones | [Descripción general](/es/mail/overview/) |
| Política de privacidad | [Política de privacidad](/es/mail/privacy-policy/) |
| Términos del servicio | [Términos del servicio](/es/mail/terms-of-service/) |
| Política de uso aceptable | [Política de uso aceptable](/es/mail/acceptable-use/) |
| Tratamiento de datos y seguridad | [Tratamiento de datos y seguridad](/es/mail/data-security/) |
| Lista de encargados del tratamiento | [Lista de encargados del tratamiento](/es/mail/sub-processors/) |
| Definiciones | [Definiciones](/es/mail/key-terms/) |
