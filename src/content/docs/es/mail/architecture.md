---
title: Arquitectura técnica de EpoCanvas Mail
description: Arquitectura técnica de EpoCanvas Mail — topología de despliegue en el borde de Cloudflare, aislamiento de doble base de datos, sistema de cifrado de tres modos, cadena de almacenamiento de adjuntos, modelo de permisos por rol, ciclo de vida del correo y diseño de seguridad de la aplicación.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.21**

Esta página describe la implementación técnica de EpoCanvas Mail: topología de despliegue, cifrado de datos, cadena de almacenamiento, modelo de permisos y ciclo de vida del correo. Todos los hechos técnicos siguen la implementación real del código abierto y pueden auditarse de forma independiente; las repercusiones sobre su privacidad y las informaciones legales figuran en [Procesamiento de Datos y Seguridad](/es/mail/data-security/) y en la [Política de Privacidad](/es/mail/privacy-policy/).

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional.

![Arquitectura del sistema de EpoCanvas Mail: la capa cliente (aplicación web, aplicación Android, aplicaciones de terceros OAuth) accede a través del borde de Cloudflare; los Workers alojan la API, el análisis del correo entrante y las capacidades de IA, y el correo saliente pasa por Resend y Telegram; los datos residen en las dobles bases de datos D1, KV y el almacenamiento de objetos](/images/mail/es/project-architecture.svg)

*Figura: Email Routing recibe y analiza el correo entrante; los canales configurados entregan el saliente. Los datos también pueden llegar a almacenamiento y servicios externos; véase la [Lista de encargados](/es/mail/sub-processors/).*

## 1. Topología de despliegue

| Componente | Implementación |
| --- | --- |
| Cómputo | Cloudflare Workers (V8 Isolate) procesa solicitudes y puede acceder al texto plano. El código no garantiza la destrucción del entorno ni el borrado de todo el texto plano al terminar cada solicitud |
| Entrante | Cloudflare Email Routing recibe el correo; postal-mime analiza el cuerpo, las cabeceras y los adjuntos |
| Saliente | resolución secuencial por tres canales: enlace de Cloudflare Email Workers, API de Resend, Mailjet; los envíos internos entre cuentas se escriben directamente en la base de datos |
| Almacenamiento estructurado | Cloudflare D1 permite separar las bases de usuarios y correo o usar una sola; la primera guarda cuentas, roles y ajustes, la segunda correo, estrellas y metadatos de adjuntos. Los enlaces reales de producción requieren verificación |
| Almacenamiento clave-valor | Workers KV: tokens de sesión, contadores de control de riesgo de inicio de sesión, estados intermedios de TOTP, perfiles de usuario y respaldo del almacenamiento de objetos |
| Inferencia en el borde | Workers AI (extracción de captcha, etc.; llama-3.1-8b-instruct por defecto) |
| Tareas programadas | Configuración del repositorio: a diario a las 16:00 UTC (00:00 del día siguiente en Taiwán), reinicio de contadores de verificación y envío, limpieza de papelera e identidades OAuth sin vincular y actualización de estadísticas; cada 5 minutos, avisos y borrado de objetos. Existe una rama de 30 minutos, pero no está registrada en esa configuración |
| Verificación humana | Cloudflare Turnstile (verificación por API HTTP, en el registro y al crear buzones adicionales) |

## 2. Pila tecnológica

| Capa | Tecnologías |
| --- | --- |
| Cliente | Vue 3.5, Element Plus, Pinia, vue-i18n, ECharts, Dexie (borradores locales, nada en el servidor), Vite 7, vite-plugin-pwa |
| Interfaz de inicio de sesión | React 18, Tailwind CSS 4, Vite 6 (compilación independiente, publicada junto con los productos del front-end) |
| Servidor | Hono 4.12, Drizzle ORM, postal-mime, i18next, SDK de Resend |
| Recursos de interfaz | más de 300 iconos vectoriales sin conexión (cero solicitudes externas), temas claro y oscuro, diccionarios en seis idiomas |

## 3. Sistema de cifrado de datos

- **Tres modos**: Todo deja los campos sin cifrar; Privado selecciona según estados de spam, papelera y sin propietario; Cifrado cifra los campos seleccionados. El alcance es `subject/content/text/code`, no todos los datos; véase [Datos y seguridad](/es/mail/data-security/);
- **Cifrado del correo**: AES-256-GCM usa un IV aleatorio de 12 bytes y claves por usuario derivadas mediante HKDF-SHA256. Se utiliza `email_enc_key`, después `totp_enc_key` y después `jwt_secret`; si faltan todas, falla sin usar una clave predeterminada integrada;
- **Credenciales**: las contraseñas nuevas usan por defecto PBKDF2-HMAC-SHA256 con sal y 210.000 iteraciones, configurables; los hashes antiguos se actualizan al iniciar sesión. Los secretos TOTP activados usan AES-256-GCM; los códigos de recuperación guardan hashes SHA-256 y una copia cifrada de los originales; las passkeys guardan claves públicas y metadatos. Excepciones temporales y otras credenciales: [Datos y seguridad](/es/mail/data-security/);
- **Límite**: lo anterior es cifrado en reposo del lado del servidor, no cifrado de extremo a extremo; los adjuntos quedan fuera del alcance del cifrado.

## 4. Cadena de almacenamiento de adjuntos

El almacenamiento de adjuntos sigue este orden: S3 del usuario → S3 del operador → Cloudflare R2 → KV. D1 guarda metadatos; las descargas usan enlaces firmados y cabeceras defensivas. El borrado físico retira metadatos y encola objetos, comprobando referencias restantes; los reintentos automáticos cesan tras 10 fallos. No se garantiza el borrado simultáneo de todos los objetos. Copias externas: [Lista de encargados](/es/mail/sub-processors/).

## 5. Sesiones y permisos por rol

Los JWT (HS256) caducan por defecto a los 30 días. KV guarda sesiones permitidas y una copia del usuario sin ciertos campos sensibles. El código comprueba si hay más de 10 antes de añadir una sesión: normalmente puede conservar 11, no un máximo estricto de 10. La actividad y ciertas operaciones renuevan o acortan el plazo KV. Cerrar sesión retira la actual; cancelar la cuenta elimina su registro de sesiones. RBAC incluye seis roles:

| Rol | Envío diario | Cuota de almacenamiento | Adjuntos | Capacidades adicionales |
| --- | --- | --- | --- | --- |
| Visitante | Prohibido | 0 | No | entorno de pruebas de solo lectura |
| Usuario base | 5 correos | 5 MB | No | envío y recepción básicos |
| Usuario base LV.0 | 8 correos | 10 MB | No | subida vinculada al nivel del blog |
| Usuario base LV.1 | 10 correos | 25 MB | Sí | envío, recepción y adjuntos |
| Administrador | 100 correos | 500 MB | Sí | gestión de usuarios, gestión de todo el correo (según el modo de correo) |
| Webmaster | Sin límite | 1024 MB | Sí | todos los permisos |

Las rutas protegidas verifican JWT, sesiones KV y permisos; algunos endpoints públicos tienen verificación propia. Cancelar la cuenta retira las sesiones ordinarias sin borrar simultáneamente todas las autorizaciones, datos o copias de terceros.

## 6. Ciclo de vida del correo

| Etapa | Comportamiento |
| --- | --- |
| Eliminación | El borrado normal fija `is_del=1`; la tarea diaria limpia papelera cuando `email.create_time` supera 7 días, no 7 días después de mover el mensaje. Una solicitud de borrado definitivo o la cuota pueden activar el borrado físico directo |
| Cuarentena del correo no deseado | `spamRetentionDays` vale 7 días por defecto desde la creación; el mensaje pasa a papelera y puede borrarse físicamente en la misma ejecución |
| Purga de cuota | Al solicitar el usuario un borrado, si el uso existente supera estrictamente el 90% de cuota, se borran físicamente los mensajes seleccionados; alcanzar el 90% no activa una purga automática en segundo plano |
| Correo oficial | Leer la lista marca como borrados los mensajes caducados de remitentes oficiales designados, según creación y `welcomeExpireDays` (7 días por defecto); la tarea de papelera hace la limpieza física posterior |
| Eliminación en cascada | El borrado definitivo normal y la limpieza de papelera retiran metadatos de adjuntos y estrellas y encolan reintentos de objetos; la cobertura varía entre rutas masivas de administración |
| Cancelación de la cuenta | Solo se marca borrada la fila del usuario y se retiran sesiones; buzones, mensajes y perfiles no se marcan juntos. No hay borrado físico automático a los 90 días; véase la [Política de privacidad](/es/mail/privacy-policy/) |

## 7. Diseño de seguridad de la aplicación

- **Rutas a prueba de accesos no autorizados**: las URL de los correos usan siempre un hash aleatorio de 20 caracteres firmado con HMAC-SHA256, vinculado al usuario y al inquilino, sin exponer identificadores autoincrementales, lo que impide la enumeración y el BOLA／IDOR;
- **Triple defensa XSS**: saneamiento mediante lista de autorización DOMPurify, filtrado de inyecciones de body style, lista de autorización MIME en la salida de adjuntos con CSP estricto y `nosniff`;
- **Bloqueo de SSRF**: las solicitudes salientes pasan una validación de direcciones públicas; las direcciones de bucle local, RFC 1918 y de metadatos de la nube se rechazan siempre;
- **Inicio de sesión**: los fallos se cuentan por identificador introducido; con 5 se bloquea el acceso y cada fallo escribe un TTL de 12 horas. No es un bloqueo atómico compartido por todos los alias. También hay Turnstile y TOTP / Passkey;
- **Integridad del correo oficial**: bloqueo de la identidad de envío oficial, entrega mediante instantánea inmutable y verificación contra manipulaciones de los documentos, véase [Seguridad contra manipulaciones y normas](/es/mail/tamper-proof/).

## 8. Observabilidad y garantía de calidad

- El repositorio activa Cloudflare observability; D1 / KV también guardan operaciones de identidad, denuncias, decisiones y entornos de acceso. La mayoría de registros de auditoría no tienen tarea de caducidad; debe verificarse la retención de logs de plataforma. Véase [Privacidad](/es/mail/privacy-policy/);
- Más de un centenar de scripts de pruebas automatizadas, auditorías e inspecciones: regresiones de navegador con Playwright sobre la pila completa, aserciones de extremo a extremo en la red pública, barrido estático de todo el repositorio y el trío i18n en seis idiomas (véase la sección 7 de [Presentación del proyecto](/es/mail/project/)).

## 9. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Modos de funcionamiento: formas de despliegue, modos de correo e inicio de sesión | [Modos de funcionamiento](/es/mail/modes/) |
| Guía de configuración: configuración personal y consola de administración | [Guía de configuración](/es/mail/settings/) |
| Funciones detalladas y capturas de pantalla | [Guía de funciones](/es/mail/features/) |
| Posicionamiento del proyecto e historia del desarrollo | [Presentación del proyecto](/es/mail/project/) |
| Semántica del cifrado, plazos de conservación y derechos de los interesados | [Procesamiento de Datos y Seguridad](/es/mail/data-security/) |
| Especificación del correo oficial y verificación contra manipulaciones | [Seguridad contra manipulaciones y normas](/es/mail/tamper-proof/) |
