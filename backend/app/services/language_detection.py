"""
Language detection service.
"""

from typing import List, Dict
from sqlalchemy.orm import Session
import structlog

logger = structlog.get_logger(__name__)


class LanguageDetectionResult:
    """Result of language detection."""
    
    def __init__(self, language: str, confidence: float, alternatives: List[Dict] = None):
        self.language = language
        self.confidence = confidence
        self.alternatives = alternatives or []


class LanguageDetectionService:
    """Service for detecting language of input text."""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def detect_language(self, text: str) -> LanguageDetectionResult:
        """
        Detect the language of the input text.
        This is a mock implementation - in production, integrate with:
        - langdetect library
        - fastText language identification
        - Custom trained models
        """
        try:
            # Mock language detection logic
            text_lower = text.lower()
            
            # Simple keyword-based detection for demonstration
            swahili_keywords = ["hujambo", "asante", "kwaheri", "habari", "mzuri", "sana"]
            kikuyu_keywords = ["ni wega", "wendo", "mukinyu", "gikuyu"]
            luo_keywords = ["oyawore", "adhi", "dholuo", "joluo"]
            
            swahili_score = sum(1 for word in swahili_keywords if word in text_lower)
            kikuyu_score = sum(1 for word in kikuyu_keywords if word in text_lower)
            luo_score = sum(1 for word in luo_keywords if word in text_lower)
            
            # Determine detected language
            if swahili_score > 0:
                return LanguageDetectionResult(
                    language="sw",
                    confidence=0.8,
                    alternatives=[
                        {"language": "ki", "confidence": 0.1},
                        {"language": "luo", "confidence": 0.1}
                    ]
                )
            elif kikuyu_score > 0:
                return LanguageDetectionResult(
                    language="ki",
                    confidence=0.8,
                    alternatives=[
                        {"language": "sw", "confidence": 0.1},
                        {"language": "luo", "confidence": 0.1}
                    ]
                )
            elif luo_score > 0:
                return LanguageDetectionResult(
                    language="luo",
                    confidence=0.8,
                    alternatives=[
                        {"language": "sw", "confidence": 0.1},
                        {"language": "ki", "confidence": 0.1}
                    ]
                )
            else:
                # Default to English if no Kenyan language detected
                return LanguageDetectionResult(
                    language="en",
                    confidence=0.6,
                    alternatives=[
                        {"language": "sw", "confidence": 0.2},
                        {"language": "ki", "confidence": 0.1},
                        {"language": "luo", "confidence": 0.1}
                    ]
                )
                
        except Exception as e:
            logger.error("Language detection failed", error=str(e))
            # Return default result on error
            return LanguageDetectionResult(
                language="en",
                confidence=0.5,
                alternatives=[]
            )
