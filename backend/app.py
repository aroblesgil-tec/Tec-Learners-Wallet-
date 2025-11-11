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
        "title_en": "Professional Degree",
        "type": "degree",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2023-06-15",
        "description": "Título profesional otorgado por el Tecnológico de Monterrey.",
        "description_en": "Professional degree awarded by Tecnológico de Monterrey.",
        "skills": ["Formación profesional", "Competencias integrales"],
        "skills_en": ["Professional Training", "Comprehensive Competencies"],
        "hours": 0,
        "thumbnail": "http://localhost:5173/titulo.png",
        "category": "Títulos"
    },

    # Curriculares
    {
        "id": "2",
        "title": "Atención odontológica",
        "title_en": "Dental Care",
        "type": "microcredential",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-03-15",
        "description": "Microcredencial en atención odontológica, desarrollando competencias en el cuidado y tratamiento dental profesional.",
        "description_en": "Microcredential in dental care, developing competencies in professional dental care and treatment.",
        "skills": ["Odontología", "Cuidado dental", "Salud bucal"],
        "skills_en": ["Dentistry", "Dental Care", "Oral Health"],
        "hours": 80,
        "thumbnail": "http://localhost:5173/insignia_1.png",
        "category": "Curriculares"
    },
    {
        "id": "3",
        "title": "Publicidad: estrategia creativa y producción",
        "title_en": "Advertising: Creative Strategy and Production",
        "type": "microcredential",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-05-20",
        "description": "Desarrollo de estrategias creativas y producción de contenido publicitario efectivo.",
        "description_en": "Development of creative strategies and effective advertising content production.",
        "skills": ["Publicidad", "Creatividad", "Producción", "Marketing"],
        "skills_en": ["Advertising", "Creativity", "Production", "Marketing"],
        "hours": 120,
        "thumbnail": "http://localhost:5173/insignia_2.png",
        "category": "Curriculares"
    },
    {
        "id": "5",
        "title": "Análisis de datos aplicado",
        "title_en": "Applied Data Analysis",
        "type": "microcredential",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-08-12",
        "description": "Microcredencial enfocada en análisis de datos, visualización y toma de decisiones basada en información.",
        "description_en": "Microcredential focused on data analysis, visualization, and data-driven decision making.",
        "skills": ["Análisis de datos", "Python", "Visualización", "Business Intelligence"],
        "skills_en": ["Data Analysis", "Python", "Visualization", "Business Intelligence"],
        "hours": 100,
        "thumbnail": "http://localhost:5173/insignia_3.png",
        "category": "Curriculares"
    },

    # Alternativas
    {
        "id": "6",
        "title": "Liderazgo ético en IA",
        "title_en": "Ethical Leadership in AI",
        "type": "credential",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-09-05",
        "description": "Credencial alternativa en liderazgo ético aplicado a la inteligencia artificial y tecnologías emergentes.",
        "description_en": "Alternative credential in ethical leadership applied to artificial intelligence and emerging technologies.",
        "skills": ["Inteligencia Artificial", "Ética", "Liderazgo", "Tecnología"],
        "skills_en": ["Artificial Intelligence", "Ethics", "Leadership", "Technology"],
        "hours": 150,
        "thumbnail": "http://localhost:5173/insignia_4.png",
        "category": "Alternativas"
    },

    # Educación continua
    {
        "id": "8",
        "title": "High Impact Manager",
        "title_en": "High Impact Manager",
        "type": "certification",
        "issuer": "Tecnológico de Monterrey",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-02-28",
        "description": "Certificación profesional de alto impacto en gestión y liderazgo organizacional.",
        "description_en": "High-impact professional certification in organizational management and leadership.",
        "skills": ["Gestión", "Liderazgo", "Gestión de equipos", "Estrategia"],
        "skills_en": ["Management", "Leadership", "Team Management", "Strategy"],
        "hours": 210,
        "thumbnail": "http://localhost:5173/insignia_5.png",
        "category": "Educación continua",
        "grade": "Excelente"
    },

    # Otras
    {
        "id": "11",
        "title": "Autoconocimiento y gestión",
        "title_en": "Self-awareness and Management",
        "type": "microcredential",
        "issuer": "Amazon",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-07-10",
        "description": "Competencia transversal enfocada en el desarrollo personal, autoconocimiento y gestión efectiva.",
        "description_en": "Cross-cutting competency focused on personal development, self-awareness, and effective management.",
        "skills": ["Autoconocimiento", "Gestión personal", "Desarrollo personal", "Liderazgo"],
        "skills_en": ["Self-awareness", "Personal Management", "Personal Development", "Leadership"],
        "hours": 60,
        "thumbnail": "http://localhost:5173/insignia_6.png",
        "category": "Otras"
    },
    {
        "id": "12",
        "title": "Pensamiento crítico y resolución de problemas",
        "title_en": "Critical Thinking and Problem Solving",
        "type": "microcredential",
        "issuer": "IBM",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2024-01-20",
        "description": "Desarrollo de habilidades de pensamiento crítico para resolver problemas complejos.",
        "description_en": "Development of critical thinking skills to solve complex problems.",
        "skills": ["Pensamiento crítico", "Resolución de problemas", "Análisis", "Creatividad"],
        "skills_en": ["Critical Thinking", "Problem Solving", "Analysis", "Creativity"],
        "hours": 50,
        "thumbnail": "http://localhost:5173/insignia_7.png",
        "category": "Otras"
    },

    # Vencidas
    {
        "id": "13",
        "title": "Certificación Java SE 8",
        "title_en": "Java SE 8 Certification",
        "type": "certification",
        "issuer": "IBM",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2020-03-10",
        "description": "Certificación en Java SE 8 que requiere renovación.",
        "description_en": "Java SE 8 certification that requires renewal.",
        "skills": ["Java", "Programación", "POO"],
        "skills_en": ["Java", "Programming", "OOP"],
        "hours": 120,
        "thumbnail": "http://localhost:5173/insignia_8.png",
        "category": "Vencidas",
        "expiration_date": "2023-03-10"
    },
    {
        "id": "14",
        "title": "Primeros auxilios básicos",
        "title_en": "Basic First Aid",
        "type": "certification",
        "issuer": "Amazon",
        "issuer_logo": "http://localhost:5173/logo_tec.png",
        "issue_date": "2021-06-15",
        "description": "Certificación en primeros auxilios y RCP que ha expirado.",
        "description_en": "First aid and CPR certification that has expired.",
        "skills": ["Primeros auxilios", "RCP", "Seguridad"],
        "skills_en": ["First Aid", "CPR", "Safety"],
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
