---
title: Mapa de interfaz y rutas
description: Mapa de interfaz y rutas de EpoCanvas Mail — las ocho vistas del buzón, la capa de redacción, todas las rutas de configuración y de administración, los flujos de la superficie de inicio de sesión, la página de consentimiento OAuth y los perfiles públicos.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.16**

Esta página recorre una a una las interfaces de EpoCanvas Mail y sus rutas. Una ubicación consta de dos partes: el prefijo de ruta `/mail/u/N/` (N es el índice de sesión multicuenta; siempre 0 con una sola cuenta) y la ruta de vista tras `#` (por ejemplo `#inbox`). Las rutas directas heredadas como `/inbox` se normalizan automáticamente. La superficie de inicio de sesión se despliega por separado bajo `/login/`. Lo que permite cada ruta lo deciden los permisos del grupo de identidad; véase [Modos de funcionamiento](/es/mail/modes/); el efecto de cada ajuste se describe en la [Guía de configuración](/es/mail/settings/).

![Panorama de la bandeja de entrada de EpoCanvas Mail: a la izquierda, el acceso de redacción y el árbol de carpetas; a la derecha, la lista de correo con insignias de código de verificación y marcas oficiales (interfaz en chino simplificado)](/images/mail/es/ui/views-guide.png)

*Figura: la bandeja de entrada (`#inbox`). Las ocho vistas comparten un mismo esqueleto de lista; los contadores y las etiquetas se mantienen sincronizados.*
*Anotaciones: 1. Redactar　2. Destacados　3. Pospuestos1　4. Enviados*

## 1. Interfaz principal del buzón

Tras iniciar sesión, la interfaz principal se organiza por ruta de vista. Las nueve rutas:

| Ruta de vista | Interfaz | Contenido principal |
| --- | --- | --- |
| `#inbox` | Principal | Vista por defecto; orden cronológico ascendente/descendente, inserción incremental de correo nuevo por sondeo, lista virtualizada, puntos de no leídos, agrupación en conversaciones |
| `#all` | Todo el correo | Vista agregada entre carpetas; pulsar una etiqueta de la barra lateral salta aquí filtrado por esa etiqueta |
| `#message` | Detalle del mensaje | Responder / responder a todos / reenviar, destacar, leído/no leído, mover a, denunciar como spam, aplazar, etiquetado, reacciones con emojis, traducción integral por IA, impresión de un mensaje o de una conversación, descarga .eml, cabeceras originales, bloqueo del remitente, creación de filtros desde aquí |
| `#sent` | Enviados | Correo enviado por la cuenta |
| `#drafts` | Borradores | Borradores locales; los destinatarios dejados en blanco muestran un marcador de sustitución |
| `#starred` | Destacados | Colección del correo destacado |
| `#snoozed` | Aplazados | Niveles urgente y en espera; vuelve a la bandeja de entrada automáticamente cuando llega el momento |
| `#spam` | Correo no deseado | Correo calificado como spam por el sistema o por los usuarios |
| `#trash` | Papelera | Correo eliminado; borrado físicamente siete días después de la recepción |

La redacción es una capa superpuesta y no una ruta; se abre desde tres lugares: el botón «Redactar» de la barra lateral, el botón flotante del móvil (requiere permiso de envío) y el enlace profundo `?composeTo=<address>` (abre la ventana de redacción con el destinatario prellenado).

![Ventana de redacción de EpoCanvas Mail: el remitente queda fijado al buzón actual, barra de herramientas de texto enriquecido con adjuntos y botón de envío](/images/mail/ui/ui-compose.png)

*Figura: la capa de redacción. El correo hacia los buzones del sitio se entrega directamente; el correo fuera del sitio pasa por el canal de entrega del operador.*

## 2. Esqueleto de la interfaz

La interfaz principal consta de cuatro regiones:

| Región | Elementos |
| --- | --- |
| Barra superior | Barra de búsqueda (búsqueda de correo en las páginas de correo, búsqueda de configuración en las páginas de configuración; véase la [Referencia de búsqueda y reglas](/es/mail/search/)), conmutador claro/oscuro, ayuda, campana de avisos (se muestra cuando existen avisos sin leer), menú de la cuenta (avatar, barra de almacenamiento, datos de la cuenta, configuración, cierre de sesión; el pie del menú lleva enlaces externos a la presentación del proyecto, la política de privacidad y los términos del servicio; el modo multicuenta añade el cambio de cuenta, el alta y el cierre de sesión en todas partes) |
| Barra lateral | Botón de redacción, ocho elementos de navegación de carpetas con recuento de no leídos, zona de etiquetas (hasta 7) y entrada de etiqueta nueva |
| Barra de estado | Estado de la conexión, hora de la última sincronización, recuento de no leídos, insignia del modo de correo (indicada en el modo cifrado) y número de versión |
| Área principal | La lista o el detalle de la vista actual |

Por debajo de 1025 píxeles de ancho, la barra lateral se pliega en un cajón que se despliega sobre un velo y se cierra automáticamente al cambiar de ruta.

## 3. Zona de configuración

Al entrar en la configuración, el área principal se sustituye por los paneles de configuración y la barra lateral de correo se oculta. Cinco rutas de sección:

| Ruta de sección | Sección | Contenido |
| --- | --- | --- |
| `#settings/profile` | Perfil | Avatar, apodo, género, cumpleaños, correo, teléfono y direcciones |
| `#settings/general` | General | Biografía, paleta de apariencia, fondo de pantalla temático, preferencias de lectura, idioma y privacidad de datos |
| `#settings/security` | Seguridad | Nombre de usuario y contraseña, centro de verificación en dos pasos, llaves de acceso, eliminación de la cuenta |
| `#settings/data` | Datos | Exportación de datos, notificaciones y reenvío, autorizaciones de aplicaciones de terceros, almacenamiento |
| `#settings/labels` | Etiquetas | Gestión de etiquetas y constructor de reglas de clasificación |

![Página general de la configuración de EpoCanvas Mail: zona de personalización, fondo de pantalla temático y paleta de apariencia](/images/mail/ui/ui-settings-general.png)

*Figura: la sección General. Las cinco secciones de configuración comparten un mismo esqueleto; la columna izquierda es la navegación de secciones.*

## 4. Zona de administración

Las rutas de administración adoptan la forma `#manage/admin/<section>`; el segmento del grupo de la ruta debe coincidir con la identidad de la cuenta (`admin` para el Maestro, `moderator` para los moderadores) y, en caso contrario, se normaliza a una sección disponible. Cada sección está vinculada a una clave de permiso independiente, concedida grupo por grupo en la página de permisos:

| Ruta de sección | Sección | Clave de permiso | Responsabilidad |
| --- | --- | --- | --- |
| `#manage/admin/analysis` | Analítica | `analysis:query` | Paneles de volumen, tasa de interceptación, distribución de fuentes, curvas de crecimiento y uso de la IA |
| `#manage/admin/users` | Lista de usuarios | `user:query` | Consulta de cuentas, restablecimiento de contraseña, cambio de grupo, suspensiones y restauración |
| `#manage/admin/mail` | Todo el correo | `all-email:query` | Revisión del correo de todo el almacén, búsqueda avanzada con `$`, panel deslizante de detalle y eliminación física |
| `#manage/admin/roles` | Permisos | `role:query` | Grupos de identidad, plantillas de cuotas y autorización de modelos de IA |
| `#manage/admin/reg-keys` | Claves de registro | `reg-key:query` | Emisión y comprobación de los códigos de invitación |
| `#manage/admin/system` | Configuración del sistema | `setting:query` | Configuración al nivel de la instancia; la lista de tarjetas figura en la [Guía de configuración](/es/mail/settings/) |
| `#manage/admin/apps` | Gestión de aplicaciones | `setting:query` | Credenciales de las aplicaciones de terceros OAuth 2.0 / OIDC |
| `#manage/admin/rules` | Clasificación | `setting:query` | Interruptores de envío y recepción, reconocimiento por IA, listas blancas y negras y bloqueo duro |
| `#manage/admin/audit` | Informe de auditoría | `setting:query` | Revisión, tratamiento y adjudicación de apelaciones de las cuatro clases de alertas |

![Página de informes de auditoría de EpoCanvas Mail: avisos de las cuatro clases con sus botones de tratamiento (interfaz en chino simplificado)](/images/mail/ui/ui-audit-report.png)

*Figura: el informe de auditoría (`#manage/admin/audit`). La revisión ocurre en una única lista; los botones de tratamiento se reparten por clase de alerta.*

## 5. Superficie de inicio de sesión

`/login/` es una aplicación de inicio de sesión independiente, desplegada aparte de la interfaz principal. Una única tarjeta de inicio de sesión acoge todos los flujos:

| Flujo | Comportamiento |
| --- | --- |
| Inicio de sesión con contraseña | Se envían la cuenta (correo) y la contraseña; los fallos repetidos activan el bloqueo antifuerza bruta |
| Verificación en dos pasos | Aplicación de autenticación (TOTP de seis dígitos), códigos de recuperación de respaldo y llaves de acceso — uno o varios factores de forma escalonada; marcar «No volver a preguntar en este dispositivo» otorga una confianza de 30 días |
| Inicio de sesión de terceros | Los proveedores activados y configurados por el administrador aparecen como botones; los activados sin credenciales se muestran atenuados como «próximamente» |
| Registro | Correo (con sufijo de dominio preestablecido opcional), contraseña y código de registro; el modo del código puede ser obligatorio, desactivado u opcional, y la URL puede llevar parámetros de invitación |
| Olvido de contraseña | Un cuadro de diálogo salta al portal de apelaciones externo llevando el tipo de apelación, el idioma de la interfaz y la dirección de correo |
| Añadir cuenta | En modo multicuenta, se accede mediante `?action=addAccount&u=N`; tras iniciar sesión, la sesión aterriza en la ranura correspondiente |

![Página de inicio de sesión de EpoCanvas Mail: campos de correo y contraseña, casilla de «mantener la conexión orbital» y botones de acceso rápido de terceros (interfaz en chino simplificado)](/images/mail/ui/ui-login-oauth.png)

*Figura: la página de inicio de sesión. La regla de visualización de tres estados de los botones de terceros figura en la sección 4 de [Modos de funcionamiento](/es/mail/modes/).*

## 6. Páginas independientes y capacidades globales

| Interfaz | Ruta | Descripción |
| --- | --- | --- |
| Página de consentimiento OAuth | `#/oauth/authorize` | Se muestra cuando una aplicación de terceros solicita autorización: información de la aplicación, insignia oficial, lista de ámbitos y autorizar / cancelar |
| Perfil público | `/<username>` | Accesible sin iniciar sesión; muestra el avatar, la zona horaria, el grupo de identidad, la fecha de alta, un panel de datos personales y «escríbeme un correo»; sujeto al interruptor de «perfil público» del operador |
| Página 404 | otras rutas | Página de estado vacío para las rutas desconocidas, con una vía de regreso |
| PWA | — | La aplicación web puede instalarse; también se ofrece una aplicación para Android (epomail) |

El modo de correo también remodela la interfaz de administración: en el modo cifrado (Level 3) la entrada de revisión de todo el almacén se oculta y los informes de auditoría pierden sus marcas de tiempo; véase la sección 2 de [Modos de funcionamiento](/es/mail/modes/).

## 7. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Tutorial de registro de apps OAuth e integración de puntos de enlace | [Tutorial de registro de apps OAuth e integración de puntos de enlace](/es/mail/api/) |
| Operadores de búsqueda, búsqueda administrativa y condiciones de las reglas | [Referencia de búsqueda y reglas](/es/mail/search/) |
| Cada sección de configuración en detalle | [Guía de configuración](/es/mail/settings/) |
| Funciones detalladas con capturas de pantalla | [Guía de funciones](/es/mail/features/) |
| Formas de funcionamiento y grupos de permisos | [Modos de funcionamiento](/es/mail/modes/) |
| Posicionamiento del proyecto y despliegue | [Presentación del proyecto](/es/mail/project/) |
