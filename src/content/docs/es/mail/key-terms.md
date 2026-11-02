---
title: Glosario
description: Definiciones y límites de roles jurídicos, fuentes, cifrado, control de acceso, conservación y supresión de datos.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

Esta página explica los términos de los documentos legales de EpoCanvas Mail, sin crear bases de tratamiento o garantías separadas. Los roles dependen de la actividad real y la ley; el alcance técnico sigue la implementación desplegada y [Tratamiento de datos y seguridad](/es/mail/data-security/).

La versión en chino tradicional (Taiwán) es la oficial; los demás idiomas son traducciones de referencia. Esta disposición no limita la información clara exigida por la ley aplicable, la interpretación favorable al consumidor ni los derechos irrenunciables. La fecha de actualización indica una revisión, no un consentimiento renovado.

![Mapa de términos jurídicos y técnicos](/images/mail/es/key-terms-glossary.svg)

*Figura: las definiciones jurídicas describen derechos y roles, las técnicas mecanismos y límites; ninguna sustituye la valoración de los hechos.*

## 1. Términos jurídicos

| Término | Definición |
| --- | --- |
| Datos personales | Información sobre una persona física identificada o identificable, incluidas cuentas, registros de red e información en mensajes, adjuntos o metadatos; no se limita a campos de registro |
| Anonimización / seudonimización | La anonimización debe impedir identificar a una persona mediante medios que razonablemente puedan utilizarse; la seudonimización que permite restablecer vínculos con información adicional, los hashes y la ocultación de datos pueden seguir constituyendo datos personales. Los correos sintéticos no anonimizan automáticamente las cuentas reales ni los registros de acceso |
| Datos personales de alta sensibilidad | Datos de salud, genéticos, biométricos dirigidos a identificar de manera unívoca a una persona, relativos a la vida sexual y otros datos sujetos a protección legal especial; los datos relativos a condenas e infracciones penales están sujetos a reglas independientes, y las categorías y requisitos varían entre jurisdicciones |
| Recogida / tratamiento / utilización | Obtener, registrar, almacenar, consultar, transmitir, usar o suprimir datos; la ley taiwanesa distingue categorías mientras el tratamiento del RGPD es más amplio, sin equivalencia mecánica |
| Responsable del tratamiento | Quien determina, solo o conjuntamente, los fines y medios de un tratamiento; según hechos, sin exclusividad automática por autoalojamiento ni considerar responsable a cada usuario particular |
| Encargado del tratamiento | Quien trata por cuenta de un responsable siguiendo instrucciones lícitas; el mismo proveedor puede ser responsable independiente de otras actividades cuyos fines determina |
| Interesado | Persona física a la que se refieren los datos, incluidos usuarios, remitentes, destinatarios y personas mencionadas en mensajes, tengan o no cuenta |
| Transferencia internacional | Actividad que legalmente constituye comunicación transfronteriza o acceso por un destinatario extranjero; los mecanismos se valoran según las rutas reales, sin cumplimiento automático por certificación del proveedor |
| Deber de información | Información legal sobre identidad de quien trata, fines, bases, fuentes, destinatarios, conservación y derechos; las fuentes indirectas incluyen remitentes, proveedores de identidad, denunciantes e integraciones, con plazos y excepciones según ley |
| Fin específico | Finalidad definida antes del tratamiento, que debe seguir siendo lícito, necesario y compatible; aprender o probar no permite usar arbitrariamente correo real |
| Oposición al marketing | Derecho a rechazar marketing directo según la ley; cesar el uso correspondiente ante el rechazo y facilitar un medio accesible de oposición |
| Autoridad competente | Autoridad con competencia según el tratamiento y la legislación vigente, no solo en el lugar del operador; las autoridades de la Unión figuran en la [lista del CEPD](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en) |
| Imagen íntima no consentida | Imagen íntima creada o distribuida sin consentimiento, incluida la sintética perjudicial; restricciones, conservación necesaria y recursos según la [Política de Uso Aceptable](/es/mail/acceptable-use/) |
| Explotación sexual de menores | Abuso, explotación o captación sexual de menores, o producción, posesión o difusión de material ilícito relacionado; protección, comunicación y pruebas según la ley aplicable |
| Ley aplicable al contrato | Ley elegida válidamente o determinada legalmente; permanecen los derechos imperativos de consumo, datos y tutela judicial, según la sección 11 de los [Términos](/es/mail/terms-of-service/) |
| Contrato de adhesión | Condiciones redactadas previamente para múltiples usuarios; las cláusulas abusivas o exclusiones de derechos irrenunciables no se validan por hacer clic en aceptar |
| Acuerdo de encargo (DPA) | Acuerdo necesario sobre tratamiento real por cuenta ajena, instrucciones, seguridad, asistencia y terminación; el uso organizativo requiere confirmación y acuerdo separados, sin alterar roles reales por su título |
| Delegado de protección de datos (DPO) | Función independiente que debe designarse cuando concurran requisitos legales; un correo general de privacidad no acredita su nombramiento |
| Representante en la Unión | Representante situado en la Unión designado cuando se exige para ciertos tratamientos fuera de ella sujetos al RGPD; distinto del DPO, no presumido por ofrecer interfaces en idiomas europeos |

## 2. Términos técnicos

| Término | Definición |
| --- | --- |
| Instancia (sitio) | Despliegue de EpoCanvas Mail gestionado por un operador concreto, como `mail.epocanvas.com`; los flujos dependen de infraestructura y funciones configuradas |
| Operador | Persona física u organización que decide y gestiona realmente el servicio; el autor que también lo opera asume las obligaciones correspondientes |
| PBKDF2 | Deriva un valor de verificación de contraseña y sal para aumentar el coste de adivinarla; no garantiza que una contraseña débil sea indescifrable, y los parámetros reales se describen en seguridad |
| TOTP | Códigos temporales de un solo uso basados en secreto compartido y tiempo; el servidor debe proteger su secreto, no guarda solo una clave pública |
| Passkey | Credencial WebAuthn; el servidor conserva clave pública, identificador y metadatos necesarios de verificación. La clave privada la gestiona el autenticador o servicio de sincronización elegido y no se envía al servidor de verificación del servicio |
| JWT (token de sesión) | Token firmado para sesiones; firmar no equivale a cifrar, y validez, revocación y límites dependen de la implementación desplegada |
| localStorage | Almacenamiento del navegador persistente entre sesiones, que puede contener estado de acceso y preferencias; no demuestra que todas las páginas o componentes de terceros carezcan de cookies |
| Cifrado en reposo | Cifrado de datos almacenados; asunto y cuerpo dependen del modo, sin proteger automáticamente adjuntos y metadatos con el mismo cifrado de aplicación. Quien controla servidor y claves puede seguir descifrando |
| Cifrado de extremo a extremo (E2EE) | Diseño en que solo los extremos de comunicación pueden descifrar; el servicio no ofrece esa garantía y usar OpenPGP por cuenta propia no oculta necesariamente el sobre ni otros metadatos |
| Enrutamiento ofuscado con HMAC | Vincular identificadores de recursos con información del usuario para reducir enumeración y acceso indebido; siguen siendo necesarios controles de autorización y no garantiza ausencia de fallos |
| RBAC | Limitar operaciones y acceso según rol; eficacia dependiente de configuración, comprobaciones y mantenimiento, sin garantía absoluta de seguridad |
| D1 / KV / R2 | Servicios Cloudflare de bases de datos, clave-valor y objetos; ubicación, copias y conservación dependen de configuración y acuerdos del proveedor |
| Telemetría | Envío automático de datos de uso o diagnóstico; no enviar análisis al proyecto original no elimina el tráfico a terceros de fuentes, verificación, entrega o funciones opcionales |
| Eliminación lógica / física | Marcar o restringir el uso, o retirar datos de un almacenamiento concreto; no implica borrar simultáneamente copias de seguridad, copias externas y pruebas legales, ni asegura recuperación o irrecuperabilidad |
| BYOS | Uso de almacenamiento S3 compatible configurado; puntos de acceso, credenciales y archivos pueden tratarse en la instancia para permitir acceso, sin permanecer solo en el dispositivo del usuario |
| Workers AI | Inferencia de Cloudflare; procesos automáticos activados y funciones iniciadas por el usuario pueden enviar contenido de mensajes, con alcance y bases en la [Política de Privacidad](/es/mail/privacy-policy/) |
| Turnstile | Verificación humana de Cloudflare; solicitudes y datos técnicos necesarios implican tratamiento por terceros, descrito en la [Lista de subencargados](/es/mail/sub-processors/) |
| Protección SSRF | Comprobaciones que limitan inducir al servidor a contactar destinos inadecuados; cobertura y eficacia dependen de rutas y despliegue, sin eliminar todos los riesgos externos |

## 3. Otros

Los términos no definidos siguen la [Política de Privacidad](/es/mail/privacy-policy/), los [Términos del Servicio](/es/mail/terms-of-service/) y la ley. Para conceptos del RGPD, consulte el [texto oficial](https://eur-lex.europa.eu/eli/reg/2016/679/oj); esta página no afirma certificación. Consultas a `privacy@epocanvas.com`.
