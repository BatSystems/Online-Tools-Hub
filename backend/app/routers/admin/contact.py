from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from app.models.admin.contact import ContactMessage, ContactMessageResponse, ContactMessageList
from app.services.admin import get_contact_messages, mark_message_as_read, get_current_admin

router = APIRouter(
    prefix="/api/admin/contact",
    tags=["admin"]
)


@router.get("/messages", response_model=ContactMessageList)
async def get_messages(
    skip: int = 0,
    limit: int = 10,
    current_admin: dict = Depends(get_current_admin)
):
    messages = get_contact_messages()
    
    messages.sort(key=lambda x: x["created_at"], reverse=True)
    
    paginated_messages = messages[skip:skip + limit]
    
    return {
        "messages": paginated_messages,
        "total": len(messages)
    }


@router.put("/messages/{message_id}/read")
async def mark_as_read(
    message_id: int,
    current_admin: dict = Depends(get_current_admin)
):
    success = mark_message_as_read(message_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )
    
    return {"message": "Message marked as read"}
