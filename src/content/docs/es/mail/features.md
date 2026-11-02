---
title: Guía de funciones de EpoCanvas Mail
description: Guía de funciones de EpoCanvas Mail — organización de la bandeja de entrada, redacción y envío, sintaxis de búsqueda, motor de reglas de etiquetas, extracción de códigos de verificación, gestión del correo no deseado, reenvío y notificaciones, funciones de IA y plataforma abierta.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

Esta página describe la implementación de EpoCanvas Mail tras esta ronda de cambios. Las capturas existentes indican dónde están los controles; no acreditan que los cambios se hayan desplegado en producción ni que todas las funciones estén activadas. El posicionamiento del proyecto, su historial de desarrollo y su despliegue se describen en [Presentación del proyecto](/es/mail/project/); el tratamiento y la conservación de datos figuran en [Tratamiento de datos y seguridad](/es/mail/data-security/).

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional.

![Panorama de la bandeja de entrada de EpoCanvas Mail: a la izquierda, el acceso de redacción, el árbol de carpetas (Principal, Destacados, Aplazados, Enviados, Borradores, Todo el correo, Correo no deseado, Papelera) y las etiquetas de colores (Comunidad, Suscripciones, Promociones, Trabajo); a la derecha, la lista muestra el remitente, el asunto, el extracto, la insignia de código de verificación y la marca de verificación oficial (interfaz en chino simplificado)](/images/mail/es/ui/views-guide.png)

*Figura: bandeja de entrada (captura en chino simplificado). La lista muestra directamente la insignia del código de verificación (marco verde) y la marca de verificación del correo oficial (marca de verificación azul); los contadores de carpetas y etiquetas se sincronizan en tiempo real.*

<details>
<summary>Guía visual: La bandeja de entrada de un vistazo —  las cuatro entradas que más se usan</summary>

Cuatro regiones anotadas de la bandeja de entrada, correspondientes a los cuatro accesos más usados: redactar un mensaje nuevo, releer el correo destacado, revisar lo aplazado y cotejar lo ya enviado.

1. **Redactar (botón principal en la parte superior de la barra lateral)**: Es el único punto de entrada para crear correo nuevo: abre la capa de redacción superpuesta (no es una ruta independiente). En el móvil pasa a ser un botón flotante en la esquina inferior derecha, y el enlace profundo `?composeTo=<address>` permite prellenar el destinatario. Desde cualquier vista se puede empezar a escribir con un solo clic.
2. **Destacados (carpeta de la barra lateral)**: Aquí se reúne el correo destacado de todas las carpetas: basta pulsar la estrella en una fila de la lista para añadirlo. Sirve para conservar a mano el correo que hay que guardar largo tiempo o releer con frecuencia; el contador de la barra lateral refleja la cantidad en tiempo real.
3. **Aplazados (carpeta de la barra lateral)**: Zona de espera para los seguimientos aplazados, en dos niveles: urgente y en espera. Al elegir «Aplazar» en la página de detalle y fijar una hora, el mensaje vuelve solo a la parte superior de la bandeja de entrada cuando llega el momento, de modo que lo importante no se hunde en la lista.
4. **Enviados (carpeta de la barra lateral)**: Copia de todo el correo que ha salido de esta cuenta, útil para comprobar qué se ha entregado realmente. El volumen saliente está sujeto a la cuota diaria de envío del rol de la cuenta; el correo dentro del sitio se entrega directamente y el dirigido fuera de él pasa por el canal de entrega.

</details>

## 1. Bandeja de entrada y organización

| Capacidad | Descripción |
| --- | --- |
| Vistas del correo | Ocho vistas: Principal, Destacados, Aplazados, Enviados, Borradores, Todo el correo, Correo no deseado, Papelera; contadores actualizados en tiempo real |
| Diseño de lectura | Tres columnas, conversaciones, respuestas en línea y reacciones. Las cabeceras mostradas siguen reconstruyéndose y no acreditan el cifrado en tránsito o en reposo. La recuperación de recepción guarda aparte los bytes completos del MIME original en almacenamiento de objetos, cifrados por el servidor con AES-256-GCM, no de extremo a extremo; los límites de conservación figuran en la sección 9. Las imágenes y el CSS remotos se bloquean por defecto; tras un aviso de riesgos, la lectura ordinaria permite cargar imágenes solo para ese mensaje. La impresión mantiene el bloqueo por defecto y la página compartida de Telegram no ofrece un botón de carga externa |
| Acciones de organización | Destacar, aplazar (a la hora que elija), denunciar como correo no deseado／legítimo, mover a la papelera, eliminación definitiva |
| Insignia de código de verificación | Los códigos de verificación extraídos por Workers AI se muestran directamente en la lista y el detalle (véase la sección 5) |
| Identificación del correo oficial | El correo de remitentes oficiales como announcement@epocanvas.com lleva la marca de verificación y un aviso explicativo (véase [Seguridad contra manipulaciones y normas](/es/mail/tamper-proof/)) |

## 2. Redacción y envío

![Ventana de redacción de EpoCanvas Mail: el remitente queda fijado al buzón actual, los destinatarios pueden seleccionarse entre los contactos; bajo el campo del asunto se encuentra la barra de herramientas de texto enriquecido (párrafo, tamaño de fuente, negrita, listas, cita, separador, enlace, imagen, tabla, emojis, traducción y modo de código fuente), con adjuntos y botón de envío en la parte inferior](/images/mail/es/ui/compose-guide.png)

*Figura: redacción (captura en chino simplificado). El editor de texto enriquecido ofrece 17 herramientas de formato; los destinatarios del sitio reciben el correo por entrega directa y los externos, por el canal de entrega.*

<details>
<summary>Guía visual: La ventana de redacción —  cuatro paradas, del formato al envío</summary>

Cuatro regiones anotadas de la capa de redacción que cubren el recorrido completo de un mensaje, del formato a la salida: la barra de herramientas decide el aspecto, los destinatarios y el asunto deciden el destino, y el botón de envío consuma la entrega.

1. **Barra de herramientas de texto enriquecido (sobre el cuerpo)**: 17 capacidades de formato: párrafo y tamaño de fuente, negrita, cursiva, subrayado y tachado, color, alineación, listas ordenadas y no ordenadas, cita, línea separadora, enlace, imagen, tabla, emojis, traducción y modo de código fuente; todo se ve mientras se escribe.
2. **Línea de destinatarios**: Permite elegir contactos o escribir las direcciones directamente. El correo dirigido a buzones del sitio se entrega por vía directa (sin transmisión externa); el dirigido fuera del sitio sale por el canal configurado por el Operador (Resend/Mailjet, etc.).
3. **Línea de asunto**: Es lo primero que ve el destinatario: aparece en las listas y en las notificaciones push junto con el extracto de la primera línea del cuerpo. Un asunto que explique el motivo se agradece después al buscar con el operador `subject:`.
4. **Botón de envío (abajo a la derecha)**: Con un clic sale el mensaje: entrega directa e instantánea dentro del sitio y canal de entrega fuera de él; después puede cotejarse en la vista «Enviados». La capacidad de adjuntos depende del rol de la cuenta y el límite por archivo se fija en cada instancia (25 MB de fábrica).

</details>

- **Edición en texto enriquecido**: párrafos, tamaño de fuente, negrita, cursiva, subrayado, tachado, colores, alineación, listas ordenadas y no ordenadas, cita, separador, enlace, imagen, tabla, emojis, traducción y modo de código fuente;
- **Adjuntos**: la capacidad de envío y recepción de adjuntos se activa según el rol de la cuenta; el límite de tamaño de cada adjunto depende de la configuración de la instancia (25 MB por defecto; solo restringe a los usuarios que emplean el almacenamiento público del Operador, sin límite para quienes disponen de almacenamiento propio); la cuota de almacenamiento se fija según el rol;
- **Alcance de envío**: entrega directa a los buzones del sitio (sin transmisión externa); el correo dirigido fuera del sitio se entrega por los canales configurados por el Operador (Resend／Mailjet, etc.); los terceros implicados figuran en [Subencargados del Tratamiento](/es/mail/sub-processors/);
- **Gestión de envíos**: consulta en la vista «Enviados»; el volumen saliente está sujeto a la cuota de envío diaria del rol de la cuenta (véase la sección 6).

## 3. Sintaxis de búsqueda

![Vista de resultados de EpoCanvas Mail tras introducir from:github en la barra de búsqueda: la lista muestra únicamente las notificaciones de GitHub coincidentes; los contadores de la barra lateral permanecen sincronizados (interfaz en chino simplificado)](/images/mail/es/ui/search-guide.png)

*Figura: búsqueda (captura en chino simplificado). Los operadores de campos se pueden combinar con palabras clave libres; la lista de coincidencias se actualiza en tiempo real.*

<details>
<summary>Guía visual: La búsqueda —  dos posiciones clave en una consulta</summary>

Dos regiones anotadas que muestran una búsqueda completa: se introduce un operador o una palabra clave en el cuadro de búsqueda y la lista de coincidencias se filtra al instante con los términos resaltados.

1. **Cuadro de búsqueda de la barra superior**: Busca correo en las páginas de correo y entradas de configuración en las páginas de ajustes; admite diez operadores de campo (`from:`, `to:`, `subject:`, `body:`, etc.) y banderas como `is:` y `global:`. Varias condiciones separadas por espacios se combinan como «y», y Tab completa los operadores.
2. **Lista de coincidencias**: Solo muestra los mensajes que cumplen todas las condiciones, con los términos coincidentes resaltados de forma nativa por el navegador (`hl:off` lo desactiva). Al pulsar una fila se abre el detalle y la ventana del extracto se desplaza automáticamente hasta la coincidencia para conservar el contexto.

</details>

| Operador | Ejemplo | Descripción |
| --- | --- | --- |
| `from:` | `from:github` | filtrar por remitente |
| `to:` | `to:jefe` | filtrar por destinatario |
| `subject:` | `subject:codigo` | filtrar por asunto |
| `body:` / `subject_or_body:` | `body:factura` | filtrar por cuerpo／por asunto o cuerpo |
| `larger:` / `smaller:` | `larger:10M` | filtrar por tamaño del correo |
| `before:` / `after:` | `after:2026-10-01` | filtrar por fecha |
| `label:` | `label:Trabajo` | filtrar por etiqueta |
| `global:` | `global:proyecto` | búsqueda en todo el sitio y en todos los buzones |
| `is:` | `is:sent`, `is:spam`, `is:trash` | filtrar por estado |

El resaltado de las coincidencias se basa en la CSS Highlights API; la búsqueda en todo el sitio y la búsqueda en la página coexisten en dos niveles.La referencia completa de todos los operadores de campo, indicadores y condiciones de reglas está en la [Referencia de búsqueda y reglas](/es/mail/search/).

## 4. Etiquetas y motor de reglas de clasificación

- Cuatro etiquetas vienen preconfiguradas por defecto: **Comunidad** (clasificación automática según los dominios de correo públicos habituales), **Suscripciones**, **Promociones**, **Trabajo**; los colores y los iconos de las etiquetas son personalizables;
- Las condiciones de las reglas son combinables (contiene en la dirección del remitente, palabras clave del asunto, ajustes del sistema, etc.), con excepciones y prioridades; el etiquetado se aplica automáticamente al recibir el correo, o manualmente;
- Herramientas de gobernanza global: lista negra de remitentes, lista negra de palabras clave de asunto y contenido, modo de lista blanca, interceptación de remitentes sin nombre, interceptación de no destinatarios, interceptación de adjuntos ejecutables y recuento de rechazos por interceptación estricta;
- Las estadísticas de etiquetas (total, no leídos) se muestran en tiempo real en la barra lateral; los resultados de la clasificación pueden revisarse en la página de análisis.

## 5. Extracción automática de códigos de verificación

![Detalle de un correo de EpoCanvas Mail: el código de verificación de 6 dígitos de un correo de Cloudflare se presenta en tamaño grande; la lista y el detalle llevan ambos la insignia verde del código de verificación](/images/mail/ui/ui-detail-verification.png)

*Figura: solo al cumplirse todas las condiciones globales, de aviso de la instancia y de elección del usuario indicadas abajo puede la extracción automática enviar a Workers AI el asunto completo y hasta 6.000 caracteres JavaScript del cuerpo. El asunto no cuenta para ese límite. La base jurídica figura en la sección 6 de la [Política de Privacidad](/es/mail/privacy-policy/).*

<details>
<summary>Guía visual: La extracción del código de verificación en el panel de lectura</summary>

El efecto de la extracción de códigos de verificación en el detalle del correo: el código de 6 dígitos se presenta en tamaño grande y tanto la lista como el detalle llevan una insignia verde.

- **Zona del código en tamaño grande**: El código que Workers AI extrae del asunto y de los primeros 6,000 caracteres del cuerpo se presenta directamente en tamaño grande, para copiarlo con facilidad.
- **Insignia verde**: La marca verde que aparece de forma sincronizada en la fila de la lista y en la página de detalle: significa que este correo lleva un código de verificación ya extraído, de modo que se reconoce directamente desde la lista sin abrir cada mensaje. La insignia solo aparece cuando la extracción tiene éxito; su ausencia no significa que el correo sea seguro, solo que no hay ningún código que copiar.
- **Límites**: La extracción automática exige conjuntamente `aiCode` global, `contentProcessing.verificationCodeEnabled` de la instancia, un `noticeUrl` válido y `privacyPreferences.aiVerificationCode === true` del usuario. Esta preferencia vale `false` por defecto y se puede desactivar en los ajustes de datos para detener solicitudes posteriores. La elección no sustituye la información completa, la base jurídica ni los contratos con proveedores; véase la sección 6 de la Política de Privacidad.

</details>

## 6. Gestión del correo no deseado

- Cuarentena y conservación: la tarea diaria calcula la antigüedad del correo no deseado desde la creación del mensaje y, por defecto, lo traslada a la papelera al superar 7 días. La papelera también aplica un umbral fijo de 7 días desde la creación, de modo que la supresión física puede producirse en la misma ejecución; no se garantizan otros 7 días de conservación. Las denuncias de correo no deseado／legítimo actualizan la lista de confianza personal según el flujo correspondiente;
- Restricciones de envío: la cuota de envío diaria se fija por rol (usuarios base: 5 correos; LV.0: 8; LV.1: 10; administradores: 100; la cuenta Webmaster no tiene límite), con contadores que se restablecen a diario; el tratamiento del abuso de cuota figura en la sección 6 de la [Política de Uso Aceptable](/es/mail/acceptable-use/);
- La responsabilidad de la transmisión de contenidos de pago y de marketing corresponde al remitente; el envío masivo de correo comercial no solicitado es una conducta prohibida (véase la sección 3 de la [Política de Uso Aceptable](/es/mail/acceptable-use/)).

## 7. Reenvío y notificaciones

- **Reenvío personal**: permite reenviar automáticamente a otras direcciones con copia (CC). `rules` no está disponible y no reenvía; una lista `alias` vacía tampoco envía. `keepCopy` queda fijado en `true` para conservar el original y no puede desactivarse en la interfaz. Se rechaza guardar `rules` habilitado o reenvío habilitado con `keepCopy: false`; cliente y servidor deben actualizarse conjuntamente;
- **Reenvío global**: el administrador puede configurar reglas de reenvío a nivel del sistema, sujetas al modo de correo (desactivado en modo «Cifrado»);
- **Notificaciones de Telegram**: El modo personal `all` incluye todo el correo; `important` exige la etiqueta exacta `重要` o `important`, una estrella realmente guardada o un código existente. `notifyCodeOnly` es una aceptación separada para copiar un código existente, por defecto `false`, no un filtro ni una nueva extracción. `includePreview`, también `false`, controla el extracto y el botón de lectura. El modo compatible `privacy` envía solo un aviso genérico sin asunto, remitente, destinatario, código, extracto ni enlace; los demás modos personales tampoco añaden remitente ni destinatario. Las notificaciones del sistema usan campos propios. Cada envío comprueba estados actuales de usuario, buzón y mensaje y la versión D1, incluso sin vista previa; lectura y adjuntos también. Cambiar las notificaciones personales o usar los ajustes de datos revoca enlaces antiguos sin cambiar notificaciones futuras. Los tokens antiguos sin ámbito y OSS v1 requieren enlaces renovados; las copias del chat no se recuperan. Se requiere actualizar cliente y servidor, sin acreditar producción; véase la [Guía de notificaciones y reenvío](/es/mail/notify/);

## 8. Funciones de IA

| Capacidad | Activación | Descripción |
| --- | --- | --- |
| Extracción de códigos de verificación | Automática con correo nuevo solo si se cumplen todas las condiciones de la sección 5; desactivada por defecto para el usuario | Inferencia de Workers AI; los ajustes de datos permiten detener solicitudes posteriores |
| Traducción completa | Abrir la barra o cambiar de idioma no envía contenido; cada traducción externa requiere confirmación explícita | Deben estar habilitados la IA global, `contentProcessing.translationEnabled` y una URL de aviso válida. Cada solicitud lleva `confirmed: true` y un `noticeUrl` idéntico al actual; sin estas condiciones se desactiva. Las traducciones oficiales incluidas que coincidan permanecen locales. Las llamadas públicas a MyMemory/Google, también para fragmentos faltantes, se han eliminado de `ai-service`. `contentProcessing.publicTranslationFallbackEnabled` siempre es `false`, guardar `true` se rechaza y la opción de administración indica que no está disponible. Destinatarios actuales en la [Lista de destinatarios externos](/es/mail/sub-processors/) |
| Reconocimiento de texto en imágenes | Traducción confirmada con `contentProcessing.ocrEnabled === true` del servidor y `enableOcr: true` explícito para esta solicitud | De lo contrario es `false`; se puede traducir solo texto y no se reutilizan preferencias antiguas de OCR. Puede tratar imágenes incrustadas o URL remotas; el filtrado decorativo sigue siendo heurístico |
| AI Hub | configuración del administrador | conexión a puntos de conexión multmodelo compatibles con OpenAI, pruebas de velocidad a cero tokens, autorización de modelos por rol |

El operador no utiliza por cuenta propia los correos como conjunto de datos de entrenamiento; la conservación, el entrenamiento y la reutilización por terceros deben verificarse en los contratos y ajustes efectivos. Los tratamientos que requieren consentimiento deben permitir retirarlo libremente y con la misma facilidad con que se otorga. Si no existen opciones que puedan aplicarse efectivamente, debe desactivarse el tratamiento correspondiente; un botón de la interfaz no basta para garantizar el cumplimiento. Véanse las secciones 6 y 9 de la [Política de Privacidad](/es/mail/privacy-policy/).

## 9. Plataforma abierta y autonomía de los datos

- **Centro de autenticación OAuth 2.0 / OIDC**: Permite autorizar aplicaciones y revocar sus autorizaciones. La respuesta efectiva puede incluir correo electrónico, nombre, avatar y campos de rol, sin ajustarse necesariamente a los scopes solicitados. La revocación no recupera datos ya entregados ni revoca ID tokens ya emitidos o sesiones de terceros; véase la lista de destinatarios externos y encargados del tratamiento;
- **Guía de integración**: el registro de aplicaciones en la administración, los puntos de enlace y el código de integración están en [Plataforma abierta y acceso a la API](/es/mail/api/);
- **Exportar datos**: Los ajustes exportan campos personales, campos de correos no marcados como eliminados y `customLabels`, sin archivos adjuntos, contactos completos, reglas, ajustes de seguridad ni auditorías; el servidor no aplica el rango de fechas. La exportación no incluye el MIME original temporal y los .eml siguen reconstruyéndose. El plazo de aplicación de 7 días puede renovarse al reintentar; el éxito no borra el objeto inmediatamente y la limpieza programada por lotes puede fallar y dejar restos, por lo que no es un TTL garantizado. Los «claims» de recepción en D1 contienen metadatos, no el cuerpo original. Las tres opciones para ocultar estadísticas del perfil público también limitan la API; usuarios eliminados o desactivados devuelven 404, sin borrar físicamente los avatares estáticos. El nuevo cierre de cuenta la desactiva, revoca accesos y registra `manual_review`, no una supresión completa. Véase [Exportación de datos y almacenamiento](/es/mail/data/);

## 10. Interfaz y móvil

- Seis idiomas de interfaz (chino simplificado, chino tradicional, English, Français, Español, Nederlands), con diccionarios totalmente simétricos en las seis lenguas tanto en el front-end como en el back-end;
- Temas claro y oscuro, más de 300 iconos vectoriales sin conexión, diseño adaptable, PWA y aplicación Android (epomail). Vue ha retirado los enlaces externos de Google Fonts y utiliza fuentes del sistema; React aloja sus propias fuentes. Los avatares, Turnstile y otros recursos externos aún pueden generar solicitudes; no significa que no haya ninguna solicitud externa.

![Bandeja de entrada de la interfaz en inglés de EpoCanvas Mail: soporte multilingüe completo; la barra lateral muestra Compose, Main, Starred, Snoozed, Sent, Drafts, All Mail, Spam, Trash y las etiquetas Social, Subscriptions, Promotions, Work](/images/mail/ui/ui-inbox-en.png)

*Figura: interfaz en English. El idioma de la interfaz se cambia en la configuración; la simetría de los diccionarios en seis lenguas está garantizada por scripts de auditoría estáticos.*

<details>
<summary>Guía visual: La bandeja en inglés y su paralelismo con la versión china</summary>

La bandeja de entrada con la interfaz en English: idéntica en estructura a la versión en chino, con la simetría de los diccionarios en seis lenguas garantizada por scripts de auditoría estáticos.

- **Barra lateral**: Las vistas Compose, Starred, Snoozed y Sent, entre otras, y las etiquetas Social, Subscriptions, Promotions y Work se corresponden punto por punto con la taxonomía china.
- **Lista**: El remitente, el asunto, el extracto y las insignias de código de verificación ocupan exactamente las mismas posiciones, tamaños y colores que en la versión en chino: la localización solo sustituye los textos, nunca el diseño, y por eso las capturas y las instrucciones sirven en cualquier idioma. Las fechas, los números y los contadores también se formatean según el idioma de la interfaz.
- **Cómo cambiar de idioma**: El punto donde se cambia el idioma de la interfaz: uno entre seis (chino simplificado, chino tradicional, English, Español, Français y Nederlands) en el grupo «Idioma» de la configuración general, con efecto inmediato y sin volver a iniciar sesión. La visualización y la entrega van por separado: los avisos del sistema y el correo de bienvenida se generan en el idioma de cada destinatario, no en el de la interfaz del remitente.

</details>

![Bandeja de entrada móvil de EpoCanvas Mail: diseño adaptable a 375 píxeles de ancho, la barra lateral se pliega en un cajón y la lista sigue siendo legible por completo (interfaz en chino simplificado)](/images/mail/ui/ui-inbox-mobile.png)

*Figura: móvil (captura en chino simplificado). La misma instancia se adapta a navegadores de escritorio y móviles; también puede instalarse como PWA o mediante la aplicación Android.*

<details>
<summary>Guía visual: La bandeja móvil y sus concesiones de diseño adaptable</summary>

La bandeja de entrada móvil a 375 píxeles de ancho: la barra lateral se pliega en un cajón y la lista se mantiene legible por completo.

- **Barra lateral en cajón**: Por debajo de 1025 píxeles de ancho, la columna izquierda se pliega automáticamente en un cajón: el botón de hamburguesa lo despliega sobre una capa de oscurecimiento y, al elegir cualquier vista, se recoge de nuevo para no tapar la zona de lectura. El escritorio y el móvil comparten una misma estructura de barra lateral, de modo que los contadores y las etiquetas se leen igual en ambos formatos.
- **Botón flotante de redacción**: La versión móvil del botón «Redactar» de escritorio: fijo en la esquina inferior derecha, permanece visible al desplazarse y al pulsarlo abre la redacción a pantalla completa. Solo aparece en las cuentas con permiso de envío; un Visitante o un grupo con el envío desactivado nunca lo ve, y por tanto no puede acceder a la redacción.
- **Lista**: La misma lista virtualizada que en el escritorio: un buzón largo solo renderiza las filas visibles en la pantalla, de modo que la primera carga no se ralentiza a medida que crece el buzón. Los objetivos táctiles se amplían por accesibilidad móvil, mientras que la densidad informativa y la estructura de columnas siguen siendo idénticas, así que las capturas del móvil siguen sirviendo para cotejar campos.

</details>

## 11. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Tutorial de registro de apps OAuth e integración de puntos de enlace | [Tutorial de registro de apps OAuth e integración de puntos de enlace](/es/mail/api/) |
| Operadores de búsqueda, búsqueda de administración y condiciones de reglas | [Referencia de búsqueda y reglas](/es/mail/search/) |
| Rutas de interfaz y ubicación de las secciones de configuración | [Mapa de interfaz y rutas](/es/mail/interface/) |
| Modos de funcionamiento: formas de despliegue, modos de correo e inicio de sesión | [Modos de funcionamiento](/es/mail/modes/) |
| Guía de configuración: configuración personal y consola de administración | [Guía de configuración](/es/mail/settings/) |
| Posicionamiento y despliegue del proyecto | [Presentación del proyecto](/es/mail/project/) |
| Arquitectura técnica y diseño de seguridad | [Arquitectura técnica](/es/mail/architecture/) |
| Correo oficial y verificación contra manipulaciones | [Seguridad contra manipulaciones y normas](/es/mail/tamper-proof/) |
| Tratamiento de datos y plazos de conservación | [Tratamiento de datos y seguridad](/es/mail/data-security/) |
| Política de Privacidad (información y derechos sobre la IA) | [Política de Privacidad](/es/mail/privacy-policy/) |
