---
title: Guía de despliegue
description: Guía de despliegue de EpoCanvas Mail — requisitos previos, despliegue en tres pasos, inicialización y cadena de arranque, inyección de secretos, configuración del correo, opciones de almacenamiento, la instancia de demostración y las actualizaciones.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.16**

Esta página va dirigida a usuarios y administradores que preparen desplegar EpoCanvas Mail por sí mismos; cubre el camino completo desde cero hasta una instancia operativa. Una vez desplegada, todos los datos de la instancia residen en los recursos de Cloudflare del propio desplegador, y el desplegador pasa a ser el responsable del tratamiento ante sus usuarios — la posición legal se expone en [Marco legal del código abierto y el autoalojamiento](/es/mail/open-source/). Usar la instancia alojada ([mail.epocanvas.com](https://mail.epocanvas.com)) no requiere ninguno de estos pasos.

![Arquitectura del sistema de EpoCanvas Mail: los clientes alcanzan el edge de Cloudflare, los Workers sostienen la API y el procesamiento del correo, y los datos aterrizan en doble D1, KV y almacenamiento de objetos](/images/mail/es/project-architecture.svg)

*Figura: la topología en funcionamiento tras el despliegue. Sin servidor de punto único; cada componente corre dentro de las cuotas medidas de Cloudflare.*

## 1. Requisitos previos

| Categoría | Requisito |
| --- | --- |
| Obligatorio | Un dominio; una cuenta de Cloudflare; Node.js y pnpm |
| Correo saliente | Una cuenta de canal de entrega como Resend o Mailjet (necesaria para enviar fuera del sitio) |
| Correo entrante | Cloudflare Email Routing (basta con activar el enrutamiento de correo del dominio) |
| Opcional | Almacenamiento propio en Backblaze B2 o S3, una base de datos externa Turso, un bot de Telegram, Turnstile, claves de proveedores de IA |

## 2. Despliegue en tres pasos

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

La compilación del front-end plega la superficie de inicio de sesión dentro de los recursos estáticos del Worker, de modo que un solo despliegue produce el sitio completo; el destino de despliegue y los dominios personalizados se configuran en `wrangler.toml`.

## 3. Inicialización y cadena de arranque de despliegue

Tras el primer despliegue, visite `/api/init/<jwt_secret>` (sustituyendo el parámetro de ruta por el valor de secreto que elija el desplegador). Este punto de entrada crea todas las tablas de la base de datos, siembra los seis grupos de identidad estándar (Visitante, Usuario normal, Usuario normal LV.0, Usuario normal LV.1, Moderador y Maestro) e inicializa la cuenta maestra principal.

- La cadena de arranque es idempotente por diseño: las funciones de actualización comprueban las columnas con `PRAGMA table_info` antes de ejecutar `ALTER TABLE`, de modo que las visitas repetidas no tienen efectos secundarios;
- Tras vaciar `.wrangler/state` para un arranque en frío, ese único punto de entrada completa toda la siembra de extremo a extremo — nunca hace falta ejecutar SQL a mano.

## 4. Sistema de secretos

| Secreto | Inyección en producción | Desarrollo local |
| --- | --- | --- |
| `jwt_secret` (firma de sesiones) | `npx wrangler secret put jwt_secret` | archivo `.dev.vars` |
| `totp_enc_key` (cifrado de los secretos de 2FA) | `npx wrangler secret put totp_enc_key` | archivo `.dev.vars` |

- `.dev.vars` queda excluido por `.gitignore` y nunca se confirma; la plantilla confirmada es `.dev.vars.example`;
- Nunca escriba ningún secreto de producción en texto plano dentro de `wrangler.toml` ni de ningún otro archivo bajo control de versiones;
- El `jwt_secret` de la ruta de inicialización es el secreto de firma de sesiones; ambos deben coincidir.

## 5. Flujos de correo y correo del sistema

- Entrante: active Email Routing para el dominio en el panel de Cloudflare y dirija las direcciones de destino al Worker; el correo se analiza al llegar;
- Saliente: una vez configurado un canal de entrega (como Resend) en la configuración del sistema, el correo fuera del sitio se envía a través de él; sin canal, solo funciona la entrega directa dentro del sitio;
- El correo del sistema (correo de bienvenida, avisos de seguridad, correo de anuncios) se genera a partir de plantillas incorporadas en el idioma del destinatario: los botones del correo de bienvenida como «abrir la bandeja de entrada» son rutas relativas internas cuyo comportamiento al aterrizar depende de cómo el cliente de correo gestione los enlaces relativos, mientras que los avisos de seguridad usan enlaces absolutos en el dominio de la instancia. Quienes se autoalojan pueden adaptar la redacción y la firma del remitente mediante las constantes de plantilla; la semántica de entrega del correo oficial figura en [Seguridad contra manipulaciones y normas](/es/mail/tamper-proof/).

## 6. Opciones de almacenamiento y base de datos

| Componente | Por defecto | Alternativas |
| --- | --- | --- |
| Bases de datos de usuarios y correo | Cloudflare D1 con aislamiento físico de doble base de datos (100 % retrocompatible con una sola base) | Turso u otra base de datos externa (se configura en la configuración del sistema) |
| Adjuntos y objetos | Cloudflare R2 | Backblaze B2 o un cubo S3 propio |
| Caché | Workers KV | — |

La jerarquía de almacenamiento y la medición de cuotas se describen en [Arquitectura técnica](/es/mail/architecture/); además, cada persona puede conectar su propio almacenamiento para que los adjuntos aterricen directamente en su nube; véase la sección 5 de la [Guía de configuración](/es/mail/settings/).

## 7. Instancia de demostración

Para un ensayo local, puede ejecutarse una pila de demostración sin exposición pública: arranque `mail-worker` con `wrangler dev` y siembre el correo de demostración y el estado multicuenta con el script de siembra de demostración del repositorio. Los datos de demostración viven solo en el `.wrangler/state` local (excluido por `.gitignore`) y nunca llegan al repositorio ni a producción; las capturas de producto de este sitio se tomaron de esa instancia de demostración.

## 8. Actualizaciones y reversión

- Actualización: `git pull` para obtener el código más reciente → recompilar el front-end → `wrangler deploy`; las migraciones de datos se ejecutan de forma idempotente junto con la cadena de arranque y pueden repetirse con seguridad;
- Comprobación de versión: la tarjeta «Acerca de» de la configuración del sistema muestra la versión de la instancia y comprueba si hay actualizaciones;
- Reversión: vuelva al instante a través del historial de despliegues de Cloudflare Workers, o redespliegue un commit anterior.

## 9. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Formas de funcionamiento y cuotas por rol tras la inicialización | [Modos de funcionamiento](/es/mail/modes/) |
| Entorno de desarrollo, suites de pruebas y disciplina de ingeniería | [Guía de desarrollo](/es/mail/development/) |
| Configuración al nivel de la instancia en detalle | [Guía de configuración](/es/mail/settings/) |
| La posición legal del desplegador y la licencia | [Marco legal del código abierto y el autoalojamiento](/es/mail/open-source/) |
| Topología técnica y cifrado | [Arquitectura técnica](/es/mail/architecture/) |
