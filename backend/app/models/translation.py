"""
Translation model for storing translation pairs and metadata.
"""

from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Translation(Base):
    """Translation model for storing translation pairs."""
    
    __tablename__ = "translations"
    
    id = Column(Integer, primary_key=True, index=True)
    source_lang_id = Column(Integer, ForeignKey("languages.id"), nullable=False)
    target_lang_id = Column(Integer, ForeignKey("languages.id"), nullable=False)
    source_text = Column(Text, nullable=False)
    target_text = Column(Text, nullable=False)
    confidence_score = Column(Float, nullable=True)  # Model confidence (0.0-1.0)
    model_version = Column(String(50), nullable=True)  # Model version used
    is_verified = Column(Boolean, default=False)  # Community verification
    verified_by = Column(Integer, nullable=True)  # User ID who verified
    usage_count = Column(Integer, default=0)  # How many times this translation was used
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    source_language = relationship("Language", foreign_keys=[source_lang_id])
    target_language = relationship("Language", foreign_keys=[target_lang_id])
    
    def __repr__(self):
        return f"<Translation({self.source_language.code}->{self.target_language.code}: '{self.source_text[:50]}...')>"


class TranslationRequest(Base):
    """Model for tracking translation requests and usage analytics."""
    
    __tablename__ = "translation_requests"
    
    id = Column(Integer, primary_key=True, index=True)
    source_lang_id = Column(Integer, ForeignKey("languages.id"), nullable=False)
    target_lang_id = Column(Integer, ForeignKey("languages.id"), nullable=False)
    source_text = Column(Text, nullable=False)
    target_text = Column(Text, nullable=True)  # May be null if translation failed
    confidence_score = Column(Float, nullable=True)
    model_version = Column(String(50), nullable=True)
    user_id = Column(Integer, nullable=True)  # Optional user tracking
    ip_address = Column(String(45), nullable=True)  # For analytics
    response_time_ms = Column(Integer, nullable=True)  # API response time
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    source_language = relationship("Language", foreign_keys=[source_lang_id])
    target_language = relationship("Language", foreign_keys=[target_lang_id])
    
    def __repr__(self):
        return f"<TranslationRequest({self.source_language.code}->{self.target_language.code})>"
