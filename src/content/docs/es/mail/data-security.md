---
title: Procesamiento de Datos y Mantenimiento de la Seguridad
description: EpoCanvas Mail seguridad integral de datos, gobernanza dual en la nube y código abierto, y cumplimiento normativo global.
---

**Fecha de vigencia: 1 de octubre de 2026 | Versiones archivadas | Versión: 5.6**

Al utilizar EpoCanvas Mail, confía en nosotros para proteger sus comunicaciones e información personal. Entendemos que se trata de una gran responsabilidad y nos esforzamos por proteger sus datos, mantener una transparencia absoluta y garantizar que mantenga el control total y la soberanía sobre su información en todo momento.

El presente documento se rige por nuestra [Política de Privacidad](/es/mail/privacy-policy/) y los [Términos de Servicio](/es/mail/terms-of-service/). Sirve como guía de referencia para los usuarios de nuestra plataforma oficial alojada (mail.epocanvas.com), al tiempo que define las fronteras legales del proyecto de código abierto (epocanvas-mail) y la responsabilidad exclusiva de los operadores autohospedados como controladores de datos independientes.

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
    <div class="privacy-checkup-desc">¿Desea revisar el estado de seguridad de su buzón, configurar llaves de paso FIDO2, activar la verificación en dos pasos (TOTP) o exportar sus datos?</div>
    <a href="/es/mail/overview/" class="privacy-checkup-link">Ir a la descripción general de seguridad ↗</a>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 1. Incorporamos funciones de seguridad en nuestros servicios para proteger sus datos

Todos los datos procesados en nuestra plataforma oficial alojada en la nube (mail.epocanvas.com) están protegidos de forma continua mediante múltiples capas de defensa en profundidad. Explicamos detalladamente todo el ciclo de procesamiento para que pueda verificar nuestras garantías técnicas.

<div class="google-illustration-container">
  <img src="/images/mail/security-trust-shield.svg" alt="Compromiso de seguridad y confianza de EpoCanvas Mail" width="416" height="276" />
</div>

### 1.1 Cifrado en tránsito y protección de canales de red

Aplicamos de forma obligatoria el protocolo moderno de seguridad de la capa de transporte (TLS 1.3) con directivas de precarga HSTS en todas las conexiones entrantes y salientes. Ya sea mediante la interfaz web, llamadas a la API REST autenticada o retransmisión entre nodos, sus comunicaciones se mantienen estrictamente cifradas en tránsito, neutralizando escuchas clandestinas e interceptaciones.

### 1.2 Ejecución perimetral efímera y aislamiento en memoria

Cuando envía o recibe correos, la lógica de negocio se ejecuta de forma instantánea en los nodos perimetrales de Cloudflare Workers (aislados V8) más cercanos a su ubicación geográfica. El contenido descifrado solo reside en memoria RAM volátil durante el procesamiento y el entorno se destruye físicamente en nanosegundos tras finalizar, sin escribir en discos del host.

### 1.3 Cifrado industrial en reposo (AES-256-GCM)

Antes de persistir correos electrónicos o metadatos confidenciales en la base de datos relacional Cloudflare D1, los datos se sellan con vectores de inicialización (IV) únicos y dinámicos mediante el algoritmo AES-256-GCM con etiqueta de autenticación (Auth Tag). Las claves se inyectan como variables de entorno seguras de ejecución, sin almacenarse en repositorios ni persistir en discos físicos.

### 1.4 Hashing robusto de credenciales y llaves de paso por hardware

Las contraseñas de las cuentas se procesan con 100.000 iteraciones del algoritmo PBKDF2 junto con sales criptográficas aleatorias de alta entropía, resistiendo ataques de fuerza bruta por GPU. Las claves secretas de dos factores (TOTP) se cifran en reposo con la clave maestra de la instancia. El sistema admite de forma nativa llaves de paso WebAuthn / FIDO2 (Passkeys), cuyas claves privadas residen de forma inmutable en el enclave seguro del dispositivo del usuario.

### 1.5 Matriz completa de tratamiento de datos

La siguiente tabla desglosa todas las categorías de datos recopilados, los campos específicos, las finalidades de tratamiento, los medios de almacenamiento y los plazos de conservación:

| Categoría de datos | Campos específicos recopilados | Finalidad principal del tratamiento | Soporte de almacenamiento y seguridad | Plazo de conservación y destrucción |
| --- | --- | --- | --- | --- |
| **Credenciales de cuenta** | Dirección de correo, nombre de usuario, hash y sal de contraseña, clave TOTP, códigos de respaldo, clave pública Passkey | Registro, inicio de sesión, validación de doble factor, recuperación | Cloudflare D1; PBKDF2 (100k iteraciones), TOTP cifrado en reposo AES | Hasta la terminación de la cuenta; destrucción física irreversible al darse de baja |
| **Comunicaciones** | Remitente, destinatarios, CC/BCC, asunto, marcas de tiempo, etiquetas, cuerpo del mensaje | Entrega y enrutamiento, organización de buzones, búsqueda | Cloudflare D1 (metadatos); cuerpo sellado estrictamente con AES-256-GCM | Controlado por el usuario; la papelera retiene 7 días antes de la purga criptográfica |
| **Datos de red y dispositivo** | IP de registro, IP de acceso reciente, sistema operativo, User-Agent, modelo | Auditoría de seguridad, detección de anomalías, limitación de velocidad | Cloudflare D1; acceso exclusivo para auditoría administrativa; jamás para perfiles comerciales | Conservado hasta la eliminación de la cuenta |
| **Sesión y autorización** | Token JWT, rol RBAC, contexto de buzón activo | Autenticación en puerta de enlace API perimetral, enrutamiento | Cloudflare KV; validez máxima de 30 días | Revocado de inmediato al cerrar sesión; caduca tras 30 días de inactividad |
| **Archivos adjuntos** | Nombre original, tipo MIME, tamaño en bytes, flujo binario | Transferencia de archivos, vista previa integrada, descarga | S3 compatible configurable, Cloudflare R2 o KV; servido con cabeceras defensivas | Sigue el ciclo de vida del correo; eliminado físicamente al borrar el correo |
| **Huellas de seguridad** | Dispositivos conocidos, distribución geográfica (Geo), ASN de red, marca anti-fatiga | Identificación de accesos no habituales, prevención de relleno de credenciales | Cloudflare KV (prefijo `USER_KNOWN_ENV_`); conserva las últimas 15 huellas | Purgado tras 90 días de inactividad o al darse de baja |

:::caution[Alcance del cifrado, límites técnicos y conocimiento del riesgo por el usuario]
El cifrado proporcionado en la plataforma oficial en la nube constituye **cifrado en reposo del lado del servidor (Server-side Encryption at Rest)**. Las claves residen en variables seguras del entorno de ejecución durante el procesamiento activo. Este mecanismo protege contra robos de bases de datos o filtraciones de copias de seguridad físicas, pero no equivale a cifrado de extremo a extremo (E2EE).

Técnicamente, los operadores con acceso de administración raíz conservan la capacidad de descifrado en memoria. No impedimos que nadie utilice el servicio, pero los usuarios deben evaluar su propio riesgo: si sus comunicaciones contienen secretos de estado o exigen privacidad absoluta de confianza cero, **los usuarios deben emplear herramientas criptográficas del lado del cliente (como GPG / OpenPGP) para cifrar los mensajes localmente antes de enviarlos**.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Gobernanza de doble naturaleza: Servicio en la nube y código abierto

EpoCanvas Mail posee una identidad dual: es tanto un servicio gratuito de correo gestionado accesible al público en general, como un proyecto de software de código abierto bajo licencia MIT. Definir con claridad las responsabilidades y límites legales de ambos es fundamental para la salud del ecosistema.

<div class="google-illustration-container">
  <img src="/images/mail/dual-nature-scale.svg" alt="Equilibrio de gobernanza de doble naturaleza de EpoCanvas Mail" width="416" height="276" />
</div>

### 2.1 Compromisos del servicio oficial alojado (mail.epocanvas.com)

La plataforma oficial `mail.epocanvas.com` es operada por el equipo central como un servicio de interés público. Nos comprometemos a mantener la disponibilidad, la ausencia total de publicidad comercial, la política de cero rastreo y los estándares de integridad criptográfica.

Dado su carácter gratuito y no comercial, el servicio no incluye acuerdos de nivel de servicio (SLA) comerciales ni asume responsabilidad indirecta por interrupciones de infraestructura troncal (como cortes de fibra de Cloudflare) o descuidos en dispositivos locales. Los usuarios son responsables de conservar copias de seguridad de sus comunicaciones críticas.

### 2.2 Lo que esperamos de usted y normas contra el abuso

Deseamos mantener un entorno de comunicación seguro y confiable. Al acceder a nuestro servicio alojado, usted acepta cumplir las siguientes reglas fundamentales:

*   **Cumplir las leyes aplicables**: No utilizar el servicio para evadir controles de exportación, sanciones económicas o vulnerar derechos legales de terceros;
*   **Tolerancia cero con el spam**: Queda estrictamente prohibido enviar correos comerciales masivos no solicitados, campañas de marketing no deseadas o acoso masivo;
*   **Prohibición de phishing y ataques**: Prohibido distribuir software malicioso, suplantar entidades financieras o intentar vulnerar la seguridad de la infraestructura;
*   **Sin explotación automatizada**: Prohibido registrar cuentas mediante bots o manipular los límites de frecuencia. Las cuentas infractoras serán canceladas de inmediato.

### 2.3 Licencia de código abierto, modificaciones y distribución

El código fuente de EpoCanvas Mail se distribuye bajo la licencia permisiva MIT. Cualquier persona u organización tiene el derecho legal irrestricto de inspeccionar, auditar, crear bifurcaciones (forks), modificar o desplegar instancias privadas.

Al distribuir o adaptar el código, se deben respetar tres límites legales obligatorios:

*   **Aislamiento de marca comercial**: Sin autorización previa por escrito, ningún despliegue de terceros puede utilizar «EpoCanvas Mail Oficial» o logotipos oficiales en dominios o materiales de promoción;
*   **Conservación de avisos de derechos de autor**: Todas las copias o modificaciones deben incluir el aviso original de derechos de autor y el texto de la licencia MIT;
*   **Identificación del operador independiente**: Cualquier tercero que ofrezca servicios de registro de correo basados en este código debe publicar su propia entidad legal, términos y política de privacidad independiente.

### 2.4 Responsabilidad exclusiva como controlador de datos para nodos autohospedados

Esta es la frontera legal primordial del software libre:

Cuando un tercero descarga el código y lo despliega en su propia cuenta de Cloudflare, servidor privado o infraestructura de nube, **dicho operador independiente se convierte en el único y exclusivo Controlador de Datos (Data Controller) de esa instancia**.

Los desarrolladores originales del proyecto carecen de puertas traseras, no recopilan telemetría ni tienen capacidad física o deber legal de acceder o gestionar datos de instancias de terceros. Cualquier fuga de datos, incidente de seguridad o litigio legal en un nodo autohospedado **es responsabilidad exclusiva de su operador independiente; los autores del proyecto original no asumen responsabilidad solidaria o subsidiaria alguna**.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Control de sus datos: Exportación, supresión y cumplimiento global

EpoCanvas Mail está abierto a usuarios de todo el mundo. Con independencia de su ubicación geográfica, usted conserva la propiedad y el control absolutos sobre sus comunicaciones.

<div class="google-illustration-container">
  <img src="/images/mail/data-sovereignty-export.svg" alt="Soberanía de datos y derechos de exportación en EpoCanvas Mail" width="416" height="276" />
</div>

### 3.1 Ejercicio pleno de derechos bajo el RGPD de la Unión Europea

Para los usuarios en el Espacio Económico Europeo (EEE), garantizamos el pleno cumplimiento de los artículos 15 a 22 del RGPD:

*   **Derecho de acceso (Artículo 15)**: Puede consultar en todo momento sus datos de cuenta, historial de accesos y registros almacenados;
*   **Portabilidad y exportación (Artículo 20)**: Puede descargar una copia completa de sus correos en formato estándar `.eml` junto con paquetes JSON estructurados para facilitar la migración a otros proveedores;
*   **Derecho de supresión / al olvido (Artículo 17)**: Al solicitar la eliminación de su cuenta, el sistema borra las asociaciones de bases de datos y destruye criptográficamente la clave de cifrado en almacenamiento físico, garantizando la destrucción irreversible;
*   **Cláusulas contractuales tipo (SCCs)**: Las transferencias transfronterizas perimetrales se amparan en las Cláusulas Contractuales Tipo de la Comisión Europea y los acuerdos de tratamiento de datos de nuestra infraestructura subyacente.

### 3.2 Compromisos con la Ley de Privacidad del Consumidor de California (CCPA / CPRA)

Para los residentes de California y de los Estados Unidos, declaramos formalmente:

*   **No venta ni intercambio de datos (Do Not Sell or Share My Personal Information)**: En los últimos 12 meses no hemos vendido, alquilado ni compartido, ni venderemos jamás, información personal de usuarios con intermediarios de datos o anunciantes comerciales;
*   **Limitación en datos sensibles**: La información se recopila exclusivamente para prestar el servicio de correo y jamás para publicidad basada en el comportamiento ni entrenamiento de modelos de inteligencia artificial;
*   **Garantía de no discriminación**: Jamás degradaremos la calidad del servicio, las cuotas ni la velocidad si decide ejercer sus derechos legales de privacidad.

### 3.3 Región Asia-Pacífico y enrutamiento transfronterizo

El equipo oficial opera desde Taiwán y cumple la Ley de Protección de Datos Personales (PDPA). Los usuarios deben comprender la naturaleza técnica del correo electrónico:

El protocolo SMTP es distribuido y transfronterizo. Al comunicarse con destinatarios internacionales, los paquetes de datos atraviesan redes troncales globales sujetas a las normativas de telecomunicaciones de los países de tránsito. Se recomienda encarecidamente proteger los dispositivos finales y activar llaves de paso FIDO2.

### 3.4 Respuesta a incidentes en 72 horas y canales oficiales

Disponemos de un procedimiento operativo estandarizado (SOP) de respuesta a incidentes:

*   **Bloqueo inmediato**: La puerta de enlace bloquea IPs maliciosas y revoca tokens JWT comprometidos en cuestión de minutos ante cualquier anomalía;
*   **Notificación legal en 72 horas**: Si se produce un incidente confirmado que comprometa datos personales, notificaremos a los afectados por correo y anuncio web en menos de 72 horas y lo comunicaremos a los reguladores pertinentes;
*   **Publicación de parches de código abierto**: El equipo publicará las correcciones en el repositorio público junto con avisos de seguridad (Security Advisories).

Para consultas de seguridad, avisos de vulnerabilidad o cuestiones de privacidad, comuníquese a través de nuestros canales oficiales:

*   **Centro de respuesta a incidentes de seguridad**: `announcement@epocanvas.com`
*   **Oficina de privacidad y protección de datos**: `privacy@epocanvas.com`
