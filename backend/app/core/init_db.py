"""
Database initialization script.
"""

import asyncio
from sqlalchemy import create_engine
from app.core.database import Base, init_db
from app.services.language_service import LanguageService
from app.core.config import settings
import structlog

logger = structlog.get_logger(__name__)


def create_tables():
    """Create all database tables."""
    try:
        engine = create_engine(settings.DATABASE_URL)
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error("Failed to create database tables", error=str(e))
        raise


async def seed_database():
    """Seed the database with initial data."""
    try:
        from sqlalchemy.orm import sessionmaker
        
        engine = create_engine(settings.DATABASE_URL)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        
        db = SessionLocal()
        try:
            language_service = LanguageService(db)
            await language_service.seed_initial_languages()
            logger.info("Database seeded successfully")
        finally:
            db.close()
            
    except Exception as e:
        logger.error("Failed to seed database", error=str(e))
        raise


async def init_database():
    """Initialize database with tables and seed data."""
    try:
        # Create tables
        create_tables()
        
        # Initialize connections
        await init_db()
        
        # Seed initial data
        await seed_database()
        
        logger.info("Database initialization completed successfully")
        
    except Exception as e:
        logger.error("Database initialization failed", error=str(e))
        raise


if __name__ == "__main__":
    asyncio.run(init_database())
