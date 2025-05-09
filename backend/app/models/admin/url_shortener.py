from pydantic import BaseModel, AnyUrl
from typing import Optional, List
from datetime import datetime


class URLShortenerRequest(BaseModel):
    original_url: AnyUrl
    custom_alias: Optional[str] = None


class URLShortenerResponse(BaseModel):
    id: int
    original_url: str
    alias: str
    short_url: str
    created_at: datetime
    clicks: int


class URLShortenerList(BaseModel):
    urls: List[URLShortenerResponse]
    total: int
