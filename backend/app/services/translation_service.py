"""
Translation service for handling translation logic.
"""

from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import and_, desc
import structlog
import time

from app.models.translation import Translation, TranslationRequest
from app.models.language import Language
from app.schemas.translation import TranslationHistory, TranslationFeedback

logger = structlog.get_logger(__name__)


class TranslationService:
    """Service for handling translation operations."""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def translate(
        self,
        source_text: str,
        source_lang: str,
        target_lang: str,
        model_version: Optional[str] = None
    ) -> dict:
        """
        Translate text from source language to target language.
        """
        try:
            # For now, implement a simple mock translation
            # In production, this would integrate with ML models
            
            # Check if we have a cached translation
            cached_translation = self._get_cached_translation(
                source_text, source_lang, target_lang
            )
            
            if cached_translation:
                return {
                    "target_text": cached_translation.target_text,
                    "confidence_score": cached_translation.confidence_score,
                    "model_version": cached_translation.model_version
                }
            
            # Perform translation (mock implementation)
            target_text = await self._perform_translation(
                source_text, source_lang, target_lang, model_version
            )
            
            # Store translation in database
            translation = Translation(
                source_lang_id=self._get_language_id(source_lang),
                target_lang_id=self._get_language_id(target_lang),
                source_text=source_text,
                target_text=target_text,
                confidence_score=0.85,  # Mock confidence
                model_version=model_version or "v1.0",
                is_verified=False
            )
            
            self.db.add(translation)
            self.db.commit()
            self.db.refresh(translation)
            
            return {
                "target_text": target_text,
                "confidence_score": 0.85,
                "model_version": model_version or "v1.0"
            }
            
        except Exception as e:
            logger.error("Translation failed", error=str(e))
            raise
    
    def _get_cached_translation(
        self, source_text: str, source_lang: str, target_lang: str
    ) -> Optional[Translation]:
        """Get cached translation from database."""
        source_lang_id = self._get_language_id(source_lang)
        target_lang_id = self._get_language_id(target_lang)
        
        return self.db.query(Translation).filter(
            and_(
                Translation.source_lang_id == source_lang_id,
                Translation.target_lang_id == target_lang_id,
                Translation.source_text == source_text
            )
        ).first()
    
    def _get_language_id(self, language_code: str) -> int:
        """Get language ID by code."""
        language = self.db.query(Language).filter(
            Language.code == language_code
        ).first()
        
        if not language:
            raise ValueError(f"Language not found: {language_code}")
        
        return language.id
    
    async def _perform_translation(
        self, source_text: str, source_lang: str, target_lang: str, model_version: Optional[str]
    ) -> str:
        """
        Perform actual translation using ML models.
        This is a mock implementation - in production, integrate with:
        - OpenNMT-py models
        - Hugging Face Transformers
        - Custom trained models
        """
        # Mock translation logic
        if source_lang == "en" and target_lang == "sw":
            # English to Swahili mock
            mock_translations = {
                "hello": "hujambo",
                "good morning": "habari za asubuhi",
                "thank you": "asante",
                "how are you": "habari yako",
                "goodbye": "kwaheri"
            }
            return mock_translations.get(source_text.lower(), f"[{source_text}] (translated to Swahili)")
        
        elif source_lang == "sw" and target_lang == "en":
            # Swahili to English mock
            mock_translations = {
                "hujambo": "hello",
                "habari za asubuhi": "good morning",
                "asante": "thank you",
                "habari yako": "how are you",
                "kwaheri": "goodbye"
            }
            return mock_translations.get(source_text.lower(), f"[{source_text}] (translated to English)")
        
        else:
            # Generic mock for other language pairs
            return f"[{source_text}] (translated from {source_lang} to {target_lang})"
    
    async def log_translation_request(
        self,
        source_text: str,
        target_text: str,
        source_lang: str,
        target_lang: str,
        confidence_score: Optional[float],
        model_version: Optional[str],
        response_time_ms: int
    ):
        """Log translation request for analytics."""
        try:
            request = TranslationRequest(
                source_lang_id=self._get_language_id(source_lang),
                target_lang_id=self._get_language_id(target_lang),
                source_text=source_text,
                target_text=target_text,
                confidence_score=confidence_score,
                model_version=model_version,
                response_time_ms=response_time_ms
            )
            
            self.db.add(request)
            self.db.commit()
            
        except Exception as e:
            logger.error("Failed to log translation request", error=str(e))
    
    async def get_translation_history(
        self, limit: int = 50, offset: int = 0
    ) -> List[TranslationHistory]:
        """Get translation history."""
        try:
            requests = self.db.query(TranslationRequest).order_by(
                desc(TranslationRequest.created_at)
            ).offset(offset).limit(limit).all()
            
            history = []
            for req in requests:
                history.append(TranslationHistory(
                    id=req.id,
                    source_text=req.source_text,
                    target_text=req.target_text,
                    source_lang=req.source_language.code,
                    target_lang=req.target_language.code,
                    confidence_score=req.confidence_score,
                    model_version=req.model_version,
                    response_time_ms=req.response_time_ms,
                    created_at=req.created_at
                ))
            
            return history
            
        except Exception as e:
            logger.error("Failed to get translation history", error=str(e))
            raise
    
    async def submit_feedback(self, feedback: TranslationFeedback):
        """Submit feedback for a translation."""
        try:
            # In a real implementation, this would store feedback
            # and potentially update translation confidence scores
            logger.info("Feedback submitted", feedback=feedback.dict())
            
        except Exception as e:
            logger.error("Failed to submit feedback", error=str(e))
            raise
