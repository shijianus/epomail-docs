---
title: Guía de configuración
description: Guía de configuración de EpoCanvas Mail — las cinco secciones de la configuración personal (perfil, general, seguridad, datos, etiquetas) y el recorrido completo por las nueve secciones de la consola de administración y las tarjetas de configuración del sistema.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

EpoCanvas Mail divide su configuración en dos zonas: la zona «configuración» de la barra lateral reúne los ajustes personales que cada cuenta puede modificar por sí misma, en cinco secciones — perfil, general, seguridad, datos y etiquetas; la zona «administración» solo aparece para los grupos de identidad con permisos administrativos y alberga la configuración al nivel de la instancia. Esta página recorre cada zona y las relaciones entre los ajustes. Para el comportamiento a nivel de funcionamiento — multicuenta, modos de correo, inicio de sesión —, véase [Modos de funcionamiento](/es/mail/modes/).

## 1. Secciones de la configuración personal

| Sección | Contenido |
| --- | --- |
| Perfil | Avatar, apodo, género, cumpleaños y datos de contacto |
| General | Biografía, paleta de apariencia, fondo de pantalla temático, preferencias de lectura, idioma de la interfaz e idioma de destino de la traducción |
| Seguridad | Nombre de usuario y contraseña, centro de verificación en dos pasos, eliminación de la cuenta |
| Datos | Exportación de datos, notificaciones y reenvío, espacio de almacenamiento y almacenamiento en la nube personal |
| Etiquetas | Etiquetas personalizadas y reglas de clasificación |

## 2. Perfil: datos personales

![Página de perfil de EpoCanvas Mail: la tarjeta de información básica reúne la subida de avatar, el apodo, el género y el cumpleaños; la tarjeta de contacto muestra la dirección de correo con su etiqueta de buzón principal, el botón de añadir correo y los números de teléfono; las tarjetas de dirección de casa, empresa y otras siguen más abajo (interfaz en chino simplificado)](/images/mail/es/ui/preferences-guide.png)

*Figura: la página de perfil. El buzón principal lleva una etiqueta de «buzón principal»; las direcciones de correo adicionales pueden ser varias y retirarse en cualquier momento.*

<details>
<summary>Guía visual: El perfil —  los datos personales divididos en cuatro dimensiones</summary>

Las cuatro tarjetas de la página de perfil: de la imagen de identidad a los datos de contacto y de ahí a las direcciones, los cuatro planos de los datos personales se gestionan tarjeta a tarjeta.

1. **Tarjeta de información básica**: Subida de avatar, apodo personal, género y cumpleaños. Que el apodo y el avatar se muestren al exterior está regido por el interruptor de «perfil público» del administrador.
2. **Tarjeta de información de contacto**: El buzón principal de inicio de sesión lleva la etiqueta «buzón principal» y no puede retirarse; pueden añadirse varios correos electrónicos adicionales y retirarlos en cualquier momento, además de registrar un número de teléfono con prefijo de país.
3. **Tarjetas de dirección**: Las direcciones de casa, empresa y otras se guardan por separado, y cada una se añade, edita y retira de forma independiente. Son datos de perfil en sentido estricto: no intervienen en la entrega del correo ni afectan a la facturación ni al grupo de identidad. Que sea necesario rellenarlas, y que se muestren al exterior, depende de si el Operador activa el interruptor de «perfil público».
4. **Tarjeta de ajustes asociados y seguridad**: La plataforma de salto de la página de perfil hacia las demás páginas de configuración: la seguridad de la cuenta (nombre de usuario y contraseña, verificación en dos pasos) y las autorizaciones de terceros (aplicaciones autorizadas), las dos entradas más usadas, se reúnen aquí para no tener que ir y venir entre la página de perfil y la de seguridad. Al pulsar cada entrada se salta a la sección correspondiente, sin abrir una página nueva.

</details>

La tarjeta de información básica gestiona el avatar, el apodo, el género y el cumpleaños. La tarjeta de contacto enumera el buzón principal de inicio de sesión y las direcciones de correo adicionales añadidas por el titular, además de los números de teléfono con prefijo de país. Las tarjetas de dirección guardan por separado las direcciones de casa, de empresa y otras. Cuánto de ello es público lo gobierna el interruptor de «perfil público» del operador.

## 3. General: apariencia e idioma

![Página general de EpoCanvas Mail: un cuadro de biografía; la zona de apariencia ofrece las paletas oscura, clara y seguir el sistema; el fondo de pantalla temático global ofrece ocho preajustes más un fondo personalizado, con el fondo personal y otros ajustes más abajo (interfaz en chino simplificado)](/images/mail/es/ui/general-guide.png)

*Figura: selección de la paleta de apariencia y del fondo de pantalla en la página general, mostrada con «seguir el sistema» y el fondo liso por defecto.*

<details>
<summary>Guía visual: General —  tres tarjetas para el aspecto y los hábitos de lectura</summary>

Las tres tarjetas de la página general —biografía, personalización de la apariencia y preferencias— cubren toda la personalización del aspecto de la interfaz y de los hábitos de lectura.

1. **Tarjeta de biografía**: Un texto de presentación que se muestra en el perfil público; que esa página sea accesible lo decide el interruptor de «perfil público» del administrador.
2. **Tarjeta de personalización de la apariencia**: Los tres estados de la paleta (oscura, clara y seguir el sistema, también conmutables desde la barra superior) y el fondo de pantalla temático global (ocho preajustes más fondo personalizado o por URL); además, un fondo personal (que cubre solo la zona del buzón) y la densidad de la interfaz.
3. **Tarjeta de preferencias**: Preferencias de lectura (tipo de bandeja de entrada, posición del panel de lectura e interruptor de vista por conversaciones) e idioma (la interfaz, entre seis; el idioma de destino de la traducción por IA, entre 16). La zona de privacidad de datos concentra las entradas de información personal y de tratamiento por IA.

</details>

- Apariencia: paletas oscura, clara y seguir el sistema; ocho preajustes de fondo de pantalla más los fondos personalizados; el fondo personal y la densidad de la interfaz se ajustan por separado;
- Preferencias de lectura: tipo de bandeja de entrada, posición del panel de lectura e interruptor de vista por conversaciones;
- Idioma: un idioma de interfaz entre seis; el idioma de destino de la traducción se ajusta de forma independiente, con 16 opciones, y decide el destino de la traducción integral por IA; la traducción mediante reconocimiento de texto en imágenes puede desactivarse por separado;
- La zona de privacidad de datos concentra las entradas de preferencias sobre información personal y tratamiento por IA.

## 4. Seguridad: contraseña y verificación en dos pasos

La página de seguridad modifica el nombre de usuario y la contraseña (mostrando la fecha del último cambio). El centro de verificación en dos pasos reúne el interruptor general y la configuración independiente de los tres segundos factores: aplicación de autenticación (TOTP), códigos de recuperación de respaldo (10 códigos de un solo uso) y llaves de acceso (Passkey). Desactivar TOTP elimina el secreto TOTP; si queda una passkey activa, la verificación en dos pasos sigue habilitada y la passkey no se elimina. Para el comportamiento en el inicio de sesión y las reglas de dispositivos de confianza, véase la sección 4 de [Modos de funcionamiento](/es/mail/modes/). La parte inferior de la página contiene la entrada de eliminación de la cuenta; tras la eliminación, los datos de la cuenta se tramitan según las cláusulas de supresión de la [Política de privacidad](/es/mail/privacy-policy/).

## 5. Datos: exportación, notificaciones y almacenamiento

![Página de datos de EpoCanvas Mail: accesos para exportar datos personales, archivos de correo y configuración; todas las exportaciones tienen límites de campos y el selector de fechas no acredita que el servidor lo aplique; debajo aparecen el uso de adjuntos y el acceso al almacenamiento de objetos (interfaz en chino simplificado)](/images/mail/es/ui/data-guide.png)

*Figura: la página de datos. La exportación y la gestión del almacenamiento aparecen en la misma página; el uso de adjuntos computa contra la cuota del grupo de identidad.*

<details>
<summary>Guía visual: Datos —  las cuatro regiones de la autonomía sobre tus datos</summary>

Las cuatro tarjetas de la página de datos: tres formatos para llevarse los datos, una zona de reenvío, una de almacenamiento y otra de autorizaciones de terceros —la interfaz completa de la autonomía sobre los datos personales.

1. **Tarjeta de exportación de datos y perfil del usuario**: Las exportaciones JSON, de archivo de correo y de configuración utilizan la misma respuesta del servidor y solo incluyen campos seleccionados; el rango de fechas no se aplica y no constituyen una copia completa. Los archivos .eml individuales también se reconstruyen a partir de campos existentes.
2. **Tarjeta de reenvío de correo y mensajes**: Ajustes de Telegram y reenvío; el administrador controla su disponibilidad. El reenvío personal por reglas (`rules`) no está disponible, no reenvía nada al ejecutarse ni pasa a todos los mensajes; los controles de alcance, vista previa y copia de códigos de Telegram se aplican según su configuración. Véase la guía de notificaciones y reenvío.
3. **Tarjeta de espacio de almacenamiento**: Uso de adjuntos y cuota; el almacenamiento personal Backblaze B2/S3 puede recibir adjuntos nuevos, aunque siguen aplicándose otras limitaciones. Desconectarlo no migra ni elimina los objetos antiguos ni garantiza que los adjuntos anteriores sigan siendo legibles.
4. **Tarjeta de aplicaciones y servicios de terceros**: Permite consultar y revocar autorizaciones OAuth; el servidor puede rechazar solicitudes posteriores relacionadas, pero no recupera los datos ya entregados ni revoca los ID tokens ya emitidos o las sesiones de terceros.

</details>

| Exportación | Formato | Alcance |
| --- | --- | --- |
| Exportación integral de datos (nombre en la interfaz) | JSON | Parte de los datos personales, campos seleccionados de correos no marcados como eliminados y `customLabels`; no incluye archivos adjuntos, contactos o reglas completos, ajustes de seguridad ni auditorías |
| Archivo del historial de correo | MBOX, JSON o CSV | El navegador convierte los campos de correo de la misma respuesta; el servidor no aplica el rango de fechas y la exportación no incluye mensajes de la papelera ni el MIME original completo |
| Contactos y configuración | JSON | Subconjunto de campos personales devuelto, `customLabels` y fecha de exportación; no es una copia completa de los contactos, alias ni todas las preferencias |

Los archivos .eml individuales se reconstruyen a partir de campos existentes; el alcance completo de la exportación se explica en [Exportación de datos y almacenamiento](/es/mail/data/). Los límites de vinculación, filtrado y revocación de enlaces de la zona «Reenvío de correo y mensajes» figuran en la [Guía de notificaciones y reenvío](/es/mail/notify/). Un almacenamiento personal Backblaze B2/S3 permite guardar allí los adjuntos nuevos y omitir la comprobación de la cuota del sistema en la ruta de almacenamiento de adjuntos, pero siguen aplicándose las demás limitaciones de correo, envío y del proveedor. Desconectarlo no migra ni elimina los objetos antiguos.

## 6. Gestión de etiquetas

La sección de etiquetas gestiona los colores y los iconos de las etiquetas personalizadas y configura las condiciones, excepciones y prioridades de las reglas; las cuatro etiquetas de fábrica son Comunidad, Suscripciones, Promociones y Trabajo. El comportamiento del motor de reglas y la sintaxis de búsqueda figuran en las secciones 3 y 4 de la [Guía de funciones](/es/mail/features/).

## 7. Consola de administración

La zona de administración se muestra partida por partida según los permisos del grupo de identidad, y las rutas de la interfaz están vinculadas al grupo para impedir la escalada de privilegios. Las nueve secciones administrativas:

| Sección | Responsabilidad |
| --- | --- |
| Analítica | Paneles de volumen de correo, clasificación y etiquetas |
| Lista de usuarios | Búsqueda de cuentas, restablecimiento de contraseña, cambio de grupo de identidad, restablecimiento de la verificación en dos pasos, bloqueo y restauración, vaciado de buzones |
| Correo no deseado / Todo el correo | Sección de revisión del correo de todo el sitio; su nombre y su alcance siguen el modo de correo (Level 1 muestra Todo el correo, Level 2 la sección de correo no deseado, Level 3 oculta la entrada) |
| Permisos | Plantillas de cuotas y permisos de los seis grupos de identidad, grupo por defecto y autorización de modelos de IA; los grupos Visitante y Maestro están protegidos contra la eliminación |
| Claves de registro | Emisión y comprobación de los códigos de invitación |
| Configuración del sistema | Configuración al nivel de la instancia — véase la lista de tarjetas de abajo |
| Gestión de aplicaciones | Emisión y gestión de las credenciales de acceso de las aplicaciones de terceros OAuth 2.0 / OIDC |
| Clasificación | Interruptores de recepción y envío, configuración del reconocimiento por IA, listas negras y blancas y reglas de bloqueo duro |
| Informe de auditoría | Estudio, tratamiento, cajones de evidencia y adjudicación de apelaciones de los tickets de riesgo en los cuatro paneles |

<span id="operator-notice"></span>

La tarjeta Operador y privacidad exige un nombre identificable del operador, su país o región real, un correo de contacto, la versión de las condiciones y enlaces válidos a las condiciones del servicio y al aviso de privacidad. Complete la dirección de contacto y la información sobre destinatarios y conservación según corresponda. La falta de datos obligatorios bloquea los nuevos registros, sin bloquear el acceso existente ni la inicialización. El nuevo usuario marca activamente una casilla de aceptación de condiciones inicialmente desmarcada. El servidor registra la cuenta, versión, fecha, idioma y URL de las condiciones; el aviso de privacidad no constituye consentimiento general.

<span id="optional-processing"></span>

La extracción opcional de códigos, la traducción y el OCR están desactivados por defecto y requieren un aviso sobre el destino de los datos antes de activarse. La extracción automática también exige la elección explícita del usuario en los ajustes de datos; cada traducción requiere confirmar el aviso vigente, y el OCR una elección separada para esa solicitud. El respaldo mediante traducción pública no está disponible. Los ajustes de datos también permiten revocar enlaces de lectura de Telegram existentes y borrar datos del dispositivo con confirmación explícita. El cierre indica acceso desactivado y eliminación pendiente de verificación, no el borrado de todas las copias. Actualice conjuntamente la interfaz y el servidor; la configuración no demuestra la identidad real, los contratos, destinatarios ni la conservación efectiva.

La página de configuración del sistema organiza la configuración de la instancia en tarjetas:

| Tarjeta | Contenido |
| --- | --- |
| Configuración del sitio | Registro abierto, perfiles públicos, modo de correo, verificación en dos pasos, dominio de inicio oculto, códigos de registro, buzones adicionales, cambio rápido multicuenta, reglas de prefijo de buzón |
| Personalización | Título del sitio, avisos emergentes, interfaz dinámica/estática |
| Autenticación de terceros y SSO | Interruptor general del acceso rápido de terceros y credenciales por proveedor (se muestra bajo un indicador de función) |
| Almacenamiento y base de datos central | Almacenamiento de objetos (B2 / S3, con repliegue a R2 / KV por defecto), arquitectura de base de datos central y externa, límite de adjunto único y borrado en cascada, control de salud de la caché KV |
| Push de correo | Bot de Telegram, reenvío global y reenvío por reglas (bloqueado en apagado en el modo cifrado) |
| Motor de IA e integración de modelos | Proveedor de IA (punto de enlace compatible con OpenAI personalizado o Cloudflare Workers AI), interruptor de activación, cuota diaria y límite de tasa, autorización de modelos |
| Control de datos de usuario | Push de Telegram de los usuarios, reenvío de correo, API y almacenamiento propio, y cuota de almacenamiento por defecto |
| Turnstile | Clave de sitio de la verificación humana e interruptor |
| Aviso | Ventanas emergentes de avisos, envíos de anuncios y plantillas de correo de bienvenida (multilingües) |
| Informes de operaciones | Umbrales operativos que disparan las alertas |
| Acerca de | Información de versión y comprobación de actualizaciones |

La página de informes de auditoría presenta los eventos de riesgo del sitio en cuatro paneles —amenazas de abuso, auditoría de apelaciones, gestión de riesgos y registro de operaciones—, cada uno con su clase de tickets y su propia tabla diferenciada:

| Panel | Tickets incluidos | Estudio habitual |
| --- | --- | --- |
| Amenazas de abuso | Cuentas de amenaza LV3+: multicuenta, denuncias graves, etc. | Cotejar la evidencia y después liberar, bloquear o prorrogar |
| Auditoría de apelaciones | Apelaciones contra decisiones de tratamiento | Revisar cada formulario y después liberar o rechazar |
| Gestión de riesgos | Rutina de riesgo: spam, saltos de IP, etc. | Estudiar y archivar por nivel de infracción |
| Registro de operaciones | Tratamientos finalizados y actualizaciones de archivo | Retrazar el libro completo y los recuentos de apelaciones |

![Página de informes de auditoría de EpoCanvas Mail: cuatro tarjetas de panel en la parte superior con una tabla de tickets diferenciada, la barra de herramientas con extensión por lotes, actualización, restablecimiento, exportación de datos, limpieza del historial y enlace a la documentación](/images/mail/es/ui/audit-guide.png)

*Figura: el informe de auditoría. Cada uno de los cuatro paneles resume una clase de tickets; en el modo cifrado, las marcas de tiempo se anonimizan.*

<details>
<summary>Guía visual: El informe de operaciones —  la mesa de tickets de los cuatro paneles</summary>

Las cuatro zonas anotadas de la página: las tarjetas de panel fijan la orientación del estudio, los tickets se tratan fila a fila.

1. **Tarjeta de amenazas de abuso**: el libro consolidado de cuentas de amenaza LV3+ con el recuento en vivo «pendientes N / bloqueados N»; al entrar se abre la vista compacta de tratamiento del panel de amenazas.
2. **Tarjeta de auditoría de apelaciones**: el número de apelaciones y la entrada a la revisión formulario a formulario; liberar restablece la capacidad de envío de la cuenta.
3. **Tarjeta de gestión de riesgos**: tickets de rutina estudiados por nivel de infracción, motivo de alarma y plazo.
4. **Tarjeta de registro de operaciones**: el libro de tratamientos finalizados, con actualizaciones, última actualización y apelaciones; el detalle completo del cajón de evidencia, el tratamiento por lotes y la exportación CSV está en [Informe de auditoría](/es/mail/audit/).

</details>

## 8. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| 2FA, códigos de recuperación y llaves de acceso paso a paso | [2FA, códigos de recuperación y llaves de acceso paso a paso](/es/mail/security/) |
| Push de Telegram y reenvío automático paso a paso | [Push de Telegram y reenvío automático paso a paso](/es/mail/notify/) |
| Tutorial de registro de apps OAuth e integración de puntos de enlace | [Tutorial de registro de apps OAuth e integración de puntos de enlace](/es/mail/api/) |
| La ruta y los elementos de cada interfaz | [Mapa de interfaz y rutas](/es/mail/interface/) |
| Operadores de búsqueda y condiciones de reglas de clasificación | [Referencia de búsqueda y reglas](/es/mail/search/) |
| Formas de despliegue, modos de correo e inicio de sesión | [Modos de funcionamiento](/es/mail/modes/) |
| Funciones detalladas con capturas de pantalla | [Guía de funciones](/es/mail/features/) |
| Topología técnica y cifrado | [Arquitectura técnica](/es/mail/architecture/) |
| Tratamiento y conservación de datos tras la configuración | [Tratamiento de datos y seguridad](/es/mail/data-security/) |
