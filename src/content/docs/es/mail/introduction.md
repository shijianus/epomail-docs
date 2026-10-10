---
title: Introducción al sitio de documentación de EpoCanvas Mail
description: Introducción al sitio de documentación de EpoCanvas Mail — posicionamiento del sitio, arquitectura documental, rutas de lectura, estructura multilingüe y navegación completa.
---

**Lanzamiento del sitio: 28 de septiembre de 2026 | Versión actual: v5.17 | URL del sitio: docs.epocanvas.com/epomail**

**Fecha de vigencia: 5 de octubre de 2026 | Versión: 5.17**

El sitio de documentación de EpoCanvas Mail (en adelante "este sitio") es el centro de documentación oficial del servicio de correo electrónico de código abierto EpoCanvas Mail, que cubre términos legales, especificaciones técnicas, guías de uso y documentación de desarrollo. Construido con Astro 5 + Starlight, el sitio mantiene simetría estructural completa en seis idiomas (chino simplificado, chino tradicional, English, Français, Español, Nederlands), con cada documento verificado palabra por palabra contra la implementación del código, proporcionando a los usuarios de la instancia alojada, autohospedadores y participantes de auditoría una única fuente de verdad. Esta página explica el posicionamiento del sitio, la arquitectura documental, las rutas de lectura y los puntos de entrada de navegación.

Los documentos legales de este sitio son autoritativos en su versión china tradicional (Taiwán); otras versiones lingüísticas son traducciones de referencia. En caso de discrepancia, prevalece la versión autoritativa.

![Arquitectura documental de EpoCanvas Mail: la capa de documentación legal (política de privacidad, términos de servicio, política de uso aceptable y documentos de gobernanza de datos) y la capa de documentación técnica (introducción al proyecto, guía de funciones, arquitectura técnica, modos operativos y guías de uso) forman juntas un sistema documental completo, todo fundamentado en código de fuente abierta y especificaciones transparentes](/images/mail/es/legal-architecture.svg)

*Figura: Arquitectura documental. La capa de documentación legal define el procesamiento de datos y los límites del servicio; la capa de documentación técnica explica funciones, arquitectura y uso; ambas capas están fundamentadas en la implementación del código de fuente abierta.*

## 1. Posicionamiento del sitio

Este sitio es la única documentación oficial del proyecto de código abierto EpoCanvas Mail, que cumple tres funciones:

- **Aviso legal**: política de privacidad, términos de servicio, política de uso aceptable y especificaciones de procesamiento de datos, cumpliendo las obligaciones legales de notificación a los usuarios de la instancia alojada; los autohospedadores pueden usar la documentación de este sitio como plantilla base para sus propios avisos y términos;
- **Especificación técnica**: arquitectura técnica, diseño de seguridad, historial de desarrollo y rastro completo de commits, permitiendo a los participantes de auditoría verificar la coherencia entre la implementación del código y los compromisos documentados;
- **Guía de uso**: descripciones de funciones, navegación de interfaz, sintaxis de búsqueda, pasos de despliegue y flujo de trabajo de desarrollo, ayudando a usuarios, operadores y desarrolladores a comprender y usar el servicio.

La documentación de este sitio está fundamentada en la implementación real del código de fuente abierta y prohíbe la fabricación; las citas legales usan la lista blanca de verificación `doc/legal-reference.md`; los hechos técnicos (semántica de cifrado, períodos de retención, lista de subprocesadores) son verificados continuamente por pruebas automatizadas y scripts de auditoría.

## 2. Arquitectura documental

Este sitio está organizado en tres grupos de documentos, que se referencian mutuamente y juntos forman un conjunto completo de acuerdos:

### 2.1 Producto y resumen

| Documento | Contenidos |
| --- | --- |
| [Resumen del proyecto](/es/mail/project/) | Posicionamiento, funciones principales, resumen de arquitectura técnica, historial de desarrollo y rastro completo de commits |
| [Alcance del servicio y soporte](/es/mail/service-scope/) | Límites del servicio, descargo de responsabilidad y canales de contacto para la instancia alojada |
| [Mapa de interfaz y enrutamiento](/es/mail/interface/) | Navegación completa de interfaz y mapeo de rutas para bandeja de entrada, redactar, configuración y consola de administración |

### 2.2 Guía de uso

| Documento | Contenidos |
| --- | --- |
| [Guía de funciones](/es/mail/features/) | Organización de bandeja de entrada, redacción y envío, sintaxis de búsqueda, reglas de etiquetas, extracción de código de verificación, reenvío/push y capacidades de IA |
| [Modos operativos](/es/mail/modes/) | Formas de despliegue, tres niveles de privacidad del modo de correo, grupos de identidad y cuotas, inicio de sesión y verificación en dos pasos |
| [Guía de configuración](/es/mail/settings/) | Cinco secciones de configuración personal (perfil, general, seguridad, datos, etiquetas) y nueve secciones de consola de administración |
| [Referencia de búsqueda y reglas](/es/mail/search/) | Referencia completa para operadores de búsqueda, recuperación del lado del administrador y condiciones de reglas de clasificación |
| [Interfaz de buzón y detalle de mensajes](/es/mail/mailbox/) | Vistas de bandeja de entrada, división en tres columnas, hilos de conversación y página de detalle de mensajes elemento por elemento |
| [Gestión de etiquetas y clasificación](/es/mail/labels/) | Taxonomía de etiquetas, motor de reglas de clasificación, listas negras/blancas y herramientas de gobernanza global |
| [Datos personales y configuración general](/es/mail/preferences/) | Tarjetas de perfil, tarjetas de dirección, idioma de interfaz, fondo de pantalla temático y preferencias de lectura |
| [Exportación de datos y almacenamiento](/es/mail/data/) | Exportación de copia completa JSON, descarga de mensaje único .eml y gestión de uso de almacenamiento |
| [Guía de seguridad de cuenta](/es/mail/security/) | Nombre de usuario y contraseña, centro de verificación en dos pasos (TOTP, códigos de recuperación de respaldo, llaves de acceso) y dispositivos de confianza |
| [Guía de notificaciones y reenvíos](/es/mail/notify/) | Reenvío personal, push de Telegram y configuración y comportamiento de reglas de reenvío global |
| [Análisis](/es/mail/analysis/) | Tableros de visualización de datos, crecimiento de usuarios y estadísticas de clasificación de correo |
| [Lista de usuarios](/es/mail/users/) | Gestión de cuentas, grupos de roles, cuotas de envío y operaciones de prohibición/restauración |
| [Revisión completa de correo](/es/mail/review/) | Recuperación de correo del lado del administrador, gobernanza de spam y alcance visible restringido por modo de correo |
| [Permisos](/es/mail/roles/) | Seis grupos de identidad, cuotas de almacenamiento, límites de envío y modelos de IA autorizados |
| [Claves de registro](/es/mail/regkeys/) | Generación de códigos de invitación, límites de número de usos y gestión de vencimiento |
| [Tarjetas de configuración del sistema](/es/mail/system/) | Descripción elemento por elemento de nueve tarjetas de configuración: configuración del sitio, personalización, almacenamiento, push y plataforma abierta |
| [Plataforma abierta y acceso a API](/es/mail/api/) | Centro de autenticación OAuth 2.0 / OIDC, registro de aplicaciones, acceso a puntos finales y tokens de API personales |
| [Clasificación](/es/mail/category/) | Reglas de clasificación global, lista negra de remitentes y lista negra de palabras clave de asunto |
| [Informes de operación](/es/mail/audit/) | Tickets de alerta de auditoría, adjudicación de control de riesgos, apelaciones de prohibición y eliminación de marca de tiempo vinculada al modo de correo |

### 2.3 Tecnología y confianza

| Documento | Contenidos |
| --- | --- |
| [Arquitectura técnica](/es/mail/architecture/) | Topología de despliegue edge de Cloudflare, aislamiento de base de datos dual, sistema de cifrado de tres modos, cadena de almacenamiento de adjuntos y diseño de seguridad de aplicaciones |
| [Especificaciones anti-manipulación y oficiales](/es/mail/tamper-proof/) | Especificaciones e identificación de correo oficial, marca de autenticación oficial, entrega inmutable y verificación anti-manipulación de documentos |

### 2.4 Autohospedaje y desarrollo

| Documento | Contenidos |
| --- | --- |
| [Guía de despliegue](/es/mail/deployment/) | Pasos completos para autohospedaje, requisitos previos, flujo de inicialización e inyección de secretos |
| [Guía de desarrollo](/es/mail/development/) | Entorno de desarrollo, flujo de trabajo de ingeniería, scripts de prueba y auditoría, convenciones de commit y pautas de contribución |

### 2.5 Privacidad y gobernanza de datos

| Documento | Contenidos |
| --- | --- |
| [Resumen](/es/mail/overview/) | Identidad de la plataforma, definición de rol de procesamiento de datos, arquitectura documental, orden de precedencia y puntos de contacto |
| [Política de privacidad](/es/mail/privacy-policy/) | Recopilación, procesamiento y uso de datos personales, naturaleza del procesamiento, derechos de los interesados y transferencias internacionales |
| [Procesamiento de datos y seguridad](/es/mail/data-security/) | Ciclo de vida de datos, matriz de procesamiento, medidas de mantenimiento de seguridad, respuesta a incidentes y cooperación de inspección |
| [Subprocesadores](/es/mail/sub-processors/) | Subprocesadores, destinatarios del uso compartido, datos involucrados y salvaguardas de transferencia internacional |

### 2.6 Términos y cumplimiento

| Documento | Contenidos |
| --- | --- |
| [Términos de servicio](/es/mail/terms-of-service/) | Condiciones contractuales para el uso del servicio, derechos y obligaciones, limitación de responsabilidad, ley aplicable y jurisdicción |
| [Política de uso aceptable](/es/mail/acceptable-use/) | Límites de comportamiento, lista de conductas prohibidas y procedimientos de aplicación del operador |
| [Legal de código abierto y autohospedaje](/es/mail/open-source/) | Aplicabilidad de licencia MIT, responsabilidad de controlador de datos para autohospedaje y descargo de responsabilidad |
| [Términos clave](/es/mail/key-terms/) | Definiciones de términos técnicos y legales usados en la documentación legal de este sitio |

## 3. Rutas de lectura

Este sitio está organizado en torno a dos rutas complementarias:

**Ruta 1: Comprender el proyecto, prepararse para el despliegue o aprender a usar**

[Resumen del proyecto](/es/mail/project/) → [Guía de funciones](/es/mail/features/) → [Modos operativos](/es/mail/modes/) → [Mapa de interfaz y enrutamiento](/es/mail/interface/) → [Referencia de búsqueda y reglas](/es/mail/search/) → [Guía de configuración](/es/mail/settings/) → [Guía de despliegue](/es/mail/deployment/) → [Guía de desarrollo](/es/mail/development/)

**Ruta 2: Comprender acuerdos legales de privacidad y límites del servicio**

[Resumen](/es/mail/overview/) → [Política de privacidad](/es/mail/privacy-policy/) → [Términos de servicio](/es/mail/terms-of-service/) → [Política de uso aceptable](/es/mail/acceptable-use/) → [Procesamiento de datos y seguridad](/es/mail/data-security/) → [Subprocesadores](/es/mail/sub-processors/)

Las dos rutas convergen en [Guía de funciones](/es/mail/features/) y [Modos operativos](/es/mail/modes/).

## 4. Estructura multilingüe

Este sitio proporciona seis idiomas con simetría estructural 1:1:

| Idioma | Identificador | Descripción |
| --- | --- | --- |
| Chino simplificado | `zh` | Idioma predeterminado del sitio, ocupa ruta raíz URL (`/epomail/mail/...`) |
| Chino tradicional (Taiwán) | `zh-tw` | Versión autoritativa para documentos legales; otros idiomas son traducciones de referencia (`/epomail/zh-tw/mail/...`) |
| English | `en` | Traducción de referencia (`/epomail/en/mail/...`) |
| Français | `fr` | Traducción de referencia (`/epomail/fr/mail/...`) |
| Español | `es` | Traducción de referencia (`/epomail/es/mail/...`) |
| Nederlands | `nl` | Traducción de referencia (`/epomail/nl/mail/...`) |

La página de inicio del sitio (`/` y `/epomail/`) negocia el idioma a través de Cloudflare Pages Functions según el encabezado `Accept-Language` del navegador, redirigiendo automáticamente a la página [Resumen](/es/mail/overview/) del idioma correspondiente. La ruta raíz heredada `/mail/...` redirige a la ruta canónica con negociación de idioma.

El número de documentos, jerarquía de encabezados, filas y columnas de tablas, número de imágenes y cuadros de alerta deben ser estrictamente idénticos para cada idioma, verificado automáticamente por `scripts/check-structure.py`. Los números de versión y fechas de vigencia están unificados en todo el sitio.

## 5. Garantía de calidad de la documentación

La documentación de este sitio está asegurada por los siguientes mecanismos:

- **Verificación de implementación de código**: los hechos técnicos (semántica de cifrado, períodos de retención, lista de subprocesadores, cuotas de roles) están fundamentados en el código fuente del repositorio epomail y la fabricación está prohibida;
- **Lista blanca de citas legales**: `doc/legal-reference.md` es la única fuente de citas legales en todo el sitio; solo pueden citarse números de artículos verificados en esta lista;
- **Verificación de simetría estructural**: `scripts/check-structure.py` verifica que los encabezados, tablas, imágenes y recuentos de cuadros de alerta de los documentos en seis idiomas sean estrictamente idénticos;
- **Integridad de anclas**: `scripts/validate-anchors.cjs` escanea anclas y referencias de imágenes en todo el sitio, asegurando cero enlaces rotos;
- **Construcción sin errores**: `pnpm build` debe pasar sin errores; cualquier advertencia o error bloquea la publicación;
- **Verificación anti-manipulación**: los documentos oficiales están firmados con HMAC-SHA256 y entregados a través de instantáneas inmutables, ver [Especificaciones anti-manipulación y oficiales](/es/mail/tamper-proof/).

## 6. Stack tecnológico del sitio

| Componente | Implementación |
| --- | --- |
| Generación estática | Astro 5.0 + Starlight 0.32 |
| Negociación de enrutamiento | Cloudflare Pages Functions (lógica de negociación de idioma compartida `functions/_lib.js`) |
| Despliegue | Cloudflare Pages (`npx wrangler pages deploy dist --project-name epomail-docs`) |
| Artefactos de construcción | Publicación de doble vía: ruta raíz `dist/*` y espejo de sub-ruta `dist/epomail/*` (ejecutado por `scripts/post-build.mjs`) |
| Sistema de estilos | CSS personalizado (`src/styles/custom.css`, 627 líneas), alineado con el esquema de color indigo-tech de EpoCanvasDocs |
| Iconos y activos | 300+ iconos vectoriales sin conexión, temas claros/oscuros duales, ilustraciones localizadas en seis idiomas (`/images/mail/{zh-tw,en,es,fr,nl}/*.svg`) |

## 7. Recursos relacionados

| Recurso | Enlace |
| --- | --- |
| Instancia alojada | [mail.epocanvas.com](https://mail.epocanvas.com) |
| Código fuente | [github.com/shijianus/epomail](https://github.com/shijianus/epomail) |
| Código fuente del sitio de documentación | Repositorio git independiente EpomailDocs (artefacto de construcción de este sitio) |
| Contacto de privacidad | privacy@epocanvas.com |
| Contacto en el producto | Mensaje en el sitio o admin@epocanvas.com |
| Issues del proyecto de código abierto | Issues del repositorio GitHub |
