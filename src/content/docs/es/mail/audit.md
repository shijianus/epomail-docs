---
title: Informe de auditoría
description: "Informe de auditoría de EpoCanvas Mail — la consola de tickets de riesgo de cuatro paneles: conjuntos de columnas diferenciados para amenazas de abuso, auditoría de apelaciones, gestión de riesgos y registro de operaciones, con cajón de evidencia, tratamiento por lotes y adjudicación de apelaciones para administradores."
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

El informe de auditoría es la consola de tickets de riesgo de la zona de administración (`#manage/admin/audit`; la consulta requiere `setting:query`, y el tratamiento, la adjudicación y la limpieza requieren `setting:set`). Los tickets se conservan en una tabla de registro de auditoría independiente con historial paginado. Cuatro tarjetas de panel en la parte superior resumen cada una una clase de tickets; al hacer clic, la mesa de trabajo cambia a la tabla de tickets diferenciada de ese panel.

![Página de informe de auditoría de EpoCanvas Mail: cuatro tarjetas de panel en la parte superior y una tabla de tickets diferenciada, la tarjeta de amenazas de abuso muestra los contadores de pendientes y bloqueados, con una barra de herramientas con extensión por lotes, actualización, restablecimiento, exportación de datos, limpieza del historial y enlace a la documentación](/images/mail/es/ui/audit-guide.png)

*Figura: informe de auditoría. Las cuatro tarjetas marcan el rumbo, los tickets se estudian fila a fila, y el cajón de evidencia y la exportación CSV cierran el ciclo.*

<details>
<summary>Guía de la figura: informe de auditoría — seis anclas de la consola de tickets</summary>

Las seis zonas anotadas de la página: las cuatro tarjetas de panel fijan la orientación del estudio, y el cajón de evidencia y la exportación de datos rematan el trabajo.

1. **Tarjeta de amenazas de abuso**: el libro consolidado de cuentas de amenaza LV3 o superior (multicuenta, denuncias graves, reventa de cuentas, etc.), con un recuento en vivo de «pendientes N / bloqueados N»; al entrar en el panel de amenazas, la barra «lotes plegados automáticamente hoy» despliega los lotes de inspección rutinaria archivados automáticamente.
2. **Tarjeta de auditoría de apelaciones**: número de tickets de apelación presentados por los usuarios contra decisiones; entre en el panel de apelaciones para revisar cada formulario.
3. **Tarjeta de gestión de riesgos**: número de tickets de rutina como spam y saltos de IP por itinerancia; entre en el panel de riesgos y estudie por nivel de infracción.
4. **Tarjeta de registro de operaciones**: libro de tickets finalizados (bloqueos, desbloqueos, actualizaciones de archivo); entre en el panel de registros para retrazar todo el recorrido.
5. **Cajón de evidencia (Detalles)**: el botón «Detalles» de cada ticket abre un cajón de prueba de solo lectura: comparación lado a lado de la evidencia real frente a la de referencia, cronología completa del tratamiento y perfil de riesgo multidimensional.
6. **Exportar datos**: exporta los tickets del panel actual como CSV de columnas completas para su estudio fuera de línea y archivo.

</details>

## 1. Cuatro paneles y sus tablas de tickets diferenciadas

| Panel | Tickets incluidos | Columnas distintivas |
| --- | --- | --- |
| Amenazas de abuso | Cuentas de amenaza LV3+: multicuenta, denuncias graves, reventa de cuentas, etc. | Vista compacta de tratamiento: número, destino, estado, tipo, acción y opciones |
| Auditoría de apelaciones | Apelaciones de usuarios contra decisiones | N.º de ticket, grupo de identidad, tipo de infracción, alarmas, sugerencia, caducidad y autoridad final |
| Gestión de riesgos | Rutina de riesgo: spam, saltos de IP, etc. | Añade nivel de infracción, motivo de alarma y plazo |
| Registro de operaciones | Tratamientos finalizados y actualizaciones de archivo | Añade actualizaciones, última actualización y apelaciones |

Los cuatro paneles comparten los mismos filtros y herramientas por lotes: tras seleccionar tickets puede desbloquear, bloquear, prorrogar o eliminar por lotes; en el panel de amenazas las acciones por lotes se limitan a asignar responsable, iniciar revisión y liberar, para evitar sanciones permanentes masivas.

## 2. Estudio y tratamiento de los tickets

- Cada ticket lleva número, destino (correo e identificador de usuario), insignia de estado (pendiente, bloqueado, liberado, etc.), tipo de infracción y sugerencia de tratamiento; los tipos de infracción (envío abusivo, seguridad de cuenta, cumplimiento de contenido, evasión de cuotas, etc.) se alinean con la escalera sancionadora de la sección 6 de la [Política de uso aceptable](/mail/acceptable-use/);
- Las sugerencias provienen del motor de políticas (sugerir bloqueo, mantener bloqueo, bloqueo temporal de N días, observación continua, archivo rutinario, etc.), y la columna de autoridad final registra quién decidió: la política de riesgo del sistema (veredicto automático del motor), un auditor de seguridad o el administrador maestro;
- Las acciones en línea cubren desbloquear, volver a bloquear, prorrogar (7 / 30 / 90 días o permanente) y añadir notas de revisión; la columna de responsable distingue los programas automáticos del sistema de los administradores humanos.

## 3. Cajón de evidencia y cronología del tratamiento

«Detalles» abre el cajón de prueba del libro de bloqueos (solo lectura): el libro de bloqueos es un registro público y transparente para verificar evidencias y dejar constancia de los desbloqueos, y no puede alterarse a voluntad:

- **Ficha del caso**: número de caso, estado actual, correo del usuario, momento del bloqueo, último tratamiento, categoría de infracción, código de motivo y ventana de retención de la evidencia (180 días restantes);
- **Valoración de riesgo y fundamentos**: texto íntegro de la apelación, motivo de activación y explicación del tratamiento;
- **Cronología de ciclo completo**: registros desde el disparo de la regla (motor de políticas), la ejecución del bloqueo (sistema) hasta la liberación tras revisión manual (administrador);
- **Perfil de riesgo multidimensional**: comparación lado a lado de los «valores reales de evidencia de la cuenta» frente a los «valores de referencia / normales / umbral de riesgo»: huella de dispositivo, cliente, IP de activación, cuentas por IP, topología de subred, denuncias y tasa de envío, punto por punto.

## 4. Adjudicación de apelaciones y enlace con el tratamiento

Los tickets de apelación los adjudica un administrador tras verificar el cajón de evidencia: liberar o rechazar; liberar restablece de inmediato la capacidad de envío; los bloqueos también pueden ejecutarse desde la [lista de usuarios](/mail/users/). La escalera sancionadora y los derechos de apelación están en la sección 6 de la [Política de uso aceptable](/mail/acceptable-use/).

<details>
<summary>Guía de la figura: estudio de un aviso</summary>

![Estudio de un aviso](/images/mail/es/ui/audit.png)

1. Abra «Informes de operaciones» en la zona de administración (consulta con `setting:query`, tratamiento con `setting:set`).
2. Haga clic en una tarjeta de panel para cambiar el conjunto de tickets, o filtre por estado, tipo de infracción o nivel de riesgo.
3. Abra el cajón de evidencia «Detalles» y coteje la comparación de pruebas y la cronología.
4. Trate según el panel: desbloquear, volver a bloquear, prorrogar o añadir notas; en apelaciones, liberar o rechazar.
5. Use «Exportar datos» para archivar en CSV los tickets del panel actual.

</details>

## 5. Exportación, limpieza y vinculación con el modo

- **Exportar datos**: exporta los tickets del panel actual como CSV de columnas completas (con BOM, abrible directamente en hojas de cálculo);
- **Limpiar registros históricos**: un clic elimina los registros de inspección rutinaria no críticos (solo registros de auditoría de riesgo normal); los libros de bloqueos y apelaciones no se tocan;
- **Barra de fusible**: cuando se dispara el fusible global, aparece una barra de aviso en la parte superior del panel de amenazas; durante el fusible las nuevas infracciones solo se retienen y no se bloquean cuentas automáticamente;
- **Vinculación con el modo de correo**: en el modo cifrado (Level 3) las marcas de tiempo se anonimiza; los tickets pueden estudiarse por tipo y evidencia, pero no puede reconstruirse el orden de los hechos.

## 6. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Configuración de los umbrales de aviso | [Las tarjetas de configuración del sistema](/mail/system/) |
| Bloqueo y restauración de cuentas | [Lista de usuarios](/mail/users/) |
| Comportamiento del control de riesgo en el inicio de sesión | [Guía de seguridad de la cuenta](/mail/security/) |
| Escalera sancionadora y derechos de apelación | [Política de uso aceptable](/mail/acceptable-use/) |
