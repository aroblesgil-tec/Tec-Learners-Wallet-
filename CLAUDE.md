# Tec Learners Wallet

## Sobre el proyecto

Este es un **mock/prototipo frontend-only** de la Tec Learners Wallet, una cartera digital institucional del Tecnológico de Monterrey que centraliza, organiza y permite compartir credenciales digitales (Open Badges 2.0/3.0, Blockcerts, CLR).

- **Stack:** React 19 + Vite, desplegado en GitHub Pages con HashRouter
- **Sin backend:** Todos los datos son dummy desde archivos JSON locales. Los botones son interactivos (navegan, muestran dropdowns, animan) pero no ejecutan lógica real
- **Idiomas:** Español (default) e Inglés, con traducciones en `src/translations.js`

## Diseño mobile-first

La app está pensada para verse en **celular**. Todas las decisiones de UI deben priorizar la experiencia móvil:
- Los layouts deben funcionar bien en pantallas de 375px+
- Los componentes deben ser touch-friendly (botones grandes, espaciado adecuado)
- El scroll horizontal en los estantes de credenciales es intencional para mobile
- Siempre probar responsive antes de dar por terminado un cambio

## Épicas

| Épica | Tipo | Descripción |
|-------|------|-------------|
| **E1 - Cartera: Credenciales** | Página | Pantalla principal donde el usuario ve todas sus credenciales. Incluye recepción, filtrado e importación |
| **E2 - Cartera: CLRs** | Página | Pantalla de Comprehensive Learner Records, agrupaciones de credenciales |
| **E3 - Detalle de Credencial** | Página | Info completa de una credencial OB 2.0/3.0: compartir, descargar, metadatos |
| **E4 - Detalle de Título** | Página | Info completa de un título Blockcerts: firma, verificación blockchain, descarga |
| **E5 - Detalle de CLR** | Página | Info completa de un CLR: emisor, fecha, credenciales contenidas |
| **E6 - Página Pública de Credencial** | Página | Página pública sin autenticación para credenciales compartidas |
| **E7 - Página Pública de Título** | Página | Página pública sin autenticación para títulos compartidos |
| **E8 - Página Pública de CLR** | Página | Página pública sin autenticación para CLRs compartidos |
| **E9 - Verificador Público** | Página | Verificar autenticidad de credenciales (Open Badges / Blockcerts) |
| **E10 - Integración con Emisores** | Técnica | Integraciones con Parchment, Hyland (DIFERIDO - requiere backend) |
| **E11 - Acceso y Activación** | Técnica | Flujo SSO desde MiTec (DIFERIDO - requiere backend real) |
| **E12 - Menú de Usuario** | Página | Menú en header con imagen de perfil, toggle de idioma ES/EN |
| **E13 - Notificaciones por Correo** | Técnica | Emails automáticos al emitir credencial/título/CLR (DIFERIDO - requiere backend) |

## Historias de Usuario (HUs)

El proyecto debe cumplir las siguientes HUs organizadas por épica. Cada cambio debe verificarse contra estas especificaciones:

### E1 - Cartera: Credenciales
- **HU-1.1** Navegación entre Credenciales y CLRs con tabs. Vista default: Credenciales
- **HU-1.2** Buscar credenciales por nombre, emisor, año, descripción, etiquetas (búsqueda en tiempo real)
- **HU-1.3** Filtrar por tipo (Título, Curriculares, Alternativas, Educación Continua, Externas), emisor, año. Ordenar por recientes/antiguas/A-Z/Z-A. Filtros combinables
- **HU-1.4** Tarjetas con: imagen (principal), nombre, emisor, año, tipo de credencial, status (Activa/Vencida/Revocada visualmente distinguible), tags. Click navega a E3 o E4 según tipo
- **HU-1.5** Organización por tipo (Títulos primero) y dentro por emisor. Scroll horizontal por sección, vertical entre secciones. Tipos sin credenciales no se muestran
- **HU-1.6** Importar credenciales externas: archivo JSON, imagen con metadata, URL. Estándares: OB 2.0, OB 3.0, CLR, Blockcerts. Auto-routing credencial vs CLR
- **HU-1.7** Estado vacío con mensaje explicativo y botón de importar
- **HU-1.8** Header con botón de imagen de perfil que abre menú de usuario (E12). Toggle de idioma accesible desde la cartera

### E2 - Cartera: CLRs
- **HU-2.1** Buscar CLRs por nombre, emisor, año, descripción, etiqueta
- **HU-2.2** Filtrar por origen (Tec/Externo), emisor, año. Ordenar por recientes/antiguas/A-Z/Z-A. Filtros combinables
- **HU-2.3** Tarjetas CLR con mosaico de hasta 4 imágenes + indicador "+N", nombre, emisor, año, status, tags. Click navega a E5
- **HU-2.4** Organización por origen: secciones "Tec" y "Externo". Secciones vacías no se muestran
- **HU-2.5** Importar CLRs (mismo botón que credenciales, auto-detecta tipo). CLRs importados = origen "Externo"
- **HU-2.6** Estado vacío de CLRs con explicación y botón importar
- **HU-2.7** Header con botón de imagen de perfil que abre menú de usuario (E12), consistente con E1

### E3 - Detalle de Credencial (página completa, NO modal)
- **HU-3.1** Imagen principal con zoom a pantalla completa (fondo negro translúcido, cerrar con click fuera o botón)
- **HU-3.2** Sección Logro: nombre, descripción, tipo, criterios, campo de estudio, especialización, código, créditos, tags, alineamientos, idioma, versión, resultados, endorsements
- **HU-3.3** Sección Credencial: status, fechas (emisión, expiración, otorgamiento), evidencias, términos de uso, motivo de revocación
- **HU-3.4** Sección Receptor: nombre, fechas actividad, créditos, licencia, periodo, rol
- **HU-3.5** Sección Emisor: nombre, logo, descripción, URL, email, teléfono, dirección
- **HU-3.6** Compartir: link público (copiar al portapapeles, desactivable), LinkedIn, descargar JSON, descargar PNG baked
- **HU-3.7** Botón de regreso visible que lleva a la cartera de Credenciales (E1). Mantiene estado de filtros/ordenamiento

### E4 - Detalle de Título (Blockcerts)
- **HU-4.1** Imagen principal con zoom (fondo negro translúcido, cerrar con click fuera o botón)
- **HU-4.2** Sección Título: nombre, subtítulo, descripción, criterios, fechas (emisión, expiración), status, tags, alineamientos
- **HU-4.3** Sección Receptor: nombre completo
- **HU-4.4** Sección Emisor con líneas de firma (nombre, cargo, imagen firma). Incluye nombre org, logo, descripción, URL, email, teléfono
- **HU-4.5** Verificación Blockchain: status verificación, TX ID, tipo blockchain, hash, llave pública, fecha prueba, link explorador
- **HU-4.6** Descargar: JSON Blockcerts, XML SEP, PDF oficial
- **HU-4.7** Compartir: link público (copiar al portapapeles, desactivable), LinkedIn
- **HU-4.8** Botón de regreso visible que lleva a la cartera de Credenciales (E1). Mantiene estado de filtros/ordenamiento

### E5 - Detalle de CLR
- **HU-5.1** Credenciales contenidas como sección principal y prominente (clickeables a su detalle E3). Preview: imagen, nombre, emisor
- **HU-5.2** Info del CLR: nombre, descripción, status, fechas (emisión, expiración, otorgamiento), indicador parcial/completo, evidencias, términos
- **HU-5.3** Sección Receptor: nombre, fechas actividad, créditos, licencia, periodo, rol (mismos campos que E3)
- **HU-5.4** Sección Emisor: nombre, logo, descripción, URL, email, teléfono, dirección (mismos campos que E3)
- **HU-5.5** Compartir: link público (copiar al portapapeles, desactivable), descargar JSON, LinkedIn
- **HU-5.6** Botón de regreso visible que lleva a la cartera de CLRs (E2). Mantiene estado de filtros/ordenamiento

### E6 - Página Pública de Credencial
- **HU-6.1** Imagen principal, accesible sin autenticación
- **HU-6.2** Sección Logro público (mismos campos que E3)
- **HU-6.3** Sección Credencial pública con status visual
- **HU-6.4** Sección Receptor público
- **HU-6.5** Emisor con marca "Verificado" (Tec) o "Sin verificar" (externo)
- **HU-6.6** Verificador integrado con resultados desglosados por área
- **HU-6.7** Header con logo de la wallet y link al verificador público (E9). Sin menú de usuario (es página pública)

### E7 - Página Pública de Título
- **HU-7.1** Imagen principal del título
- **HU-7.2** Info del título público (mismos campos que E4)
- **HU-7.3** Receptor y emisor con firmas
- **HU-7.4** Verificación blockchain pública con link al explorador
- **HU-7.5** Header con logo de la wallet y link al verificador público (E9). Sin menú de usuario

### E8 - Página Pública de CLR
- **HU-8.1** Lista de credenciales contenidas (clickeables a su página pública)
- **HU-8.2** Info del CLR público (mismos campos que E5)
- **HU-8.3** Receptor público
- **HU-8.4** Emisor público
- **HU-8.5** Header con logo de la wallet y link al verificador público (E9). Sin menú de usuario

### E9 - Verificador Público
- **HU-9.1** Formulario para ingresar ID de credencial o pegar JSON. Accesible sin autenticación
- **HU-9.2** Resultado: válida/inválida/revocada con desglose por área de verificación
- **HU-9.3** Header con logo de la wallet. Sin menú de usuario
- **HU-9.4** Mensaje claro cuando el ID o JSON no corresponde a una credencial existente

### E10 - Integración con Emisores (DIFERIDO - requiere backend)
### E11 - Acceso y Activación (DIFERIDO - requiere backend real para SSO)

### E12 - Menú de Usuario
- **HU-12.1** Botón con imagen/foto del estudiante en el header. Al hacer click abre dropdown
- **HU-12.2** Toggle de idioma ES/EN dentro del menú. Cambia toda la interfaz al seleccionar
- **HU-12.3** Menú consistente en posición y apariencia en todas las páginas de la wallet (E1, E2)

### E13 - Notificaciones por Correo (DIFERIDO - requiere backend)

## Estructura del proyecto

```
frontend/
├── src/
│   ├── App.jsx              # Shell principal: header, tabs, credenciales grid, modales
│   ├── App.css              # Todos los estilos
│   ├── Login.jsx            # Página de login (SSO fake)
│   ├── Login.css
│   ├── main.jsx             # HashRouter con todas las rutas
│   ├── translations.js      # Traducciones ES/EN
│   ├── data/
│   │   ├── credentials.json # 25 credenciales dummy con todos los campos
│   │   └── clrs.json        # 5 CLRs dummy
│   └── pages/
│       ├── CredentialDetail.jsx  # Detalle credencial (E3)
│       ├── TitleDetail.jsx       # Detalle título Blockcerts (E4)
│       ├── CLRList.jsx           # Listado de CLRs (E2)
│       ├── CLRDetail.jsx         # Detalle de CLR (E5)
│       ├── PublicCredential.jsx  # Página pública credencial (E6)
│       ├── PublicTitle.jsx       # Página pública título (E7)
│       ├── PublicCLR.jsx         # Página pública CLR (E8)
│       └── PublicVerifier.jsx    # Verificador público (E9)
├── public/                  # Imágenes: logo_tec.png, titulo.png, insignia_1-9.png
├── vite.config.js           # Base: /Tec-Learners-Wallet-/
└── package.json
```

## Rutas (HashRouter)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `#/` | App | Cartera - tab Credenciales |
| `#/clr` | App (tab CLR) | Cartera - tab CLRs |
| `#/credential/:id` | CredentialDetail | Detalle de credencial |
| `#/title/:id` | TitleDetail | Detalle de título |
| `#/clr/:id` | CLRDetail | Detalle de CLR |
| `#/public/credential/:id` | PublicCredential | Página pública credencial |
| `#/public/title/:id` | PublicTitle | Página pública título |
| `#/public/clr/:id` | PublicCLR | Página pública CLR |
| `#/verify` | PublicVerifier | Verificador público |

## Convenciones

- **Detalles = páginas, NO modales.** Cada detalle navega a su propia ruta con botón "Volver"
- **CSS en un solo archivo** (`App.css`). Clases en kebab-case
- **Imágenes reutilizadas:** Las mismas `insignia_1.png` a `insignia_9.png` y `titulo.png` se usan para todos los datos dummy
- **Campos vacíos no se renderizan.** Si un campo es null/undefined, simplemente no aparece
- **Bilingüe:** Todo texto visible debe tener traducción en `translations.js` (ES y EN)
- Para rutas de imágenes usar el helper `getImagePath()` que agrega `import.meta.env.BASE_URL`
