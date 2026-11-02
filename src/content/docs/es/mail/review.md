---
title: Revisión del correo de todo el almacén
description: Revisión del correo de todo el almacén de EpoCanvas Mail — búsqueda en la dimensión del correo, panel deslizante de detalle y eliminación física a cargo del administrador, con el efecto del modo de correo sobre la entrada.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

La revisión del correo de todo el almacén es la interfaz de la dimensión de correo de la zona de administración (`#manage/admin/mail`, clave de permiso `all-email:query`). El nombre de la sección y su alcance visible cambian con el modo de correo: el modo de todo el correo (Level 1) muestra «Todo el correo»; el modo privado (Level 2) muestra «Correo no deseado», aunque el alcance administrativo también incluye la papelera de los usuarios y el correo sin propietario; el modo cifrado (Level 3) oculta la entrada y limita los resultados de las listas administrativas. Estas restricciones se aplican a la interfaz de la aplicación y no acreditan que el operador sea incapaz de descifrar datos en el servidor; véase la sección 2 de [Modos de funcionamiento](/es/mail/modes/).

![Figura: la revisión del correo de todo el almacén](/images/mail/es/ui/review-guide.png)

*Figura: la revisión del correo de todo el almacén*

<details>
<summary>Guía visual: La revisión del correo en modo privado —  tres puntos visibles</summary>

El aspecto de la revisión de todo el almacén en el modo privado (Level 2): la sección se muestra como «Correo no deseado», y el cuadro de búsqueda y el estado vacío son las dos regiones anotadas.

1. **Cuadro de búsqueda**: Admite la sintaxis avanzada con `$` sobre todo el almacén: `$sender`/`$user`/`$to`/`$subject` más tokens de estado. Pulsando con el botón derecho sobre cualquier correo de la lista de resultados se lanza directamente una nueva búsqueda por su remitente, su cuenta destinataria o su usuario propietario.
2. **Nombre de la sección en la barra lateral**: El nombre y el alcance visible cambian con el modo de correo: Level 1 muestra «Todo el correo», Level 2 muestra «Correo no deseado» y Level 3 oculta la entrada por completo.
3. **Zona de estado vacío**: Muestra un aviso cuando no hay resultados; en el modo privado, los resultados pueden incluir correo no deseado, mensajes de la papelera de los usuarios o correo sin propietario. Abrir el detalle exige un motivo lícito y necesario; el alcance de la supresión física se explica a continuación.

</details>

## 1. Búsqueda

- La sintaxis avanzada con `$` de la barra superior abarca todo el almacén: `$sender`／`$user`／`$to`／`$subject` más tokens de estado; el significado de cada uno figura en la sección 5 de [Referencia de búsqueda y reglas](/es/mail/search/);
- Pulsar con el botón derecho sobre cualquier correo de la lista de resultados inicia directamente una nueva búsqueda por su remitente, por su cuenta destinataria o por su usuario propietario.

## 2. Detalle y tratamiento

| Capacidad | Descripción |
| --- | --- |
| Panel deslizante de detalle | Muestra el contenido y los registros del correo dentro de lo permitido por el modo y los permisos actuales; no verifica el mensaje original completo, el entorno ni las condiciones de seguridad de la transmisión |
| Eliminación física | Elimina datos de los almacenamientos operativos correspondientes; deben comprobarse por separado los reintentos de objetos fallidos, los respaldos, las copias externas y el alcance de los registros. No equivale a borrar inmediatamente todas las copias |
| Ordenación | Ordena por tiempo para localizar los eventos recientes |

Las restricciones de las listas administrativas según el modo no constituyen cifrado de extremo a extremo ni aislamiento técnico absoluto frente al operador. En el modo privado, trasladar a la papelera un correo que estaba protegido puede hacer que su asunto, cuerpo y código de verificación se guarden descifrados y queden al alcance de la administración. La revisión sigue requiriendo un motivo concreto, necesario y lícito; poder abrir un mensaje no autoriza a utilizarlo para aprender. Véase la sección 4 de la [Política de Privacidad](/es/mail/privacy-policy/).

Las cuentas sospechosas halladas en la revisión pueden saltar a la [Lista de usuarios](/es/mail/users/) para su tratamiento; los eventos de riesgo entran según su clase en el [Informe de auditoría](/es/mail/audit/).

<details>
<summary>Guía visual: pasos de la revisión del correo de todo el almacén</summary>

1. Entre en «Todo el correo» de la zona de administración (en el modo privado se muestra como «Correo no deseado», y en el modo cifrado la sección se oculta).
2. Busque desde la barra superior con la sintaxis avanzada de `$`, p. ej. `$user:<correo>` o `$subject:<palabra clave>`; los tokens de estado filtran enviado／eliminado／sin destinatario.
3. Pulse con el botón derecho sobre cualquier correo de la lista para iniciar directamente una nueva búsqueda por su remitente, por su cuenta destinataria o por su usuario propietario.
4. Abra el panel deslizante de detalle para verificar el contenido y la información de entorno antes de ejecutar la eliminación física (a diferencia de la papelera del lado del usuario).

</details>

## 3. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Búsqueda con `$` y tokens de estado | [Referencia de búsqueda y reglas](/es/mail/search/) |
| Modo de correo y alcance visible del lado administrativo | [Modos de funcionamiento](/es/mail/modes/) |
| Estudio de las denuncias y de los avisos | [Informe de auditoría](/es/mail/audit/) |
| Tratamiento en la dimensión de usuarios | [Lista de usuarios](/es/mail/users/) |
