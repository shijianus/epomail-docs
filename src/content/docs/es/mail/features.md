---
title: Guía de funciones de EpoCanvas Mail
description: Guía de funciones de EpoCanvas Mail — organización de la bandeja de entrada, redacción y envío, sintaxis de búsqueda, motor de reglas de etiquetas, extracción de códigos de verificación, gestión del correo no deseado, reenvío y notificaciones, funciones de IA y plataforma abierta.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.17**

Esta página describe una a una las funciones reales de EpoCanvas Mail; todo el contenido ha sido verificado punto por punto contra el código abierto, y las capturas de pantalla de la interfaz proceden de imágenes reales del funcionamiento de la instancia alojada oficial. El posicionamiento del proyecto, su historial de desarrollo y su despliegue se describen en [Presentación del proyecto](/es/mail/project/); el tratamiento de los datos y los plazos de conservación de cada función figuran en [Tratamiento de datos y seguridad](/es/mail/data-security/).

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
| Diseño de lectura | Vista dividida de tres columnas, conversaciones agrupadas, respuesta en línea y reacciones con emojis; el detalle del correo permite consultar las cabeceras originales |
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

*Figura: extracción de códigos de verificación (captura en chino simplificado). Es el único tratamiento de IA no desencadenado manualmente; solo se envían a Workers AI el asunto y los primeros 6,000 caracteres del cuerpo. El alcance del tratamiento y la forma de desactivarlo figuran en la sección 6 de la [Política de Privacidad](/es/mail/privacy-policy/).*

<details>
<summary>Guía visual: La extracción del código de verificación en el panel de lectura</summary>

El efecto de la extracción de códigos de verificación en el detalle del correo: el código de 6 dígitos se presenta en tamaño grande y tanto la lista como el detalle llevan una insignia verde.

- **Zona del código en tamaño grande**: El código que Workers AI extrae del asunto y de los primeros 6,000 caracteres del cuerpo se presenta directamente en tamaño grande, para copiarlo con facilidad.
- **Insignia verde**: La marca verde que aparece de forma sincronizada en la fila de la lista y en la página de detalle: significa que este correo lleva un código de verificación ya extraído, de modo que se reconoce directamente desde la lista sin abrir cada mensaje. La insignia solo aparece cuando la extracción tiene éxito; su ausencia no significa que el correo sea seguro, solo que no hay ningún código que copiar.
- **Límites**: Es el único tratamiento de IA que no se desencadena manualmente y puede desactivarse en la configuración general; el alcance del tratamiento y la forma de retirarlo figuran en la sección 6 de la política de privacidad.

</details>

## 6. Gestión del correo no deseado

- Cuarentena y conservación: el correo no deseado permanece en cuarentena 7 días y pasa automáticamente a la papelera; las denuncias de correo no deseado／legítimo, una vez confirmadas por el usuario, mantienen automáticamente su lista de confianza personal;
- Restricciones de envío: la cuota de envío diaria se fija por rol (usuarios base: 5 correos; LV.0: 8; LV.1: 10; administradores: 100; la cuenta Webmaster no tiene límite), con contadores que se restablecen a diario; el tratamiento del abuso de cuota figura en la sección 6 de la [Política de Uso Aceptable](/es/mail/acceptable-use/);
- La responsabilidad de la transmisión de contenidos de pago y de marketing corresponde al remitente; el envío masivo de correo comercial no solicitado es una conducta prohibida (véase la sección 3 de la [Política de Uso Aceptable](/es/mail/acceptable-use/)).

## 7. Reenvío y notificaciones

- **Reenvío personal**: reenvío automático del correo del buzón a otras direcciones, con compatibilidad de copia (CC);
- **Reenvío global**: el administrador puede configurar reglas de reenvío a nivel del sistema, sujetas al modo de correo (desactivado en modo «Cifrado»);
- **Notificaciones de Telegram**: tras vincular el bot, envío según la configuración del asunto, el remitente, el cuerpo y el código de verificación, con un enlace de lectura interna válido durante 7 días; los campos de la notificación pueden ocultarse uno por uno.

## 8. Funciones de IA

| Capacidad | Activación | Descripción |
| --- | --- | --- |
| Extracción de códigos de verificación | automática al llegar correo nuevo (desactivable) | inferencia en el borde con Workers AI, véase la sección 5 |
| Traducción completa | clic manual | traducción multilingüe que conserva el diseño del correo original, fragmentos tratados en paralelo; los puntos de conexión de los modelos y el canal de respaldo figuran en la sección 6 de la [Política de Privacidad](/es/mail/privacy-policy/) |
| Reconocimiento de texto en imágenes | carga manual | subtítulos generados por OCR; las imágenes puramente decorativas se omiten automáticamente |
| AI Hub | configuración del administrador | conexión a puntos de conexión multmodelo compatibles con OpenAI, pruebas de velocidad a cero tokens, autorización de modelos por rol |

El Operador no entrena ningún modelo con el contenido del correo; el tratamiento de IA consentido puede retirarse en cualquier momento (véase la sección 6 de la [Política de Privacidad](/es/mail/privacy-policy/)).

## 9. Plataforma abierta y autonomía de los datos

- **Centro de autenticación OAuth 2.0 / OIDC**: el administrador puede registrar aplicaciones de terceros, con ámbitos de autorización limitados a openid / profile / email y tokens de acceso válidos durante 2 horas; la persona interesada puede consultar en tiempo real las autorizaciones en la página «Aplicaciones de terceros» y revocarlas en cualquier momento;
- **Guía de integración**: el registro de aplicaciones en la administración, los puntos de enlace y el código de integración están en [Plataforma abierta y acceso a la API](/es/mail/api/);
- **Exportar datos**: exportación con un clic, desde la página de configuración, de una copia completa en formato JSON (perfil y texto íntegro del correo no eliminado); cada correo puede descargarse como .eml;

## 10. Interfaz y móvil

- Seis idiomas de interfaz (chino simplificado, chino tradicional, English, Français, Español, Nederlands), con diccionarios totalmente simétricos en las seis lenguas tanto en el front-end como en el back-end;
- Temas claro y oscuro, 300+ iconos vectoriales sin conexión (cero solicitudes externas), diseño adaptable e instalación como PWA; también se ofrece una aplicación móvil Android (epomail).

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
