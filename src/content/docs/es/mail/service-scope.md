---
title: Alcance del servicio y soporte
description: Alcance del servicio y soporte de EpoCanvas Mail — qué proporciona la instancia alojada, los límites de ese servicio, los enlaces oficiales, los canales de soporte y las vías de apelación y recuperación.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.13**

Esta página describe qué proporciona la instancia alojada ([mail.epocanvas.com](https://mail.epocanvas.com)), dónde termina ese servicio y cuáles son los canales de soporte. Las instancias autoalojadas quedan fuera del «servicio» aquí descrito: el software se proporciona bajo la licencia MIT y el proyecto ascendente no responde del funcionamiento de ninguna instancia — la posición legal figura en [Marco legal del código abierto y el autoalojamiento](/es/mail/open-source/); la división del responsable del tratamiento entre las dos formas está en la sección 2 de la [Descripción general de privacidad y condiciones](/es/mail/overview/).

![Arquitectura legal de EpoCanvas Mail: los términos del servicio y la política de privacidad descansan sobre la ley aplicable y las obligaciones de seguridad](/images/mail/es/legal-architecture.svg)

*Figura: la arquitectura de compromisos de este servicio. Esta página describe el servicio en sí; el contrato y los estándares de información los portan los documentos legales situados por encima.*

## 1. Qué proporciona el servicio

| Elemento | Descripción |
| --- | --- |
| Cuentas y registro | Cuentas obtenidas mediante códigos de registro o registro abierto, según la configuración; seis grupos de identidad deciden cuotas y permisos |
| Envío y recepción | Entrante a través de Cloudflare Email Routing, analizado al llegar; entrega directa dentro del sitio; fuera del sitio, por el canal de entrega del operador |
| Almacenamiento | Cuota de almacenamiento por grupo de identidad; puede conectarse un almacenamiento de objetos personal para que los adjuntos aterricen directamente en él |
| Organización y automatización | Buzón de ocho vistas, etiquetas y motor de reglas de clasificación, búsqueda avanzada, extracción de códigos de verificación |
| Capacidades de IA | Traducción integral y OCR de imágenes (según la configuración del motor de IA de la instancia y la autorización de modelos) |
| Notificaciones y reenvío | Push de Telegram y reenvío por reglas (según los controles de datos de usuario del administrador) |
| Clientes | Web (instalable como PWA) y la aplicación Android (epomail) |
| Idiomas | Seis idiomas de interfaz; el correo del sistema y el de bienvenida se entregan en el idioma del destinatario |

Los detalles a nivel de función figuran en la [Guía de funciones](/es/mail/features/); el recorrido por cada interfaz y ruta está en el [Mapa de interfaz y rutas](/es/mail/interface/).

## 2. Límites del servicio

| Asunto | Límite |
| --- | --- |
| Disponibilidad | No se ofrece ningún acuerdo de nivel de servicio; la disponibilidad descansa en la plataforma de Cloudflare |
| Conservación | La papelera se elimina físicamente siete días después de la recepción; el spam permanece en cuarentena siete días y luego pasa a la papelera |
| Cuotas | El envío, los buzones y el almacenamiento siguen los valores de fábrica del grupo de identidad, ajustables por el Maestro en la página de permisos |
| Coste | La instancia alojada no ofrece actualmente funciones de pago |
| Cambio de funciones | Las funciones evolucionan con las versiones; los cambios significativos se anuncian en el aviso dentro del sitio y por correo de anuncios |
| Límite de adjuntos | El tope por adjunto sigue la configuración de la instancia y solo vincula a los usuarios del almacenamiento compartido del operador |

La semántica completa de la conservación figura en [Tratamiento de datos y seguridad](/es/mail/data-security/); los límites de comportamiento, en la [Política de Uso Aceptable](/es/mail/acceptable-use/).

## 3. Enlaces oficiales dentro de la aplicación

Los destinos por defecto de los enlaces oficiales en toda la aplicación se enumeran a continuación; el operador de una instancia puede sobrescribirlos en la configuración del sistema:

| Enlace | Destino por defecto | Dónde |
| --- | --- | --- |
| Presentación del proyecto | La página Presentación del proyecto de este sitio | Pie del menú de la cuenta |
| Política de privacidad / Términos del servicio | Los documentos legales correspondientes de este sitio | Pie del menú de la cuenta |
| Documentación | Este sitio (se entra mediante la negociación del idioma del navegador) | Configuración del sistema, tarjeta «Acerca de» |
| Soporte | La página Alcance del servicio y soporte de este sitio | Configuración del sistema, tarjeta «Acerca de» |
| Releases | GitHub Releases | Configuración del sistema, tarjeta «Acerca de» |
| Telegram | `t.me/epomail` | Configuración del sistema, tarjeta «Acerca de» |

## 4. Canales de soporte

| Canal | Para |
| --- | --- |
| Contacto dentro del producto | Mensaje dentro del sitio o `admin@epocanvas.com` |
| Privacidad y protección de datos | `privacy@epocanvas.com` (ejercicio de los derechos de los interesados, apelaciones de protección de datos) |
| GitHub Issues | Informes de errores y propuestas de funciones (`github.com/shijianus/epomail`) |
| Telegram | Chat de la comunidad en `t.me/epomail` |

## 5. Apelaciones y recuperación

- Olvido de contraseña: el cuadro de diálogo de «olvido de contraseña» de la página de inicio de sesión salta al portal de apelaciones (llevando el tipo de apelación, el idioma de la interfaz y la dirección de correo); el acceso se restablece tras la verificación;
- Apelaciones de suspensiones y alertas: una apelación contra una decisión de tratamiento entra en el Informe de auditoría como un aviso, que un administrador adjudica liberándolo o rechazándolo; la escala de aplicación figura en la sección 6 de la [Política de Uso Aceptable](/es/mail/acceptable-use/);
- Datos de autoservicio: la exportación JSON completa, los archivos del historial de correo y las descargas .eml de mensajes sueltos están disponibles en cualquier momento en «Configuración → Datos»; véase la sección 5 de la [Guía de configuración](/es/mail/settings/).

## 6. Límite de soporte para las instancias autoalojadas

El proyecto de código abierto ascendente no proporciona ningún servicio, soporte ni compromiso de disponibilidad para ningún despliegue de su código; el desplegador asume ante sus propios usuarios los deberes de soporte, de información y de cumplimiento. Los documentos de este sitio (incluido el conjunto legal) pueden servir de base para los materiales de un desplegador orientados a sus usuarios, y quien los adopte se hace responsable de ellos.

## 7. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| El contrato y la limitación de responsabilidad del servicio | [Términos del Servicio](/es/mail/terms-of-service/) |
| Aviso de privacidad y derechos de los interesados | [Política de Privacidad](/es/mail/privacy-policy/) |
| La licencia de código abierto y el derecho aplicable al autoalojamiento | [Marco legal del código abierto y el autoalojamiento](/es/mail/open-source/) |
| Pasos completos para desplegar su propia instancia | [Guía de despliegue](/es/mail/deployment/) |
