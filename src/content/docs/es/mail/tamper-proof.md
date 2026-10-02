---
title: Especificación de correo oficial y arquitectura contra manipulaciones
description: Especificaciones de correo del sistema de EpoCanvas Mail, 16 avisos de seguridad escalonados, protección de remitente, entrega inmutable y verificación de integridad.
---

# Especificación de correo oficial y arquitectura contra manipulaciones

**Fecha de entrada en vigor: 1 de octubre de 2026 | Versión: 5.5**

De conformidad con la [Descripción general de privacidad y términos](/mail/overview/) y el [Tratamiento de datos y seguridad](/mail/data-security/), este documento especifica el marco de emisión de correo del sistema oficial, los estándares de avisos de seguridad, la protección perimetral del remitente, la entrega inmutable de instantáneas, el aislamiento en entorno protegido del cliente y los mecanismos criptográficos de verificación contra manipulaciones de EpoCanvas Mail.

Los documentos legales y técnicos de este sitio tienen como objetivo establecer estándares de comunicación comunitarios no comerciales, transparentes y rigurosos.

![Arquitectura contra manipulaciones y autenticación oficial de EpoCanvas Mail: protección perimetral del remitente, canalización de entrega inmutable, aislamiento en Shadow DOM del cliente y manifiesto SHA-256](/images/mail/anti-tamper-architecture.svg)

*Figura: Arquitectura del sistema contra manipulaciones y autenticación oficial. El nivel 1 bloquea la identidad oficial del remitente en el perímetro; el nivel 2 consolida instantáneas inmutables con cifrado AES-256-GCM; el nivel 3 garantiza el aislamiento en Shadow DOM del cliente y la verificación SHA-256 en tiempo real mediante Web Crypto.*

## 1. Protección y autenticación del remitente oficial

Para erradicar de forma definitiva los riesgos de suplantación de identidad (phishing) y falsificación de remitentes, el servicio implementa un canal de aislamiento privilegiado en el perímetro que segrega las comunicaciones oficiales del sistema de los flujos de correo ordinarios:

1. **Bloqueo exclusivo de dirección oficial**: Todos los correos de bienvenida del sistema, comunicados operativos globales y avisos de seguridad se expiden estricta y exclusivamente desde la dirección certificada `announcement@epocanvas.com`;
2. **Interceptación perimetral de suplantaciones**: La pasarela perimetral de Cloudflare Workers aplica un filtrado estricto. Cualquier remitente externo o llamada interna no autorizada que intente enviar correo como `announcement@epocanvas.com` se bloquea de inmediato en el perímetro con un error HTTP 403;
3. **Insignia certificada y verificación oficial (`isOfficial: 1`)**: Solo los correos originados mediante conductos privilegiados del sistema reciben el atributo inalterable `isOfficial = 1`, lo que activa la visualización del escudo azul verificado y la pancarta oficial en el panel de lectura;
4. **Ciclo de vida y principios de depuración**: Los avisos introductorios se marcan para seguimiento y se eliminan físicamente de forma automática tras 7 días; las notificaciones de incidentes de seguridad críticos quedan archivadas permanentemente en la base de datos.

## 2. Sistema de avisos de seguridad (16 categorías de eventos)

El servicio estructura las mutaciones críticas de estado de los usuarios y del sistema en una escala defensiva de 4 niveles (Nivel 1 a Nivel 4), estableciendo una matriz de notificación en tiempo real que cubre 16 eventos específicos. El diseño prescinde de giros artificiales y adopta una estética de ingeniería depurada, con escudo vectorial SVG, tarjetas de acción duales (confirmación de acción legítima frente a medidas de remediación de emergencia) y botón oscuro de gestión:

| Nivel | Código de evento | Escenario y contexto de seguridad | Metadatos y parámetros inyectados | Destacado auto |
| --- | --- | --- | --- | --- |
| L1 | NEW_DEVICE_LOGIN | Primer inicio de sesión desde un nuevo dispositivo | Fecha/hora, IP, Ubicación, Dispositivo, Navegador | No |
| L1 | NEW_LOCATION_LOGIN | Inicio de sesión desde una nueva ciudad o país | Fecha/hora, IP, País y Ciudad, Proveedor de red | No |
| L1 | NEW_NETWORK_LOGIN | Inicio de sesión desde un nuevo sistema autónomo (ASN) | Fecha/hora, IP, Número ASN, Nombre de red | No |
| L2 | PASSWORD_CHANGED | Contraseña de acceso a la cuenta modificada con éxito | Fecha/hora, IP, Ubicación, Dispositivo y Navegador | No |
| L2 | PAT_CREATED | Generado un nuevo token de acceso personal (PAT) para API | Nombre del token, Permisos concedidos, Días de validez | No |
| L2 | PAT_REVOKED | Token de acceso personal revocado manualmente o caducado | Nombre del token, Fecha de revocación, Dispositivo | No |
| L2 | OAUTH_AUTHORIZED | Aplicación OAuth 2.0 autorizada a acceder al buzón | Nombre de la aplicación, Permisos, Identificador | No |
| L2 | OAUTH_REVOKED | Permiso revocado a una aplicación de terceros OAuth 2.0 | Nombre de la aplicación, Fecha de revocación | No |
| L3 | TOTP_ENABLED | Autenticación en dos pasos (RFC 6238) habilitada | Fecha/hora, IP, Hora de creación, Códigos respaldo | Sí |
| L3 | TOTP_DISABLED | Autenticación en dos pasos deshabilitada (factor simple) | Fecha/hora, IP, Dispositivo, Guía de seguridad | Sí |
| L3 | PASSKEY_ADDED | Nueva llave de paso (Passkey FIDO2 / WebAuthn) vinculada | Nombre de la llave, Tipo de autenticador, Fecha | Sí |
| L3 | PASSKEY_REMOVED | Llave de paso registrada previamente eliminada | Nombre de la llave, Fecha de eliminación, Dispositivo | Sí |
| L3 | AUTO_FORWARD_CHANGED | Regla de reenvío automático de correo configurada | Dirección de destino, Filtros de regla, Estado | Sí |
| L3 | STORAGE_PURGED | Configuración de almacenamiento propio (BYO) restablecida | Fecha/hora, IP operadora, Estado de reserva | Sí |
| L4 | ACCOUNT_LOCKED | Umbral de intentos fallidos alcanzado (bloqueo 12h) | Intentos fallidos, Horas de bloqueo, IP, Desbloqueo | Sí |
| L4 | ACCOUNT_DELETED | Solicitud de eliminación de cuenta o purga física | Fecha de solicitud, Número de alias, Plazo | Sí |

Con el fin de evitar la saturación por alertas en los usuarios, en KV se almacena una línea base de huella ambiental (con los 15 dispositivos, ubicaciones y redes más recientes), aplicando una ventana de silencio de una hora para eventos análogos.

## 3. Entrega inmutable y protección en espacio aislado del cliente

Las comunicaciones oficiales se ejecutan a través de protocolos de transferencia inmutables y entornos aislados en el cliente para garantizar que ningún intermediario pueda alterar los mensajes:

1. **Entrega inmutable por instantánea (Immutable Delivery)**: Los correos del sistema se fijan en la base de datos en el instante del envío, permaneciendo inmutables aunque el destinatario modifique con posterioridad su idioma de interfaz;
2. **Retorno simétrico a plantillas pretraducidas**: El motor multilingüe precompila las traducciones oficiales. Cuando el contenido coincide con la plantilla estándar, se sirve la traducción certificada; ante modificaciones, el sistema recurre de forma fluida a la IA;
3. **Aislamiento físico en Shadow DOM**: El cliente web encapsula el contenido de los correos dentro de un Shadow DOM cerrado, impidiendo que los estilos del contenedor o los scripts globales interfieran;
4. **Depuración estricta por lista blanca con DOMPurify**: Las etiquetas `<script>`, `<style>`, `<iframe>`, `<object>`, `<embed>`, `<form>` y los gestores de eventos inline quedan eliminados, neutralizando cualquier intento de inyección de código.

## 4. Dispositivo contra manipulaciones y verificación de documentos

El portal de documentación oficial (`epomail-docs`) implementa un sistema abierto de certificación de integridad mediante huellas criptográficas para que cualquier usuario pueda validar su autenticidad:

| Dimensión defensiva | Mecanismo técnico | Criterio de verificación | Amenaza neutralizada |
| --- | --- | --- | --- |
| Manifiesto determinista | `public/tamper-proof.json` | Hash SHA-256 y tamaño en bytes | Manipulación en réplicas, sustitución de texto |
| Trazabilidad de versiones | Objeto de árbol Git Commit | Hash SHA de Git y firma PGP | Modificaciones no autorizadas, revisión histórica |
| Verificación en el navegador | API Web Crypto en memoria | `crypto.subtle.digest('SHA-256')` | Inyección en tránsito (MITM), envenenamiento de caché |
| Auditoría en terminal | Herramientas OpenSSL / sha256sum | Comparación local de archivos Markdown | Auditorías independientes, cumplimiento normativo |
| Origen oficial verificado | `https://docs.epocanvas.com/epomail` | Validación DNSSEC y certificados TLS | Portales falsos, páginas fraudulentas de phishing |

:::tip[Instrucciones de verificación en vivo]
En la parte inferior de cada página de documentación se integra el panel interactivo «🛡️ Verificación oficial contra manipulaciones e integridad». Al pulsar «🔍 Verificar integridad en tiempo real», el navegador calcula la huella SHA-256 en memoria y la contrasta con el registro oficial. También puede consultarse desde la consola con `curl -sSL https://docs.epocanvas.com/epomail/tamper-proof.json | jq .`.
:::

## 5. Delimitación de responsabilidades y notificación de seguridad

1. **Responsabilidad de la instancia alojada**: La emisión segura de correo, la autenticación del remitente y la integridad de la documentación en `mail.epocanvas.com` están a cargo del equipo oficial de operaciones;
2. **Responsabilidad del despliegue propio**: Quienes desplieguen instancias independientes configuran sus propios recursos en Cloudflare y deben custodiar sus claves conforme a [Tratamiento de datos y seguridad](/mail/data-security/) ;
3. **Canales de asistencia y notificación**: Si se detecta un correo oficial falsificado, irregularidades en la verificación o una vulnerabilidad potencial, comuníquese de inmediato con:
   - Centro de seguridad y canal oficial de emisión: `announcement@epocanvas.com`
   - Unidad de privacidad y protección de datos: `privacy@epocanvas.com`
