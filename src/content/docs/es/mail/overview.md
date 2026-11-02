---
title: Privacidad y términos — Visión general
description: Finalidad del proyecto, roles reales de tratamiento, documentos legales, orden de prelación y contacto de EpoCanvas Mail.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

Esta página presenta los documentos legales de EpoCanvas Mail. Lea los [Términos del Servicio](/es/mail/terms-of-service/) y la [Política de Privacidad](/es/mail/privacy-policy/) antes de crear una cuenta; no se registre si no acepta las condiciones. Leer un documento no equivale a consentir todos los tratamientos de datos personales.

Tras la actualización y configuración coordinadas, el nuevo registro muestra los datos del operador, la versión de los Términos y los enlaces a estos y al aviso de privacidad, y exige marcar una casilla de aceptación inicialmente vacía. La falta de información obligatoria cierra los nuevos registros sin bloquear el acceso existente ni la inicialización administrativa. La creación de cuentas por OAuth aplica el mismo control; vincular una cuenta existente no obliga por sí solo a celebrar un nuevo contrato. Los tratamientos opcionales siguen sujetos a elecciones separadas; véanse la [Guía de configuración](/es/mail/settings/#operator-notice) y los [Términos del Servicio](/es/mail/terms-of-service/). Estos mecanismos no acreditan que una instancia en línea esté actualizada, que se haya verificado la identidad real del operador ni que estén resueltos los destinatarios, contratos y plazos de conservación.

La versión en chino tradicional (Taiwán) es la oficial; los demás idiomas son traducciones de referencia. Esta disposición no limita la información clara exigida por la ley aplicable, la interpretación favorable al consumidor ni los derechos irrenunciables. La fecha de actualización registra una revisión del texto, sin aplicar automáticamente los cambios a todos los usuarios.

![Relación entre los términos, la política de privacidad y los documentos complementarios](/images/mail/es/legal-architecture.svg)

*Figura: cada documento trata su materia; las normas imperativas y los derechos de protección de datos y del consumidor prevalecen sobre la jerarquía documental pactada.*

## 1. Identidad de la plataforma

EpoCanvas Mail es un proyecto personal secundario, sin ánimo de lucro, destinado al aprendizaje y las pruebas. El código se publica bajo MIT y utiliza servicios como Cloudflare Workers, D1, KV y R2. Tomamos los principios de protección de datos de la Unión Europea como referencia para el diseño y el mantenimiento y realizamos esfuerzos razonables para mejorar la protección de los datos, teniendo en cuenta los riesgos reales, el estado de la técnica y los costes razonables de implementación. Explicamos claramente las limitaciones conocidas para ayudarle a decidir si desea utilizar el servicio y qué funciones elegir.

La «referencia a las normas de la Unión Europea» describe aquí la orientación de las mejoras del proyecto y el grado de diligencia razonable; no significa que el proyecto haya obtenido una certificación, sea adecuado para todos los usos o garantice la ausencia de incidentes relacionados con los datos. La aplicación del RGPD y de otras leyes sigue dependiendo de las actividades reales; las obligaciones imperativas aplicables no se reducen por la naturaleza de prueba del servicio, la información sobre los riesgos ni la aceptación del usuario. Los riesgos concretos para los datos y las medidas que puede adoptar se presentan en la sección 1 de la [Política de Privacidad](/es/mail/privacy-policy/).

1. La instancia alojada es `mail.epocanvas.com`, utiliza EpoCanvas como nombre de contacto y dispone de aplicación móvil. La identidad identificable del operador real, su ubicación y contacto deben publicarse conforme a la sección 2 de la Política de Privacidad; un nombre de equipo no crea una persona jurídica distinta.
2. Las instancias autoalojadas son gestionadas por sus operadores reales, que deben publicar información y condiciones adaptadas a su configuración y a la ley aplicable, sin limitarse a copiar el nombre o las promesas de la instancia alojada.

El servicio alojado permite aprendizaje, desarrollo y pruebas de comunicación ordinaria a personas de al menos 16 años con la capacidad contractual necesaria. No promete SLA, personal disponible las 24 horas, alojamiento permanente ni certificación de cumplimiento. No es adecuado para emergencias, conservación legal ni como única copia importante; véase [Alcance del servicio y soporte](/es/mail/service-scope/).

## 2. Definición de los roles de tratamiento de datos

Los roles dependen de quién determina realmente los fines y medios de cada tratamiento, no solo de etiquetas de código abierto, autoalojamiento o contractuales. La ley aplicable tampoco depende únicamente de la ubicación del operador. La aplicación del RGPD exige valorar actividades de establecimiento, oferta de bienes o servicios a personas en la Unión o seguimiento de su conducta allí; que el sitio sea accesible desde la Unión no basta por sí solo.

![Roles de publicación de código, operación de instancias y uso](/images/mail/es/self-host-responsibilities.svg)

*Figura: publicar código no equivale a operar la instancia ajena; los autores que también operan servicios o determinan tratamientos responden por su rol real.*

| Escenario | Responsable del tratamiento | Encargado del tratamiento |
| --- | --- | --- |
| Instancia alojada | El operador responde por los tratamientos de cuenta, seguridad y comunicación cuyos fines y medios determina; los roles respecto a mensajes dependen del uso real | Proveedores de infraestructura o entrega bajo acuerdos e instrucciones válidos; un mismo proveedor puede tener otro rol en tratamientos que determina por sí mismo |
| Instancia autoalojada | El desplegador normalmente es responsable de los tratamientos que determina; puede haber corresponsabilidad, responsabilidad independiente o tratamiento por cuenta ajena, sin exclusividad automática | Según servicios, contratos e instrucciones reales del despliegue, sin copiar directamente la lista de la instancia alojada |

Los autores y colaboradores que solo publican código o correcciones no asumen por ello obligaciones de operación o de responsable de otros despliegues. La distinción no los exime cuando operan realmente un servicio. Los usuarios particulares no se convierten automáticamente en responsables que instruyen al operador por enviar o recibir correo. El tratamiento para organizaciones requiere confirmar previamente su aceptación y celebrar por separado el acuerdo de encargo (DPA) necesario; el acuerdo no puede alterar los roles reales.

La ausencia de análisis de uso enviados al proyecto original no implica ausencia de solicitudes de red a terceros. La entrega, infraestructura, verificación humana, fuentes y funciones opcionales figuran en la [Lista de subencargados](/es/mail/sub-processors/).

## 3. Arquitectura documental

Cada documento explica materias distintas. Un aviso de privacidad no es consentimiento general a los tratamientos ni certificación del software o del servicio.

| Documento | Contenido |
| --- | --- |
| [Política de Privacidad](/es/mail/privacy-policy/) | Fuentes, fines y bases del tratamiento, conservación, derechos y transferencias internacionales |
| [Términos del Servicio](/es/mail/terms-of-service/) | Formación del contrato, uso, cambios, terminación, responsabilidad y recursos |
| [Política de Uso Aceptable](/es/mail/acceptable-use/) | Abusos prohibidos, pruebas autorizadas, medidas proporcionales y reclamaciones |
| [Tratamiento de datos y seguridad](/es/mail/data-security/) | Ciclo de vida, controles de seguridad y límites de cifrado y exportación |
| [Lista de subencargados](/es/mail/sub-processors/) | Proveedores, datos recibidos, activadores y acuerdos de transferencia |
| [Glosario](/es/mail/key-terms/) | Alcance de la terminología jurídica y técnica |
| [Correo oficial y verificación de integridad](/es/mail/tamper-proof/) | Identificación del correo del sistema e integridad documental, sin certificación pública ni de terceros |

Las funciones y el despliegue se describen en la [Guía de funciones](/es/mail/features/), [Modos de funcionamiento](/es/mail/modes/), [Guía de despliegue](/es/mail/deployment/) y [Marco legal del autoalojamiento](/es/mail/open-source/).

## 4. Orden de prelación

1. Prevalecen las normas imperativas aplicables y los derechos irrenunciables de datos y del consumidor. La elección de ley o tribunal no elimina el acceso legal a tribunales locales o autoridades de control.
2. Dentro de esos límites, la Política de Privacidad trata la privacidad, los Términos las condiciones del servicio y la Política de Uso Aceptable la conducta. Las dudas se interpretan según materia y ley; los documentos complementarios no amplían las exenciones de responsabilidad.
3. La versión oficial en chino tradicional queda sujeta a las garantías lingüísticas y del consumidor indicadas al inicio. El aviso, consentimiento necesario y aplicación de cambios importantes siguen la sección 12 de los Términos y la Política de Privacidad; continuar usando no equivale automáticamente a consentir fines nuevos.

Consulte el [texto oficial del RGPD](https://eur-lex.europa.eu/eli/reg/2016/679/oj) para su ámbito y la [lista de miembros del CEPD](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en) para las autoridades de control.

## 5. Canales de contacto

- Privacidad, ejercicio de derechos y reclamaciones de datos: `privacy@epocanvas.com`.
- Cuentas, servicio y reclamaciones generales: mensajes internos o `admin@epocanvas.com`, también si no puede iniciar sesión.
- Código fuente: [GitHub Issues](https://github.com/shijianus/epomail/issues). No publique datos personales, credenciales o vulnerabilidades no divulgadas.
- Instancias autoalojadas: contacte al operador real identificado por el sitio.

Un buzón de privacidad no significa que se haya nombrado un delegado de protección de datos (DPO) o representante en la Unión. El operador debe evaluar las condiciones reales, efectuar los nombramientos legalmente exigibles y publicar contacto verificable.
