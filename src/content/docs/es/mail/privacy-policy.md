---
title: Política de Privacidad
description: Política de Privacidad de EpoCanvas Mail—los estándares y compromisos en materia de recopilación y utilización de datos, naturaleza del tratamiento, derechos de los interesados, transferencias internacionales y medidas de mantenimiento de la seguridad.
---

# Política de Privacidad

**Fecha de entrada en vigor: 2 de octubre de 2026 | Versión: 5.7**

Esta Política explica cómo el servicio EpoCanvas Mail (el «Servicio») recopila, trata, utiliza y transmite sus datos personales, así como los estándares y compromisos que el Operador sigue en materia de protección de datos. Debe leer esta Política antes de registrarse en el Servicio o utilizarlo; si no está de acuerdo con alguna parte de esta Política, no utilice el Servicio.

Los hechos técnicos descritos en esta Política se rigen por la implementación real del código abierto del Servicio. Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional. La ley aplicable a la instancia que usted utiliza se determina por la ubicación de su operador (véase la Sección 12). Los documentos jurídicos y técnicos de este sitio siguen la implementación de código abierto del servicio y buscan establecer normas de comunicación comunitarias transparentes, rigurosas y no comerciales.

![Los cinco pilares de la Política de Privacidad de EpoCanvas Mail: recopilación, utilización, transferencia, seguridad y derechos de los interesados, con contenidos respectivamente en el contrato y el consentimiento, la limitación de la finalidad, las garantías de transferencia, el mantenimiento de la seguridad y los recursos de los derechos, todos ellos sobre la base de la supervisión de la autoridad](/images/mail/privacy-pillars.svg)

*Figura: Los cinco ejes principales de esta Política. La recopilación y la utilización se limitan a la medida necesaria para el fin específico; las transferencias internacionales siguen los requisitos de la ley aplicable y los mecanismos de garantía estándar; el mantenimiento de la seguridad mejora continuamente; los derechos del interesado se ejercen conforme a la Sección 9; y los cinco se apoyan en la supervisión de la autoridad.*

## 1. Ámbito de aplicación

Esta Política se aplica a los datos personales derivados de cualquier uso del Servicio por su parte, incluidos:

1. la visita al sitio web del Servicio (`mail.epocanvas.com` o el dominio de una instancia autoalojada);
2. el uso de la aplicación móvil (epomail);
3. la conexión al Servicio a través de la API abierta.

Esta Política no se aplica a los sitios web y servicios de terceros enlazados o incrustados en el Servicio; esos terceros cuentan con sus propias políticas de privacidad, de las cuales son responsables.

Un operador que autoaloje EpoCanvas Mail se convierte en responsable del tratamiento respecto de sus usuarios desde el momento del despliegue y debe cumplir por sí mismo, hacia sus usuarios, la obligación de notificación conforme a la ley aplicable en su lugar de ubicación; esta Política puede servir como texto base para dicha notificación.

## 2. Responsable del Tratamiento y Encargados del Tratamiento

| La instancia que usted utiliza | Responsable del tratamiento | Descripción |
| --- | --- | --- |
| Instancia alojada `mail.epocanvas.com` | El equipo de operaciones de EpoCanvas | Con respecto a los datos de cuenta, los registros de autenticación y los registros de auditoría de seguridad, el equipo de operaciones es el responsable del tratamiento; en cuanto al contenido del correo que usted envía y recibe, el equipo de operaciones lo trata en la medida necesaria para la prestación del servicio de comunicaciones |
| Instancia autoalojada | La entidad que desplegó dicha instancia |el código abierto no contiene ningún mecanismo de telemetría; salvo los servicios externos configurados por el propio Operador, no devuelve datos de la instancia a los autores ascendentes ni a terceros |

Los encargados del tratamiento tratan los datos siguiendo las instrucciones del responsable; véase [Subencargados del Tratamiento](/es/mail/sub-processors/) para la lista completa.

## 3. Notificación en el momento de la recopilación

El Servicio le notifica expresamente lo siguiente en el momento de recopilar datos personales de usted:

| Elementos de notificación | Lo que el Servicio notifica |
| --- | --- |
| 1. La identidad del recopilador | El Operador (véase la Sección 2; para una instancia autoalojada, su entidad desplegadora) |
| 2. Los fines de la recopilación | Prestación del servicio de comunicación por correo electrónico; gestión de la seguridad de la cuenta y de la información; prevención del abuso y del fraude; entrega de anuncios del sistema; cumplimiento de obligaciones legales (véase la tabla de mapeo de actividades de tratamiento de la Sección 5) |
| 3. Las categorías de datos personales de que se trate | Datos de identificación (dirección de correo electrónico, nombre de usuario); datos de seguridad de la cuenta (hash de contraseña, credenciales de verificación en dos pasos); datos de preferencias de interfaz (idioma, modos claro y oscuro); datos de actividad de red (registros de correo, etiquetas, estrellas, estado de lectura); y cualquier otro dato mediante el cual una persona pueda identificarse directa o indirectamente (IP de inicio de sesión, y el sistema operativo, el navegador y el tipo de dispositivo analizados a partir del User-Agent)—véase la Sección 4 |
| 4. El período, la región, los destinatarios y los medios de utilización | Período: durante la vida de la cuenta, con plazos de conservación fijos para algunos elementos (véase la matriz de tratamiento en [Procesamiento de Datos y Seguridad](/es/mail/data-security/)); Región: el Servicio está construido sobre la red perimetral global de Cloudflare y los datos pueden tratarse en cualquier nodo perimetral del mundo (véase la Sección 7); Destinatarios: el Operador y sus encargados del tratamiento, las aplicaciones de terceros que usted autorice y las autoridades facultadas por la ley (véase la Sección 7); Medios: almacenamiento, transmisión, recuperación, entrega push e inferencia en el perímetro automatizados, sin revisión manual salvo cuando lo exijan la ley o procedimientos judiciales |
| 5. Los derechos ejercitables por el interesado y la forma de ejercerlos | Los derechos de consulta e inspección, de obtención de una copia, de complementación y rectificación, de cese de la recopilación, del tratamiento y de la utilización, y de supresión; véase la Sección 9 para saber cómo ejercerlos |
| 6. Las consecuencias de no proporcionar los datos personales | La dirección de correo electrónico y la contraseña son necesarias para el registro y el inicio de sesión; sin ellas no puede crearse una cuenta. Todos los demás campos (apodo, avatar, biografía y similares) son opcionales, y no proporcionarlos no afecta el uso del Servicio |

Cuando usted inicia sesión con una cuenta de Linux DO, el Servicio obtiene de esa fuente de identidad identificadores como su identificador de usuario, su apodo y su avatar; ello constituye la recopilación de datos personales no facilitados directamente por usted, cuya fuente es la cuenta de Linux DO con la que usted inicia sesión. El período, la región, los destinatarios y los modos de utilización, así como los derechos que puede ejercer y su forma de ejercicio, son los notificados en los apartados 2 a 5 de la tabla anterior. El Servicio no recopila ningún otro dato personal de fuentes distintas de usted.

## 4. Datos personales recopilados

### 4.1 Proporcionados por usted

- **Dirección de correo electrónico y contraseña**: necesarias para el registro. La contraseña se almacena únicamente como un hash PBKDF2-HMAC-SHA256 (100.000 iteraciones, con una sal aleatoria independiente por usuario); a partir del hash no es posible recuperar la contraseña original.
- **Credenciales de verificación en dos pasos (opcional)**: el secreto TOTP se almacena cifrado con AES-256-GCM; los códigos de recuperación de respaldo se almacenan únicamente como hashes SHA-256; las passkeys almacenan solo la clave pública, mientras que la clave privada permanece en su dispositivo.
- **Datos de perfil (opcionales)**: apodo, avatar y biografía; las imágenes de avatar se almacenan por defecto en el almacenamiento de objetos propio de la instancia (KV), y el Operador puede configurar un servicio externo de alojamiento de imágenes mediante una variable de entorno (véase [Encargados del tratamiento](/es/mail/sub-processors/)).

### 4.2 Sus comunicaciones

El correo electrónico que envía y recibe (incluidos metadatos como remitente y destinatario, asunto, cuerpo y marcas de tiempo) y sus adjuntos, junto con las etiquetas, estrellas, estados de lectura y recordatorios de posposición que aplique, se almacenan en la base de datos de la instancia (Cloudflare D1) y en el almacenamiento de objetos (resuelto en orden según la configuración de la instancia: su propio almacenamiento compatible con S3, un almacén compatible con S3 configurado por el Operador, un enlace de Cloudflare R2; en su defecto, Cloudflare KV). La titularidad y la responsabilidad sobre el contenido del correo le corresponden a usted; el Operador no vende el contenido del correo, no lo utiliza con fines publicitarios y no integra ningún sistema de análisis de terceros.

### 4.3 Datos técnicos registrados automáticamente

- **Registros de inicio de sesión y de seguridad**: la dirección IP, el User-Agent del navegador y el sistema operativo, el navegador y el tipo de dispositivo analizados a partir de este, registrados durante el registro de la cuenta y el inicio de sesión, utilizados para la auditoría de seguridad de la información y la identificación de inicios de sesión anómalos.
- **Tokens de sesión**: el JWT emitido tras el inicio de sesión (válido durante 30 días) se almacena en el localStorage de su navegador. El Servicio no utiliza cookies y no existe rastreo entre sitios.
- **Registros de la red perimetral**: Cloudflare trata los metadatos de las solicitudes conforme a sus propias políticas.

### 4.4 Datos que el Servicio no recopila

El Servicio no contiene ningún SDK de rastreo publicitario, ni elaboración de perfiles de comportamiento, ni cookies entre sitios, ni Google Analytics ni ningún sistema de análisis de terceros; tampoco lee los contactos, la fototeca ni la ubicación de su dispositivo, ni los datos de otras aplicaciones.

### 4.5 Datos personales de alta sensibilidad

Los datos personales relativos a antecedentes médicos, tratamientos médicos, información genética, vida sexual, exámenes de salud y antecedentes penales constituyen categorías de alta sensibilidad, cuya recopilación y tratamiento están sujetos a restricciones estrictas en la mayoría de las jurisdicciones. Los campos de cuenta y de sistema del Servicio no recopilan tales datos. No obstante, el contenido que usted transmita por correo electrónico puede contenerlos; el Operador los almacena y transmite pasivamente únicamente en la medida necesaria para la prestación del servicio de comunicaciones, y no analiza ni elabora perfiles del contenido. Usted debe decidir con cautela si transmite datos personales de alta sensibilidad por correo electrónico.

## 5. Naturaleza del tratamiento de la recopilación, el tratamiento y la utilización

La naturaleza de cada una de las actividades de tratamiento del Servicio es la siguiente:

| Actividad de tratamiento | Fin específico | Naturaleza del tratamiento |
| --- | --- | --- |
| Registro de la cuenta, inicio de sesión y administración del buzón | Prestación del servicio de correo electrónico | Tratamiento necesario para la ejecución del contrato, con adopción de medidas de seguridad apropiadas |
| Registros de inicio de sesión, bloqueo por fallos y verificación en dos pasos | Mantenimiento de la seguridad de la información | Tratamiento necesario para la ejecución del contrato, de conformidad con el principio de proporcionalidad |
| Extracción automática de códigos de verificación (opcional, habilitada por el Operador) | Mejora de la comodidad del servicio | Con su consentimiento; puede solicitar su desactivación o migrar a una instancia en la que la función no esté habilitada |
| Traducción de correo y reconocimiento de texto en imágenes (activados por usted) | Asistencia de contenido | Con su consentimiento; nada se transmite salvo que usted lo active |
| Página de perfil público (desactivada por defecto) | Presentación social | Datos que usted ha hecho públicos por sí mismo |
| Anuncios del sistema y correo de bienvenida oficial | Ejecución del contrato y comunicación con los usuarios | Tratamiento necesario para la ejecución del contrato |

Sus datos personales se utilizan únicamente para la finalidad de la recopilación y el ámbito estrechamente relacionado con ella. El Servicio no utiliza sus datos personales para la toma de decisiones automatizada, la elaboración de perfiles de usuarios ni ningún fin comercial ajeno a la prestación del Servicio. Cuando el Operador realice marketing con datos personales, en cuanto usted manifieste su negativa a recibir comunicaciones comerciales, el Operador cesará de inmediato dicha utilización; y en el momento del primer envío comercial le proporcionará los medios para rechazarlo.

## 6. Aviso especial sobre el tratamiento mediante IA

El Servicio implica tres tipos de tratamiento mediante IA; sus condiciones de activación y el alcance de los datos involucrados son los siguientes:

1. **Extracción automática de códigos de verificación** (opcional, habilitada por el Operador): cuando llega un correo nuevo, el sistema envía el asunto y los primeros 6.000 caracteres del cuerpo a Cloudflare Workers AI para su inferencia en nodos perimetrales y extraer los códigos de verificación del correo. Este es el único tratamiento mediante IA no activado manualmente por usted; si no desea este tratamiento, puede pedir al Operador que desactive la función o migrar a una instancia en la que la función no esté habilitada.
2. **Traducción de correo** (activada por usted): tras pulsar «Traducir», el texto del correo se envía por fragmentos al punto de conexión del modelo de gran tamaño configurado por la instancia (protocolo compatible con OpenAI por defecto), con las API públicas de MyMemory y Google Translate como respaldo. Si no activa la traducción, el contenido del correo no se transmite a ningún servicio de IA. Cuando los correos oficiales del sistema (bienvenida, anuncios globales) no han sido modificados por el administrador, su traducción proviene directamente de las plantillas oficiales predefinidas en el idioma correspondiente y se renderiza localmente en el cliente, sin transmitir el contenido del correo a ningún servicio de IA; los modificados siguen el flujo de IA descrito.
3. **Reconocimiento de texto en imágenes** (activado por usted): una imagen que contenga texto solo se envía a los servicios de IA descritos cuando usted la carga; las imágenes puramente decorativas, los logotipos y los iconos se omiten automáticamente.

El Operador no entrena ningún modelo con contenido de correo ni envía a los servicios de IA información de identidad más allá del texto necesario para la traducción o el reconocimiento. Puede retirar en cualquier momento, por los medios indicados en la Sección 9, el consentimiento de los tratamientos descritos anteriormente que se basen en el consentimiento; la retirada no afecta a los tratamientos realizados con anterioridad a la misma.

## 7. Comunicación a terceros y transferencias internacionales

El Servicio comparte datos personales con terceros conforme al principio de mínima necesidad, únicamente en las circunstancias siguientes (véase [Subencargados del Tratamiento](/es/mail/sub-processors/) para la lista completa y las garantías):

1. **Encargo del tratamiento**: Cloudflare (computación, almacenamiento, enrutamiento de correo, verificación de bots, IA perimetral) y Resend o Mailjet (entrega saliente; solo el correo enviado fuera de la plataforma implica el correo completo);
2. **Con su autorización**: notificaciones de Telegram (solo se envían los campos que usted configure), aplicaciones OAuth de terceros (alcance limitado a openid / profile / email, revocable en cualquier momento), inicio de sesión con Linux DO y vinculación de nivel del blog (blog.epocanvas.com; su dirección de correo electrónico se transmite en la consulta);
3. **Activados por usted**: servicios de traducción mediante IA y de reconocimiento de texto en imágenes (véase la Sección 6);
4. **Requisitos legales**: se proporcionan únicamente cuando una autoridad competente así lo requiera mediante procedimientos legales, con notificación a usted en la medida permitida por la ley.

El Servicio está construido sobre la red perimetral global de Cloudflare y sus datos personales pueden tratarse en nodos situados fuera del país donde resida el Operador; el Operador cumple los requisitos de la ley aplicable en materia de transferencias internacionales y las restricciones que la autoridad competente dicte conforme a la ley, y se apoya en las medidas de protección de datos de Cloudflare (certificaciones SOC 2 Type II e ISO/IEC 27001) y en el mecanismo de las Cláusulas Contractuales Estándar (SCC) de la UE para garantizar las transferencias. Los operadores de instancias autoalojadas deberán evaluar por sí mismos y asegurar que sus transferencias internacionales cumplan los requisitos legales de su lugar de ubicación.

## 8. Plazos de conservación y supresión de los datos

| Categoría de datos | Política de conservación |
| --- | --- |
| Correo de la bandeja de entrada | Se conserva hasta que usted lo elimine o hasta que se active la depuración por cuota |
| Correo no deseado | Permanece en cuarentena durante 7 días y luego se traslada a la papelera |
| Correo de la papelera | Supresión física mediante una tarea programada del sistema 7 días después de la recepción (incluidos adjuntos e índices) |
| Correos oficiales del sistema (correos de bienvenida, anuncios globales) | Caducan y se suprimen automáticamente 7 días después de la entrega por defecto; el Operador puede configurar el plazo |
| Uso del buzón superior al 90 % | El sistema suprime físicamente el correo ya marcado como eliminado para liberar espacio |
| Cancelación de la cuenta | Las sesiones quedan invalidadas de inmediato; el correo pasa a un estado de eliminación lógica hasta que un administrador realice la supresión física |
| Supresión física | Los datos de cuenta, los buzones, el correo, los adjuntos, las autorizaciones OAuth y las sesiones se eliminan conjuntamente y no pueden recuperarse |
| Aplicación por infracciones | después de que una cuenta sea suspendida por infracciones, el Operador puede purgar de forma forzada sus correos y adjuntos para liberar espacio (véase la escalera de aplicación de la [Política de Uso Aceptable](/es/mail/acceptable-use/)) |
| Cese de la instancia | El Operador deberá notificarlo con antelación y ofrecer una ventana de exportación de datos; tras el cese, los datos se destruyen junto con los recursos de Cloudflare |

Los datos no pueden recuperarse tras la supresión física. Antes de la eliminación, puede obtener una copia completa en formato JSON (incluidos los datos de perfil y el texto íntegro del correo aún no eliminado) mediante «Configuración → Exportar datos». Para una descripción completa de las medidas técnicas, véase [Procesamiento de Datos y Seguridad](/es/mail/data-security/).

## 9. Derechos de los interesados y cómo ejercerlos

Usted dispone de los siguientes derechos respecto de sus datos personales:

1. consultar o solicitar la inspección;
2. solicitar una copia (implementada por el Servicio mediante la función «Exportar datos»);
3. solicitar la complementación o la rectificación;
4. solicitar el cese de la recopilación, del tratamiento o de la utilización;
5. solicitar la supresión.

Cómo ejercerlos: las funciones de autoservicio de la interfaz (exportación, cancelación de la cuenta, revocación de autorizaciones OAuth y cierre de sesión) surten efecto de inmediato; para las solicitudes que requieran gestión manual, el Operador responde y las procesa dentro de los 30 días siguientes a su recepción. Contacto: `privacy@epocanvas.com`.

Si usted considera que el tratamiento del Servicio ha lesionado sus derechos, puede solicitar reparación al Operador; el Operador responde de explicar y acreditar la licitud de su tratamiento. También puede presentar una reclamación ante la autoridad competente del lugar donde se ubica el Operador o buscar recursos legales (la ley aplicable se expone en la Sección 12).

## 10. Medidas de mantenimiento de la seguridad

El Operador establece y mejora continuamente las medidas de mantenimiento de la seguridad para impedir que los datos personales sean sustraídos, alterados, dañados, perdidos o filtrados, entre ellas: cifrado HTTPS/TLS en tránsito en todo el sitio; hash con sal PBKDF2 de las contraseñas; cifrado AES-256-GCM en reposo de los secretos TOTP; bloqueo por inicios de sesión fallidos (bloqueo de 12 horas tras 5 fallos consecutivos); un límite de 10 sesiones con revocación inmediata; enrutamiento del correo basado en hashes criptográficos (para impedir el acceso no autorizado y la enumeración de recursos); y cabeceras defensivas y una lista de permitidos MIME para la descarga de adjuntos. Para la lista completa, véase [Procesamiento de Datos y Seguridad](/es/mail/data-security/).

:::caution[Alcance y límites del cifrado]
El cifrado de los tres modos de correo del Servicio—«todo», «privado» y «cifrado»—es un cifrado en reposo del lado del servidor: las claves se derivan de las variables de entorno del servidor de la instancia y de la identidad del usuario. Este mecanismo protege contra el riesgo de robo de los archivos de la base de datos o de filtración de instantáneas; no constituye cifrado de extremo a extremo, y un Operador que posea el servidor y las claves tiene técnicamente la capacidad de descifrar. El alcance de acceso del administrador depende del modo: en modo «todo el correo» el administrador puede leer todo el correo; en modo «privado», únicamente el correo no deseado, eliminado y sin propietario; en modo «cifrado», la interfaz de administración no devuelve el correo de los usuarios. Cuando se requiera confidencialidad también frente al Operador, cifre usted mismo el cuerpo del correo con una herramienta de cifrado de extremo a extremo como GPG antes de enviarlo.
:::

## 11. Protección de la infancia y la adolescencia

El Servicio no está dirigido a menores de 14 años y no recopila conscientemente datos personales de niños. Un tutor que considere que un niño ha proporcionado datos personales puede contactar al Operador para solicitar la supresión; la solicitud se procesará de inmediato tras su verificación. Ninguna persona puede utilizar el Servicio para difundir a niños y adolescentes contenidos perjudiciales para su salud física o mental; para las restricciones de uso relacionadas, véase la [Política de Uso Aceptable](/es/mail/acceptable-use/). Los operadores de instancias autoalojadas fijarán por sí mismos el umbral de edad de conformidad con las leyes de su jurisdicción.

## 12. Ley aplicable y supervisión de la autoridad

El proyecto de código abierto no presta ningún servicio ni responde del cumplimiento de ninguna instancia; las obligaciones legales corresponden a la entidad que opera el servicio. La ley aplicable a cada instancia se determina por la ubicación de su operador: la instancia alojada `mail.epocanvas.com` es operada por el equipo de operaciones desde Taiwán; el tratamiento de datos personales de dicha instancia se rige por la ley de Taiwán actualmente en vigor, incluida la Ley de Protección de Datos Personales (PDPA), y el Operador acepta la inspección y la supervisión que la autoridad competente de dicha ley realiza conforme a la ley; esta Política y [Procesamiento de Datos y Seguridad](/es/mail/data-security/) constituyen los documentos base para dicha inspección. La ley aplicable a las instancias autoalojadas es la del lugar donde se ubica su entidad desplegadora, y las obligaciones de notificación, de mantenimiento de la seguridad y de sometimiento a supervisión las cumple por sí misma dicha entidad.

## 13. Cambios en esta Política

Esta Política puede revisarse a medida que cambien el Servicio o la ley. Los cambios sustanciales (como la adición de un tercero encargado del tratamiento o la modificación de las políticas de conservación o de los modos de cifrado) se anunciarán con antelación mediante un aviso en el sitio o un correo del sistema, y se actualizarán la fecha de entrada en vigor y el número de versión en la parte superior de esta página. Si usted continúa utilizando el Servicio después de que un cambio entre en vigor, se considerará que ha aceptado la Política revisada; si no está de acuerdo, puede dejar de utilizar el Servicio y exportar o eliminar sus datos. Las versiones históricas de las revisiones sustanciales se archivan con el historial de versiones del repositorio de código abierto.

## 14. Canales de contacto

- **Asuntos de privacidad, ejercicio de derechos y reclamaciones**: `privacy@epocanvas.com`
- **Contacto dentro del producto**: mensajes dentro de la aplicación o `admin@epocanvas.com`
- **Sitios autoalojados**: contacte al Operador de dicho sitio

---

*Este documento es un documento de cumplimiento elaborado por el equipo de operaciones de EpoCanvas Mail; no constituye asesoramiento jurídico. La ley aplicable a cada instancia se determina por la ubicación de su operador.*
