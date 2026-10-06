---
title: Guía de seguridad de la cuenta
description: Guía de seguridad de la cuenta de EpoCanvas Mail — activación de la verificación en dos pasos en tres pasos, gestión de los códigos de recuperación, registro de llaves de acceso, comportamiento de la verificación al iniciar sesión y eliminación de la cuenta.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.16**

Esta página recorre una a una todas las acciones de la página «Configuración → Seguridad». El comportamiento general de la verificación en dos pasos (dispositivos de confianza, políticas obligatorias) se describe en la sección 4 de [Modos de funcionamiento](/es/mail/modes/); esta página cubre solo la configuración. Entrada: barra lateral «Configuración → Seguridad» (`#settings/security`).

![Página de seguridad de EpoCanvas Mail: cambio de contraseña y el centro de verificación en dos pasos con los tres segundos factores](/images/mail/ui/ui-security-2fa.png)

*Figura: la página de seguridad. Arriba, el nombre de usuario y la contraseña; abajo, el centro de verificación en dos pasos.*

## 1. Recorrido por la página de seguridad

| Bloque | Contenido |
| --- | --- |
| Nombre de usuario y contraseña | Cambio de nombre de usuario, cambio de contraseña (muestra la fecha del último cambio) |
| Centro de verificación en dos pasos | Estado del interruptor general, más tres tarjetas: aplicación de autenticación, códigos de recuperación de respaldo y llaves de acceso |
| Eliminación de la cuenta | Entrada de eliminación al pie de la página |

La visibilidad del centro sigue el modo de correo de la instancia: los modos privado y cifrado lo fuerzan a encendido para todo el sitio; solo en el modo de todo el correo (Level 1) puede el operador apagarlo.

## 2. Activación de la verificación en dos pasos (tres pasos)

1. En la tarjeta «Aplicación de autenticación» pulse «Configurar» y escanee el código QR con su aplicación de autenticación; si el escaneo falla, escriba manualmente la clave mostrada;
2. Introduzca el código de 6 dígitos de la aplicación de autenticación para confirmar la vinculación;
3. La página muestra entonces 10 códigos de recuperación: pulse «Copiar todo» o «Descargar .txt» para conservarlos, o imprímalos para guardarlos sin conexión. Cada código funciona una sola vez, para iniciar sesión cuando la aplicación de autenticación no esté disponible.

## 3. Gestión de los códigos de recuperación

- La tarjeta muestra en todo momento cuántos códigos quedan utilizables;
- Ver la lista completa o regenerarlos exige la contraseña de la cuenta;
- Regenere los códigos antes de agotarlos; un restablecimiento anula todos los códigos antiguos.

## 4. Llaves de acceso (Passkey)

1. En la tarjeta «Llaves de acceso» pulse «Añadir» y ponga un nombre a la llave (por ejemplo MacBook Touch ID, YubiKey 5C); el navegador o el sistema ejecuta entonces su flujo de registro;
2. Una llave de acceso recién registrada queda pendiente: actívela de inmediato aprobando con la aplicación de autenticación vinculada, o espere a que transcurra el bloqueo temporal de 30 días;
3. Una vez activa, su estado es active; use «Probar» para comprobar el flujo de desbloqueo y bórrela cuando deje de necesitarla.

## 5. Verificación al iniciar sesión

- Tras la contraseña, el segundo factor se ejecuta según lo configurado: un código dinámico, un código de recuperación o una llave de acceso, a su elección;
- Marcar «No volver a preguntar en este dispositivo» al iniciar sesión exime al dispositivo de nueva verificación durante 30 días (reglas en la sección 4 de [Modos de funcionamiento](/es/mail/modes/));
- Cuando el sistema detecta un entorno de inicio de sesión anómalo (multiubicación, concurrencia multi-IP) escala la exigencia: incluso tras superar el primer factor, se pide un segundo factor distinto;
- Apagar la verificación en dos pasos exige la contraseña de la cuenta más el código dinámico actual o un código de recuperación.

## 6. Eliminación de la cuenta

Al pie de la página se sitúa la entrada de eliminación de la cuenta. Tras la eliminación, los datos de la cuenta se tramitan según las cláusulas de supresión de la [Política de privacidad](/es/mail/privacy-policy/); exporte antes sus datos desde «Configuración → Datos» (véase la [Guía de notificaciones y reenvío](/es/mail/notify/)).

## 7. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Plazos de los dispositivos de confianza y reglas del inicio de sesión de terceros | [Modos de funcionamiento](/es/mail/modes/) |
| Las secciones de la configuración y dónde vive la seguridad | [Guía de configuración](/es/mail/settings/) |
| Exportación de datos, notificaciones y reenvío | [Guía de notificaciones y reenvío](/es/mail/notify/) |
| Cómo se almacenan las contraseñas y los tokens | [Tratamiento de datos y seguridad](/es/mail/data-security/) |
