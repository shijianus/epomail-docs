---
title: Procesamiento de Datos y Mantenimiento de la Seguridad
description: Ciclo de vida de los datos, matriz de tratamiento, arquitectura de defensa en profundidad, gobernanza dual y cumplimiento normativo global de EpoCanvas Mail.
---

**Fecha de vigencia: 1 de octubre de 2026 | Versión: 5.6**

<div class="google-hero-card">
  <div class="google-hero-lead">
    EpoCanvas Mail defiende la filosofía de ingeniería de que «la privacidad es un derecho humano fundamental» y «el código es el contrato». Construimos una arquitectura de gobernanza de «fusión de doble naturaleza» que integra un servicio gestionado en la nube y un proyecto de código abierto autónomo. Este documento detalla el ciclo de vida de los datos, la matriz de almacenamiento criptográfico, la ingeniería de defensa en profundidad en cuatro capas y las fronteras de cumplimiento en múltiples jurisdicciones.
  </div>
  <div class="google-hero-meta">
    <span class="google-pill">🛡️ Cero telemetría (Zero Telemetry)</span>
    <span class="google-pill">🔐 Cifrado en reposo AES-256-GCM</span>
    <span class="google-pill">⚡ Ejecución perimetral efímera (V8)</span>
    <span class="google-pill">🌐 Cumplimiento global (RGPD / CCPA)</span>
  </div>
</div>

El presente documento se rige por la [Política de Privacidad](/es/mail/privacy-policy/) y los [Términos de Servicio](/es/mail/terms-of-service/). Sirve como guía de referencia para que los usuarios verifiquen las garantías técnicas de privacidad, como estándar operativo para administradores de nodos independientes y como especificación de auditoría legal.

## 1. Ciclo de vida completo de los datos y modelo de procesamiento perimetral

Los datos personales y los flujos de comunicación se dividen estrictamente en seis etapas del ciclo de vida: Recopilación, Tratamiento, Utilización, Transferencia, Conservación y Destrucción criptográfica. Todas las fases se ejecutan sin estado en la red perimetral Anycast de Cloudflare, eliminando residuos en disco y accesos laterales indebidos.

![Procesamiento de datos y ciclo de vida integral de EpoCanvas Mail: Recopilación sin estado, ejecución perimetral en aislados V8, cifrado en sobre AES-256-GCM, almacenamiento escalonado y trituración criptográfica](/images/mail/data-security-pipeline.svg)

*Figura 1: Flujo completo del ciclo de vida de los datos personales. Se aplican principios de minimización y aislamiento criptográfico riguroso; definiciones legales en la [Política de Privacidad](/es/mail/privacy-policy/) Sección 5.*

### 1.1 Recopilación mínima y compromiso de cero telemetría

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Recopilación mínima y cero telemetría comercial</div>
    <span class="google-pill">Minimización de datos · Cero rastreo</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Minimización estricta</strong>: Más allá de los identificadores estrictamente necesarios para el registro y enrutamiento (nombre de usuario, alias de correo) y las credenciales de acceso, el sistema jamás recopila contactos, portapapeles, giroscopio o rastros entre sitios.</p>
    <p><strong>Cero telemetría sin excepciones</strong>: EpoCanvas Mail aplica una estricta política de «cero telemetría de comportamiento» tanto en la instancia alojada como en el código fuente abierto. No se incluyen SDK analíticos comerciales ni scripts de seguimiento de terceros; las operaciones ocurren en el espacio aislado local.</p>
  </div>
</div>

### 1.2 Ejecución perimetral instantánea y aislamiento de memoria

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚡ Cómputo perimetral efímero y aislamiento en nanosegundos</div>
    <span class="google-pill">Cloudflare V8 · Cero escritura en disco</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Aislados V8 sin estado</strong>: Al recibir correos o solicitudes de usuario, la lógica de negocio se procesa de inmediato en el nodo perimetral de Cloudflare Workers más cercano (aislado V8), destruyéndose el entorno en nanosegundos tras finalizar.</p>
    <p><strong>Sin residuos en disco físico</strong>: Los textos descifrados y los datos de enrutamiento residen únicamente en la memoria RAM volátil, sin escribirse jamás en discos físicos del servidor anfitrión, neutralizando riesgos de procesos zombies o ataques de canal lateral entre inquilinos.</p>
  </div>
</div>

### 1.3 Destrucción criptográfica y mecanismo de olvido irrevocable

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🗑️ Trituración criptográfica y derecho al olvido</div>
    <span class="google-pill">Margen de 7 días · Sobrescritura de claves</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Margen de seguridad de 7 días</strong>: Los correos en la papelera se conservan durante un período de seguridad de 7 días antes de ser sobrescritos físicamente por tareas programadas Cron; si el almacenamiento supera el 90%, se ejecuta la eliminación física automática.</p>
    <p><strong>Trituración de claves maestras</strong>: Al cancelar una cuenta, se purgan los registros de las bases de datos D1 y memorias KV, y se sobrescriben irreversiblemente las claves de cifrado en almacenamiento físico, asegurando la extinción matemática absoluta de la información.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. Matriz de procesamiento de datos y especificaciones de medios de almacenamiento

La siguiente tabla clasifica todas las categorías de datos, campos recopilados, propósitos de tratamiento, medios de almacenamiento subyacentes y períodos de retención bajo controles criptográficos por niveles:

| Categoría de datos | Elementos específicos | Finalidad del tratamiento | Soporte de almacenamiento y estándar | Conservación y supresión |
| --- | --- | --- | --- | --- |
| Credenciales de cuenta | Dirección de correo, usuario, hash y sal de contraseña, clave TOTP (AES-GCM), hash de respaldo, clave pública Passkey | Registro, verificación, autenticación de dos factores, recuperación | Cloudflare D1; PBKDF2 (100.000 iteraciones con sal), cifrado estático TOTP | Hasta el cierre de la cuenta; eliminación física inmediata |
| Datos de red y dispositivo | IP de registro, IP de último acceso, sistema operativo, User-Agent, tipo de dispositivo | Auditoría de seguridad, detección de anomalías, control de tasa | Cloudflare D1; acceso exclusivo para auditoría administrativa | Hasta la eliminación física de la cuenta |
| Estado de sesión | Token JWT, reclamos de roles RBAC, identificador de buzón seleccionado | Autorización en puerta de enlace perimetral, enrutamiento | Cloudflare KV; validez máxima de 30 días | Revocado al cerrar sesión; caduca tras 30 días de inactividad |
| Datos de comunicaciones | Remitente y destinatario, CC/BCC, asunto, marcas de tiempo, estados de lectura, etiquetas, estrellas, cuerpo | Entrega de correos, organización de hilos, búsqueda | Cloudflare D1 (metadatos); cuerpo cifrado con AES-256-GCM | Controlado por el titular; papelera purgada a los 7 días; purga automática al 90% |
| Adjuntos | Nombre de archivo original, tipo MIME, tamaño en bytes, contenido binario | Transmisión de adjuntos, previsualización, descarga segura | Almacenamiento de objetos propio (orden: S3 propio, Cloudflare R2, por defecto KV); cabeceras defensivas | Vinculado al ciclo de vida del correo; eliminado físicamente al unísono |
| Registros de seguridad | Conteo de inicios de sesión fallidos, control de registros, estadísticas de IA | Protección contra fuerza bruta, prevención de abusos | Cloudflare KV; contadores de ventana fija | Bloqueos caducan en 12h; registros purgados a diario; métricas de IA guardadas 60 días |
| Huellas de anomalías | Dispositivos conocidos, ubicación geográfica (Geo), ASN de red, marcas de 1 hora | Detección de entornos anómalos, deduplicación de alertas | Cloudflare KV (prefijo `USER_KNOWN_ENV_`); 15 huellas recientes | Eliminado tras 90 días de inactividad o borrado de cuenta |
| Preferencias de interfaz | Idioma (6 idiomas), modo claro/oscuro, marcas de notificación | Consistencia visual | localStorage del navegador, sincronización opcional con D1 | Conservado hasta borrar caché o restablecimiento manual |

### 2.1 Desanonimización de credenciales y estándares de almacenamiento PBKDF2 / WebAuthn

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔐 Protección criptográfica unidireccional y seguridad por hardware</div>
    <span class="google-pill">PBKDF2 100k · WebAuthn FIDO2</span>
  </div>
  <div class="google-card-desc">
    <p><strong>100.000 iteraciones con PBKDF2</strong>: Las contraseñas nunca se guardan en texto claro. Se aplica salado aleatorio con 100.000 iteraciones de PBKDF2, ofreciendo una defensa matemática contundente frente a tablas arcoíris y ataques de fuerza bruta con GPU aceleradas.</p>
    <p><strong>Protección física con TOTP y Passkeys</strong>: Las semillas TOTP se cifran con AES-256-GCM antes de guardarse; las Passkeys se basan en criptografía asimétrica donde la clave privada jamás abandona el chip seguro (Secure Enclave) del usuario, imposibilitando el phishing.</p>
  </div>
</div>

### 2.2 Desacoplamiento de almacenamiento y arquitectura BYO-Storage

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📦 Almacenamiento modular y cabeceras de respuesta defensivas</div>
    <span class="google-pill">BYO-S3 · R2 nativo · KV de reserva</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Enrutamiento en tres niveles de almacenamiento</strong>: Los adjuntos se dirigen de forma inteligente: primero a cubos compatibles con S3 propios (BYO-Storage), segundo a Cloudflare R2 perimetral y como reserva ligera a KV. El modelo BYO otorga soberanía total al usuario sobre sus activos digitales.</p>
    <p><strong>Cabeceras defensivas para navegadores</strong>: Toda descarga de archivos incluye obligatoriamente <code>Content-Disposition: attachment</code> y <code>X-Content-Type-Options: nosniff</code>, impidiendo la ejecución de scripts maliciosos y ataques de descarga inadvertida.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. Sistema de defensa en profundidad de cuatro capas e implementación criptográfica

Para blindar las comunicaciones contra las complejas amenazas de Internet, EpoCanvas Mail implementa un modelo de defensa en profundidad en cuatro capas:

![Modelo de defensa en profundidad en cuatro capas de EpoCanvas Mail: Capa 1 Puerta de enlace perimetral y anti-SSRF, Capa 2 Autenticación FIDO2 Passkeys, Capa 3 Cifrado en reposo AES-256-GCM, Capa 4 Aislamiento en Shadow DOM y auditoría de integridad](/images/mail/defense-layers-architecture.svg)

*Figura 2: Modelo técnico de defensa en profundidad de cuatro capas. Cada nivel funciona de forma independiente para resguardar la información ante presiones extremas.*

La siguiente tabla describe la implementación de 11 controles clave de seguridad en los ámbitos técnico, organizativo y de auditoría:

| Control de seguridad | Aplicación en el servicio |
| --- | --- |
| Asignación de personal y recursos | Administradores designados con control de acceso basado en roles (RBAC) estricto |
| Delimitación de datos personales | Alcance rigurosamente establecido en la matriz de la Sección 2 |
| Evaluación y gestión de riesgos | Tres modalidades de cifrado, bloqueos automáticos, limitación de tasa y código abierto auditable |
| Prevención y respuesta a incidentes | Protocolo formalizado en la Sección 4 |
| Procedimientos internos de gestión | Asignación de actividades descrita en la [Política de Privacidad](/es/mail/privacy-policy/) Sección 5 |
| Gestión de seguridad y personal | Rutas con hash criptográfico, comprobación restrictiva por defecto y filtrado de parámetros |
| Sensibilización y capacitación | Responsabilidad de cada operador independiente; la documentación oficial sirve como material |
| Seguridad física de instalaciones | Infraestructura de Cloudflare con certificaciones SOC 2 Type II e ISO/IEC 27001 |
| Mecanismos de auditoría de seguridad | Registros de acceso con privilegios restringidos y capacidad de revocación inmediata de sesiones |
| Conservación de pistas probatorias | Registros guardados hasta la supresión de la cuenta o según la [Política de Uso Aceptable](/es/mail/acceptable-use/) |
| Mejora continua de la seguridad | Evolución continua de la comunidad y avisos de seguridad coordinados |

### 3.1 Infraestructura perimetral y puerta de enlace anti-SSRF

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌐 Depuración perimetral y filtrado inteligente anti-SSRF</div>
    <span class="google-pill">Capa 1 · TLS 1.3 / HSTS</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Mitigación DDoS perimetral Anycast</strong>: La red de Cloudflare absorbe y neutraliza ataques volumétricos distribuidos, obligando al uso de TLS 1.3 con HSTS precargado para erradicar ataques de intermediario y degradación de protocolos.</p>
    <p><strong>Filtro estricto anti-SSRF</strong>: Las peticiones salientes de webhooks, proxys de imágenes o rastreo se someten a estricta verificación de direcciones IP. Cualquier intento de sondear redes privadas (RFC 1918) o metadatos de nube interna (ej. 169.254.169.254) es bloqueado en la frontera perimetral.</p>
  </div>
</div>

### 3.2 Autenticación robusta y llaves de paso Passkeys sin contraseña

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔑 Llaves de paso vinculadas al dominio y control de tasa</div>
    <span class="google-pill">Capa 2 · Huellas anómalas</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Integración FIDO2 WebAuthn</strong>: Las llaves de paso modernas se enlazan criptográficamente con el origen del dominio, bloqueando el phishing; se admiten llaves de seguridad por hardware (YubiKey) y sensores biométricos nativos.</p>
    <p><strong>Retroceso exponencial y huellas del entorno</strong>: Múltiples fallos consecutivos de contraseña activan un retardo exponencial y un bloqueo de 12 horas; el acceso se coteja con las 15 huellas de red y dispositivos habituales para notificar accesos sospechosos.</p>
  </div>
</div>

### 3.3 Cifrado de datos en reposo y segregación de claves

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔒 Cifrado de nivel industrial AES-256-GCM</div>
    <span class="google-pill">Capa 3 · Segregación física</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Etiquetas de autenticación individuales (Tag)</strong>: Antes de insertarse en Cloudflare D1, el texto del correo se cifra con claves derivadas generando textos cifrados con etiqueta de autenticación (AES-256-GCM), protegiendo contra filtraciones fuera de línea o secuestros de bases de datos.</p>
    <p><strong>Inyección segura en tiempo de ejecución</strong>: Las claves maestras se transmiten exclusivamente como variables de entorno cifradas de Cloudflare Workers, sin guardarse en discos ni en el código, garantizando aislamiento estricto entre el medio de almacenamiento y la lógica de descifrado.</p>
  </div>
</div>

### 3.4 Espacio aislado del cliente y auditoría inmutable

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Aislamiento en Shadow DOM y verificación inmutable</div>
    <span class="google-pill">Capa 4 · Lista blanca DOMPurify</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Aislamiento de contenido HTML en dos fases</strong>: Los correos HTML entrantes se depuran con listas blancas mediante DOMPurify, eliminando etiquetas peligrosas como <code>&lt;script&gt;</code>, <code>&lt;iframe&gt;</code> o controladores en línea, y se aíslan dentro de un Shadow DOM para evitar filtraciones de estilos o secuestros de sesión.</p>
    <p><strong>Manifiesto público de verificación</strong>: Las especificaciones de documentación se auditan con commits de Git y hashes SHA-256 públicos, asegurando total inmutabilidad y transparencia verificable en todo el despliegue.</p>
  </div>
</div>

:::caution[Alcance y limitaciones técnicas del cifrado]
Los modos «Todos / Privacidad / Cifrado» hacen referencia al cifrado estático en el servidor (Server-side Encryption at Rest). Las claves se derivan de las variables de entorno de la instancia y del contexto autenticado del usuario. Esta arquitectura mitiga riesgos derivados de filtraciones de copias de seguridad o accesos indebidos a discos físicos, pero no constituye un cifrado de extremo a extremo (E2EE); el operador de la instancia tiene la capacidad técnica de inspeccionar los paquetes descifrados en memoria. Para escenarios de confidencialidad crítica o entornos no confiables, los usuarios deben emplear herramientas de cifrado asimétrico local como GPG / PGP antes del envío.
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. Fusión de doble naturaleza y fronteras de gobernanza de código abierto

EpoCanvas Mail posee una «doble naturaleza»: opera como un servicio público gratuito alojado en la nube y, al mismo tiempo, como un proyecto de software de código abierto con licencia MIT. Delimitar con nitidez ambas facetas es indispensable para la comunidad:

![Matriz de gobernanza de doble naturaleza y cumplimiento global de EpoCanvas Mail: Límites entre servicio alojado y proyecto de código abierto, con adecuación al RGPD, CCPA y normativas APAC](/images/mail/dual-nature-compliance-matrix.svg)

*Figura 3: Fronteras de gobernanza y matriz de cumplimiento internacional. El proyecto de código abierto provee el código fuente; cada operador independiente actúa como responsable del tratamiento con responsabilidad legal exclusiva.*

### 4.1 Compromisos y limitaciones de responsabilidad del servicio alojado

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">☁️ Compromisos operativos del nodo oficial en la nube</div>
    <span class="google-pill">mail.epocanvas.com · SLA no comercial</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Disponibilidad del servicio público</strong>: La plataforma oficial <code>mail.epocanvas.com</code> está gestionada por el equipo central como operador independiente. Nos comprometemos a garantizar una alta disponibilidad de los nodos, cumplimiento estricto de cero telemetría y auditoría de integridad.</p>
    <p><strong>Exención de responsabilidad y copias de seguridad</strong>: Como servicio público comunitario sin fines comerciales, no ofrece garantías empresariales de SLA ni se responsabiliza de cortes en la infraestructura de red de Cloudflare o extravío de credenciales por descuido del usuario. El usuario es el custodio final de sus datos y debe realizar copias periódicas.</p>
  </div>
</div>

### 4.2 Licencia de código abierto, bifurcaciones y normas de distribución

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📜 Licencia MIT y líneas rojas para el desarrollo secundario</div>
    <span class="google-pill">Licencia MIT · Aislamiento de marca · Declaración propia</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Libertad de código y auditoría comunitaria</strong>: El código fuente se distribuye bajo la licencia permisiva MIT. Cualquier persona tiene derecho legal a revisar, auditar, crear bifurcaciones secundarias o desplegar nodos comerciales privados.</p>
    <p><strong>Líneas rojas irrenunciables de distribución</strong>:</p>
    <ul>
      <li><strong>Aislamiento de marca comercial</strong>: Queda prohibido usar «EpoCanvas Mail Oficial», «Nodo Oficial» o términos similares que confundan al público en dominios, cabeceras o publicidad sin autorización escrita;</li>
      <li><strong>Preservación de derechos de autor y licencia</strong>: Toda redistribución de código o versiones derivadas debe conservar íntegros los avisos de autoría originales y el texto de la licencia MIT;</li>
      <li><strong>Declaración de servicio independiente</strong>: Quienes ofrezcan servicios al público deben publicar sus propios términos de privacidad e identidad legal, sin remitir a la web oficial como aval legal.</li>
    </ul>
  </div>
</div>

### 4.3 Obligaciones fiduciarias del operador de nodos autogestionados

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚖️ Condición de responsable del tratamiento exclusivo en nodos autogestionados</div>
    <span class="google-pill">Responsable único del tratamiento · Sin responsabilidad solidaria</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Responsabilidad única sobre los datos</strong>: Cuando un tercero despliega un nodo en su propia infraestructura o cuenta de Cloudflare, <strong>dicho operador asume la condición de Responsable del Tratamiento (Data Controller) exclusivo e indivisible</strong>. Los desarrolladores upstream no tienen acceso a los datos ni responsabilidad solidaria.</p>
    <p><strong>Cumplimiento normativo territorial</strong>: Los operadores autogestionados deben configurar claves seguras, redactar sus propias políticas de privacidad conformes a su marco legal, tramitar solicitudes de borrado o exportación y atender requerimientos judiciales locales.</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. Cumplimiento normativo global y flujos transfronterizos de datos

EpoCanvas Mail presta servicio a escala global. Para que los usuarios conozcan con certeza sus derechos y los riesgos de soberanía de datos según su región geográfica, aplicamos un marco de cumplimiento estandarizado:

### 5.1 Derechos en el Espacio Económico Europeo (RGPD) y salvaguardas transfronterizas

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇪🇺 Derechos estatutarios bajo el RGPD y cláusulas contractuales tipo</div>
    <span class="google-pill">RGPD Art. 15-22 · Art. 6 · CCT (SCCs)</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Derechos del interesado (Artículos 15–22)</strong>: Los usuarios de la Unión Europea y del EEE disponen de derechos de acceso, rectificación, exportación, limitación del tratamiento y supresión total e irrevocable de su cuenta.</p>
    <p><strong>Base legal y transferencias internacionales</strong>: El tratamiento se fundamenta en la ejecución del contrato (Art. 6(1)(b)) o en el consentimiento explícito (Art. 6(1)(a)); el tránsito internacional a través de la infraestructura Anycast de Cloudflare está protegido por las Cláusulas Contractuales Tipo (CCT/SCCs) y los anexos de tratamiento de datos conformes al RGPD.</p>
  </div>
</div>

### 5.2 Normativa de Estados Unidos (CCPA / CPRA) y compromiso de no venta

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇺🇸 Declaración de privacidad para California (CCPA / CPRA)</div>
    <span class="google-pill">No venta ni cesión · Trato no discriminatorio</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Compromiso formal de no venta de datos</strong>: Declaramos rotundamente que no hemos vendido, alquilado ni compartido, ni venderemos jamás, información personal ni contenidos de correos electrónicos a intermediarios de datos, redes publicitarias o entidades comerciales (Do Not Sell or Share My Personal Information).</p>
    <p><strong>Derecho de información y trato equitativo</strong>: Los residentes de California tienen derecho a conocer las categorías de datos recogidas y solicitar su supresión; en ningún caso aplicaremos discriminaciones en rendimiento, almacenamiento o ancho de banda por ejercer estos derechos.</p>
  </div>
</div>

### 5.3 Marco jurídico de Asia-Pacífico y corresponsabilidad del usuario

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌏 Adecuación jurídica en Asia-Pacífico y seguridad en el terminal</div>
    <span class="google-pill">PDPA de Taiwán · Tránsito SMTP · Seguridad local</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Jurisdicción y tránsito internacional</strong>: La plataforma oficial está operada por un equipo ubicado en Taiwán, cumpliendo rigurosamente la Ley de Protección de Datos Personales (PDPA). Los usuarios deben entender que los correos que transitan por protocolos SMTP abiertos pueden cruzar puntos de intercambio sujetos a leyes internacionales de telecomunicaciones.</p>
    <p><strong>Protección del terminal y política antiabuso</strong>: El usuario debe velar por la seguridad de sus dispositivos locales (mantener parches al día, evitar software malicioso y habilitar Passkeys/TOTP); el uso del servicio para ciberataques, phishing o spam masivo conllevará la cancelación fulminante bajo la [Política de Uso Aceptable](/es/mail/acceptable-use/).</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. Respuesta a incidentes de seguridad y cooperación con autoridades reguladoras

Para reaccionar con la máxima celeridad ante cualquier brecha de seguridad y actuar con plena transparencia, EpoCanvas Mail establece un procedimiento normalizado de actuación ante incidentes:

### 6.1 Protocolo de contención y notificación de brechas en 72 horas

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🚨 Procedimiento operativo normalizado de respuesta ante emergencias</div>
    <span class="google-pill">Aviso en 72h · Contención rápida · Parche comunitario</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Protocolo de emergencia en cuatro etapas</strong>:</p>
    <ul>
      <li><strong>Aislamiento y mitigación inmediata</strong>: Bloqueo de direcciones IP maliciosas en el perímetro, anulación inmediata de sesiones JWT afectadas y rotación de claves maestras en cuestión de minutos;</li>
      <li><strong>Auditoría digital y evaluación de impacto</strong>: Análisis forense de registros perimetrales para determinar las cuentas comprometidas y el nivel de gravedad;</li>
      <li><strong>Notificación reglamentaria en 72 horas</strong>: En caso de incidente cualificado, se notificará a los afectados y a las autoridades competentes en un plazo máximo de 72 horas;</li>
      <li><strong>Subsanación en el código base y aviso de seguridad</strong>: Corrección inmediata de la vulnerabilidad en el repositorio de código abierto y publicación de un aviso de seguridad coordinado.</li>
    </ul>
  </div>
</div>

### 6.2 Canales oficiales de comunicación y cooperación legal

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📮 Canales dedicados para reporte de vulnerabilidades e inspección</div>
    <span class="google-pill">Canal oficial · Reporte de fallos</span>
  </div>
  <div class="google-card-desc">
    <p><strong>Atención a inspecciones y deslinde de instancias</strong>: El servicio oficial <code>mail.epocanvas.com</code> colabora con inspecciones legítimas de autoridades competentes. Los operadores de nodos independientes responderán ante sus propios reguladores. Los investigadores que detecten vulnerabilidades deben comunicarse a través de los canales oficiales:</p>
    <ul>
      <li><strong>Centro de Respuesta ante Incidentes de Seguridad</strong>: <code>announcement@epocanvas.com</code></li>
      <li><strong>Oficina de Privacidad y Cumplimiento Normativo</strong>: <code>privacy@epocanvas.com</code></li>
    </ul>
  </div>
</div>
