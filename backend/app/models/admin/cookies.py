from pydantic import BaseModel
from typing import Optional, Dict, Any, List


class CookieFile(BaseModel):
    id: Optional[int] = None
    platform: str  # youtube, tiktok, etc.
    filename: str
    content: str
    active: bool = True
    created_at: str


class CookieFileResponse(BaseModel):
    id: int
    platform: str
    filename: str
    active: bool
    created_at: str


class CookieFileList(BaseModel):
    cookies: List[CookieFileResponse]
    total: int
