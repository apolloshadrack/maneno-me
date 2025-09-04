"""
Translation API endpoints.
"""

from typing import List
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from sqlalchemy.orm import Session
import time
import structlog

from app.core.database import get_db
from app.schemas.translation import (
    TranslationRequest,
    TranslationResponse,
    BatchTranslationRequest,
    BatchTranslationResponse,
    LanguageDetectionRequest,
    LanguageDetectionResponse,
    TranslationHistory,
    TranslationFeedback
)
from app.services.translation_service import TranslationService
from app.services.language_detection import LanguageDetectionService

logger = structlog.get_logger(__name__)
router = APIRouter()


@router.post("/", response_model=TranslationResponse)
async def translate_text(
    request: TranslationRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Translate text from one language to another.
    """
    start_time = time.time()
    
    try:
        # Initialize translation service
        translation_service = TranslationService(db)
        
        # Perform translation
        result = await translation_service.translate(
            source_text=request.source_text,
            source_lang=request.source_lang,
            target_lang=request.target_lang,
            model_version=request.model_version
        )
        
        response_time = int((time.time() - start_time) * 1000)
        
        # Log translation request in background
        background_tasks.add_task(
            translation_service.log_translation_request,
            request.source_text,
            result.target_text,
            request.source_lang,
            request.target_lang,
            result.confidence_score,
            request.model_version,
            response_time
        )
        
        return TranslationResponse(
            source_text=request.source_text,
            target_text=result.target_text,
            source_lang=request.source_lang,
            target_lang=request.target_lang,
            confidence_score=result.confidence_score,
            model_version=result.model_version,
            response_time_ms=response_time
        )
        
    except Exception as e:
        logger.error("Translation failed", error=str(e))
        raise HTTPException(status_code=500, detail="Translation failed")


@router.post("/batch", response_model=BatchTranslationResponse)
async def translate_batch(
    request: BatchTranslationRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Translate multiple texts in batch.
    """
    start_time = time.time()
    
    try:
        translation_service = TranslationService(db)
        
        translations = []
        for text in request.texts:
            result = await translation_service.translate(
                source_text=text,
                source_lang=request.source_lang,
                target_lang=request.target_lang,
                model_version=request.model_version
            )
            
            translations.append(TranslationResponse(
                source_text=text,
                target_text=result.target_text,
                source_lang=request.source_lang,
                target_lang=request.target_lang,
                confidence_score=result.confidence_score,
                model_version=result.model_version
            ))
        
        total_time = int((time.time() - start_time) * 1000)
        
        return BatchTranslationResponse(
            translations=translations,
            total_processed=len(translations),
            total_time_ms=total_time
        )
        
    except Exception as e:
        logger.error("Batch translation failed", error=str(e))
        raise HTTPException(status_code=500, detail="Batch translation failed")


@router.post("/detect", response_model=LanguageDetectionResponse)
async def detect_language(
    request: LanguageDetectionRequest,
    db: Session = Depends(get_db)
):
    """
    Detect the language of the input text.
    """
    try:
        detection_service = LanguageDetectionService(db)
        
        result = await detection_service.detect_language(request.text)
        
        return LanguageDetectionResponse(
            text=request.text,
            detected_language=result.language,
            confidence_score=result.confidence,
            alternative_languages=result.alternatives
        )
        
    except Exception as e:
        logger.error("Language detection failed", error=str(e))
        raise HTTPException(status_code=500, detail="Language detection failed")


@router.get("/history", response_model=List[TranslationHistory])
async def get_translation_history(
    limit: int = 50,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    """
    Get recent translation history.
    """
    try:
        translation_service = TranslationService(db)
        history = await translation_service.get_translation_history(limit, offset)
        return history
        
    except Exception as e:
        logger.error("Failed to get translation history", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to get translation history")


@router.post("/feedback")
async def submit_translation_feedback(
    feedback: TranslationFeedback,
    db: Session = Depends(get_db)
):
    """
    Submit feedback for a translation.
    """
    try:
        translation_service = TranslationService(db)
        await translation_service.submit_feedback(feedback)
        
        return {"message": "Feedback submitted successfully"}
        
    except Exception as e:
        logger.error("Failed to submit feedback", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to submit feedback")
