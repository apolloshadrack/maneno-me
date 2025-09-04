"""
Main FastAPI application for the Kenyan Native Languages Platform.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import structlog

from app.core.config import settings
from app.core.database import init_db
from app.api.v1.api import api_router
from app.core.logging import setup_logging

# Setup structured logging
setup_logging()
logger = structlog.get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    logger.info("Starting Kenyan Native Languages Platform")
    await init_db()
    yield
    # Shutdown
    logger.info("Shutting down Kenyan Native Languages Platform")


# Create FastAPI application
app = FastAPI(
    title="Kenyan Native Languages Platform",
    description="A comprehensive platform for preserving and translating Kenyan native languages",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add trusted host middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.ALLOWED_HOSTS,
)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    """Root endpoint with basic platform information."""
    return {
        "message": "Welcome to the Kenyan Native Languages Platform",
        "version": "1.0.0",
        "docs": "/docs",
        "supported_languages": [
            "Swahili (Kiswahili)",
            "Kikuyu (Gikuyu)",
            "Luo (Dholuo)",
            "Luhya (Luluhya)",
            "Kamba (Kikamba)",
            "Kalenjin",
            "Kisii (Ekegusii)",
            "Meru (Kimeru)",
            "Turkana",
            "Maasai (Maa)",
        ],
    }


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {"status": "healthy", "service": "kenyan-languages-platform"}


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
