---
title: Gestión de etiquetas y clasificación
description: Gestión de etiquetas y clasificación de EpoCanvas Mail — creación de etiquetas, iconos y colores, mantenimiento heurístico de las cuatro etiquetas de fábrica, constructor de reglas de clasificación y presentación de estadísticas.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.15**

Las etiquetas y las reglas de clasificación se gestionan en «Configuración → Etiquetas» (`#settings/labels`). La tabla completa de campos de condición de las reglas figura en la sección 7 de [Referencia de búsqueda y reglas](/es/mail/search/); esta página cubre las operaciones y estadísticas de las etiquetas propiamente dichas.

## 1. Creación y aspecto de las etiquetas

| Operación | Descripción |
| --- | --- |
| Etiqueta nueva | Se crea y se nombra en la zona de etiquetas de la barra lateral (hasta 7) o dentro de la página de etiquetas |
| Icono | Elija cualquiera del catálogo de iconos incorporado; también se admiten SVG personalizados |
| Color | Color personalizable en la paleta de etiquetas; se presenta sincronizado en la lista y en la barra lateral |
| Eliminar | Eliminar una etiqueta disuelve también sus referencias en las reglas |

## 2. Las cuatro etiquetas de fábrica

| Etiqueta | Mantenimiento |
| --- | --- |
| Comunidad | Una regla por defecto clasifica automáticamente por los dominios de correo público habituales |
| Suscripciones | Heurística incorporada: remitentes sin prefijo de respuesta, dominios de plataformas de marketing por correo y señales de baja |
| Promociones | Heurística incorporada: palabras de asunto de descuento y de oferta por tiempo limitado, densidad de vocabulario de marketing en el cuerpo |
| Trabajo | Se mantiene manualmente o con reglas propias |

Las cuatro etiquetas de fábrica pueden editarse y eliminarse; la clasificación heurística solo actúa sobre el correo nuevo que no haya sido tratado manualmente.

## 3. Constructor de reglas de clasificación

- Una regla se compone en dos pasos —condiciones y excepciones—: la acción se ejecuta cuando todas las condiciones coinciden y ninguna excepción lo hace;
- Los campos de condición (remitente, destinatario, asunto, cuerpo, dirección contiene, etc.) y la sintaxis multivalor figuran en la sección 7 de [Referencia de búsqueda y reglas](/es/mail/search/); los campos de valor cuentan con autocompletado del back-end;
- El valor numérico de `priority` decide el orden de ejecución (primero los números menores) y `stopProcessing` termina la cascada en cuanto una regla coincide;
- Las reglas se ejecutan automáticamente al llegar el correo y también pueden ejecutarse manualmente desde la página de etiquetas sobre el correo ya almacenado.

## 4. Estadísticas y revisión

- La zona de etiquetas de la barra lateral muestra en tiempo real el total y los no leídos de cada etiqueta;
- Los resultados de la clasificación pueden revisarse por la distribución de fuentes en la página de [Analítica](/es/mail/analysis/) de la zona de administración; las listas blancas y negras a nivel de sitio y el bloqueo duro los configura el administrador en la [Gestión de clasificación](/es/mail/category/).

<details>
<summary>Guía visual: pasos de uso de las etiquetas y del constructor de reglas</summary>

![Pasos de uso de las etiquetas y del constructor de reglas](/images/mail/es/ui/labels.png)

1. Entre en «Configuración → Etiquetas»; cree etiquetas en la zona de etiquetas de la barra lateral o dentro de la página de etiquetas (la barra lateral muestra hasta 7).
2. Elija para cada etiqueta un icono del catálogo incorporado o suba un SVG personalizado, y escoja su color en la paleta de etiquetas.
3. En la zona de reglas, componga cada regla en dos pasos —condiciones y excepciones—; los campos de valor cuentan con autocompletado.
4. Ajuste `priority` (primero los números menores) y `stopProcessing` (termina la cascada en cuanto una regla coincide); las reglas se ejecutan automáticamente al llegar el correo y también pueden ejecutarse manualmente.

</details>

## 5. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Condiciones de reglas y operadores de búsqueda | [Referencia de búsqueda y reglas](/es/mail/search/) |
| Listas a nivel de sitio y bloqueo duro | [Gestión de clasificación](/es/mail/category/) |
| Paneles de estadísticas de clasificación | [Analítica](/es/mail/analysis/) |
| Ubicación de la sección de etiquetas en la configuración | [Guía de configuración](/es/mail/settings/) |
