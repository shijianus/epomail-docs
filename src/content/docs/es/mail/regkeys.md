---
title: Claves de registro
description: Claves de registro de EpoCanvas Mail — emisión de códigos de invitación, gestión de los usos disponibles y de la vigencia, y comprobación del registro de uso, a cargo del administrador.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.16**

Las claves de registro son la interfaz de códigos de invitación de la zona de administración (`#manage/admin/reg-keys`, clave de permiso `reg-key:query`); deciden quién puede registrarse en la instancia. Los tres modos del código de registro a escala de todo el sitio (obligatorio, desactivado u opcional) los decide la tarjeta de configuración del sitio de la [Configuración del sistema](/es/mail/system/).

![Figura: las claves de registro](/images/mail/es/ui/regkeys-guide.png)

*Figura: las claves de registro*
*Anotaciones: 1. *


## 1. Emisión

El cuadro de diálogo «Añadir» emite un código de registro cada vez, configurable:

| Campo | Descripción |
| --- | --- |
| Código de registro | Código aleatorio de 8 caracteres; pulse el botón de actualizar para regenerarlo |
| Grupo vinculado | Las cuentas registradas mediante este código entran en el grupo de identidad indicado (grupos en [Control de permisos](/es/mail/roles/)) |
| Vigencia | Una vez pasada la fecha de caducidad, no puede volver a usarse |
| Usos disponibles | 1–99999; cada registro con éxito lo descuenta una vez |

## 2. Gestión y comprobación

| Operación | Descripción |
| --- | --- |
| Lista | Muestra los usos restantes, el grupo vinculado y la vigencia; los tramos sensibles aparecen enmascarados desde la perspectiva del Visitante |
| Copiar | Copia el texto del código de registro con un clic para distribuirlo entre los invitados |
| Registro de uso | Muestra qué cuentas han usado el código |
| Eliminar | Deja el código sin validez de inmediato |
| Limpiar los no usados | Borra con un clic todos los códigos que aún no se hayan usado |

Una URL que lleve el parámetro de invitación (`?code=`／`?regKey=`／`?invite=`) prellena directamente el formulario de registro; véase la sección 5 de [Mapa de interfaz y rutas](/es/mail/interface/).

<details>
<summary>Guía visual: pasos de manejo de las claves de registro</summary>

1. Entre en las «Claves de registro» de la zona de administración (exige la clave de permiso `reg-key:query`).
2. Pulse «Añadir» para generar un código aleatorio de 8 caracteres (pulse el botón de actualizar para regenerarlo).
3. Vincule el grupo de identidad al que entrarán las cuentas registradas y fije la vigencia y los usos disponibles (1–99999).
4. Copie el código de registro y envíelo a los invitados; el «registro de uso» permite comprobar su consumo; «limpiar los no usados» deja sin validez de un clic todos los códigos aún sin usar.

</details>

## 3. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Modos del código de registro y flujos de la superficie de inicio de sesión | [Modos de funcionamiento](/es/mail/modes/) |
| Definición de los grupos de registro | [Control de permisos](/es/mail/roles/) |
| Interruptor del registro abierto | [Guía de las tarjetas de configuración del sistema](/es/mail/system/) |
| Responsabilidad de las cuentas registradas por invitación | [Términos del Servicio](/es/mail/terms-of-service/) |
