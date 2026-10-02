---
title: Tratamiento de datos y operaciones de seguridad
description: Ciclo de vida de los datos, matriz de almacenamiento, defensas criptográficas, gobernanza de doble naturaleza y cumplimiento normativo global en EpoCanvas Mail.
---

**Fecha de entrada en vigor: 1 de octubre de 2026 | Versión: 5.6**

<div class="google-hero-card">
  <div class="google-hero-lead">
    EpoCanvas Mail opera bajo una premisa fundamental: «La privacidad es un derecho humano inalienable» y «El código es el contrato». Nuestra plataforma se fundamenta en una estructura de Fusión de Doble Naturaleza que une un servicio en la nube gestionado, sin telemetría y sin publicidad, con un proyecto de software de código abierto autónomo. Este documento expone el ciclo de vida de los datos, la matriz de almacenamiento cifrado, el modelo de defensa en profundidad de cuatro niveles y los límites de responsabilidad jurídica en diversas jurisdicciones globales.
  </div>
  <div class="google-hero-meta">
    <span class="google-pill">🛡️ Cero telemetría (Zero Telemetry)</span>
    <span class="google-pill">🔐 Cifrado en reposo AES-256-GCM</span>
    <span class="google-pill">⚡ Ejecución perimetral efímera (V8)</span>
    <span class="google-pill">🌐 Cumplimiento global (RGPD / CCPA)</span>
  </div>
</div>

El presente documento se rige por nuestra [Política de privacidad](/es/mail/privacy-policy/) y los [Términos del servicio](/es/mail/terms-of-service/). Constituye una guía fidedigna para usuarios que verifican nuestras garantías técnicas, una referencia operativa para administradores de nodos independientes y una especificación de auditoría para autoridades regulatorias.

## 1. Ciclo de vida de los datos y modelo de procesamiento perimetral

El ciclo de vida de las comunicaciones en EpoCanvas Mail se estructura en seis fases operativas: Recopilación, Procesamiento, Uso, Transferencia, Conservación y Eliminación irreversible. Cada fase se ejecuta de forma sin estado en la red perimetral Anycast de Cloudflare, evitando la persistencia indebida y la fuga de información entre instancias.

![EpoCanvas Mail Ciclo de vida de los datos: Recopilar -> Procesar -> Usar -> Transferir -> Conservar -> Destruir](/images/mail/data-flow.svg)

*Figura 1: Flujo completo del ciclo de vida de los datos personales. Cada etapa aplica estrictamente el principio de minimización y aislamiento criptográfico; véase la sección 5 de la [Política de privacidad](/es/mail/privacy-policy/) para las bases jurídicas del tratamiento.*

### 1.1 Recopilación mínima y compromiso de cero telemetría

La fase de recopilación aplica una rigurosa minimización de datos. El sistema únicamente recopila los identificadores indispensables para la autenticación de la cuenta (nombre de usuario y alias de correo). Nunca se recopilan agendas de contactos, lecturas de giroscopio, portapapeles ni rastreadores entre sitios. Mantenemos un compromiso inquebrantable: **EpoCanvas Mail aplica una política estricta de Cero Telemetría tanto en la instancia oficial como en el código fuente abierto**. No se incluyen SDKs comerciales de análisis, rastreadores publicitarios ni balizas remotas; las interacciones permanecen circunscritas al entorno local del cliente.

### 1.2 Ejecución efímera y aislamiento en memoria V8

Al llegar nuevos correos o iniciarse solicitudes de usuario, la lógica de negocio se ejecuta de forma instantánea en entornos aislados V8 (Cloudflare Workers) en el nodo perimetral más próximo. Estos aislados se inicializan en nanosegundos y se destruyen inmediatamente tras completar la petición. Los datos descifrados existen únicamente en memoria volátil y jamás se escriben en discos físicos del servidor anfitrión. Esta arquitectura sin estado erradica la persistencia de datos en memoria, fugas entre procesos y ataques de canal lateral en entornos compartidos.

### 1.3 Supresión criptográfica y derecho al olvido

Para garantizar el derecho de supresión («derecho al olvido»), el sistema aplica un protocolo automático e irreversible de depuración. Los correos trasladados a la Papelera se conservan durante un periodo de salvaguarda de 7 días, tras el cual un temporizador perimetral (Cron Trigger) los elimina físicamente de la base de datos. Si el buzón supera el 90 % de su cuota, los mensajes eliminados se purgan proactivamente para preservar la integridad del servicio. Al solicitarse la baja de una cuenta, el sistema borra los registros en D1 y KV, y destruye las claves criptográficas derivadas, haciendo imposible su recuperación.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Matriz de tratamiento de datos y especificaciones de almacenamiento

La siguiente matriz clasifica las categorías de datos tratados, sus finalidades específicas, los soportes de almacenamiento utilizados y sus periodos de retención:

| Categoría de datos | Elementos de datos concretos | Finalidad del tratamiento | Soporte y estándar de seguridad | Periodo de conservación y supresión |
| --- | --- | --- | --- | --- |
| Credenciales de cuenta | Dirección de correo, usuario, hash de contraseña con sal, clave TOTP (cifrada AES-GCM), códigos de respaldo, clave pública Passkey | Registro, autenticación, segundo factor de autenticación, recuperación de credenciales | Cloudflare D1; PBKDF2 (100.000 iteraciones con sal), cifrado estático de TOTP | Conservado hasta la baja de la cuenta; supresión física inmediata al cancelar |
| Datos de red y dispositivo | IP de registro, IP de último inicio de sesión, sistema operativo, User-Agent, tipo de dispositivo | Auditoría de seguridad, detección de anomalías, control de velocidad de peticiones | Cloudflare D1; acceso restringido a auditoría de administradores | Conservado hasta la supresión definitiva de la cuenta |
| Estado de sesión | Tokens JWT, roles RBAC asignados, buzón seleccionado | Autorización en pasarela perimetral, enrutamiento de peticiones | Cloudflare KV; validez máxima de 30 días deslizantes | Revocado al cerrar sesión; caducidad automática tras 30 días de inactividad |
| Datos de comunicación | Remitente, destinatarios, CC/BCC, asunto, marcas temporales, estado de lectura, etiquetas, estrellas, cuerpo del mensaje | Entrega de correos, organización de hilos, búsqueda | Cloudflare D1 (metadatos); cuerpos cifrados en reposo mediante AES-256-GCM | Controlado por el usuario; purga en 7 días desde Papelera; vaciado al superar 90% |
| Archivos adjuntos | Nombre original, tipo MIME, tamaño en bytes, contenido binario | Transporte de adjuntos, visualización integrada, descarga segura | Almacenamiento de objetos (S3 BYO > Cloudflare R2 > Cloudflare KV) | Vinculado a la vida del mensaje; eliminado junto con el correo |
| Registros de seguridad y límites | Contador de fallos de acceso, frecuencia de registro, estadísticas de uso de IA | Prevención de ataques de fuerza bruta, control de abusos | Cloudflare KV; contadores de ventana fija | Bloqueos por fallo expiran en 12 horas; registros diarios depurados; IA 60 días |
| Huellas de entorno seguro | Dispositivos conocidos, geolocalización (Geo), ASN de red, marca temporal de 1 hora | Detección de accesos extraños, prevención de fatiga de alertas | Cloudflare KV (prefijo `USER_KNOWN_ENV_`); conserva 15 huellas recientes | Eliminado tras 90 días de inactividad o al darse de baja la cuenta |
| Preferencias de interfaz | Idioma (6 idiomas), modo claro/oscuro, indicadores de notificación | Consistencia de la interfaz de usuario | Navegador localStorage, sincronización opcional con D1 | Conservado hasta borrar la caché o reiniciar ajustes manualmente |

### 2.1 Sanitización de credenciales y estándares PBKDF2 y WebAuthn

Las credenciales de acceso se protegen mediante técnicas criptográficas unidireccionales de alta robustez. La autenticación por contraseña nunca almacena texto plano ni algoritmos vulnerables, empleando PBKDF2 con sal aleatoria de alta entropía durante 100.000 iteraciones para neutralizar ataques basados en tablas arcoíris. En la autenticación en dos pasos (TOTP RFC 6238), las semillas se cifran mediante AES-256-GCM antes de guardarse en D1. Por su parte, las llaves de paso (Passkeys FIDO2 / WebAuthn) se basan en criptografía asimétrica: el servidor solo custodia la clave pública, mientras que la clave privada nunca sale del enclave seguro del hardware del usuario.

### 2.2 Almacenamiento por niveles y almacenamiento externo propio (BYO Storage)

Para la gestión de adjuntos y grandes cargas binarias, el sistema incorpora una capa de almacenamiento desacoplada. Los canales se resuelven jerárquicamente: se prioriza el almacenamiento compatible con S3 aportado por el usuario (Bring-Your-Own Storage), seguido del almacenamiento perimetral nativo Cloudflare R2, recurriendo a Cloudflare KV en configuraciones ligeras. El almacenamiento propio del usuario opera con credenciales independientes, confiriéndole soberanía total sobre sus archivos. Todos los adjuntos se sirven obligatoriamente con encabezados `Content-Disposition: attachment` y `X-Content-Type-Options: nosniff`.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Modelo de defensa en profundidad de cuatro niveles

Para contrarrestar amenazas procedentes de la red pública, EpoCanvas Mail incorpora una arquitectura de seguridad por capas que abarca la red perimetral, los accesos, el almacenamiento persistente y el entorno cliente:

![EpoCanvas Mail Modelo de defensa en profundidad de cuatro niveles](/images/mail/partition-security.svg)

*Figura 2: Arquitectura de defensa en profundidad. Cada capa actúa de manera independiente y redundante para proteger el conjunto de los activos de datos ante contingencias extremas.*

A continuación se resumen 11 directrices clave de seguridad técnica, operativa y organizativa:

| Directriz de seguridad | Implementación técnica y gobernanza en el servicio |
| --- | --- |
| Gestión de accesos y personal | Administradores designados con roles escalonados según modelo RBAC |
| Delimitación de datos personales | Inventario detallado recogido en la sección 2 del presente documento |
| Gestión y evaluación de riesgos | Cifrado configurable, bloqueo por intentos fallidos, auditoría abierta de código |
| Prevención y respuesta a incidentes | Protocolo normalizado en 4 etapas detallado en la sección 6 |
| Procedimientos internos de gestión | Mapeo de actividades de tratamiento según la sección 5 de la Política de privacidad |
| Control de accesos y autorización | Enrutamiento con HMAC, comprobación estricta de permisos y filtrado en pasarela |
| Capacitación y buenas prácticas | Directrices operativas para administradores independientes y guías técnicas |
| Seguridad física de instalaciones | Infraestructura de Cloudflare con certificación SOC 2 Tipo II e ISO/IEC 27001 |
| Auditoría técnica y verificación | Registro de eventos de seguridad (IP, equipo, errores); revocación de sesiones |
| Conservación de pistas y evidencias | Trazas de autenticación custodiadas; tratamiento según Política de uso aceptable |
| Mejora continua y parches | Publicación periódica de versiones y mitigación coordinada de vulnerabilidades |

### 3.1 Nivel 1: Pasarela perimetral y mitigación de abusos

Como primera línea de defensa, la red perimetral Anycast de Cloudflare absorbe y neutraliza ataques de denegación de servicio distribuido (DDoS), exigiendo conexiones seguras mediante TLS 1.3 y precarga de HSTS para evitar la interceptación y degradación del tráfico. Las pasarelas perimetrales aplican filtros contra ataques SSRF: cualquier petición externa o webhook que intente acceder a redes privadas locales (RFC 1918) o interfaces de metadatos de proveedores en la nube (como 169.254.169.254) es rechazada de inmediato.

### 3.2 Nivel 2: Credenciales resistentes al phishing y WebAuthn

La autenticación descarta contraseñas débiles mediante la integración nativa de FIDO2 / WebAuthn. Las llaves de paso quedan vinculadas criptográficamente al dominio específico, anulando ataques de phishing mediante servidores proxy inversos. En las sesiones con contraseña, el sistema impone bloqueo de 12 horas tras reiterados intentos fallidos y compara los accesos con una base de 15 huellas de entorno habituales (dispositivos y ASN), notificando anomalías de manera preventiva.

### 3.3 Nivel 3: Cifrado en reposo AES-256-GCM y segregación de claves

El almacenamiento persistente implementa cifrado en reposo mediante el algoritmo AES-256-GCM. Antes de almacenarse en D1, el cuerpo de los mensajes se cifra con claves contextuales y una etiqueta de autenticación, protegiendo los datos frente a fugas de copias de seguridad o accesos indebidos a discos físicos. Las claves de cifrado se inyectan a través de variables de entorno seguras, manteniéndose separadas de las tablas de datos para que los registros resulten indescifrables si se accede de forma no autorizada a la base de datos.

### 3.4 Nivel 4: Aislamiento en Shadow DOM e integridad de la documentación

La interfaz de usuario implementa un entorno de aislamiento estricto. Los correos electrónicos en formato HTML son saneados mediante DOMPurify para suprimir etiquetas `<script>`, `<style>`, `<iframe>`, `<form>` y eventos en línea, y se renderizan dentro de un contenedor Shadow DOM cerrado que impide la alteración visual del cliente o el robo de cookies de sesión. Asimismo, la documentación técnica oficial está anclada a valores SHA-256 y confirmaciones de Git, certificando su inmutabilidad.

:::caution[Alcance y limitaciones técnicas del cifrado]
Las opciones de cifrado que ofrece el servicio corresponden a cifrado estático en el servidor (Server-side Encryption at Rest). Las claves se derivan de las variables de entorno de la instancia y del contexto del usuario. Este mecanismo mitiga la sustracción de copias de seguridad o accesos indebidos al almacenamiento; no constituye cifrado de extremo a extremo (E2EE). Los operadores con acceso administrativo a la infraestructura tienen la capacidad técnica teórica de descifrar la información. Si las comunicaciones requieren confidencialidad absoluta frente al propio operador, los usuarios deben cifrar los mensajes previamente en local utilizando herramientas como GPG/PGP.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. Gobernanza de doble naturaleza y límites de responsabilidad

EpoCanvas Mail posee una «Doble Naturaleza»: funciona simultáneamente como un servicio de correo gestionado gratuito y como un proyecto de software de código abierto distribuido bajo licencia MIT. Definir con precisión las responsabilidades de cada ámbito es indispensable para la seguridad jurídica de la comunidad:

![EpoCanvas Mail Límites de responsabilidad: Proyecto de código abierto -> Operador de la instancia -> Usuario final](/images/mail/self-host-responsibilities.svg)

*Figura 3: Modelo de gobernanza de doble naturaleza. El proyecto de código abierto suministra exclusivamente el software; los operadores de instancias actúan como responsables del tratamiento independientes; los usuarios pueden optar libremente por el servicio gestionado o la autoinstalación.*

### 4.1 Compromisos y limitaciones de responsabilidad del servicio gestionado

La instancia oficial en `mail.epocanvas.com` está gestionada por el equipo central del proyecto como operador independiente. Nos comprometemos a mantener la disponibilidad, respetar la ausencia de telemetría y aplicar la verificación criptográfica correspondiente. No obstante, al tratarse de un servicio comunitario sin ánimo de lucro, no se ofrecen acuerdos de nivel de servicio (SLA) comerciales ni se asume responsabilidad por daños indirectos derivados de fuerza mayor, interrupciones de proveedores externos o custodia indebida de credenciales por parte del usuario. Los usuarios deben respaldar periódicamente sus correos críticos.

### 4.2 Licencia de código abierto, bifurcaciones y distribución

El código fuente de EpoCanvas Mail se ofrece internacionalmente bajo la licencia MIT. Cualquier persona tiene el derecho legal de auditar, bifurcar (fork) o desplegar nodos privados independientes. Al redistribuir obras derivadas o prestar servicios públicos, deben observarse las siguientes directrices:
1. **Protección de marca e identidad**: Ninguna instalación independiente puede utilizar «EpoCanvas Mail Oficial» o expresiones equivalentes que induzcan a confusión sobre su pertenencia al equipo original;
2. **Conservación de avisos de autoría**: Toda copia o modificación sustancial del código debe conservar el aviso de copyright original y el texto de la licencia MIT;
3. **Avisos legales independientes**: Los administradores que ofrezcan cuentas a terceros deben publicar sus propios términos de servicio y políticas de privacidad, sin remitir a los dominios del proyecto original.

### 4.3 Obligaciones de los administradores de nodos independientes

Cuando un tercero despliega EpoCanvas Mail en su propia cuenta de Cloudflare o infraestructura, **dicho administrador asume la condición exclusiva de «Responsable del Tratamiento» (Data Controller)** de su instancia. Los colaboradores del proyecto matriz no ostentan acceso a los datos ni asumen responsabilidad solidaria alguna sobre instalaciones ajenas. Los administradores independientes deben cumplir la legislación de protección de datos aplicable en su territorio, custodiar sus claves secretas y atender las solicitudes de los usuarios de su nodo.

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. Cumplimiento normativo global y transferencias internacionales

EpoCanvas Mail presta servicio en el ámbito global de Internet. Con el propósito de que los usuarios conozcan con nitidez sus derechos y los condicionantes normativos aplicables en diferentes territorios, alineamos nuestros procesos con los principales marcos regulatorios:

### 5.1 Espacio Económico Europeo (RGPD) y garantías transfronterizas

Para usuarios residentes en la Unión Europea y el Espacio Económico Europeo, el servicio cumple las directrices del Reglamento General de Protección de Datos (RGPD):
- **Derechos de los interesados (arts. 15 a 22)**: Los usuarios pueden ejercer sus derechos de acceso, rectificación, supresión («derecho al olvido»), limitación del tratamiento y portabilidad de sus datos;
- **Base jurídica del tratamiento (art. 6)**: El tratamiento se fundamenta en la ejecución del contrato de servicio (art. 6.1.b) o en el consentimiento explícito del usuario (art. 6.1.a);
- **Transferencias internacionales de datos (Capítulo V)**: Dado que la red Anycast de Cloudflare puede enrutar peticiones a través de nodos internacionales, las transferencias se amparan en las Cláusulas Contractuales Tipo (SCC) de la UE suscritas por el proveedor perimetral.

### 5.2 Jurisdicciones de Estados Unidos (CCPA / CPRA)

En cumplimiento de las normativas estatales de protección de la privacidad de los consumidores en EE. UU. (en particular en California):
- **Ausencia de venta o cesión de datos**: Declaramos formalmente que no hemos vendido ni compartido datos personales con fines comerciales en los últimos 12 meses, ni lo haremos en el futuro;
- **Derecho a la información y no discriminación**: Los usuarios tienen derecho a conocer qué datos se tratan y a solicitar su eliminación sin experimentar menoscabo en la calidad o velocidad del servicio por ejercer sus facultades legales.

### 5.3 Normativa en Asia-Pacífico y asunción consciente de riesgos

Para usuarios en la región de Asia-Pacífico (incluidas las normativas PDPA de Taiwán y Singapur, y la APPI japonesa), la instancia `mail.epocanvas.com` está gestionada por un equipo con sede en Taiwán con sujeción a la normativa local. En el entorno de la red global, los usuarios reconocen y aceptan que:
1. **Tránsito multinacional de paquetes**: El tráfico de correo internacional a través de servidores SMTP intermedios transita por infraestructuras de telecomunicaciones de diversos países;
2. **Seguridad del entorno cliente**: Corresponde al usuario proteger sus dispositivos terminales (actualizaciones, antivirus y autenticación con Passkey o TOTP) para salvaguardar sus buzones;
3. **Medidas contra usos ilícitos**: Toda conducta orientada a ciberataques, envío de spam, phishing o vulneración de derechos ajenos motivará la cancelación del servicio conforme a la [Política de uso aceptable](/es/mail/acceptable-use/).

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. Respuesta ante incidentes de seguridad y cooperación institucional

Con el fin de gestionar eficazmente posibles contingencias de seguridad y actuar con plena transparencia, EpoCanvas Mail aplica un protocolo reglado de respuesta ante incidentes:

### 6.1 Procedimiento de contención y notificación en 72 horas

Ante la detección de cualquier suceso que comprometa la confidencialidad, integridad o disponibilidad de los datos personales, el equipo operativo activa un protocolo en cuatro fases:
1. **Aislamiento urgente de la amenaza**: En cuestión de minutos, se bloquean las IPs atacantes en la pasarela perimetral, se revocan tokens JWT afectados y se rotan las claves de cifrado;
2. **Evaluación de impacto y forense digital**: Se analizan los registros de acceso perimetral para acotar las cuentas y campos implicados y evaluar la gravedad del incidente;
3. **Notificación reglamentaria en 72 horas**: Si el incidente reviste gravedad con arreglo a la normativa, se informará a las personas afectadas en un plazo máximo de 72 horas y se remitirá la correspondiente notificación a la autoridad de control;
4. **Subsanación de causas y comunicación comunitaria**: Corregida la vulnerabilidad, se integra la solución en el repositorio de código abierto y se difunde el aviso de seguridad correspondiente para administradores independientes.

### 6.2 Canales oficiales de reporte y supervisión regulatoria

La instancia gestionada `mail.epocanvas.com` atiende los requerimientos legítimos de las autoridades de supervisión competentes. El presente documento y las políticas asociadas configuran la base de cumplimiento aplicable. Los operadores de nodos independientes gestionan directamente los requerimientos regulatorios en su jurisdicción. Para reportar posibles vulnerabilidades, avisos falsos o incidencias de integridad, rogamos contactar con los canales oficiales habilitados:
- **Centro de Respuesta a Incidentes de Seguridad**: `announcement@epocanvas.com`
- **Oficina de Protección de Datos y Privacidad**: `privacy@epocanvas.com`
