from fastapi import FastAPI
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app import models

from app.routers.profile import router as profile_router
from app.routers.skill import router as skill_router
from app.routers.project import router as project_router
from app.routers.project_detail import router as project_detail_router
from app.routers.project_technology import router as project_technology_router
from app.routers.project_section import router as project_section_router
from app.routers.project_section_item import router as project_section_item_router
from app.routers.experience import router as experience_router
from app.routers.achievement import router as achievement_router
from app.routers.contact_message import router as contact_router
from app.routers.visitor import router as visitor_router
from app.routers.page_visit import router as page_visit_router


app = FastAPI(
    title="Krishna Kumar Portfolio API",
    description="Backend API for Krishna Kumar's developer portfolio",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create database tables automatically
Base.metadata.create_all(bind=engine)


# Register routers
app.include_router(profile_router)
app.include_router(skill_router)
app.include_router(project_router)
app.include_router(project_detail_router)
app.include_router(project_technology_router)
app.include_router(project_section_router)
app.include_router(project_section_item_router)
app.include_router(experience_router)
app.include_router(achievement_router)
app.include_router(contact_router)
app.include_router(visitor_router)
app.include_router(page_visit_router)


@app.get("/")
def root():
    return {
        "message": "Portfolio API is running"
    }


@app.get("/api/database-test")
def database_test():

    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "message": "PostgreSQL connection successful"
    }