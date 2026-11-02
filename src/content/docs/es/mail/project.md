---
title: Presentación del proyecto EpoCanvas Mail
description: Presentación completa del proyecto EpoCanvas Mail—posicionamiento, funciones principales, arquitectura técnica, diseño de seguridad, historial de desarrollo y cadena completa de commits.
---

**Primer commit: 21 de julio de 2026 | Versión actual: v1.1.0 | Licencia: MIT**

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

EpoCanvas Mail es un servicio de correo electrónico de código abierto que funciona en la red edge de Cloudflare. Con un solo dominio y una cuenta de Cloudflare, puedes montar un servicio de buzones propio con envío y recepción de correo, adjuntos y acceso multiplataforma. El proyecto se explota como instancia alojada en [mail.epocanvas.com](https://mail.epocanvas.com), publica su código fuente completo para autoalojamiento y ofrece una aplicación Android acompañante (epomail). Esta página describe el posicionamiento del proyecto, sus funciones, su arquitectura técnica, su diseño de seguridad y su historial de desarrollo; los términos legales del servicio y las prácticas de privacidad figuran en la [Descripción general de privacidad y condiciones](/es/mail/overview/).

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional. Los documentos jurídicos y técnicos de este sitio siguen la implementación de código abierto del servicio y buscan establecer normas de comunicación comunitarias transparentes, rigurosas y no comerciales.

![Arquitectura del sistema de EpoCanvas Mail: la capa de clientes (aplicación web, aplicación Android, aplicaciones de terceros OAuth) se conecta a través del edge de Cloudflare; los Workers sostienen la API, el análisis del correo entrante y las funciones de IA, con envío saliente vía Resend y Telegram; los datos se guardan en dos bases D1, KV y almacenamiento de objetos](/images/mail/es/project-architecture.svg)

*Figura: Email Routing analiza el correo entrante y los canales configurados entregan el saliente. Los datos pueden llegar a servicios externos de almacenamiento, identidad, avisos o IA; véase la [Lista de encargados](/es/mail/sub-processors/).*

## 1. Posicionamiento

Operar un sistema de correo propio exige un servidor mantenido a largo plazo, una IP fija y gestión antispam; los servicios de buzón comerciales, por su parte, concentran los datos en manos del proveedor, y el usuario difícilmente puede verificar cómo se tratan. EpoCanvas Mail toma una tercera vía: el servicio completo cabe dentro de la cuota medida de Cloudflare (cómputo Workers, bases de datos D1, caché KV, almacenamiento de objetos R2), se entrega sin servidores, con coste fijo de servidor cero y código totalmente abierto.

- Sin carga de operación: tras el despliegue no hay mantenimiento de sistema ni de certificados; el escalado y la aceleración global los gestiona Cloudflare;
- Autonomía: quien despliega elige recursos y servicios externos. El código procesa señales de seguridad y guarda registros. No se encontró un canal dedicado de telemetría de uso al autor original; sí existen logs y solicitudes a terceros. Véase [Privacidad](/es/mail/privacy-policy/);
- Doble uso: registrarse en la instancia alojada, o tomar el código fuente y desplegarlo en el dominio propio. La asignación del responsable del tratamiento en cada escenario figura en la sección 2 de la [Descripción general](/es/mail/overview/).

## 2. Resumen de funcionalidades

El proyecto abarca envío y recepción, organización, búsqueda, automatización y plataforma abierta; el detalle de cada función con capturas de pantalla reales está en la [Guía de funciones](/es/mail/features/). Puntos clave: entrada vía Cloudflare Email Routing y salida multicanal; bandeja de entrada con ocho vistas, hilos de conversación y vista de tres paneles; sintaxis de búsqueda avanzada y motor de reglas de clasificación; extracción de códigos de verificación con Workers AI y traducción íntegra que conserva el formato; centro OAuth 2.0 / OIDC y tokens de API personales; y exportación de datos (JSON y .eml).

Cada interfaz y ruta se recorre en el [Mapa de interfaz y rutas](/es/mail/interface/); la referencia completa de los operadores de búsqueda y del motor de reglas de clasificación está en la [Referencia de búsqueda y reglas](/es/mail/search/).

El sitio de documentación ofrece siete idiomas; la interfaz del producto ofrece actualmente seis, sin alemán. Por ello, los documentos alemanes usan capturas de la interfaz inglesa de `/images/mail/en/ui/` para los recorridos localizados. Las capturas compartidas existentes en `/images/mail/ui/` conservan su idioma de interfaz original, indicado en el pie de imagen o el texto alternativo. El texto, los pies de imagen y los diagramas siguen en alemán. Estas excepciones documentadas para las capturas no implican que exista una interfaz alemana.

La cadena china `重要` es una etiqueta literal del producto que significa «importante», no texto sin traducir. Los alias de búsqueda `$发件人`, `$用户`, `$收件人` y `$主题` también deben conservarse literalmente; corresponden a `$sender`, `$user`, `$to` y `$subject`, respectivamente. Los nombres de idiomas de la interfaz `简体中文` (chino simplificado) y `繁體中文` (chino tradicional) mantienen su escritura original. Las claves de configuración, rutas, nombres de archivo y demás constantes técnicas no cambian con el idioma de la documentación.

## 3. Resumen de la arquitectura

El servidor funciona sobre Cloudflare Workers (sandbox V8 Isolate sin estado); los datos residen en dos bases D1 físicamente aisladas (base de usuarios y base de correo, con retrocompatibilidad del 100 % en despliegues de una sola base), KV y almacenamiento de objetos (cadena de cuatro niveles: S3 propio, S3 configurado, R2, KV); la entrada llega vía Email Routing, la salida usa canales como Resend / Mailjet, y la IA corre en Workers AI. Topología completa, cifrado, cuotas por rol y ciclo de vida del correo: véase [Arquitectura técnica](/es/mail/architecture/).

## 4. A quién conviene y a quién no

El proyecto conviene en las siguientes situaciones:

- personas o equipos pequeños que ya disponen de un dominio y una cuenta de Cloudflare y desean un buzón sin coste fijo de servidor;
- usuarios de autoalojamiento que quieren código auditable y elegir su almacenamiento y servicios terceros;
- usuarios individuales que necesitan buzones aislados, clasificación automática y extracción instantánea de códigos de verificación para correos de registro.

Valore una alternativa en las siguientes situaciones:

- usos empresariales que requieren disponibilidad garantizada, soporte formal o archivo duradero: no hay SLA; la papelera se limpia según creación del mensaje superior a 7 días, sin garantizar otros 7 días después de moverlo. Véase [Privacidad](/es/mail/privacy-policy/);
- usos centrados en el envío masivo de marketing: la Política de uso aceptable prohíbe el correo comercial masivo no solicitado (véase la [Política de uso aceptable](/es/mail/acceptable-use/), Sección 3);
- comunicaciones que requieran cifrado de extremo a extremo: el cifrado del servicio es estático en el lado del servidor y no cubre los adjuntos (véase [Tratamiento de datos y seguridad](/es/mail/data-security/), Sección 3);
- usuarios que no deseen mantener los recursos de Cloudflare, el dominio y la configuración de claves: la autoimplementación sigue requiriendo la inyección de secretos y la inicialización (véase la Sección 8).

## 5. Resumen del diseño de seguridad

Las contraseñas nuevas usan por defecto PBKDF2-HMAC-SHA256 con sal (210.000 iteraciones, configurables); los hashes antiguos se actualizan al iniciar sesión y los secretos TOTP activados usan AES-256-GCM. Otros mecanismos incluyen enlaces firmados, filtros XSS, comprobaciones de direcciones salientes e instantáneas oficiales. Las 43 aserciones del 22 de septiembre de 2026 son una validación histórica, no certificación de la versión actual o de producción. Véanse [Arquitectura](/es/mail/architecture/) y [Datos y seguridad](/es/mail/data-security/).

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

A continuación figura la cadena completa de commits de anclaje del repositorio principal, con hashes de 40 caracteres verificables en GitHub. En ambas cadenas, los asuntos chinos se resumen en español; se conservan los asuntos escritos originalmente en inglés. Son resúmenes históricos, no descripciones de la versión actual. Los hashes permiten consultar los commits y sus asuntos exactos.

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
9fd02b75dcaa31e1c12c2424b3b9c52b19eab203  2026-09-03  feat(oauth): añadir una plataforma OAuth exclusiva para administradores y gestión separada de aplicaciones; retirar estas funciones del perfil personal
2cc2801ccec3d9ee07d5b1688f2af652d7dc25a2  2026-09-03  feat(db): introduce dual-db physical isolation architecture with 100% single-db backward compatibility
b1a6a0ebe02a5bb196bf5da601a182f022ab1664  2026-09-03  feat(storage): implement Backblaze B2 and S3 object storage with pure WebCrypto SigV4 presigner
6c5bda2b794fef6f9467a5d880ae2fede77824cd  2026-09-04  feat(db): añadir el centro de Almacenamiento y bases de datos centrales en los ajustes del sistema y reconstruir la configuración de bases externas
f09c963752e731d3e308893fa6ed09d1212713e8  2026-09-06  feat(role): precisar los permisos de seis grupos administrativos; añadir interacción en el entorno de visitantes, vinculación con niveles del blog y una vista de la arquitectura UI
deceaaa5b3e7589c63c2240df97b020bab5c2c14  2026-09-06  feat(content): adoptar una bandeja de entrada estilo Gmail; mejorar la tarjeta to-me, la barra de acciones, la traducción íntegra con IA y la integración de claves API en administración
56768378f4d83b9eb70e65376930cfa16db16209  2026-09-07  feat(icons): sustituir más de 300 iconos por vectores sin conexión; cargar sin solicitudes de red y cubrir todos los estados de iconos
d103cd4edd4fbedbeaec669fc068bed2c5648dfa  2026-09-08  feat(ai-hub): automated dropdown model detection, multi-model pool role hierarchy, and real prompt live test response
aa1955eeb1b564f11a370892c48ea94f7c21015f  2026-09-14  feat: incorporar chino tradicional, francés, español y neerlandés en todo el proyecto, correo de bienvenida multilingüe y anuncios por correo para todo el sitio
25985b1d0ca1c71e59222a3ecb3a9c53532834ef  2026-09-17  fix(prod): lanzar producción en Cloudflare; verificar el recorrido visual en dispositivos reales con Playwright; corregir escapes Vue-i18n y fallos del panel lateral
b0251537e0a56b7d3b80f794ce79ff839871f945  2026-09-18  feat(auth): reconstruir el acceso con verificación en dos pasos (TOTP/Passkey), animaciones fluidas e interacción mejorada
5cfdaf910bd628d183f0b6d102134d1042f2e7df  2026-09-19  fix(core): corregir tres defectos de verificación, reconstruir el arranque de despliegues nuevos y aislar la gestión de secretos
7ee3a66d5fb17c44983ff2b7f35534d82c815524  2026-09-22  fix(security): reforzar la seguridad y cerrar vulnerabilidades con protecciones P0/P1/P2, bloqueo SSRF, triple defensa XSS, ocultación de datos de sesión y alineación de permisos
a8d841a13c3a0aa31b72c1d82580f2e9c7a1e561  2026-09-25  feat(ui): alinear con Gmail la jerarquía visual del detalle del mensaje y la respuesta rápida flotante
4b371a834458cb2be6ab5766ec15e99a91bc2022  2026-09-27  feat(routing): alinear el aislamiento multicuenta con Gmail y usar rutas con hash criptográfico contra accesos no autorizados
617cccf855a0bd9a0a46d37deaceacc4a8b0ddde  2026-09-29  docs(repo): convertir EpomailDocs en un repositorio git independiente y dejar de rastrearlo desde el repositorio padre
4cf8014279669dbc67ff54ceb47239044c943ac8  2026-10-03  docs(checklist): archivar las mejoras visuales y de entrada de EpomailDocs v5.8 (EpomailDocs a1c1e89: iconos de paginación, tablas centradas y negociación Accept-Language)
8a60539d318eef618b84aa0db4e8a88672c4940d  2026-10-04  docs(checklist): archivar la ampliación documental EpomailDocs v5.9 (EpomailDocs beb956a: guías de funciones y arquitectura en seis idiomas, capturas reales, corrección del centrado del contenido y demostración local)
26f6c3b9750b2bad1c60f35a9a08b4db11dc1a6b  2026-10-04  feat(demo): añadir datos de demostración local con el generador de correos seed-demo.py e ignorar la configuración local wrangler-demo.toml
33a5b0ba6abb2af208b713a81d057d9e36e17893  2026-10-04  docs(audit): auditar de forma independiente EpomailDocs v5.9; contrastar toda la introducción y el contenido legal con el código y revisar su integridad
21af692803770c94ac2cfbdec5c32624e45754ce  2026-10-03  feat(sys-setting): añadir el indicador ENABLE_OAUTH_INTEGRATION, desactivado por defecto para ocultar los ajustes de autenticación externa
73a2561d3e91867a2b9e442bebe8366a639b5914  2026-10-04  feat(audit): refactor audit console to user-list standards with RBAC and D1 persistence
596e7c1f4e4d022f3573917cfd56f72b65ae0136  2026-10-05  docs(checklist): archivar la ampliación EpomailDocs v5.11 (EpomailDocs ff4e93f+c597fca: guías de modos y ajustes en seis idiomas, nueve capturas reales, versión 5.11 en todo el sitio y verificaciones visuales locales superadas)
```

Cadena de commits de este sitio (repositorio EpomailDocs separado):

```text
fd57a71ab71d99ff61b83a9a7c4f4b191dd96b99  2026-09-28  feat: initial commit for epomail-docs with open-source and legal compliance documentation
5208abc054626e305a5caac3e7320219706e3785  2026-09-29  docs(legal): finalizar el sitio legal v4.1 para Taiwán (seis idiomas, siete documentos, 42 páginas)
5fb18df6a9c317bf064b477d143a53eb0d54bf07  2026-09-29  docs(visual)+chore: rediseñar aup-ladder.svg para eliminar solapamientos; registrar la validación visual y archivar el trabajo
270cfd12c365b406661b5f40219740547d2b7d99  2026-09-29  fix(site): añadir la página de redirección raíz y sustituir el error 404 de / por entradas al resumen en seis idiomas
7ad5ebc1bc3b2846d0932c872ef7666b0d07d6bb  2026-09-29  docs(project): añadir la presentación del proyecto en seis idiomas con posicionamiento, funciones, arquitectura, seguridad y cadena completa de commits
5cc2b2f12d00f195d0e84cea34911f1b3390ce6b  2026-09-28  feat(legal): integrate official privacy policy and technical baseline spec
d7beca35a2db489e75ff865435f95f20e68fd27f  2026-09-28  docs(audit): enrich architecture & legal compliance per subagent audits
d3d1d309888f92e7c30c217c13a4f5b02781202b  2026-09-29  docs(repo): conservar la antigua rama documental remota como antecesora y usar el sitio legal local en seis idiomas como árbol de referencia
05c222c4ff2531dc17b29994c0806ade1ed99ed0  2026-09-29  docs(legal): v5.0 elimina las citas de números de artículos y sincroniza siete documentos e ilustraciones SVG en seis idiomas
52412e393613a8b2763d133a95f6a3205e8cb6ce  2026-09-30  docs(legal): revisión independiente v5.1; divulgar la vinculación con niveles del blog en la lista de encargados, corregir datos temporales y completar las herramientas
5197f5092861b7db24f1d428991c7db057612ae3  2026-09-30  docs(legal): revisión previa al lanzamiento; corregir los hechos sobre entrega inmutable de correo del sistema y documentar las plantillas de traducción IA predefinidas y robots.txt
79094ac9d2686c1014c25824b25318c6206c9270  2026-09-30  docs(legal): v5.2 extiende la cláusula de versión autoritativa a todo el sitio y añade límites de uso y preguntas frecuentes a la presentación
90c06edcdd29a90a991bd56ba480c031cf85a9cf  2026-09-30  docs(legal): v5.3 resuelve los hallazgos de revisión independiente y fija la ruta de publicación docs.epocanvas.com/epomail
6da475e6a7bd1f892e00165031ad94d5bacdb872  2026-10-01  docs(legal): v5.4 completa las ilustraciones, las definiciones, los plazos de conservación ausentes y la precisión de las referencias
3223e7d6181a6b82192f225eaded3ed8ddab0a56  2026-10-01  feat(legal): integrate official mail specifications and complete anti-tampering verification engine
e6eb758709b6702b3b51fddb1057bee94380a3e7  2026-10-03  docs(legal): v5.7 elimina afirmaciones sin respaldo y unifica seis idiomas; contrastar hechos con el código, retraducir nueve documentos ingleses (en) con estructura idéntica y redibujar diagramas planos
c5de61f5e1330726fe31257588ee21fdec178d8e  2026-10-03  feat(figures): localizar doce diagramas en seis idiomas para que cada documento use figuras en su propio idioma
fcc1d10f9616b905e1c6b89ccb4e6f8ac953c476  2026-10-03  docs(legal): v5.8 resuelve todos los hallazgos P1/P2, añade ocho secciones, fija un solo h1 por página y realiza la primera publicación pública
a1c1e89c4e8b85579346304df3d5b37d197b68db  2026-10-03  feat(ui)+feat(infra): v5.8 mejora la presentación y las entradas con iconos documentales en las tarjetas de paginación, tablas centradas y negociación Accept-Language
beb956a1b50b5c4b94d3bbc9b9feba8ef774417a  2026-10-03  feat(docs): v5.9 separa y amplía las guías de funciones y arquitectura en seis idiomas, con capturas reales y columna de contenido centrada
e34ce0270c42dc7b50f0add6f0a47310046cf37e  2026-10-04  chore: sync manifest commit hash for beb956a
68a014ce25cca575ec348f68db746419fd19e2ce  2026-10-04  chore: sync manifest commit hash for 08448fb
08448fb63b011699b129e69266e7150a2174a49e  2026-10-04  feat(docs): v5.10 corrige tres hallazgos P1 contrastándolos con el código y todos los P2 de la auditoría independiente; incluir la versión inglesa (en) en la comprobación de simetría estructural
ff4e93f7bb9da6ee1a4729cb2d826b1993fe5167  2026-10-05  feat(docs): v5.11 amplía la presentación con guías de modos y ajustes en seis idiomas e incorpora todas las capturas reales al repositorio
c597fca8b14005a6fc7a3482d683b9a2937c55d8  2026-10-05  chore: sync manifest commit hash for ff4e93f
```

La tabla y la cadena de anclaje anteriores están a escala de hitos; cada corrección, prueba y commit de documentación entre fases se conserva en el historial de git y puede rastrearse uno a uno en el [historial de commits de GitHub](https://github.com/shijianus/epomail/commits). El repositorio principal guarda además dos archivos de archivo, `CHECKLIST.log` (registro de ejecución de tareas) y `REPORTS.md` (informes de auditoría en profundidad), en correspondencia uno a uno con los commits.

## 7. Garantía de calidad

- El directorio `tests/` contiene más de un centenar de scripts de pruebas, auditoría e inspección automatizadas, que cubren la regresión de navegador con pila completa Playwright, aserciones extremo a extremo públicas contra producción y análisis estáticos de todo el repositorio;
- Validaciones históricas: seguridad 43/43 aserciones, rutas públicas 32/32, acceso en seis idiomas 62/62, inspección visual 33/33 y 369 comparaciones de integridad; corresponden a versiones y entornos probados entonces, sin validar la versión actual ni producción;
- Triple auditoría estática de i18n: `i18n-symmetry` (conjuntos de claves absolutamente simétricos entre los seis idiomas), `i18n-audit` (cero referencias literales ausentes) e `i18n-hardcoded` (cero texto visible codificado sin envolver);
- Las reglas de prueba exigen limpiar mediante `finally`; los residuos reales requieren comprobar los registros de ejecución. La regla no garantiza bases ni KV siempre libres de datos de prueba;
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
La visibilidad administrativa depende del modo: Todo permite todos los mensajes; Privado, spam, borrados y sin propietario; Cifrado bloquea esa lectura en la interfaz. El servidor conserva capacidad de descifrado, por lo que no es cifrado de extremo a extremo. Véanse [Privacidad](/es/mail/privacy-policy/) y [Datos y seguridad](/es/mail/data-security/).

**¿Se puede recuperar el correo eliminado?**
La papelera usa la creación del mensaje superior a 7 días; moverlo no reinicia el plazo. La exportación contiene campos seleccionados del perfil y mensajes no borrados, sin archivos adjuntos ni MIME original completo. Guarde adjuntos aparte antes de borrar y revise el archivo; véase [Privacidad](/es/mail/privacy-policy/).

**¿Qué se necesita para la autoimplementación?**
Se necesitan dominio, cuenta Cloudflare y las configuraciones pertinentes; véase la sección 8. Servicios externos de envío, almacenamiento, identidad, avisos e IA pueden tratar datos, sin garantía de que todo permanezca en Cloudflare. Véase la [Lista de encargados](/es/mail/sub-processors/).

## 10. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Las secuencias de arranque más cortas y la verificación de envío/recepción de ambas vías | [Primeros pasos](/es/mail/quickstart/) |
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
