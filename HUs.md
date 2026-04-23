# Tec Learners Wallet: Backlog de Historias de Usuario

> **Proyecto:** Tec Learners Wallet
> **Área:** TEDU / Mostla
> **Versión:** 0.1 (borrador inicial)
> **Última actualización:** Marzo 2026

---

## Contexto del Producto

La **Tec Learners Wallet** es una cartera digital institucional que centraliza, organiza y permite compartir todas las credenciales emitidas por el Tecnológico de Monterrey. Soporta estándares **Open Badges 2.0 / 3.0** y **Blockcerts**, y está dirigida a todos los públicos que aprenden en el Tec: preparatoria, profesional, posgrado, educación continua, EXATEC y extranjeros.

---

## El Sueño

| # | Necesidad                                                                                                        | Tecnología / Desglose                                                                                    |
| - | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1 | Un**espacio unificado** que resguarda y da valor a todas las credenciales y logros obtenidos en el Tec     | Título en Blockchain, Badges Externas, CLR/LER, Badges Tec, Constancia de Situación Profesional         |
| 2 | Diseñado para acompañar a**cada persona que aprende en el Tec**, sin importar su etapa o programa        | Preparatoria, Profesional, Posgrado, Educación Continua, EXATEC, Extranjeros, MiTec/Webapp, SSO LinkedIn |
| 3 | Con la libertad de**compartir tus logros** y competencias en cualquier perfil o plataforma                 | LinkedIn, Link con perfil personalizado, Descarga, Pinterest                                              |
| 4 | **Organización inteligente** que adapta y muestra tus credenciales de forma clara y significativa         | Por nivel de estudio, Por tipo de competencia, Por emisor, Por tipo de credencial (título o badge)       |
| 5 | El**puente entre las competencias del Tec y el mundo profesional** *(fuera de alcance en esta versión)* | Traductor de competencias para otras bolsas, Vinculado a bolsa de trabajo institucional, Inglés          |

---

## Roles

### Usuarios

| Rol                                         | Descripción                                                                                                                                                      | Correo institucional             | Acceso actual                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| **Estudiante de Preparatoria**        | Alumno inscrito en cualquier campus de preparatoria del Tec.                                                                                                      | ✅ @tec.mx activo                | ✅ SSO institucional                                                    |
| **Estudiante de Profesional**         | Alumno inscrito en una licenciatura o ingeniería del Tec.                                                                                                        | ✅ @tec.mx activo                | ✅ SSO institucional                                                    |
| **Estudiante de Posgrado**            | Alumno inscrito en maestría o doctorado.                                                                                                                         | ✅ @tec.mx activo                | ✅ SSO institucional                                                    |
| **Estudiante de Educación Continua** | Persona inscrita en diplomados, cursos cortos, certificaciones o programas ejecutivos del Tec. Puede o no tener correo institucional dependiendo del programa.    | ⚠️ Depende del programa        | ⚠️ SSO si tiene @tec.mx. Sin acceso si no tiene (pendiente solución) |
| **EXATEC / Egresado**                 | Persona que concluyó un programa en el Tec. Su correo @tec.mx expira al egresar, pero recibe un @exatec.mx permanente.                                           | ✅ @exatec.mx permanente         | ✅ SSO institucional                                                    |
| **Estudiante de Intercambio**         | Alumno de otra universidad que cursa uno o más semestres en el Tec bajo convenio. Su cuenta institucional es temporal y se desactiva al terminar el intercambio. | ❌ Expira al terminar el periodo | ❌ Sin acceso (pendiente solución)                                     |
| **Estudiante Dado de Baja**           | Persona que realizó baja definitiva antes de concluir su programa. Pudo haber obtenido credenciales mientras estuvo inscrito.                                    | ❌ Desactivado al darse de baja  | ❌ Sin acceso (pendiente solución)                                     |

### Roles institucionales

| Rol                                   | Descripción                                                                           |
| ------------------------------------- | -------------------------------------------------------------------------------------- |
| **Administrador de plataforma** | Personal VPTD/TEDU responsable de la operación, configuración y soporte del sistema. |

### Emisores

| Emisor              | Estándar             | Tipo de credencial                   |
| ------------------- | --------------------- | ------------------------------------ |
| **Parchment** | Open Badges 2.0 / 3.0 | Badges institucionales               |
| **Hyland**    | Blockcerts            | Títulos profesionales en blockchain |

### Roles externos

| Rol                               | Descripción                                                                                                                                                                     |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Empleador / Verificador** | Empresa o persona externa que recibe un link de credencial y desea verificar su autenticidad. No requiere cuenta en la plataforma; accede vía link público sin autenticación. |

---

## Épicas

| Épica                                        | Tipo     | Descripción                                                                                                                                                                                                                            |
| --------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **E1 - Cartera: Credenciales**          | Página  | Pantalla principal dentro de MiTec donde el usuario ve todas sus credenciales (badges, títulos, constancias). Incluye recepción de nuevas credenciales, filtrado, e importación de credenciales externas.                            |
| **E2 - Cartera: CLRs**                  | Página  | Pantalla donde el usuario ve sus Comprehensive Learner Records, agrupaciones de credenciales que representan trayectorias completas de aprendizaje.                                                                                     |
| **E3 - Detalle de Credencial**          | Página  | Pantalla donde el usuario ve la información completa de una credencial individual (OB 2.0/3.0) y puede realizar acciones sobre ella: compartir (LinkedIn, link público), descargar (JSON/PNG baked) y ver metadatos.                  |
| **E4 - Detalle de Título**             | Página  | Pantalla donde el usuario ve la información completa de un título Blockcerts: información del título, receptor, emisor con líneas de firma, verificación blockchain. Permite descargar en JSON Blockcerts, XML SEP o PDF oficial. |
| **E5 - Detalle de CLR**                 | Página  | Pantalla donde el usuario ve la información completa de un CLR: emisor, fecha, descripción y las credenciales que lo componen como elemento principal.                                                                                |
| **E6 - Página Pública de Credencial** | Página  | Página web pública accesible por cualquier persona con el link, sin autenticación. Muestra los datos de una credencial compartida por un usuario.                                                                                    |
| **E7 - Página Pública de Título**    | Página  | Página web pública accesible por cualquier persona con el link, sin autenticación. Muestra los datos de un título Blockcerts compartido por un usuario.                                                                             |
| **E8 - Página Pública de CLR**        | Página  | Página web pública accesible por cualquier persona con el link, sin autenticación. Muestra los datos de un CLR compartido por un usuario.                                                                                            |
| **E9 - Verificador Público**           | Página  | Página web pública accesible por cualquier persona con el link, sin autenticación. Permite verificar que una credencial es auténtica, fue emitida por el Tec y cumple con el estándar correspondiente (Open Badges / Blockcerts).  |
| **E10 - Integración con Emisores**     | Técnica | Integraciones con los sistemas emisores institucionales (Parchment, Hyland) y el flujo por el cual las credenciales llegan a la wallet de forma confiable y verificable.                                                                |
| **E11 - Acceso y Activación**          | Técnica | Flujo de entrada a la wallet desde MiTec (usuario ya autenticado vía SSO) y workaround de acceso para usuarios que no tienen cuenta institucional activa.                                                                              |
| **E12 - Menú de Usuario**              | Página  | Menú de usuario en el header de la wallet. Se accede mediante un botón con la imagen/foto del estudiante. Incluye un toggle para cambiar el idioma de la interfaz entre inglés y español.                                              |
| **E13 - Notificaciones por Correo**    | Técnica | Notificaciones por correo electrónico que se envían automáticamente al alumno cuando se le emite una credencial, título o CLR.                                                                                                          |

---

## E1 - Cartera: Credenciales

### HU-1.1 - Navegación entre Credenciales y CLRs

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **cambiar entre la vista de Credenciales y la vista de CLRs** para **acceder a cada tipo de logro desde la misma cartera.**

**Reglas de Negocio:**

- La cartera tiene dos secciones: Credenciales y CLRs.
- Al entrar a la wallet, la vista por defecto es Credenciales.
- La navegación entre secciones debe ser visible y accesible en todo momento dentro de la cartera.

**Criterios de Aceptación:**

- Dado que estoy en la cartera, cuando entro por primera vez, entonces veo la sección de Credenciales como vista por defecto.
- Dado que estoy en la sección de Credenciales, cuando selecciono la sección de CLRs, entonces veo mis CLRs sin perder el contexto de la cartera.
- Dado que estoy en la sección de CLRs, cuando selecciono la sección de Credenciales, entonces regreso a ver mis credenciales.

---

### HU-1.2 - Buscar credenciales

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **buscar mis credenciales por nombre, emisor o etiqueta** para **encontrar rápidamente una credencial específica sin recorrer toda la lista.**

**Reglas de Negocio:**

- El buscador debe buscar por nombre de la credencial, nombre del emisor, año de emisión, descripción y etiquetas asociadas.
- La búsqueda se ejecuta conforme el usuario escribe (búsqueda en tiempo real).
- Si no hay resultados, se muestra un mensaje indicándolo.

**Criterios de Aceptación:**

- Dado que tengo varias credenciales, cuando escribo un término en el buscador, entonces se muestran solo las credenciales que coinciden con el término en nombre, emisor, año, descripción o etiqueta.
- Dado que escribo un término que no coincide con ninguna credencial, cuando termino de escribir, entonces veo un mensaje indicando que no se encontraron resultados.
- Dado que borré el texto del buscador, cuando el campo queda vacío, entonces vuelvo a ver todas mis credenciales.

---

### HU-1.3 - Filtrar y ordenar credenciales

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **filtrar mis credenciales por tipo, emisor o año y cambiar el orden en que se muestran** para **encontrar lo que busco cuando tengo muchas credenciales acumuladas.**

**Reglas de Negocio:**

- Filtros disponibles: tipo de credencial (Título, Curriculares, Alternativas, Educación Continua, Externas), emisor y año de emisión.
- Los filtros pueden combinarse entre sí.
- Opciones de ordenamiento: más recientes, más antiguas, nombre A-Z, nombre Z-A.
- El estado de filtros y ordenamiento se mantiene durante la sesión.

**Criterios de Aceptación:**

- Dado que tengo credenciales de distintos tipos, cuando aplico un filtro por tipo, entonces solo veo las credenciales de ese tipo.
- Dado que aplico dos filtros simultáneos (ej: Curriculares + emisor específico), cuando los selecciono, entonces se muestran solo las credenciales que cumplen ambos criterios.
- Dado que cambio el ordenamiento a "más antiguas", cuando se aplica, entonces las credenciales se reordenan de la más antigua a la más reciente.
- Dado que quiero quitar los filtros, cuando hago clic en "limpiar filtros", entonces vuelvo a ver todas mis credenciales en el orden por defecto.

---

### HU-1.4 - Ver credenciales en tarjetas

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver mis credenciales como tarjetas que muestren la imagen de la credencial, su nombre, emisor, año de emisión, tipo y status** para **identificar rápidamente cada credencial y su estado.**

**Reglas de Negocio:**

- Cada tarjeta muestra: imagen de la credencial (elemento principal), nombre, emisor, año de emisión, tipo de credencial (Título, Curriculares, Alternativas, Educación Continua, Externas), status (Activa, Vencida, Revocada) y tags/etiquetas asociadas a la credencial.
- Al hacer clic en una tarjeta, el usuario es redirigido a la página de detalle correspondiente: E3 para credenciales OB 2.0/3.0 o E4 para títulos Blockcerts.
- El status debe ser visualmente distinguible (ej: colores o íconos diferentes para cada estado).

**Criterios de Aceptación:**

- Dado que tengo credenciales en mi wallet, cuando veo la cartera, entonces cada credencial se muestra como una tarjeta con su imagen, nombre, emisor, año, tipo, status y tags.
- Dado que hago clic en una tarjeta, cuando se procesa la acción, entonces soy redirigido a la página de detalle de esa credencial.
- Dado que una credencial tiene status "Revocada", cuando la veo en la cartera, entonces su status se distingue visualmente de una credencial "Activa".

---

### HU-1.5 - Organización de credenciales por tipo y emisor

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver mis credenciales organizadas primero por tipo de credencial y dentro de cada tipo por emisor** para **tener una vista ordenada y significativa de todos mis logros.**

**Reglas de Negocio:**

- Las credenciales se agrupan primero por tipo: Título (incluye títulos Blockcerts, es la credencial de mayor jerarquía y aparece primero), Curriculares, Alternativas, Educación Continua, Externas.
- Dentro de cada tipo, se agrupan por emisor en orden alfabético.
- Cada grupo de tipo es una sección con scroll horizontal para recorrer las credenciales cuando hay muchas en un mismo tipo.
- La página completa tiene scroll vertical para navegar entre los distintos tipos.
- Los tipos sin credenciales no se muestran.

**Criterios de Aceptación:**

- Dado que tengo credenciales de distintos tipos, cuando veo la cartera, entonces las credenciales aparecen agrupadas por secciones de tipo (Título, Curriculares, Alternativas, etc.).
- Dado que un tipo tiene más credenciales de las que caben en pantalla, cuando necesito ver más, entonces puedo hacer scroll horizontal dentro de esa sección.
- Dado que quiero navegar entre tipos, cuando hago scroll vertical, entonces paso de una sección de tipo a la siguiente.
- Dado que no tengo credenciales de un tipo específico, cuando veo la cartera, entonces ese tipo no aparece como sección.

---

### HU-1.6 - Importar credenciales externas

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **importar credenciales externas en formatos Open Badges 2.0, Open Badges 3.0, CLR**  **o blockcerts** para **tener todos mis logros consolidados en un solo lugar, incluyendo los obtenidos fuera del Tec.**

**Reglas de Negocio:**

- Formatos de importación soportados: archivo JSON, archivo de imagen (con metadata embebida) y URL de la credencial.
- Estándares soportados: Open Badges 2.0, Open Badges 3.0, Blockcerts y CLR.
- El sistema debe validar que el archivo o URL corresponde a un estándar soportado antes de importar.
- El botón de importar es el mismo desde cualquier sección de la cartera (Credenciales o CLRs). El sistema detecta el tipo de archivo y lo rutea automáticamente: las credenciales se importan a la cartera de Credenciales como tipo "Externas" y los CLRs se importan a la cartera de CLRs como origen "Externo".
- Si la validación falla, se muestra un mensaje de error indicando el motivo.

**Criterios de Aceptación:**

- Dado que hago clic en el botón "Importar", cuando se abre el flujo de importación, entonces puedo elegir entre importar un archivo (JSON o imagen) o ingresar una URL.
- Dado que subo un archivo JSON válido en Open Badges 2.0, cuando el sistema lo valida, entonces la credencial se agrega a mi cartera como tipo "Externas".
- Dado que ingreso una URL válida de una credencial Open Badges 3.0, cuando el sistema la valida, entonces la credencial se importa y aparece en mi cartera.
- Dado que subo un archivo que no corresponde a ningún estándar soportado, cuando el sistema intenta validarlo, entonces veo un mensaje de error indicando que el formato no es compatible.

---

### HU-1.7 - Estado vacío de la cartera

**Descripción:**

> Yo Como **usuario nuevo de la wallet**, quiero **ver un mensaje claro cuando no tengo credenciales en mi cartera** para **entender qué es la wallet y cómo empezar a usarla.**

**Reglas de Negocio:**

- El estado vacío se muestra cuando el usuario no tiene ninguna credencial en su cartera.
- Debe incluir un mensaje explicativo y un botón de importación para que el usuario pueda agregar sus primeras credenciales.
- Una vez que el usuario tenga al menos una credencial, el estado vacío deja de mostrarse.

**Criterios de Aceptación:**

- Dado que soy un usuario nuevo sin credenciales, cuando entro a la cartera por primera vez, entonces veo un mensaje que me explica qué es la wallet y qué puedo hacer en ella.
- Dado que estoy en el estado vacío, cuando busco cómo agregar credenciales, entonces veo un botón de importación accesible.
- Dado que importé mi primera credencial, cuando regreso a la cartera, entonces ya no veo el estado vacío sino mi credencial en formato tarjeta.

---

### HU-1.8 - Header de la cartera con menú de usuario

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver en el header de la cartera de Credenciales un botón con mi imagen de perfil que abre el menú de usuario (E12)** para **acceder a opciones de configuración como el cambio de idioma sin salir de la cartera.**

**Reglas de Negocio:**

- El header de la cartera de Credenciales incluye el botón del menú de usuario definido en E12.
- El botón es consistente en posición y apariencia con el de otras páginas de la wallet.

**Criterios de Aceptación:**

- Dado que estoy en la cartera de Credenciales, cuando veo el header, entonces veo el botón con mi imagen de perfil.
- Dado que hago clic en el botón, cuando se abre el dropdown, entonces puedo acceder al toggle de idioma y otras opciones del menú.
- Dado que cambio el idioma desde el menú en la cartera de Credenciales, cuando se aplica, entonces la interfaz se actualiza al nuevo idioma.

---

## E2 - Cartera: CLRs

### HU-2.1 - Buscar CLRs

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **buscar mis CLRs por nombre, emisor, año, descripción o etiqueta** para **encontrar rápidamente un CLR específico sin recorrer toda la lista.**

**Reglas de Negocio:**

- El buscador debe buscar por nombre del CLR, nombre del emisor, año de emisión, descripción y etiquetas asociadas.
- La búsqueda se ejecuta conforme el usuario escribe (búsqueda en tiempo real).
- Si no hay resultados, se muestra un mensaje indicándolo.

**Criterios de Aceptación:**

- Dado que tengo varios CLRs, cuando escribo un término en el buscador, entonces se muestran solo los CLRs que coinciden con el término en nombre, emisor, año, descripción o etiqueta.
- Dado que escribo un término que no coincide con ningún CLR, cuando termino de escribir, entonces veo un mensaje indicando que no se encontraron resultados.
- Dado que borré el texto del buscador, cuando el campo queda vacío, entonces vuelvo a ver todos mis CLRs.

---

### HU-2.2 - Filtrar y ordenar CLRs

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **filtrar mis CLRs por origen, emisor o año y cambiar el orden en que se muestran** para **encontrar lo que busco rápidamente.**

**Reglas de Negocio:**

- Filtros disponibles: origen (Tec / Externo), emisor y año de emisión.
- Los filtros pueden combinarse entre sí.
- Opciones de ordenamiento: más recientes, más antiguas, nombre A-Z, nombre Z-A.
- El estado de filtros y ordenamiento se mantiene durante la sesión.

**Criterios de Aceptación:**

- Dado que tengo CLRs de distintos orígenes, cuando aplico el filtro "Tec", entonces solo veo los CLRs emitidos por el Tec.
- Dado que aplico dos filtros simultáneos (ej: Tec + año específico), cuando los selecciono, entonces se muestran solo los CLRs que cumplen ambos criterios.
- Dado que cambio el ordenamiento a "nombre A-Z", cuando se aplica, entonces los CLRs se reordenan alfabéticamente.
- Dado que quiero quitar los filtros, cuando hago clic en "limpiar filtros", entonces vuelvo a ver todos mis CLRs en el orden por defecto.

---

### HU-2.3 - Ver CLRs en tarjetas con mosaico

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver mis CLRs como tarjetas que muestren un mosaico de las imágenes de las credenciales contenidas, junto con nombre, emisor, año, status y tags** para **identificar rápidamente cada CLR y su contenido.**

**Reglas de Negocio:**

- Cada tarjeta muestra: mosaico de hasta 4 imágenes de las credenciales contenidas en el CLR, nombre del CLR, emisor, año de emisión, status (Activa, Vencida, Revocada) y tags/etiquetas asociadas.
- Si el CLR contiene más de 4 credenciales, el mosaico muestra 4 imágenes y un indicador "+" con el número de credenciales restantes.
- Al hacer clic en una tarjeta, el usuario es redirigido a la página de detalle de ese CLR (E5).
- El status debe ser visualmente distinguible (ej: colores o íconos diferentes para cada estado).

**Criterios de Aceptación:**

- Dado que tengo CLRs en mi wallet, cuando veo la sección de CLRs, entonces cada CLR se muestra como una tarjeta con su mosaico de imágenes, nombre, emisor, año, status y tags.
- Dado que un CLR contiene 6 credenciales, cuando veo su tarjeta, entonces el mosaico muestra 4 imágenes y un indicador "+2".
- Dado que un CLR contiene 2 credenciales, cuando veo su tarjeta, entonces el mosaico muestra solo esas 2 imágenes sin indicador "+".
- Dado que hago clic en una tarjeta de CLR, cuando se procesa la acción, entonces soy redirigido a la página de detalle de ese CLR.

---

### HU-2.4 - Organización de CLRs por origen

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver mis CLRs organizados por origen (Tec y Externo)** para **distinguir rápidamente entre los CLRs emitidos por el Tec y los que importé de otras instituciones.**

**Reglas de Negocio:**

- Los CLRs se agrupan en dos secciones: Tec y Externo.
- Las secciones sin CLRs no se muestran.
- La página tiene scroll vertical para navegar entre secciones.

**Criterios de Aceptación:**

- Dado que tengo CLRs del Tec y externos, cuando veo la sección de CLRs, entonces aparecen organizados en dos secciones: "Tec" y "Externo".
- Dado que solo tengo CLRs del Tec, cuando veo la sección de CLRs, entonces solo aparece la sección "Tec".
- Dado que no tengo CLRs de ningún origen, cuando entro a la sección de CLRs, entonces veo el estado vacío.

---

### HU-2.5 - Importar CLRs externos

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **importar CLRs externos desde la sección de CLRs** para **tener todos mis registros de aprendizaje consolidados en un solo lugar.**

**Reglas de Negocio:**

- El botón de importar es el mismo que en la sección de Credenciales (ver HU-1.6). El sistema detecta automáticamente si el archivo importado es una credencial o un CLR y lo rutea a la sección correspondiente.
- Los CLRs importados se clasifican automáticamente como origen "Externo".
- Las mismas reglas de validación, formatos (JSON, imagen, URL) y estándares de HU-1.6 aplican.

**Criterios de Aceptación:**

- Dado que hago clic en el botón "Importar" desde la sección de CLRs, cuando subo un archivo CLR válido, entonces el CLR se agrega a mi cartera en la sección de CLRs como origen "Externo".
- Dado que importo un archivo que resulta ser una credencial individual (no CLR), cuando el sistema lo detecta, entonces la credencial se importa a la cartera de Credenciales como tipo "Externas".
- Dado que subo un archivo inválido, cuando el sistema intenta validarlo, entonces veo un mensaje de error indicando que el formato no es compatible.

---

### HU-2.6 - Estado vacío de CLRs

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver un mensaje claro cuando no tengo CLRs en mi cartera** para **entender qué son los CLRs y cómo puedo obtenerlos o importarlos.**

**Reglas de Negocio:**

- El estado vacío se muestra cuando el usuario no tiene ningún CLR.
- Debe incluir un mensaje explicativo sobre qué son los CLRs y un botón de importación.
- Una vez que el usuario tenga al menos un CLR, el estado vacío deja de mostrarse.

**Criterios de Aceptación:**

- Dado que soy un usuario sin CLRs, cuando entro a la sección de CLRs, entonces veo un mensaje que me explica qué son los CLRs y cómo puedo obtenerlos o importarlos.
- Dado que estoy en el estado vacío de CLRs, cuando busco cómo agregar CLRs, entonces veo un botón de importación accesible.
- Dado que importé mi primer CLR, cuando regreso a la sección de CLRs, entonces ya no veo el estado vacío sino mi CLR en formato tarjeta con mosaico.

---

### HU-2.7 - Header de la cartera de CLRs con menú de usuario

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver en el header de la cartera de CLRs un botón con mi imagen de perfil que abre el menú de usuario (E12)** para **acceder a opciones de configuración como el cambio de idioma sin salir de la cartera.**

**Reglas de Negocio:**

- El header de la cartera de CLRs incluye el botón del menú de usuario definido en E12.
- El botón es consistente en posición y apariencia con el de la cartera de Credenciales (E1) y otras páginas de la wallet.

**Criterios de Aceptación:**

- Dado que estoy en la cartera de CLRs, cuando veo el header, entonces veo el botón con mi imagen de perfil.
- Dado que hago clic en el botón, cuando se abre el dropdown, entonces puedo acceder al toggle de idioma y otras opciones del menú.
- Dado que cambio el idioma desde el menú en la cartera de CLRs, cuando se aplica, entonces la interfaz se actualiza al nuevo idioma.

---

## E3 - Detalle de Credencial

### HU-3.1 - Imagen principal con zoom

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la imagen de mi credencial como elemento principal de la página de detalle y poder ampliarla** para **apreciar los detalles visuales de mi credencial.**

**Reglas de Negocio:**

- La imagen de la credencial es el elemento visual principal de la página de detalle.
- Al hacer clic en la imagen, se amplía a pantalla completa con fondo negro translúcido.
- El usuario puede cerrar la vista ampliada haciendo clic fuera de la imagen o en un botón de cerrar.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de una credencial, cuando veo la página, entonces la imagen de la credencial se muestra como elemento principal.
- Dado que hago clic en la imagen, cuando se amplía, entonces se muestra a pantalla completa con fondo negro translúcido.
- Dado que estoy viendo la imagen ampliada, cuando hago clic fuera de ella o en el botón de cerrar, entonces regreso a la vista normal del detalle.

---

### HU-3.2 - Sección Logro

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver toda la información del logro asociado a mi credencial** para **entender qué obtuve, bajo qué criterios y cómo se alinea con competencias o estándares.**

**Reglas de Negocio:**

- La sección Logro muestra los siguientes campos (solo se muestran los que la credencial traiga, los vacíos se omiten):
  - Nombre del logro
  - Descripción
  - Tipo de logro (Badge, Certificado, Diploma, Curso, MicroCredencial, etc.)
  - Criterios para obtenerlo
  - Campo de estudio
  - Especialización
  - Código (código humano del curso o programa)
  - Créditos disponibles
  - Etiquetas/tags
  - Alineamientos (competencias o estándares externos vinculados)
  - Idioma
  - Versión
  - Resultados (calificación obtenida, nivel de rúbrica, valor)
  - Endorsements (avales de terceros sobre el logro)
- Los campos aplican tanto para credenciales Open Badges 2.0 como 3.0. Algunos campos solo existen en OB 3.0 (tipo de logro, campo de estudio, especialización, código, créditos, idioma, resultados).

**Criterios de Aceptación:**

- Dado que estoy en el detalle de una credencial, cuando veo la sección Logro, entonces se muestran todos los campos disponibles del logro asociado.
- Dado que la credencial es OB 3.0 y tiene campo de estudio, especialización y resultados, cuando veo la sección Logro, entonces esos campos aparecen con su información.
- Dado que la credencial es OB 2.0 y no tiene campos exclusivos de 3.0, cuando veo la sección Logro, entonces esos campos simplemente no aparecen.
- Dado que el logro tiene alineamientos con competencias externas, cuando veo la sección Logro, entonces puedo ver los estándares o competencias vinculados.

---

### HU-3.3 - Sección Credencial

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la información de la credencial como sus fechas, status y evidencias** para **conocer la vigencia y respaldo de mi logro.**

**Reglas de Negocio:**

- La sección Credencial muestra los siguientes campos (solo se muestran los que la credencial traiga, los vacíos se omiten):
  - Status (Activa, Vencida, Revocada)
  - Fecha de emisión
  - Fecha de expiración
  - Fecha de otorgamiento
  - Evidencias (trabajos, portafolios o artefactos que respaldan el logro)
  - Términos de uso
- El status debe ser visualmente distinguible.
- Si la credencial está revocada, se debe mostrar el motivo de revocación cuando esté disponible.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de una credencial, cuando veo la sección Credencial, entonces se muestran el status, las fechas disponibles y las evidencias asociadas.
- Dado que la credencial tiene evidencias, cuando veo la sección Credencial, entonces puedo ver las evidencias con sus datos (nombre, descripción, enlace).
- Dado que la credencial está revocada, cuando veo la sección Credencial, entonces el status indica "Revocada" de forma visualmente clara y muestra el motivo si está disponible.
- Dado que la credencial no tiene fecha de expiración, cuando veo la sección Credencial, entonces ese campo no aparece.

---

### HU-3.4 - Sección Receptor

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la información del receptor de la credencial** para **confirmar mis datos y los detalles de mi participación en la actividad.**

**Reglas de Negocio:**

- La sección Receptor muestra los siguientes campos (solo se muestran los que la credencial traiga, los vacíos se omiten):
  - Nombre / identidad del receptor
  - Fecha de inicio de actividad
  - Fecha de fin de actividad
  - Créditos obtenidos
  - Número de licencia
  - Periodo académico
  - Rol del receptor en la actividad

**Criterios de Aceptación:**

- Dado que estoy en el detalle de una credencial, cuando veo la sección Receptor, entonces se muestra mi nombre como destinatario de la credencial.
- Dado que la credencial incluye fechas de actividad y créditos obtenidos, cuando veo la sección Receptor, entonces esos campos aparecen con su información.
- Dado que la credencial no incluye campos opcionales como número de licencia o rol, cuando veo la sección Receptor, entonces esos campos no aparecen.

---

### HU-3.5 - Sección Emisor

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la información completa del emisor de mi credencial** para **saber quién la emitió y cómo contactarlos.**

**Reglas de Negocio:**

- La sección Emisor muestra los siguientes campos (solo se muestran los que la credencial traiga, los vacíos se omiten):
  - Nombre de la organización
  - Descripción
  - Logo / imagen
  - URL del sitio web
  - Email de contacto
  - Teléfono
  - Dirección (OB 3.0)

**Criterios de Aceptación:**

- Dado que estoy en el detalle de una credencial, cuando veo la sección Emisor, entonces se muestra el nombre y logo de la organización emisora.
- Dado que el emisor tiene URL y email, cuando veo la sección Emisor, entonces puedo ver y acceder a su sitio web y correo de contacto.
- Dado que el emisor no tiene teléfono ni dirección, cuando veo la sección Emisor, entonces esos campos no aparecen.

---

### HU-3.6 - Compartir credencial

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **compartir mi credencial a través de un link público, descargarla o publicarla en LinkedIn** para **hacer visible mi logro en diferentes plataformas y contextos.**

**Reglas de Negocio:**

- El botón de compartir ofrece las siguientes opciones:
  - **Link público:** Genera un link a la página pública de la credencial (E6). Debe incluir opción de copiar al portapapeles. El usuario puede desactivar el link en cualquier momento.
  - **Descargar JSON:** Descarga el archivo JSON de la credencial en su estándar original (OB 2.0 o 3.0).
  - **Descargar PNG baked:** Descarga la imagen PNG con la metadata de la credencial embebida (baked badge).
  - **Compartir en LinkedIn:** Redirige al flujo de LinkedIn para agregar la credencial al perfil profesional en la sección "Licencias y certificaciones". El link publicado en LinkedIn debe apuntar a la página pública verificable.
- El link público no requiere que el receptor esté autenticado.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de una credencial, cuando hago clic en "Compartir", entonces veo las opciones disponibles: link público, descargar JSON, descargar PNG baked y compartir en LinkedIn.
- Dado que selecciono "Link público", cuando se genera el link, entonces puedo copiarlo al portapapeles y al abrirlo lleva a la página pública de la credencial.
- Dado que selecciono "Descargar JSON", cuando se descarga, entonces obtengo el archivo JSON de la credencial en su estándar original.
- Dado que selecciono "Descargar PNG baked", cuando se descarga, entonces obtengo la imagen PNG con la metadata embebida.
- Dado que selecciono "Compartir en LinkedIn", cuando completo el flujo de autorización, entonces la credencial aparece en mi perfil de LinkedIn con un link verificable.
- Dado que desactivo un link público generado, cuando alguien intenta acceder, entonces el link ya no funciona.

---

### HU-3.7 - Botón de regreso a la cartera de Credenciales

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver un botón de regreso en la página de detalle de credencial** para **volver a la cartera de Credenciales (E1) sin tener que usar el botón del navegador.**

**Reglas de Negocio:**

- El botón de regreso está siempre visible en la página de detalle de credencial.
- Al hacer clic, regresa al usuario a la cartera de Credenciales (E1).
- El estado de filtros y ordenamiento de la cartera se mantiene al regresar.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de una credencial, cuando veo la página, entonces hay un botón de regreso visible.
- Dado que hago clic en el botón de regreso, cuando se procesa la acción, entonces regreso a la cartera de Credenciales.
- Dado que había aplicado filtros en la cartera antes de entrar al detalle, cuando regreso con el botón, entonces los filtros se mantienen aplicados.

---

## E4 - Detalle de Título

### HU-4.1 - Imagen principal del título con zoom

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la imagen de mi título como elemento principal de la página de detalle y poder ampliarla** para **apreciar los detalles visuales de mi título.**

**Reglas de Negocio:**

- La imagen del título/certificado es el elemento visual principal de la página de detalle.
- Al hacer clic en la imagen, se amplía a pantalla completa con fondo negro translúcido.
- El usuario puede cerrar la vista ampliada haciendo clic fuera de la imagen o en un botón de cerrar.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un título, cuando veo la página, entonces la imagen del título se muestra como elemento principal.
- Dado que hago clic en la imagen, cuando se amplía, entonces se muestra a pantalla completa con fondo negro translúcido.
- Dado que estoy viendo la imagen ampliada, cuando hago clic fuera de ella o en el botón de cerrar, entonces regreso a la vista normal del detalle.

---

### HU-4.2 - Sección Título

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver toda la información de mi título** para **conocer los detalles de mi grado académico.**

**Reglas de Negocio:**

- La sección Título muestra los siguientes campos (solo se muestran los que el título traiga, los vacíos se omiten):
  - Nombre del título (ej: "Ingeniero en Tecnologías Computacionales")
  - Subtítulo
  - Descripción
  - Criterios para obtenerlo
  - Fecha de emisión
  - Fecha de expiración (si aplica)
  - Etiquetas/tags
  - Alineamientos (competencias o estándares externos vinculados)
  - Status (Activa, Vencida, Revocada)
- El status debe ser visualmente distinguible.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un título, cuando veo la sección Título, entonces se muestran el nombre, descripción, fecha de emisión y status del título.
- Dado que el título tiene alineamientos con competencias externas, cuando veo la sección Título, entonces puedo ver los estándares o competencias vinculados.
- Dado que el título no tiene subtítulo ni fecha de expiración, cuando veo la sección Título, entonces esos campos no aparecen.

---

### HU-4.3 - Sección Receptor del título

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la información del receptor del título** para **confirmar mis datos como titular del grado.**

**Reglas de Negocio:**

- La sección Receptor muestra el nombre completo del destinatario del título.
- Solo se muestran los campos que el título traiga.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un título, cuando veo la sección Receptor, entonces se muestra mi nombre completo como titular del título.

---

### HU-4.4 - Sección Emisor del título con líneas de firma

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la información del emisor del título y las líneas de firma de las autoridades que lo avalaron** para **saber quién emitió mi título y qué autoridades lo firmaron.**

**Reglas de Negocio:**

- La sección Emisor muestra los siguientes campos (solo se muestran los que el título traiga, los vacíos se omiten):
  - Nombre de la organización
  - Descripción
  - Logo / imagen
  - URL del sitio web
  - Email de contacto
  - Teléfono
- Además, muestra las líneas de firma (campo exclusivo de Blockcerts), cada una con:
  - Imagen de la firma
  - Nombre del firmante
  - Cargo del firmante (ej: "Rector", "Director de Escuela")

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un título, cuando veo la sección Emisor, entonces se muestra el nombre y logo de la organización emisora.
- Dado que el título tiene líneas de firma, cuando veo la sección Emisor, entonces puedo ver cada firma con el nombre y cargo del firmante.
- Dado que el título tiene múltiples firmantes, cuando veo las líneas de firma, entonces se muestran todas las firmas disponibles.

---

### HU-4.5 - Sección Verificación Blockchain

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver los detalles de la verificación blockchain de mi título** para **confirmar que está registrado en la blockchain y conocer los datos técnicos de su verificación.**

**Reglas de Negocio:**

- La sección muestra los siguientes campos:
  - Status de verificación (válido / inválido / revocado)
  - ID de transacción en la blockchain
  - Tipo de blockchain (Bitcoin, Ethereum, etc.)
  - Hash del certificado
  - Llave pública del emisor
  - Fecha de la prueba criptográfica
- Debe incluir un link al explorador de blockchain correspondiente para verificar la transacción.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un título Blockcerts, cuando veo la sección Verificación Blockchain, entonces puedo ver el ID de transacción, tipo de blockchain y hash del certificado.
- Dado que quiero verificar la transacción en la blockchain, cuando hago clic en el link al explorador, entonces soy redirigido al explorador de blockchain correspondiente con la transacción.
- Dado que el título fue revocado, cuando veo la sección Verificación Blockchain, entonces el status indica "Revocado" de forma clara.

---

### HU-4.6 - Descargar título

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **descargar mi título en formato JSON Blockcerts, XML SEP o PDF oficial** para **tener copias en diferentes formatos según lo que necesite.**

**Reglas de Negocio:**

- El botón de descarga ofrece las siguientes opciones:
  - **JSON Blockcerts:** Descarga el archivo JSON del título en formato Blockcerts original.
  - **XML SEP:** Descarga el título en formato XML compatible con la Secretaría de Educación Pública.
  - **PDF oficial:** Descarga el título como PDF oficial.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un título, cuando hago clic en "Descargar", entonces veo las opciones disponibles: JSON Blockcerts, XML SEP y PDF oficial.
- Dado que selecciono "JSON Blockcerts", cuando se descarga, entonces obtengo el archivo JSON del título en formato Blockcerts.
- Dado que selecciono "XML SEP", cuando se descarga, entonces obtengo el archivo XML compatible con la SEP.
- Dado que selecciono "PDF oficial", cuando se descarga, entonces obtengo el PDF oficial del título.

---

### HU-4.7 - Compartir título

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **compartir mi título a través de un link público o publicarlo en LinkedIn** para **hacer visible mi grado académico en diferentes plataformas.**

**Reglas de Negocio:**

- El botón de compartir ofrece las siguientes opciones:
  - **Link público:** Genera un link a la página pública del título (E7). Debe incluir opción de copiar al portapapeles. El usuario puede desactivar el link en cualquier momento.
  - **Compartir en LinkedIn:** Redirige al flujo de LinkedIn para agregar el título al perfil profesional. El link publicado en LinkedIn debe apuntar a la página pública verificable.
- El link público no requiere que el receptor esté autenticado.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un título, cuando hago clic en "Compartir", entonces veo las opciones disponibles: link público y compartir en LinkedIn.
- Dado que selecciono "Link público", cuando se genera el link, entonces puedo copiarlo al portapapeles y al abrirlo lleva a la página pública del título.
- Dado que selecciono "Compartir en LinkedIn", cuando completo el flujo, entonces el título aparece en mi perfil de LinkedIn con un link verificable.
- Dado que desactivo un link público generado, cuando alguien intenta acceder, entonces el link ya no funciona.

---

### HU-4.8 - Botón de regreso a la cartera de Credenciales desde título

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver un botón de regreso en la página de detalle de título** para **volver a la cartera de Credenciales (E1) sin tener que usar el botón del navegador.**

**Reglas de Negocio:**

- El botón de regreso está siempre visible en la página de detalle de título.
- Al hacer clic, regresa al usuario a la cartera de Credenciales (E1).
- El estado de filtros y ordenamiento de la cartera se mantiene al regresar.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un título, cuando veo la página, entonces hay un botón de regreso visible.
- Dado que hago clic en el botón de regreso, cuando se procesa la acción, entonces regreso a la cartera de Credenciales.
- Dado que había aplicado filtros en la cartera antes de entrar al detalle del título, cuando regreso con el botón, entonces los filtros se mantienen aplicados.

---

## E5 - Detalle de CLR

### HU-5.1 - Credenciales contenidas en el CLR

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver las credenciales que componen mi CLR como elemento principal de la página de detalle** para **entender rápidamente qué logros están agrupados en este registro.**

**Reglas de Negocio:**

- Las credenciales contenidas son la sección prioritaria de la página de detalle del CLR y se muestran de forma prominente.
- Cada credencial se muestra como un preview con: imagen, nombre y emisor.
- Al hacer clic en una credencial, el usuario es redirigido a la página de detalle de esa credencial (E3).
- Si el CLR no contiene credenciales, se muestra un mensaje indicándolo.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un CLR, cuando veo la página, entonces las credenciales contenidas se muestran como la sección principal y más prominente.
- Dado que el CLR contiene varias credenciales, cuando las veo, entonces cada una muestra su imagen, nombre y emisor.
- Dado que hago clic en una credencial dentro del CLR, cuando se procesa la acción, entonces soy redirigido a la página de detalle de esa credencial.

---

### HU-5.2 - Información del CLR

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la información general de mi CLR** para **conocer los detalles del registro como documento.**

**Reglas de Negocio:**

- La sección muestra los siguientes campos (solo se muestran los que el CLR traiga, los vacíos se omiten):
  - Nombre del CLR
  - Descripción
  - Status (Activa, Vencida, Revocada)
  - Fecha de emisión
  - Fecha de expiración
  - Fecha de otorgamiento
  - Indicador parcial/completo (si el CLR representa un snapshot parcial o completo del historial del aprendiz)
  - Evidencias
  - Términos de uso
- El status debe ser visualmente distinguible.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un CLR, cuando veo la sección de información, entonces se muestran el nombre, descripción, status y fechas disponibles.
- Dado que el CLR está marcado como parcial, cuando veo la sección de información, entonces se indica claramente que es un registro parcial del historial.
- Dado que el CLR no tiene fecha de expiración, cuando veo la sección de información, entonces ese campo no aparece.

---

### HU-5.3 - Sección Receptor del CLR

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la información del receptor del CLR** para **confirmar mis datos como destinatario del registro.**

**Reglas de Negocio:**

- Se muestran los mismos campos de receptor que en el detalle de credencial (E3 - HU-3.4): nombre/identidad, fecha de inicio y fin de actividad, créditos obtenidos, número de licencia, periodo académico y rol.
- Solo se muestran los campos que el CLR traiga, los vacíos se omiten.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un CLR, cuando veo la sección Receptor, entonces se muestra mi nombre como destinatario del registro.
- Dado que el CLR incluye créditos obtenidos y periodo académico, cuando veo la sección Receptor, entonces esos campos aparecen con su información.
- Dado que el CLR no incluye campos opcionales, cuando veo la sección Receptor, entonces esos campos no aparecen.

---

### HU-5.4 - Sección Emisor del CLR

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver la información del emisor del CLR** para **saber quién emitió este registro de aprendizaje.**

**Reglas de Negocio:**

- Se muestran los mismos campos de emisor que en el detalle de credencial (E3 - HU-3.5): nombre, descripción, logo/imagen, URL, email, teléfono y dirección.
- El emisor del CLR puede ser distinto al emisor de las credenciales individuales contenidas en él.
- Solo se muestran los campos que el CLR traiga, los vacíos se omiten.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un CLR, cuando veo la sección Emisor, entonces se muestra el nombre y logo de la organización que emitió el CLR.
- Dado que el emisor del CLR es diferente al emisor de alguna credencial contenida, cuando veo ambas secciones, entonces cada una muestra su emisor correspondiente.
- Dado que el emisor no tiene teléfono ni dirección, cuando veo la sección Emisor, entonces esos campos no aparecen.

---

### HU-5.5 - Compartir CLR

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **compartir mi CLR a través de un link público, descargarlo o publicarlo en LinkedIn** para **hacer visible mi trayectoria de aprendizaje en diferentes plataformas y contextos.**

**Reglas de Negocio:**

- El botón de compartir ofrece las siguientes opciones:
  - **Link público:** Genera un link a la página pública del CLR (E8). Debe incluir opción de copiar al portapapeles. El usuario puede desactivar el link en cualquier momento.
  - **Descargar JSON:** Descarga el archivo JSON del CLR en su estándar original.
  - **Compartir en LinkedIn:** Redirige al flujo de LinkedIn para agregar el CLR al perfil profesional. El link publicado en LinkedIn debe apuntar a la página pública verificable.
- El link público no requiere que el receptor esté autenticado.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un CLR, cuando hago clic en "Compartir", entonces veo las opciones disponibles: link público, descargar JSON y compartir en LinkedIn.
- Dado que selecciono "Link público", cuando se genera el link, entonces puedo copiarlo al portapapeles y al abrirlo lleva a la página pública del CLR.
- Dado que selecciono "Descargar JSON", cuando se descarga, entonces obtengo el archivo JSON del CLR.
- Dado que selecciono "Compartir en LinkedIn", cuando completo el flujo, entonces el CLR aparece en mi perfil de LinkedIn con un link verificable.
- Dado que desactivo un link público generado, cuando alguien intenta acceder, entonces el link ya no funciona.

---

### HU-5.6 - Botón de regreso a la cartera de CLRs

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver un botón de regreso en la página de detalle de CLR** para **volver a la cartera de CLRs (E2) sin tener que usar el botón del navegador.**

**Reglas de Negocio:**

- El botón de regreso está siempre visible en la página de detalle de CLR.
- Al hacer clic, regresa al usuario a la cartera de CLRs (E2), no a la de Credenciales.
- El estado de filtros y ordenamiento de la cartera de CLRs se mantiene al regresar.

**Criterios de Aceptación:**

- Dado que estoy en el detalle de un CLR, cuando veo la página, entonces hay un botón de regreso visible.
- Dado que hago clic en el botón de regreso, cuando se procesa la acción, entonces regreso a la cartera de CLRs.
- Dado que había aplicado filtros en la cartera de CLRs antes de entrar al detalle, cuando regreso con el botón, entonces los filtros se mantienen aplicados.

---

## E6 - Página Pública de Credencial

### HU-6.1 - Imagen principal de la credencial pública

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la imagen de la credencial como elemento principal de la página pública** para **identificar visualmente el logro compartido.**

**Reglas de Negocio:**

- La página es accesible sin autenticación, a través de un link compartido por el usuario.
- La imagen de la credencial se muestra como elemento visual principal.
- Si el usuario desactivó el link, se muestra un mensaje indicando que el link ya no está disponible.

**Criterios de Aceptación:**

- Dado que tengo un link compartido de una credencial, cuando lo abro desde cualquier navegador sin estar autenticado, entonces veo la imagen de la credencial como elemento principal de la página.
- Dado que el usuario desactivó el link, cuando intento acceder, entonces veo un mensaje indicando que el link ya no está disponible.

---

### HU-6.2 - Sección Logro público

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información del logro asociado a la credencial compartida** para **entender qué obtuvo la persona, bajo qué criterios y cómo se alinea con competencias o estándares.**

**Reglas de Negocio:**

- Se muestran los mismos campos de logro que en el detalle privado (E3 - HU-3.2): nombre, descripción, tipo de logro, criterios, campo de estudio, especialización, código, créditos disponibles, etiquetas/tags, alineamientos, idioma, versión, resultados y endorsements.
- Solo se muestran los campos que la credencial traiga, los vacíos se omiten.

**Criterios de Aceptación:**

- Dado que accedo a la página pública de una credencial, cuando veo la sección Logro, entonces se muestran todos los campos disponibles del logro.
- Dado que el logro tiene alineamientos con competencias externas, cuando veo la sección Logro, entonces puedo ver los estándares o competencias vinculados.
- Dado que la credencial es OB 2.0 y no tiene campos exclusivos de 3.0, cuando veo la sección Logro, entonces esos campos simplemente no aparecen.

---

### HU-6.3 - Sección Credencial pública

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información de la credencial como sus fechas, status y evidencias** para **conocer la vigencia y respaldo del logro.**

**Reglas de Negocio:**

- Se muestran los mismos campos de credencial que en el detalle privado (E3 - HU-3.3): status, fecha de emisión, fecha de expiración, fecha de otorgamiento, evidencias y términos de uso.
- Solo se muestran los campos que la credencial traiga, los vacíos se omiten.
- El status debe ser visualmente distinguible.

**Criterios de Aceptación:**

- Dado que accedo a la página pública de una credencial, cuando veo la sección Credencial, entonces se muestran el status, las fechas disponibles y las evidencias asociadas.
- Dado que la credencial está revocada, cuando veo la sección Credencial, entonces el status indica "Revocada" de forma visualmente clara y muestra el motivo si está disponible.
- Dado que la credencial está vencida, cuando veo la sección Credencial, entonces el status indica "Vencida" de forma visualmente clara.

---

### HU-6.4 - Sección Receptor público

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información del receptor de la credencial** para **confirmar quién obtuvo el logro y los detalles de su participación.**

**Reglas de Negocio:**

- Se muestran los mismos campos de receptor que en el detalle privado (E3 - HU-3.4): nombre/identidad, fecha de inicio y fin de actividad, créditos obtenidos, número de licencia, periodo académico y rol.
- Solo se muestran los campos que la credencial traiga, los vacíos se omiten.

**Criterios de Aceptación:**

- Dado que accedo a la página pública de una credencial, cuando veo la sección Receptor, entonces se muestra el nombre del destinatario de la credencial.
- Dado que la credencial incluye fechas de actividad y créditos obtenidos, cuando veo la sección Receptor, entonces esos campos aparecen con su información.

---

### HU-6.5 - Sección Emisor público con identificación de origen

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información del emisor y saber si la credencial fue emitida por el Tec o por un emisor externo** para **evaluar la confiabilidad del logro presentado.**

**Reglas de Negocio:**

- Si la credencial fue emitida por el Tec (emisor institucional), se muestran los datos completos del emisor: nombre, descripción, logo, URL, email, teléfono y dirección, con una marca de emisor institucional verificado.
- Si la credencial es externa (importada por el usuario), se muestra "Emisor externo" con la información que traiga la credencial y una marca de "sin verificar" que indica que el Tec no avala la autenticidad de esa credencial.

**Criterios de Aceptación:**

- Dado que accedo a la página pública de una credencial emitida por el Tec, cuando veo la sección Emisor, entonces se muestra la información del emisor institucional con una marca de verificado.
- Dado que accedo a la página pública de una credencial externa, cuando veo la sección Emisor, entonces se muestra "Emisor externo" con la información disponible y una marca de "sin verificar".
- Dado que el emisor externo tiene datos parciales, cuando veo la sección Emisor, entonces solo se muestran los campos disponibles.

---

### HU-6.6 - Verificador integrado

**Descripción:**

> Yo Como **empleador / verificador**, quiero **verificar la autenticidad de la credencial directamente desde la página pública y ver cuándo fue la última verificación** para **tener certeza de que el logro es legítimo.**

**Reglas de Negocio:**

- La página pública incluye un botón para verificar la autenticidad de la credencial.
- La verificación se realiza utilizando el verificador de 1EdTech.
- Los resultados se presentan desglosados por cada área evaluada por el verificador.
- El resultado general debe ser claro: válida / inválida / revocada.
- Se muestra la fecha y hora de la última verificación realizada en la página.
- La verificación no requiere autenticación.

**Criterios de Aceptación:**

- Dado que estoy en la página pública de una credencial, cuando hago clic en "Verificar", entonces el sistema valida la credencial con el verificador de 1EdTech y me muestra el resultado general y el desglose por área evaluada.
- Dado que la verificación fue exitosa, cuando veo el resultado, entonces se muestra la fecha y hora en que se realizó.
- Dado que la credencial fue revocada, cuando la verifico, entonces el sistema indica claramente el status de revocación y no que es válida.
- Dado que ya se verificó previamente la credencial, cuando veo la página, entonces puedo ver la fecha y hora de la última verificación realizada.

---

## E7 - Página Pública de Título

### HU-7.1 - Imagen principal del título público

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la imagen del título como elemento principal de la página pública** para **identificar visualmente el grado académico compartido.**

**Reglas de Negocio:**

- La página es accesible sin autenticación, a través de un link compartido por el usuario.
- La imagen del título se muestra como elemento visual principal.
- Si el usuario desactivó el link, se muestra un mensaje indicando que el link ya no está disponible.
- No se permite descargar ningún archivo desde la página pública.

**Criterios de Aceptación:**

- Dado que tengo un link compartido de un título, cuando lo abro desde cualquier navegador sin estar autenticado, entonces veo la imagen del título como elemento principal de la página.
- Dado que el usuario desactivó el link, cuando intento acceder, entonces veo un mensaje indicando que el link ya no está disponible.

---

### HU-7.2 - Sección Título público

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información del título compartido** para **conocer los detalles del grado académico que obtuvo la persona.**

**Reglas de Negocio:**

- Se muestran los mismos campos que en el detalle privado (E4 - HU-4.2): nombre, subtítulo, descripción, criterios, fecha de emisión, fecha de expiración, tags, alineamientos y status.
- Solo se muestran los campos que el título traiga, los vacíos se omiten.
- El status debe ser visualmente distinguible.

**Criterios de Aceptación:**

- Dado que accedo a la página pública de un título, cuando veo la sección Título, entonces se muestran el nombre, descripción, fecha de emisión y status.
- Dado que el título está revocado, cuando veo la sección Título, entonces el status indica "Revocado" de forma visualmente clara.

---

### HU-7.3 - Sección Receptor público del título

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información del receptor del título** para **confirmar quién obtuvo el grado académico.**

**Reglas de Negocio:**

- Se muestra el nombre completo del titular del título.

**Criterios de Aceptación:**

- Dado que accedo a la página pública de un título, cuando veo la sección Receptor, entonces se muestra el nombre completo del titular.

---

### HU-7.4 - Sección Emisor público del título con líneas de firma e identificación de origen

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información del emisor del título, las líneas de firma y saber si fue emitido por el Tec o por un emisor externo** para **evaluar la confiabilidad del título presentado.**

**Reglas de Negocio:**

- Si el título fue emitido por el Tec, se muestran los datos completos del emisor con una marca de emisor institucional verificado, incluyendo las líneas de firma (nombre, cargo e imagen de firma de cada firmante).
- Si el título es externo (importado por el usuario), se muestra "Emisor externo" con la información disponible y una marca de "sin verificar".

**Criterios de Aceptación:**

- Dado que accedo a la página pública de un título emitido por el Tec, cuando veo la sección Emisor, entonces se muestra la información del emisor con marca de verificado y las líneas de firma.
- Dado que accedo a la página pública de un título externo, cuando veo la sección Emisor, entonces se muestra "Emisor externo" con la información disponible y una marca de "sin verificar".

---

### HU-7.5 - Verificador integrado del título

**Descripción:**

> Yo Como **empleador / verificador**, quiero **verificar la autenticidad del título directamente desde la página pública y ver cuándo fue la última verificación** para **tener certeza de que el título es legítimo.**

**Reglas de Negocio:**

- La página pública incluye un botón para verificar la autenticidad del título.
- La verificación se realiza utilizando el verificador de 1EdTech.
- Los resultados se presentan desglosados por cada área evaluada por el verificador.
- El resultado general debe ser claro: válido / inválido / revocado.
- Se muestra la fecha y hora de la última verificación realizada.
- La verificación no requiere autenticación.

**Criterios de Aceptación:**

- Dado que estoy en la página pública de un título, cuando hago clic en "Verificar", entonces el sistema valida el título con el verificador de 1EdTech y me muestra el resultado general y el desglose por área evaluada.
- Dado que la verificación fue exitosa, cuando veo el resultado, entonces se muestra la fecha y hora en que se realizó.
- Dado que el título fue revocado, cuando lo verifico, entonces el sistema indica claramente el status de revocación.
- Dado que ya se verificó previamente el título, cuando veo la página, entonces puedo ver la fecha y hora de la última verificación realizada.

---

## E8 - Página Pública de CLR

### HU-8.1 - Credenciales contenidas en el CLR público

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver las credenciales que componen el CLR compartido como elemento principal de la página** para **entender rápidamente qué logros acumuló la persona en este registro.**

**Reglas de Negocio:**

- La página es accesible sin autenticación, a través de un link compartido por el usuario.
- Las credenciales contenidas son la sección prioritaria y se muestran de forma prominente.
- Cada credencial se muestra como un preview con: imagen, nombre y emisor.
- Al hacer clic en una credencial, el visitante es redirigido a la página pública de esa credencial (E6).
- Si el usuario desactivó el link, se muestra un mensaje indicando que el link ya no está disponible.

**Criterios de Aceptación:**

- Dado que tengo un link compartido de un CLR, cuando lo abro desde cualquier navegador sin estar autenticado, entonces las credenciales contenidas se muestran como la sección principal y más prominente.
- Dado que el CLR contiene varias credenciales, cuando las veo, entonces cada una muestra su imagen, nombre y emisor.
- Dado que hago clic en una credencial dentro del CLR público, cuando se procesa la acción, entonces soy redirigido a la página pública de esa credencial.
- Dado que el usuario desactivó el link, cuando intento acceder, entonces veo un mensaje indicando que el link ya no está disponible.

---

### HU-8.2 - Información pública del CLR

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información general del CLR compartido** para **conocer los detalles del registro como documento.**

**Reglas de Negocio:**

- Se muestran los mismos campos que en el detalle privado (E5 - HU-5.2): nombre, descripción, status, fecha de emisión, fecha de expiración, fecha de otorgamiento, indicador parcial/completo, evidencias y términos de uso.
- Solo se muestran los campos que el CLR traiga, los vacíos se omiten.
- El status debe ser visualmente distinguible.

**Criterios de Aceptación:**

- Dado que accedo a la página pública de un CLR, cuando veo la sección de información, entonces se muestran el nombre, descripción, status y fechas disponibles.
- Dado que el CLR está marcado como parcial, cuando veo la sección de información, entonces se indica claramente que es un registro parcial.
- Dado que el CLR está revocado, cuando veo la sección de información, entonces el status indica "Revocado" de forma visualmente clara.

---

### HU-8.3 - Sección Receptor público del CLR

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información del receptor del CLR** para **confirmar quién es el titular del registro de aprendizaje.**

**Reglas de Negocio:**

- Se muestran los mismos campos de receptor que en el detalle privado (E5 - HU-5.3): nombre/identidad, fecha de inicio y fin de actividad, créditos obtenidos, número de licencia, periodo académico y rol.
- Solo se muestran los campos que el CLR traiga, los vacíos se omiten.

**Criterios de Aceptación:**

- Dado que accedo a la página pública de un CLR, cuando veo la sección Receptor, entonces se muestra el nombre del destinatario del registro.
- Dado que el CLR incluye créditos obtenidos y periodo académico, cuando veo la sección Receptor, entonces esos campos aparecen con su información.

---

### HU-8.4 - Sección Emisor público del CLR con identificación de origen

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver la información del emisor del CLR y saber si fue emitido por el Tec o por un emisor externo** para **evaluar la confiabilidad del registro presentado.**

**Reglas de Negocio:**

- Si el CLR fue emitido por el Tec, se muestran los datos completos del emisor con una marca de emisor institucional verificado.
- Si el CLR es externo (importado por el usuario), se muestra "Emisor externo" con la información disponible y una marca de "sin verificar".

**Criterios de Aceptación:**

- Dado que accedo a la página pública de un CLR emitido por el Tec, cuando veo la sección Emisor, entonces se muestra la información del emisor institucional con una marca de verificado.
- Dado que accedo a la página pública de un CLR externo, cuando veo la sección Emisor, entonces se muestra "Emisor externo" con la información disponible y una marca de "sin verificar".

---

### HU-8.5 - Verificador integrado del CLR

**Descripción:**

> Yo Como **empleador / verificador**, quiero **verificar la autenticidad del CLR directamente desde la página pública y ver cuándo fue la última verificación** para **tener certeza de que el registro es legítimo.**

**Reglas de Negocio:**

- La página pública incluye un botón para verificar la autenticidad del CLR.
- La verificación se realiza utilizando el verificador de 1EdTech.
- Los resultados se presentan desglosados por cada área evaluada por el verificador.
- El resultado general debe ser claro: válido / inválido / revocado.
- Se muestra la fecha y hora de la última verificación realizada.
- La verificación no requiere autenticación.

**Criterios de Aceptación:**

- Dado que estoy en la página pública de un CLR, cuando hago clic en "Verificar", entonces el sistema valida el CLR con el verificador de 1EdTech y me muestra el resultado general y el desglose por área evaluada.
- Dado que la verificación fue exitosa, cuando veo el resultado, entonces se muestra la fecha y hora en que se realizó.
- Dado que el CLR fue revocado, cuando lo verifico, entonces el sistema indica claramente el status de revocación.
- Dado que ya se verificó previamente el CLR, cuando veo la página, entonces puedo ver la fecha y hora de la última verificación realizada.

---

## E9 - Verificador Público

### HU-9.1 - Página del verificador público

**Descripción:**

> Yo Como **empleador / verificador**, quiero **acceder a una página web pública diseñada para verificar credenciales** para **poder comprobar la autenticidad de cualquier credencial o CLR que me presenten.**

**Reglas de Negocio:**

- La página es accesible por cualquier persona sin autenticación.
- Está diseñada para personas que necesitan verificar credenciales (empleadores, instituciones, etc.).
- Permite ingresar una credencial o CLR para verificar mediante archivo JSON, archivo de imagen (PNG/SVG con metadata embebida) o URL.
- Soporta verificación de Open Badges 2.0, Open Badges 3.0 y CLR 2.0 en cualquiera de los tres formatos de entrada.

**Criterios de Aceptación:**

- Dado que soy un empleador o verificador, cuando accedo a la página del verificador público, entonces veo una interfaz clara para ingresar una credencial o CLR a verificar.
- Dado que quiero verificar una credencial, cuando la ingreso, entonces puedo hacerlo mediante archivo JSON, imagen (PNG/SVG) o URL.
- Dado que subo una imagen PNG con metadata embebida de un Open Badge 2.0, cuando el sistema la procesa, entonces extrae la credencial y la verifica correctamente.
- Dado que ingreso un formato no soportado, cuando intento verificar, entonces veo un mensaje de error indicando los formatos aceptados.

---

### HU-9.2 - Verificación con el verificador de 1EdTech

**Descripción:**

> Yo Como **empleador / verificador**, quiero **que la verificación utilice el verificador de 1EdTech** para **tener la certeza de que se valida con el estándar oficial de la industria.**

**Reglas de Negocio:**

- La verificación se realiza utilizando el verificador de 1EdTech para Open Badges 2.0, Open Badges 3.0 y CLR 2.0.
- Los resultados se presentan desglosados por cada área evaluada por el verificador.
- El resultado general debe ser claro: válida / inválida / revocada.

**Criterios de Aceptación:**

- Dado que ingreso una credencial válida, cuando el sistema la verifica con el verificador de 1EdTech, entonces veo el resultado general (válida) y el desglose por cada área evaluada.
- Dado que ingreso una credencial inválida, cuando el sistema la verifica, entonces veo claramente qué áreas fallaron en el desglose de resultados.
- Dado que la credencial fue revocada, cuando el sistema la verifica, entonces indica el status de revocación y no que es válida.

---

### HU-9.3 - Link a página pública para credenciales del Tec

**Descripción:**

> Yo Como **empleador / verificador**, quiero **ver un link a la página pública de la credencial cuando esta fue emitida por el Tec** para **poder acceder a la información completa del logro directamente.**

**Reglas de Negocio:**

- Si la credencial verificada fue emitida por el Tec y existe en la wallet, se muestra un link a la página pública de la credencial (E6), del título (E7) o del CLR (E8) según corresponda.
- Si la credencial no fue emitida por el Tec o no existe en la wallet, no se muestra el link.

**Criterios de Aceptación:**

- Dado que verifico una credencial emitida por el Tec, cuando veo los resultados de verificación, entonces veo un link que me lleva a la página pública de esa credencial.
- Dado que verifico un CLR emitido por el Tec, cuando veo los resultados de verificación, entonces veo un link que me lleva a la página pública de ese CLR.
- Dado que verifico una credencial externa (no emitida por el Tec), cuando veo los resultados, entonces no se muestra ningún link a la wallet.

---

## E10 - Integración con Emisores

### HU-10.1 - Recepción automática de credenciales Open Badges

**Descripción:**

> Yo Como **alumno del Tec**, quiero **que cuando me emitan una credencial Open Badges (2.0 o 3.0) aparezca automáticamente en mi cartera de Credenciales** para **no tener que importarla manualmente y tener mis logros actualizados en todo momento.**

**Reglas de Negocio:**

- Cuando un emisor institucional (Parchment u otro) emite una credencial OB 2.0 o 3.0 a un alumno, la credencial debe aparecer automáticamente en la cartera de Credenciales del alumno.
- La credencial aparece con status "Activa" y con toda la metadata que traiga del emisor.
- No requiere ninguna acción del alumno para que la credencial llegue a su cartera.

**Criterios de Aceptación:**

- Dado que un emisor institucional me emite una credencial Open Badges, cuando accedo a mi cartera, entonces la credencial ya aparece automáticamente sin que yo haya tenido que importarla.
- Dado que la credencial fue emitida correctamente, cuando la veo en mi cartera, entonces muestra toda su metadata (nombre, emisor, fecha, tipo) y status "Activa".
- Dado que el emisor emite varias credenciales al mismo tiempo, cuando accedo a mi cartera, entonces todas aparecen automáticamente.

---

### HU-10.2 - Recepción automática de títulos Blockcerts

**Descripción:**

> Yo Como **alumno del Tec**, quiero **que cuando me emitan un título en Blockcerts aparezca automáticamente en mi cartera de Credenciales** para **tener mi título digital disponible sin trámites adicionales.**

**Reglas de Negocio:**

- Cuando Hyland emite un título Blockcerts a un alumno, el título debe aparecer automáticamente en la cartera de Credenciales del alumno.
- El título aparece con status "Activa" y con toda la metadata que traiga del emisor.
- No requiere ninguna acción del alumno para que el título llegue a su cartera.

**Criterios de Aceptación:**

- Dado que Hyland me emite un título Blockcerts, cuando accedo a mi cartera, entonces el título ya aparece automáticamente sin que yo haya tenido que importarlo.
- Dado que el título fue emitido correctamente, cuando lo veo en mi cartera, entonces muestra toda su metadata y status "Activa".
- Dado que el título fue emitido antes de que yo accediera a la wallet, cuando entro por primera vez, entonces el título ya está disponible en mi cartera.

---

### HU-10.3 - Recepción automática de CLRs

**Descripción:**

> Yo Como **alumno del Tec**, quiero **que cuando me emitan un CLR aparezca automáticamente en mi cartera de CLRs** para **tener mi registro de aprendizaje actualizado sin intervención manual.**

**Reglas de Negocio:**

- Cuando se emite un CLR a un alumno, el CLR debe aparecer automáticamente en la cartera de CLRs del alumno.
- El CLR aparece con status "Activa" y con todas las credenciales contenidas.
- No requiere ninguna acción del alumno para que el CLR llegue a su cartera.

**Criterios de Aceptación:**

- Dado que me emiten un CLR, cuando accedo a mi cartera de CLRs, entonces el CLR ya aparece automáticamente sin que yo haya tenido que importarlo.
- Dado que el CLR contiene varias credenciales, cuando lo veo en mi cartera, entonces el mosaico de la tarjeta refleja las credenciales contenidas.
- Dado que el CLR fue emitido correctamente, cuando lo veo, entonces muestra toda su metadata y status "Activa".

---

## E11 - Acceso y Activación

### HU-11.1 - Acceder a la wallet desde MiTec

**Descripción:**

> Yo Como **aprendiz del Tec con una [@Tec](#tec) activa**, quiero **entrar a la app de Tec Learners Wallet dentro de MiTec** para **acceder directamente a mis credenciales sin necesidad de autenticación adicional.**

**Reglas de Negocio:**

- El usuario ya está autenticado en MiTec vía SSO institucional; la wallet no requiere un login adicional.
- El SSO debe funcionar para cualquier aprendiz con una @Tec activa y un correo vigente ligado a ella (@tec.mx o @exatec.mx).

**Criterios de Aceptación:**

- Dado que soy un aprendiz autenticado en MiTec, cuando abro la app de Tec Learners Wallet, entonces accedo directamente a mi cartera sin pasos adicionales de autenticación.
- Dado que me autentico correctamente en MiTec, cuando cargo la wallet, entonces veo únicamente las credenciales asociadas a mi identidad.
- Dado que mi sesión de MiTec expiró, cuando intento acceder a la wallet, entonces soy redirigido a re-autenticarme en MiTec sin perder mi contexto.

---

### HU-11.2 - Acceder a mis credenciales sin cuenta institucional activa *(pendiente)*

**Descripción:**

> Yo Como **aprendiz del Tec que ya no cuenta con un correo activo ligado a su @Tec**, quiero **poder acceder a mis credenciales por un mecanismo alternativo** para **no perder el acceso a mis logros por razones administrativas.**

**Notas:**

- Aplica a: estudiantes dados de baja, estudiantes de intercambio y estudiantes de educación continua sin @tec.mx.
- El workaround de acceso está pendiente de definición con el equipo institucional.
- Esta HU no puede estimarse ni construirse hasta resolver la pregunta abierta correspondiente.

---

## E12 - Menú de Usuario

### HU-12.1 - Botón de menú de usuario en el header

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **ver un botón con mi imagen/foto de perfil en el header de la cartera** para **acceder a las opciones de mi cuenta y configuración.**

**Reglas de Negocio:**

- El botón se muestra en el header de todas las páginas internas de la wallet (E1, E2, E3, E4, E5).
- Muestra la imagen/foto de perfil del estudiante.
- Al hacer clic, se abre un dropdown con las opciones del menú de usuario.
- Si el usuario no tiene imagen de perfil, se muestra un avatar o placeholder por defecto.

**Criterios de Aceptación:**

- Dado que estoy en cualquier página de la wallet, cuando veo el header, entonces veo un botón con mi imagen de perfil.
- Dado que hago clic en el botón de perfil, cuando se abre el dropdown, entonces veo las opciones disponibles del menú.
- Dado que no tengo imagen de perfil, cuando veo el header, entonces se muestra un avatar por defecto en lugar de mi foto.

---

### HU-12.2 - Toggle de idioma en el menú de usuario

**Descripción:**

> Yo Como **usuario de la wallet**, quiero **cambiar el idioma de la interfaz entre inglés y español desde el menú de usuario** para **ver la wallet en el idioma de mi preferencia.**

**Reglas de Negocio:**

- El toggle de idioma está dentro del dropdown del menú de usuario.
- Idiomas disponibles: español (por defecto) e inglés.
- Al cambiar el idioma, la interfaz se actualiza inmediatamente sin recargar la página.
- La preferencia de idioma se guarda y persiste entre sesiones.
- El cambio de idioma aplica a los textos de la interfaz (UI), no al contenido de las credenciales.

**Criterios de Aceptación:**

- Dado que abro el menú de usuario, cuando veo las opciones, entonces veo un toggle para cambiar idioma entre español e inglés.
- Dado que cambio el idioma a inglés, cuando se aplica, entonces todos los textos de la interfaz se muestran en inglés.
- Dado que cambié el idioma a inglés y cierro sesión, cuando vuelvo a entrar, entonces el idioma sigue en inglés.
- Dado que el idioma está en inglés, cuando cambio el toggle a español, entonces la interfaz se actualiza inmediatamente a español sin recargar la página.

---

## E13 - Notificaciones por Correo

### HU-13.1 - Notificación por correo de credencial Open Badges

**Descripción:**

> Yo Como **alumno del Tec**, quiero **recibir un correo electrónico cuando me emiten una credencial Open Badges** para **enterarme de mi logro y tener una copia de la credencial en mi bandeja de entrada.**

**Reglas de Negocio:**

- El correo se envía automáticamente cuando se emite una credencial OB 2.0 o 3.0 al alumno.
- El correo incluye un mensaje de felicitación, la imagen de la credencial y el archivo JSON adjunto.
- El correo se envía al correo institucional del alumno (@tec.mx o @exatec.mx).

**Criterios de Aceptación:**

- Dado que me emiten una credencial Open Badges, cuando reviso mi correo institucional, entonces encuentro un email con un mensaje de felicitación.
- Dado que abro el correo, cuando veo los adjuntos, entonces encuentro la imagen de la credencial y el archivo JSON.
- Dado que recibo el correo, cuando hago clic en la imagen, entonces puedo ver la credencial visualmente.

---

### HU-13.2 - Notificación por correo de título Blockcerts

**Descripción:**

> Yo Como **alumno del Tec**, quiero **recibir un correo electrónico cuando me emiten un título en Blockcerts** para **enterarme de mi logro y tener una copia digital de mi título.**

**Reglas de Negocio:**

- El correo se envía automáticamente cuando se emite un título Blockcerts al alumno.
- El correo incluye un mensaje de felicitación y el archivo JSON del título adjunto.
- No se incluye imagen del título en el correo (solo JSON).
- El correo se envía al correo institucional del alumno.

**Criterios de Aceptación:**

- Dado que me emiten un título Blockcerts, cuando reviso mi correo institucional, entonces encuentro un email con un mensaje de felicitación.
- Dado que abro el correo, cuando veo los adjuntos, entonces encuentro el archivo JSON del título.
- Dado que el título fue emitido correctamente, cuando recibo el correo, entonces el JSON adjunto contiene toda la metadata del título.

---

### HU-13.3 - Notificación por correo de CLR

**Descripción:**

> Yo Como **alumno del Tec**, quiero **recibir un correo electrónico cuando me emiten un CLR** para **enterarme de mi logro y tener una copia de mi registro de aprendizaje.**

**Reglas de Negocio:**

- El correo se envía automáticamente cuando se emite un CLR al alumno.
- El correo incluye un mensaje de felicitación y el archivo JSON del CLR adjunto.
- El correo se envía al correo institucional del alumno.

**Criterios de Aceptación:**

- Dado que me emiten un CLR, cuando reviso mi correo institucional, entonces encuentro un email con un mensaje de felicitación.
- Dado que abro el correo, cuando veo los adjuntos, entonces encuentro el archivo JSON del CLR.
- Dado que el CLR contiene varias credenciales, cuando abro el JSON adjunto, entonces contiene la información completa del CLR con sus credenciales.

---

## Notas para el Equipo

- **¿Qué falta por definir?** Las soluciones técnicas se definirán con el DevTeam durante el refinamiento.
- **¿Qué sigue?** Priorizar estas HUs con el PO, estimarlas en story points (Fibonacci) en el primer Sprint Planning, y definir el outcome de la línea con el Line Manager antes del primer CPD.
- **Open badges 3.0 vs Blockcerts:** Hay decisiones técnicas de arquitectura pendientes (qué estándar prevalece, si se soportan ambos en paralelo, wallet custodial vs soberana). Esto impactará varias HUs de E9 y E10.

---

## Dudas y Preguntas Abiertas

> Preguntas clave sin respuesta que deben resolverse antes de que el DevTeam pueda estimar o construir las historias relacionadas.

| # | Pregunta                                                                                                                                                                                                                                                                                                                                                   | Impacto en HUs | Status          |
| - | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | --------------- |
| 1 | **¿Tendremos un Emisor por Escuela o cuantos emisores tendremos?**                                                                                                                                                                                                                                                                                  | E1             | Sin resolver    |
| 2 | **¿Para la emisión de títulos en Blockcerts, la TLW será cartera de blockchain?** ¿O no recopilaremos cartera de blockchain y simplemente importamos el título sin importar la credencial de blockchain? Esto define si la wallet necesita funcionar como wallet blockchain (custodial o no custodial) o si solo almacena el JSON del título. | E10, HU-10.2   | ⏳ Sin resolver |
| 3 | **¿Nosotros hacemos revocación y edición de credenciales?**                                                                                                                                                                                                                                                                                            |                |                 |
| 4 | **¿Dónde ubicar la funcionalidad de feedback dentro de la wallet?** ¿Será un botón flotante en todas las páginas, una sección dentro del menú de usuario, un formulario en una página dedicada, o integración con alguna herramienta existente?                                                                                                       | E12            | ⏳ Sin resolver |

---

## Ideas

> Funcionalidades e integraciones que no estan en el alcance actual pero que se consideran valiosas para versiones futuras.

| # | Idea                                  | Descripcion                                                                                                                                                                                                            |
| - | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | **Traductor en la pagina publica**    | Integrar un traductor que permita a los visitantes de las paginas publicas (E6, E7, E8) ver el contenido de las credenciales en diferentes idiomas, independientemente del idioma original de emision.                   |
| 2 | **Tour inicial (onboarding)**         | Guia interactiva que acompane al usuario en su primera visita a la wallet, explicandole las funcionalidades principales como la cartera, el detalle de credenciales y como compartir.                                   |
| 3 | **Integracion con TecBot**            | Conectar la wallet con TecBot para que los usuarios puedan consultar informacion de sus credenciales, estado de emisiones o resolver dudas sobre la wallet a traves del chatbot institucional.                          |
| 4 | **FAQ (preguntas frecuentes)**        | Seccion de preguntas frecuentes dentro de la wallet que resuelva dudas comunes sobre como importar credenciales, que son los CLRs, como compartir, como verificar, entre otros.                                         |

---

## Glosario

### @Tec

El registro institucional del estudiante en el Tecnológico de Monterrey. Es la identidad digital base que le permite hacer login a través del SSO institucional, siempre y cuando tenga un correo activo ligado a ella. Sin correo activo vinculado, la @Tec existe pero no habilita el acceso.
