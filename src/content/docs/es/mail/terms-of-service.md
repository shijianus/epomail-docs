---
title: Términos del Servicio
description: Términos del Servicio de EpoCanvas Mail—aceptación y revisión de los términos, reglas de cuenta, contenido del usuario, limitaciones de responsabilidad, y ley aplicable y jurisdicción.
---

# Términos del Servicio

**Fecha de entrada en vigor: 30 de septiembre de 2026 | Versión: 5.3**

Estos Términos constituyen el acuerdo entre usted y el Operador de la instancia que utiliza con respecto al uso del servicio EpoCanvas Mail (el «Servicio»). Al completar el registro, iniciar sesión o utilizar de otro modo el Servicio, usted declara que ha leído y acepta la totalidad de estos Términos; si no está de acuerdo, no se registre ni utilice el Servicio.

Estos Términos constituyen condiciones tipo: el texto íntegro está disponible públicamente en la página de registro para su revisión, y las versiones históricas se archivan con el repositorio de código abierto. Su consentimiento otorgado por medios electrónicos tiene el mismo efecto que un documento y una firma físicos. Los derechos que la ley aplicable no permite excluir o limitar mediante condiciones tipo no quedan afectados por estos Términos.

Las versiones en chino tradicional (Taiwán) de los documentos legales de este sitio constituyen las versiones autoritativas; las traducciones a otros idiomas se proporcionan únicamente a título de referencia y, en caso de cualquier discrepancia, prevalecerá la versión en chino tradicional.

## 1. Definiciones

1. **El Servicio**: toda la funcionalidad que se ejecuta en una instancia de EpoCanvas Mail, incluidos el cliente web, la aplicación móvil (epomail), la API abierta y los componentes relacionados.
2. **Operador**: la persona o el equipo que despliega y explota la instancia que usted utiliza. Para la instancia alojada `mail.epocanvas.com`, se trata del equipo de operaciones de EpoCanvas; para una instancia autoalojada, de quien la despliegue.
3. **Usted (la parte)**: la persona física u organización que se registra, inicia sesión o utiliza de otro modo el Servicio.
4. **Perfeccionamiento del contrato**: el contrato se celebra con el Operador de la instancia en la que usted se registra. Estos Términos constituyen una plantilla común: la instancia alojada los aplica directamente; un Operador autoalojado puede adaptarlos como condiciones de su sitio, y deberá cumplir la obligación de notificación hacia sus usuarios conforme a la ley aplicable en su lugar de ubicación.

## 2. Descripción del Servicio

El Servicio proporciona gestión de múltiples buzones, envío y recepción de correo dentro y fuera del sitio, adjuntos, etiquetas y estrellas, cuarentena de correo no deseado, recordatorios de posposición, búsqueda, traducción mediante IA (opcional), extracción automática de códigos de verificación (opcional), notificaciones push de Telegram (opcionales), verificación en dos pasos (TOTP o passkeys), una plataforma abierta OAuth y exportación de datos; la funcionalidad realmente disponible depende de lo que la instancia haya habilitado.

El Servicio está construido sobre un proyecto de código abierto bajo la Licencia MIT y sigue siendo de código abierto: el código fuente es público y auditable, y usted puede desplegarlo por sí mismo para obtener una capacidad equivalente. El software se proporciona «tal cual»; sus términos de licencia son coherentes con las disposiciones sobre responsabilidad de estos Términos (véase la Sección 10).

## 3. Solicitud de cuenta y seguridad

1. **Información de registro**: el registro requiere una dirección de correo electrónico de recepción válida y una contraseña. No debe suplantar a otra persona ni utilizar un dominio para el que no esté autorizado.
2. **Requisitos de edad**: usted confirma que tiene al menos 14 años de edad; las personas menores de 14 años no pueden utilizar el Servicio. Debe asimismo asegurarse de que su registro y uso cumplen las leyes de su lugar de residencia.
3. **Custodia de credenciales**: usted es responsable de salvaguardar su contraseña, sus credenciales de verificación en dos pasos y sus tokens de API. Las operaciones realizadas con sus credenciales se presumen actos suyos.
4. **Verificación en dos pasos**: se recomiendan TOTP o passkeys. Para las instancias que utilicen el modo «correo cifrado», el Operador puede hacer obligatoria su activación conforme a su política de seguridad.
5. **Protección del inicio de sesión**: 5 fallos consecutivos de contraseña bloquean el inicio de sesión durante 12 horas; una cuenta mantiene como máximo 10 sesiones activas, y puede cerrar sesión en cualquier dispositivo para revocar los tokens de inmediato.
6. **Restricciones de registro**: identificadores como `admin` están reservados por el sistema; el Operador puede configurar la instancia para exigir una clave de registro o cerrar el registro, lo cual entra dentro de la facultad administrativa de la instancia.

## 4. Prestación y cambios del Servicio

1. **Disponibilidad**: el Servicio se ejecuta en la infraestructura perimetral de Cloudflare; el Operador realiza esfuerzos razonables para mantener la disponibilidad, pero no se compromete con tasas específicas de disponibilidad, plazos de entrega ni plazos de recuperación, y no proporciona un acuerdo de nivel de servicio (SLA).
2. **Cambios de funcionalidades**: el proyecto de código abierto evoluciona continuamente y las funcionalidades pueden añadirse, ajustarse o eliminarse; los cambios sustanciales que afecten a la posibilidad de eliminar datos se anunciarán con antelación.
3. **Funcionalidades experimentales**: las funcionalidades marcadas como «experimentales» o en fase de prueba (como el reconocimiento de texto en imágenes y la traducción) se proporcionan tal cual, pueden ser inestables y pueden ajustarse o retirarse en cualquier momento.
4. **Mantenimiento e interrupciones**: el Operador puede suspender parte o la totalidad del Servicio para actualizaciones, reparaciones o gestión del abuso; la indisponibilidad causada por fallos de Cloudflare o de proveedores ascendentes de IA o de entrega no constituye un incumplimiento del Operador.

## 5. Su contenido

1. **Titularidad**: la titularidad y la responsabilidad del correo que usted envía y recibe y de sus adjuntos le corresponden a usted. El Operador no utiliza su contenido para publicidad, para entrenamiento de modelos ni para su transferencia a terceros.
2. **Licencia de tratamiento**: para proporcionar las funciones de almacenamiento, entrega, búsqueda, notificación push y (opcionalmente) traducción, usted autoriza al Operador a realizar el tratamiento técnico únicamente en la medida necesaria para la operación del Servicio; la autorización concluye cuando usted deja de utilizar el Servicio y sus datos han sido eliminados.
3. **Responsabilidad por el envío**: usted responde de cada correo que envía; las disputas y la responsabilidad jurídica derivadas del contenido que envíe son asumidas por usted.
4. **Aviso sobre la accesibilidad del contenido**: el Operador no revisa, como regla general, su correo normal. Sin embargo, en modo «todo el correo» un administrador puede técnicamente leer todo el correo (en modo «privado», únicamente el correo no deseado, eliminado y sin propietario), y actuará ante denuncias o cuando lo exija la ley. Antes de elegir una instancia, debe conocer su modo de operación; si tiene requisitos de confidencialidad, véase la explicación del alcance del cifrado en la Sección 10 de la [Política de Privacidad](/es/mail/privacy-policy/).

## 6. Entrega saliente y servicios de terceros

1. **Entrega saliente**: el correo enviado fuera del sitio se entrega a través de los canales configurados por el Operador (Cloudflare Email Workers, Resend o Mailjet). La entrega mediante terceros puede retrasarse, devolverse o ser interceptada por el proveedor del destinatario, y el Operador no garantiza el resultado de la entrega.
2. **Términos de terceros**: cuando utilice las notificaciones push de Telegram, la traducción mediante IA, el inicio de sesión con Linux DO, el almacenamiento S3 externo y funciones similares, también quedará vinculado por los términos de esos servicios de terceros.
3. **Plataforma abierta OAuth**: cuando autorice aplicaciones de terceros a través de OAuth, el alcance de la autorización (openid / profile / email) y el método de revocación se describen en la Sección 9 de la [Política de Privacidad](/es/mail/privacy-policy/); la utilización de los datos por las aplicaciones de terceros se rige por sus propios términos.

## 7. Uso aceptable

Su uso del Servicio está sujeto a todas las disposiciones de la [Política de Uso Aceptable](/es/mail/acceptable-use/), incluidas las prohibiciones de transmitir contenido ilícito, enviar correo masivo no solicitado, atacar el sistema o interferir en el uso de otros. En caso de vulneración, el Operador puede adoptar medidas conforme a los procedimientos establecidos en dicha Política, hasta la eliminación de la cuenta y de todos los datos, y conservará las pruebas conforme a la ley y cooperará con las investigaciones de las autoridades competentes.

## 8. Conservación de datos, eliminación y cierre de cuentas

1. **Baja por su parte**: puede cancelar su cuenta en cualquier momento mediante el autoservicio en la configuración, o solicitar al Operador que la elimine. Tras la cancelación, las sesiones quedan invalidadas de inmediato; el correo pasa a un estado de eliminación lógica hasta que un administrador realice la supresión física.
2. **Depuración periódica del sistema**: el correo no deseado permanece en cuarentena durante 7 días y luego se traslada a la papelera; el correo de la papelera se suprime físicamente por el sistema 7 días después de la recepción (incluidos los adjuntos). La eliminación es irreversible; obtenga antes una copia JSON mediante «Exportar datos».
3. **Baja por el Operador**: cuando usted vulnere la [Política de Uso Aceptable](/es/mail/acceptable-use/), el Operador puede suspender o poner fin a su uso conforme a dicha Política.
4. **Conservación legal**: cuando la conservación sea exigida por la ley o por procedimientos judiciales, el Operador puede aplazar la eliminación en la medida necesaria y tratar los datos conforme a los procedimientos legales.

## 9. Notificación y reparación de las medidas de aplicación

Antes de suspender o poner fin a su uso en virtud de la sección «Uso aceptable» o de la sección anterior, el Operador deberá notificárselo y darle la oportunidad de explicar o subsanar el asunto, salvo en circunstancias urgentes (como un ataque en curso o la transmisión de contenido ilícito). Si usted considera que la medida fue errónea, puede recurrir conforme al procedimiento de la sección «Apelaciones y denuncias» de la [Política de Uso Aceptable](/es/mail/acceptable-use/), y el Operador la revisará y responderá dentro de un plazo razonable.

El momento de entrega de las notificaciones previstas en estos Términos cursadas como documentos electrónicos es aquel en que el documento entra en el sistema de información del destinatario o en el designado por este. La dirección de correo electrónico que usted facilita en el registro es el lugar de notificación de las notificaciones electrónicas, y usted debe mantenerla en condiciones de recibir correo.

## 10. Exenciones y limitación de responsabilidad

1. **Suministro tal cual**: el Servicio (incluido su software) se proporciona «tal cual» y «según disponibilidad», sin garantías de ningún tipo, expresas o implícitas, incluidas las garantías de comerciabilidad, aptitud para un fin determinado y no infracción; esto es coherente con el alcance de exención de la Licencia MIT bajo la cual se publica el software.
2. **Límites de validez**: la estipulación anterior y cualquier otro término que exima o reduzca la responsabilidad del Operador, aumente la suya o restrinja sus derechos, si según las circunstancias resulta manifiestamente injusta o no está permitida por la ley aplicable, no obliga en esa parte.
3. **Limitación de responsabilidad**: en la máxima medida permitida por la ley, la responsabilidad agregada del Operador frente a usted queda limitada al mayor entre las tasas que usted efectivamente haya pagado al Operador en los últimos 12 meses (normalmente cero en una instancia gratuita) y 100 USD. El Operador no responde de los daños indirectos, la pérdida de datos, la pérdida de negocio ni el menoscabo de la reputación. Deberá realizar copias de seguridad de su correo importante de forma independiente.
4. **Responsabilidad legal no limitada**: la responsabilidad que la ley aplicable no permite excluir o limitar por pacto (incluida la responsabilidad derivada del incumplimiento por el Operador de sus obligaciones de protección de datos personales) no queda exonerada ni limitada por el tope de responsabilidad del punto anterior.
5. **Fuerza mayor**: por las interrupciones del servicio y la pérdida de datos causadas por desastres naturales, guerra, actos de gobierno, fallos de la red troncal, ciberataques a gran escala o el cese del servicio por proveedores de terceros, el Operador no responde, siempre que haya realizado esfuerzos razonables.

## 11. Ley aplicable, jurisdicción y supervisión administrativa

1. Estos Términos se interpretan, y su validez y cumplimiento se determinan, conforme a la ley del lugar donde se ubica el Operador: la ley de Taiwán para la instancia alojada `mail.epocanvas.com`; la ley del lugar donde se ubica la entidad desplegadora para una instancia autoalojada.
2. Las disputas derivadas de estos Términos se resolverán primero mediante negociación; si la negociación fracasa, las disputas de la instancia alojada se someten al Tribunal de Distrito de Taipéi de Taiwán como tribunal de jurisdicción de primera instancia, y las de las instancias autoalojadas se rigen por la atribución de jurisdicción publicada por su operador. Cuando la ley disponga otra cosa en materia de jurisdicción imperativa, regirá dicha disposición.
3. El tratamiento de datos personales de la instancia alojada se rige por la ley de Taiwán; el Operador acepta la inspección y la supervisión que la autoridad competente realiza conforme a la ley, y establece y mejora continuamente las medidas de mantenimiento de la seguridad de los archivos de datos personales (véase [Procesamiento de Datos y Seguridad](/es/mail/data-security/)).

## 12. Cambios en estos Términos

Estos Términos pueden revisarse a medida que el Servicio evolucione. Los cambios sustanciales se anunciarán mediante un aviso en el sitio o un correo del sistema, y se actualizarán la fecha de entrada en vigor y el número de versión en la parte superior de esta página. Si usted continúa utilizando el Servicio después de que un cambio entre en vigor, se considerará que ha aceptado los Términos revisados; si no está de acuerdo, deberá dejar de utilizar el Servicio y exportar o eliminar sus datos. Las versiones históricas de las revisiones sustanciales se archivan con el historial de versiones del repositorio de código abierto; los términos revisados se hacen disponibles públicamente para su revisión, en la forma descrita anteriormente, antes de su entrada en vigor.

## 13. Contacto

- **Instancia alojada (`mail.epocanvas.com`)**: mensajes dentro de la aplicación o `admin@epocanvas.com`; para privacidad y reclamaciones, `privacy@epocanvas.com`
- **Proyecto de código abierto**: Issues del repositorio de GitHub (`github.com/shijianus/epomail`)
- **Sitios autoalojados**: contacte al Operador de dicho sitio

---

*Estos Términos, la [Política de Privacidad](/es/mail/privacy-policy/) y la [Política de Uso Aceptable](/es/mail/acceptable-use/) constituyen en conjunto el acuerdo completo entre usted y el Operador; el orden de aplicación entre los documentos se establece en la [Visión General de Privacidad y Términos](/es/mail/overview/). Este documento es una plantilla común preparada por la comunidad de código abierto y no constituye asesoramiento jurídico; antes de iniciar la operación formal, el Operador debe consultar a un abogado y adaptarlo a su actividad real.*
