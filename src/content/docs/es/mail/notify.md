---
title: Guía de notificaciones y reenvío
description: Guía de notificaciones y reenvío de EpoCanvas Mail — vinculación del push de Telegram, preferencias de push y visibilidad de campos, y los destinos y tipos de disparador del reenvío automático.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.14**

Esta página recorre paso a paso las dos capacidades de la zona «Reenvío de correo y mensajes» de la página «Configuración → Datos»: el push de mensajes de Telegram y el reenvío automático. Que una cuenta disponga de ellas lo decide la tarjeta «Control de datos de usuario» del administrador; cuando está desactivada, los bloques correspondientes no se muestran. La exportación y el almacenamiento de datos viven en la misma página; véase la sección 5 de la [Guía de configuración](/es/mail/settings/).

![Zona de reenvío de correo y mensajes de EpoCanvas Mail: estado del push de Telegram y ajustes del reenvío automático](/images/mail/ui/ui-notify-forward.png)

*Figura: la zona de reenvío de correo y mensajes. El push de Telegram lleva su estado y su entrada de configuración; el reenvío automático muestra los destinos y las opciones avanzadas.*

## 1. Push de mensajes de Telegram

El push utiliza su propio bot privado de Telegram; el correo nuevo llega a su chat en tiempo real:

1. Cree un bot privado con @BotFather y tome el Bot Token (con la forma `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`);
2. Obtenga el Chat ID entre usted y ese bot (envíe al bot cualquier mensaje y léalo vía getUpdates; los grupos son negativos y los canales tienen el aspecto `-100123456789`);
3. En el elemento «Push de mensajes de Telegram» pulse el engranaje e introduzca el Bot Token y el Chat ID; si recibe dentro de un tema de grupo, rellene también el Topic ID;
4. Elija la preferencia de push: todo el correo, o solo el correo importante y el de códigos de verificación;
5. Pulse «Enviar mensaje de prueba» para verificar la conectividad y active después el push.

Las preferencias de visibilidad de campos del contenido del push (remitente, destinatario, cuerpo) las configura de forma global el administrador en la tarjeta de push de correo de la configuración del sistema; el bot oficial de todo el sitio y su bot privado no entran en conflicto.

## 2. Reenvío automático

| Ajuste | Descripción |
| --- | --- |
| Activar el reenvío automático | Interruptor general; al activarlo aparecen las opciones de abajo |
| Buzones de destino del reenvío | Una o varias direcciones de destino, separadas por comas |
| Tipo de disparador | Reenvía cada mensaje como copia (CC); o reenvía solo cuando el buzón receptor coincida con un prefijo o un alias de letras determinados (como `billing`, `dev-*`) |
| Cabecera del asunto | Añade opcionalmente una cabecera `[Fwd]` al asunto reenviado para que resulte reconocible en el buzón de destino |

:::note
La interfaz ofrece también el «reenvío filtrado por reglas inteligentes» y «conservar el original en la bandeja de entrada»; el motor de reenvío actual trata el modo de reglas inteligentes como todo el correo y aún no aplica la opción de conservar el original — pruebe estos comportamientos antes de depender de ellos.
:::

## 3. Ruta de entrega y protección contra bucles

El reenvío pasa primero por el canal de reenvío nativo de la plataforma y, si falla, recae en el canal de entrega del sistema con la cabecera opcional `[Fwd]`; los destinos iguales al destinatario o al remitente original se omiten para impedir bucles. La semántica de reglas de los tipos de disparador figura también en la sección 7 de la [Referencia de búsqueda y reglas](/es/mail/search/).

## 4. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Dónde se sitúa la página de datos en la configuración | [Guía de configuración](/es/mail/settings/) |
| Tratamiento de datos del reenvío y el push | [Tratamiento de datos y seguridad](/es/mail/data-security/) |
| Verificación en dos pasos y seguridad de la cuenta | [Guía de seguridad de la cuenta](/es/mail/security/) |
| Los interruptores de control de datos de usuario del administrador | [Modos de funcionamiento](/es/mail/modes/) |
