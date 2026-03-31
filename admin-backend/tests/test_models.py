from datetime import date

import pytest
from pydantic import ValidationError

from models.auth import LoginRequest, TokenResponse, UserResponse
from models.post import PostCreate, PostListResponse, PostResponse, PostUpdate


# --- Auth models ---


def test_login_request_valid():
    req = LoginRequest(username="admin", password="secret")
    assert req.username == "admin"
    assert req.password == "secret"


def test_token_response_defaults():
    resp = TokenResponse(access_token="abc123")
    assert resp.access_token == "abc123"
    assert resp.token_type == "bearer"


def test_user_response():
    resp = UserResponse(username="admin")
    assert resp.username == "admin"


# --- Post models ---


def test_post_create_valid():
    post = PostCreate(
        title="Test", date=date(2025, 1, 1), author="Author", content="Hello"
    )
    assert post.title == "Test"
    assert post.filename is None


def test_post_create_with_filename():
    post = PostCreate(
        title="Test",
        date=date(2025, 1, 1),
        author="Author",
        content="Hello",
        filename="custom.md",
    )
    assert post.filename == "custom.md"


def test_post_create_empty_title_rejected():
    with pytest.raises(ValidationError):
        PostCreate(title="", date=date(2025, 1, 1), author="Author", content="Hello")


def test_post_create_empty_content_rejected():
    with pytest.raises(ValidationError):
        PostCreate(title="Test", date=date(2025, 1, 1), author="Author", content="")


def test_post_create_title_max_length():
    with pytest.raises(ValidationError):
        PostCreate(
            title="x" * 201,
            date=date(2025, 1, 1),
            author="Author",
            content="Hello",
        )


def test_post_update_valid():
    post = PostUpdate(
        title="Updated", date=date(2025, 6, 15), author="Author", content="Updated body"
    )
    assert post.title == "Updated"


def test_post_response_optional_fields():
    resp = PostResponse(filename="test.md", title="Test")
    assert resp.date is None
    assert resp.author is None
    assert resp.content is None


def test_post_list_response():
    resp = PostListResponse(
        posts=[
            PostResponse(filename="a.md", title="A"),
            PostResponse(filename="b.md", title="B"),
        ]
    )
    assert len(resp.posts) == 2
