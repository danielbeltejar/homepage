import glob
import os
import re
import unicodedata
from datetime import datetime

import yaml
from fastapi import APIRouter, Depends, HTTPException, status

from middleware.auth import get_current_user
from models.post import PostCreate, PostListResponse, PostResponse, PostUpdate

POSTS_DIR = os.environ.get("POSTS_DIR", "posts")

post_router = APIRouter(prefix="/posts", tags=["posts"])


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[-\s]+", "-", text)
    return text.strip("-")


def validate_filename(filename: str) -> str:
    name = filename.removesuffix(".md")
    if not re.match(r"^[a-z0-9][a-z0-9-]*[a-z0-9]$", name) and not re.match(
        r"^[a-z0-9]$", name
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Filename must contain only lowercase alphanumeric characters and hyphens",
        )
    if ".." in filename or "/" in filename or "\\" in filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid filename",
        )
    if not filename.endswith(".md"):
        filename = f"{filename}.md"
    return filename


def parse_front_matter(content: str) -> dict:
    front_matter = {}
    if content.startswith("$$$"):
        end = content.find("\n$$$")
        if end != -1:
            front_matter_content = content[3:end].strip()
            front_matter = yaml.safe_load(front_matter_content) or {}
    return front_matter


def build_post_content(title: str, date, author: str, content: str) -> str:
    date_str = date.isoformat() if hasattr(date, "isoformat") else str(date)
    return f"""$$$
title: "{title}"
date: "{date_str}"
author: "{author}"
$$$

{content}"""


def get_all_posts() -> list[dict]:
    posts = []
    os.makedirs(POSTS_DIR, exist_ok=True)
    for file in glob.glob(os.path.join(POSTS_DIR, "**/*.md"), recursive=True):
        with open(file, "r", encoding="utf-8") as f:
            content = f.read()

        front_matter = parse_front_matter(content)
        posts.append(
            {
                "filename": os.path.basename(file),
                "content": content,
                **front_matter,
            }
        )

    posts.sort(key=lambda p: str(p.get("date") or ""), reverse=True)
    return posts


@post_router.get("", response_model=PostListResponse)
def list_posts(_: str = Depends(get_current_user)):
    posts = get_all_posts()
    return PostListResponse(
        posts=[
            PostResponse(
                filename=p["filename"],
                title=p.get("title", ""),
                date=str(p["date"]) if p.get("date") else None,
                author=p.get("author"),
            )
            for p in posts
        ]
    )


@post_router.get("/{filename}", response_model=PostResponse)
def get_post(filename: str, _: str = Depends(get_current_user)):
    filename = validate_filename(filename)
    filepath = os.path.join(POSTS_DIR, filename)

    if not os.path.isfile(filepath):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post {filename} not found",
        )

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    front_matter = parse_front_matter(content)
    body = content.split("$$$")[2].strip() if content.count("$$$") >= 2 else content

    return PostResponse(
        filename=filename,
        title=front_matter.get("title", ""),
        date=str(front_matter["date"]) if front_matter.get("date") else None,
        author=front_matter.get("author"),
        content=body,
    )


@post_router.post("", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
def create_post(post: PostCreate, _: str = Depends(get_current_user)):
    if post.filename:
        filename = validate_filename(post.filename)
    else:
        slug = slugify(post.title)
        if not slug:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not generate filename from title",
            )
        filename = f"{slug}.md"

    filepath = os.path.join(POSTS_DIR, filename)

    if os.path.exists(filepath):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Post {filename} already exists",
        )

    os.makedirs(POSTS_DIR, exist_ok=True)
    file_content = build_post_content(post.title, post.date, post.author, post.content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(file_content)

    return PostResponse(
        filename=filename,
        title=post.title,
        date=post.date.isoformat(),
        author=post.author,
        content=post.content,
    )


@post_router.put("/{filename}", response_model=PostResponse)
def update_post(filename: str, post: PostUpdate, _: str = Depends(get_current_user)):
    filename = validate_filename(filename)
    filepath = os.path.join(POSTS_DIR, filename)

    if not os.path.isfile(filepath):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post {filename} not found",
        )

    file_content = build_post_content(post.title, post.date, post.author, post.content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(file_content)

    return PostResponse(
        filename=filename,
        title=post.title,
        date=post.date.isoformat(),
        author=post.author,
        content=post.content,
    )


@post_router.delete("/{filename}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(filename: str, _: str = Depends(get_current_user)):
    filename = validate_filename(filename)
    filepath = os.path.join(POSTS_DIR, filename)

    if not os.path.isfile(filepath):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Post {filename} not found",
        )

    os.remove(filepath)
