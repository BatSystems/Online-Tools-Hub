from fastapi import APIRouter, HTTPException, Depends, status
from typing import Optional
import os
import re

from app.models.admin.url_shortener import URLShortenerRequest, URLShortenerResponse, URLShortenerList
from app.services.admin import save_url, get_urls, get_url_by_alias, delete_url, increment_url_clicks

router = APIRouter(
    prefix="/api/url",
    tags=["url"],
)


@router.post("/shorten", response_model=URLShortenerResponse)
async def shorten_url(url_data: URLShortenerRequest):
    """
    Shorten a URL. Optionally provide a custom alias.
    """
    if url_data.custom_alias:
        if len(url_data.custom_alias) < 3:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Custom alias must be at least 3 characters long"
            )
        
        if not re.match(r'^[a-zA-Z0-9_-]+$', url_data.custom_alias):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Custom alias can only contain letters, numbers, underscores, and hyphens"
            )
        
        existing_url = get_url_by_alias(url_data.custom_alias)
        if existing_url:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This custom alias is already in use"
            )
    
    url_id = save_url(url_data)
    
    urls = get_urls()
    for url in urls:
        if url["id"] == url_id:
            return url
    
    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Failed to create shortened URL"
    )


@router.get("/s/{alias}")
async def redirect_to_url(alias: str):
    """
    Redirect to the original URL for a given alias.
    """
    url = get_url_by_alias(alias)
    
    if not url:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="URL not found"
        )
    
    increment_url_clicks(url["id"])
    
    return {"url": url["original_url"]}


@router.get("/list", response_model=URLShortenerList)
async def list_urls():
    """
    List all shortened URLs.
    """
    urls = get_urls()
    return {"urls": urls, "total": len(urls)}


@router.delete("/{url_id}")
async def delete_shortened_url(url_id: int):
    """
    Delete a shortened URL.
    """
    success = delete_url(url_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="URL not found"
        )
    
    return {"message": "URL deleted successfully"}
