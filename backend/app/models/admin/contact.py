from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List


class ContactMessage(BaseModel):
    id: Optional[int] = None
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = datetime.now()
    read: bool = False


class ContactMessageResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime
    read: bool


class ContactMessageList(BaseModel):
    messages: List[ContactMessageResponse]
    total: int
