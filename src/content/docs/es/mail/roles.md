---
title: Control de permisos
description: Control de permisos de EpoCanvas Mail — los seis grupos de identidad, las claves de permiso una a una, el grupo por defecto y la protección de grupos, y la vinculación con el nivel del blog, a cargo del administrador.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.17**

El control de permisos es la interfaz de gestión de los grupos de identidad de la zona de administración (`#manage/admin/roles`, clave de permiso `role:query`); decide la cuota, las claves de permiso y la autorización de modelos de IA de cada grupo. El comportamiento en el lado del usuario de cada grupo figura en la sección 3 de [Modos de funcionamiento](/es/mail/modes/).

![Página de control de permisos de EpoCanvas Mail: la tabla de los seis grupos con sus cuotas, límites de envío, permisos de adjuntos y columnas de modelos de IA autorizados](/images/mail/es/ui/roles-guide.png)

*Figura: vista de conjunto de la arquitectura y la graduación de la página de control de permisos. La interfaz rotula como «sin límite» el envío y el almacenamiento del grupo Maestro.*

<details>
<summary>Guía visual: Los roles —  cinco columnas deciden qué puede hacer un grupo</summary>

La tabla de los seis grupos de identidad de la página de control de permisos: cinco columnas anotadas, una por cada una de las cinco dimensiones ajustables por grupo.

1. **Columna de identidad**: Los seis grupos —Usuario normal, Visitante, Usuario normal LV.0, LV.1, Moderador y Maestro— con su etiqueta de posicionamiento. El grupo decide los valores por defecto de las otras cuatro columnas; Visitante y Maestro están protegidos y no pueden eliminarse.
2. **Columna de cuota de almacenamiento**: Una cuota de almacenamiento de adjuntos por grupo (de 0 MB en el Visitante a 1024 MB en el Maestro, que la interfaz rotula «sin límite»). Al conectar un almacenamiento de objetos personal, los adjuntos nuevos dejan de consumir esta cuota.
3. **Columna de límite de envío**: La cuota diaria de envío (5 correos en el Usuario normal hasta 100 en el Moderador; el Maestro no tiene techo), con un contador que se restablece cada día. Los grupos a los que se prohíbe enviar —el Visitante— quedan señalados aquí.
4. **Columna de permisos de adjuntos**: Indica si se permite enviar y recibir adjuntos. Los grupos de «solo texto» envían correo sin adjuntos; los grupos que los tienen habilitados siguen sujetos a la cuota de almacenamiento y al límite por archivo.
5. **Columna de modelos de IA autorizados**: El conjunto de modelos de IA que puede invocar el grupo, en combinación con la cuota diaria y el límite de tasa del AI Hub de la configuración del sistema: la capacidad de IA se gradúa según la identidad.

</details>

## 1. Grupos y cuotas

| Grupo | Posicionamiento | Cuota de fábrica |
| --- | --- | --- |
| Visitante | Entorno de prueba de solo lectura | 0 buzones / 0 MB / envío prohibido |
| Usuario normal | Miembro básico | 5 correos / 1 buzón / 5 MB |
| Usuario normal LV.0 | Amigo certificado | 8 correos / 2 buzones / 10 MB |
| Usuario normal LV.1 | Estudioso activo | 10 correos / 3 buzones / 25 MB / adjuntos permitidos |
| Moderador | Cogestión | 100 correos / 10 buzones / 500 MB / adjuntos permitidos |
| Maestro | Autoridad suprema | Envío y número de buzones sin techo; almacenamiento de fábrica 1024 MB (la interfaz lo rotula «sin límite»), ajustable |

## 2. Claves de permiso una a una

Cada grupo se autoriza por claves de permiso (por ejemplo, `user:query` para consultar la lista de usuarios; `setting:query`／`setting:set` para el acceso de consulta y tratamiento a la configuración del sistema y al informe de auditoría). Las claves de permiso que exige cada interfaz de la zona de administración se enumeran una a una en la sección 4 de [Mapa de interfaz y rutas](/es/mail/interface/); los ajustes surten efecto de inmediato.

## 3. Grupo por defecto y protección

- El grupo por defecto al que entran las cuentas recién registradas es de fábrica el Visitante, y puede cambiarse a otro grupo;
- Los grupos Visitante y Maestro están protegidos: no pueden eliminarse;
- LV.0 y LV.1 se sincronizan automáticamente mediante la vinculación con el nivel del blog (vincular una cuenta del blog eleva a LV.0, la interacción activa eleva a LV.1);
- La autorización de modelos de IA se gradúa por grupo, en combinación con la cuota y el límite de tasa del AI Hub de la [Configuración del sistema](/es/mail/system/).

<details>
<summary>Guía visual: pasos de manejo del control de permisos</summary>

![Pasos de manejo del control de permisos](/images/mail/es/ui/roles.png)

1. Entre en el «Control de permisos» de la zona de administración (exige la clave de permiso `role:query`).
2. Coteje en la tabla de vista de conjunto de la arquitectura y la graduación la cuota de almacenamiento, el límite de envío y los permisos de adjuntos de los seis grupos (el grupo Maestro trae de fábrica 1024 MB, que la interfaz rotula «sin límite»).
3. Al editar un grupo ajuste su cuota, el interruptor de adjuntos y los modelos de IA autorizados; marque las claves de permiso una a una (p. ej. `user:query`, `setting:query`).
4. El grupo por defecto es de fábrica el Visitante y puede cambiarse a otro; los grupos Visitante y Maestro están protegidos y no pueden eliminarse.

</details>

## 4. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Comportamiento de los grupos en el lado del usuario | [Modos de funcionamiento](/es/mail/modes/) |
| Operación de cambio de grupo de una cuenta | [Lista de usuarios](/es/mail/users/) |
| Motor de IA y cuotas | [Guía de las tarjetas de configuración del sistema](/es/mail/system/) |
| Enlace entre registro y grupos | [Claves de registro](/es/mail/regkeys/) |
