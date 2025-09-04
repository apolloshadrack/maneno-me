"""
Database configuration and session management.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from motor.motor_asyncio import AsyncIOMotorClient
import redis.asyncio as redis
import structlog

from app.core.config import settings

logger = structlog.get_logger(__name__)

# PostgreSQL setup
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    echo=settings.DEBUG,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# MongoDB setup
mongodb_client: AsyncIOMotorClient = None
mongodb_database = None

# Redis setup
redis_client: redis.Redis = None


async def init_db() -> None:
    """Initialize database connections."""
    global mongodb_client, mongodb_database, redis_client
    
    try:
        # Initialize MongoDB
        mongodb_client = AsyncIOMotorClient(settings.MONGODB_URL)
        mongodb_database = mongodb_client[settings.MONGODB_DB]
        await mongodb_client.admin.command('ping')
        logger.info("Connected to MongoDB")
        
        # Initialize Redis
        redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
        await redis_client.ping()
        logger.info("Connected to Redis")
        
    except Exception as e:
        logger.error("Failed to initialize database connections", error=str(e))
        raise


async def close_db() -> None:
    """Close database connections."""
    global mongodb_client, redis_client
    
    if mongodb_client:
        mongodb_client.close()
        logger.info("Disconnected from MongoDB")
    
    if redis_client:
        await redis_client.close()
        logger.info("Disconnected from Redis")


def get_db():
    """Get database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_mongodb():
    """Get MongoDB database instance."""
    return mongodb_database


def get_redis():
    """Get Redis client."""
    return redis_client
