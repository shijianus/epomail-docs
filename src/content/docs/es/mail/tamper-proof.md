---
title: Especificación del correo oficial y verificación contra manipulaciones
description: Cómo se emite e identifica el correo oficial del sistema de EpoCanvas Mail — marca oficial, entrega inmutable, aislamiento del renderizado en el cliente y verificación contra manipulaciones de los documentos.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.16**

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

Los documentos jurídicos de este sitio se sellan criptográficamente al publicarse, de modo que cualquiera puede verificar que lo que lee coincide con la versión publicada en el repositorio de código abierto:

| Vía de verificación | Mecanismo | Descripción |
| --- | --- | --- |
| Manifiesto de integridad | `tamper-proof.json` | generado por la cadena de compilación a partir del repositorio git; registra para cada documento el resumen SHA-256, el tamaño en bytes y el commit fijado |
| Panel integrado en la página | «Sello oficial y verificación de integridad» al pie de cada página | muestra el resumen oficial y el commit fijado de este documento; al pulsar «Verificar esta página», se vuelve a obtener el manifiesto y se compara con el resumen incrustado en la página |
| Verificación sin conexión | `sha256sum` / OpenSSL | calcule el resumen de las fuentes Markdown del repositorio y compárelas con el manifiesto elemento por elemento |
| Origen autorizado | `docs.epocanvas.com/epomail` | servido por HTTPS; el contenido leído desde otro dominio o un espejo debe cotejarse con los resúmenes del manifiesto |

:::tip[Cómo verificar en línea]
Pulse «Verificar esta página» al pie de cualquier página de documento: el panel volverá a obtener el manifiesto oficial y lo comparará con el resumen incrustado en la página. También puede ejecutar `curl -sSL https://docs.epocanvas.com/epomail/tamper-proof.json` en una terminal para obtener el manifiesto, y `sha256sum` sobre los archivos Markdown del repositorio para una comprobación elemento por elemento.
:::

## 6. Límites de responsabilidad y canales de notificación

1. **Instancia alojada**: la emisión del correo oficial, la identidad del remitente y los sellos documentales los mantiene el equipo de operación oficial;
2. **Instancias autoalojadas**: quien autoaloja configura sus propios canales de entrega y claves, y debe proteger su instancia según se describe en [Tratamiento de Datos y Mantenimiento de la Seguridad](/es/mail/data-security/); las comunicaciones oficiales de una instancia autoalojada son responsabilidad del operador de esa instancia;
3. **Canales de notificación**: para informar de un correo que suplante la identidad oficial, una anomalía de verificación o una vulnerabilidad de seguridad, contacte con:
   - Canal oficial de envío y seguridad: `announcement@epocanvas.com`
   - Canal de privacidad y protección de datos: `privacy@epocanvas.com`
