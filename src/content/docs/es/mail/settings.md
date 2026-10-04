---
title: Guía de configuración
description: Guía de configuración de EpoCanvas Mail — las cinco secciones de la configuración personal (perfil, general, seguridad, datos, etiquetas) y el recorrido completo por las nueve secciones de la consola de administración y las tarjetas de configuración del sistema.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.11**

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

![Página de perfil de EpoCanvas Mail: la tarjeta de información básica reúne la subida de avatar, el apodo, el género y el cumpleaños; la tarjeta de contacto muestra la dirección de correo con su etiqueta de buzón principal, el botón de añadir correo y los números de teléfono; las tarjetas de dirección de casa, empresa y otras siguen más abajo (interfaz en chino simplificado)](/images/mail/ui/ui-settings-profile.png)

*Figura: la página de perfil. El buzón principal lleva una etiqueta de «buzón principal»; las direcciones de correo adicionales pueden ser varias y retirarse en cualquier momento.*

La tarjeta de información básica gestiona el avatar, el apodo, el género y el cumpleaños. La tarjeta de contacto enumera el buzón principal de inicio de sesión y las direcciones de correo adicionales añadidas por el titular, además de los números de teléfono con prefijo de país. Las tarjetas de dirección guardan por separado las direcciones de casa, de empresa y otras. Cuánto de ello es público lo gobierna el interruptor de «perfil público» del operador.

## 3. General: apariencia e idioma

![Página general de EpoCanvas Mail: un cuadro de biografía; la zona de apariencia ofrece las paletas oscura, clara y seguir el sistema; el fondo de pantalla temático global ofrece ocho preajustes más un fondo personalizado, con el fondo personal y otros ajustes más abajo (interfaz en chino simplificado)](/images/mail/ui/ui-settings-general.png)

*Figura: selección de la paleta de apariencia y del fondo de pantalla en la página general, mostrada con «seguir el sistema» y el fondo liso por defecto.*

- Apariencia: paletas oscura, clara y seguir el sistema; ocho preajustes de fondo de pantalla más los fondos personalizados; el fondo personal y la densidad de la interfaz se ajustan por separado;
- Preferencias de lectura: tipo de bandeja de entrada, posición del panel de lectura e interruptor de vista por conversaciones;
- Idioma: un idioma de interfaz entre seis; el idioma de destino de la traducción se ajusta de forma independiente, con 17 opciones, y decide el destino de la traducción integral por IA; la traducción mediante reconocimiento de texto en imágenes puede desactivarse por separado;
- La zona de privacidad de datos concentra las entradas de preferencias sobre información personal y tratamiento por IA.

## 4. Seguridad: contraseña y verificación en dos pasos

La página de seguridad modifica el nombre de usuario y la contraseña (mostrando la fecha del último cambio). El centro de verificación en dos pasos reúne el interruptor general y la configuración independiente de los tres segundos factores: aplicación de autenticación (TOTP), códigos de recuperación de respaldo (10 códigos de un solo uso) y llaves de acceso (Passkey). Para el comportamiento en el inicio de sesión y las reglas de dispositivos de confianza, véase la sección 4 de [Modos de funcionamiento](/es/mail/modes/). La parte inferior de la página contiene la entrada de eliminación de la cuenta; tras la eliminación, los datos de la cuenta se tramitan según las cláusulas de supresión de la [Política de privacidad](/es/mail/privacy-policy/).

## 5. Datos: exportación, notificaciones y almacenamiento

![Página de datos de EpoCanvas Mail: la tarjeta de exportación ofrece la exportación JSON integral, el archivo del correo (MBOX, JSON o CSV con rango de fechas) y la exportación de contactos y configuración; la tarjeta de almacenamiento de abajo muestra el indicador de uso de adjuntos y la entrada del almacenamiento de objetos personal (interfaz en chino simplificado)](/images/mail/ui/ui-settings-data.png)

*Figura: la página de datos. La exportación y la gestión del almacenamiento aparecen en la misma página; el uso de adjuntos computa contra la cuota del grupo de identidad.*

| Exportación | Formato | Alcance |
| --- | --- | --- |
| Exportación integral de datos | JSON | Copia de seguridad completa: datos de la cuenta, historial de correo, contactos, reglas de clasificación y etiquetas, y ajustes de seguridad |
| Archivo del historial de correo | MBOX (universal), JSON o CSV | Solo el correo enviado y recibido, con rango de fechas opcional |
| Contactos y configuración | JSON | Directorio de contactos, reglas de alias personalizadas y preferencias de personalización |

Un mensaje suelto se descarga en .eml directamente desde el panel de lectura. La zona de notificaciones y reenvío ofrece el push de Telegram (vinculación de un bot y un identificador de chat) y el reenvío de correo por reglas (dirección de destino a elección; los disparadores son todo el correo, prefijo de alias y reglas inteligentes, con opciones de conservar copia y de prefijar el asunto); si estas dos funciones se ofrecen a los usuarios lo deciden los interruptores de control de datos de usuario del operador. La zona de almacenamiento muestra el indicador de uso de adjuntos y permite conectar un almacenamiento de objetos personal (un cubo de Backblaze B2 o S3 propio); una vez conectado, los adjuntos van directamente a la nube personal, fuera de la cuota de la instancia.

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
| Informe de auditoría | Revisión, tratamiento y adjudicación de las cuatro clases de alertas |

La página de configuración del sistema organiza la configuración de la instancia en tarjetas:

| Tarjeta | Contenido |
| --- | --- |
| Configuración del sitio | Registro abierto, perfiles públicos, modo de correo, verificación en dos pasos, dominio de inicio oculto, códigos de registro, buzones adicionales, cambio rápido multicuenta, reglas de prefijo de buzón |
| Personalización de la interfaz | Título del sitio, avisos emergentes, interfaz dinámica/estática |
| Autenticación de terceros y SSO | Interruptor general del acceso rápido de terceros y credenciales por proveedor (se muestra bajo un indicador de función) |
| Almacenamiento y base de datos central | Almacenamiento de objetos (B2 / S3, con repliegue a R2 / KV por defecto), arquitectura de base de datos central y externa, límite de adjunto único y borrado en cascada, control de salud de la caché KV |
| Push de correo | Bot de Telegram, reenvío global y reenvío por reglas (bloqueado en apagado en el modo cifrado) |
| AI Hub | Proveedor de IA (punto de enlace compatible con OpenAI personalizado o Cloudflare Workers AI), interruptor de activación, cuota diaria y límite de tasa, autorización de modelos |
| Control de datos de usuario | Push de Telegram de los usuarios, reenvío de correo, API y almacenamiento propio, y cuota de almacenamiento por defecto |
| Turnstile | Clave de sitio de la verificación humana e interruptor |
| Avisos en el sitio y correo de bienvenida | Ventanas emergentes de avisos, envíos de anuncios y plantillas de correo de bienvenida (multilingües) |
| Política del informe de auditoría | Umbrales operativos que disparan las alertas |
| Acerca de | Información de versión y comprobación de actualizaciones |

La página de informes de auditoría presenta los eventos de riesgo del sitio como avisos, cada uno con su clase, prioridad, estado y el detalle completo de su entorno (IP, geolocalización, dispositivo y huella):

| Clase de alerta | Disparador | Tratamiento habitual |
| --- | --- | --- |
| Alerta de auditoría | Una denuncia o infracción señalada por otros usuarios queda acreditada | Verificar y después liberar o actuar |
| Alerta de riesgo | Cruzar una línea roja de seguridad o un entorno de inicio de sesión anómalo (p. ej., inicios multi-IP y multiubicación simultáneos) | Seguimiento estrecho, entrevista o bloqueo |
| Alerta de bloqueo | La cuenta ha sido bloqueada automáticamente por el sistema o manualmente por un administrador | Levantar la alerta o mantener el bloqueo |
| Alerta de recurso | El usuario ha recurrido una decisión de tratamiento | Liberar (levantar el bloqueo) o rechazar |

![Página de informes de auditoría de EpoCanvas Mail: la tabla enumera los avisos de las cuatro clases — recurso, bloqueo, auditoría y riesgo — con su prioridad, etiqueta de estado, detalles del entorno activo y botones de tratamiento como liberar y levantar alerta (interfaz en chino simplificado)](/images/mail/ui/ui-audit-report.png)

*Figura: el informe de auditoría. Las cuatro clases de alertas se revisan en una única lista, con los botones de tratamiento repartidos por clase; en el modo cifrado, las marcas de tiempo se suprimen.*

## 8. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Formas de despliegue, modos de correo e inicio de sesión | [Modos de funcionamiento](/es/mail/modes/) |
| Funciones detalladas con capturas de pantalla | [Guía de funciones](/es/mail/features/) |
| Topología técnica y cifrado | [Arquitectura técnica](/es/mail/architecture/) |
| Tratamiento y conservación de datos tras la configuración | [Tratamiento de datos y seguridad](/es/mail/data-security/) |
