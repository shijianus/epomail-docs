---
title: Guía de configuración
description: Guía de configuración de EpoCanvas Mail — las cinco secciones de la configuración personal (perfil, general, seguridad, datos, etiquetas) y el recorrido completo por las nueve secciones de la consola de administración y las tarjetas de configuración del sistema.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.17**

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

La página de seguridad modifica el nombre de usuario y la contraseña (mostrando la fecha del último cambio). El centro de verificación en dos pasos reúne el interruptor general y la configuración independiente de los tres segundos factores: aplicación de autenticación (TOTP), códigos de recuperación de respaldo (10 códigos de un solo uso) y llaves de acceso (Passkey). Para el comportamiento en el inicio de sesión y las reglas de dispositivos de confianza, véase la sección 4 de [Modos de funcionamiento](/es/mail/modes/). La parte inferior de la página contiene la entrada de eliminación de la cuenta; tras la eliminación, los datos de la cuenta se tramitan según las cláusulas de supresión de la [Política de privacidad](/es/mail/privacy-policy/).

## 5. Datos: exportación, notificaciones y almacenamiento

![Página de datos de EpoCanvas Mail: la tarjeta de exportación ofrece la exportación JSON integral, el archivo del correo (MBOX, JSON o CSV con rango de fechas) y la exportación de contactos y configuración; la tarjeta de almacenamiento de abajo muestra el indicador de uso de adjuntos y la entrada del almacenamiento de objetos personal (interfaz en chino simplificado)](/images/mail/es/ui/data-guide.png)

*Figura: la página de datos. La exportación y la gestión del almacenamiento aparecen en la misma página; el uso de adjuntos computa contra la cuota del grupo de identidad.*

<details>
<summary>Guía visual: Datos —  las cuatro regiones de la autonomía sobre tus datos</summary>

Las cuatro tarjetas de la página de datos: tres formatos para llevarse los datos, una zona de reenvío, una de almacenamiento y otra de autorizaciones de terceros —la interfaz completa de la autonomía sobre los datos personales.

1. **Tarjeta de exportación de datos y perfil del usuario**: Tres exportaciones en paralelo: la copia de seguridad integral en JSON, el archivo del historial de correo (MBOX/JSON/CSV con rango de fechas) y los contactos y la configuración. Un mensaje suelto también puede descargarse como .eml desde el panel de lectura.
2. **Tarjeta de reenvío de correo y mensajes**: Configuración detallada del push de mensajes de Telegram y del reenvío automático; que estas dos funciones estén disponibles para la cuenta lo decide el interruptor de «Control de datos de usuario» del administrador.
3. **Tarjeta de espacio de almacenamiento**: El indicador de uso del almacenamiento de adjuntos se coteja con la cuota en tiempo real. Puede conectarse un cubo de Backblaze B2/S3 propio: a partir de entonces los adjuntos nuevos se guardan directamente en la nube personal, fuera de la cuota de la instancia, y al retirar la conexión se vuelve al almacenamiento de la instancia.
4. **Tarjeta de aplicaciones y servicios de terceros**: Lista de todas las aplicaciones con autorización OAuth de la cuenta: puede retirarse el acceso aplicación por aplicación, o revocarlas todas de una vez desde la ventana de detalle. La revocación surte efecto de inmediato y los tokens existentes de la aplicación dejan de valer en el acto.

</details>

| Exportación | Formato | Alcance |
| --- | --- | --- |
| Exportación integral de datos | JSON | Copia de seguridad completa: datos de la cuenta, historial de correo, contactos, reglas de clasificación y etiquetas, y ajustes de seguridad |
| Archivo del historial de correo | MBOX (universal), JSON o CSV | Solo el correo enviado y recibido, con rango de fechas opcional |
| Contactos y configuración | JSON | Directorio de contactos, reglas de alias personalizadas y preferencias de personalización |

Un mensaje suelto se descarga en .eml directamente desde el panel de lectura. La zona «Reenvío de correo y mensajes» ofrece el push de Telegram y el reenvío automático: la vinculación de un bot privado, las preferencias de push y los tipos de disparador se explican paso a paso en la [Guía de notificaciones y reenvío](/es/mail/notify/); si estas dos funciones se ofrecen a los usuarios lo decide el interruptor de «Control de datos de usuario» del operador. La zona de almacenamiento muestra el indicador de uso de adjuntos y permite conectar un almacenamiento de objetos personal (un cubo de Backblaze B2 o S3 propio); una vez conectado, los adjuntos van directamente a la nube personal, fuera de la cuota de la instancia.

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

La página de informes de auditoría presenta los eventos de riesgo del sitio como avisos, cada uno con su clase, prioridad, estado y el detalle completo de su entorno (IP, geolocalización, dispositivo y huella):

| Clase de alerta | Disparador | Tratamiento habitual |
| --- | --- | --- |
| Alerta de auditoría | Una denuncia o infracción señalada por otros usuarios queda acreditada | Verificar y después liberar o actuar |
| Alerta de riesgo | Cruzar una línea roja de seguridad o un entorno de inicio de sesión anómalo (p. ej., inicios multi-IP y multiubicación simultáneos) | Seguimiento estrecho, entrevista o bloqueo |
| Alerta de bloqueo | La cuenta ha sido bloqueada automáticamente por el sistema o manualmente por un administrador | Levantar la alerta o mantener el bloqueo |
| Alerta de recurso | El usuario ha recurrido una decisión de tratamiento | Liberar (levantar el bloqueo) o rechazar |

![Página de informes de auditoría de EpoCanvas Mail: la tabla enumera los avisos de las cuatro clases — recurso, bloqueo, auditoría y riesgo — con su prioridad, etiqueta de estado, detalles del entorno activo y botones de tratamiento como liberar y levantar alerta (interfaz en chino simplificado)](/images/mail/es/ui/audit-guide.png)

*Figura: el informe de auditoría. Las cuatro clases de alertas se revisan en una única lista, con los botones de tratamiento repartidos por clase; en el modo cifrado, las marcas de tiempo se suprimen.*

<details>
<summary>Guía visual: El informe de operaciones —  la cadena completa de un ticket de alerta</summary>

La tabla de cuatro columnas de la página de informes de operaciones: la cadena completa de información de un aviso, de «quién» a «por qué se disparó» y de ahí a «dónde está la prueba».

1. **Columna de correo del usuario**: La cuenta a la que apunta el aviso: puede ser el objeto tratado (alerta de riesgo o de bloqueo), la parte denunciada (alerta de auditoría) o el apelante (alerta de recurso). Esta página solo estudia el caso; las acciones reales —bloquear, restaurar, restablecer— se ejecutan desde la página de la lista de usuarios, de modo que el veredicto se usa en combinación con aquella página.
2. **Columna de nivel de auditoría de seguridad**: La graduación del riesgo (prioridad P0/P1 con etiqueta de categoría): los cuatro tipos de aviso —auditoría, riesgo, bloqueo y recurso— tienen cada uno su vía de tratamiento habitual.
3. **Columna de explicación del aviso y rasgos del disparador**: Descripción de la situación que disparó el aviso (por ejemplo, inicios de sesión simultáneos desde varias ubicaciones y varias IP, o una denuncia acreditada); es la base para decidir si el aviso se libera o se rechaza.
4. **Columna del grupo de entornos activos**: La información completa del entorno en texto claro: IP, geolocalización, dispositivo y huella. En el modo cifrado (Level 3) las marcas de tiempo se suprimen y el aviso sigue pudiendo estudiarse.

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
