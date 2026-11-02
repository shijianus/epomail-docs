---
title: Guía de notificaciones y reenvío
description: Guía de notificaciones y reenvío de EpoCanvas Mail — vinculación del push de Telegram, preferencias de push y visibilidad de campos, y los destinos y tipos de disparador del reenvío automático.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

Esta página recorre paso a paso las dos capacidades de la zona «Reenvío de correo y mensajes» de la página «Configuración → Datos»: el push de mensajes de Telegram y el reenvío automático. Que una cuenta disponga de ellas lo decide la tarjeta «Control de datos de usuario» del administrador; cuando está desactivada, los bloques correspondientes no se muestran. La exportación y el almacenamiento de datos viven en la misma página; véase la sección 5 de la [Guía de configuración](/es/mail/settings/).

![Zona de reenvío de correo y mensajes de EpoCanvas Mail: estado del push de Telegram y ajustes del reenvío automático](/images/mail/es/ui/notify-guide.png)

*Figura: la zona de reenvío de correo y mensajes. El push de Telegram lleva su estado y su entrada de configuración; el reenvío automático muestra los destinos y las opciones avanzadas.*

<details>
<summary>Guía visual: Exportación y reenvío —  cómo se llevan los datos y cómo llegan los mensajes nuevos</summary>

Las tres tarjetas de exportación y la zona de título del reenvío de correo y mensajes, en la página «Datos»: lo de arriba gobierna en qué formato salen los datos, y lo de abajo, cómo llega el correo entrante en tiempo real.

1. **Tarjeta de exportación de datos en JSON**: Descarga algunos campos de la cuenta, campos de correos no marcados como eliminados y etiquetas personalizadas; no incluye archivos adjuntos, todos los ajustes de seguridad ni todos los datos personales.
2. **Tarjeta del archivo del historial de correo**: El navegador convierte la misma respuesta del servidor a MBOX, JSON o CSV; el servidor no aplica el rango de fechas elegido y la exportación no incluye el MIME original completo ni los archivos adjuntos.
3. **Tarjeta de contactos y configuración**: Exporta el subconjunto de campos personales devuelto y las etiquetas personalizadas; no constituye una copia completa de los contactos, las reglas de alias ni todas las preferencias.
4. **Zona de título del reenvío de correo y mensajes**: Acceso a Telegram y al reenvío automático. Las notificaciones personales permiten elegir todo el correo o solo el importante; la vista previa y la copia de códigos se eligen aparte. Cada acceso a enlaces de lectura o adjuntos comprueba el estado actual y la versión de revocación; véanse los límites siguientes.

</details>

## 1. Push de mensajes de Telegram

El push utiliza su propio bot privado de Telegram; el correo nuevo llega a su chat en tiempo real:

1. Cree un bot privado con @BotFather y tome el Bot Token (con la forma `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`);
2. Obtenga el Chat ID entre usted y ese bot (envíe al bot cualquier mensaje y léalo vía getUpdates; los grupos son negativos y los canales tienen el aspecto `-100123456789`);
3. En el elemento «Push de mensajes de Telegram» pulse el engranaje e introduzca el Bot Token y el Chat ID; si recibe dentro de un tema de grupo, rellene también el Topic ID;
4. Elija `all` o `important` para las notificaciones personales. Solo se considera importante un mensaje con las etiquetas exactas `重要` / `important`, una estrella realmente registrada o un código de verificación ya presente, no por palabras en el asunto. `notifyCodeOnly` vale `false` por defecto y solo controla un botón adicional para copiar el código; el botón aparece únicamente para un código extraído existente de hasta 256 caracteres y no filtra las notificaciones para enviar solo mensajes con códigos;
5. Pulse «Enviar mensaje de prueba» para comprobar el chat de destino y, antes de activar las notificaciones, confirme los campos transmitidos y el enlace de lectura.

En las notificaciones personales, `includePreview` vale `false` por defecto. En los modos `all` e `important`, la notificación sigue usando el asunto (o un título genérico si falta), hasta 200 caracteres, incluso sin vista previa; `true` explícito añade además una vista previa de hasta 400 caracteres y un enlace de lectura cuando la configuración lo permite. El modo `privacy` solo envía un título genérico, independientemente de las demás opciones, sin asunto, remitente, destinatario, código ni enlace. Las notificaciones del sistema siguen por separado los campos configurados por el administrador; el interruptor de vista previa personal no las desactiva. El Bot Token y el Chat ID se envían al servidor de la instancia y no quedan solo en el dispositivo. El reconocimiento automático de códigos mediante IA está desactivado por defecto y exige por separado elección individual y servicio configurado; es distinto del filtrado y de la opción de copiar códigos.

La implementación local de esta revisión comprueba en cada lectura o acceso a adjuntos de Telegram la caducidad del enlace, el estado del propietario, del buzón y del mensaje y la versión de revocación. Desactivar la vista previa personal también bloquea los enlaces personales anteriores. La lectura compartida no carga contenido remoto. Desactivar las notificaciones individuales o cambiar ajustes pertinentes revoca los enlaces anteriores. El botón para revocar enlaces existentes en Ajustes → Datos revoca los enlaces ya emitidos para esta cuenta tanto por notificaciones individuales como del sistema; las notificaciones futuras pueden generar otros de forma independiente. Cerrar sesión de forma ordinaria no revoca estos enlaces, mientras que desactivar la cuenta bloquea el acceso mediante las comprobaciones de estado. Revocar no elimina contenido ya presente en chats de Telegram ni copias descargadas. Estos mecanismos no acreditan la actualización de todos los despliegues en línea; véase la [Lista de destinatarios externos y encargados del tratamiento](/es/mail/sub-processors/).

## 2. Reenvío automático

| Ajuste | Descripción |
| --- | --- |
| Activar el reenvío automático | Interruptor general; al activarlo aparecen las opciones de abajo |
| Buzones de destino del reenvío | Una o varias direcciones de destino, separadas por comas |
| Tipo de disparador | Todo el correo o prefijo literal del buzón destinatario, por ejemplo `billing`; `*` no es un comodín y una lista vacía de prefijos de alias no reenvía nada |
| Cabecera del asunto | Añade opcionalmente una cabecera `[Fwd]` al asunto reenviado para que resulte reconocible en el buzón de destino |

:::note
El reenvío personal por reglas inteligentes (`rules`) no está disponible: no reenvía nada al ejecutarse ni recurre a reenviar todo; guardar una configuración `rules` activada se rechaza. El `keepCopy` guardado se normaliza a `true`: `keepCopy=false` se rechaza únicamente cuando el reenvío está habilitado y una configuración deshabilitada también se guarda como `true`. El reenvío no elimina automáticamente el original. Es el comportamiento actual del código local; las pruebas siguen repitiéndose y no confirma un despliegue en línea.
:::

## 3. Ruta de entrega y protección contra bucles

El reenvío utiliza primero el canal nativo de la plataforma; si falla, puede recurrir al canal de entrega del sistema y añadir `[Fwd]` según los ajustes. Esa llamada alternativa solo incluye campos como el asunto y el cuerpo, sin los adjuntos ordinarios, por lo que no garantiza que el destino reciba el mensaje original completo. Se omiten los destinos iguales al destinatario o al remitente original; esto no garantiza eliminar todos los bucles de varios saltos. Las reglas previas del sistema también pueden terminar directamente el flujo de recepción, omitiendo las notificaciones y los reenvíos individuales. La semántica de las reglas figura en la sección 7 de la [Referencia de búsqueda y reglas](/es/mail/search/).

## 4. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Dónde se sitúa la página de datos en la configuración | [Guía de configuración](/es/mail/settings/) |
| Tratamiento de datos del reenvío y el push | [Tratamiento de datos y seguridad](/es/mail/data-security/) |
| Verificación en dos pasos y seguridad de la cuenta | [Guía de seguridad de la cuenta](/es/mail/security/) |
| Los interruptores de control de datos de usuario del administrador | [Modos de funcionamiento](/es/mail/modes/) |
