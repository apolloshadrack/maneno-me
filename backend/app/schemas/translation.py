"""
Pydantic schemas for translation-related API endpoints.
"""

from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime


class TranslationRequest(BaseModel):
    """Schema for translation request."""
    source_text: str = Field(..., description="Text to translate")
    source_lang: str = Field(..., description="Source language code")
    target_lang: str = Field(..., description="Target language code")
    model_version: Optional[str] = Field(None, description="Specific model version to use")


class BatchTranslationRequest(BaseModel):
    """Schema for batch translation request."""
    texts: List[str] = Field(..., description="List of texts to translate")
    source_lang: str = Field(..., description="Source language code")
    target_lang: str = Field(..., description="Target language code")
    model_version: Optional[str] = Field(None, description="Specific model version to use")


class LanguageDetectionRequest(BaseModel):
    """Schema for language detection request."""
    text: str = Field(..., description="Text to detect language for")


class TranslationResponse(BaseModel):
    """Schema for translation response."""
    source_text: str
    target_text: str
    source_lang: str
    target_lang: str
    confidence_score: Optional[float] = None
    model_version: Optional[str] = None
    response_time_ms: Optional[int] = None


class BatchTranslationResponse(BaseModel):
    """Schema for batch translation response."""
    translations: List[TranslationResponse]
    total_processed: int
    total_time_ms: int


class LanguageDetectionResponse(BaseModel):
    """Schema for language detection response."""
    text: str
    detected_language: str
    confidence_score: float
    alternative_languages: Optional[List[dict]] = None


class TranslationHistory(BaseModel):
    """Schema for translation history."""
    id: int
    source_text: str
    target_text: Optional[str] = None
    source_lang: str
    target_lang: str
    confidence_score: Optional[float] = None
    model_version: Optional[str] = None
    response_time_ms: Optional[int] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class TranslationFeedback(BaseModel):
    """Schema for translation feedback."""
    translation_id: int
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    feedback_text: Optional[str] = Field(None, description="Optional feedback text")
    is_correct: Optional[bool] = Field(None, description="Whether the translation is correct")
