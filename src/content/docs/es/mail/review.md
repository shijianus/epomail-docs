---
title: Revisión del correo de todo el almacén
description: Revisión del correo de todo el almacén de EpoCanvas Mail — búsqueda en la dimensión del correo, panel deslizante de detalle y eliminación física a cargo del administrador, con el efecto del modo de correo sobre la entrada.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.17**

La revisión del correo de todo el almacén es la interfaz de la dimensión de correo de la zona de administración (`#manage/admin/mail`, clave de permiso `all-email:query`). El nombre de la sección y su alcance visible cambian con el modo de correo: el modo de todo el correo (Level 1) muestra «Todo el correo», el modo privado (Level 2) muestra «Correo no deseado» y el modo cifrado (Level 3) oculta la sección entera (véase la sección 2 de [Modos de funcionamiento](/es/mail/modes/)).

![Figura: la revisión del correo de todo el almacén](/images/mail/es/ui/review-guide.png)

*Figura: la revisión del correo de todo el almacén*

<details>
<summary>Guía visual: La revisión del correo en modo privado —  tres puntos visibles</summary>

El aspecto de la revisión de todo el almacén en el modo privado (Level 2): la sección se muestra como «Correo no deseado», y el cuadro de búsqueda y el estado vacío son las dos regiones anotadas.

1. **Cuadro de búsqueda**: Admite la sintaxis avanzada con `$` sobre todo el almacén: `$sender`/`$user`/`$to`/`$subject` más tokens de estado. Pulsando con el botón derecho sobre cualquier correo de la lista de resultados se lanza directamente una nueva búsqueda por su remitente, su cuenta destinataria o su usuario propietario.
2. **Nombre de la sección en la barra lateral**: El nombre y el alcance visible cambian con el modo de correo: Level 1 muestra «Todo el correo», Level 2 muestra «Correo no deseado» y Level 3 oculta la entrada por completo.
3. **Zona de estado vacío**: El aviso de marcador cuando no hay correo en cuarentena. Cuando lo hay, esta zona pasa a ser una lista; al abrir un mensaje se entra en el panel deslizante de detalle, donde puede ejecutarse el borrado físico (a diferencia de la papelera del lado del usuario, la operación queda registrada).

</details>

## 1. Búsqueda

- La sintaxis avanzada con `$` de la barra superior abarca todo el almacén: `$sender`／`$user`／`$to`／`$subject` más tokens de estado; el significado de cada uno figura en la sección 5 de [Referencia de búsqueda y reglas](/es/mail/search/);
- Pulsar con el botón derecho sobre cualquier correo de la lista de resultados inicia directamente una nueva búsqueda por su remitente, por su cuenta destinataria o por su usuario propietario.

## 2. Detalle y tratamiento

| Capacidad | Descripción |
| --- | --- |
| Panel deslizante de detalle | Abra un mensaje para ver su contenido completo y su información de entorno sin abandonar la lista |
| Eliminación física | Ejecuta el borrado físico del correo infractor (a diferencia de la papelera del lado del usuario); la operación queda registrada |
| Ordenación | Ordena por tiempo para localizar los eventos recientes |

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
