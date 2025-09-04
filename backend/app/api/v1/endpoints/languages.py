"""
Language management API endpoints.
"""

from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
import structlog

from app.core.database import get_db
from app.schemas.language import Language, LanguageCreate, LanguageUpdate, LanguageList
from app.services.language_service import LanguageService

logger = structlog.get_logger(__name__)
router = APIRouter()


@router.get("/", response_model=LanguageList)
async def get_languages(
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(50, ge=1, le=100, description="Page size"),
    tier: Optional[int] = Query(None, ge=1, le=3, description="Filter by priority tier"),
    status: Optional[str] = Query(None, description="Filter by status"),
    family: Optional[str] = Query(None, description="Filter by language family"),
    db: Session = Depends(get_db)
):
    """
    Get list of supported languages with optional filtering.
    """
    try:
        language_service = LanguageService(db)
        
        languages, total = await language_service.get_languages(
            page=page,
            size=size,
            tier=tier,
            status=status,
            family=family
        )
        
        return LanguageList(
            languages=languages,
            total=total,
            page=page,
            size=size
        )
        
    except Exception as e:
        logger.error("Failed to get languages", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to get languages")


@router.get("/{language_code}", response_model=Language)
async def get_language(
    language_code: str,
    db: Session = Depends(get_db)
):
    """
    Get detailed information about a specific language.
    """
    try:
        language_service = LanguageService(db)
        language = await language_service.get_language_by_code(language_code)
        
        if not language:
            raise HTTPException(status_code=404, detail="Language not found")
        
        return language
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to get language", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to get language")


@router.get("/tier/{tier}", response_model=List[Language])
async def get_languages_by_tier(
    tier: int,
    db: Session = Depends(get_db)
):
    """
    Get languages by priority tier.
    """
    try:
        language_service = LanguageService(db)
        languages = await language_service.get_languages_by_tier(tier)
        
        return languages
        
    except Exception as e:
        logger.error("Failed to get languages by tier", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to get languages by tier")


@router.get("/family/{family}", response_model=List[Language])
async def get_languages_by_family(
    family: str,
    db: Session = Depends(get_db)
):
    """
    Get languages by language family.
    """
    try:
        language_service = LanguageService(db)
        languages = await language_service.get_languages_by_family(family)
        
        return languages
        
    except Exception as e:
        logger.error("Failed to get languages by family", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to get languages by family")


@router.post("/", response_model=Language)
async def create_language(
    language: LanguageCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new language entry (admin only).
    """
    try:
        language_service = LanguageService(db)
        new_language = await language_service.create_language(language)
        
        return new_language
        
    except Exception as e:
        logger.error("Failed to create language", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to create language")


@router.put("/{language_id}", response_model=Language)
async def update_language(
    language_id: int,
    language_update: LanguageUpdate,
    db: Session = Depends(get_db)
):
    """
    Update language information (admin only).
    """
    try:
        language_service = LanguageService(db)
        updated_language = await language_service.update_language(language_id, language_update)
        
        if not updated_language:
            raise HTTPException(status_code=404, detail="Language not found")
        
        return updated_language
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to update language", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to update language")
