import yt_dlp
import os
import tempfile
import aiofiles
import asyncio
import uuid
from typing import Dict, Any, Optional, List, Tuple
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

TEMP_DIR = Path(tempfile.gettempdir()) / "online_tools_hub_downloads"
TEMP_DIR.mkdir(exist_ok=True)

class VideoDownloader:
    def __init__(self):
        self.ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'format': 'best',
            'outtmpl': str(TEMP_DIR / '%(title)s-%(id)s.%(ext)s'),
            'noplaylist': True,
            'ignoreerrors': True,
            'no_check_certificate': True,
            'skip_download': False,
            'cookiesfrombrowser': ('chrome',),  # Try to use cookies from Chrome browser
        }
    
    async def download_youtube(self, url: str, format: str = "mp4") -> Dict[str, Any]:
        """Download a video from YouTube"""
        try:
            if format == "mp3":
                self.ydl_opts.update({
                    'format': 'bestaudio/best',
                    'postprocessors': [{
                        'key': 'FFmpegExtractAudio',
                        'preferredcodec': 'mp3',
                        'preferredquality': '192',
                    }],
                })
            else:
                self.ydl_opts.update({
                    'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
                })
            
            with yt_dlp.YoutubeDL(self.ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                
                if not info:
                    return {
                        "status": "error",
                        "message": "Could not extract video information"
                    }
                
                filename = ydl.prepare_filename(info)
                download_path = await self._download_video(ydl, url)
                
                if not download_path:
                    return {
                        "status": "error",
                        "message": "Failed to download video"
                    }
                
                unique_id = str(uuid.uuid4())
                title = info.get('title', 'video')
                
                return {
                    "status": "success",
                    "download_url": f"/downloads/{unique_id}",
                    "title": title,
                    "formats": self._extract_formats(info)
                }
                
        except Exception as e:
            logger.error(f"Error downloading YouTube video: {str(e)}")
            return {
                "status": "error",
                "message": f"Error downloading video: {str(e)}"
            }
    
    async def download_facebook(self, url: str) -> Dict[str, Any]:
        """Download a video from Facebook"""
        try:
            self.ydl_opts.update({
                'format': 'best',
            })
            
            return await self._generic_download(url)
                
        except Exception as e:
            logger.error(f"Error downloading Facebook video: {str(e)}")
            return {
                "status": "error",
                "message": f"Error downloading video: {str(e)}"
            }
    
    async def download_tiktok(self, url: str) -> Dict[str, Any]:
        """Download a video from TikTok without watermark"""
        try:
            self.ydl_opts.update({
                'format': 'best[format_id!*=watermark]',
            })
            
            return await self._generic_download(url)
                
        except Exception as e:
            logger.error(f"Error downloading TikTok video: {str(e)}")
            return {
                "status": "error",
                "message": f"Error downloading video: {str(e)}"
            }
    
    async def download_instagram(self, url: str) -> Dict[str, Any]:
        """Download a video from Instagram"""
        try:
            self.ydl_opts.update({
                'format': 'best',
            })
            
            return await self._generic_download(url)
                
        except Exception as e:
            logger.error(f"Error downloading Instagram video: {str(e)}")
            return {
                "status": "error",
                "message": f"Error downloading video: {str(e)}"
            }
    
    async def download_twitter(self, url: str) -> Dict[str, Any]:
        """Download a video from Twitter"""
        try:
            self.ydl_opts.update({
                'format': 'best',
            })
            
            return await self._generic_download(url)
                
        except Exception as e:
            logger.error(f"Error downloading Twitter video: {str(e)}")
            return {
                "status": "error",
                "message": f"Error downloading video: {str(e)}"
            }
    
    async def download_reddit(self, url: str) -> Dict[str, Any]:
        """Download a video from Reddit"""
        try:
            self.ydl_opts.update({
                'format': 'best',
            })
            
            return await self._generic_download(url)
                
        except Exception as e:
            logger.error(f"Error downloading Reddit video: {str(e)}")
            return {
                "status": "error",
                "message": f"Error downloading video: {str(e)}"
            }
    
    async def download_pinterest(self, url: str) -> Dict[str, Any]:
        """Download a video from Pinterest"""
        try:
            self.ydl_opts.update({
                'format': 'best',
            })
            
            return await self._generic_download(url)
                
        except Exception as e:
            logger.error(f"Error downloading Pinterest video: {str(e)}")
            return {
                "status": "error",
                "message": f"Error downloading video: {str(e)}"
            }
    
    async def _generic_download(self, url: str) -> Dict[str, Any]:
        """Generic download function for most platforms"""
        try:
            with yt_dlp.YoutubeDL(self.ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                
                if not info:
                    return {
                        "status": "error",
                        "message": "Could not extract video information"
                    }
                
                download_path = await self._download_video(ydl, url)
                
                if not download_path:
                    return {
                        "status": "error",
                        "message": "Failed to download video"
                    }
                
                unique_id = str(uuid.uuid4())
                title = info.get('title', 'video')
                
                return {
                    "status": "success",
                    "download_url": f"/downloads/{unique_id}",
                    "title": title,
                    "formats": self._extract_formats(info)
                }
                
        except Exception as e:
            logger.error(f"Error downloading video: {str(e)}")
            return {
                "status": "error",
                "message": f"Error downloading video: {str(e)}"
            }
    
    async def _download_video(self, ydl, url: str) -> Optional[str]:
        """Download a video using yt-dlp in a separate thread"""
        try:
            loop = asyncio.get_event_loop()
            info = await loop.run_in_executor(None, lambda: ydl.extract_info(url, download=True))
            
            if not info:
                return None
            
            filename = ydl.prepare_filename(info)
            return filename
        except Exception as e:
            logger.error(f"Error in _download_video: {str(e)}")
            return None
    
    def _extract_formats(self, info: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Extract available formats from video info"""
        formats = []
        
        if 'formats' in info:
            for fmt in info['formats']:
                format_info = {
                    'format_id': fmt.get('format_id'),
                    'ext': fmt.get('ext'),
                    'resolution': fmt.get('resolution', 'unknown'),
                    'filesize': fmt.get('filesize'),
                }
                formats.append(format_info)
        
        return formats
