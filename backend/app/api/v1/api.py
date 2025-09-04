"""
Main API router for v1 endpoints.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import translation, languages, audio, community

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(
    translation.router,
    prefix="/translate",
    tags=["translation"]
)

api_router.include_router(
    languages.router,
    prefix="/languages",
    tags=["languages"]
)

api_router.include_router(
    audio.router,
    prefix="/audio",
    tags=["audio"]
)

api_router.include_router(
    community.router,
    prefix="/community",
    tags=["community"]
)
