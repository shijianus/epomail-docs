---
title: Procesamiento de Datos y Seguridad
description: Ciclo de vida de los datos de EpoCanvas Mail, matriz de tratamiento, medidas de mantenimiento de la seguridad establecidas conforme al artículo 20-1 de la PDPA y al artículo 12 del Reglamento de Aplicación, respuesta ante incidentes y cooperación con las inspecciones.
---

# Procesamiento de Datos y Seguridad

**Fecha de entrada en vigor: 29 de septiembre de 2026 | Versión: 4.1**

En seguimiento de la sección 10 de la [Política de Privacidad](/es/mail/privacy-policy/), este documento describe el ciclo de vida de los datos personales en el Servicio, la matriz de tratamiento de cada categoría de datos y las medidas de mantenimiento de la seguridad establecidas por el Operador conforme al artículo 20-1 de la Ley de Protección de Datos Personales de Taiwán (個人資料保護法, «PDPA») (todo organismo no gubernamental que conserve archivos de datos personales debe implementar medidas de mantenimiento de la seguridad para impedir que los datos personales sean sustraídos, alterados, dañados, perdidos o divulgados) y al artículo 12 del Reglamento de Aplicación de la Ley de Protección de Datos Personales (個人資料保護法施行細則). Este documento sirve asimismo como documento base para la inspección por la autoridad competente conforme al artículo 22 de la PDPA y para el acceso de los interesados.

## 1. Ciclo de vida de los datos

![Ciclo de vida de los datos de EpoCanvas Mail: recogida (registro y envío y recepción de correo), tratamiento (análisis sintáctico y cifrado en nodos perimetrales), utilización (prestación del servicio y protección de la seguridad), transferencia (encargados del tratamiento y funciones activadas por el interesado), conservación (D1/KV/R2) y destrucción (limpieza rutinaria a 7 días y eliminación física), con cada etapa anclada en los artículos 19, 20 y 21 de la PDPA](/images/mail/data-flow.svg)

*Figura: El ciclo de vida de los datos personales en el Servicio. La base jurídica de cada etapa se expone en la sección 5 de la [Política de Privacidad](/es/mail/privacy-policy/).*

## 2. Matriz de tratamiento de datos

| Categoría de datos | Conceptos concretos | Finalidad del tratamiento | Soporte de almacenamiento y nivel básico de seguridad | Conservación y destrucción |
| --- | --- | --- | --- | --- |
| Credenciales de cuenta | Dirección de correo electrónico, nombre de usuario, hash y sal de la contraseña, secreto TOTP (cifrado con AES-GCM), hashes de los códigos de respaldo, claves públicas de las llaves de acceso | Registro, verificación, verificación en dos pasos, recuperación de credenciales | Cloudflare D1; contraseñas con PBKDF2 (100,000 iteraciones, con sal); TOTP cifrado en reposo | Se conservan hasta la terminación de la cuenta; purgados de inmediato tras la eliminación física |
| Datos de red y de dispositivo | IP de registro, IP del inicio de sesión más reciente, sistema operativo, User-Agent del navegador, tipo de dispositivo | Auditoría de seguridad, identificación de inicios de sesión anómalos, limitación de frecuencia | Cloudflare D1; acceso restringido a la auditoría del administrador | Se conservan hasta la eliminación física de la cuenta |
| Estado de sesión | Tokens JWT, identificadores de rol RBAC, buzón seleccionado | Autorización en la puerta de enlace perimetral, enrutamiento de solicitudes | Cloudflare KV; validez máxima de 30 días | Revocados al cerrar sesión; caducan naturalmente tras 30 días de inactividad |
| Datos de comunicación | Remitente y destinatario, CC/CCO, asunto, marcas temporales, estado de lectura, etiquetas, destacados, cuerpo | Entrega del correo, organización de las conversaciones, búsqueda | Cloudflare D1 (metadatos); cifrado en reposo con AES-256-GCM según el modo | A disposición del interesado; la papelera se elimina físicamente tras 7 días; cuando la utilización supera el 90 %, el correo ya marcado como eliminado se elimina físicamente de plano |
| Adjuntos | Nombre original del archivo, tipo MIME, tamaño del archivo, contenido binario | Transferencia de adjuntos, visualización integrada, descarga segura | Cloudflare R2 o almacenamiento compatible con S3; las descargas emplean cabeceras defensivas | Siguen el ciclo de vida del correo asociado; purgados conjuntamente tras la eliminación física |
| Registros de seguridad y de limitación de frecuencia | Recuento de fallos de inicio de sesión, estado de la verificación humana, recuentos de solicitudes en ventana deslizante | Protección contra la fuerza bruta, prevención de abusos | Cloudflare KV; contadores en ventana deslizante | Caducan automáticamente y se reinician en un plazo de 12 horas tras activarse un umbral |
| Preferencias de interfaz | Idioma (6 idiomas), modos claro y oscuro, indicadores de notificación | Coherencia de la interfaz | localStorage del navegador, sincronizado selectivamente con D1 | Se conservan hasta que se borra la caché o se restablecen manualmente |

## 3. Medidas de mantenimiento de la seguridad (correspondientes al artículo 12 del Reglamento de Aplicación)

El artículo 12 del Reglamento de Aplicación de la Ley de Protección de Datos Personales enumera los conceptos que pueden incluir las «medidas de mantenimiento de la seguridad apropiadas». El Operador establece las siguientes medidas conforme a dicho artículo; los once conceptos quedan cubiertos:

| Concepto del artículo 12 del Reglamento de Aplicación | Implementación en el Servicio |
| --- | --- |
| 1. Asignación de personal dedicado y recursos comparables | El Operador de la instancia designa administradores y divide los permisos mediante roles RBAC multinivel |
| 2. Delimitación del alcance de los datos personales | La matriz de tratamiento de la sección 2 de este documento define con claridad cada categoría de datos |
| 3. Mecanismos de evaluación y gestión de riesgos de los datos personales | Opciones de cifrado en los tres modos de correo, bloqueo por intentos fallidos y mecanismos de limitación de frecuencia y de cuota; el código abierto está públicamente sujeto a la revisión de la comunidad |
| 4. Mecanismos de prevención, notificación y respuesta ante incidentes | Véase la sección 4 de este documento |
| 5. Procedimientos internos de gestión de la recogida, el tratamiento y la utilización | La tabla de correspondencia de actividades de tratamiento de la sección 5 de la [Política de Privacidad](/es/mail/privacy-policy/) |
| 6. Gestión de la seguridad de los datos y gestión del personal | Enrutamiento por hashes criptográficos (impide el acceso no autorizado), comprobaciones de permisos de fallo seguro (fail-closed) y supresión en la puerta de enlace de los parámetros no incluidos en la lista de permitidos |
| 7. Fomento de la concienciación y formación y capacitación | Los operadores de instancias autoalojadas deben realizarlos por sí mismos; los documentos de este sitio pueden servir como material de formación |
| 8. Gestión de la seguridad de los equipos | La infraestructura perimetral de Cloudflare asume la seguridad física y virtual de los equipos (SOC 2 Type II, ISO/IEC 27001); las claves se inyectan como variables de entorno y nunca entran en la base de código |
| 9. Mecanismos de auditoría de la seguridad de los datos | Los registros de seguridad (IP de inicio de sesión, dispositivo, registros de fallos) se conservan con acceso restringido a la auditoría; las sesiones pueden revocarse de inmediato |
| 10. Conservación de los registros de uso, los datos de rastro y las pruebas | Los registros de inicio de sesión y de seguridad se conservan hasta la eliminación física de la cuenta; las pruebas de los incidentes de abuso se conservan conforme a la [Política de Uso Aceptable](/es/mail/acceptable-use/) |
| 11. Mejora continua global del mantenimiento de la seguridad | El proyecto de código abierto evoluciona de forma continua; las correcciones de seguridad materiales se publican con las versiones y se anuncian |

Medidas técnicas clave: HTTPS/TLS en todo el sitio; el correo HTML se sanea con DOMPurify en un Shadow DOM aislado antes de su representación (bloqueando scripts, controladores de eventos en línea e importaciones externas); las descargas de adjuntos aplican `Content-Disposition: attachment` y `X-Content-Type-Options: nosniff`; se aplica protección SSRF a los webhooks y a los puntos de conexión de almacenamiento externo (bloqueando los rangos de red privados y las direcciones de metadatos de la nube); los identificadores de correo se enrutan mediante ofuscación HMAC para impedir la enumeración no autorizada.

:::caution[Alcance y límites del cifrado]
El cifrado de los tres modos de correo del Servicio —«todo», «privado» y «cifrado»— es un cifrado en reposo del lado del servidor: las claves se derivan de las variables de entorno del servidor de la instancia y de la identidad del usuario. Este mecanismo protege contra el riesgo de robo de los archivos de la base de datos o de fuga de instantáneas; no es un cifrado de extremo a extremo, y un Operador que posea el servidor y las claves tiene técnicamente la capacidad de descifrar. Cuando se requiera confidencialidad también frente al Operador, cifre usted mismo el cuerpo del correo con una herramienta de cifrado de extremo a extremo como GPG antes de enviarlo.
:::

## 4. Respuesta ante incidentes y notificación

Cuando el Operador tiene conocimiento de que datos personales han sido sustraídos, alterados, dañados, perdidos o divulgados, adopta las medidas siguientes:

1. bloquear de inmediato el origen de la intrusión (revocar sesiones, bloquear el origen, rotar claves);
2. evaluar el alcance del impacto y conservar los registros (conservación de datos de rastro y de pruebas conforme al artículo 12, inciso 10, del Reglamento de Aplicación);
3. notificar a los interesados afectados e informar a la autoridad competente conforme al régimen de mantenimiento de la seguridad dictado en virtud del artículo 20-1, párrafo 2, de la PDPA y a las reglas de la autoridad competente; la notificación incluye los hechos del incidente, los posibles daños, las medidas de respuesta ya adoptadas y las medidas de autoprotección que pueden adoptar los interesados;
4. revisar la causa del incidente y reforzar las medidas de seguridad correspondientes (mejora continua conforme al artículo 12, inciso 11, del Reglamento de Aplicación).

## 5. Cooperación con las inspecciones

Conforme al artículo 1-1 de la PDPA, la autoridad competente de la Ley es la Comisión de Protección de Datos Personales (PDPC). Conforme al artículo 22 de la misma Ley, cuando la autoridad competente considere que un organismo no gubernamental pudo haber infringido la Ley, o que resulta necesario para revisar la aplicación de la Ley por dicho organismo, puede requerirle para que exponga su posición, exigirle la presentación de los documentos, datos u objetos necesarios, o —por sí misma o junto con la autoridad competente central del sector de que se trate, un gobierno municipal especial o un gobierno de condado (ciudad)— enviar personal portador de la acreditación de sus funciones para realizar una inspección in situ. El Operador del Servicio acepta la inspección y la auditoría de la autoridad competente y no puede sustraerse, obstaculizar ni negarse sin causa legítima; mantiene medidas de mantenimiento de la seguridad conforme al artículo 20-1 de la PDPA y al artículo 12 del Reglamento de Aplicación de la Ley de Protección de Datos Personales. Este documento y la [Política de Privacidad](/es/mail/privacy-policy/) sirven como documentos base de la inspección.

Conforme al artículo 25 de la PDPA, en caso de infracción la autoridad competente puede, además de imponer multas, ordenar el cese de la recogida, del tratamiento o de la utilización, ordenar la supresión de los archivos de datos personales, decomisar u ordenar la destrucción de los datos personales recogidos ilícitamente, o publicitar la infracción; el Operador cumplirá el contenido de cualquiera de dichas resoluciones.

Los operadores de instancias autoalojadas deben cumplir por sí mismos, para su instancia, todas las obligaciones enumeradas en esta sección y hacer frente a la auditoría de la autoridad competente del lugar donde se encuentren; este documento puede servir como plantilla para establecer su plan de mantenimiento de la seguridad.
