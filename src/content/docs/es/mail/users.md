---
title: Lista de usuarios
description: Lista de usuarios de EpoCanvas Mail — búsqueda de cuentas, restablecimiento de contraseña, cambio de grupo de identidad, restablecimiento de la verificación en dos pasos, bloqueo y restauración, a cargo del administrador.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.17**

La lista de usuarios es la interfaz de gestión de cuentas de la zona de administración (`#manage/admin/users`, clave de permiso `user:query`); permite al administrador buscar y tratar todas las cuentas del sitio.

![Figura: la lista de usuarios](/images/mail/es/ui/users-guide.png)

*Figura: la lista de usuarios*

<details>
<summary>Guía visual: La lista de usuarios —  de localizar una cuenta a actuar en la fila</summary>

Cuatro regiones anotadas de la lista de usuarios: de la búsqueda al tratamiento en la propia fila, el recorrido de gestión de cuentas del administrador se completa en una sola pantalla.

1. **Cuadro de búsqueda por correo**: En la parte superior se localizan las cuentas por correo, con paginación y ordenación inmediatas. Junto con los contadores de envío y recepción, de ocupación de almacenamiento y de correo no deseado o denuncias de cada fila, permite detectar con rapidez las cuentas anómalas.
2. **Columna de correo del usuario**: El identificador único de la cuenta: el correo es el nombre de la cuenta y la referencia para iniciar sesión, recibir correo y cualquier autorización. Las operaciones de la fila (restablecer la contraseña, cambiar el grupo, bloquear) actúan sobre la cuenta que señala esta columna; los demás contadores de la página —envío y recepción, almacenamiento, y correo no deseado o denuncias— son los que permiten juzgar si una cuenta resulta anómala.
3. **Columna de espacio de almacenamiento**: El uso en tiempo real del almacenamiento de adjuntos de esa cuenta; cotejándolo con la cuota de su grupo de identidad (véase el control de permisos) se decide si conviene ampliarlo o limpiarlo.
4. **Columna de ajustes (operaciones)**: Operaciones de gestión en la fila: restablecer la contraseña (emite una contraseña de un solo uso), cambiar el grupo de identidad, restablecer la verificación en dos pasos, bloquear y restaurar, y vaciar el correo del usuario (irreversible; úsese con cautela).

</details>

## 1. Lista y búsqueda

La lista presenta cada cuenta en una fila con dimensiones como su correo, su volumen de envío y recepción, su almacenamiento ocupado y sus contadores de correo no deseado y de denuncias; en la parte superior se puede buscar por correo. Paginación y ordenación responden al instante.

## 2. Operaciones sobre las cuentas

| Operación | Descripción |
| --- | --- |
| Restablecer contraseña | Emite una nueva contraseña de un solo uso para la cuenta y le notifica que vuelva a iniciar sesión |
| Cambiar el grupo de identidad | Cambia el grupo al que pertenece la cuenta; cuotas y permisos conmutan al momento (definiciones de los grupos en [Control de permisos](/es/mail/roles/)) |
| Restablecer la verificación en dos pasos | Vía de emergencia cuando la cuenta no logra superar la segunda verificación; borra su configuración de TOTP y de llaves de acceso |
| Bloqueo y restauración | Tras el bloqueo, la cuenta pierde sus sesiones de inmediato; restaurada, puede volver a iniciar sesión |
| Vaciar el correo del usuario | Borra el correo bajo esa cuenta (irreversible; úselo con cautela) |

## 3. Enlace entre tratamiento y apelación

El bloqueo entra en el [Informe de auditoría](/es/mail/audit/) como un aviso; el usuario tratado puede apelar por el portal de apelaciones o por los canales del sitio, y el administrador estudia el caso. La escala de aplicación y el principio de proporcionalidad figuran en la sección 6 de la [Política de Uso Aceptable](/es/mail/acceptable-use/).

<details>
<summary>Guía visual: pasos de manejo de la lista de usuarios</summary>

1. Entre en la «Lista de usuarios» de la zona de administración (exige la clave de permiso `user:query`).
2. Localice la cuenta por su correo en el cuadro de búsqueda de la parte superior.
3. En el menú de operaciones de cada fila elija: restablecer la contraseña, cambiar el grupo de identidad, restablecer la verificación en dos pasos, bloquear y restaurar, o vaciar el correo del usuario.
4. El bloqueo y demás tratamientos entran en el informe de auditoría como avisos, a la espera de la adjudicación de las apelaciones.

</details>

## 4. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Grupos de identidad y plantillas de cuotas | [Control de permisos](/es/mail/roles/) |
| Revisión en la dimensión del correo de todo el sitio | [Revisión del correo de todo el almacén](/es/mail/review/) |
| Avisos y adjudicación de apelaciones | [Informe de auditoría](/es/mail/audit/) |
| Paneles de datos de conjunto | [Analítica](/es/mail/analysis/) |
