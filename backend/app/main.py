from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import psycopg
import os
import tempfile
from pathlib import Path

from .routers import downloads, language

app = FastAPI(
    title="Online Tools Hub API",
    description="API for downloading videos from popular social media platforms",
    version="1.0.0",
)

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

TEMP_DIR = Path(tempfile.gettempdir()) / "online_tools_hub_downloads"
TEMP_DIR.mkdir(exist_ok=True)

app.include_router(downloads.router)
app.include_router(language.router)

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {
        "message": "Welcome to Online Tools Hub API",
        "version": "1.0.0",
        "endpoints": {
            "youtube": "/api/download/youtube",
            "facebook": "/api/download/facebook",
            "tiktok": "/api/download/tiktok",
            "instagram": "/api/download/instagram",
            "twitter": "/api/download/twitter",
            "reddit": "/api/download/reddit",
            "pinterest": "/api/download/pinterest",
            "language": "/api/language",
            "language_detect": "/api/language/detect"
        }
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"status": "error", "message": str(exc)},
    )
