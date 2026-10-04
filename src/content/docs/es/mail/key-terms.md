---
title: Glosario
description: Definiciones de los términos técnicos y jurídicos empleados en los documentos legales de EpoCanvas Mail — definiciones generales del derecho de protección de datos, interpretadas conforme a la arquitectura del Servicio.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.12**

Esta página define los términos empleados en los documentos legales de este sitio. Los términos jurídicos siguen las definiciones generales del derecho de protección de datos; los términos técnicos se interpretan conforme a la implementación real del código abierto del Servicio.

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional. Los documentos jurídicos y técnicos de este sitio siguen la implementación de código abierto del servicio y buscan establecer normas de comunicación comunitarias transparentes, rigurosas y no comerciales.

![Mapa del glosario: términos jurídicos (responsable del tratamiento, encargado, persona interesada, finalidad determinada, etc.) y términos técnicos (instancia, D1/KV/R2, cifrado en reposo, cero telemetría, etc.): dos familias de definiciones usadas de forma coherente en todos los documentos, interpretadas según el uso general de protección de datos y la implementación real del código abierto](/images/mail/es/key-terms-glossary.svg)

*Figura: la relación entre las dos familias de definiciones de esta página. Los términos jurídicos siguen el uso general de protección de datos; los técnicos se interpretan según la implementación real del código abierto; los no enumerados se leen en el contexto de la Política de Privacidad y los Términos del Servicio.*
## 1. Términos jurídicos

| Término | Definición |
| --- | --- |
| Datos personales | El nombre, la fecha de nacimiento, los datos de contacto, las actividades sociales de una persona física y demás datos mediante los cuales dicha persona puede identificarse directa o indirectamente. Para el Servicio, se componen principalmente de las direcciones de correo electrónico, las credenciales de cuenta y los registros de actividad en la red |
| Datos personales de alta sensibilidad | Los datos personales relativos a antecedentes médicos, tratamiento médico, información genética, vida sexual, reconocimientos médicos y antecedentes penales, que constituyen categorías de alta sensibilidad cuyo tratamiento está sujeto a restricciones estrictas en la mayoría de las jurisdicciones |
| Recogida / tratamiento / utilización | La «recogida» significa adquirir datos personales por cualquier medio; el «tratamiento» significa el registro, la introducción, el almacenamiento, la edición, la corrección, la replicación, la recuperación, la supresión, la salida, la vinculación o la transmisión interna de datos para establecer o utilizar archivos de datos personales; la «utilización» significa emplear los datos personales recogidos para fines distintos del tratamiento |
| Responsable del tratamiento | La entidad que decide las finalidades y los métodos de la recogida, del tratamiento y de la utilización de los datos personales; incluye al Operador de una instancia alojada y al responsable del despliegue de una instancia autoalojada |
| Encargado del tratamiento | Una entidad que trata datos personales por cuenta del responsable conforme a las instrucciones de este (como Cloudflare y Resend) |
| Interesado | La persona física identificada por los datos personales; el «usted» al que se refieren los documentos de este sitio |
| Transferencia internacional | El tratamiento o la utilización de datos personales a través de fronteras nacionales; sigue los requisitos de la ley aplicable y mecanismos de garantía como las cláusulas contractuales tipo |
| Deber de información | Al recopilar datos personales de un interesado, la obligación de notificar expresamente elementos como la identidad del recopilador, la finalidad de la recopilación, las categorías de datos, el período, la región, los destinatarios y los modos de utilización, los derechos que el interesado puede ejercer y las consecuencias de no facilitar los datos; cuando los datos no se obtengan del propio interesado, se informa de la fuente antes del tratamiento o la utilización |
| Fin específico | La finalidad específica que debe existir para recopilar o tratar datos personales; la utilización debe ceñirse al ámbito necesario de dicha finalidad |
| Derecho de oposición al marketing | Cuando el interesado manifieste su negativa a recibir comunicaciones comerciales, se cesa de inmediato la utilización de sus datos personales para marketing; en el primer envío comercial se facilitan los medios para manifestar dicha negativa |
| Autoridad competente | La autoridad que supervisa la protección de los datos personales conforme a la ley aplicable; para la instancia alojada, ubicada en Taiwán, se trata de la Comisión de Protección de Datos Personales |
| Imagen íntima no consentida | Una imagen íntima de otra persona grabada, reproducida o difundida sin consentimiento, y una imagen íntima fraguada mediante síntesis informática u otros medios tecnológicos; grabar, reproducir o difundir dichas imágenes sin consentimiento constituye delito en la mayoría de las jurisdicciones, y la plataforma, al recibir una notificación, debe restringir previamente el acceso o retirarlas |
| Explotación sexual de niños y adolescentes | La conducta de explotación sexual de niños o adolescentes, incluido fotografiar, fabricar, reproducir, poseer, difundir, transmitir, entregar, exhibir públicamente, vender o cobrar por la visualización de imágenes sexuales de niños o adolescentes |
| Ley aplicable | La ley aplicable a un contrato, determinada por la ubicación del operador; la sección 11 de los [Términos del Servicio](/es/mail/terms-of-service/) establece la ley aplicable de cada instancia |
| Contrato de adhesión | Un contrato celebrado mediante cláusulas generales dirigidas a un gran número de personas indeterminadas; las partes manifiestamente injustas no obligan conforme a la ley aplicable |

## 2. Términos técnicos

| Término | Definición |
| --- | --- |
| Instancia (sitio) | Un despliegue de EpoCanvas Mail que se ejecuta dentro de la cuenta de Cloudflare de una determinada persona u organización, como `mail.epocanvas.com` |
| Operador | La persona o el equipo que despliega y gestiona la instancia; el «nosotros» al que se refieren los documentos |
| PBKDF2 | Un algoritmo de hashing de contraseñas. El Servicio realiza 100,000 iteraciones con HMAC-SHA256 y añade una sal aleatoria independiente por usuario, de modo que la contraseña original no puede deducirse a partir del hash |
| TOTP | Contraseñas de un solo uso basadas en el tiempo conforme a la RFC 6238; el secreto se almacena cifrado con AES-256-GCM en la base de datos |
| Llave de acceso (passkey) | Una credencial de clave pública conforme a los estándares FIDO2/WebAuthn; el Servicio almacena únicamente la clave pública, mientras que la clave privada permanece en el dispositivo del interesado |
| JWT (token de sesión) | Una credencial firmada digitalmente emitida tras el inicio de sesión, válida durante 30 días; como máximo 10 sesiones simultáneas por cuenta; revocada en el servidor al cerrar sesión |
| localStorage | Un mecanismo de almacenamiento web proporcionado por los navegadores; los datos permanecen en el dispositivo del interesado y persisten entre sesiones. Los tokens de sesión del Servicio se almacenan aquí; no se utilizan cookies |
| Cifrado en reposo | El cifrado aplicado cuando los datos se escriben en los soportes de almacenamiento. Las claves del Servicio se derivan de las variables de entorno del servidor de la instancia, por lo que es un cifrado del lado del servidor y no de extremo a extremo |
| Cifrado de extremo a extremo (E2EE) | Una forma de cifrado en la que únicamente el remitente y el destinatario pueden descifrar. El Servicio no lo proporciona; quien lo necesite debe cifrar previamente por sí mismo con herramientas como GPG |
| Enrutamiento ofuscado con HMAC | Un mecanismo que vincula los identificadores de correo con la identidad del usuario mediante un código de autenticación de mensajes basado en hash, impidiendo el acceso no autorizado (IDOR) y la enumeración de recursos |
| RBAC | Control de acceso basado en roles. El Servicio utiliza un modelo de permisos multinivel de fallo seguro (fail-closed), con supresión en la puerta de enlace de los parámetros no incluidos en la lista de permitidos |
| D1 / KV / R2 | La base de datos SQLite perimetral de Cloudflare, el almacenamiento de clave-valor replicado globalmente y el almacenamiento de objetos compatible con S3, que soportan respectivamente los datos estructurados, la caché de sesiones y los blobs de adjuntos |
| Telemetría | El envío automático de datos de uso a los desarrolladores por parte del software. El código fuente del Servicio contiene cero telemetría y no reenvía datos de la instancia al proyecto ascendente |
| Eliminación lógica / eliminación física | La eliminación lógica significa que el elemento se marca como eliminado y puede ser restaurado por un administrador; la eliminación física significa la supresión del almacenamiento junto con los adjuntos y los índices, sin posibilidad de recuperación |
| BYOS (almacenamiento propio) | mecanismo que coloca los adjuntos en un almacenamiento de objetos compatible con S3 propiedad del Operador o de la persona interesada (Backblaze B2, Wasabi, etc.); las credenciales las guarda quien lo configura |
| Workers AI | servicio de inferencia en el borde de Cloudflare; se usa para la extracción de códigos de verificación y otros procesos de IA: condiciones de activación y alcance de datos en la Sección 6 de la [Política de Privacidad](/es/mail/privacy-policy/) |
| Turnstile | mecanismo de verificación humana de Cloudflare; evalúa la fiabilidad del navegador en el registro y al crear buzones, sin cookies publicitarias ni seguimiento entre sitios |
| Protección SSRF | bloqueo de la falsificación de solicitudes del lado del servidor; las solicitudes a puntos de conexión externos se validan siempre contra direcciones públicas, y las direcciones de bucle, redes privadas y metadatos de la nube se rechazan |

## 3. Otros

Los términos no definidos en esta página se interpretan conforme al contexto de la [Política de Privacidad](/es/mail/privacy-policy/) y de los [Términos del Servicio](/es/mail/terms-of-service/) y al uso jurídico y técnico general. Si alguna definición resultara poco clara, consulte a través de los canales indicados en la sección 14 de la [Política de Privacidad](/es/mail/privacy-policy/).
