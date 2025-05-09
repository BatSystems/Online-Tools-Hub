from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from typing import List

from app.models.admin.cookies import CookieFile, CookieFileResponse, CookieFileList
from app.services.admin import (
    get_cookie_files,
    save_cookie_file,
    toggle_cookie_status,
    delete_cookie,
    get_current_admin
)

router = APIRouter(
    prefix="/api/admin/cookies",
    tags=["admin"]
)


@router.get("/", response_model=CookieFileList)
async def get_cookies(
    current_admin: dict = Depends(get_current_admin)
):
    cookies = get_cookie_files()
    
    cookies.sort(key=lambda x: x["created_at"], reverse=True)
    
    return {
        "cookies": cookies,
        "total": len(cookies)
    }


@router.post("/", response_model=CookieFileResponse)
async def upload_cookie(
    platform: str = Form(...),
    file: UploadFile = File(...),
    current_admin: dict = Depends(get_current_admin)
):
    content = await file.read()
    
    cookie = CookieFile(
        platform=platform,
        filename=file.filename,
        content=content.decode("utf-8"),
        active=True,
        created_at=""  # Will be set in the service
    )
    
    cookie_id = save_cookie_file(cookie)
    
    cookies = get_cookie_files()
    saved_cookie = next((c for c in cookies if c["id"] == cookie_id), None)
    
    if not saved_cookie:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save cookie file"
        )
    
    return saved_cookie


@router.put("/{cookie_id}/toggle")
async def toggle_cookie(
    cookie_id: int,
    active: bool,
    current_admin: dict = Depends(get_current_admin)
):
    success = toggle_cookie_status(cookie_id, active)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cookie not found"
        )
    
    return {"message": f"Cookie {'activated' if active else 'deactivated'} successfully"}


@router.delete("/{cookie_id}")
async def remove_cookie(
    cookie_id: int,
    current_admin: dict = Depends(get_current_admin)
):
    success = delete_cookie(cookie_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cookie not found"
        )
    
    return {"message": "Cookie deleted successfully"}
