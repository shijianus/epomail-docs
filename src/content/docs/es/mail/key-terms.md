---
title: Glosario
description: Definiciones de los términos técnicos y jurídicos empleados en los documentos legales de EpoCanvas Mail — interpretados conforme a la PDPA y a la arquitectura del Servicio.
---

# Glosario

**Fecha de entrada en vigor: 29 de septiembre de 2026 | Versión: 4.1**

Esta página define los términos empleados en los documentos legales de este sitio. Los términos jurídicos siguen las definiciones de las disposiciones vigentes de la Ley de Protección de Datos Personales de Taiwán (個人資料保護法, «PDPA») y de las leyes conexas; los términos técnicos se interpretan conforme a la implementación real del código abierto del Servicio.

## 1. Términos jurídicos

| Término | Definición |
| --- | --- |
| Datos personales | Conforme al artículo 2 de la PDPA, el nombre, la fecha de nacimiento, los datos de contacto, las actividades sociales de una persona física y demás datos mediante los cuales dicha persona puede identificarse directa o indirectamente. Para el Servicio, se componen principalmente de las direcciones de correo electrónico, las credenciales de cuenta y los registros de actividad en la red |
| Datos personales sensibles | Los datos personales relativos a antecedentes médicos, tratamiento médico, información genética, vida sexual, reconocimientos médicos y antecedentes penales enumerados en el artículo 6 de la misma Ley, que no pueden recogerse, tratarse ni utilizarse salvo en los supuestos previstos por la ley |
| Recogida / tratamiento / utilización | Artículo 2 de la misma Ley: la «recogida» significa adquirir datos personales por cualquier medio; el «tratamiento» significa el registro, la introducción, el almacenamiento, la edición, la corrección, la replicación, la recuperación, la supresión, la salida, la vinculación o la transmisión interna de datos para establecer o utilizar archivos de datos personales; la «utilización» significa emplear los datos personales recogidos para fines distintos del tratamiento |
| Responsable del tratamiento | La entidad que decide las finalidades y los métodos de la recogida, del tratamiento y de la utilización de los datos personales; incluye al Operador de una instancia alojada y al responsable del despliegue de una instancia autoalojada |
| Encargado del tratamiento | Una entidad que trata datos personales por cuenta del responsable conforme a las instrucciones de este (como Cloudflare y Resend) |
| Interesado | La persona física identificada por los datos personales; el «usted» al que se refieren los documentos de este sitio |
| Transferencia internacional | Conforme al artículo 2 de la misma Ley, el tratamiento o la utilización de datos personales a través de fronteras nacionales; se rige por el artículo 21 de la PDPA y por las órdenes de restricción de la autoridad competente |
| Deber de información | Conforme al artículo 8 de la misma Ley, al recopilar datos personales de un interesado deben notificarse expresamente seis extremos: identidad del responsable, finalidad de la recopilación, categorías de datos, período, ámbito, destinatarios y modos de utilización, derechos que el interesado puede ejercer, y consecuencias de no facilitar los datos; cuando los datos no se obtengan del propio interesado, el artículo 9 exige informar de la fuente antes del tratamiento o la utilización |
| Fin específico | Conforme al artículo 19 de la misma Ley, todo organismo no gubernamental debe tener un fin específico para recopilar o tratar datos personales; la utilización debe ceñirse al ámbito necesario de dicho fin (artículo 20) |
| Derecho de oposición al marketing | Conforme al párrafo 2 del artículo 20 de la misma Ley, cuando el interesado manifieste su negativa a recibir comunicaciones comerciales deberá cesar de inmediato la utilización de sus datos para marketing; en el primer envío comercial deberán facilitarse los medios para rechazarlo y asumirse los costes necesarios (párrafo 3) |
| Autoridad competente | Conforme al artículo 1-1 de la PDPA, la autoridad competente de la Ley es la Comisión de Protección de Datos Personales (PDPC) |
| Imagen íntima no consentida | Una imagen íntima de otra persona grabada, reproducida o difundida sin consentimiento, y una imagen íntima fraguada mediante síntesis informática u otros medios tecnológicos; grabar y difundir dichas imágenes constituye delitos conforme a los artículos 319-1 a 319-4 del Código Penal (刑法), y la obligación de retirada de las plataformas sigue el artículo 13 de la Ley de Prevención de los Delitos de Agresión Sexual (性侵害犯罪防治法) |
| Explotación sexual de niños y adolescentes | La conducta definida en el artículo 2 de la Ley de Prevención de la Explotación Sexual de Niños y Adolescentes (兒童及少年性剝削防制條例), incluido fotografiar, fabricar, reproducir, poseer, difundir, transmitir, entregar, exhibir públicamente, vender o cobrar por la visualización de imágenes sexuales de niños o adolescentes |
| Ley aplicable | La ley pactada como aplicable a un contrato; los [Términos del Servicio](/es/mail/terms-of-service/) designan el derecho de la República de China |
| Contrato de adhesión | Un contrato celebrado mediante cláusulas generales dirigidas a un gran número de personas indeterminadas; regulado por el artículo 247-1 del Código Civil (民法) (nulidad de las partes manifiestamente abusivas) y por el artículo 11-1 (plazo de revisión) y el artículo 17 (disposiciones imperativas y prohibitivas) de la Ley de Protección del Consumidor (消費者保護法) |
| Persecución a instancia de parte | Conforme al artículo 363 del Código Penal, los delitos del capítulo relativo al uso de ordenadores (artículos 358 a 360) solo son perseguibles previa denuncia de la parte perjudicada; ello no afecta a las acciones del Operador por las vías civil o administrativa ni conforme a las políticas de este sitio |

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

## 3. Otros

Los términos no definidos en esta página se interpretan conforme al contexto de la [Política de Privacidad](/es/mail/privacy-policy/) y de los [Términos del Servicio](/es/mail/terms-of-service/) y al uso jurídico y técnico general. Si alguna definición resultara poco clara, consulte a través de los canales indicados en la sección 14 de la [Política de Privacidad](/es/mail/privacy-policy/).
