"""
Community service for handling user contributions and feedback.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from fastapi import UploadFile
import structlog
import time

from app.models.user import UserContribution
from app.schemas.translation import TranslationFeedback

logger = structlog.get_logger(__name__)


class CommunityService:
    """Service for community features and contributions."""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def contribute_translation(
        self,
        source_text: str,
        target_text: str,
        source_lang: str,
        target_lang: str,
        cultural_context: Optional[str] = None,
        contributor_notes: Optional[str] = None
    ) -> UserContribution:
        """Contribute a translation to the community database."""
        try:
            contribution = UserContribution(
                user_id=1,  # Mock user ID - in production, get from auth
                contribution_type="translation",
                content=f"{source_lang}:{source_text}|{target_lang}:{target_text}",
                verification_status="pending"
            )
            
            self.db.add(contribution)
            self.db.commit()
            self.db.refresh(contribution)
            
            logger.info("Translation contribution submitted", contribution_id=contribution.id)
            return contribution
            
        except Exception as e:
            logger.error("Failed to contribute translation", error=str(e))
            self.db.rollback()
            raise
    
    async def contribute_audio(
        self,
        audio_file: UploadFile,
        text: str,
        language_code: str,
        speaker_info: Optional[str] = None,
        cultural_context: Optional[str] = None
    ) -> UserContribution:
        """Contribute audio recording for language preservation."""
        try:
            # In production, save the audio file to storage
            # For now, just store metadata
            
            contribution = UserContribution(
                user_id=1,  # Mock user ID
                contribution_type="audio",
                content=f"audio:{audio_file.filename}|text:{text}|lang:{language_code}",
                verification_status="pending"
            )
            
            self.db.add(contribution)
            self.db.commit()
            self.db.refresh(contribution)
            
            logger.info("Audio contribution submitted", contribution_id=contribution.id)
            return contribution
            
        except Exception as e:
            logger.error("Failed to contribute audio", error=str(e))
            self.db.rollback()
            raise
    
    async def get_cultural_context(self, language_code: str, phrase: str) -> Optional[dict]:
        """Get cultural context for a specific phrase."""
        try:
            # Mock cultural context data
            cultural_contexts = {
                "sw": {
                    "hujambo": {
                        "meaning": "Hello, how are you?",
                        "cultural_note": "A common greeting in Swahili, used throughout East Africa",
                        "usage": "Can be used at any time of day",
                        "response": "Sijambo (I'm fine) or Salama (peace)"
                    },
                    "asante": {
                        "meaning": "Thank you",
                        "cultural_note": "Shows respect and appreciation",
                        "usage": "Used after receiving help or gifts",
                        "response": "Karibu (you're welcome)"
                    }
                },
                "ki": {
                    "ni wega": {
                        "meaning": "It's good/well",
                        "cultural_note": "Common response to greetings in Kikuyu",
                        "usage": "Used to express that things are going well",
                        "response": "Wega muno (very good)"
                    }
                }
            }
            
            language_contexts = cultural_contexts.get(language_code, {})
            return language_contexts.get(phrase.lower())
            
        except Exception as e:
            logger.error("Failed to get cultural context", error=str(e))
            return None
    
    async def submit_feedback(self, feedback: TranslationFeedback):
        """Submit feedback for translations or other content."""
        try:
            # In production, store feedback in database and potentially
            # update translation confidence scores
            
            contribution = UserContribution(
                user_id=1,  # Mock user ID
                contribution_type="feedback",
                content=f"translation_id:{feedback.translation_id}|rating:{feedback.rating}|feedback:{feedback.feedback_text}",
                verification_status="approved"
            )
            
            self.db.add(contribution)
            self.db.commit()
            
            logger.info("Feedback submitted", feedback=feedback.dict())
            
        except Exception as e:
            logger.error("Failed to submit feedback", error=str(e))
            self.db.rollback()
            raise
    
    async def get_contributions(
        self, limit: int = 50, offset: int = 0, status: str = "all"
    ) -> List[UserContribution]:
        """Get community contributions."""
        try:
            query = self.db.query(UserContribution)
            
            if status != "all":
                query = query.filter(UserContribution.verification_status == status)
            
            contributions = query.offset(offset).limit(limit).all()
            return contributions
            
        except Exception as e:
            logger.error("Failed to get contributions", error=str(e))
            raise
