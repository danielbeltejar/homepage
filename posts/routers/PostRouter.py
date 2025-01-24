import glob
import logging
import os
import yaml
from fastapi import APIRouter

POSTS_DIR = "posts"

post_router = APIRouter()
logger = logging.getLogger()


def get_post(file_name: str):
    with open(os.path.join(POSTS_DIR, file_name), 'r', encoding='utf-8') as f:
        content = f.read()
        return content


def get_posts():
    posts = []

    for file in glob.glob(os.path.join(POSTS_DIR, "**/*.md")):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract YAML front matter (optional)
        front_matter = {}
        if content.startswith('---'):
            end = content.find('\n---')
            front_matter_content = content[3:end].strip()
            front_matter = yaml.safe_load(front_matter_content)

        posts.append({
            "filename": os.path.basename(file),
            "content": content,
            **front_matter
        })

    return posts


def get_front_matter(file_name: str):
    with open(os.path.join(POSTS_DIR, file_name), 'r', encoding='utf-8') as f:
        content = f.read()
        if content.startswith('$$$'):
            end = content.find('\n$$$')
            front_matter_content = content[3:end].strip()
            return yaml.safe_load(front_matter_content)
    return {}


@post_router.get("/posts")
async def get_all_posts():
    return {"posts": get_posts()}


@post_router.get("/posts/{filename}")
def get_single_post(filename: str):
    content = get_post(filename)
    if not content:
        return {"message": f"Post {filename} not found"}, 404
    return {
        "filename": filename,
        "content": content.split("$$$")[2],
        **(get_front_matter(filename) or {})
    }
