import logging

from fastapi import APIRouter, HTTPException
from fastapi import status

from src.worker.LatestBlogEntry import get_latest_wordpress_blog_entry

latest_blog_entry = APIRouter()
logger = logging.getLogger()


@latest_blog_entry.get('/latest', status_code=status.HTTP_200_OK)
def latest_blog_entry_router():
    latest_entry = get_latest_wordpress_blog_entry()
    if "error" in latest_entry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=latest_entry["error"])
    return latest_entry
