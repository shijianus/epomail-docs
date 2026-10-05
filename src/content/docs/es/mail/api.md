---
title: Plataforma abierta y acceso a la API
description: Plataforma abierta y acceso a la API de EpoCanvas Mail — registro de aplicaciones OAuth, los puntos de conexión authorize y token, userinfo, la semántica de los ámbitos y el flujo de consentimiento y revocación en el lado del usuario.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.15**

EpoCanvas Mail incorpora de serie un centro de autorización OAuth 2.0 / OIDC: el administrador registra aplicaciones de terceros en la sección «Gestión de aplicaciones» de la administración (`#manage/admin/oauth-apps`), y los sitios externos pueden ofrecer entonces «Iniciar sesión con Epomail». Esta página es el tutorial completo para desarrolladores; dónde se sitúa la interfaz dentro de la aplicación figura en la sección 4 del [Mapa de interfaz y rutas](/es/mail/interface/), y el tratamiento de los datos de autorización se divulga en la [Lista de encargados del tratamiento](/es/mail/sub-processors/).

![Página de gestión de aplicaciones de EpoCanvas Mail: cuatro pastillas de puntos de conexión, el botón del tutorial para desarrolladores, la tarjeta de la aplicación de ejemplo y la entrada del código de integración](/images/mail/ui/ui-oauth-apps.png)

*Figura: la gestión de aplicaciones. Los cuatro puntos de conexión ocupan la parte superior; cada tarjeta de aplicación lleva sus credenciales, un interruptor de activación y el código de integración.*

## 1. Puntos de conexión

| Punto de conexión | Método | Propósito |
| --- | --- | --- |
| `/.well-known/openid-configuration` | GET | Metadatos de OIDC Discovery (issuer, puntos de conexión y capacidades) |
| `/oauth/authorize` | GET／POST | Punto de conexión de autorización de usuario: iniciar la sesión del usuario y obtener su consentimiento |
| `/api/oauth/token` | POST | Intercambio de tokens: canjear un código de autorización por tokens |
| `/api/oauth/userinfo` | GET | Perfil de usuario: leer el perfil autorizado con un token de acceso |

El flujo es la concesión estándar por código de autorización: el código es de un solo uso y válido durante 5 minutos; el token de acceso (Bearer) y el ID Token son válidos durante 2 horas; actualmente no se emite ningún refresh token.

## 2. Lado administrativo: registro y mantenimiento de aplicaciones

Campos del formulario «Registrar nueva aplicación»:

| Campo | Descripción |
| --- | --- |
| Nombre de la aplicación | El nombre que se muestra a los usuarios en la página de consentimiento |
| URL de la página principal | La página principal de la aplicación; verificable desde la página de consentimiento |
| Descripción de la aplicación | La declaración de propósito que se muestra en la página de consentimiento |
| URIs de redirección | La lista de permitidos de redirección, una por línea; la redirección al iniciar la autorización debe coincidir exactamente |
| URL del icono de la aplicación (opcional) | La insignia de la aplicación en la página de consentimiento |
| Ámbitos | Por defecto `openid profile email`; recórtelos según necesite |

- Los Client ID llevan el prefijo `epo_live_` y los Client Secrets el prefijo `epo_sec_`; el secret se muestra completo una sola vez al crearlo o restablecerlo y aparece siempre enmascarado en la lista — entrega única de credenciales al estilo de GitHub;
- «Restablecer el secret» invalida de inmediato el secret antiguo y emite uno nuevo, como respuesta ante filtraciones;
- Cada aplicación puede activarse/desactivarse, editarse y eliminarse; una aplicación desactivada no puede iniciar nuevas autorizaciones;
- La aplicación de ejemplo de fábrica `shijianus-blog` (la integración nativa del blog oficial) se facilita como referencia; el Maestro puede eliminarla o conectar la suya propia en cualquier momento;
- El botón «Código de integración» de cada tarjeta incluye ejemplos listos para copiar de NextAuth, Node, Python, cURL y OIDC genérico.

## 3. Flujo de integración (vista del desarrollador)

1. Registre la aplicación en el lado administrativo; obtenga el Client ID/Secret y dé de alta la URI de redirección;
2. Dirija al usuario a `https://<instance-domain>/oauth/authorize?client_id=<id>&redirect_uri=<callback>&scope=openid profile email&state=<random>`;
3. El usuario inicia sesión y da su consentimiento en la página de consentimiento: en una ventana emergente el resultado vuelve vía `postMessage`; una cancelación redirige de vuelta con `error=access_denied`;
4. Canjee el código en el punto de conexión de tokens (se aceptan JSON, formulario y HTTP Basic; con PKCE se verifica el `code_verifier` vía S256; en caso contrario, el Client Secret):

```bash
curl -X POST https://<instance-domain>/api/oauth/token \
  -H "Content-Type: application/json" \
  -d '{"grant_type":"authorization_code","code":"<code>","redirect_uri":"<callback>","client_id":"<id>","client_secret":"<secret>"}'
```

5. Llame a userinfo con `Authorization: Bearer <access_token>` para leer el perfil; un token caducado o revocado devuelve 401.

## 4. Semántica de los ámbitos (scope)

| Ámbito (scope) | Descripción en la página de consentimiento |
| --- | --- |
| `openid` | Identidad OpenID: emite un ID Token para verificar la credencial única del usuario |
| `email` | La dirección de correo electrónico principal |
| `profile` | Perfil público (apodo público y avatar) |
| `comments` | Gestión de los comentarios y las interacciones del blog (lo usa la aplicación de ejemplo; es un permiso de interacción) |
| `offline_access` | Inicio de sesión de larga duración; actualmente no se emite ningún refresh token, de modo que conceder este ámbito no produce ningún token sin conexión |

userinfo devuelve: `sub`, `email`, `email_verified`, `name`, `preferred_username`, `picture`, `is_admin` y `role`.

## 5. Lado del usuario: consentimiento y revocación

- La página de consentimiento muestra la información de la aplicación, su insignia oficial y la lista completa de ámbitos; autorizar nunca revela la contraseña del usuario ni el contenido de su correo;
- Los usuarios pueden retirar en cualquier momento el acceso de una aplicación en «Configuración → Datos», en la lista «Aplicaciones y servicios de terceros», o revocarlo todo de una vez desde el diálogo de detalle;
- La revocación surte efecto de inmediato: los tokens existentes de la aplicación mueren en el acto (userinfo devuelve 401) y la autorización se retira de la cuenta del usuario.

## 6. Tokens de API personales (estado actual)

:::note
La tarjeta «Control de datos de usuario» de la configuración del sistema lleva el interruptor «soporte de API de terceros», que rige el acceso de desarrolladores en el lado del usuario. Los puntos de conexión de emisión y revocación de los tokens de acceso personales (PAT) ya existen, pero la versión actual aún no expone un punto de conexión general autenticado por token; los terceros deben leer los perfiles a través del flujo OAuth userinfo descrito arriba.
:::

## 7. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Dónde se sitúa la gestión de aplicaciones en el mapa de rutas | [Mapa de interfaz y rutas](/es/mail/interface/) |
| Comportamiento del inicio de sesión por autorización y del inicio de sesión de terceros | [Modos de funcionamiento](/es/mail/modes/) |
| Divulgación del tratamiento y las transferencias por terceros | [Lista de encargados del tratamiento](/es/mail/sub-processors/) |
| Despliegue primero su propia instancia | [Guía de despliegue](/es/mail/deployment/) |
