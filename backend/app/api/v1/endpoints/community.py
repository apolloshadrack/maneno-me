"""
Community features API endpoints.
"""

from typing import List
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
import structlog

from app.core.database import get_db
from app.schemas.translation import TranslationFeedback
from app.services.community_service import CommunityService

logger = structlog.get_logger(__name__)
router = APIRouter()


@router.post("/contribute/translation")
async def contribute_translation(
    source_text: str = Form(...),
    target_text: str = Form(...),
    source_lang: str = Form(...),
    target_lang: str = Form(...),
    cultural_context: str = Form(None),
    contributor_notes: str = Form(None),
    db: Session = Depends(get_db)
):
    """
    Contribute a translation to the community database.
    """
    try:
        community_service = CommunityService(db)
        
        contribution = await community_service.contribute_translation(
            source_text=source_text,
            target_text=target_text,
            source_lang=source_lang,
            target_lang=target_lang,
            cultural_context=cultural_context,
            contributor_notes=contributor_notes
        )
        
        return {
            "contribution_id": contribution.id,
            "message": "Translation contribution submitted successfully",
            "status": "pending_review"
        }
        
    except Exception as e:
        logger.error("Failed to contribute translation", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to contribute translation")


@router.post("/contribute/audio")
async def contribute_audio(
    audio_file: UploadFile = File(...),
    text: str = Form(...),
    language_code: str = Form(...),
    speaker_info: str = Form(None),
    cultural_context: str = Form(None),
    db: Session = Depends(get_db)
):
    """
    Contribute audio recording for language preservation.
    """
    try:
        community_service = CommunityService(db)
        
        # Validate file type
        if not audio_file.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        contribution = await community_service.contribute_audio(
            audio_file=audio_file,
            text=text,
            language_code=language_code,
            speaker_info=speaker_info,
            cultural_context=cultural_context
        )
        
        return {
            "contribution_id": contribution.id,
            "message": "Audio contribution submitted successfully",
            "status": "pending_review"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to contribute audio", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to contribute audio")


@router.get("/cultural-context/{language_code}/{phrase}")
async def get_cultural_context(
    language_code: str,
    phrase: str,
    db: Session = Depends(get_db)
):
    """
    Get cultural context for a specific phrase in a language.
    """
    try:
        community_service = CommunityService(db)
        
        context = await community_service.get_cultural_context(language_code, phrase)
        
        if not context:
            raise HTTPException(status_code=404, detail="Cultural context not found")
        
        return context
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to get cultural context", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to get cultural context")


@router.post("/feedback")
async def submit_feedback(
    feedback: TranslationFeedback,
    db: Session = Depends(get_db)
):
    """
    Submit feedback for translations or other content.
    """
    try:
        community_service = CommunityService(db)
        
        await community_service.submit_feedback(feedback)
        
        return {"message": "Feedback submitted successfully"}
        
    except Exception as e:
        logger.error("Failed to submit feedback", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to submit feedback")


@router.get("/contributions")
async def get_contributions(
    limit: int = 50,
    offset: int = 0,
    status: str = "all",
    db: Session = Depends(get_db)
):
    """
    Get community contributions (for moderators).
    """
    try:
        community_service = CommunityService(db)
        
        contributions = await community_service.get_contributions(
            limit=limit,
            offset=offset,
            status=status
        )
        
        return contributions
        
    except Exception as e:
        logger.error("Failed to get contributions", error=str(e))
        raise HTTPException(status_code=500, detail="Failed to get contributions")
