---
title: Tratamiento de datos y mantenimiento de la seguridad
description: Ciclo de vida de los datos verificado, medidas y límites de seguridad, y requisitos aplicables a solicitudes de derechos, supresiones e incidentes en una instancia pequeña sin fines de lucro.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.21**


<!-- legal-review-draft -->
:::caution[Borrador de revisión jurídica: no es el aviso vigente]
Este borrador recoge cláusulas propuestas y cuestiones pendientes de verificación. No sustituye al aviso vigente ni certifica el cumplimiento. No debe utilizarse para activar tratamientos antes de verificar la identidad y los datos de contacto legalmente exigidos al operador, las bases jurídicas reales, los destinatarios y las garantías de transferencia, la conservación y la supresión, y de facilitar la información requerida. La versión de referencia es la base de redacción en chino tradicional, no una entrada en vigor. Las obligaciones legales y los derechos existentes no se alteran.
:::

Esta página complementa la [Política de Privacidad](/es/mail/privacy-policy/) y distingue los mecanismos implementados en el código abierto de las medidas que el operador debe aplicar en su despliegue efectivo. La base técnica es la versión obtenida y revisada de `shijianus/epomail`; el código fuente no demuestra la configuración en línea, los contratos con proveedores ni que una solicitud concreta de supresión se haya completado.

La versión en chino tradicional (Taiwán) es la versión oficial; las traducciones no limitan las normas imperativas de la ley aplicable ni los derechos de los interesados. El Servicio es un proyecto de aprendizaje y pruebas sin fines de lucro, mantenido por una persona, y adopta medidas proporcionales a los riesgos. Esta página no promete certificación ISO, seguro, personal disponible permanentemente ni un nivel de servicio empresarial.

![Capas de seguridad del transporte, el tratamiento, el almacenamiento y las credenciales](/images/mail/es/security-trust-shield.svg)

*Figura: cada capa de control reduce riesgos distintos; la existencia de un mecanismo, su configuración correcta y su verificación efectiva son aspectos diferentes.*

## 1. Funciones de seguridad y límites conocidos

### 1.1 Transporte y confidencialidad de las comunicaciones

El sitio y la API deben utilizar HTTPS/TLS correctamente configurado. En la entrega saliente, los sistemas de los destinatarios, el almacenamiento externo de objetos y toda la ruta de reenvío que gestione el usuario, que la conexión del navegador utilice TLS no garantiza por sí solo el cifrado de extremo a extremo. Las imágenes remotas, los enlaces públicos y la lectura compartida también pueden exponer datos; véase la [Lista de destinatarios externos y encargados del tratamiento](/es/mail/sub-processors/).

### 1.2 Procesamiento en el borde y depuración

La lógica de negocio se ejecuta en Cloudflare Workers y el estado persistente se conserva en bases de datos y servicios de almacenamiento. El análisis de correo, la traducción, la entrega y los mecanismos alternativos pueden acceder a datos en texto claro en memoria. Los entornos aislados pueden reutilizarse; no se garantiza que la memoria física se destruya al finalizar cada solicitud. La ausencia de servidores propios tampoco demuestra que la plataforma no mantenga registros o instantáneas.

Los registros deben ocultar credenciales, cuerpos de correo y datos de identificación innecesarios. Para las pruebas, priorice contenido sintético y recursos aislados; no cargue correos reales, claves ni copias de bases de datos en repositorios públicos o servicios de IA o diagnóstico no aprobados para reproducir errores.

### 1.3 Cifrado en reposo

Según el modo y el estado del registro, el modo de correo puede aplicar cifrado en reposo del lado del servidor AES-256-GCM al asunto y al cuerpo. Los adjuntos, el correo original y los metadatos no reciben automáticamente la misma protección a nivel de aplicación. Un operador que posea las claves y permisos del servidor puede técnicamente descifrar los datos; las restricciones de acceso de la interfaz de administración no equivalen a cifrado de extremo a extremo.

La instancia debe utilizar claves independientes y protegerlas adecuadamente, completar la inicialización y verificar el estado real del cifrado, y planificar la rotación y los permisos de acceso. Que el código fuente incluya funciones de cifrado no demuestra que cada dato histórico, respaldo o copia de terceros esté cifrado.

### 1.4 Credenciales y sesiones

En la versión revisada, las contraseñas nuevas utilizan PBKDF2-HMAC-SHA256 con una sal aleatoria por usuario y 210.000 iteraciones por defecto. El parámetro es configurable; los registros históricos que utilizan SHA-256 o menos iteraciones siguen siendo aceptados y se actualizan durante la verificación. Las claves TOTP utilizan AES-256-GCM; los códigos de recuperación tienen un hash y una copia cifrada del código original que puede mostrarse tras una nueva verificación; las passkeys se conservan como datos de credenciales públicas. Un hash no garantiza que una contraseña no pueda adivinarse; los parámetros deben seguir evaluándose según los riesgos y el estado de la técnica.

La clave de configuración TOTP puede conservarse temporalmente en KV durante 600 segundos; cuando la actualización de una contraseña antigua se encuentra con la autenticación multifactor, el flujo pendiente puede conservar en KV la contraseña introducida durante 300 segundos y ese plazo puede renovarse. Por tanto, no se puede afirmar que todas las rutas eviten el almacenamiento temporal de credenciales en texto claro. El operador debe restringir el acceso y reducir el almacenamiento temporal innecesario. La lista de entornos de inicio de sesión tiene como máximo 15 registros y un TTL deslizante de 180 días; el TTL de la asociación de varias cuentas por IP es de 7.200 segundos; las credenciales de dispositivos de confianza pueden conservarse 60 días y eximir de algunas verificaciones multifactor durante los primeros 30 días.

Están implementadas la limitación de intentos fallidos de inicio de sesión y la revocación de sesiones; el período de validez predeterminado del JWT es de 30 días. La comprobación de capacidad de la lista de sesiones presenta una diferencia en el límite, por lo que no puede afirmarse que el programa garantice estrictamente un máximo de 10 sesiones simultáneas. Cuando las credenciales se guardan en localStorage del navegador, también deben tenerse en cuenta los riesgos de los dispositivos compartidos y del acceso por scripts.

### 1.5 Matriz de tratamiento de datos

| Categoría | Ubicación y contenido almacenado | Mecanismo de depuración existente | Límites que debe aplicar el operador |
| --- | --- | --- | --- |
| Cuenta y autenticación | Cuenta, campos personales, datos de autenticación y configuración en D1; sesiones en KV | La cancelación de autoservicio marca la cuenta como eliminada y borra el estado principal de inicio de sesión | Comprobar por separado la supresión de otros tokens, autorizaciones OAuth, imágenes y datos residuales; no equiparar la desactivación con el borrado completo |
| Correo ordinario | Asunto, cuerpo, metadatos y etiquetas en D1 | Acciones del usuario, depuración por cuota y depuración administrativa | No conservar indefinidamente datos ordinarios sin finalidad; tratar por separado los respaldos y las copias históricas |
| Correo no deseado / papelera | Datos de correo y objetos asociados | Una rama diaria compara el umbral de 7 días con `create_time`; un mensaje trasladado a la papelera puede cumplir en esa misma ejecución las condiciones de supresión | No es un período fijo de 7 días desde el traslado a la papelera; comprobar que la tarea programada se ejecute y que haya reintentos en caso de error |
| Correo del sistema | Contenido de bienvenida o anuncios y campos de caducidad | Algunos correos oficiales se marcan como eliminados al leer la lista según el plazo de caducidad (7 días por defecto) y luego se depuran mediante una rama diaria | No se eliminan inmediatamente mediante una tarea de caducidad independiente; la instancia debe comunicar y comprobar el plazo efectivo |
| Adjuntos y correo original | Los adjuntos se almacenan según la configuración, por ejemplo en S3, R2 o KV; la ruta de entrada verificada no conserva por separado todo el MIME original | Algunas rutas de supresión física de correo intentan eliminar los objetos asociados | Comprobar reintentos tras errores, el almacenamiento original, las copias y los objetos huérfanos; no prometer supresión atómica en todas las rutas |
| Eventos de inicio de sesión y seguridad | IP, User-Agent, dispositivo, operador, eventos y datos necesarios para atenderlos | Los campos de cuenta y los distintos mecanismos de registro tienen reglas separadas; no se ha observado una caducidad automática general | Establecer la minimización de campos, los permisos de acceso y plazos de conservación que puedan aplicarse efectivamente |
| Auditoría, reclamaciones y resoluciones | Eventos de auditoría, estado de riesgos o tickets, reclamaciones, notificaciones y datos de auditoría de autorizaciones | Supresión manual condicionada de algunos eventos ordinarios antiguos; no hay TTL predeterminado para todas las categorías | Aplicar las condiciones de conservación indicadas a continuación; definir por categoría un plazo y un procedimiento de supresión |
| Exportaciones y copias locales | Archivo JSON descargado por el usuario, archivo .eml individual y almacenamiento del navegador | El usuario gestiona las copias que descarga | Informar del alcance de la exportación y los riesgos locales; completar mediante solicitud manual los datos que deban facilitarse legalmente y no estén incluidos |

La rama de depuración diaria está programada para las 16:00 UTC (00:00 del día siguiente en Taiwán); hay además una tarea programada cada cinco minutos. Que exista una configuración de tareas programadas no significa que cada operación de limpieza se ejecute cada cinco minutos. Cuando un usuario elimina mensajes, los seleccionados pueden borrarse físicamente de inmediato si el uso supera en ese momento el 90 % de la cuota; no se trata solo de una tarea en segundo plano que limpia una papelera ya existente.

El punto de conexión de depuración de auditoría acepta únicamente un alcance determinado: eventos de más de 180 días, de auditoría ordinaria, riesgo normal y estado cerrado, caducado o rechazado, excluyendo las referencias a prohibiciones que sigan activas. Esta es una condición técnica de depuración, no un período mínimo de conservación legal; por ello, otros eventos, reclamaciones, resoluciones, notificaciones y registros de autorizaciones no caducan automáticamente. El operador debe completar las reglas legales de conservación y aplicar una depuración efectiva. La existencia de un «botón de depuración» no significa que todos los registros se eliminen dentro de plazo.

## 2. Operación y responsabilidades relacionadas con el código abierto

### 2.1 Instancia de prueba alojada

El carácter sin fines de lucro y el mantenimiento individual pueden afectar la escala y la forma razonables de las medidas, pero no eliminan las responsabilidades legales relativas a datos reales. No se promete respaldo de nivel empresarial, ausencia permanente de pérdida de datos ni operación gratuita indefinida; los usuarios deben conservar las copias necesarias y el operador debe aplicar las medidas de seguridad y atender las solicitudes de derechos necesarias.

### 2.2 Autores del código fuente y operadores de despliegues

Quien proporciona únicamente el código fuente y no decide los fines o medios del tratamiento de una instancia determinada no asume por ese solo hecho las obligaciones de operación de dicha instancia. Si el mismo autor opera una instancia por separado, responde de esa operación; las funciones de decisión conjunta o encargo efectivo también deben determinarse según los hechos y no pueden excluirse por anticipado mediante un documento.

### 2.3 Gobernanza proporcional a la escala

Una instancia pequeña puede llevar un inventario sencillo de datos, aplicar el principio de privilegio mínimo, aislar las claves, utilizar listas de comprobación para los contratos de proveedores y las transferencias, conservar registros de las limpiezas periódicas y establecer un proceso de contacto para incidentes. Conforme a la ley aplicable, debe evaluar si necesita un registro de actividades de tratamiento, un representante en la Unión Europea, un delegado de protección de datos y una evaluación de impacto. El hecho de ser un proyecto de código abierto o de pruebas sin fines de lucro no obliga por sí solo a prometer certificación, personal dedicado ni requisitos de contratación empresarial.

### 2.4 Verificaciones antes de abrir el servicio al público

La identidad y dirección del operador, los terceros efectivos y su ubicación, las bases jurídicas del tratamiento, las opciones y retiradas para funciones que requieren consentimiento, la conservación de registros y respaldos, la supresión completa de cuentas y el seguimiento de solicitudes deben implementarse en la instancia. Deben desactivarse los flujos de datos que carezcan de base o garantías necesarias; no basta con modificar la notificación para continuar el tratamiento. Los datos de la instancia pendientes de verificación se indican en las Secciones 2 y 8 de la [Política de Privacidad](/es/mail/privacy-policy/) y en la Sección 7 de la [Lista de destinatarios externos y encargados del tratamiento](/es/mail/sub-processors/).

## 3. Derechos, supresión e incidentes

### 3.1 Exportación y solicitudes complementarias

La exportación JSON de autoservicio incluye parte de los datos personales, el mapeo de los correos no marcados como eliminados y las etiquetas personalizadas. No incluye todos los campos de destinatarios, el contenido binario de los adjuntos, el correo original, todos los alias de buzón ni los datos de auditoría administrativa. Un archivo .eml individual tampoco garantiza que equivalga a todos los datos personales de la base de datos. Una exportación legible por máquina no satisface por sí sola todas las obligaciones de acceso y portabilidad.

Los datos que no estén incluidos pero puedan solicitarse legalmente deben verificarse y facilitarse por un canal atendido por una persona; la falta de una función no justifica rechazarlos. Los plazos de respuesta, la verificación, los costes y las reclamaciones se rigen por la Sección 9 de la [Política de Privacidad](/es/mail/privacy-policy/).

### 3.2 Procedimiento de supresión

La cancelación de autoservicio actualmente marca como eliminados de forma lógica la cuenta y el estado principal de inicio de sesión; no se ha confirmado ningún mecanismo de borrado físico completo automático a los 90 días. El buzón y la lógica de recepción no comprueban sistemáticamente ese indicador de supresión lógica, por lo que cancelar la cuenta no garantiza que se detenga la recepción. Las páginas de perfil público ya activadas también deben cerrarse y verificarse por separado. La supresión administrativa tampoco demuestra que se hayan eliminado los datos de auditoría, las autorizaciones OAuth, las imágenes y todos los objetos.

Los reintentos de supresión del almacenamiento externo aportado por el usuario dependen de la configuración del almacenamiento original; si primero se quitan los ajustes de la cuenta, un reintento posterior puede no localizar el proveedor original. Antes de completar la supresión, se debe conservar la información necesaria para localizarla, comprobar el tratamiento de cada objeto y luego borrar de forma segura los ajustes correspondientes.

Toda solicitud de supresión debe quedar registrada de forma trazable y comprobar por separado la cuenta, los alias, los correos, los objetos, los datos de autenticación y autorización, los sistemas de auditoría y los respaldos. Los datos que deban conservarse legalmente deben tener su fundamento registrado, quedar aislados de otros usos y acompañarse de los motivos y plazos que puedan comunicarse. No se debe confirmar al usuario que «todo se ha eliminado definitivamente» antes de verificar que se completó. La tramitación de solicitudes no puede exceder el plazo legal porque los procesos internos aún no estén automatizados.

### 3.3 Minimización y opciones del usuario

Los campos personales no necesarios, las páginas públicas y las notificaciones externas deben depender de la elección del usuario; las funciones elegidas solo deben enviar los campos necesarios. Antes de habilitar IA, alternativas públicas de traducción o recursos remotos para datos personales reales, se debe contar con una base válida, una notificación clara y garantías adecuadas. Se debe indicar quién puede ver los campos públicos y cuáles son las limitaciones para revocarlos, así como para cualquier contenido accesible a quien posea un enlace de lectura.

### 3.4 Respuesta ante incidentes

Al detectar un incidente, se deben contener sus efectos, preservar las pruebas necesarias, determinar los datos y riesgos involucrados y registrar las decisiones. La notificación a la autoridad prevista por el RGPD está sujeta a las condiciones de riesgo y debe efectuarse, cuando sea posible, dentro de las 72 horas desde que se tenga conocimiento del incidente. Si existe un alto riesgo, se debe notificar a los interesados sin dilación indebida conforme a la ley. Las reglas completas figuran en la Sección 10 de la [Política de Privacidad](/es/mail/privacy-policy/); un aviso público sobre una vulnerabilidad no sustituye sistemáticamente la notificación individual.

Los problemas de seguridad pueden comunicarse de forma privada a `announcement@epocanvas.com`; las consultas de privacidad y las solicitudes de derechos deben enviarse a `privacy@epocanvas.com`. Los avisos públicos sobre correcciones deben evitar detalles de incidentes que identifiquen a usuarios o credenciales aún explotables.
