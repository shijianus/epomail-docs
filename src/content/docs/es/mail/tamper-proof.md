---
title: Especificación del correo oficial y comprobación de coherencia del manifiesto de publicación
description: Identificación de mensajes del sistema de EpoCanvas Mail, tipos de notificaciones, instantáneas de entrega, traducción por plantillas, límites de renderizado y alcance de la comparación de dos registros del manifiesto de publicación.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.21**


<!-- legal-review-draft -->
:::caution[Borrador de revisión jurídica: no es el aviso vigente]
Este borrador recoge cláusulas propuestas y cuestiones pendientes de verificación. No sustituye al aviso vigente ni certifica el cumplimiento. No debe utilizarse para activar tratamientos antes de verificar la identidad y los datos de contacto legalmente exigidos al operador, las bases jurídicas reales, los destinatarios y las garantías de transferencia, la conservación y la supresión, y de facilitar la información requerida. La versión de referencia es la base de redacción en chino tradicional, no una entrada en vigor. Las obligaciones legales y los derechos existentes no se alteran.
:::

Este documento explica cómo se identifican los mensajes del sistema y sus límites de tratamiento, así como la comprobación de coherencia del manifiesto de publicación de este sitio. La comprobación no autentica correos ni documentos, no verifica firmas digitales ni certifica el cumplimiento legal. Las reglas relacionadas figuran en la [Vista general de Privacidad y Términos](/es/mail/overview/) y en [Tratamiento de Datos y Mantenimiento de la Seguridad](/es/mail/data-security/).

La versión en chino tradicional (Taiwán) es la versión oficial del sitio; los demás idiomas son traducciones de referencia. En caso de ambigüedad prevalece la versión oficial, sin perjuicio de los requisitos aplicables de información clara, interpretación favorable al consumidor y derechos irrenunciables de protección de datos y de los consumidores. La implementación de código abierto describe el comportamiento técnico, pero no sustituye las obligaciones legales del operador efectivo.

![Relación entre las marcas de remitente del correo del sistema, las instantáneas de entrega y la traducción por plantillas, el renderizado del cliente y los registros del manifiesto de publicación](/images/mail/es/anti-tamper-architecture.svg)

*Figura: las marcas de remitente, instantáneas del cuerpo, encapsulación de estilos y registros del manifiesto tienen usos y límites propios. En conjunto no constituyen una autenticación de identidad, un entorno aislado de seguridad para scripts ni una garantía contra la manipulación de documentos.*

## 1. Identidad del remitente del sistema y marcas visuales

Al identificar comunicaciones del sistema, distinga las reglas visuales de la aplicación de la autenticación de identidad:

1. El correo de bienvenida y los anuncios globales se generan normalmente desde el sistema con la dirección integrada `announcement@epocanvas.com`. Esto no excluye otras notificaciones de seguridad o de gestión ni hace auténtico cualquier mensaje que muestre esa dirección.
2. `isOfficial` es una marca visual de la aplicación: el correo de `announcement@epocanvas.com` o `admin@epocanvas.com`, o con la etiqueta «oficial», puede mostrar un distintivo y un banner. La marca no es una firma digital ni una autenticación independiente del remitente.
3. Algunos mensajes del sistema se marcan para su eliminación al leer la lista de correos, según un plazo de caducidad configurable (7 días por defecto), y después se limpian mediante la tarea diaria programada. No se borran de forma inmediata y completa al caducar. Los límites reales de conservación y limpieza figuran en la sección 1.5 de [Tratamiento de Datos y Mantenimiento de la Seguridad](/es/mail/data-security/).

## 2. Catálogo de correo del sistema y notificaciones

Las comunicaciones del sistema incluyen los siguientes tipos. Su envío y sus modalidades dependen de la implementación, la configuración y los eventos; no se limitan al correo de bienvenida y a los anuncios:

| Tipo | Desencadenante | Descripción |
| --- | --- | --- |
| Correo de bienvenida | Creación de un buzón nuevo | Puede utilizar plantillas integradas en seis idiomas; conservación y limpieza según la sección 1 |
| Anuncio global | Publicación de un anuncio del sistema por un administrador | Puede utilizar plantillas integradas en seis idiomas o contenido modificado; conservación y limpieza según la sección 1 |
| Notificación de seguridad | Eventos de inicio de sesión o de seguridad, o incidentes de notificación legalmente obligatoria | Puede enviarse según los eventos y las reglas aplicables; un mensaje sobre seguridad de la cuenta no es necesariamente falso |
| Notificación de decisiones de gestión y reclamaciones | Medida de gestión, decisión o revisión de una reclamación | Puede comunicar medidas y resultados de revisión; la conservación de los registros relacionados se trata en el documento de seguridad de datos |

Una dirección de remitente, una marca visual o un enlace del mensaje por sí solos no acreditan la autenticidad. Compruebe las notificaciones desde un punto de acceso conocido y fiable al servicio. Ante la duda, use los canales de la sección 6 y no introduzca credenciales a través de enlaces sospechosos.

## 3. Instantáneas de entrega y traducción por plantillas

1. Los mensajes de plantilla sustituyen las variables y guardan una instantánea del cuerpo al enviarse. Cambiar el idioma de la interfaz no reescribe por sí mismo el cuerpo guardado. Esto no constituye almacenamiento inalterable ni aporta una firma digital o autenticación de identidad.
2. Al usar «Traducir», una plantilla coincidente y disponible en el idioma de destino puede renderizarse localmente. Una plantilla no reconocida o ausente, un cuerpo modificado u otra falta de coincidencia conduce al proceso general de traducción, que puede usar modelos configurados, Workers AI o servicios públicos de traducción de respaldo. No existe una garantía general de que el correo oficial nunca salga del servicio. Los destinatarios, las cadenas de tratamiento y las garantías necesarias se describen en las secciones 6 y 7 de la [Política de Privacidad](/es/mail/privacy-policy/).

## 4. Límites del renderizado en el cliente

El renderizado del correo utiliza encapsulación de estilos y saneamiento del contenido. Ninguno constituye una certificación independiente de identidad o seguridad:

1. Shadow DOM encapsula el DOM y el ámbito de los estilos para reducir interferencias entre el correo y la página. No es una frontera de seguridad para scripts: no impide que los scripts de la página accedan al contenido o lo manipulen, ni es un entorno aislado con un origen distinto.
2. DOMPurify elimina etiquetas peligrosas y controladores de eventos en línea según su configuración para reducir los riesgos de inyección de contenido. Su eficacia depende de la versión, la configuración y el tratamiento posterior; no garantiza prevenir toda inyección de scripts, suplantación de interfaz o solicitud de recursos remotos.

## 5. Comprobación de coherencia del manifiesto de publicación

`tamper-proof.json` es el nombre de archivo existente del manifiesto de publicación, no una afirmación de que esté firmado o sea inalterable. El panel en línea solo compara la entrada de esta página en dos respuestas del manifiesto del sitio actual. No calcula el hash del contenido de la página.

| Vía de comprobación | Mecanismo | Alcance y límites |
| --- | --- | --- |
| Manifiesto de publicación | `tamper-proof.json` | Durante la compilación registra el SHA-256 y el tamaño en bytes de los archivos fuente del árbol de trabajo tras convertir CRLF a LF, y el Git HEAD de ese momento; un identificador de commit no prueba la ausencia de cambios sin confirmar |
| Panel de esta página | «Comprobación de coherencia del manifiesto de publicación» | Solo aparece en esta página, después de la introducción y la figura y antes de la sección 1; compara el SHA-256 de la entrada y el `gitCommit` completo entre la lectura inicial y la siguiente |
| Comparación manual de archivos fuente | Node / `sha256sum` / OpenSSL | Compruebe por separado el origen y la versión del manifiesto y los archivos, y calcule el hash del Markdown local con las mismas reglas de saltos de línea; el panel no realiza esta operación |
| Origen de la solicitud | URL del manifiesto del mismo origen en el sitio actual | Solo lee el manifiesto de ese sitio, sin solicitar una verificación independiente a GitHub; HTTPS por sí solo no acredita la identidad del editor ni el efecto jurídico de un documento |

El éxito solo indica que el hash de la entrada de esta página y `gitCommit` coinciden en ambas lecturas del manifiesto. No verifica el contenido de la página, la identidad del editor, las firmas digitales ni el cumplimiento legal. El manifiesto y el script proceden del mismo sitio; sustituir ambos puede seguir produciendo un resultado coherente, por lo que no es una base de confianza independiente.

:::tip[Cómo comprobar la coherencia del manifiesto]
Pulse «Comprobar la coherencia del manifiesto» en el panel de esta página. La primera lectura válida solo establece una referencia, sin mostrar éxito. Un hash o commit distinto en la lectura siguiente muestra «Verificación fallida»; una actualización de la publicación también puede causar diferencias. Los errores de red o HTTP, JSON o estructura no válidos, una entrada ausente, un SHA-256 que no tenga 64 caracteres hexadecimales o un commit Git completo no válido muestran «No se puede verificar», nunca éxito. Tras un fallo inicial, una recarga correcta solo establece la referencia y se requiere otra comprobación. Despliegue las instrucciones independientes del panel para comparar manualmente los archivos fuente.
:::

## 6. Límites de responsabilidad y canales de notificación

1. El operador efectivo de la instancia alojada mantiene sus notificaciones del sistema y su manifiesto de publicación. EpoCanvas es un nombre de proyecto, no una prueba de personalidad jurídica independiente ni de un equipo de seguridad certificado. La identidad del operador y la información legalmente exigida se tratan en la sección 2 de la [Política de Privacidad](/es/mail/privacy-policy/).
2. El operador efectivo de una instancia autoalojada configura la entrega, las plantillas, las claves y el mantenimiento de datos, y aplica las medidas pertinentes de [Tratamiento de Datos y Mantenimiento de la Seguridad](/es/mail/data-security/). Publicar código fuente no convierte por sí solo a alguien en operador de otra instancia; quienes la operen realmente o determinen el tratamiento siguen siendo responsables según los hechos.
3. Para informar de una posible suplantación, diferencias en el manifiesto o problemas de seguridad, contacte con:
   - Canal de envío del sistema y seguridad: `announcement@epocanvas.com`
   - Canal de privacidad y protección de datos: `privacy@epocanvas.com`

Esta distribución de funciones, la naturaleza del proyecto y la prioridad lingüística no excluyen las responsabilidades que no puedan limitarse legalmente, los derechos de protección de datos y de los consumidores, ni el recurso directo a las autoridades y tribunales competentes.
