---
title: Exportación de datos y almacenamiento
description: Exportación y almacenamiento de EpoCanvas Mail — campos reales y límites de las tres exportaciones, y conexión de almacenamiento personal.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.21**

Esta página cubre las dos partes —exportación y almacenamiento— de la página «Configuración → Datos». Las notificaciones y el reenvío de la misma página figuran en la [Guía de notificaciones y reenvío](/es/mail/notify/); la posición jurídica de los datos exportados, en [Tratamiento de datos y seguridad](/es/mail/data-security/).

![Página de datos de EpoCanvas Mail: las tres tarjetas de exportación, el indicador de uso de almacenamiento y la conexión del almacenamiento de objetos personal](/images/mail/es/ui/data-guide.png)

*Figura: la página de Datos. La exportación y la gestión del almacenamiento aparecen en la misma página; el uso de adjuntos computa contra la cuota del grupo de identidad.*

<details>
<summary>Guía visual: Datos —  las cuatro regiones de la autonomía sobre tus datos</summary>

Las cuatro tarjetas de la página de datos: tres formatos para llevarse los datos, una zona de reenvío, una de almacenamiento y otra de autorizaciones de terceros —la interfaz completa de la autonomía sobre los datos personales.

1. **Tarjeta de exportación**: datos JSON, archivos de correo (MBOX/JSON/CSV) y perfil y etiquetas usan la misma respuesta del servidor. No se aplica el rango de fechas; los archivos .eml se reconstruyen con campos existentes.
2. **Tarjeta de reenvío de correo y mensajes**: Configuración detallada del push de mensajes de Telegram y del reenvío automático; que estas dos funciones estén disponibles para la cuenta lo decide el interruptor de «Control de datos de usuario» del administrador.
3. **Tarjeta de almacenamiento**: muestra uso medido de correo y adjuntos y cuota efectiva. Backblaze B2/S3 personal recibe adjuntos nuevos y omite la comprobación de cuota de su almacenamiento; siguen otras limitaciones. Desconectar no migra objetos antiguos.
4. **Tarjeta de aplicaciones**: muestra autorizaciones OAuth y su revocación. El servidor borra la autorización y registra su revocación, comprobada por userinfo para rechazar acceso. No garantiza invalidar simultáneamente sesiones externas, todos los tokens ni recuperar datos ya obtenidos.

</details>

## 1. Las tres exportaciones

| Exportación | Formato | Alcance |
| --- | --- | --- |
| Exportación integral de datos | JSON | Campos seleccionados de cuenta y perfil, campos de mensajes `is_del=0` y `customLabels`; excluye adjuntos, MIME original, contactos/alias completos, ajustes de seguridad y auditorías |
| Archivo del historial de correo | MBOX, JSON o CSV | El navegador convierte campos de la misma respuesta; el servidor ignora `type/format/range`, no filtra las fechas elegidas y excluye la papelera |
| Contactos y configuración | JSON | Solo el subconjunto profile devuelto, customLabels y fecha de exportación; no es copia completa de contactos, alias o preferencias |

Los .eml y MBOX se reconstruyen con campos existentes, sin MIME original completo ni adjuntos. La papelera usa la creación del mensaje superior a 7 días, sin garantizar otros 7 días tras moverlo. Guarde adjuntos aparte antes de borrar y revise el archivo; véase [Privacidad](/es/mail/privacy-policy/).

## 2. Espacio de almacenamiento

- El indicador de uso de almacenamiento de adjuntos muestra en tiempo real el uso y la cuota; la cuota sigue al grupo de identidad (valores de fábrica en la sección 3 de [Modos de funcionamiento](/es/mail/modes/));
- Un bucket personal Backblaze B2/S3 recibe adjuntos nuevos según su configuración. El almacenamiento de adjuntos omite la cuota del sistema, pero siguen las estadísticas y otras limitaciones. Tarifas y retención externa requieren confirmación; véase la [Lista de encargados](/es/mail/sub-processors/);
- Desconectar restablece la selección de almacenamiento del sistema; no migra ni borra objetos del bucket antiguo ni garantiza que sigan legibles. Véanse los límites de borrado en [Datos y seguridad](/es/mail/data-security/).

<details>
<summary>Guía visual: pasos de exportación y almacenamiento</summary>

![Pasos de exportación y almacenamiento](/images/mail/es/ui/data.png)

1. Entre en «Configuración → Datos».
2. «Exportación integral de datos» descarga campos seleccionados del perfil, mensajes no borrados y customLabels en JSON; gestione por separado adjuntos, contactos completos y ajustes de seguridad.
3. «Archivo del historial de correo»: elija MBOX/JSON/CSV y descargue; el navegador convierte el formato y el servidor no aplica el rango de fechas.
4. «Contactos y configuración» exporta el subconjunto profile y customLabels devueltos; compruebe si incluye los contactos y preferencias necesarios.
5. El indicador de almacenamiento muestra el uso de adjuntos; pulse «conectar un almacenamiento de objetos» para vincular su propio cubo de Backblaze B2／S3: a partir de entonces los adjuntos nuevos se guardan directamente en su nube.

</details>

## 3. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Notificaciones y reenvío (la otra mitad de la misma página) | [Guía de notificaciones y reenvío](/es/mail/notify/) |
| Jerarquía de almacenamiento y principio de medición de cuotas | [Arquitectura técnica](/es/mail/architecture/) |
| Derechos del interesado y frecuencia de exportación | [Política de Privacidad](/es/mail/privacy-policy/) |
| Configuración administrativa relativa al almacenamiento | [Guía de las tarjetas de configuración del sistema](/es/mail/system/) |
