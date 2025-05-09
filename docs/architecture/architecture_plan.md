# Online Tools Hub - Architecture Plan

## 1. System Overview

The Online Tools Hub is a web platform offering utilities for downloading videos from popular social media platforms. The system consists of:

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Python FastAPI
- **Downloader Engine**: yt-dlp

## 2. Backend Architecture

### 2.1 API Endpoints

| Endpoint | Method | Description | Parameters | Response |
|----------|--------|-------------|------------|----------|
| `/api/download/youtube` | POST | Download YouTube videos | `url`, `format` (mp4/mp3) | Video file or download link |
| `/api/download/facebook` | POST | Download Facebook videos | `url` | Video file or download link |
| `/api/download/tiktok` | POST | Download TikTok videos without watermark | `url` | Video file or download link |
| `/api/download/instagram` | POST | Download Instagram videos | `url` | Video file or download link |
| `/api/download/twitter` | POST | Download Twitter videos | `url` | Video file or download link |
| `/api/download/reddit` | POST | Download Reddit videos | `url` | Video file or download link |
| `/api/download/pinterest` | POST | Download Pinterest videos | `url` | Video file or download link |
| `/api/language` | GET | Get language translations | `lang` (en/ar) | JSON with translations |

### 2.2 Backend Components

- **FastAPI Application**: Main application entry point
- **Download Service**: Handles video downloading using yt-dlp
- **Language Service**: Manages translations and language detection
- **Error Handler**: Manages error responses
- **CORS Middleware**: Handles cross-origin requests

### 2.3 Dependencies

- FastAPI
- yt-dlp
- pydantic
- uvicorn
- python-multipart
- aiofiles (for file handling)

## 3. Frontend Architecture

### 3.1 Pages

- **Home Page** (`/`): Welcome message, grid of featured tools, navigation
- **Tool Pages**:
  - YouTube Downloader (`/youtube-downloader`)
  - Facebook Downloader (`/facebook-downloader`)
  - TikTok Downloader (`/tiktok-downloader`)
  - Instagram Downloader (`/instagram-downloader`)
  - Twitter Downloader (`/twitter-downloader`)
  - Reddit Downloader (`/reddit-downloader`)
  - Pinterest Downloader (`/pinterest-downloader`)
- **Static Pages**:
  - Privacy Policy (`/privacy-policy`)
  - Terms of Service (`/terms-of-service`)
  - Contact (`/contact`)

### 3.2 Components

- **Layout Components**:
  - Header (with language switcher)
  - Footer
  - Navigation
  - Ad Placeholders
- **Tool Components**:
  - URL Input Form
  - Download Button
  - Format Selector (when applicable)
  - Progress/Loading Animation
  - Results Display
- **Common Components**:
  - Error Messages
  - Language Switcher
  - SEO Meta Components

### 3.3 State Management

- React Context for language state
- React Query for API calls
- Local state for form handling

## 4. Multi-language Support

### 4.1 Implementation Strategy

- Use i18next for translation management
- Store translations in JSON files
- Support English (default) and Arabic
- Implement RTL layout for Arabic
- Auto-detect language based on browser settings

### 4.2 Translation Structure

```json
{
  "common": {
    "download": "Download",
    "paste": "Paste URL",
    "loading": "Loading..."
  },
  "tools": {
    "youtube": {
      "title": "YouTube Downloader",
      "description": "Download videos from YouTube in MP4 or MP3 format"
    },
    // Other tools...
  }
}
```

## 5. SEO Optimization

### 5.1 Meta Tags

- Title tags for each page in both languages
- Description meta tags for each page in both languages
- Canonical URLs

### 5.2 OpenGraph and Twitter Cards

- og:title, og:description, og:image
- twitter:card, twitter:title, twitter:description, twitter:image

### 5.3 Schema.org Markup

- WebApplication schema for the platform
- SoftwareApplication schema for each tool

### 5.4 Other SEO Elements

- Sitemap.xml with entries for both languages
- Robots.txt with appropriate rules
- Fast-loading optimized assets

## 6. Monetization

### 6.1 Google AdSense Integration

- Ad placeholders in strategic locations:
  - Top banner
  - Between form and results
  - Footer section

### 6.2 Ad Implementation

- Responsive ad units
- Non-intrusive placement
- Compliance with AdSense policies

## 7. Data Flow

1. User enters video URL on a tool page
2. Frontend sends request to corresponding backend endpoint
3. Backend validates URL and processes with yt-dlp
4. Backend returns download link or file
5. Frontend displays result to user with download option

## 8. Deployment Strategy

- Backend: Deploy to a server using the built-in deployment command
- Frontend: Build and deploy to a static hosting service
- Configure CORS to allow communication between frontend and backend
