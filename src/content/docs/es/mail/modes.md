---
title: Modos de funcionamiento
description: Modos de funcionamiento de EpoCanvas Mail — formas de despliegue, los tres niveles de privacidad del modo de correo, grupos de identidad y cuotas, inicio de sesión y verificación en dos pasos, multicuenta y modos de visualización de la interfaz.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.17**

El mismo código de EpoCanvas Mail adopta formas de funcionamiento distintas según la configuración: una instancia puede estar alojada o autodesplegada; el administrador elige el equilibrio entre privacidad y revisabilidad entre tres modos de correo; las cuentas reciben cuotas y permisos según su grupo de identidad; y el inicio de sesión, la multicuenta y la visualización ofrecen cada uno varias opciones. Esta página describe el comportamiento y las diferencias de cada modo. El tratamiento de datos asociado figura en [Tratamiento de datos y seguridad](/es/mail/data-security/); el funcionamiento de las funciones, en la [Guía de funciones](/es/mail/features/); las entradas de configuración, en la [Guía de configuración](/es/mail/settings/).

## 1. Formas de despliegue: instancia alojada y autodespliegue

El servicio se ofrece en las dos formas siguientes; la calificación del responsable del tratamiento en cada caso consta en la sección 2 de la [Descripción general de privacidad y condiciones](/es/mail/overview/):

| Forma | Operador | Caso de uso |
| --- | --- | --- |
| Instancia alojada | El equipo de operación de EpoCanvas ([mail.epocanvas.com](https://mail.epocanvas.com)) | Registro y uso inmediatos, sin necesidad de dominio ni cuenta de Cloudflare propios |
| Instancia autodesplegada | La persona u organización que la despliega | Todos los datos permanecen en los recursos de Cloudflare del propio desplegador, con código fuente auditable |

## 2. Modo de correo: tres niveles de privacidad

El administrador selecciona el modo de correo de la instancia en la tarjeta de configuración del sitio, dentro de la configuración del sistema. El modo determina la política de cifrado en reposo y el alcance con que el lado administrativo puede ver el contenido del correo de los usuarios:

![Configuración del sistema de EpoCanvas Mail, tarjeta de configuración del sitio: el desplegable del modo de correo está abierto y muestra Modo de todo el correo (Level 1), Modo de correo privado (Level 2 [Recomendado]) y Modo de correo cifrado (Level 3 [E2EE]); el valor actual es el modo de correo privado con una insignia de privacidad reforzada Level 2 (interfaz en chino simplificado)](/images/mail/es/ui/mode-guide.png)

*Figura: selección del modo de correo. La instancia mostrada funciona en modo de correo privado; la tarjeta de personalización a la derecha y las tarjetas de almacenamiento y de push más abajo están en la misma página.*

<details>
<summary>Guía visual: El modo de correo —  cómo un desplegable decide la privacidad de toda la instancia</summary>

La región del modo de correo dentro de la tarjeta de configuración del sitio, en la configuración del sistema: un solo desplegable decide el cifrado con que se almacena el correo de toda la instancia y cuánto alcanza a ver el lado administrativo, con efecto inmediato.

1. **Desplegable del modo de correo**: El administrador elige el equilibrio entre tres niveles: Level 1 todo en texto claro (el lado administrativo ve todo el correo), Level 2 modo privado (valor de fábrica; la correspondencia de los usuarios se cifra en reposo con AES-256-GCM) y Level 3 E2EE integral (la interfaz administrativa no devuelve ninguna lista de correo de usuarios).
2. **Insignia de privacidad reforzada Level 2**: La instancia funciona en modo de correo privado: el lado administrativo solo ve correo no deseado, papelera y correo sin propietario, y el interruptor general de la verificación en dos pasos queda bloqueado en encendido.
3. **Las tres opciones al desplegar**: De un vistazo se aprecian las diferencias entre L1 modo de todo el correo, L2 modo de correo privado (recomendado) y L3 modo de correo cifrado (E2EE). En el modo cifrado desaparece la entrada de revisión de todo el almacén, los informes de operaciones pierden sus marcas de tiempo y el reenvío global queda bloqueado en apagado.

</details>

| Modo | Almacenamiento del correo | Visibilidad administrativa | Interruptor general de dos pasos | Reenvío global y push del bot |
| --- | --- | --- | --- | --- |
| Modo de todo el correo (Level 1) | Todo en texto claro | Todo el correo | Se puede apagar | Se puede encender |
| Modo de correo privado (Level 2, valor de fábrica) | Correspondencia de los usuarios cifrada en reposo con AES-256-GCM; la papelera se conserva en texto claro para permitir la recuperación | Solo correo no deseado, papelera y correo sin propietario | Bloqueado en encendido | Se puede encender |
| Modo de correo cifrado (Level 3 [E2EE]) | Todo el correo (papelera incluida) totalmente cifrado | No devuelve lista alguna de correo de usuarios | Bloqueado en encendido | Bloqueado en apagado |

El cambio de modo surte efecto de inmediato. En el modo cifrado, la lista administrativa de correo permanece vacía de forma permanente, los informes de auditoría pierden sus marcas de tiempo y la entrada de revisión de correo desaparece de la barra lateral administrativa. El reenvío individual y el push de Telegram que cada usuario configura no siguen el modo global del sitio: se rigen por los interruptores de control de datos de usuario fijados por el operador y por los ajustes propios de cada usuario. En el modo privado, restaurar un mensaje desde la papelera lo descifra antes de devolverlo al buzón y lo vuelve a cifrar después.

## 3. Grupos de identidad y cuotas

Cada cuenta pertenece a un grupo de identidad, que determina la cuota de envío, el número de buzones, la cuota de almacenamiento y el permiso de adjuntos:

![Página de permisos de EpoCanvas Mail: la tabla enumera los seis grupos de identidad — Usuario normal, Visitante, Usuario normal LV.0, Usuario normal LV.1, Moderador y Maestro — con sus etiquetas de posicionamiento, cuotas de almacenamiento, límites de envío, permisos de adjuntos y columnas de autorización de modelos de IA (interfaz en chino simplificado)](/images/mail/es/ui/roles-guide.png)

*Figura: vista general de la arquitectura y la graduación en la página de permisos. La cuota de almacenamiento, el límite de envío y los adjuntos se fijan grupo por grupo; el grupo Maestro no tiene techo de envío ni de buzones.*

<details>
<summary>Guía visual: Los roles —  cinco columnas deciden qué puede hacer un grupo</summary>

La tabla de los seis grupos de identidad de la página de control de permisos: cinco columnas anotadas, una por cada una de las cinco dimensiones ajustables por grupo.

1. **Columna de identidad**: Los seis grupos —Usuario normal, Visitante, Usuario normal LV.0, LV.1, Moderador y Maestro— con su etiqueta de posicionamiento. El grupo decide los valores por defecto de las otras cuatro columnas; Visitante y Maestro están protegidos y no pueden eliminarse.
2. **Columna de cuota de almacenamiento**: Una cuota de almacenamiento de adjuntos por grupo (de 0 MB en el Visitante a 1024 MB en el Maestro, que la interfaz rotula «sin límite»). Al conectar un almacenamiento de objetos personal, los adjuntos nuevos dejan de consumir esta cuota.
3. **Columna de límite de envío**: La cuota diaria de envío (5 correos en el Usuario normal hasta 100 en el Moderador; el Maestro no tiene techo), con un contador que se restablece cada día. Los grupos a los que se prohíbe enviar —el Visitante— quedan señalados aquí.
4. **Columna de permisos de adjuntos**: Indica si se permite enviar y recibir adjuntos. Los grupos de «solo texto» envían correo sin adjuntos; los grupos que los tienen habilitados siguen sujetos a la cuota de almacenamiento y al límite por archivo.
5. **Columna de modelos de IA autorizados**: El conjunto de modelos de IA que puede invocar el grupo, en combinación con la cuota diaria y el límite de tasa del AI Hub de la configuración del sistema: la capacidad de IA se gradúa según la identidad.

</details>

| Grupo de identidad | Posicionamiento | Envío diario | Buzones | Cuota de almacenamiento | Adjuntos |
| --- | --- | --- | --- | --- | --- |
| Visitante | Entorno de prueba de solo lectura para recorrido e inspección del código abierto | Prohibido | 0 | 0 MB | No permitidos |
| Usuario normal | Miembro básico | 5 | 1 | 5 MB | No permitidos |
| Usuario normal LV.0 | Amigo certificado | 8 | 2 | 10 MB | No permitidos |
| Usuario normal LV.1 | Estudioso activo | 10 | 3 | 25 MB | Permitidos |
| Moderador | Cogestión | 100 | 10 | 500 MB | Permitidos |
| Maestro | Autoridad suprema | Sin techo | Sin techo | 1024 MB | Permitidos |

Los registros nuevos entran en el grupo por defecto de fábrica, el Visitante; el operador puede cambiar el grupo por defecto desde la página de permisos. Los niveles LV.0 y LV.1 se sincronizan automáticamente mediante la vinculación con el nivel del blog: vincular una cuenta del blog eleva la cuenta a LV.0, y la participación activa en el blog la eleva a LV.1. El Visitante es un entorno de prueba de solo lectura con la interfaz completa: puede recorrer las secciones administrativas de solo lectura y tiene prohibido enviar correo. Las cuotas y los permisos siguen siendo ajustables por instancia en la página de permisos; la tabla anterior recoge los valores sembrados de fábrica. El envío y el número de buzones del grupo Maestro quedan sin techo mediante valores cero, mientras que su almacenamiento se siembra de fábrica en 1024 MB (la página de permisos lo rotula como «sin límite») y puede ajustarse según convenga.

## 4. Inicio de sesión y verificación en dos pasos

![Página de inicio de sesión de EpoCanvas Mail: campos de dirección de correo y contraseña, casilla de «mantener la conexión orbital» y botón de inicio de sesión, con los botones de acceso rápido de Google y GitHub debajo, ambos atenuados con la insignia de «próximamente» (interfaz en chino simplificado)](/images/mail/es/ui/login-guide.png)

*Figura: la página de inicio de sesión. El acceso con contraseña es la vía básica; los botones de terceros activados por el administrador sin credenciales aparecen atenuados como «próximamente», y los desactivados no se muestran.*

<details>
<summary>Guía visual: El acceso —  tres pasos de un inicio de sesión con contraseña</summary>

Las tres regiones principales de la página de inicio de sesión: el recorrido completo de introducción y envío del acceso con contraseña; los botones de acceso rápido de terceros quedan debajo de la tarjeta.

1. **Campo de correo**: La cuenta es la propia dirección de correo. En el modo de código de registro, esta página también admite el parámetro de código de invitación `?code=`, que prellena directamente el formulario de registro.
2. **Campo de contraseña**: La frase secreta se almacena como resumen con sal y el servidor nunca entra en contacto con el texto claro. «He olvidado mi contraseña» abre en una ventana emergente el portal externo de apelaciones, con el tipo de apelación, el idioma de la interfaz y el correo como parámetros.
3. **Botón de inicio de sesión**: Al enviarlo, las cuentas con verificación en dos pasos pasan a la segunda verificación; los fallos consecutivos activan el bloqueo antifuerza bruta. Si se marca «mantener la conexión orbital», este dispositivo queda exento de volver a verificarse durante 30 días.

</details>

- Inicio de sesión con contraseña: la vía básica disponible en todas las instancias; la frase secreta se guarda como resumen con sal, y los fallos repetidos activan el bloqueo antifuerza bruta;
- Verificación en dos pasos: se activa desde el centro de dos pasos de la configuración de seguridad; hay tres segundos factores disponibles: una aplicación de autenticación (códigos dinámicos TOTP), códigos de recuperación de respaldo (10 códigos de un solo uso) y llaves de acceso (Passkey, llaves de seguridad de hardware o biometría del dispositivo);
- Dispositivos de confianza: tras marcar «No volver a preguntar en este dispositivo» durante el paso de verificación en dos pasos, el dispositivo queda exento de nueva verificación durante 30 días; entre los 30 y los 60 días se vuelve a pedir verificación, y pasados los 60 días la confianza caduca; la automatización o la manipulación del entorno siempre quedan sin la exención;
- Acceso rápido de terceros: el administrador activa y configura uno a uno los proveedores entre GitHub, Google, Microsoft, Apple y un SSO personalizado; un proveedor activado sin credenciales se muestra atenuado como «próximamente», y uno desactivado no se muestra. Los datos implicados en el acceso de terceros figuran en la [Lista de encargados del tratamiento](/es/mail/sub-processors/).

![Página de configuración de seguridad de EpoCanvas Mail: la tarjeta superior reúne el nombre de usuario, el buzón y el cambio de contraseña; debajo, el centro de dos pasos enumera los tres segundos factores — aplicación de autenticación, códigos de recuperación y llaves de acceso — con su estado de configuración y sus botones de acción (interfaz en chino simplificado)](/images/mail/es/ui/twofa-guide.png)

*Figura: el centro de verificación en dos pasos de la página de seguridad. Cada segundo factor se configura de forma independiente y pueden combinarse.*

<details>
<summary>Guía visual: El centro de verificación en dos pasos —  cuatro tarjetas, tres segundos factores</summary>

Cuatro regiones anotadas de la página de seguridad: arriba, el acceso para modificar las credenciales de la cuenta; abajo, el centro de verificación en dos pasos, que presenta en paralelo tres segundos factores que pueden combinarse.

1. **Tarjeta de nombre de usuario y contraseña**: Permite cambiar el nombre de usuario y la contraseña de acceso y muestra la fecha del último cambio. Para desactivar la verificación en dos pasos también hay que introducir aquí la contraseña y un código dinámico como confirmación.
2. **Aplicación de autenticación (TOTP)**: Tras vincularla escaneando el código QR, genera un código dinámico de 6 dígitos cada 30 segundos. Al terminar la vinculación se muestran de inmediato 10 códigos de recuperación, cada uno de un solo uso, para iniciar sesión cuando la aplicación de autenticación no esté disponible.
3. **Códigos de recuperación de respaldo**: El recurso de respaldo para iniciar sesión cuando falla la aplicación de autenticación: la tarjeta muestra en tiempo real cuántos quedan disponibles. Ver los códigos completos o regenerarlos exige la contraseña de la cuenta, y un restablecimiento anula todos los códigos antiguos.
4. **Llaves de acceso (Passkey)**: Llaves de seguridad de hardware o biometría del dispositivo. Una llave recién registrada se activa en cuanto la aprueba la aplicación de autenticación ya vinculada (o de forma automática al vencer el bloqueo temporal de 30 días); una vez activa, «Probar» verifica el flujo de desbloqueo.

</details>

## 5. Modo multicuenta

El administrador puede activar el «cambio rápido multicuenta» (desactivado por defecto). Una vez activado, el menú del avatar enumera las cuentas conectadas con una entrada de cambio, y «gestionar sus cuentas de Epomail» abre el flujo de alta; cada cuenta conserva una sesión independiente, y las rutas de la interfaz quedan aisladas con el prefijo `/mail/u/índice/`: cambiar de cuenta nunca sobrescribe el inicio de sesión de otra. El cambio entre alias de buzón de una misma cuenta no crea una sesión nueva.

![Menú del avatar de EpoCanvas Mail abierto en la parte superior derecha de la bandeja de entrada: la cuenta actual admin (Maestro) con su flecha desplegable, el botón de «gestionar sus cuentas de Epomail» y la barra de uso de almacenamiento (interfaz en chino simplificado)](/images/mail/ui/ui-account-menu.png)

*Figura: cambio rápido multicuenta. El menú reúne las cuentas conectadas; el alta de una cuenta pasa por el flujo dedicado de la página de inicio de sesión, y las sesiones nunca se sobrescriben entre sí.*

<details>
<summary>Guía visual: El menú del avatar —  el centro de cuentas y detalles de cuenta</summary>

El menú del avatar desplegado en la esquina superior derecha de la bandeja de entrada: el punto de encuentro del cambio de cuenta y del detalle de la cuenta.

- **Línea de cuenta**: La cuenta actual (admin · Maestro) con su flecha desplegable; en el modo multicuenta se enumeran todas las sesiones ya iniciadas, aisladas con el prefijo de ruta `/mail/u/N/`.
- **Botón «gestionar sus cuentas de Epomail»**: La entrada para añadir una cuenta: al pulsarla se completa el inicio de sesión de la nueva cuenta por el enlace profundo dedicado de la página de inicio de sesión, y al volver aparece una sesión más. La clave es que no sobrescribe nada: la nueva cuenta no desplaza a la sesión actual, y el espacio de trabajo de cada cuenta queda aislado tras un prefijo de ruta /mail/u/N/, de modo que cambiar de cuenta solo cambia el prefijo, sin volver a iniciar sesión.
- **Barra de uso de almacenamiento**: La barra de progreso del almacenamiento de adjuntos de la cuenta actual: el numerador es el espacio ya ocupado y el denominador, la cuota de su grupo de identidad (los valores de fábrica por grupo están en la página de control de permisos). Una vez conectado un almacenamiento de objetos personal, los adjuntos nuevos dejan de computar aquí, así que una barra que deja de crecer no significa que los adjuntos hayan dejado de llegar.

</details>

## 6. Idiomas de la interfaz y modos de visualización

La interfaz existe en seis idiomas — 简体中文, 繁體中文, English, Français, Español y Nederlands — que se cambian en la configuración general; los correos del sistema y de bienvenida se envían en el idioma de cada destinatario. La visualización ofrece tres estados — oscuro, claro y seguir el sistema —, complementados con fondos de pantalla temáticos globales y un fondo personal. La aplicación web admite la instalación como PWA, y también hay disponible una aplicación para Android (epomail).

## 7. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Pasos completos para el autoalojamiento | [Guía de despliegue](/es/mail/deployment/) |
| Los límites del servicio de la instancia alojada y sus canales de soporte | [Alcance del servicio y soporte](/es/mail/service-scope/) |
| Posicionamiento del proyecto y despliegue | [Presentación del proyecto](/es/mail/project/) |
| Recorrido por la configuración personal y la consola de administración | [Guía de configuración](/es/mail/settings/) |
| Funciones detalladas con capturas de pantalla | [Guía de funciones](/es/mail/features/) |
| Semántica de privacidad y conservación de los modos de correo | [Tratamiento de datos y seguridad](/es/mail/data-security/) |
| Visibilidad administrativa del contenido del correo | [Política de privacidad](/es/mail/privacy-policy/), sección 10 |
