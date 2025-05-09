from fastapi import APIRouter, HTTPException, Request, Response, BackgroundTasks
from fastapi.responses import FileResponse, JSONResponse
from ..models.video import VideoDownloadRequest, VideoDownloadResponse, VideoFormat
from ..services.downloader import VideoDownloader
import os
import tempfile
from pathlib import Path
import uuid
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/download", tags=["downloads"])

downloader = VideoDownloader()

TEMP_DIR = Path(tempfile.gettempdir()) / "online_tools_hub_downloads"
TEMP_DIR.mkdir(exist_ok=True)

download_files = {}


@router.post("/youtube", response_model=VideoDownloadResponse)
async def download_youtube(request: VideoDownloadRequest):
    """Download a video from YouTube"""
    try:
        result = await downloader.download_youtube(str(request.url), request.format.value)
        return result
    except Exception as e:
        logger.error(f"Error in YouTube download endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/facebook", response_model=VideoDownloadResponse)
async def download_facebook(request: VideoDownloadRequest):
    """Download a video from Facebook"""
    try:
        result = await downloader.download_facebook(str(request.url))
        return result
    except Exception as e:
        logger.error(f"Error in Facebook download endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/tiktok", response_model=VideoDownloadResponse)
async def download_tiktok(request: VideoDownloadRequest):
    """Download a video from TikTok without watermark"""
    try:
        result = await downloader.download_tiktok(str(request.url))
        return result
    except Exception as e:
        logger.error(f"Error in TikTok download endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/instagram", response_model=VideoDownloadResponse)
async def download_instagram(request: VideoDownloadRequest):
    """Download a video from Instagram"""
    try:
        result = await downloader.download_instagram(str(request.url))
        return result
    except Exception as e:
        logger.error(f"Error in Instagram download endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/twitter", response_model=VideoDownloadResponse)
async def download_twitter(request: VideoDownloadRequest):
    """Download a video from Twitter"""
    try:
        result = await downloader.download_twitter(str(request.url))
        return result
    except Exception as e:
        logger.error(f"Error in Twitter download endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/reddit", response_model=VideoDownloadResponse)
async def download_reddit(request: VideoDownloadRequest):
    """Download a video from Reddit"""
    try:
        result = await downloader.download_reddit(str(request.url))
        return result
    except Exception as e:
        logger.error(f"Error in Reddit download endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/pinterest", response_model=VideoDownloadResponse)
async def download_pinterest(request: VideoDownloadRequest):
    """Download a video from Pinterest"""
    try:
        result = await downloader.download_pinterest(str(request.url))
        return result
    except Exception as e:
        logger.error(f"Error in Pinterest download endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/downloads/{download_id}")
async def get_download(download_id: str):
    """Get a downloaded file by ID"""
    try:
        if download_id not in download_files:
            raise HTTPException(status_code=404, detail="Download not found")
        
        file_path = download_files[download_id]
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="File not found")
        
        return FileResponse(
            path=file_path,
            filename=os.path.basename(file_path),
            media_type="application/octet-stream"
        )
    except Exception as e:
        logger.error(f"Error in get_download endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
