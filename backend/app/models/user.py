"""
User model for authentication and community features.
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base


class User(Base):
    """User model for authentication and community features."""
    
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(50), unique=True, index=True, nullable=False)
    full_name = Column(String(100), nullable=True)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    is_contributor = Column(Boolean, default=False)  # Can contribute translations
    is_moderator = Column(Boolean, default=False)  # Can verify translations
    native_languages = Column(Text, nullable=True)  # JSON array of language codes
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}')>"


class UserContribution(Base):
    """Model for tracking user contributions to the platform."""
    
    __tablename__ = "user_contributions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    contribution_type = Column(String(50), nullable=False)  # translation, audio, feedback, etc.
    content = Column(Text, nullable=False)  # The actual contribution
    language_id = Column(Integer, ForeignKey("languages.id"), nullable=True)
    verification_status = Column(String(20), default="pending")  # pending, approved, rejected
    verified_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    verification_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<UserContribution(user_id={self.user_id}, type='{self.contribution_type}')>"
