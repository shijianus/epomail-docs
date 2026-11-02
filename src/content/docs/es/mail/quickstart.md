---
title: Primeros pasos
description: Primeros pasos con EpoCanvas Mail — el camino más corto del registro al primer correo enviado en la instancia alojada, y la secuencia completa desde clonar el repositorio hasta la verificación de envío y recepción en una instancia autoalojada.
---

**Fecha de actualización: 2 de noviembre de 2026 | Versión: 5.21**

Esta página ofrece la secuencia de acciones más corta para dos caminos: la vía A se registra en la instancia alojada y va del registro al primer correo enviado en unos diez minutos; la vía B despliega todo el servicio en su propio dominio y cuenta de Cloudflare, desde clonar el repositorio hasta la verificación de envío y recepción en unos treinta minutos. Ambos caminos ejecutan el mismo código y la misma interfaz; esta página solo enumera acciones y resultados, con enlaces a las páginas dedicadas para la semántica funcional y la configuración, y todo sigue la implementación de código abierto.

La versión en chino tradicional (Taiwán) de los documentos jurídicos del sitio es la versión oficial; las demás lenguas son traducciones de referencia y, en caso de duda, prevalece la versión oficial.

![Dos vías EpoCanvas Mail: el mismo código abierto, con recursos y servicios externos elegidos por el operador real de cada instancia](/images/mail/es/dual-nature-scale.svg)

*Figura: ambos caminos ejecutan el mismo código. Elegir la instancia alojada supone aceptar su [Política de Privacidad](/es/mail/privacy-policy/) y sus [Términos del Servicio](/es/mail/terms-of-service/); desde el momento del autoalojamiento, quien despliega se convierte en el responsable del tratamiento de sus usuarios (véase [Privacidad y Términos — Visión General](/es/mail/overview/), sección 2).*

## 1. Elegir un camino

| | Vía A: instancia alojada | Vía B: autoalojamiento |
| --- | --- | --- |
| Adecuado para | Probar el producto sin explotar infraestructura | Contar ya con dominio y cuenta de Cloudflare y querer autonomía total de los datos |
| Requisitos previos | Un navegador | Un dominio, una cuenta de Cloudflare, Node.js y pnpm; el envío externo exige además una cuenta de canal de entrega |
| Tiempo | Unos 10 minutos | Unos 30 minutos |
| Coste | Sin funciones de pago por ahora | El consumo de Cloudflare de quien despliega |
| Acceso | [mail.epocanvas.com](https://mail.epocanvas.com) | [Guía de despliegue](/es/mail/deployment/) |

## 2. Vía A: instancia alojada

1. **Crear una cuenta**: abra [mail.epocanvas.com](https://mail.epocanvas.com), cambie al formulario de registro desde la página de inicio de sesión y envíe una dirección «prefijo @ dominio de la instancia» con una contraseña (6–30 caracteres). Si el registro exige un código de invitación o incorpora una verificación humana lo decide la configuración de la instancia; pida el código a la operación cuando sea necesario, o llegue directamente al formulario con el parámetro `?code=`. El registro surte efecto de inmediato, sin bucle de verificación por correo.
2. **Comprobar su grupo de identidad**: tras el registro entra en el grupo predeterminado de la instancia; si se registra con un código de invitación, entra en el grupo vinculado a ese código. El grupo determina la cuota diaria de envío, el número de buzones, la cuota de almacenamiento y el permiso de adjuntos; los valores de fábrica están en [Modos de funcionamiento](/es/mail/modes/), sección 3.
3. **Recibir su primer correo**: al completarse el registro se entrega automáticamente un correo de bienvenida que le espera al iniciar sesión. Envíe después desde cualquier buzón externo un correo de prueba con un código de verificación a su nueva dirección: el código se extrae automáticamente con Workers AI y se presenta en tipografía grande con insignia verde en la lista y la vista de detalle (véase la [Guía de funciones](/es/mail/features/), sección 5).
4. **Enviar su primer correo**: abra la capa de redacción desde el acceso de redacción de la barra lateral. Los destinatarios internos reciben la entrega directa; las direcciones externas salen por el canal de entrega configurado por la operación. El volumen saliente se rige por la cuota diaria de envío, cuyo contador se reinicia cada día.
5. **Activar la clasificación automática**: de fábrica vienen cuatro etiquetas — Comunidad, Suscripciones, Promociones y Trabajo — y el correo entrante se clasifica por heurística incorporada; reglas propias, excepciones y prioridades en la [Gestión de etiquetas y clasificación](/es/mail/labels/).
6. **Activar la verificación en dos pasos**: en «Configuración → Seguridad», vincule una aplicación de autenticación (TOTP) en tres pasos; al terminar se muestran 10 códigos de recuperación de un solo uso, que conviene guardar sin conexión. Pasos en la [Guía de seguridad de la cuenta](/es/mail/security/).
7. **Vincular el push de Telegram (opcional)**: reciba el correo nuevo en tiempo real con su propio bot, con un enlace de lectura interno válido 7 días. Pasos en la [Guía de notificaciones y reenvío](/es/mail/notify/).
8. **Exportar datos (opcional)**: en «Configuración → Datos», descargue campos seleccionados del perfil y mensajes no borrados en JSON, sin adjuntos, MIME original completo ni todos los ajustes de seguridad. La papelera usa la creación del mensaje superior a 7 días; guarde adjuntos aparte antes de borrar. Véanse [Exportación](/es/mail/data/), [Privacidad](/es/mail/privacy-policy/), [Datos y seguridad](/es/mail/data-security/) y [Encargados](/es/mail/sub-processors/).

## 3. Vía B: autoalojamiento

1. **Comprobar los requisitos previos**: un dominio, una cuenta de Cloudflare, Node.js y pnpm; el envío externo exige una cuenta de canal de entrega como Resend o Mailjet. La lista completa está en la [Guía de despliegue](/es/mail/deployment/), sección 1.
2. **Desplegar en tres comandos**: ejecute lo siguiente en una terminal (el destino del despliegue y los dominios personalizados se configuran en `wrangler.toml`):

```bash
git clone https://github.com/shijianus/epomail.git
cd epomail/mail-vue && pnpm install && npm run build
cd ../mail-worker && npx wrangler deploy
```

3. **Inicializar**: tras el primer despliegue, visite `/api/init/<jwt_secret>` para crear todas las tablas, sembrar los seis grupos de identidad estándar e inicializar la cuenta del propietario principal; la cadena de arranque es idempotente y puede repetirse sin riesgo.
4. **Inyectar los secretos**: en producción, inyecte `jwt_secret` y `totp_enc_key` mediante `npx wrangler secret put`; en desarrollo local use `.dev.vars` (nunca versionado). El valor del secreto en la ruta de inicialización debe coincidir con el secreto de firma de sesión.
5. **Conectar la recepción**: active el Email Routing del dominio en el panel de Cloudflare y dirija las direcciones de destino al Worker; el correo entrante se analiza al llegar.
6. **Conectar el envío**: configure el canal de entrega en la configuración del sistema; hasta entonces, los buzones de la instancia siguen entregándose directamente entre sí.
7. **Verificar envío y recepción**: registre una cuenta de prueba y confirme la recepción del correo de bienvenida; intercambie un correo interno entre la cuenta de prueba y la del propietario principal; tras configurar el canal, envíe un correo externo y confirme su entrega. Superadas las cuatro comprobaciones, el despliegue está completo.
8. **Confirmar su posición jurídica**: desde el momento del autoalojamiento, quien despliega es el responsable del tratamiento de sus usuarios y les debe información y seguridad; los documentos jurídicos de este sitio pueden servir de plantilla base (véase [Marco legal del código abierto y el autoalojamiento](/es/mail/open-source/)).

## 4. Para seguir

- Panorama funcional y operación interfaz por interfaz: la [Guía de funciones](/es/mail/features/), el [Mapa de interfaz y rutas](/es/mail/interface/);
- Búsqueda y automatización: la [Referencia de búsqueda y reglas](/es/mail/search/), la [Gestión de etiquetas y clasificación](/es/mail/labels/);
- Configuración de administración y modos de funcionamiento: la [Guía de configuración](/es/mail/settings/), los [Modos de funcionamiento](/es/mail/modes/);
- Ante cualquier problema: canales de soporte en [Alcance del servicio y soporte](/es/mail/service-scope/), sección 4; alcance del servicio y plazos de conservación, sección 2 de la misma página.
