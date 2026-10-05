---
title: Guía de las tarjetas de configuración del sistema
description: Guía de las tarjetas de configuración del sistema de EpoCanvas Mail — once tarjetas explicadas una a una, de la configuración del sitio a la personalización, la autenticación de terceros, el almacenamiento, el push de correo, el motor de IA, el control de datos de usuario, Turnstile, los avisos, los informes de operaciones y el acerca de.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.15**

La página de configuración del sistema (`#manage/admin/system`, claves de permiso `setting:query`／`setting:set`) organiza toda la configuración al nivel de la instancia en tarjetas. Esta página explica tarjeta por tarjeta; los nombres de las tarjetas coinciden con la interfaz de la aplicación.

## 1. Configuración del sitio

Registro abierto, perfiles públicos, modo de correo (tres niveles, véase la sección 2 de [Modos de funcionamiento](/es/mail/modes/)), verificación en dos pasos, dominio de inicio oculto, códigos de registro, buzones adicionales, cambio rápido multicuenta y reglas de prefijo de buzón — todos ellos interruptores al nivel de la instancia.

## 2. Personalización

Título del sitio, avisos emergentes e interfaz dinámica/estática; gobierna la presentación de marca de la superficie de inicio de sesión y de la interfaz.

## 3. Autenticación de terceros y SSO

Interruptor general del acceso rápido de terceros y configuración de credenciales por proveedor (GitHub, Google, Microsoft, Apple, SSO personalizado); la regla de visualización de tres estados de los botones de la página de inicio de sesión figura en la sección 4 de [Modos de funcionamiento](/es/mail/modes/). Esta tarjeta se muestra bajo un indicador de función subyacente y no se renderiza en el despliegue por defecto.

## 4. Almacenamiento y base de datos central

Almacenamiento de objetos (B2 / S3, con repliegue a R2 / KV por defecto), arquitectura de base de datos central y externa (Turso, entre otras), límite de adjunto único y borrado en cascada, control de salud de la caché KV. Los detalles técnicos figuran en [Arquitectura técnica](/es/mail/architecture/).

## 5. Push de correo

Bot de Telegram oficial (push de todo el sitio), preferencias de visualización de los campos del push (remitente, destinatario y cuerpo se muestran u ocultan uno por uno), reenvío global y reenvío por reglas; bloqueado en apagado en el modo cifrado. El bot privado del lado del usuario figura en la [Guía de notificaciones y reenvío](/es/mail/notify/).

## 6. Motor de IA e integración de modelos

Proveedor de IA a elegir entre dos (punto de enlace compatible con OpenAI personalizado o Cloudflare Workers AI), interruptor de activación, cuota diaria y límite de tasa, autorización de modelos por grupo de identidad (en combinación con el [Control de permisos](/es/mail/roles/)).

## 7. Control de datos de usuario

Gobierna los interruptores de capacidad de los usuarios normales en la página «Datos»: push de Telegram, reenvío de correo, soporte de API de terceros, almacenamiento propio y cuota de almacenamiento por defecto; la exportación de datos permanece siempre abierta, sin estar sujeta a esta tarjeta.

## 8. Verificación humana de Turnstile

Clave de sitio e interruptor de la verificación humana; actúa sobre las entradas públicas como el registro.

## 9. Aviso del sitio

Ventanas emergentes de avisos al iniciar sesión, envíos de anuncios por correo y plantillas de correo de bienvenida (multilingües, se entregan en el idioma de cada destinatario); la semántica de entrega del correo oficial figura en [Especificación del correo oficial y verificación contra manipulaciones](/es/mail/tamper-proof/).

## 10. Informes de operaciones

Umbrales operativos que disparan las alertas (generan los avisos del [Informe de auditoría](/es/mail/audit/)).

## 11. Acerca de

Información de la versión de la instancia y comprobación de actualizaciones (cotejo con GitHub Releases).

## 12. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Dónde aterrizan en el lado del usuario los cambios de capacidad de la cuenta | [Exportación de datos y almacenamiento](/es/mail/data/) |
| Cuotas por grupo y autorización de modelos | [Control de permisos](/es/mail/roles/) |
| Despliegue e inyección de secretos | [Guía de despliegue](/es/mail/deployment/) |
| Efecto de los interruptores en la interfaz | [Modos de funcionamiento](/es/mail/modes/) |
