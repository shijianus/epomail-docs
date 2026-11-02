---
title: Interfaz del buzón y detalle del mensaje
description: Interfaz del buzón de EpoCanvas Mail — recorrido paso a paso por las ocho vistas, por todas las acciones de la página de detalle del mensaje, por la capa de redacción y por los hilos de conversación.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

Esta página explica una a una las vistas de la interfaz principal del buzón y cada acción de la página de detalle del mensaje. Las rutas y el esqueleto de interfaz de cada vista figuran en [Mapa de interfaz y rutas](/es/mail/interface/); la búsqueda y las reglas que hay detrás de la organización, en [Referencia de búsqueda y reglas](/es/mail/search/).

![Bandeja de entrada de EpoCanvas Mail: vista dividida de tres columnas, insignia de código de verificación y marca de verificación oficial](/images/mail/es/ui/views-guide.png)

*Figura: la bandeja de entrada. Lista, panel de lectura y barra lateral actúan concertados; los contadores se actualizan al instante.*

<details>
<summary>Guía visual: La bandeja de entrada de un vistazo —  las cuatro entradas que más se usan</summary>

Cuatro regiones anotadas de la bandeja de entrada, correspondientes a los cuatro accesos más usados: redactar un mensaje nuevo, releer el correo destacado, revisar lo aplazado y cotejar lo ya enviado.

1. **Redactar (botón principal en la parte superior de la barra lateral)**: Es el único punto de entrada para crear correo nuevo: abre la capa de redacción superpuesta (no es una ruta independiente). En el móvil pasa a ser un botón flotante en la esquina inferior derecha, y el enlace profundo `?composeTo=<address>` permite prellenar el destinatario. Desde cualquier vista se puede empezar a escribir con un solo clic.
2. **Destacados (carpeta de la barra lateral)**: Aquí se reúne el correo destacado de todas las carpetas: basta pulsar la estrella en una fila de la lista para añadirlo. Sirve para conservar a mano el correo que hay que guardar largo tiempo o releer con frecuencia; el contador de la barra lateral refleja la cantidad en tiempo real.
3. **Aplazados (carpeta de la barra lateral)**: Zona de espera para los seguimientos aplazados, en dos niveles: urgente y en espera. Al elegir «Aplazar» en la página de detalle y fijar una hora, el mensaje vuelve solo a la parte superior de la bandeja de entrada cuando llega el momento, de modo que lo importante no se hunde en la lista.
4. **Enviados (carpeta de la barra lateral)**: Copia de todo el correo que ha salido de esta cuenta, útil para comprobar qué se ha entregado realmente. El volumen saliente está sujeto a la cuota diaria de envío del rol de la cuenta; el correo dentro del sitio se entrega directamente y el dirigido fuera de él pasa por el canal de entrega.

</details>

## 1. Las ocho vistas

| Vista | Puntos clave del comportamiento |
| --- | --- |
| Principal | Vista por defecto; orden cronológico ascendente/descendente, inserción incremental de correo nuevo por sondeo, lista virtualizada, puntos de no leídos, agrupación en conversaciones |
| Todo el correo | Vista agregada entre carpetas; pulsar una etiqueta de la barra lateral salta aquí filtrado por esa etiqueta |
| Enviados | Correo enviado por la cuenta |
| Borradores | Registros locales `draft` y adjuntos `att` en IndexedDB; cerrar sesión de forma ordinaria conserva los borradores, mientras que eliminar una entrada borra ambos en una misma transacción |
| Destacados | Colección del correo destacado |
| Aplazados | Niveles urgente y en espera; vuelve a la bandeja de entrada automáticamente cuando llega el momento |
| Correo no deseado | La tarea programada calcula la antigüedad desde la creación del mensaje y, por defecto, lo traslada a la papelera al superar 7 días; no garantiza otros 7 días desde su traslado a correo no deseado |
| Papelera | El umbral fijo de 7 días también se calcula desde la creación y puede alcanzarse en la misma ejecución que el traslado desde correo no deseado; si el uso supera el 90 % de la cuota, una operación de eliminación también puede borrar físicamente de inmediato |

## 2. Acciones de la página de detalle del mensaje

| Grupo | Acciones |
| --- | --- |
| Respuesta | Responder, responder a todos, reenviar; respuesta en línea y reacciones con emojis |
| Organización | Destacar, leído/no leído, mover a (bandeja de entrada, correo no deseado, papelera), archivar, aplazar (hora predefinida o a elegir), etiquetar, denunciar como correo no deseado／legítimo |
| IA | Traducción integral con aviso sobre el destino de los datos y confirmación en cada solicitud; OCR desactivado por defecto. El reconocimiento automático de códigos está desactivado por defecto y requiere elección individual y servicio configurado |
| Salida | Imprimir un mensaje o una conversación, reconstruir y descargar un .eml desde los campos existentes y consultar las cabeceras disponibles; la exportación de autoservicio excluye el MIME original completo guardado temporalmente para recuperar entregas |
| Gobernanza | Bloqueo del remitente, creación de filtros desde aquí (etiquetar／marcar como leído／mover a correo no deseado／mover a la papelera) |

## 3. La capa de redacción

La redacción es una capa superpuesta (no una ruta independiente); se abre desde el botón «Redactar» de la barra lateral, desde el botón flotante del móvil (requiere permiso de envío) y desde el enlace profundo `?composeTo=<address>` (destinatario prellenado).

- El campo de destinatarios admite la elección de contactos; el correo hacia los buzones del sitio se entrega directamente, y el correo fuera del sitio pasa por el canal de entrega configurado por el operador;
- La barra de herramientas de texto enriquecido reúne 17 herramientas: párrafo, tamaño de fuente, negrita, cursiva, subrayado y tachado, color, alineación, listas ordenadas y no ordenadas, cita, línea separadora, enlace, imagen, tabla, emojis, traducción y modo de código fuente;
- La capacidad de adjuntos se activa según el rol de la cuenta; el límite de un solo adjunto sigue la configuración de la instancia.

## 4. Conversaciones y diseño

El detalle del mensaje admite hilos de conversación, diseño en capas y respuesta rápida flotante. Las cabeceras mostradas y los .eml descargados siguen reconstruyéndose desde campos, sin ser una descarga del MIME original completo; véase [Exportación y almacenamiento](/es/mail/data/) para la copia cifrada de recuperación de entregas y su plazo de limpieza. La implementación local de esta revisión bloquea por defecto imágenes remotas, estilos que cargan recursos de red y contenido activo. En la lectura ordinaria se pueden permitir imágenes solo para el mensaje actual, tras informar de que cargarlas puede revelar la dirección IP y la apertura del mensaje. La impresión sigue bloqueando contenido remoto por defecto y la lectura compartida de Telegram no permite cargarlo. Las imágenes integradas seguras y los adjuntos verificados del sitio se distinguen de los recursos de seguimiento de terceros.

Cerrar sesión de forma ordinaria elimina la sesión actual, la caché del mensaje abierto y el historial de destinatarios, pero conserva las sesiones de otras cuentas y los borradores locales. Eliminar todos los datos locales del sitio requiere una confirmación aparte mediante la [limpieza de la página Datos](/es/mail/data/). Estos comportamientos describen el código local, no confirman la actualización de todas las instancias en línea. Véanse la sección 4.3 de la [Política de Privacidad](/es/mail/privacy-policy/) sobre los límites del almacenamiento y la [Especificación del correo oficial y verificación contra manipulaciones](/es/mail/tamper-proof/) sobre las marcas oficiales.

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
