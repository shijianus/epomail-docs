---
title: Primeros pasos
description: Primeros pasos con EpoCanvas Mail — el camino más corto del registro al primer correo enviado en la instancia alojada, y la secuencia completa desde clonar el repositorio hasta la verificación de envío y recepción en una instancia autoalojada.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.25**

Esta página explica el registro en la instancia alojada (vía A) y el autoalojamiento (vía B). Los tiempos siguientes son estimaciones de puesta en marcha funcional, sin incluir la preparación jurídica o de seguridad. Los nuevos controles de registro y datos aquí descritos requieren desplegar conjuntamente el Worker, la interfaz de acceso React y la interfaz de configuración Vue actualizados, y configurarlos; esta página no acredita que ninguna instancia en línea se haya actualizado o verificado. Las demás funciones y ajustes figuran en sus guías específicas.

La versión en chino tradicional (Taiwán) de los documentos jurídicos del sitio es la versión oficial; las demás lenguas son traducciones de referencia y, en caso de duda, prevalece la versión oficial.

![Dos vías EpoCanvas Mail: el mismo código abierto, con recursos y servicios externos elegidos por el operador real de cada instancia](/images/mail/es/dual-nature-scale.svg)

*Figura: ambos caminos ejecutan el mismo código. En la instancia alojada, el usuario debe marcar expresamente la casilla de aceptación de los [Términos del Servicio](/es/mail/terms-of-service/) al registrarse; la [Política de Privacidad](/es/mail/privacy-policy/) informa sobre el tratamiento y no es un consentimiento general. Desde el autoalojamiento, quien despliega debe evaluar su función según los tratamientos reales (véase [Privacidad y Términos — Visión General](/es/mail/overview/), sección 2).*

## 1. Elegir un camino

| | Vía A: instancia alojada | Vía B: autoalojamiento |
| --- | --- | --- |
| Adecuado para | Probar el producto sin explotar infraestructura | Contar ya con dominio y cuenta de Cloudflare y querer autonomía total de los datos |
| Requisitos previos | Un navegador | Un dominio, una cuenta de Cloudflare, Node.js y pnpm; el envío externo exige además una cuenta de canal de entrega |
| Tiempo | Unos 10 minutos | Unos 30 minutos |
| Coste | Sin funciones de pago por ahora | El consumo de Cloudflare de quien despliega |
| Acceso | [mail.epocanvas.com](https://mail.epocanvas.com) | [Guía de despliegue](/es/mail/deployment/) |

## 2. Vía A: instancia alojada

1. **Crear una cuenta**: abra [mail.epocanvas.com](https://mail.epocanvas.com), cambie al formulario de registro desde la página de inicio de sesión, revise los datos del operador, la versión vigente de los Términos y los [Términos del Servicio](/es/mail/terms-of-service/) que muestra la instancia, y marque la casilla no preseleccionada «Acepto los Términos del Servicio» antes de enviar una dirección «prefijo @ dominio de la instancia» con una contraseña (6–30 caracteres). La [Política de Privacidad](/es/mail/privacy-policy/) proporciona aquí la información sobre los tratamientos; una casilla no es un consentimiento general de privacidad. Si faltan avisos legales necesarios o datos de versión de los Términos, se cierra el registro de nuevas cuentas. Este control solo afecta al registro de nuevas cuentas; el inicio de sesión existente y las rutas de inicialización administrativa siguen disponibles. La exigencia de código de invitación o verificación humana depende de la configuración de la instancia; pida el código a la operación cuando sea necesario, o llegue directamente al formulario con el parámetro `?code=`. El registro surte efecto de inmediato, sin bucle de verificación por correo.
2. **Comprobar su grupo de identidad**: tras el registro entra en el grupo predeterminado de la instancia; si se registra con un código de invitación, entra en el grupo vinculado a ese código. El grupo determina la cuota diaria de envío, el número de buzones, la cuota de almacenamiento y el permiso de adjuntos; los valores de fábrica están en [Modos de funcionamiento](/es/mail/modes/), sección 3.
3. **Recibir su primer correo**: tras registrarse, consulte el mensaje de bienvenida y envíe contenido sintético de prueba desde un buzón externo que controle para verificar la recepción. La extracción de códigos no está activada por defecto: la instancia debe activar `verificationCodeEnabled` y facilitar un aviso de tratamiento vigente, y usted debe activar su preferencia personal, desactivada por defecto. La traducción exige confirmar el aviso vigente en cada solicitud; el OCR de imágenes requiere además una elección expresa para esa solicitud y la activación del servidor. El recurso a la traducción pública está desactivado por defecto. Véase la [Guía de configuración](/es/mail/settings/#optional-processing).
4. **Enviar su primer correo**: abra la capa de redacción desde el acceso de redacción de la barra lateral. Los destinatarios internos reciben la entrega directa; las direcciones externas salen por el canal de entrega configurado por la operación. El volumen saliente se rige por la cuota diaria de envío, cuyo contador se reinicia cada día.
5. **Activar la clasificación automática**: de fábrica vienen cuatro etiquetas — Comunidad, Suscripciones, Promociones y Trabajo — y el correo entrante se clasifica por heurística incorporada; reglas propias, excepciones y prioridades en la [Gestión de etiquetas y clasificación](/es/mail/labels/).
6. **Activar la verificación en dos pasos**: en «Configuración → Seguridad», vincule una aplicación de autenticación (TOTP) en tres pasos; al terminar se muestran 10 códigos de recuperación de un solo uso, que conviene guardar sin conexión. Pasos en la [Guía de seguridad de la cuenta](/es/mail/security/).
7. **Vincular el push de Telegram (opcional)**: reciba el correo nuevo en tiempo real con su propio bot, con un enlace de lectura interno válido 7 días. Pasos en la [Guía de notificaciones y reenvío](/es/mail/notify/).
8. **Exportar datos (opcional)**: en «Configuración → Datos», descargue campos seleccionados del perfil y mensajes no borrados en JSON, sin adjuntos, MIME original completo ni todos los ajustes de seguridad. La papelera usa la creación del mensaje superior a 7 días; guarde adjuntos aparte antes de borrar. Véanse [Exportación](/es/mail/data/), [Privacidad](/es/mail/privacy-policy/), [Datos y seguridad](/es/mail/data-security/) y [Encargados](/es/mail/sub-processors/).

## 3. Vía B: autoalojamiento

1. **Comprobar los requisitos previos**: un dominio, una cuenta de Cloudflare, Node.js y pnpm; el envío externo exige una cuenta de canal de entrega como Resend o Mailjet. La lista completa está en la [Guía de despliegue](/es/mail/deployment/), sección 1. Antes de un despliegue en frío, construya primero `temp_login_ui` (React) y después `mail-vue` (Vue); la compilación de `mail-vue` copia la superficie de acceso a los recursos estáticos del Worker.
2. **Construir y desplegar**: construya las interfaces y despliegue el Worker en este orden (el destino del despliegue y los dominios personalizados se configuran en `wrangler.toml`):

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail
pnpm --dir mail-worker install --frozen-lockfile
node scripts/build-prod.mjs
```

3. **Configurar secretos y desplegar**: desde la raíz del repositorio, ejecute `pnpm --dir mail-worker exec wrangler secret put jwt_secret` y `pnpm --dir mail-worker exec wrangler secret put totp_enc_key`; se recomienda definir también un `init_secret` independiente del mismo modo. Después ejecute `pnpm --dir mail-worker exec wrangler deploy`. Introduzca los valores de forma interactiva, nunca en URL, archivos versionados ni ejemplos públicos.
4. **Inicializar y configurar los avisos**: envíe `POST /api/init` por HTTPS con `init_secret` en el encabezado `x-init-secret` (solo se utiliza `jwt_secret` si no hay un secreto independiente) para crear tablas, grupos estándar y la cuenta principal. Si la respuesta contiene una contraseña inicial, manténgala privada y cámbiela de inmediato. Acceda a administración y complete los [avisos del operador](/es/mail/settings/#operator-notice) antes de abrir el registro; su ausencia no bloquea la inicialización administrativa ni el acceso de cuentas existentes.
5. **Conectar la recepción**: active el Email Routing del dominio en el panel de Cloudflare y dirija las direcciones de destino al Worker; el correo entrante se analiza al llegar.
6. **Conectar el envío**: configure el canal de entrega en la configuración del sistema; hasta entonces, los buzones de la instancia siguen entregándose directamente entre sí.
7. **Verificar envío y recepción**: en un entorno de prueba aislado, use cuentas dedicadas y datos sintéticos para comprobar la aceptación de los Términos al registrarse, el correo de bienvenida, los intercambios internos y el envío y recepción externos; no publique credenciales de producción. Estas pruebas funcionales no acreditan una preparación completa de seguridad, privacidad, supresión o legalidad ni justifican abrir directamente el servicio a usuarios reales.
8. **Confirmar su posición jurídica**: evalúe los roles según quién determina realmente fines y medios; el autoalojamiento no le convierte automáticamente en el único responsable. Publique identidad, ubicación, contacto y dirección legalmente exigida reales, y compruebe destinatarios, contratos efectivos, transferencias y conservación. Las plantillas o los campos completados no acreditan esos hechos. Véase [Marco legal del código abierto y el autoalojamiento](/es/mail/open-source/).

## 4. Para seguir

- Panorama funcional y operación interfaz por interfaz: la [Guía de funciones](/es/mail/features/), el [Mapa de interfaz y rutas](/es/mail/interface/);
- Búsqueda y automatización: la [Referencia de búsqueda y reglas](/es/mail/search/), la [Gestión de etiquetas y clasificación](/es/mail/labels/);
- Configuración de administración y modos de funcionamiento: la [Guía de configuración](/es/mail/settings/), los [Modos de funcionamiento](/es/mail/modes/);
- Ante cualquier problema: canales de soporte en [Alcance del servicio y soporte](/es/mail/service-scope/), sección 4; alcance del servicio y plazos de conservación, sección 2 de la misma página.
