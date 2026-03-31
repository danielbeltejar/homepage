from datetime import date
from typing import Optional

from pydantic import BaseModel, Field


class PostCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    date: date
    author: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1)
    filename: Optional[str] = Field(None, max_length=200)


class PostUpdate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    date: date
    author: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1)


class PostResponse(BaseModel):
    filename: str
    title: str
    date: Optional[str] = None
    author: Optional[str] = None
    content: Optional[str] = None


class PostListResponse(BaseModel):
    posts: list[PostResponse]
