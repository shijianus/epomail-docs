---
title: Marco legal del código abierto y el autoalojamiento
description: Alcance de MIT, distinción entre autores y operadores reales y deberes de protección de datos en autoalojamiento.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.21**


<!-- legal-review-draft -->
:::caution[Borrador de revisión jurídica: no es el aviso vigente]
Este borrador recoge cláusulas propuestas y cuestiones pendientes de verificación. No sustituye al aviso vigente ni certifica el cumplimiento. No debe utilizarse para activar tratamientos antes de verificar la identidad y los datos de contacto legalmente exigidos al operador, las bases jurídicas reales, los destinatarios y las garantías de transferencia, la conservación y la supresión, y de facilitar la información requerida. La versión de referencia es la base de redacción en chino tradicional, no una entrada en vigor. Las obligaciones legales y los derechos existentes no se alteran.
:::

Esta página explica la licencia y las responsabilidades del autoalojamiento de EpoCanvas Mail. El proyecto lo mantiene una persona sin ánimo de lucro para aprender y probar; el servicio alojado sigue por separado los [Términos del Servicio](/es/mail/terms-of-service/) y la [Política de Privacidad](/es/mail/privacy-policy/). Los desplegadores deben ofrecer condiciones e información sobre sus servicios reales.

La versión en chino tradicional (Taiwán) es la oficial; los demás idiomas son traducciones de referencia. Esta disposición no limita la información clara exigida por la ley aplicable, la interpretación favorable al consumidor ni los derechos irrenunciables. La fecha registra una revisión del texto sin modificar la licencia MIT que acompaña al código.

![Roles al publicar código y operar una instancia](/images/mail/es/self-host-responsibilities.svg)

*Figura: publicar código no convierte al autor en operador del despliegue ajeno; si opera servicios o determina tratamientos, asume las obligaciones correspondientes.*

## 1. La licencia

El código se rige por la licencia MIT adjunta. Esta sección es un resumen que debe leerse con el texto original completo.

1. Se permite usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y vender copias; el fin no lucrativo del proyecto no revoca el uso comercial que MIT permite.
2. Las copias o partes sustanciales deben conservar los avisos originales de autoría y autorización.
3. La licencia contiene suministro tal cual y exclusión de garantías, con efecto en el ámbito permitido por la ley.
4. Las exclusiones no prevalecen sobre normas imperativas ni eximen automáticamente al autor de responsabilidades por operar servicios separados, tratar datos realmente o asumir compromisos propios.

## 2. Fuera de la licencia

- MIT no otorga por sí mismo respaldo de marca ni condición de socio. Nombres y marcas siguen sus derechos y leyes; los recursos visuales dependen de sus licencias reales.
- Los sitios autoalojados deben identificar al operador real y no atribuirse falsamente operación, certificación o colaboración oficial.
- Conviene describir diferencias de versiones derivadas para facilitar mantenimiento y seguridad; esta página no añade restricciones de uso del código contrarias a MIT.

## 3. La posición legal de la entidad desplegadora

- Los roles dependen de los fines y medios de cada actividad. El desplegador suele ser responsable de lo que determina, pero puede ser corresponsable o tratar por cuenta ajena; autoalojar no crea exclusividad, ni cada particular es automáticamente responsable.
- La ley aplicable va más allá de la ubicación del desplegador. Deben valorarse establecimiento o alcance extraterritorial del RGPD, confidencialidad y protección imperativa del consumidor; no tener ánimo de lucro no exime. Véanse los roles en la sección 2 de la [Visión general](/es/mail/overview/).
- Estos textos pueden orientar avisos, pero deben verificarse identidad, contacto, fuentes, funciones, conservación y transferencias. Tratar para una organización exige aceptación previa y DPA separado cuando proceda; copiar documentos o atribuir etiquetas no sustituye bases legales ni medidas reales.
- Las relaciones con terceros siguen servicios y contratos reales; algunos proveedores son responsables independientes de ciertas actividades. No imponga todas sus condiciones a todos los usuarios. Verifique proveedores y transferencias; la [Lista de subencargados](/es/mail/sub-processors/) alojada no es garantía universal.

## 4. Umbral técnico y responsabilidad de seguridad

Use la [Guía de despliegue](/es/mail/deployment/) para claves, permisos y actualizaciones, y evalúe copias, borrado, incidentes y seguridad necesaria. Las correcciones originales no actualizan automáticamente todos los despliegues; un entorno de pruebas no autoriza uso arbitrario de datos reales.

Publicar código por sí solo no ofrece SLA, asistencia las 24 horas, alojamiento permanente o certificación. Los operadores reales deben cumplir seguridad y atención de derechos según riesgo y ley. Cifrado y controles de acceso no garantizan ausencia de filtraciones; límites en [Tratamiento de datos y seguridad](/es/mail/data-security/).

## 5. Contribuciones

- Los errores y propuestas pueden enviarse a [GitHub Issues](https://github.com/shijianus/epomail/issues), el código mediante Pull Request; no se promete aceptar cada envío ni un plazo de respuesta.
- Los colaboradores deben tener derecho a aportar bajo la licencia del repositorio y mantener avisos de terceros necesarios. Aportar por sí solo no convierte en operador o responsable del tratamiento.
- Envíe vulnerabilidades no divulgadas y datos personales por privado según la sección 5 de la [Visión general](/es/mail/overview/); informar de buena fe e investigar lícitamente no pierde protección por criticar el proyecto.

## 6. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Documentos legales, roles y prelación | [Visión general](/es/mail/overview/) |
| Pasos de configuración del autoalojamiento | [Guía de despliegue](/es/mail/deployment/) |
| Funciones alojadas y límites de soporte | [Alcance del servicio y soporte](/es/mail/service-scope/) |
| Terminología jurídica y técnica | [Glosario](/es/mail/key-terms/) |
