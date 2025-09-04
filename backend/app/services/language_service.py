"""
Language service for managing language data.
"""

from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
import structlog

from app.models.language import Language
from app.schemas.language import LanguageCreate, LanguageUpdate

logger = structlog.get_logger(__name__)


class LanguageService:
    """Service for managing language operations."""
    
    def __init__(self, db: Session):
        self.db = db
    
    async def get_languages(
        self,
        page: int = 1,
        size: int = 50,
        tier: Optional[int] = None,
        status: Optional[str] = None,
        family: Optional[str] = None
    ) -> Tuple[List[Language], int]:
        """Get paginated list of languages with optional filtering."""
        try:
            query = self.db.query(Language).filter(Language.is_active == True)
            
            # Apply filters
            if tier is not None:
                query = query.filter(Language.priority_tier == tier)
            
            if status:
                query = query.filter(Language.status == status)
            
            if family:
                query = query.filter(Language.family == family)
            
            # Get total count
            total = query.count()
            
            # Apply pagination
            offset = (page - 1) * size
            languages = query.offset(offset).limit(size).all()
            
            return languages, total
            
        except Exception as e:
            logger.error("Failed to get languages", error=str(e))
            raise
    
    async def get_language_by_code(self, language_code: str) -> Optional[Language]:
        """Get language by its code."""
        try:
            return self.db.query(Language).filter(
                and_(
                    Language.code == language_code,
                    Language.is_active == True
                )
            ).first()
            
        except Exception as e:
            logger.error("Failed to get language by code", error=str(e))
            raise
    
    async def get_languages_by_tier(self, tier: int) -> List[Language]:
        """Get languages by priority tier."""
        try:
            return self.db.query(Language).filter(
                and_(
                    Language.priority_tier == tier,
                    Language.is_active == True
                )
            ).all()
            
        except Exception as e:
            logger.error("Failed to get languages by tier", error=str(e))
            raise
    
    async def get_languages_by_family(self, family: str) -> List[Language]:
        """Get languages by language family."""
        try:
            return self.db.query(Language).filter(
                and_(
                    Language.family == family,
                    Language.is_active == True
                )
            ).all()
            
        except Exception as e:
            logger.error("Failed to get languages by family", error=str(e))
            raise
    
    async def create_language(self, language_data: LanguageCreate) -> Language:
        """Create a new language entry."""
        try:
            # Check if language code already exists
            existing = self.db.query(Language).filter(
                Language.code == language_data.code
            ).first()
            
            if existing:
                raise ValueError(f"Language with code '{language_data.code}' already exists")
            
            # Create new language
            language = Language(**language_data.dict())
            self.db.add(language)
            self.db.commit()
            self.db.refresh(language)
            
            return language
            
        except Exception as e:
            logger.error("Failed to create language", error=str(e))
            self.db.rollback()
            raise
    
    async def update_language(
        self, language_id: int, language_update: LanguageUpdate
    ) -> Optional[Language]:
        """Update language information."""
        try:
            language = self.db.query(Language).filter(
                Language.id == language_id
            ).first()
            
            if not language:
                return None
            
            # Update fields
            update_data = language_update.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(language, field, value)
            
            self.db.commit()
            self.db.refresh(language)
            
            return language
            
        except Exception as e:
            logger.error("Failed to update language", error=str(e))
            self.db.rollback()
            raise
    
    async def seed_initial_languages(self):
        """Seed the database with initial Kenyan languages."""
        try:
            # Check if languages already exist
            existing_count = self.db.query(Language).count()
            if existing_count > 0:
                logger.info("Languages already seeded, skipping")
                return
            
            # Tier 1 languages (High Resource)
            tier1_languages = [
                {
                    "name": "Swahili",
                    "code": "sw",
                    "family": "Bantu",
                    "status": "active",
                    "speaker_count": 15000000,
                    "priority_tier": 1,
                    "cultural_context": "National language of Kenya and Tanzania, widely spoken across East Africa"
                },
                {
                    "name": "Kikuyu",
                    "code": "ki",
                    "family": "Bantu",
                    "status": "active",
                    "speaker_count": 8000000,
                    "priority_tier": 1,
                    "cultural_context": "Major language of the Kikuyu people, central Kenya"
                },
                {
                    "name": "Luo",
                    "code": "luo",
                    "family": "Nilotic",
                    "status": "active",
                    "speaker_count": 5000000,
                    "priority_tier": 1,
                    "cultural_context": "Language of the Luo people, western Kenya"
                },
                {
                    "name": "Luhya",
                    "code": "luy",
                    "family": "Bantu",
                    "status": "active",
                    "speaker_count": 6000000,
                    "priority_tier": 1,
                    "cultural_context": "Language family of the Luhya people, western Kenya"
                },
                {
                    "name": "Kamba",
                    "code": "kam",
                    "family": "Bantu",
                    "status": "active",
                    "speaker_count": 4000000,
                    "priority_tier": 1,
                    "cultural_context": "Language of the Kamba people, eastern Kenya"
                }
            ]
            
            # Tier 2 languages (Medium Resource)
            tier2_languages = [
                {
                    "name": "Kalenjin",
                    "code": "kln",
                    "family": "Nilotic",
                    "status": "active",
                    "speaker_count": 5000000,
                    "priority_tier": 2,
                    "cultural_context": "Language family of the Kalenjin people, Rift Valley"
                },
                {
                    "name": "Kisii",
                    "code": "guz",
                    "family": "Bantu",
                    "status": "active",
                    "speaker_count": 2000000,
                    "priority_tier": 2,
                    "cultural_context": "Language of the Kisii people, southwestern Kenya"
                },
                {
                    "name": "Meru",
                    "code": "mer",
                    "family": "Bantu",
                    "status": "active",
                    "speaker_count": 2000000,
                    "priority_tier": 2,
                    "cultural_context": "Language of the Meru people, eastern Kenya"
                },
                {
                    "name": "Turkana",
                    "code": "tuv",
                    "family": "Nilotic",
                    "status": "active",
                    "speaker_count": 1000000,
                    "priority_tier": 2,
                    "cultural_context": "Language of the Turkana people, northwestern Kenya"
                },
                {
                    "name": "Maasai",
                    "code": "mas",
                    "family": "Nilotic",
                    "status": "active",
                    "speaker_count": 1000000,
                    "priority_tier": 2,
                    "cultural_context": "Language of the Maasai people, southern Kenya and northern Tanzania"
                }
            ]
            
            # Tier 3 languages (Low/Endangered)
            tier3_languages = [
                {
                    "name": "Samburu",
                    "code": "saq",
                    "family": "Nilotic",
                    "status": "endangered",
                    "speaker_count": 200000,
                    "priority_tier": 3,
                    "cultural_context": "Language of the Samburu people, northern Kenya"
                },
                {
                    "name": "Pokot",
                    "code": "pko",
                    "family": "Nilotic",
                    "status": "endangered",
                    "speaker_count": 200000,
                    "priority_tier": 3,
                    "cultural_context": "Language of the Pokot people, northwestern Kenya"
                },
                {
                    "name": "Borana",
                    "code": "gax",
                    "family": "Cushitic",
                    "status": "endangered",
                    "speaker_count": 100000,
                    "priority_tier": 3,
                    "cultural_context": "Language of the Borana people, northern Kenya"
                },
                {
                    "name": "Rendille",
                    "code": "rel",
                    "family": "Cushitic",
                    "status": "endangered",
                    "speaker_count": 50000,
                    "priority_tier": 3,
                    "cultural_context": "Language of the Rendille people, northern Kenya"
                },
                {
                    "name": "El Molo",
                    "code": "elo",
                    "family": "Cushitic",
                    "status": "critically_endangered",
                    "speaker_count": 1000,
                    "priority_tier": 3,
                    "cultural_context": "Critically endangered language of the El Molo people, northern Kenya"
                }
            ]
            
            # Add all languages
            all_languages = tier1_languages + tier2_languages + tier3_languages
            
            for lang_data in all_languages:
                language = Language(**lang_data)
                self.db.add(language)
            
            self.db.commit()
            logger.info(f"Seeded {len(all_languages)} languages")
            
        except Exception as e:
            logger.error("Failed to seed initial languages", error=str(e))
            self.db.rollback()
            raise
