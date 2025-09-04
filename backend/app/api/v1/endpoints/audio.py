"""
Audio processing API endpoints.
"""

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
import structlog

from app.core.database import get_db
from app.services.audio_service import AudioService

logger = structlog.get_logger(__name__)
router = APIRouter()


@router.post("/speech-to-text")
async def speech_to_text(
    audio_file: UploadFile = File(...),
    language_code: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Convert speech to text using Whisper.
    """
    try:
        audio_service = AudioService(db)
        
        # Validate file type
        if not audio_file.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        # Process audio
        result = await audio_service.speech_to_text(audio_file, language_code)
        
        return {
            "text": result.text,
            "confidence": result.confidence,
            "language_detected": result.language_detected,
            "processing_time_ms": result.processing_time_ms
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Speech-to-text failed", error=str(e))
        raise HTTPException(status_code=500, detail="Speech-to-text processing failed")


@router.post("/text-to-speech")
async def text_to_speech(
    text: str = Form(...),
    language_code: str = Form(...),
    voice: str = Form("default"),
    db: Session = Depends(get_db)
):
    """
    Convert text to speech.
    """
    try:
        audio_service = AudioService(db)
        
        result = await audio_service.text_to_speech(text, language_code, voice)
        
        return {
            "audio_url": result.audio_url,
            "duration_seconds": result.duration_seconds,
            "processing_time_ms": result.processing_time_ms
        }
        
    except Exception as e:
        logger.error("Text-to-speech failed", error=str(e))
        raise HTTPException(status_code=500, detail="Text-to-speech processing failed")


@router.post("/pronunciation-score")
async def get_pronunciation_score(
    audio_file: UploadFile = File(...),
    reference_text: str = Form(...),
    language_code: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Score pronunciation accuracy.
    """
    try:
        audio_service = AudioService(db)
        
        # Validate file type
        if not audio_file.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        result = await audio_service.score_pronunciation(audio_file, reference_text, language_code)
        
        return {
            "score": result.score,
            "feedback": result.feedback,
            "phoneme_scores": result.phoneme_scores,
            "processing_time_ms": result.processing_time_ms
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Pronunciation scoring failed", error=str(e))
        raise HTTPException(status_code=500, detail="Pronunciation scoring failed")
