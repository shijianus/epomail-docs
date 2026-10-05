---
title: Privacidad y Términos — Visión General
description: Visión general de los documentos legales de EpoCanvas Mail—identidad de la plataforma, roles de tratamiento de datos, arquitectura documental, orden de prelación y canales de contacto.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.15**

Esta página constituye una guía de todos los documentos legales del servicio EpoCanvas Mail (el «Servicio») y explica los roles de las partes, la arquitectura documental y el orden de aplicación. Antes de registrarse en el Servicio o utilizarlo, debe leer esta página, junto con la [Política de Privacidad](/es/mail/privacy-policy/) y los [Términos del Servicio](/es/mail/terms-of-service/).

![Arquitectura de los documentos legales de EpoCanvas Mail: los Términos del Servicio como capa contractual; la Política de Privacidad y la Política de Uso Aceptable como capa de políticas; el Procesamiento de Datos y Mantenimiento de la Seguridad, la Lista de Subencargados del Tratamiento y el Glosario como documentos de apoyo; todo ello sobre los cimientos de la ley aplicable y las obligaciones de mantenimiento de la seguridad](/images/mail/es/legal-architecture.svg)

*Figura: La arquitectura de los documentos legales de este sitio. Los Términos del Servicio establecen las condiciones contractuales; la Política de Privacidad contiene la notificación y los estándares de tratamiento de los datos personales; la Política de Uso Aceptable fija los límites de conducta; el Procesamiento de Datos y Mantenimiento de la Seguridad, la Lista de Subencargados del Tratamiento y el Glosario son documentos de apoyo. La ley aplicable a cada instancia se determina por la ubicación de su operador.*

## 1. Identidad de la plataforma

EpoCanvas Mail es un servicio de correo electrónico de código abierto construido sobre la arquitectura de computación perimetral de Cloudflare (Workers, D1, KV, R2), cuyo código fuente se publica bajo la Licencia MIT. El Servicio puede prestarse en las dos modalidades siguientes:

1. **Instancia alojada**: un sitio público (`mail.epocanvas.com`) operado por el equipo de operaciones, junto con su aplicación móvil complementaria (epomail);
2. **Instancia autoalojada**: un sitio privado que cualquier persona, equipo u organización despliega en su propio dominio y dentro de su propia cuenta de Cloudflare utilizando el código fuente abierto.

## 2. Definición de los roles de tratamiento de datos

Los documentos legales del Servicio adoptan la distinción de roles entre «responsable del tratamiento» y «encargado del tratamiento», equivalente a la clasificación general empleada en el Reglamento General de Protección de Datos (RGPD) de la Unión Europea y en ordenamientos jurídicos similares; la ley aplicable a cada instancia se determina por la ubicación de su operador.

![Asignación de responsabilidades de EpoCanvas Mail: el proyecto de código abierto ascendente (Licencia MIT) proporciona el código fuente; la instancia que usted utiliza es operada de forma independiente por su Operador, que asume la responsabilidad de responsable del tratamiento; su cuenta y sus datos de correo electrónico se almacenan en los recursos de Cloudflare de dicha instancia](/images/mail/es/self-host-responsibilities.svg)

*Figura: Los límites de responsabilidad entre el software, el Operador y los usuarios. Los autores ascendentes del proyecto de código abierto no operan ningún servicio de correo electrónico y no responden por la conducta de ninguna instancia.*

| Escenario | Responsable del tratamiento | Encargado del tratamiento |
| --- | --- | --- |
| Instancia alojada | El equipo de operaciones (con respecto a los datos de cuenta y los registros de auditoría de seguridad); en cuanto al contenido del correo electrónico intercambiado por los usuarios, el Operador lo trata en la medida necesaria para la prestación del servicio de comunicaciones | Encargados del tratamiento delegados tales como Cloudflare y Resend |
| Instancia autoalojada | La persona u organización que desplegó la instancia (responsable del tratamiento único y exclusivo) | Los proveedores de infraestructura configurados por dicha entidad desplegadora |

El código fuente abierto en sí no recopila, carga ni devuelve ningún dato de telemetría; salvo los servicios externos configurados por el propio Operador de la instancia, los autores ascendentes no tienen acceso a los datos operativos de ninguna instancia. El proyecto de código abierto no presta ningún servicio ni asume las obligaciones de cumplimiento de ninguna instancia: desde el momento del despliegue, la entidad desplegadora se convierte en responsable del tratamiento respecto de sus usuarios y debe cumplir, conforme a la ley aplicable en su lugar de ubicación, las obligaciones de notificación, de mantenimiento de la seguridad y de sometimiento a supervisión, pudiendo tomar los documentos de este sitio como plantilla base de su notificación y de sus condiciones.

## 3. Arquitectura documental

Los documentos legales de este sitio se organizan por temas; los documentos se remiten entre sí y en conjunto constituyen el acuerdo completo:

| Documento | Contenido |
| --- | --- |
| [Política de Privacidad](/es/mail/privacy-policy/) | La recopilación, el tratamiento y la utilización de datos personales; los estándares de tratamiento; los derechos de los interesados; y las transferencias internacionales |
| [Términos del Servicio](/es/mail/terms-of-service/) | Las condiciones contractuales de uso del Servicio; los derechos y obligaciones; las limitaciones de responsabilidad; la ley aplicable; y la jurisdicción |
| [Política de Uso Aceptable](/es/mail/acceptable-use/) | Los límites de la conducta de los usuarios; la lista de conductas prohibidas y las medidas del Operador; y los procedimientos de aplicación |
| [Procesamiento de Datos y Seguridad](/es/mail/data-security/) | El ciclo de vida de los datos; la matriz de tratamiento; las medidas de mantenimiento de la seguridad; la respuesta a incidentes; y la cooperación con las inspecciones |
| [Subencargados del Tratamiento](/es/mail/sub-processors/) | Encargados del tratamiento delegados, destinatarios de comunicaciones de datos, datos involucrados y garantías para las transferencias internacionales |
| [Glosario](/es/mail/key-terms/) | Definiciones de los términos técnicos y jurídicos empleados en los documentos legales de este sitio |
| [Seguridad contra manipulaciones y normas](/es/mail/tamper-proof/) | Especificaciones oficiales, 16 avisos de seguridad, protección de remitente y verificación de integridad |

Este sitio se organiza en dos rutas de lectura complementarias: quien quiera conocer el proyecto, prepararse para autoalojarlo o aprender a usarlo puede empezar por la [Presentación del proyecto](/es/mail/project/) y profundizar con el [Mapa de interfaz y rutas](/es/mail/interface/), la [Referencia de búsqueda y reglas](/es/mail/search/), la [Guía de despliegue](/es/mail/deployment/) y la [Guía de desarrollo](/es/mail/development/); quien quiera conocer el alcance del servicio y sus pactos de privacidad y legales puede llegar a los documentos jurídicos siguientes desde esta página. Ambas rutas se cruzan en la [Guía de funciones](/es/mail/features/) y los [Modos de funcionamiento](/es/mail/modes/).
## 4. Orden de prelación

1. En materia de privacidad, la [Política de Privacidad](/es/mail/privacy-policy/) constituye la disposición específica; en cuanto a las condiciones de uso del Servicio, los [Términos del Servicio](/es/mail/terms-of-service/) constituyen la disposición específica; todos los demás asuntos se interpretan conforme a la arquitectura establecida en esta página.
2. En caso de incongruencia entre documentos, prevalecerá el documento directamente relacionado con la materia de que se trate.
3. Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional. La ley aplicable a cada instancia se determina por la ubicación de su operador (véase la Sección 2).

## 5. Canales de contacto

- **Asuntos de privacidad y reclamaciones de protección de datos**: `privacy@epocanvas.com`
- **Contacto dentro del producto**: mensajes dentro de la aplicación o `admin@epocanvas.com`
- **Proyecto de código abierto**: Issues del repositorio de GitHub (`github.com/shijianus/epomail`)
- **Sitios autoalojados**: contacte al Operador a través de los datos de contacto publicados por dicho sitio
