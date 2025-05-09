from pydantic import BaseModel, HttpUrl, validator
from typing import Optional, List, Dict, Any, Union
from enum import Enum


class VideoFormat(str, Enum):
    MP4 = "mp4"
    MP3 = "mp3"


class VideoDownloadRequest(BaseModel):
    url: HttpUrl
    format: Optional[VideoFormat] = VideoFormat.MP4

    @validator('url')
    def validate_url(cls, v):
        url_str = str(v)
        return url_str


class VideoDownloadResponse(BaseModel):
    status: str
    download_url: Optional[str] = None
    title: Optional[str] = None
    message: Optional[str] = None
    formats: Optional[List[Dict[str, Any]]] = None


class LanguageRequest(BaseModel):
    lang: str = "en"  # Default to English


class LanguageResponse(BaseModel):
    status: str
    language: str
    translations: Optional[Dict[str, Union[str, Dict[str, Any]]]] = None
    message: Optional[str] = None
