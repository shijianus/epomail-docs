---
title: Arquitectura técnica de EpoCanvas Mail
description: Arquitectura técnica de EpoCanvas Mail — topología de despliegue en el borde de Cloudflare, aislamiento de doble base de datos, sistema de cifrado de tres modos, cadena de almacenamiento de adjuntos, modelo de permisos por rol, ciclo de vida del correo y diseño de seguridad de la aplicación.
---

**Fecha de entrada en vigor: 4 de octubre de 2026 | Versión: 5.10**

Esta página describe la implementación técnica de EpoCanvas Mail: topología de despliegue, cifrado de datos, cadena de almacenamiento, modelo de permisos y ciclo de vida del correo. Todos los hechos técnicos siguen la implementación real del código abierto y pueden auditarse de forma independiente; las repercusiones sobre su privacidad y las informaciones legales figuran en [Procesamiento de Datos y Seguridad](/es/mail/data-security/) y en la [Política de Privacidad](/es/mail/privacy-policy/).

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional.

![Arquitectura del sistema de EpoCanvas Mail: la capa cliente (aplicación web, aplicación Android, aplicaciones de terceros OAuth) accede a través del borde de Cloudflare; los Workers alojan la API, el análisis del correo entrante y las capacidades de IA, y el correo saliente pasa por Resend y Telegram; los datos residen en las dobles bases de datos D1, KV y el almacenamiento de objetos](/images/mail/es/project-architecture.svg)

*Figura: arquitectura del sistema. Los clientes acceden a través del borde, sin servidor de punto único; el correo entrante lo recibe y analiza Email Routing, y el saliente pasa por los canales de entrega; todo el estado reside en los recursos de Cloudflare del propio implementador.*

## 1. Topología de despliegue

| Componente | Implementación |
| --- | --- |
| Cómputo | Cloudflare Workers (entorno aislado V8 Isolate): la lógica de negocio no tiene estado, el texto plano existe solo en la memoria de la solicitud y se libera al terminar esta |
| Entrante | Cloudflare Email Routing recibe el correo; postal-mime analiza el cuerpo, las cabeceras y los adjuntos |
| Saliente | resolución secuencial por tres canales: enlace de Cloudflare Email Workers, API de Resend, Mailjet; los envíos internos entre cuentas se escriben directamente en la base de datos |
| Almacenamiento estructurado | Cloudflare D1 (doble base aislada físicamente: la base de usuarios contiene cuentas, roles y ajustes; la base de correo contiene correos, estrellas y metadatos de adjuntos; el despliegue de base única sigue siendo retrocompatible al 100 %; la instancia alojada opera actualmente con una única base de datos) |
| Almacenamiento clave-valor | Workers KV: tokens de sesión, contadores de control de riesgo de inicio de sesión, estados intermedios de TOTP, perfiles de usuario y respaldo del almacenamiento de objetos |
| Inferencia en el borde | Workers AI (extracción de captcha, etc.; llama-3.1-8b-instruct por defecto) |
| Tareas programadas | los desencadenadores Cron ejecutan: cada 30 minutos, la actualización de la caché del análisis de datos; a diario, la puesta a cero de los contadores de riesgo, el restablecimiento de los contadores de envío, la purga de la papelera y del correo no deseado y la eliminación de cuentas OAuth sin vincular |
| Verificación humana | Cloudflare Turnstile (verificación por API HTTP, en el registro y al crear buzones adicionales) |

## 2. Pila tecnológica

| Capa | Tecnologías |
| --- | --- |
| Cliente | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie (borradores locales, nada en el servidor), Vite 7, vite-plugin-pwa |
| Interfaz de inicio de sesión | React 18, Tailwind CSS 4, Vite 6 (compilación independiente, publicada junto con los productos del front-end) |
| Servidor | Hono 4.12, Drizzle ORM, postal-mime, i18next, SDK de Resend |
| Recursos de interfaz | más de 300 iconos vectoriales sin conexión (cero solicitudes externas), temas claro y oscuro, diccionarios en seis idiomas |

## 3. Sistema de cifrado de datos

- **Cifrado en reposo de tres modos**: modo Todo (sin cifrado), modo Privado (todo cifrado salvo correo no deseado y papelera), modo Cifrado (todo cifrado); la semántica de los modos y el alcance de acceso del administrador figuran en la sección 1.3 de [Procesamiento de Datos y Seguridad](/es/mail/data-security/);
- **Cifrado del correo**: el asunto y el cuerpo se cifran con AES-256-GCM (con etiquetas de autenticación) y cada registro usa un vector de inicialización aleatorio; las claves se derivan mediante HKDF-SHA256 de la variable de entorno de secreto maestro a nivel de instancia, con una sal por usuario; el secreto maestro nunca se escribe en la base de datos ni se confirma en el repositorio;
- **Protección de las credenciales**: las contraseñas se calculan con PBKDF2-HMAC-SHA256 a 100.000 iteraciones con sal; el secreto TOTP se cifra en reposo con AES-256-GCM; los códigos de recuperación se guardan solo como resúmenes SHA-256; las llaves de acceso almacenan únicamente la clave pública;
- **Límite**: lo anterior es cifrado en reposo del lado del servidor, no cifrado de extremo a extremo; los adjuntos quedan fuera del alcance del cifrado.

## 4. Cadena de almacenamiento de adjuntos

El binario de los adjuntos se resuelve y almacena en orden: almacenamiento compatible con S3 propio (BYOS, compatible con AWS S3, Backblaze B2, MinIO, etc.) → almacenamiento compatible con S3 configurado por el Operador → enlace de Cloudflare R2 → Cloudflare KV por defecto. Los metadatos (nombre de archivo, MIME, tamaño) se guardan en D1; las descargas incluyen cabeceras defensivas y una lista de autorización MIME; al eliminar un correo, los adjuntos se purgan en cascada mediante recuento de referencias.

## 5. Sesiones y permisos por rol

Las sesiones son JWT (HS256) con una validez de 30 días, que se guardan en KV fuertemente enmascarados; como máximo 10 sesiones activas por cuenta, revocadas de inmediato al cerrar sesión y al cancelar la cuenta. Los permisos siguen RBAC, con seis roles estándar:

| Rol | Envío diario | Cuota de almacenamiento | Adjuntos | Capacidades adicionales |
| --- | --- | --- | --- | --- |
| Visitante | Prohibido | 0 | No | entorno de pruebas de solo lectura |
| Usuario base | 5 correos | 5 MB | No | envío y recepción básicos |
| Usuario base LV.0 | 8 correos | 10 MB | No | subida vinculada al nivel del blog |
| Usuario base LV.1 | 10 correos | 25 MB | Sí | envío, recepción y adjuntos |
| Administrador | 100 correos | 500 MB | Sí | gestión de usuarios, gestión de todo el correo (según el modo de correo) |
| Webmaster | Sin límite | 1024 MB | Sí | todos los permisos |

Todas las rutas de administración y de negocio se validan en una única puerta de enlace de autenticación; quedan fuera los puntos de conexión públicos (inicio de sesión, registro, OAuth, inicialización); la eliminación de la cuenta revoca de inmediato sus sesiones.

## 6. Ciclo de vida del correo

| Etapa | Comportamiento |
| --- | --- |
| Eliminación | el correo pasa primero a la papelera (eliminación lógica); 7 días después de la recepción, una tarea programada lo suprime físicamente (adjuntos e índices incluidos) |
| Cuarentena del correo no deseado | el correo no deseado se conserva 7 días y luego pasa a la papelera; el plazo de cuarentena es configurable |
| Purga de cuota | cuando el buzón supera el 90 % de la cuota, el correo ya marcado como eliminado se suprime físicamente de inmediato |
| Correo oficial | los correos de bienvenida y los anuncios globales caducan por defecto a los 7 días (configurable) |
| Eliminación en cascada | la supresión física se ejecuta por lotes (para respetar el límite de parámetros enlazados de una instrucción D1); adjuntos y estrellas se retiran en cascada con el correo |
| Cancelación de la cuenta | las sesiones quedan invalidadas de inmediato; los datos pasan a estado de eliminación lógica hasta que un administrador ejecuta la eliminación física (el plazo comprometido figura en la sección 8 de la [Política de Privacidad](/es/mail/privacy-policy/)) |

## 7. Diseño de seguridad de la aplicación

- **Rutas a prueba de accesos no autorizados**: las URL de los correos usan siempre un hash aleatorio de 20 caracteres firmado con HMAC-SHA256, vinculado al usuario y al inquilino, sin exponer identificadores autoincrementales, lo que impide la enumeración y el BOLA／IDOR;
- **Triple defensa XSS**: saneamiento mediante lista de autorización DOMPurify, filtrado de inyecciones de body style, lista de autorización MIME en la salida de adjuntos con CSP estricto y `nosniff`;
- **Bloqueo de SSRF**: las solicitudes salientes pasan una validación de direcciones públicas; las direcciones de bucle local, RFC 1918 y de metadatos de la nube se rechazan siempre;
- **Protección del inicio de sesión**: 5 fallos consecutivos bloquean el acceso durante 12 horas; verificación humana de Turnstile; verificación en dos pasos TOTP／llave de acceso;
- **Integridad del correo oficial**: bloqueo de la identidad de envío oficial, entrega mediante instantánea inmutable y verificación contra manipulaciones de los documentos, véase [Seguridad contra manipulaciones y normas](/es/mail/tamper-proof/).

## 8. Observabilidad y garantía de calidad

- Los registros de ejecución se recopilan mediante Cloudflare Workers Logs (la aplicación no guarda registros propios más allá de los registros de IP); la página de análisis de datos solo presenta agregaciones estadísticas, sin datos a nivel de contenido;
- Más de un centenar de scripts de pruebas automatizadas, auditorías e inspecciones: regresiones de navegador con Playwright sobre la pila completa, aserciones de extremo a extremo en la red pública, barrido estático de todo el repositorio y el trío i18n en seis idiomas (véase la sección 7 de [Presentación del proyecto](/es/mail/project/)).

## 9. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Funciones detalladas y capturas de pantalla | [Guía de funciones](/es/mail/features/) |
| Posicionamiento del proyecto e historia del desarrollo | [Presentación del proyecto](/es/mail/project/) |
| Semántica del cifrado, plazos de conservación y derechos de los interesados | [Procesamiento de Datos y Seguridad](/es/mail/data-security/) |
| Especificación del correo oficial y verificación contra manipulaciones | [Seguridad contra manipulaciones y normas](/es/mail/tamper-proof/) |
