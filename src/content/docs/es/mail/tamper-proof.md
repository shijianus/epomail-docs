---
title: Especificación del correo oficial y verificación contra manipulaciones
description: Cómo se emite e identifica el correo oficial del sistema de EpoCanvas Mail — marca oficial, entrega inmutable, aislamiento del renderizado en el cliente y verificación contra manipulaciones de los documentos.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

Este documento explica cómo se emite el correo oficial del sistema y cómo identificarlo, y describe el mecanismo de verificación contra manipulaciones de los documentos jurídicos de este sitio, para que pueda confirmar la autenticidad de las comunicaciones y los documentos oficiales. Se establece en virtud de la [Vista general de Privacidad y Términos](/es/mail/overview/) y de [Tratamiento de Datos y Mantenimiento de la Seguridad](/es/mail/data-security/).

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional. Los documentos jurídicos y técnicos de este sitio siguen la implementación de código abierto del servicio y buscan establecer normas de comunicación comunitarias transparentes, rigurosas y no comerciales.

![Arquitectura de tres capas del correo oficial de EpoCanvas Mail: la capa de emisión bloquea la dirección oficial de envío e inyecta la marca oficial; la capa de entrega fija una instantánea inmutable con reserva de traducción predefinida; la capa de cliente aísla el renderizado con Shadow DOM y saneamiento del contenido](/images/mail/es/anti-tamper-architecture.svg)

*Figura: las tres capas del procesamiento del correo oficial. La capa de emisión bloquea la dirección oficial de envío e inyecta la marca oficial; la capa de entrega fija una instantánea inmutable con reserva de traducción predefinida; la capa de cliente aísla el renderizado y sostiene la verificación documental.*

## 1. Identidad oficial del remitente y marca oficial

Las comunicaciones oficiales del sistema se distinguen del correo ordinario de los usuarios del siguiente modo:

1. **Una única dirección oficial de envío**: los correos de bienvenida y los anuncios globales los emite el sistema desde `announcement@epocanvas.com`. La dirección está integrada en el programa; el correo oficial solo se genera mediante el canal privilegiado del sistema;
2. **La marca oficial (isOfficial)**: los correos cuyo remitente es `announcement@epocanvas.com` o `admin@epocanvas.com`, o que llevan la etiqueta «oficial», reciben la marca del sistema; el panel de lectura muestra un distintivo y un banner oficiales para distinguirlos del correo ordinario;
3. **Ciclo de vida**: los correos de bienvenida y los anuncios globales caducan tras un número de días configurable (7 por defecto) desde la entrega, y una tarea programada los limpia.

## 2. Catálogo del correo oficial

El correo oficial del sistema del servicio se limita a los siguientes tipos, todos generados a partir de plantillas integradas:

| Tipo | Detonante | Descripción |
| --- | --- | --- |
| Correo de bienvenida | se crea un buzón nuevo | plantilla oficial de seis idiomas integrada; caduca tras los días configurados (7 por defecto) |
| Anuncio global | un administrador publica un anuncio del sistema | plantilla oficial de seis idiomas integrada; misma vigencia que el correo de bienvenida |

Más allá de esta tabla, el sistema nunca envía, desde ninguna dirección, correos del tipo «cuenta anomal», «usted ha ganado» o «verificación caducada». Si recibe un correo que se declara oficial desde otra dirección de envío, repórtelo por el canal de la sección 6.

## 3. Entrega inmutable y traducción predefinida

1. **Entrega por instantánea inmutable**: las variables del correo oficial se sustituyen y su contenido se fija en una instantánea al enviarse; no se regenera cuando el destinatario cambia después el idioma de la interfaz, lo que mantiene la singularidad objetiva de las comunicaciones oficiales;
2. **Reserva de traducción predefinida**: cuando usa «Traducir» en un correo oficial no modificado, la plantilla oficial predefinida en su idioma se renderiza localmente y no se envía ningún contenido a ningún servicio de IA; solo los correos cuyo cuerpo haya modificado un administrador pasan por la traducción IA completa (véase la sección 6 de la [Política de Privacidad](/es/mail/privacy-policy/)).

## 4. Aislamiento del renderizado en el cliente

El contenido de los correos (oficiales y entrantes por igual) se renderiza en el navegador bajo las siguientes medidas de aislamiento:

1. **Aislamiento Shadow DOM**: el cuerpo se renderiza dentro de su propio Shadow DOM; los estilos y scripts globales de la página no pueden afectar al contenido del correo, y los estilos del correo no pueden extenderse a la página;
2. **Saneamiento por lista blanca**: el cuerpo se sanea con DOMPurify; las etiquetas `<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>` y `<style>` y los gestores de eventos en línea se eliminan, bloqueando la inyección de scripts y la falsificación de la interfaz.

## 5. Verificación contra manipulaciones de los documentos

Este sitio ofrece una comparación SHA-256 entre archivos fuente Markdown y un manifiesto de integridad. El manifiesto y la página proceden del mismo sitio y no constituyen una firma digital independiente; ambos podrían modificarse juntos. Una huella coincidente solo significa que el archivo elegido coincide con el manifiesto cargado. No acredita el contenido de la página web, la identidad del editor, la autenticidad del documento ni el cumplimiento legal.

| Vía de verificación | Mecanismo | Descripción |
| --- | --- | --- |
| Manifiesto de integridad de archivos | `tamper-proof.json` | Lee los archivos documentales del árbol de trabajo al generar el manifiesto y registra SHA-256, bytes, fecha de generación, una referencia Git HEAD y el estado local de los documentos |
| Panel de esta página | «Comparación de integridad del archivo fuente», solo en esta página de especificación | Calcula el SHA-256 del archivo fuente local elegido y lo compara con el manifiesto cargado; no sube archivos ni calcula la huella de la página web renderizada |
| Comparación por línea de comandos | Comando Node.js del panel | Convierte solo CRLF a LF antes del cálculo SHA-256 en UTF-8; ejecutar `sha256sum` u OpenSSL directamente sobre bytes CRLF utiliza una entrada distinta |
| Fuente del manifiesto | `docs.epocanvas.com/epomail/tamper-proof.json` | HTTPS protege la conexión; un manifiesto del mismo sitio no es por sí solo una firma o certificación de publicación verificada mediante un canal de confianza independiente |

El manifiesto usa los archivos del árbol de trabajo al generarse, en lugar de leer automáticamente los archivos confirmados en HEAD. Si los documentos incluyen contenido sin confirmar o sin seguimiento, sus huellas no pueden atribuirse a la versión confirmada de HEAD; un estado no registrado tampoco acredita una coincidencia. La fecha de HEAD es la de un commit del repositorio, no la fecha de publicación de esta página.

:::tip[Comparar un archivo]
En el panel «Comparación de integridad del archivo fuente» de esta página, elija el archivo Markdown local de la ruta indicada y pulse «Calcular y comparar archivo». La comparación por línea de comandos debe usar la misma normalización de saltos de línea. Una diferencia puede deberse a la versión, al contenido o al manifiesto. Un manifiesto no disponible o un fallo de lectura o cálculo no constituye una comparación satisfactoria.
:::

## 6. Límites de responsabilidad y canales de notificación

1. **Instancia alojada**: la emisión del correo oficial, la identidad del remitente y los sellos documentales los mantiene el equipo de operación oficial;
2. **Instancias autoalojadas**: quien autoaloja configura sus propios canales de entrega y claves, y debe proteger su instancia según se describe en [Tratamiento de Datos y Mantenimiento de la Seguridad](/es/mail/data-security/); las comunicaciones oficiales de una instancia autoalojada son responsabilidad del operador de esa instancia;
3. **Canales de notificación**: para informar de un correo que suplante la identidad oficial, una anomalía de verificación o una vulnerabilidad de seguridad, contacte con:
   - Canal oficial de envío y seguridad: `announcement@epocanvas.com`
   - Canal de privacidad y protección de datos: `privacy@epocanvas.com`
