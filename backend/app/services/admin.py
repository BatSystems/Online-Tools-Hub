import os
import json
import secrets
import time
import string
import random
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Union
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pathlib import Path

from app.models.admin.auth import AdminCredentials, TokenData
from app.models.admin.contact import ContactMessage
from app.models.admin.cookies import CookieFile
from app.models.admin.url_shortener import URLShortenerRequest

SECRET_KEY = os.getenv("SECRET_KEY", secrets.token_hex(32))
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/admin/login")

DATA_DIR = Path("./data")
DATA_DIR.mkdir(exist_ok=True)

CONTACTS_FILE = DATA_DIR / "contacts.json"
COOKIES_FILE = DATA_DIR / "cookies.json"
ADMIN_FILE = DATA_DIR / "admin.json"
URL_SHORTENER_FILE = DATA_DIR / "url_shortener.json"

BASE_URL = os.getenv("BASE_URL", "https://app-ahkaxjrr.fly.dev/api/url/s/")

if not CONTACTS_FILE.exists():
    with open(CONTACTS_FILE, "w") as f:
        json.dump([], f)

if not COOKIES_FILE.exists():
    with open(COOKIES_FILE, "w") as f:
        json.dump([], f)

if not URL_SHORTENER_FILE.exists():
    with open(URL_SHORTENER_FILE, "w") as f:
        json.dump([], f)

if not ADMIN_FILE.exists():
    default_admin = {
        "username": "admin",
        "password": pwd_context.hash("admin123")  # Default password
    }
    with open(ADMIN_FILE, "w") as f:
        json.dump(default_admin, f)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_admin_user():
    with open(ADMIN_FILE, "r") as f:
        return json.load(f)


def authenticate_admin(credentials: AdminCredentials):
    admin_user = get_admin_user()
    
    if admin_user["username"] != credentials.username:
        return False
    
    if not verify_password(credentials.password, admin_user["password"]):
        return False
    
    return True


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt


async def get_current_admin(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        
        if username is None:
            raise credentials_exception
        
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    admin_user = get_admin_user()
    
    if admin_user["username"] != token_data.username:
        raise credentials_exception
    
    return admin_user


def save_contact_message(message: ContactMessage):
    messages = []
    
    if CONTACTS_FILE.exists():
        with open(CONTACTS_FILE, "r") as f:
            try:
                messages = json.load(f)
            except json.JSONDecodeError:
                messages = []
    
    message_id = int(time.time() * 1000)
    message_dict = message.dict()
    message_dict["id"] = message_id
    message_dict["created_at"] = message_dict["created_at"].isoformat()
    
    messages.append(message_dict)
    
    with open(CONTACTS_FILE, "w") as f:
        json.dump(messages, f, indent=2)
    
    return message_id


def get_contact_messages():
    if not CONTACTS_FILE.exists():
        return []
    
    with open(CONTACTS_FILE, "r") as f:
        try:
            messages = json.load(f)
            for message in messages:
                message["created_at"] = datetime.fromisoformat(message["created_at"])
            return messages
        except json.JSONDecodeError:
            return []


def mark_message_as_read(message_id: int):
    if not CONTACTS_FILE.exists():
        return False
    
    with open(CONTACTS_FILE, "r") as f:
        try:
            messages = json.load(f)
        except json.JSONDecodeError:
            return False
    
    found = False
    for message in messages:
        if message["id"] == message_id:
            message["read"] = True
            found = True
            break
    
    if found:
        with open(CONTACTS_FILE, "w") as f:
            json.dump(messages, f, indent=2)
        return True
    
    return False


def save_cookie_file(cookie: CookieFile):
    cookies = []
    
    if COOKIES_FILE.exists():
        with open(COOKIES_FILE, "r") as f:
            try:
                cookies = json.load(f)
            except json.JSONDecodeError:
                cookies = []
    
    cookie_id = int(time.time() * 1000)
    cookie_dict = cookie.dict()
    cookie_dict["id"] = cookie_id
    cookie_dict["created_at"] = datetime.now().isoformat()
    
    cookies.append(cookie_dict)
    
    with open(COOKIES_FILE, "w") as f:
        json.dump(cookies, f, indent=2)
    
    return cookie_id


def get_cookie_files():
    if not COOKIES_FILE.exists():
        return []
    
    with open(COOKIES_FILE, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []


def get_active_cookie(platform: str):
    cookies = get_cookie_files()
    
    active_cookies = [c for c in cookies if c["platform"] == platform and c["active"]]
    
    if not active_cookies:
        return None
    
    active_cookies.sort(key=lambda x: x["created_at"], reverse=True)
    
    return active_cookies[0]


def toggle_cookie_status(cookie_id: int, active: bool):
    if not COOKIES_FILE.exists():
        return False
    
    with open(COOKIES_FILE, "r") as f:
        try:
            cookies = json.load(f)
        except json.JSONDecodeError:
            return False
    
    found = False
    for cookie in cookies:
        if cookie["id"] == cookie_id:
            cookie["active"] = active
            found = True
            break
    
    if found:
        with open(COOKIES_FILE, "w") as f:
            json.dump(cookies, f, indent=2)
        return True
    
    return False


def delete_cookie(cookie_id: int):
    if not COOKIES_FILE.exists():
        return False
    
    with open(COOKIES_FILE, "r") as f:
        try:
            cookies = json.load(f)
        except json.JSONDecodeError:
            return False
    
    initial_length = len(cookies)
    cookies = [c for c in cookies if c["id"] != cookie_id]
    
    if len(cookies) < initial_length:
        with open(COOKIES_FILE, "w") as f:
            json.dump(cookies, f, indent=2)
        return True
    
    return False


def update_admin_password(new_password: str):
    admin_user = get_admin_user()
    admin_user["password"] = get_password_hash(new_password)
    
    with open(ADMIN_FILE, "w") as f:
        json.dump(admin_user, f)
    
    return True


def generate_random_alias(length=6):
    """Generate a random alias for shortened URLs."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


def save_url(url_data: URLShortenerRequest):
    """Save a URL to the database and return its ID."""
    urls = []
    
    if URL_SHORTENER_FILE.exists():
        with open(URL_SHORTENER_FILE, "r") as f:
            try:
                urls = json.load(f)
            except json.JSONDecodeError:
                urls = []
    
    url_id = int(time.time() * 1000)
    alias = url_data.custom_alias if url_data.custom_alias else generate_random_alias()
    
    existing_aliases = [url["alias"] for url in urls]
    while alias in existing_aliases:
        if url_data.custom_alias:
            alias = f"{url_data.custom_alias}-{random.randint(1, 999)}"
        else:
            alias = generate_random_alias()
    
    url_dict = {
        "id": url_id,
        "original_url": str(url_data.original_url),
        "alias": alias,
        "short_url": f"{BASE_URL}{alias}",
        "created_at": datetime.now().isoformat(),
        "clicks": 0
    }
    
    urls.append(url_dict)
    
    with open(URL_SHORTENER_FILE, "w") as f:
        json.dump(urls, f, indent=2)
    
    return url_id


def get_urls():
    """Get all URLs from the database."""
    if not URL_SHORTENER_FILE.exists():
        return []
    
    with open(URL_SHORTENER_FILE, "r") as f:
        try:
            urls = json.load(f)
            for url in urls:
                url["created_at"] = datetime.fromisoformat(url["created_at"])
            return urls
        except json.JSONDecodeError:
            return []


def get_url_by_alias(alias: str):
    """Get a URL by its alias."""
    urls = get_urls()
    
    for url in urls:
        if url["alias"] == alias:
            return url
    
    return None


def delete_url(url_id: int):
    """Delete a URL from the database."""
    if not URL_SHORTENER_FILE.exists():
        return False
    
    with open(URL_SHORTENER_FILE, "r") as f:
        try:
            urls = json.load(f)
        except json.JSONDecodeError:
            return False
    
    initial_length = len(urls)
    urls = [url for url in urls if url["id"] != url_id]
    
    if len(urls) < initial_length:
        with open(URL_SHORTENER_FILE, "w") as f:
            json.dump(urls, f, indent=2)
        return True
    
    return False


def increment_url_clicks(url_id: int):
    """Increment the click count for a URL."""
    if not URL_SHORTENER_FILE.exists():
        return False
    
    with open(URL_SHORTENER_FILE, "r") as f:
        try:
            urls = json.load(f)
        except json.JSONDecodeError:
            return False
    
    found = False
    for url in urls:
        if url["id"] == url_id:
            url["clicks"] += 1
            found = True
            break
    
    if found:
        with open(URL_SHORTENER_FILE, "w") as f:
            json.dump(urls, f, indent=2)
        return True
    
    return False
