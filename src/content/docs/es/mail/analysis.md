---
title: Analítica
description: Página de analítica de EpoCanvas Mail — guía del administrador por los paneles de volumen de envío y recepción, tasa de interceptación, distribución de fuentes, curvas de crecimiento y uso de la IA.
---

**Fecha de entrada en vigor: 6 de octubre de 2026 | Versión: 5.15**

La página de analítica es el panel de datos de la zona de administración (`#manage/admin/analysis`, clave de permiso `analysis:query`); agrega los indicadores de correo, de usuarios y de uso de la IA de la instancia. El alcance de cada indicador cambia con el modo de correo: en el modo cifrado (Level 3) el lado administrativo no lee el contenido del correo de los usuarios y los recuentos pertinentes quedan a nivel de metadatos.

## 1. Vista general de los indicadores

| Panel | Contenido |
| --- | --- |
| Correo total | Total recibido, total enviado, número de mensajes eliminados |
| Usuarios | Número de usuarios registrados, usuarios activos, usuarios eliminados |
| Gobernanza | Tasa de interceptación del sistema, volumen de correo no deseado |
| Distribución | Distribución de fuentes del correo (entrega directa dentro del sitio, canales externos, etc.) |
| Tendencias | Curva de crecimiento de usuarios, curva de crecimiento del correo |
| IA | Tendencia de llamadas a la IA y de consumo de tokens, distribución de uso de los modelos de IA |

## 2. Usos típicos

- Evaluar si las cuotas de cada grupo de identidad necesitan ajustes (cotejando los valores de fábrica del [Control de permisos](/es/mail/roles/));
- Observar la tasa de interceptación y el volumen de correo no deseado, y ajustar en consecuencia las listas y palabras clave de la [Gestión de clasificación](/es/mail/category/);
- Vigilar la tendencia de llamadas a la IA y comprobar si la cuota diaria y el límite de tasa del AI Hub en la [Configuración del sistema](/es/mail/system/) son razonables.

## 3. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Gestión pormenorizada en la dimensión de usuarios | [Lista de usuarios](/es/mail/users/) |
| Configuración del motor de IA | [Guía de las tarjetas de configuración del sistema](/es/mail/system/) |
| Concesión de claves de permiso grupo por grupo | [Control de permisos](/es/mail/roles/) |
