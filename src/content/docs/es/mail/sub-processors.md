---
title: Lista de destinatarios externos y encargados del tratamiento
description: Rutas configurables conocidas de transferencia de datos, contenidos transmitidos y funciones de los destinatarios, así como ubicaciones, contratos, conservación y garantías de transferencias transfronterizas que la instancia debe verificar.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.21**


<!-- legal-review-draft -->
:::caution[Borrador de revisión jurídica: no es el aviso vigente]
Este borrador recoge cláusulas propuestas y cuestiones pendientes de verificación. No sustituye al aviso vigente ni certifica el cumplimiento. No debe utilizarse para activar tratamientos antes de verificar la identidad y los datos de contacto legalmente exigidos al operador, las bases jurídicas reales, los destinatarios y las garantías de transferencia, la conservación y la supresión, y de facilitar la información requerida. La versión de referencia es la base de redacción en chino tradicional, no una entrada en vigor. Las obligaciones legales y los derechos existentes no se alteran.
:::

Esta página describe, conforme a la [Política de Privacidad](/es/mail/privacy-policy/), los flujos de datos a terceros que pueden producirse en la implementación de código abierto. La lista incluye encargados de infraestructura, servicios independientes, contactos y las integraciones que usted elija; no significa que todos los servicios siguientes estén habilitados en la instancia alojada ni sustituye los contratos efectivos con proveedores o los registros de configuración.

La versión en chino tradicional (Taiwán) es la versión oficial; las traducciones no limitan la ley aplicable ni los derechos de los interesados. El operador solo debe habilitar rutas que cuenten con una base jurídica válida, la notificación necesaria y garantías adecuadas; que el servicio sea gratuito o de prueba educativa no constituye una autorización general para transferir datos reales.

![Flujos de datos entre la instancia y la infraestructura, las integraciones elegidas, el tratamiento de contenido y los destinatarios legales](/images/mail/es/subprocessor-map.svg)

*Figura: las funciones y garantías de cada destinatario deben verificarse para cada ruta; que un proveedor tenga una certificación o facilite un modelo de contrato no significa que cada transferencia cumpla los requisitos aplicables.*

## 1. Infraestructura y entrega de correo

| Destinatario o configuración | Situación que activa el flujo | Datos a los que puede acceder | Función y aspectos que deben verificarse |
| --- | --- | --- | --- |
| Cloudflare | Workers, D1, KV, R2, Email Routing, Turnstile, Workers AI y registros de la plataforma, según los enlaces habilitados | Datos de solicitudes y autenticación, cuentas y correos almacenados, enrutamiento, adjuntos y contenido enviado a las funciones correspondientes | Verificar la entidad contratante, los términos de tratamiento de datos de cada servicio, las finalidades de los registros, las ubicaciones de almacenamiento y tratamiento y los subencargados; no se garantiza que el tratamiento se limite a Europa |
| Resend, Mailjet o canal saliente configurado | Envío de un correo fuera del sitio o de una notificación concreta del sistema | Dirección, asunto, cuerpo, adjuntos y datos necesarios para el informe de entrega | Verificar el acuerdo de encargo, la conservación de registros y las garantías transfronterizas según el canal utilizado; no deducir la ubicación solo por el nombre del producto |
| Destinatarios y sus proveedores de correo | Envío o reenvío por usted o mediante una regla configurada legalmente | Contenido enviado, campos de enrutamiento y adjuntos | El destinatario suele determinar de forma independiente el tratamiento posterior; no es siempre un encargado de la instancia y el envío puede ser irreversible |

## 2. Identidad, notificaciones y funciones públicas

| Destinatario o configuración | Situación que activa el flujo | Datos transmitidos o publicados | Límites de uso y revocación |
| --- | --- | --- | --- |
| Proveedores de identidad Linux DO, GitHub, Google, Microsoft, Apple o SSO personalizado | Inicio de sesión mediante el SSO correspondiente; el inicio de sesión externo global está desactivado por defecto en la versión revisada | Intercambio OAuth/OIDC, identificador, nombre, avatar, dirección de correo electrónico, nivel de confianza y atributos realmente devueltos | El proveedor y esta instancia tratan los datos según sus funciones efectivas; la autorización de inicio de sesión no equivale a consentir cualquier uso posterior |
| Aplicaciones OAuth/OIDC autorizadas | La instancia concede autorización e inicio de sesión a la aplicación | La implementación puede devolver, entre otros, sub, email, estado de verificación, nombre, nombre de usuario, avatar y campos de rol como is_admin/role; la respuesta no necesariamente se limita individualmente a los scopes solicitados | No se debe afirmar que solo se comparten openid/profile/email; informar de los campos realmente transmitidos y corregir cualquier divulgación que exceda lo necesario. La revocación no retira un ID token ya emitido ni los datos que ya obtuvo el destinatario |
| Telegram y servicios de bots | Vinculación y habilitación por el sistema o el usuario de notificaciones o reenvíos; las notificaciones globales están desactivadas por defecto en la versión revisada | Identificador del chat, asunto; según la configuración, remitente, destinatario y cuerpo; cuando existe un resultado de extracción, código de verificación, además de un enlace JWT de lectura accesible para quien lo posea y válido durante 7 días | Algunos campos y el enlace se añaden siempre; no deben describirse como totalmente seleccionables campo por campo; la instancia no controla las copias ni los reenvíos desde el chat, y detener las notificaciones no elimina los mensajes existentes |
| Blog o punto de conexión configurado para vincular niveles | Inicio de sesión, sincronización de cuota o ejecución de un flujo de consulta relacionado según la configuración | Identificador de correo electrónico e información de nivel o vinculación | No describir esta transferencia como si ocurriera solo al abrir manualmente la página de nivel; verificar punto de conexión, necesidad, base jurídica y frecuencia de actualización |
| Alojamiento de imágenes, fuente de avatar y visitantes del perfil público | Carga, visualización de imágenes externas o habilitación de perfil público | Imagen y datos de solicitud; el perfil público puede incluir el buzón principal, rol, campos personales y estadísticas de actividad o procedencia | Verificar según la configuración el almacenamiento predeterminado y el alojamiento externo; ocultar estadísticas en la interfaz no necesariamente limita el acceso a la API; véase la Sección 4 de la Política de Privacidad |

Un enlace de lectura puede permitir el acceso a cualquiera que lo posea; no debe considerarse autenticación de inicio de sesión ni cifrado de extremo a extremo. Su plazo y revocación dependen del mecanismo real de emisión y validación; mientras no se verifiquen, no prometa que todos los enlaces caducan a los 7 días o se invalidan al desactivar la cuenta.

## 3. IA, traducción y reconocimiento de imágenes

| Destinatario o configuración | Situación que activa el flujo | Datos que pueden transmitirse | Alcance y límites verificados |
| --- | --- | --- | --- |
| Modelo de códigos de verificación de Cloudflare Workers AI | Recepción de un nuevo correo después de habilitar el interruptor global de códigos de verificación; desactivado por defecto en la versión revisada | Asunto completo y hasta 6.000 caracteres JavaScript del texto del cuerpo | El asunto no se incluye en el límite del cuerpo; no se observó una opción de exclusión individual y el interruptor global no equivale al consentimiento individual |
| Modelo de texto compatible con OpenAI configurado y Workers AI | Uso de la traducción y su enrutamiento o alternativa | Texto traducido, instrucciones y posibles datos personales o sensibles incluidos | La compatibilidad de protocolo no significa que el destinatario sea OpenAI; se debe indicar la entidad efectiva, el punto de conexión y las condiciones de conservación |
| Interfaces públicas de MyMemory y Google Translate | Alternativa de traducción o complemento de fragmentos de texto faltantes | Fragmentos de texto e instrucciones | No ocurre únicamente si falla el punto de conexión completo del modelo; el contenido de las URL puede aparecer en los registros del servicio y de intermediarios; no transmita datos confidenciales reales antes de verificar las garantías |
| Workers AI o modelo visual externo configurado | OCR habilitado en el flujo de traducción; las llamadas API que omiten el parámetro pueden usar otro valor predeterminado | Bytes de imágenes incrustadas o URL de imágenes remotas con la ruta completa y parámetros de consulta; el texto reconocido entra después en la cadena de traducción | No se limita a imágenes cargadas por separado por el usuario; el filtrado de iconos y píxeles de seguimiento es heurístico y no garantiza que se omitan todos |

El operador no utiliza por cuenta propia los correos como conjunto de datos de entrenamiento. La conservación, el entrenamiento, la revisión humana o los subencargos posteriores por parte de los destinatarios deben verificarse para el servicio y contrato efectivos; no pueden deducirse de los términos «IA», «borde» ni de las declaraciones de esta página. Se deben deshabilitar las transferencias correspondientes mientras no estén aseguradas la base jurídica válida, la posibilidad de elección, la retirada y las condiciones de transferencia transfronteriza.

## 4. Almacenamiento propio y bases de datos externas

| Destinatario o configuración | Datos que puede tratar | Responsabilidades y límites de supresión |
| --- | --- | --- |
| Almacenamiento compatible con S3, R2 u otro almacenamiento de objetos elegido por el usuario o el operador | Adjuntos, identificadores de objetos y credenciales de acceso configuradas | La configuración determina la ubicación efectiva, el control de la cuenta y el contrato; el almacenamiento de la instancia puede recibir credenciales de acceso, por lo que no se puede afirmar que permanezcan únicamente en el dispositivo del usuario |
| Turso/LibSQL, punto de conexión HTTP SQL de prueba de conexión | Credenciales y consultas de prueba transmitidas al probar la conexión, con posibles datos en los registros del punto de conexión | La revisión solo encontró configuración y una sonda de conexión; los datos operativos siguen seleccionados en D1. No se ha implementado replicación ni enrutamiento externo de datos operativos; no debe describirse como una copia redundante ya establecida |

Que el usuario elija un proveedor no exime automáticamente al operador de sus responsabilidades legales respecto de las transferencias que realiza, la conservación de credenciales y la supresión. La eliminación física de respaldos y objetos externos debe verificarse por separado para cada almacenamiento; véase [Tratamiento de datos y mantenimiento de la seguridad](/es/mail/data-security/).

## 5. Solicitudes externas del navegador y de contenido remoto

| Destinatario o recurso | Situación | Datos que puede recibir y límites |
| --- | --- | --- |
| Google Fonts o CDN configurado de fuentes y recursos estáticos | Carga de la interfaz y de recursos externos | IP, User-Agent, hora y posiblemente datos de referencia; conviene evaluar el autoalojamiento y las transferencias innecesarias |
| Cloudflare Turnstile | Carga y desafío en páginas pertinentes de registro, verificación o seguridad | Datos de dispositivo, red y solicitud necesarios para la verificación; confirmar el almacenamiento terminal y la base jurídica según la configuración efectiva |
| Imágenes remotas del correo, iconos de dominio del remitente, avatares externos o alojamiento de imágenes | Visualización de correos o interfaz, carga de imágenes o apertura de enlaces | IP, hora de solicitud y URL completa de la imagen, que puede incluir identificadores del destinatario y parámetros de seguimiento; ocultar imágenes en la interfaz no significa que se hayan bloqueado todas las rutas externas |
| Proveedor de alojamiento del sitio de documentación, del proyecto y de enlaces externos | Cuando usted abre el sitio o el enlace | Solicitudes y registros del sitio correspondiente; las finalidades independientes de los sitios externos corresponden a sus propias notificaciones, mientras que la instancia sigue siendo responsable, conforme a la ley, del contenido que incorpora o de las solicitudes que inicia activamente |

La ausencia de SDK publicitarios o herramientas de análisis de terceros no permite concluir que no existan estas solicitudes. Las condiciones de localStorage del navegador, la verificación necesaria y el acceso no necesario al equipo terminal se indican en la Sección 4 de la Política de Privacidad.

## 6. Requisitos legales, acuerdos de tratamiento de datos y garantías transfronterizas

Los datos necesarios solo se facilitan a autoridades competentes si existe una base jurídica válida; el operador verifica la solicitud y su alcance e informa a los interesados cuando la ley lo permite. Una solicitud extranjera no excluye automáticamente la revisión conforme al RGPD ni la confidencialidad de las comunicaciones.

Cuando un destinatario actúe como encargado del tratamiento, el operador deberá, en la medida exigida por la ley aplicable, celebrar con dicho destinatario un acuerdo escrito de tratamiento de datos que cubra las instrucciones, la confidencialidad, la seguridad, los subencargos, la asistencia con los derechos de los interesados y los incidentes, la devolución o supresión al finalizar y las disposiciones de auditoría necesarias. Las condiciones generales de uso o esta lista no se convierten automáticamente en un acuerdo de tratamiento de datos firmado por todos los proveedores.

Para transferencias internacionales sujetas a las restricciones del RGPD, se debe verificar la decisión de adecuación u otra garantía válida según la entidad destinataria real, el destino y el alcance del servicio. Si se utilizan cláusulas contractuales tipo (SCC), deben incorporarse efectivamente las cláusulas adecuadas, evaluarse el impacto de la transferencia y aplicarse las medidas complementarias necesarias. Si se utiliza un mecanismo de adecuación basado en un marco de certificación, también debe verificarse que la entidad destinataria tenga una certificación vigente que cubra el servicio. Una certificación SOC/ISO, HTTPS, la red perimetral global o la disponibilidad de un modelo de SCC no demuestran por sí solos la licitud de esa transferencia. Puede solicitar un resumen y copias de las garantías que puedan facilitarse legalmente a `privacy@epocanvas.com`.

## 7. Registros de la instancia y actualización de la lista

| Información que la instancia debe publicar o facilitar conforme a la ley | Estado de verificación de este documento |
| --- | --- |
| Proveedores habilitados, entidades contratantes, funciones y alcance de los datos | El código fuente confirma las rutas disponibles; no se ha revisado la lista de servicios realmente habilitados en la instancia alojada |
| Ubicaciones de almacenamiento, inferencia, registros y subencargos posteriores | No verificadas mediante registros del despliegue y del proveedor; no se garantiza que el tratamiento se limite a una región determinada |
| Plazos concretos de conservación por categoría de datos, registros de proveedores y respaldos | La instancia debe completarlos y verificarlos; no se deben ocultar plazos ya conocidos tras la expresión «según la política del proveedor» |
| Contratos de tratamiento, mecanismos transfronterizos y evaluaciones de impacto | No se ha confirmado que se hayan firmado o completado; este documento no significa que estén vigentes |
| Notificación, consentimiento válido y retirada para funciones opcionales | Los interruptores y botones del código fuente no constituyen prueba completa; se deben verificar el flujo efectivo y sus registros |

Antes de habilitar los flujos pertinentes, el operador debe completar las verificaciones necesarias y notificar adecuadamente antes de añadir destinatarios, finalidades o cambios sustanciales en las garantías; deberá obtener un nuevo consentimiento cuando así lo exija la ley. La fecha de actualización solo indica una revisión del texto y no significa que todos los usuarios hayan recibido una notificación o aceptado el nuevo tratamiento. Las fuentes de la lista y el tratamiento de asuntos pendientes también figuran en la Sección 13 de la [Política de Privacidad](/es/mail/privacy-policy/).
