---
title: Interfaz del buzón y detalle del mensaje
description: Interfaz del buzón de EpoCanvas Mail — recorrido paso a paso por las ocho vistas, por todas las acciones de la página de detalle del mensaje, por la capa de redacción y por los hilos de conversación.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.16**

Esta página explica una a una las vistas de la interfaz principal del buzón y cada acción de la página de detalle del mensaje. Las rutas y el esqueleto de interfaz de cada vista figuran en [Mapa de interfaz y rutas](/es/mail/interface/); la búsqueda y las reglas que hay detrás de la organización, en [Referencia de búsqueda y reglas](/es/mail/search/).

![Bandeja de entrada de EpoCanvas Mail: vista dividida de tres columnas, insignia de código de verificación y marca de verificación oficial](/images/mail/ui/ui-inbox-zh.png)

*Figura: la bandeja de entrada. Lista, panel de lectura y barra lateral actúan concertados; los contadores se actualizan al instante.*

## 1. Las ocho vistas

| Vista | Puntos clave del comportamiento |
| --- | --- |
| Principal | Vista por defecto; orden cronológico ascendente/descendente, inserción incremental de correo nuevo por sondeo, lista virtualizada, puntos de no leídos, agrupación en conversaciones |
| Todo el correo | Vista agregada entre carpetas; pulsar una etiqueta de la barra lateral salta aquí filtrado por esa etiqueta |
| Enviados | Correo enviado por la cuenta |
| Borradores | Borradores locales; los destinatarios dejados en blanco muestran un marcador de sustitución |
| Destacados | Colección del correo destacado |
| Aplazados | Niveles urgente y en espera; vuelve a la bandeja de entrada automáticamente cuando llega el momento |
| Correo no deseado | Cuarentena de 7 días antes de pasar a la papelera |
| Papelera | Borrado físicamente siete días después de la recepción |

## 2. Acciones de la página de detalle del mensaje

| Grupo | Acciones |
| --- | --- |
| Respuesta | Responder, responder a todos, reenviar; respuesta en línea y reacciones con emojis |
| Organización | Destacar, leído/no leído, mover a (bandeja de entrada, correo no deseado, papelera), archivar, aplazar (hora predefinida o a elegir), etiquetar, denunciar como correo no deseado／legítimo |
| IA | Traducción integral (conserva el diseño original, con idioma de destino seleccionable mensaje por mensaje), insignia de código de verificación |
| Salida | Imprimir un mensaje o toda la conversación, descargar .eml, consultar las cabeceras originales |
| Gobernanza | Bloqueo del remitente, creación de filtros desde aquí (etiquetar／marcar como leído／mover a correo no deseado／mover a la papelera) |

## 3. La capa de redacción

La redacción es una capa superpuesta (no una ruta independiente); se abre desde el botón «Redactar» de la barra lateral, desde el botón flotante del móvil (requiere permiso de envío) y desde el enlace profundo `?composeTo=<address>` (destinatario prellenado).

- El campo de destinatarios admite la elección de contactos; el correo hacia los buzones del sitio se entrega directamente, y el correo fuera del sitio pasa por el canal de entrega configurado por el operador;
- La barra de herramientas de texto enriquecido reúne 17 herramientas: párrafo, tamaño de fuente, negrita, cursiva, subrayado y tachado, color, alineación, listas ordenadas y no ordenadas, cita, línea separadora, enlace, imagen, tabla, emojis, traducción y modo de código fuente;
- La capacidad de adjuntos se activa según el rol de la cuenta; el límite de un solo adjunto sigue la configuración de la instancia.

## 4. Conversaciones y diseño

El detalle del mensaje admite la agrupación en hilos de conversación, el diseño en capas y la respuesta rápida flotante; la consulta de las cabeceras originales sirve para diagnosticar problemas de entrega. El correo de remitentes oficiales lleva la marca de verificación y un banner explicativo; véase [Especificación del correo oficial y verificación contra manipulaciones](/es/mail/tamper-proof/).

<details>
<summary>Guía visual: pasos de uso de las vistas del buzón y del detalle del mensaje</summary>

![Pasos de uso de las vistas del buzón y del detalle del mensaje](/images/mail/es/ui/views.png)

1. Tras iniciar sesión se entra por defecto en la bandeja de entrada (`/mail/u/0/#inbox`); los botones de la parte superior conmutan el orden cronológico ascendente／descendente.
2. El correo nuevo se inserta automáticamente en la parte superior de la lista por sondeo, y los no leídos se marcan con un punto rojo; el árbol de carpetas de la barra lateral conmuta entre las ocho vistas.
3. Al pulsar una etiqueta de la barra lateral, la lista salta a «Todo el correo» filtrada por esa etiqueta.
4. Al pulsar cualquier correo se entra en la vista de detalle (`#message/<hash>`): responder, destacar, aplazar, etiquetar, traducir, descargar .eml y demás acciones figuran en la barra de acciones de la página.

</details>

## 5. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Rutas de las vistas y esqueleto de la interfaz | [Mapa de interfaz y rutas](/es/mail/interface/) |
| Operadores de búsqueda y condiciones de filtros | [Referencia de búsqueda y reglas](/es/mail/search/) |
| Etiquetas y constructor de reglas | [Gestión de etiquetas y clasificación](/es/mail/labels/) |
| Tratamiento de datos de la traducción | [Política de Privacidad](/es/mail/privacy-policy/), sección 6 |
