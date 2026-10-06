---
title: Exportación de datos y almacenamiento
description: Exportación de datos y almacenamiento de EpoCanvas Mail — copia de seguridad integral, archivo del historial de correo y exportación de contactos y configuración, además de la conexión de un almacenamiento de objetos personal.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.16**

Esta página cubre las dos partes —exportación y almacenamiento— de la página «Configuración → Datos». Las notificaciones y el reenvío de la misma página figuran en la [Guía de notificaciones y reenvío](/es/mail/notify/); la posición jurídica de los datos exportados, en [Tratamiento de datos y seguridad](/es/mail/data-security/).

![Página de datos de EpoCanvas Mail: las tres tarjetas de exportación, el indicador de uso de almacenamiento y la conexión del almacenamiento de objetos personal](/images/mail/es/ui/data-guide.png)

*Figura: la página de Datos. La exportación y la gestión del almacenamiento aparecen en la misma página; el uso de adjuntos computa contra la cuota del grupo de identidad.*
*Anotaciones: 1. usuario Data & M　2. correo & Message　3. almacenamiento S　4. Third-party apps*

## 1. Las tres exportaciones

| Exportación | Formato | Alcance |
| --- | --- | --- |
| Exportación integral de datos | JSON | Copia de seguridad completa: datos de la cuenta, historial de correo, contactos, reglas de clasificación y etiquetas, y ajustes de seguridad |
| Archivo del historial de correo | MBOX (universal), JSON o CSV | Solo el correo enviado y recibido, con rango de fechas opcional |
| Contactos y configuración | JSON | Directorio de contactos, reglas de alias personalizadas y preferencias de personalización |

Un mensaje suelto se descarga en .eml directamente desde la página de lectura. El correo de la papelera se elimina físicamente a los 7 días y no puede recuperarse; para conservarlo, expórtelo antes (véase la sección 8 de los [Términos del Servicio](/es/mail/terms-of-service/)).

## 2. Espacio de almacenamiento

- El indicador de uso de almacenamiento de adjuntos muestra en tiempo real el uso y la cuota; la cuota sigue al grupo de identidad (valores de fábrica en la sección 3 de [Modos de funcionamiento](/es/mail/modes/));
- Puede conectar un almacenamiento de objetos personal (un cubo de Backblaze B2 o S3 propio): una vez conectado, los adjuntos nuevos se guardan directamente en su nube y dejan de ocupar la cuota de la instancia; la recomendación de la plataforma por B2 se basa en su capa gratuita y en sus 0 de coste de tráfico saliente;
- La conexión puede retirarse en cualquier momento; una vez retirada, los adjuntos nuevos vuelven al almacenamiento de la instancia.

<details>
<summary>Guía visual: pasos de exportación y almacenamiento</summary>

![Pasos de exportación y almacenamiento](/images/mail/es/ui/data.png)

1. Entre en «Configuración → Datos».
2. La «exportación integral de datos» descarga en un solo paquete JSON una copia de seguridad completa (datos de la cuenta, historial de correo, contactos, reglas y ajustes de seguridad).
3. El «archivo del historial de correo» se descarga tras elegir el formato MBOX／JSON／CSV y el rango de fechas.
4. «Contactos y configuración» exporta el directorio de contactos y las preferencias de personalización.
5. El indicador de almacenamiento muestra el uso de adjuntos; pulse «conectar un almacenamiento de objetos» para vincular su propio cubo de Backblaze B2／S3: a partir de entonces los adjuntos nuevos se guardan directamente en su nube.

</details>

## 3. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Notificaciones y reenvío (la otra mitad de la misma página) | [Guía de notificaciones y reenvío](/es/mail/notify/) |
| Jerarquía de almacenamiento y principio de medición de cuotas | [Arquitectura técnica](/es/mail/architecture/) |
| Derechos del interesado y frecuencia de exportación | [Política de Privacidad](/es/mail/privacy-policy/) |
| Configuración administrativa relativa al almacenamiento | [Guía de las tarjetas de configuración del sistema](/es/mail/system/) |
