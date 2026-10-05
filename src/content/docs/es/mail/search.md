---
title: Referencia de búsqueda y reglas
description: Referencia completa de búsqueda y reglas de EpoCanvas Mail — operadores de campos del correo, banderas de alcance, conmutadores de precisión, comportamiento del resaltado, búsqueda administrativa con `$`, búsqueda de configuración y todas las condiciones de las reglas de clasificación.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.13**

EpoCanvas Mail dispone de dos sistemas de recuperación: la búsqueda de correo orientada al usuario (el cuadro de búsqueda de la barra superior) y la búsqueda de todo el almacén del administrador (la sección administrativa «Todo el correo»); las páginas de configuración tienen además su propia búsqueda de configuración. Esta página enumera cada operador, bandera y condición de regla, conforme a la implementación actual. Las reglas de clasificación comparten con la búsqueda la misma semántica de campos; el motor de reglas se describe a partir de la sección 7.

![Búsqueda de EpoCanvas Mail: tras introducir from:github, la lista muestra solo el correo coincidente con la palabra clave resaltada (interfaz en chino simplificado)](/images/mail/ui/ui-search.png)

*Figura: búsqueda de correo. Los operadores se combinan libremente con palabras clave simples; las coincidencias se iluminan al instante.*

## 1. Fundamentos de la sintaxis

- Varias condiciones se separan con espacios y se combinan como AND — todas deben cumplirse;
- Los valores con espacios se cierran entre comillas dobles, como en `subject:"annual report"`;
- Una palabra clave sin operador coincide en cinco campos con OR: asunto, nombre del remitente, dirección del remitente, dirección del destinatario y cuerpo;
- Por defecto, la coincidencia es difusa, por subcadenas e insensible a las mayúsculas; el comportamiento de precisión y de mayúsculas puede cambiarse con banderas (sección 3).

```text
from:github subject:"verification code" after:2026-10-01 exact:true
```

## 2. Operadores de campo

Los diez operadores de campo actúan sobre su campo; los valores coinciden por subcadenas (salvo fechas y tamaños):

| Operador | Valor | Significado |
| --- | --- | --- |
| `from:<value>` | texto | La dirección del remitente o el nombre del remitente contiene el valor; `from:me` equivale a `is:sent` |
| `to:<value>` | texto | La dirección del destinatario o el nombre del destinatario contiene el valor |
| `subject:<value>` | texto | Coincide solo con el asunto |
| `subject_or_body:<value>` | texto | El asunto o el cuerpo contiene el valor |
| `body:<value>` | texto | Coincide solo con el cuerpo en texto plano |
| `larger:<bytes>` | entero | El tamaño del mensaje (cuerpo más longitud del contenido) es de al menos estos bytes |
| `smaller:<bytes>` | entero | El tamaño del mensaje es de como máximo estos bytes |
| `before:<date>` | AAAA-MM-DD | Recibido antes de esta fecha |
| `after:<date>` | AAAA-MM-DD | Recibido después de esta fecha |
| `label:<name>` | nombre de etiqueta | Correo que lleva esta etiqueta; entrecomille el nombre cuando contenga caracteres no ASCII |

## 3. Alcance y banderas

Las banderas cambian el alcance o la presentación de la búsqueda y se retiran de las palabras clave:

| Bandera | Comportamiento |
| --- | --- |
| `global:` | Amplía la búsqueda a todos los buzones, sin quedar limitada por la vista actual |
| `is:sent` | Fuerza la inclusión del correo enviado en la consulta |
| `is:spam` | Cambia el dominio de la consulta a Correo no deseado |
| `is:trash` | Cambia el dominio de la consulta a la Papelera |
| `is:draft` | Salto en el front-end a Borradores (los borradores viven solo en el dispositivo) |
| `hl:off` | Desactiva el resaltado de las coincidencias |
| `exact:true` | Coincidencia por límites de palabra completa, evitando falsos positivos de subcadenas |
| `case:true` | Activa la distinción de mayúsculas y minúsculas |

## 4. Resaltado y extractos

Las coincidencias se resaltan en la lista y en la vista de detalle; la ventana del extracto se desliza hacia la coincidencia para conservar su contexto. Con `exact:true` solo se iluminan las coincidencias de palabra completa, con `case:true` se distinguen las mayúsculas y `hl:off` apaga el resaltado por completo. El resaltado es un renderizado nativo del navegador y nunca altera el contenido del mensaje.

## 5. Búsqueda administrativa con `$`

La sección administrativa «Todo el correo» ofrece una sintaxis avanzada con el prefijo `$` para la revisión de todo el almacén:

| Token | Significado |
| --- | --- |
| `$sender` | Buscar por nombre o dirección del remitente |
| `$user` | Buscar por la cuenta propietaria del correo |
| `$to` | Buscar por la cuenta destinataria |
| `$subject` | Buscar por asunto |
| `$received` / `$sent` / `$deleted` / `$norecipient` / `$all` | Filtro de estado: recibido, enviado, eliminado, sin destinatario, todo |

Los tokens aceptan variantes de mayúsculas inglesas y alias chinos (como `$发件人`, `$用户`, `$收件人`, `$主题`); escape un `$` literal en un valor como `\$`. Pulsar con el botón derecho sobre cualquier correo de la lista inicia directamente una búsqueda por su remitente, su cuenta destinataria o su usuario propietario. En el modo cifrado (Level 3) la lista administrativa de correo está permanentemente vacía y esta sintaxis no está disponible con ella; véase la sección 2 de [Modos de funcionamiento](/es/mail/modes/).

## 6. Búsqueda de configuración

En las páginas de configuración, el cuadro de búsqueda cambia a la búsqueda de configuración:

| Entrada | Comportamiento |
| --- | --- |
| sin prefijo | Busca solo en el panel actual, resalta las coincidencias y las desplaza a la vista, sin ninguna solicitud |
| `all:` o `global:` | Busca en todas las páginas de configuración en un desplegable agrupado; un clic salta y localiza |
| `app:`, `oauth:`, `client:` | Busca las aplicaciones OAuth en la gestión de aplicaciones |

Las sugerencias aparecen mientras se escribe; Tab completa un operador.

## 7. Condiciones de las reglas de clasificación

El constructor de reglas de la sección de etiquetas define cada regla en dos pasos — condiciones y excepciones: la acción se ejecuta cuando todas las condiciones coinciden y ninguna excepción lo hace. Las condiciones disponibles:

| Condición | Significado |
| --- | --- |
| `from` (el remitente es) | La dirección o el nombre del remitente coincide exactamente; admite varios valores separados por comas |
| `to` (el destinatario es) | El destinatario coincide exactamente; admite varios valores |
| `sender_address_includes` (la dirección del remitente contiene) | Coincide por el dominio del remitente o por un fragmento de la dirección |
| `recipient_address_includes` (la dirección del destinatario contiene) | Coincide por el dominio del destinatario o por un fragmento de la dirección |
| `email_received_for_others` (enviado también a otros) | La dirección aparece en otra casilla de destinatario |
| `subject_include` (el asunto contiene) | Palabras clave del asunto; admite varios valores |
| `message_body_includes` (el cuerpo contiene) | Palabras clave del cuerpo; admite varios valores |
| `subject_or_body_include` (el asunto o el cuerpo contiene) | Basta con que uno de los dos coincida |
| `system_setting` (veredicto del sistema) | Se refiere a un veredicto a nivel del sistema (como una coincidencia con la lista blanca) |

:::note
El constructor ofrece también condiciones de tamaño (`at_least` / `at_most`), de fecha (`before` / `after`) y de cabecera del mensaje (`message_header_includes`); la versión actual del motor aún no implementa su evaluación — una regla que las lleve no coincidirá. Se enumeran aquí para impedir configuraciones erróneas.
:::

## 8. Acciones y prioridad

- Una regla que coincide etiqueta el correo con la etiqueta de la regla;
- El número `priority` decide el orden de ejecución; primero los números menores;
- Con `stopProcessing` activado, una coincidencia en esa regla termina la cascada de reglas;
- Las reglas se ejecutan automáticamente al llegar el correo y también pueden ejecutarse manualmente desde la página de etiquetas.

## 9. Heurísticas incorporadas y gobernanza del sitio

- Cuatro etiquetas vienen de fábrica — Comunidad, Suscripciones, Promociones y Trabajo; Suscripciones y Promociones se mantienen con heurísticas incorporadas: los remitentes sin prefijo de respuesta, los dominios de plataformas de marketing por correo y las señales de baja acaban en Suscripciones; las palabras de asunto de descuento y urgencia, junto con la densidad de vocabulario de marketing, acaban en Promociones;
- La gobernanza a nivel del sitio se configura en la sección administrativa «Clasificación»: listas blancas y de bloqueo de remitentes, palabras clave de asunto y de contenido, modo de lista blanca, interceptación de remitentes sin nombre, interceptación de no destinatarios e interceptación de adjuntos ejecutables; las coincidencias de lista aplican automáticamente sus etiquetas dedicadas, y el bloqueo duro rechaza de plano con un contador;
- El comportamiento de las reglas y las listas se describe con más detalle en la sección 4 de la [Guía de funciones](/es/mail/features/).

## 10. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Rutas de la interfaz y ubicación de los cuadros de búsqueda | [Mapa de interfaz y rutas](/es/mail/interface/) |
| Dónde se gestionan las etiquetas y las reglas | [Guía de configuración](/es/mail/settings/) |
| Funciones detalladas con capturas de pantalla | [Guía de funciones](/es/mail/features/) |
| Cómo el modo de correo acota el alcance de la búsqueda | [Modos de funcionamiento](/es/mail/modes/) |
