from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from ..models.video import LanguageRequest, LanguageResponse
from ..services.language import LanguageService

router = APIRouter(prefix="/api/language", tags=["language"])

language_service = LanguageService()


@router.get("", response_model=LanguageResponse)
async def get_translations(lang: str = "en"):
    """Get translations for a specific language"""
    try:
        result = language_service.get_translations(lang)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/detect", response_model=LanguageResponse)
async def detect_language(accept_language: Optional[str] = Header(None)):
    """Detect language from Accept-Language header"""
    try:
        detected_lang = language_service.detect_language(accept_language)
        return {
            "status": "success",
            "language": detected_lang
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
