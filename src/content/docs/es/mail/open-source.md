---
title: Marco legal del código abierto y el autoalojamiento
description: Marco legal del código abierto y el autoalojamiento de EpoCanvas Mail — el alcance de la licencia MIT, lo que queda fuera de ella, la posición de la entidad desplegadora como responsable del tratamiento, los acuerdos con terceros y las contribuciones.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.17**

Esta página expone el alcance de la licencia de código abierto de EpoCanvas Mail y la posición legal del autoalojamiento. No es un contrato de usuario para ninguna instancia: los usuarios de la instancia alojada se rigen por los [Términos del Servicio](/es/mail/terms-of-service/) y la [Política de Privacidad](/es/mail/privacy-policy/); los usuarios de una instancia autoalojada se rigen por las condiciones que publique su desplegador.

![Límites de responsabilidad de EpoCanvas Mail: el proyecto de código abierto ascendente proporciona el código fuente; la instancia la opera de forma independiente su operador, que asume la responsabilidad de responsable del tratamiento](/images/mail/es/self-host-responsibilities.svg)

*Figura: los límites de responsabilidad entre el software, su operador y sus usuarios. Los autores ascendentes no explotan ningún servicio de correo ni responden de la conducta de ninguna instancia.*

## 1. La licencia

El código fuente de este proyecto se publica bajo la Licencia MIT. Cualquier persona puede obtenerlo de forma gratuita y:

1. usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y vender copias del software;
2. a condición de incluir el aviso de derechos de autor original y esta licencia en todas las copias o partes sustanciales del software;
3. el software se proporciona «tal cual», sin garantía de ningún tipo, expresa o implícita, incluidas las garantías de comerciabilidad, de aptitud para un propósito determinado y de no infracción;
4. los autores o titulares de los derechos de autor no responden de ninguna reclamación, daño ni otra responsabilidad derivada del software o de su uso.

## 2. Fuera de la licencia

- La licencia MIT no concede derechos de marca ni de denominación comercial: los nombres EpoCanvas y Epomail, sus logotipos y sus recursos visuales no quedan licenciados por la publicación del código fuente;
- No puede emitirse declaración alguna que sugiera el respaldo de, o una colaboración con, el proyecto ascendente;
- Las distribuciones derivadas asumen su propio cumplimiento en materia de denominación e identidad de marca, y mantienen su propia declaración de diferencias respecto del código ascendente.

## 3. La posición legal de la entidad desplegadora

- Desde el momento del despliegue, la entidad desplegadora es el responsable del tratamiento respecto de los usuarios de su instancia, y los autores ascendentes no tienen acceso a los datos de la instancia (la división figura en la sección 2 de la [Descripción general de privacidad y condiciones](/es/mail/overview/));
- La entidad desplegadora debe a sus usuarios, conforme a la ley aplicable en su lugar de ubicación, el deber de información, la atención de los derechos de los interesados, el mantenimiento de la seguridad y el cumplimiento de las transferencias internacionales;
- Los documentos legales de este sitio (política de privacidad, términos del servicio, política de uso aceptable, tratamiento de datos, lista de subencargados) pueden servir como plantillas para los usuarios de una entidad desplegadora; deben revisarse conforme a la configuración real del desplegador, y la responsabilidad pasa al desplegador al adoptarlos;
- Los servicios de terceros que configura el desplegador (Cloudflare, Resend, Backblaze, Turso y otros) los contrata el propio desplegador, y sus condiciones vinculan entonces al desplegador y a sus usuarios — de manera independiente de la [lista de encargados del tratamiento](/es/mail/sub-processors/) de la instancia alojada.

## 4. Umbral técnico y responsabilidad de seguridad

El desplegador es responsable de completar la inyección de secretos y el arranque de la inicialización (los pasos figuran en la [Guía de despliegue](/es/mail/deployment/)), así como del control de acceso de la instancia, la custodia de claves y las actualizaciones posteriores; las correcciones de seguridad publicadas en el proyecto ascendente no llegan automáticamente a un despliegue que no se actualiza.

## 5. Contribuciones

- Los informes de errores y las propuestas pasan por los Issues del repositorio de GitHub; el código, por Pull Requests;
- Quien contribuye debe tener derecho sobre lo que envía; una vez fusionada, una contribución se distribuye bajo la licencia MIT junto con el código fuente;
- Las vulnerabilidades de seguridad no deben divulgarse en un issue público — notifíquelas de forma privada a través de los puntos de contacto de la sección 5 de la [Descripción general de privacidad y condiciones](/es/mail/overview/).

## 6. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Recorrido por los documentos legales y su orden de prelación | [Descripción general de privacidad y condiciones](/es/mail/overview/) |
| Pasos completos para desplegar su propia instancia | [Guía de despliegue](/es/mail/deployment/) |
| El alcance del servicio y el soporte de la instancia alojada | [Alcance del servicio y soporte](/es/mail/service-scope/) |
| Términos clave | [Glosario](/es/mail/key-terms/) |
