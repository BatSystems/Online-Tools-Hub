from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from app.models.admin.auth import AdminCredentials, AdminToken
from app.services.admin import (
    authenticate_admin,
    create_access_token,
    get_current_admin,
    update_admin_password,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

router = APIRouter(
    prefix="/api/admin",
    tags=["admin"]
)


@router.post("/login", response_model=AdminToken)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    credentials = AdminCredentials(
        username=form_data.username,
        password=form_data.password
    )
    
    if not authenticate_admin(credentials):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/change-password")
async def change_admin_password(
    new_password: str,
    current_admin: dict = Depends(get_current_admin)
):
    if len(new_password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters long"
        )
    
    update_admin_password(new_password)
    
    return {"message": "Password updated successfully"}
