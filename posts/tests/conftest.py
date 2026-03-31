import pytest
from fastapi.testclient import TestClient


@pytest.fixture(autouse=True)
def posts_dir(tmp_path):
    import routers.PostRouter as pr

    original = pr.POSTS_DIR
    pr.POSTS_DIR = str(tmp_path)
    yield tmp_path
    pr.POSTS_DIR = original


@pytest.fixture
def client():
    from main import app

    return TestClient(app)


def _write_post(path, filename, title, date, author, body):
    text = f'''$$$
title: "{title}"
date: "{date}"
author: "{author}"
$$$

{body}'''
    (path / filename).write_text(text, encoding="utf-8")


@pytest.fixture
def sample_post(posts_dir):
    _write_post(
        posts_dir,
        "sample-post.md",
        "Sample Post",
        "2025-06-11",
        "Test Author",
        "# Hello\n\nThis is a sample post.",
    )
    return posts_dir / "sample-post.md"


@pytest.fixture
def multiple_posts(posts_dir):
    _write_post(posts_dir, "post-a.md", "Post A", "2025-01-01", "Author A", "Content A.")
    _write_post(posts_dir, "post-b.md", "Post B", "2025-06-15", "Author B", "Content B.")
    _write_post(posts_dir, "post-c.md", "Post C", "2024-12-01", "Author C", "Content C.")
