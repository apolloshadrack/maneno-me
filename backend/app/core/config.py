"""
Application configuration settings.
"""

from typing import List, Optional
from pydantic import BaseSettings, validator
import os


class Settings(BaseSettings):
    """Application settings."""
    
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Kenyan Native Languages Platform"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"
    
    # CORS
    ALLOWED_HOSTS: List[str] = ["*"]
    
    # Database
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "kenyan_languages"
    POSTGRES_PORT: str = "5432"
    
    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    
    # MongoDB
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB: str = "kenyan_languages_media"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # ML Models
    MODEL_CACHE_DIR: str = "./models"
    HUGGINGFACE_CACHE_DIR: str = "./hf_cache"
    
    # File Storage
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    # Audio Processing
    WHISPER_MODEL: str = "base"
    MAX_AUDIO_DURATION: int = 300  # 5 minutes
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    @validator("ALLOWED_HOSTS", pre=True)
    def assemble_cors_origins(cls, v: str) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Create settings instance
settings = Settings()
