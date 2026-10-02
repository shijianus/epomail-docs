---
title: Tratamiento de Datos y Mantenimiento de la Seguridad
description: Seguridad de los datos y protección de datos personales de EpoCanvas Mail — medidas de seguridad, límites de responsabilidad de la operación de doble vía, ejercicio de sus derechos y respuesta ante incidentes de seguridad.
---


**Fecha de entrada en vigor: 2 de octubre de 2026 | Versión: 5.7**

Este documento describe las medidas con que la instancia alojada oficial (mail.epocanvas.com) protege los datos, los límites de responsabilidad entre el servicio alojado y el proyecto de código abierto, y cómo puede consultar, exportar y eliminar sus propios datos. Se establece en virtud de la [Política de Privacidad](/es/mail/privacy-policy/) y los [Términos del Servicio](/es/mail/terms-of-service/); los hechos técnicos que enuncia siguen la implementación real del código abierto.

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional. Los documentos jurídicos y técnicos de este sitio siguen la implementación de código abierto del servicio y buscan establecer normas de comunicación comunitarias transparentes, rigurosas y no comerciales.

<div class="privacy-checkup-row">
  <div class="privacy-checkup-icon">
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#E8F0FE"/>
      <path d="M20 9L29 13V19C29 24.5 25.2 29.6 20 31C14.8 29.6 11 24.5 11 19V13L20 9Z" fill="#1967D2"/>
      <path d="M17 20L19.2 22.2L23.8 17.6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="privacy-checkup-content">
    <div class="privacy-checkup-title">Guía rápida de seguridad y privacidad</div>
    <div class="privacy-checkup-desc">¿Quiere saber cómo se recopilan y protegen los datos, cómo ejercer sus derechos o cómo verificar estos documentos?</div>
    <a href="/es/mail/overview/" class="privacy-checkup-link">Ir a la vista general ↗</a>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 1. Seguridad integrada en el servicio

La protección de datos en la instancia alojada oficial se organiza en cuatro capas: transporte, procesamiento en el borde, almacenamiento en reposo y credenciales. Cada medida está implementada en el código abierto y puede auditarse de forma independiente.

<div class="google-illustration-container">
  <img src="/images/mail/security-trust-shield.svg" alt="Defensa en profundidad de EpoCanvas Mail: transporte cifrado, procesamiento sin estado en el borde, cifrado en reposo y protección de credenciales, sobre el control del usuario" width="416" height="276" />
</div>

*Figura: cuatro capas de protección: transporte, borde, almacenamiento en reposo y credenciales; la base es su propio control (exportación de autoservicio, eliminación y verificación en dos pasos).*

### 1.1 Cifrado del transporte

Cuando accede al servicio mediante navegador o aplicación móvil, todas las conexiones viajan cifradas con HTTPS/TLS, de modo que el contenido de las comunicaciones resulta ilegible para los intermediarios de las redes públicas. Los recursos estáticos del sitio se distribuyen mediante una red de distribución de contenidos, con cabeceras de caché y de seguridad.

### 1.2 Procesamiento sin estado en el borde

La lógica de negocio se ejecuta en Cloudflare Workers (entornos aislados V8 Isolate): el texto plano de los correos descifrado durante el procesamiento existe solo en la memoria de esa solicitud; al terminar, el entorno aislado se libera y no queda texto plano en los discos físicos del equipo anfitrión. El servicio no mantiene servidores persistentes propios ni procesos en segundo plano permanentes.

### 1.3 Cifrado en reposo

El cifrado del asunto y el cuerpo de los correos depende del modo de correo que adopte la instancia: en modo «Cifrado», el asunto y el cuerpo de todos los correos se almacenan con AES-256-GCM (con etiquetas de autenticación); en modo «Privado», todo se cifra salvo el correo no deseado y la papelera; en modo «Todo», no se aplica cifrado. Cada registro utiliza un vector de inicialización aleatorio. Las claves de cifrado se derivan mediante HKDF-SHA256 de una variable de entorno de secreto maestro a nivel de instancia (`jwt_secret` / `totp_enc_key`) con una sal por usuario; el secreto maestro nunca se escribe en la base de datos ni se confirma en el repositorio. Los adjuntos quedan fuera del alcance del cifrado.

:::caution[Alcance y límites del cifrado]
El cifrado descrito es un cifrado en reposo del lado del servidor: protege frente a riesgos de infraestructura como el robo de archivos de la base de datos o la fuga de instantáneas; no es cifrado de extremo a extremo. Un operador que controle el servidor de la instancia y el secreto maestro es técnicamente capaz de descifrar el contenido. Lo que los administradores pueden ver depende del modo de correo: en modo «Todo», el administrador puede leer todos los correos; en modo «Privado», solo el correo no deseado, eliminado y sin destinatario; en modo «Cifrado», la interfaz de administración no devuelve el contenido de los correos. Si necesita confidencialidad frente a todo tercero, incluido el operador, cifre usted mismo el cuerpo con GPG/OpenPGP o una herramienta similar del lado del cliente antes de enviarlo.
:::

### 1.4 Protección de las credenciales

- **Contraseñas**: se calculan con PBKDF2-HMAC-SHA256 a 100.000 iteraciones con una sal aleatoria única por usuario; nunca se almacenan en texto plano ni de forma reversible;
- **Verificación en dos pasos**: el secreto TOTP se almacena cifrado con AES-256-GCM; los códigos de recuperación se guardan solo como resúmenes SHA-256;
- **Llaves de acceso (Passkey/WebAuthn)**: el servidor almacena únicamente la clave pública y el identificador de la credencial; la clave privada permanece en el autenticador de su dispositivo y nunca viaja por la red.

### 1.5 Matriz de tratamiento de datos

Las categorías de datos, los campos recopilados, las finalidades, los soportes de almacenamiento y los plazos de conservación del servicio son los siguientes:

| Categoría de datos | Campos recopilados | Finalidad | Almacenamiento y protección | Conservación |
| --- | --- | --- | --- | --- |
| Credenciales de cuenta | dirección de correo, nombre de usuario, resumen de contraseña y sal, secreto TOTP (cifrado), resúmenes de códigos de respaldo, claves públicas de llaves de acceso | registro, inicio de sesión, verificación en dos pasos | Cloudflare D1; PBKDF2 (100.000 iteraciones), TOTP cifrado en reposo | mientras exista la cuenta; sesiones revocadas al desactivarla, irrecuperables tras la eliminación física |
| Datos de comunicación | remitente y destinatarios, CC/CCO, asunto, marcas de tiempo, estado de lectura, etiquetas, cuerpo del correo | envío, recepción, organización en conversaciones, búsqueda por palabras clave | Cloudflare D1 (metadatos); asunto y cuerpo cifrados según el modo de correo | bajo su control; la papelera se conserva 7 días y luego se elimina físicamente |
| Datos de red y dispositivo | IP de registro, IP del último inicio de sesión, sistema operativo, tipo de navegador y dispositivo, código de país o región procedente de la solicitud en el borde | auditoría de seguridad, detección de inicios de sesión inusuales | Cloudflare D1; consultables solo en auditorías de administración, nunca para perfiles comerciales | hasta la eliminación física de la cuenta |
| Sesiones y autorizaciones | tokens de sesión JWT, permisos de rol | autenticación de la API en el borde | lista de autorización en Cloudflare KV; como máximo 10 sesiones activas por cuenta | válidos 30 días; eliminados de inmediato al cerrar sesión |
| Adjuntos | nombre de archivo original, tipo MIME, tamaño, contenido binario | transferencia, vista previa y descarga de adjuntos | almacenamiento de objetos de la instancia (resuelto en este orden: almacenamiento compatible con S3 propio, enlace R2, KV por defecto); cabeceras defensivas en la descarga | se eliminan junto con el correo al que pertenecen |

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Límites de responsabilidad de la operación de doble vía

EpoCanvas Mail es a la vez un servicio alojado oficial y un proyecto de código abierto. La definición del responsable del tratamiento y el reparto de responsabilidades entre las tres partes figuran en la sección 2 de la [Vista general de Privacidad y Términos](/es/mail/overview/); esta sección complementa el posicionamiento de la instancia alojada y las reglas de distribución del código abierto.

<div class="google-illustration-container">
  <img src="/images/mail/dual-nature-scale.svg" alt="Gobernanza de doble vía de EpoCanvas Mail: una base de código abierto, con el responsable del tratamiento y los límites de responsabilidad de las instancias alojadas y autoalojadas" width="416" height="276" />
</div>

*Figura: dos vías de operación sobre una misma base de código abierto. El equipo de operación es el responsable del tratamiento de la instancia alojada; quien despliega una instancia autoalojada es su único responsable del tratamiento; los autores originales no operan ningún servicio ni custodian datos.*

### 2.1 Posicionamiento de la instancia alojada oficial

La instancia alojada mail.epocanvas.com es operada por el equipo de operación con carácter no comercial: no se inserta publicidad, no se venden ni alquilan datos de usuarios y no se ofrece ningún acuerdo de nivel de servicio (SLA) empresarial. La disponibilidad depende de servicios upstream como Cloudflare y los canales de entrega; exporte usted mismo, con regularidad, copias de seguridad de su correspondencia importante (véase la sección 3).

### 2.2 Límites de conducta

El uso de la instancia alojada queda sujeto a la íntegra de la [Política de Uso Aceptable](/es/mail/acceptable-use/), incluida la prohibición del correo masivo no solicitado, la suplantación por phishing y la difusión de malware, el registro masivo y el abuso de recursos. Las infracciones se tramitan conforme a la escala de ejecución de esa política, hasta la eliminación física.

### 2.3 Distribución y modificación del código abierto

El código fuente se publica bajo licencia MIT; cualquier persona u organización puede consultarlo, auditarlo, modificarlo y autoalojarlo. Al distribuir o modificar el código:

1. conserve íntegramente el aviso de derechos de autor original y el texto completo de la licencia MIT;
2. no insinúe en dominios, interfaces ni material promocional que una instancia está operada o avalada por el equipo oficial;
3. si ofrece registro público de correo, publique su propia entidad operadora, sus términos de servicio y su política de privacidad. Los documentos de este sitio pueden servirle de plantilla; eso no constituye un aval.

### 2.4 Responsabilidad independiente de las instancias autoalojadas

Un tercero que despliegue el código abierto se convierte, desde el momento del despliegue, en el único y exclusivo responsable del tratamiento para los usuarios de su instancia, y debe cumplir por sí mismo las obligaciones de información, mantenimiento de la seguridad y supervisión que exija el derecho aplicable en su lugar. Los autores y colaboradores originales no operan ninguna instancia, no acceden a los datos de las instancias autoalojadas y no asumen responsabilidad solidaria alguna por su operación, sus incidentes de seguridad ni sus litigios.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. El control de sus datos

Usted dispone de derechos de acceso, copia, rectificación, cese del tratamiento y eliminación sobre sus propios datos. Este capítulo explica mediante qué función se hace efectivo cada derecho; las definiciones completas están en la sección 9 de la [Política de Privacidad](/es/mail/privacy-policy/).

<div class="google-illustration-container">
  <img src="/images/mail/data-sovereignty-export.svg" alt="Control de datos de EpoCanvas Mail: exportación de autoservicio, eliminación con búfer de papelera y derechos exigibles" width="416" height="276" />
</div>

*Figura: tres vías de control: exportación de autoservicio (JSON), eliminación (búfer de papelera y luego eliminación física) y ejercicio de derechos (respuesta en 30 días).*

### 3.1 Acceso, exportación y rectificación

- **Autoservicio en la interfaz**: puede consultar en cualquier momento su perfil, sus registros de inicio de sesión y todos sus correos en la interfaz del buzón;
- **Exportación de datos**: «Ajustes → Exportación de datos» genera una copia completa en formato JSON (perfil y texto íntegro del correo no eliminado); un correo individual también puede descargarse como archivo .eml;
- **Solicitudes manuales**: las solicitudes que requieren gestión humana, como la rectificación o el cese del tratamiento, se responden y tramitan en un plazo de 30 días desde su recepción, mediante `privacy@epocanvas.com`.

### 3.2 Eliminación

- **Eliminación de correos**: los correos eliminados pasan primero a la papelera y una tarea programada los elimina físicamente (adjuntos e índices incluidos) 7 días después; la eliminación es irreversible. Cuando el buzón supera el 90 % de la cuota, las eliminaciones que usted ejecuta son físicas de inmediato para liberar espacio;
- **Desactivación de la cuenta**: puede desactivarla usted mismo en los ajustes. Las sesiones se revocan de inmediato y los correos y datos pasan a estado de eliminación lógica hasta que un administrador ejecute la eliminación física; tras esta, los datos de la cuenta, los correos, los adjuntos y las autorizaciones se retiran de la base de datos y del almacenamiento de objetos, sin posibilidad de recuperación;
- **Derechos legales correspondientes**: los derechos de acceso, copia y eliminación que el RGPD reconoce a los usuarios del Espacio Económico Europeo, y los derechos de información, eliminación y no discriminación que el CCPA/CPRA reconoce a los residentes de California, se hacen efectivos mediante las funciones de autoservicio y el canal de solicitud manual anteriores; los usuarios de otras jurisdicciones ejercen derechos equivalentes conforme al derecho aplicable en su lugar.

### 3.3 Exclusión de venta y rastreo

- El operador no vende, alquila ni intercambia sus datos personales ni el contenido de sus comunicaciones;
- Los datos no se utilizan para publicidad conductual entre contextos, perfiles de usuario ni entrenamiento de modelos comerciales;
- El ejercicio de sus derechos de privacidad no degrada la funcionalidad, la calidad ni la disponibilidad del servicio.

### 3.4 Respuesta ante incidentes de seguridad

Si datos personales son robados, divulgados, alterados o perdidos, el operador procederá así:

1. **Contención inmediata**: desconexión forzada de las sesiones afectadas y cuarentena del contenido comprometido, suspendiendo parte del servicio si es necesario para impedir que el daño crezca;
2. **Notificación legal**: notificación a la autoridad competente dentro del plazo que exija el derecho aplicable, e información a las personas afectadas mediante un aviso en el sitio o un correo del sistema;
3. **Correcciones publicadas**: identificada la causa, publicación de las correcciones y de un aviso de seguridad en el repositorio de código abierto para que los operadores autoalojados se pongan al día.

Para informar de un problema o vulnerabilidad de seguridad, utilice:

- **Seguridad y comunicaciones oficiales**: `announcement@epocanvas.com`
- **Privacidad y protección de datos**: `privacy@epocanvas.com`
