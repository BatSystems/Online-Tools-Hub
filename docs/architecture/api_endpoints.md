# API Endpoints for Online Tools Hub

## Video Download Endpoints

### 1. YouTube Downloader
- **Endpoint**: `/api/download/youtube`
- **Method**: POST
- **Parameters**:
  - `url` (required): YouTube video URL
  - `format` (required): Output format (mp4/mp3)
- **Response**:
  - Success: `{"status": "success", "download_url": "URL", "title": "Video Title"}`
  - Error: `{"status": "error", "message": "Error message"}`

### 2. Facebook Downloader
- **Endpoint**: `/api/download/facebook`
- **Method**: POST
- **Parameters**:
  - `url` (required): Facebook video URL
- **Response**:
  - Success: `{"status": "success", "download_url": "URL", "title": "Video Title"}`
  - Error: `{"status": "error", "message": "Error message"}`

### 3. TikTok Downloader
- **Endpoint**: `/api/download/tiktok`
- **Method**: POST
- **Parameters**:
  - `url` (required): TikTok video URL
- **Response**:
  - Success: `{"status": "success", "download_url": "URL", "title": "Video Title"}`
  - Error: `{"status": "error", "message": "Error message"}`

### 4. Instagram Downloader
- **Endpoint**: `/api/download/instagram`
- **Method**: POST
- **Parameters**:
  - `url` (required): Instagram video URL
- **Response**:
  - Success: `{"status": "success", "download_url": "URL", "title": "Video Title"}`
  - Error: `{"status": "error", "message": "Error message"}`

### 5. Twitter Downloader
- **Endpoint**: `/api/download/twitter`
- **Method**: POST
- **Parameters**:
  - `url` (required): Twitter video URL
- **Response**:
  - Success: `{"status": "success", "download_url": "URL", "title": "Video Title"}`
  - Error: `{"status": "error", "message": "Error message"}`

### 6. Reddit Downloader
- **Endpoint**: `/api/download/reddit`
- **Method**: POST
- **Parameters**:
  - `url` (required): Reddit video URL
- **Response**:
  - Success: `{"status": "success", "download_url": "URL", "title": "Video Title"}`
  - Error: `{"status": "error", "message": "Error message"}`

### 7. Pinterest Downloader
- **Endpoint**: `/api/download/pinterest`
- **Method**: POST
- **Parameters**:
  - `url` (required): Pinterest video URL
- **Response**:
  - Success: `{"status": "success", "download_url": "URL", "title": "Video Title"}`
  - Error: `{"status": "error", "message": "Error message"}`

## Language Support Endpoints

### 1. Get Translations
- **Endpoint**: `/api/language`
- **Method**: GET
- **Parameters**:
  - `lang` (required): Language code (en/ar)
- **Response**:
  - Success: `{"status": "success", "translations": {...}}`
  - Error: `{"status": "error", "message": "Error message"}`

### 2. Detect Language
- **Endpoint**: `/api/language/detect`
- **Method**: GET
- **Response**:
  - Success: `{"status": "success", "language": "en"}`
  - Error: `{"status": "error", "message": "Error message"}`
