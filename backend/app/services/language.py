from typing import Dict, Any, Optional
import json
from pathlib import Path
import os

AVAILABLE_LANGUAGES = ["en", "ar"]

TRANSLATIONS = {
    "en": {
        "common": {
            "download": "Download",
            "paste": "Paste URL",
            "loading": "Loading...",
            "error": "Error",
            "success": "Success",
            "invalidUrl": "Invalid URL",
            "downloadFailed": "Download failed",
            "tryAgain": "Please try again",
            "selectFormat": "Select format",
            "downloadNow": "Download Now",
            "poweredBy": "Powered by Bat Systems"
        },
        "tools": {
            "youtube": {
                "title": "YouTube Downloader",
                "description": "Download videos from YouTube in MP4 or MP3 format",
                "mp4": "Video (MP4)",
                "mp3": "Audio (MP3)"
            },
            "facebook": {
                "title": "Facebook Downloader",
                "description": "Download videos from Facebook"
            },
            "tiktok": {
                "title": "TikTok Downloader",
                "description": "Download TikTok videos without watermark"
            },
            "instagram": {
                "title": "Instagram Downloader",
                "description": "Download videos from Instagram"
            },
            "twitter": {
                "title": "Twitter Downloader",
                "description": "Download videos from Twitter"
            },
            "reddit": {
                "title": "Reddit Downloader",
                "description": "Download videos from Reddit"
            },
            "pinterest": {
                "title": "Pinterest Downloader",
                "description": "Download videos from Pinterest"
            }
        },
        "pages": {
            "home": {
                "title": "Online Tools Hub - Free Online Utilities",
                "description": "A collection of free online tools for downloading videos from popular social media platforms",
                "welcome": "Welcome to Online Tools Hub",
                "subtitle": "Free online tools for downloading videos from popular social media platforms"
            },
            "privacy": {
                "title": "Privacy Policy",
                "description": "Privacy Policy for Online Tools Hub"
            },
            "terms": {
                "title": "Terms of Service",
                "description": "Terms of Service for Online Tools Hub"
            },
            "contact": {
                "title": "Contact Us",
                "description": "Contact Online Tools Hub"
            }
        }
    },
    "ar": {
        "common": {
            "download": "تحميل",
            "paste": "الصق الرابط",
            "loading": "جاري التحميل...",
            "error": "خطأ",
            "success": "نجاح",
            "invalidUrl": "رابط غير صالح",
            "downloadFailed": "فشل التحميل",
            "tryAgain": "يرجى المحاولة مرة أخرى",
            "selectFormat": "اختر الصيغة",
            "downloadNow": "تحميل الآن",
            "poweredBy": "مدعوم من Bat Systems"
        },
        "tools": {
            "youtube": {
                "title": "تحميل فيديوهات يوتيوب",
                "description": "تحميل فيديوهات من يوتيوب بصيغة MP4 أو MP3",
                "mp4": "فيديو (MP4)",
                "mp3": "صوت (MP3)"
            },
            "facebook": {
                "title": "تحميل فيديوهات فيسبوك",
                "description": "تحميل فيديوهات من فيسبوك"
            },
            "tiktok": {
                "title": "تحميل فيديوهات تيك توك",
                "description": "تحميل فيديوهات تيك توك بدون علامة مائية"
            },
            "instagram": {
                "title": "تحميل فيديوهات انستغرام",
                "description": "تحميل فيديوهات من انستغرام"
            },
            "twitter": {
                "title": "تحميل فيديوهات تويتر",
                "description": "تحميل فيديوهات من تويتر"
            },
            "reddit": {
                "title": "تحميل فيديوهات ريديت",
                "description": "تحميل فيديوهات من ريديت"
            },
            "pinterest": {
                "title": "تحميل فيديوهات بينتريست",
                "description": "تحميل فيديوهات من بينتريست"
            }
        },
        "pages": {
            "home": {
                "title": "مركز الأدوات عبر الإنترنت - أدوات مجانية عبر الإنترنت",
                "description": "مجموعة من الأدوات المجانية عبر الإنترنت لتحميل الفيديوهات من منصات التواصل الاجتماعي الشهيرة",
                "welcome": "مرحبًا بك في مركز الأدوات عبر الإنترنت",
                "subtitle": "أدوات مجانية عبر الإنترنت لتحميل الفيديوهات من منصات التواصل الاجتماعي الشهيرة"
            },
            "privacy": {
                "title": "سياسة الخصوصية",
                "description": "سياسة الخصوصية لمركز الأدوات عبر الإنترنت"
            },
            "terms": {
                "title": "شروط الخدمة",
                "description": "شروط الخدمة لمركز الأدوات عبر الإنترنت"
            },
            "contact": {
                "title": "اتصل بنا",
                "description": "اتصل بمركز الأدوات عبر الإنترنت"
            }
        }
    }
}


class LanguageService:
    def __init__(self):
        self.translations = TRANSLATIONS
        self.available_languages = AVAILABLE_LANGUAGES
    
    def get_translations(self, lang: str = "en") -> Dict[str, Any]:
        """Get translations for a specific language"""
        if lang not in self.available_languages:
            lang = "en"  # Default to English if language not supported
        
        return {
            "status": "success",
            "language": lang,
            "translations": self.translations.get(lang, self.translations["en"])
        }
    
    def detect_language(self, accept_language: Optional[str] = None) -> str:
        """Detect language from Accept-Language header"""
        if not accept_language:
            return "en"
        
        languages = accept_language.split(",")
        for lang in languages:
            code = lang.strip().split(";")[0].split("-")[0].lower()
            if code in self.available_languages:
                return code
        
        return "en"  # Default to English
