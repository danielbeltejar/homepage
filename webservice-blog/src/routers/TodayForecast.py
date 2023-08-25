import os
import logging
from datetime import datetime

from fastapi import APIRouter
from fastapi import status
from fastapi.responses import StreamingResponse

latest_blog_entry = APIRouter()
logger = logging.getLogger()


@latest_blog_entry.get('/blog/latest', status_code=status.HTTP_200_OK)
def latest_blog_entry_router():
