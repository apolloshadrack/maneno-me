"""
Pydantic schemas for language-related API endpoints.
"""

from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime


class LanguageBase(BaseModel):
    """Base language schema."""
    name: str = Field(..., description="Language name")
    code: str = Field(..., description="Language code (ISO 639-3 or custom)")
    family: Optional[str] = Field(None, description="Language family")
    status: str = Field("active", description="Language status")
    speaker_count: Optional[int] = Field(None, description="Estimated speaker count")
    orthography_notes: Optional[str] = Field(None, description="Writing system notes")
    cultural_context: Optional[str] = Field(None, description="Cultural background")
    priority_tier: int = Field(3, description="Priority tier (1=high, 2=medium, 3=low)")


class LanguageCreate(LanguageBase):
    """Schema for creating a new language."""
    pass


class LanguageUpdate(BaseModel):
    """Schema for updating language information."""
    name: Optional[str] = None
    code: Optional[str] = None
    family: Optional[str] = None
    status: Optional[str] = None
    speaker_count: Optional[int] = None
    orthography_notes: Optional[str] = None
    cultural_context: Optional[str] = None
    priority_tier: Optional[int] = None
    is_active: Optional[bool] = None


class Language(LanguageBase):
    """Schema for language response."""
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class LanguageList(BaseModel):
    """Schema for language list response."""
    languages: List[Language]
    total: int
    page: int
    size: int
