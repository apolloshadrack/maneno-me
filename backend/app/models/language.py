"""
Language model for storing Kenyan language information.
"""

from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float
from sqlalchemy.sql import func
from app.core.database import Base


class Language(Base):
    """Language model for storing Kenyan language metadata."""
    
    __tablename__ = "languages"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    code = Column(String(10), unique=True, index=True, nullable=False)  # ISO 639-3 or custom code
    family = Column(String(50), nullable=True)  # Language family (e.g., Bantu, Nilotic)
    status = Column(String(20), default="active")  # active, endangered, extinct
    speaker_count = Column(Integer, nullable=True)  # Estimated number of speakers
    orthography_notes = Column(Text, nullable=True)  # Writing system information
    cultural_context = Column(Text, nullable=True)  # Cultural background
    priority_tier = Column(Integer, default=3)  # 1=high, 2=medium, 3=low/endangered
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Language(name='{self.name}', code='{self.code}')>"
