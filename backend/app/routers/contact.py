from fastapi import APIRouter, HTTPException, status
from pydantic import EmailStr

from app.models.admin.contact import ContactMessage
from app.services.admin import save_contact_message

router = APIRouter(
    prefix="/api/contact",
    tags=["contact"]
)


@router.post("/")
async def submit_contact_form(
    name: str,
    email: EmailStr,
    subject: str,
    message: str
):
    contact_message = ContactMessage(
        name=name,
        email=email,
        subject=subject,
        message=message
    )
    
    message_id = save_contact_message(contact_message)
    
    if not message_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save contact message"
        )
    
    return {"message": "Your message has been sent successfully"}
