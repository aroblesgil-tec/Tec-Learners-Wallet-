from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Datos hardcodeados de microcredenciales
CREDENTIALS = [
    # Títulos
    {
        "id": "1",
        "title": "Título Profesional",
        "type": "degree",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2023-06-15",
        "description": "Título profesional otorgado por el Tecnológico de Monterrey.",
        "skills": ["Formación profesional", "Competencias integrales"],
        "hours": 0,
        "thumbnail": "http://localhost:5173/titulo.png",
        "category": "Títulos"
    },

    # Curriculares
    {
        "id": "2",
        "title": "Atención odontológica",
        "type": "microcredential",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-03-15",
        "description": "Microcredencial en atención odontológica, desarrollando competencias en el cuidado y tratamiento dental profesional.",
        "skills": ["Odontología", "Cuidado dental", "Salud bucal"],
        "hours": 80,
        "thumbnail": "http://localhost:5173/insignia_1.png",
        "category": "Curriculares"
    },
    {
        "id": "3",
        "title": "Publicidad: estrategia creativa y producción",
        "type": "microcredential",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-05-20",
        "description": "Desarrollo de estrategias creativas y producción de contenido publicitario efectivo.",
        "skills": ["Publicidad", "Creatividad", "Producción", "Marketing"],
        "hours": 120,
        "thumbnail": "http://localhost:5173/insignia_2.png",
        "category": "Curriculares"
    },
    {
        "id": "5",
        "title": "Análisis de datos aplicado",
        "type": "microcredential",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-08-12",
        "description": "Microcredencial enfocada en análisis de datos, visualización y toma de decisiones basada en información.",
        "skills": ["Data Analysis", "Python", "Visualización", "Business Intelligence"],
        "hours": 100,
        "thumbnail": "http://localhost:5173/insignia_3.png",
        "category": "Curriculares"
    },

    # Alternativas
    {
        "id": "6",
        "title": "Liderazgo ético en IA",
        "type": "credential",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-09-05",
        "description": "Credencial alternativa en liderazgo ético aplicado a la inteligencia artificial y tecnologías emergentes.",
        "skills": ["Inteligencia Artificial", "Ética", "Liderazgo", "Tecnología"],
        "hours": 150,
        "thumbnail": "http://localhost:5173/insignia_4.png",
        "category": "Alternativas"
    },

    # Educación continua
    {
        "id": "8",
        "title": "High Impact Manager",
        "type": "certification",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-02-28",
        "description": "Certificación profesional de alto impacto en gestión y liderazgo organizacional.",
        "skills": ["Management", "Liderazgo", "Gestión de equipos", "Estrategia"],
        "hours": 210,
        "thumbnail": "http://localhost:5173/insignia_5.png",
        "category": "Educación continua",
        "grade": "Excelente"
    },

    # Otras
    {
        "id": "11",
        "title": "Autoconocimiento y gestión",
        "type": "microcredential",
        "issuer": "Amazon",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-07-10",
        "description": "Competencia transversal enfocada en el desarrollo personal, autoconocimiento y gestión efectiva.",
        "skills": ["Autoconocimiento", "Gestión personal", "Desarrollo personal", "Liderazgo"],
        "hours": 60,
        "thumbnail": "http://localhost:5173/insignia_6.png",
        "category": "Otras"
    },
    {
        "id": "12",
        "title": "Pensamiento crítico y resolución de problemas",
        "type": "microcredential",
        "issuer": "IBM",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-01-20",
        "description": "Desarrollo de habilidades de pensamiento crítico para resolver problemas complejos.",
        "skills": ["Pensamiento crítico", "Resolución de problemas", "Análisis", "Creatividad"],
        "hours": 50,
        "thumbnail": "http://localhost:5173/insignia_7.png",
        "category": "Otras"
    },

    # Vencidas
    {
        "id": "13",
        "title": "Certificación Java SE 8",
        "type": "certification",
        "issuer": "IBM",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2020-03-10",
        "description": "Certificación en Java SE 8 que requiere renovación.",
        "skills": ["Java", "Programming", "OOP"],
        "hours": 120,
        "thumbnail": "http://localhost:5173/insignia_8.png",
        "category": "Vencidas",
        "expiration_date": "2023-03-10"
    },
    {
        "id": "14",
        "title": "Primeros auxilios básicos",
        "type": "certification",
        "issuer": "Amazon",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2021-06-15",
        "description": "Certificación en primeros auxilios y RCP que ha expirado.",
        "skills": ["Primeros auxilios", "RCP", "Seguridad"],
        "hours": 40,
        "thumbnail": "http://localhost:5173/insignia_9.png",
        "category": "Vencidas",
        "expiration_date": "2023-06-15"
    }
]

@app.get("/")
def read_root():
    return {"message": "Tec Learners Wallet API"}

@app.get("/api/credentials")
def get_credentials():
    return {"credentials": CREDENTIALS}

@app.get("/api/credentials/{credential_id}")
def get_credential(credential_id: str):
    credential = next((c for c in CREDENTIALS if c["id"] == credential_id), None)
    if credential:
        return credential
    return {"error": "Credential not found"}, 404

@app.get("/api/stats")
def get_stats():
    total_credentials = len(CREDENTIALS)
    microcredentials = len([c for c in CREDENTIALS if c["type"] == "microcredential"])
    degrees = len([c for c in CREDENTIALS if c["type"] == "degree"])
    total_hours = sum(c.get("hours", 0) for c in CREDENTIALS)

    return {
        "total_credentials": total_credentials,
        "microcredentials": microcredentials,
        "degrees": degrees,
        "total_hours": total_hours
    }
