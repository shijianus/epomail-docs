---
title: Informe de auditoría
description: Informe de auditoría de EpoCanvas Mail — estudio de los avisos de las cuatro clases, botones de tratamiento, adjudicación de apelaciones y supresión de las marcas de tiempo en el modo cifrado, a cargo del administrador.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.16**

El informe de auditoría es la interfaz de avisos de riesgo de la zona de administración (`#manage/admin/audit`; la consulta exige `setting:query`, y el tratamiento y la adjudicación, `setting:set`). Los avisos se persisten en una tabla de registro de auditoría independiente, con búsqueda histórica paginada.

![Página de informe de auditoría de EpoCanvas Mail: los avisos de las cuatro clases, la información de entorno en texto plano y los botones de tratamiento](/images/mail/ui/ui-audit-report.png)

*Figura: el informe de auditoría. Cada aviso lleva su clase, su prioridad, su estado y el conjunto de entornos activos mostrado en texto plano.*

## 1. Las cuatro clases de alertas

| Clase de alerta | Situación que la dispara | Tratamiento habitual |
| --- | --- | --- |
| Alerta de auditoría | Una denuncia o infracción señalada por otros usuarios queda acreditada | Verificar y después liberar o actuar |
| Alerta de riesgo | Cruzar una línea roja de seguridad o un entorno de inicio de sesión anómalo (p. ej., inicios multi-IP y multiubicación simultáneos) | Seguimiento estrecho, entrevista o bloqueo |
| Alerta de bloqueo | La cuenta ha sido bloqueada automáticamente por el sistema o manualmente por un administrador | Levantar la alerta o mantener el bloqueo |
| Alerta de recurso | El usuario ha recurrido una decisión de tratamiento | Liberar (levantar el bloqueo) o rechazar |

## 2. Información de los avisos y tratamiento

- Cada aviso lleva su clase, su prioridad (P0, P1…), su estado y la información de entorno completa (IP, geolocalización, dispositivo, huella), todo presentado en texto plano y sin marcos anidados;
- Los botones de tratamiento se reparten por clase: la alerta de recurso destaca «Liberar», la alerta de bloqueo destaca «Levantar la alerta» y las alertas ordinarias ofrecen un menú de operaciones estándar;
- En el modo cifrado (Level 3) las marcas de tiempo de los registros se eliminan y la columna de tiempo se oculta; los avisos siguen pudiendo estudiarse.

## 3. Adjudicación de apelaciones

El administrador verifica el entorno y el motivo de cada aviso de recurso antes de «liberar» o rechazar; la escala de aplicación y el derecho de apelación del usuario figuran en la sección 6 de la [Política de Uso Aceptable](/es/mail/acceptable-use/). La entrada de ejecución del bloqueo está en la [Lista de usuarios](/es/mail/users/).

<details>
<summary>Guía visual: pasos de estudio de los avisos del informe de auditoría</summary>

![Pasos de estudio de los avisos del informe de auditoría](/images/mail/es/ui/audit.png)

1. Entre en el «Informe de auditoría» de la zona de administración (la consulta exige `setting:query`, y el tratamiento y la adjudicación, `setting:set`).
2. Filtre los avisos por clase (auditoría／riesgo／bloqueo／recurso) y por prioridad.
3. Verifique la información de entorno presentada en texto plano: IP, geolocalización, dispositivo y huella.
4. Trate cada aviso según su clase: en la alerta de recurso, «Liberar»; en la alerta de bloqueo, «Levantar la alerta»; las alertas ordinarias ofrecen un menú de operaciones estándar.
5. En el modo cifrado las marcas de tiempo se eliminan y los avisos siguen pudiendo estudiarse; el resultado del tratamiento determina el bloqueo y la restauración del lado del usuario.

</details>

## 4. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Configuración de los umbrales de alerta | [Guía de las tarjetas de configuración del sistema](/es/mail/system/) |
| Operaciones de bloqueo y restauración | [Lista de usuarios](/es/mail/users/) |
| Comportamiento en el inicio de sesión tras un disparo de riesgo | [Guía de seguridad de la cuenta](/es/mail/security/) |
| Escala de aplicación y derecho de apelación | [Política de Uso Aceptable](/es/mail/acceptable-use/) |
