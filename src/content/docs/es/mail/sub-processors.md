---
title: Subencargados del Tratamiento
description: Lista completa de los encargados del tratamiento de EpoCanvas Mail por cuenta de tercero, destinatarios de la comunicación de datos, datos implicados, condiciones de activación y mecanismos de transferencia internacional.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.14**

En seguimiento de la sección 7 de la [Política de Privacidad](/es/mail/privacy-policy/), esta lista expone en su integridad los terceros implicados en los datos personales del Servicio, las condiciones de la comunicación de datos y las garantías. El principio de comunicación de datos del Servicio es la mínima necesidad: los datos que no necesitan salir de la instancia no salen; los que deben salir están claramente señalados con el destinatario y los datos transportados. El Servicio no mantiene con ninguna de las partes siguientes relación de venta de datos ni de reparto de ingresos publicitarios.

Las transferencias internacionales se rigen por los requisitos de la ley aplicable y las restricciones legítimas de las autoridades competentes, con las cláusulas contractuales tipo y mecanismos análogos como garantía. Los encargados del tratamiento tratan todos los datos por instrucciones del responsable y dentro del alcance de la finalidad del encargo.

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional. Los documentos jurídicos y técnicos de este sitio siguen la implementación de código abierto del servicio y buscan establecer normas de comunicación comunitarias transparentes, rigurosas y no comerciales.

![Mapa de comunicación de datos a terceros de EpoCanvas Mail: centrado en la instancia, cuatro categorías —encargados del tratamiento, autorizado por el interesado, tratamiento mediante IA activado por el interesado y requerimientos legales— con el principio de mínima necesidad y los compromisos de no venta, no publicidad y no rastreo señalados](/images/mail/es/subprocessor-map.svg)

*Figura: Los cuatro canales de comunicación de datos a terceros en el Servicio. Las condiciones de activación, los datos implicados y las garantías de cada categoría se exponen en las tablas siguientes.*

## 1. Encargados del tratamiento (infraestructura de pila completa)

| Encargado | Función | Datos implicados | Regiones de transferencia y garantías |
| --- | --- | --- | --- |
| Cloudflare, Inc. (Estados Unidos) | Computación perimetral (Workers), almacenamiento estructurado (D1), sesiones y caché (KV), almacenamiento de objetos (R2, opcional; cuando no está activado, los adjuntos se almacenan en KV), enrutamiento de correo (Email Routing), verificación humana (Turnstile), IA perimetral (Workers AI) y registros perimetrales | Metadatos de las solicitudes, todo el contenido almacenado, solicitudes de verificación | Red perimetral global; certificaciones SOC 2 Type II e ISO/IEC 27001; está disponible el mecanismo de las Cláusulas Contractuales Tipo de la UE (SCC); transferencias cifradas con TLS de extremo a extremo |
| Resend, Inc. / Mailjet (Sinch) (Estados Unidos / Francia) | Entrega de correo fuera del sitio (MTA) | Correo saliente completo (destinatario, asunto, cuerpo, adjuntos) | Se activa únicamente cuando se envía correo cuyos destinatarios están fuera del sitio y el Operador ha configurado un canal de entrega; las credenciales de entrega se guardan como tokens de API aislados y nunca entran en los registros de diagnóstico |

## 2. Encargados autorizados por el interesado

| Encargado | Función | Datos implicados | Condición de activación |
| --- | --- | --- | --- |
| Telegram | Envío de notificaciones en tiempo real | Según la configuración: asunto del correo, remitente (puede ocultarse), cuerpo (puede ocultarse), códigos de verificación y un enlace de lectura válido durante 7 días | Únicamente cuando un bot de Telegram está vinculado y el envío está activado |
| Aplicaciones de terceros OAuth | Inicio de sesión de terceros o acceso autorizado | Alcance limitado a openid / profile / email (identificador, dirección de correo electrónico, nombre, avatar); tokens de acceso válidos durante 2 horas | Únicamente tras autorización activa del interesado; revocable en cualquier momento en la página «Aplicaciones de terceros», y la revocación surte efecto de inmediato |
| Linux DO | Fuente de identidad para el inicio de sesión de terceros | El identificador de usuario, el apodo, el avatar y el nivel de confianza obtenidos mediante OAuth | Únicamente al iniciar sesión con una cuenta de Linux DO |
| Blog del equipo de operación (blog.epocanvas.com) | Vinculación del nivel de actividad del blog y mejora de cuota | Su dirección de correo electrónico (transmitida en la consulta) | Se consulta en tiempo real únicamente cuando usted consulta la vinculación de nivel del blog |
| Servicio de alojamiento de imágenes de avatar (por defecto: el almacenamiento de objetos propio de la instancia; el Operador puede configurar un servicio externo mediante una variable de entorno) | Almacenamiento de avatares e imágenes | Los propios archivos de imagen | Únicamente al cargar avatares e imágenes similares; si se configura un servicio externo, los archivos de imagen se transmiten a dicho servicio |

## 3. La cadena de tratamiento mediante IA (por iniciativa del interesado como principio)

| Servicio | Función | Datos implicados | Condición de activación |
| --- | --- | --- | --- |
| Punto de conexión del modelo configurado por la instancia (protocolo compatible con OpenAI por defecto) | Traducción de correos | Fragmentos del texto que se traduce (párrafos enteros preferentemente; textos largos por fragmentos) | Únicamente cuando el interesado pulsa «Traducir» |
| Cloudflare Workers AI | Extracción de códigos de verificación (inferencia perimetral), alternativa de traducción, reconocimiento de texto en imágenes | Asunto y primeros 6.000 caracteres del cuerpo (para la extracción de códigos); texto e imágenes para la traducción y el reconocimiento | La extracción de códigos de verificación es el único tratamiento mediante IA no activado manualmente (opcional, activado por el Operador); el resto lo activa el interesado |
| API públicas de MyMemory / Google Translate | Alternativa de traducción | Fragmentos de texto extraídos | Únicamente como alternativa cuando el punto de conexión del modelo no está disponible |

El Operador no entrena ningún modelo con el contenido del correo, ni envía a los servicios de IA información de identidad de los usuarios más allá del texto necesario para la traducción o el reconocimiento.

## 4. Servicios externos aportados por el interesado o el Operador

| Servicio | Función | Datos implicados |
| --- | --- | --- |
| Almacenamiento compatible con S3 (AWS S3, Backblaze B2, MinIO, etc.) | Almacenamiento externo de adjuntos y blobs de correo sin procesar (BYOS) | Contenido binario de los adjuntos y sus credenciales de acceso |
| Bases de datos externas como Turso / LibSQL | Redundancia externa de los datos | Réplicas de los datos según la configuración |

Los servicios propios aportados anteriores son elegidos por quien los configura; dicha parte debe garantizar por sí misma que su elección cumple los requisitos legales de su lugar de ubicación en materia de transferencias internacionales.

## 5. Solicitudes de terceros en la capa de interfaz

| Servicio | Función | Descripción |
| --- | --- | --- |
| Google Fonts | Carga de tipografías de la interfaz | Cuando el navegador carga una página envía solicitudes de tipografías a Google, y la IP del interesado aparece en los registros de solicitudes de Google |
| Cloudflare Turnstile | Verificación humana | Se realiza en el registro y al añadir buzones; evalúa la fiabilidad del navegador sin cookies publicitarias ni rastreo entre sitios |

## 6. Comunicación de datos bajo requerimiento legal

El Operador solo comunica datos personales externamente cuando exista una obligación legal imperativa o cuando una autoridad judicial lo solicite a través de los procedimientos legales. El Operador verificará la legalidad de la solicitud, comunicará únicamente el alcance mínimo exigido por la ley y notificará a los interesados afectados en la medida permitida por la ley (salvo cuando dicha notificación esté prohibida por la ley). Los operadores de instancias autoalojadas complementarán los compromisos correspondientes para su propia jurisdicción.

## 7. Notificación de cambios en los encargados

La incorporación o sustitución de un encargado del tratamiento constituye un cambio material en el sentido de la sección 13 de la [Política de Privacidad](/es/mail/privacy-policy/); el Operador lo anunciará con antelación conforme al procedimiento de dicha sección y actualizará esta lista.
