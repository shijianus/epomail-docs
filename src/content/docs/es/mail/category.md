---
title: Gestión de clasificación
description: Gestión de clasificación de EpoCanvas Mail — interruptores de recepción y envío, configuración del reconocimiento por IA, listas blancas y negras y reglas de bloqueo duro, a escala del sitio.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.15**

La gestión de clasificación es la interfaz de gobernanza a nivel de sitio de la zona de administración (`#manage/admin/rules`, clave de permiso `setting:query`); superpone la gobernanza de la recepción de todo el sitio sobre las reglas personales de cada usuario. Las reglas personales de etiquetas figuran en [Gestión de etiquetas y clasificación](/es/mail/labels/); la semántica de los campos de condición, en la sección 7 de [Referencia de búsqueda y reglas](/es/mail/search/).

## 1. Interruptores de recepción, envío y refresco

Los interruptores generales de la función de recepción, de la función de envío y del refresco automático, junto con el interruptor de tratamiento del correo sin destinatario; al cerrar la recepción, el correo entrante se rechaza de plano.

## 2. Reconocimiento por IA

La extracción de códigos de verificación por Workers AI y la configuración de sus reglas, y la clave, la URL y el modelo de la API de IA — comparten origen con el AI Hub de la [Configuración del sistema](/es/mail/system/); lo que aquí se controla es el comportamiento de reconocimiento del correo entrante (la insignia del código de verificación, entre otros).

## 3. Listas e interceptación

| Mecanismo | Descripción |
| --- | --- |
| Lista negra de remitentes | El correo coincidente se intercepta; configurable como modo de etiqueta o como interceptación directa |
| Modo de lista blanca | Solo los remitentes dentro de la lista blanca pueden entregar; el resto se trata según la política |
| Remitentes de bloqueo duro | Rechazo directo y acumulación del contador de interceptaciones |
| Palabras clave de asunto y de contenido | Se intercepta el correo que coincida con las palabras clave de la lista negra |
| Interceptación de remitentes vacíos | Se rechaza el correo sin nombre de remitente |
| Interceptación de no destinatarios | Se rechaza el correo cuyo destinatario no incluye una dirección de la instancia |
| Interceptación de adjuntos ejecutables | Se rechaza el correo que lleva adjuntos ejecutables |

## 4. Capas frente al lado del usuario

Las listas a nivel de sitio las mantiene el administrador y actúan sobre toda la instancia; las reglas del lado del usuario solo actúan sobre su propio buzón; la coincidencia en cualquiera de las dos capas aplica automáticamente la etiqueta correspondiente. Los detalles del comportamiento de las listas y las palabras clave figuran en la sección 9 de [Referencia de búsqueda y reglas](/es/mail/search/); el tratamiento del abuso, en la [Política de Uso Aceptable](/es/mail/acceptable-use/).

<details>
<summary>Guía visual: pasos de gobernanza a nivel de sitio</summary>

![Pasos de gobernanza a nivel de sitio](/images/mail/es/ui/category.png)

1. Entre en la «Gestión de clasificación» de la zona de administración (exige la clave de permiso `setting:query`).
2. Configure los interruptores de la función de recepción y de envío, el refresco automático y el tratamiento del correo sin destinatario.
3. Configure el reconocimiento de códigos de verificación por Workers AI y los parámetros de su API (clave, URL y modelo).
4. Active según convenga: lista negra de remitentes, modo de lista blanca, remitentes de bloqueo duro, palabras clave de asunto y de contenido, interceptación de remitentes vacíos, de no destinatarios y de adjuntos ejecutables.
5. La coincidencia en las listas aplica automáticamente la etiqueta correspondiente, y el bloqueo duro rechaza directamente y acumula el contador; la tasa de interceptación puede revisarse después en la página de Analítica.

</details>

## 5. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Etiquetas y reglas del lado del usuario | [Gestión de etiquetas y clasificación](/es/mail/labels/) |
| Revisión de la tasa de interceptación y de la distribución de fuentes | [Analítica](/es/mail/analysis/) |
| Revisión en la dimensión del correo | [Revisión del correo de todo el almacén](/es/mail/review/) |
| Los límites del envío masivo | [Política de Uso Aceptable](/es/mail/acceptable-use/) |
