---
title: Guía de desarrollo
description: Guía de desarrollo de EpoCanvas Mail — estructura del repositorio, entorno local, suites de pruebas e inspección, la disciplina de seis idiomas, la disciplina de migraciones, el flujo de trabajo de cinco pasos y cómo contribuir.
---

**Fecha de entrada en vigor: 5 de octubre de 2026 | Versión: 5.16**

Esta página va dirigida a administradores y desarrolladores que trabajen sobre, auditen o construyan a partir de EpoCanvas Mail: la estructura del repositorio, el entorno local, el sistema de aseguramiento de la calidad y el flujo de trabajo de ingeniería. Los pasos para ejecutar un despliegue figuran en la [Guía de despliegue](/es/mail/deployment/); no se repiten aquí.

## 1. Estructura del repositorio

```text
epomail/
├── mail-vue/        Front end: Vue 3 + Vite + Element Plus (interface, i18n dictionaries, PWA)
├── mail-worker/     Back end: Cloudflare Worker (API, inbound parsing, AI, D1/KV/R2)
├── temp_login_ui/   Login surface: React app (folded into mail-worker/dist/login at build time)
├── tests/           Automated tests, public end-to-end assertions and inspection scripts
├── scripts/         Tooling (the i18n audit trio, seeding, build helpers)
├── doc/             Archive of long-form analyses
├── EpomailDocs/     This documentation site (a separate git repository)
└── CHECKLIST.log / REPORTS.md   Task log and audit archive
```

## 2. Entorno local

```bash
pnpm install                      # install dependencies at the repository root
cd mail-vue && npm run dev        # front-end dev server
cd mail-vue && npm run build      # front-end build (delivery gate: zero warnings, zero errors)
cd mail-worker && npx wrangler dev  # local full stack (127.0.0.1:8787)
```

Los secretos locales viven en `mail-worker/.dev.vars` (nunca se confirma; plantilla en `.dev.vars.example`); tras vaciar `.wrangler/state`, visitar `/api/init/<jwt_secret>` siembra desde cero un conjunto completo de datos de demostración; véase la sección 3 de la [Guía de despliegue](/es/mail/deployment/).

## 3. Pruebas e inspecciones

- El directorio `tests/` alberga más de un centenar de scripts automatizados: regresiones de navegador de pila completa con Playwright, aserciones extremo a extremo contra producción por la red pública, escaneos estáticos de todo el repositorio y comparaciones de integridad byte a byte;
- Cifras representativas: endurecimiento de seguridad 43/43 aserciones, enrutamiento público extremo a extremo 32/32, superficie de inicio de sesión en seis idiomas 62/62, integridad de producción 369 comparaciones byte a byte;
- Los cambios de interfaz o de API deben compilar primero (`vite build` más una comprobación de compilación del Worker) y superar después una ejecución local de pila completa; los datos de prueba se limpian siempre físicamente en bloques `finally`, dejando cero datos falsos en las bases de datos o el KV.

## 4. La disciplina de seis idiomas

Los diccionarios de la interfaz y del back-end admiten zh, zh-Hant, en, es, fr y nl con conjuntos de claves absolutamente simétricos. Tras añadir o modificar entradas, el trío de auditoría estática debe pasar:

```bash
node scripts/i18n-symmetry.mjs      # six-language key sets absolutely symmetric
node scripts/i18n-audit.mjs         # zero missing literal references in code
node scripts/i18n-hardcoded.mjs     # zero unwrapped user-visible strings
```

El correo del sistema y el de bienvenida se entregan en el idioma del destinatario; todo texto nuevo visible para el usuario debe pasar siempre por una clave de diccionario, nunca quedar escrito a mano en el código.

## 5. Disciplina de migraciones

- Las definiciones de tablas se mantienen en un único lugar: las sentencias `CREATE TABLE` del módulo de inicialización del back-end;
- Cada cambio de columna viene acompañado de una función de actualización (`vN_NDB`) que comprueba con `PRAGMA table_info` antes de ejecutar `ALTER TABLE ADD COLUMN`, manteniéndolo idempotente;
- Un arranque en frío limpio completa toda la creación de tablas y la siembra de los seis roles estándar únicamente con `/api/init/<jwt_secret>` — las migraciones jamás deben depender de SQL ejecutado a mano.

## 6. Flujo de trabajo de ingeniería

El desarrollo sigue un SOP de cinco pasos:

1. Alcance: fijar el radio de impacto sobre APIs, tablas, componentes, diccionarios y estilos;
2. Implementación: seguir la arquitectura existente, respetando el modo oscuro y el diseño móvil, con degradación elegante y defensas por defecto;
3. Verificación de pila completa: comprobaciones de compilación, la suite de regresión, pruebas de navegador y limpieza de datos falsos;
4. Commits disciplinados: mensajes de commit estructurados; los registros de ejecución se dirigen a `CHECKLIST.log` (registro rutinario) o a `REPORTS.md` (auditorías dedicadas) — los documentos de gobernanza nunca llevan registros;
5. Hashes reportados: todo informe hacia fuera encabeza con el hash completo del commit para garantizar la trazabilidad.

## 7. Desarrollo del sitio de documentación

Este sitio (EpomailDocs) es un repositorio git independiente construido sobre Astro 5 y Starlight, estructuralmente simétrico en los seis idiomas por documento (con el chino tradicional como base formal):

```bash
pnpm build                          # build (regenerates the anti-tampering manifest)
node scripts/validate-anchors.cjs   # zero broken anchors site-wide
python scripts/check-structure.py   # six-language structural symmetry
python scripts/verify-laws.py       # legal citations match the verified register
```

Cada compilación regenera el manifiesto `tamper-proof.json`; un cambio de documentación se confirma en dos pasos — el commit del contenido y, después, un commit que fija el manifiesto a ese hash.

## 8. Contribuciones

- Los informes de errores y las propuestas de funciones pasan por los Issues del repositorio de GitHub; las contribuciones de código, por Pull Requests (`github.com/shijianus/epomail`);
- Las contribuciones siguen las convenciones de mensajes de commit existentes y las compuertas de esta página;
- Las vulnerabilidades de seguridad no deben divulgarse en issues públicos — notifíquelas de forma privada a través de los puntos de contacto de la sección 5 de la [Descripción general de privacidad y condiciones](/es/mail/overview/);
- La licencia de las contribuciones y del proyecto figura en [Marco legal del código abierto y el autoalojamiento](/es/mail/open-source/).

## 9. Documentos relacionados

| Recurso | Enlace |
| --- | --- |
| Pasos para ejecutar un despliegue | [Guía de despliegue](/es/mail/deployment/) |
| Topología técnica y diseño de seguridad | [Arquitectura técnica](/es/mail/architecture/) |
| Alcance del servicio y canales de soporte | [Alcance del servicio y soporte](/es/mail/service-scope/) |
| Posicionamiento del proyecto y cadena de commits | [Presentación del proyecto](/es/mail/project/) |
