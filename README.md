# Tec Learners Wallet - Cartera de Microcredenciales

Una aplicación web para visualizar y gestionar credenciales digitales y microcredenciales.

## Estructura del Proyecto

```
.
├── backend/           # API FastAPI
│   ├── main.py       # Servidor con endpoints y datos hardcodeados
│   └── requirements.txt
└── frontend/         # Aplicación React
    ├── src/
    │   ├── App.jsx   # Componente principal
    │   ├── App.css   # Estilos de la aplicación
    │   └── main.jsx
    └── package.json
```

## Características

- Visualización de microcredenciales y títulos
- Vista de galería con tarjetas interactivas
- Modal de detalles para cada credencial
- Estadísticas generales (total de credenciales, horas, etc.)
- Diseño responsive
- Datos hardcodeados (mockup)

## Instalación y Ejecución

### Backend (FastAPI)

1. Navega al directorio del backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
pip install -r requirements.txt
```

3. Ejecuta el servidor:
```bash
uvicorn main:app --reload
```

El backend estará disponible en: `http://localhost:8000`

### Frontend (React)

1. Navega al directorio del frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación:
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## Uso

1. Asegúrate de que tanto el backend como el frontend estén corriendo
2. Abre tu navegador en `http://localhost:5173`
3. Explora las credenciales haciendo clic en cualquier tarjeta
4. Navega por los detalles de cada credencial en el modal

## Endpoints de la API

- `GET /api/credentials` - Obtiene todas las credenciales
- `GET /api/credentials/{id}` - Obtiene una credencial específica
- `GET /api/stats` - Obtiene estadísticas generales

## Tecnologías Utilizadas

- **Backend**: Python, FastAPI, Uvicorn
- **Frontend**: React, JavaScript, Vite
- **Estilos**: CSS3 con gradientes y animaciones
