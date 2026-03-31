import os

import bcrypt as _bcrypt
import pytest
from fastapi.testclient import TestClient

os.environ["ADMIN_USERNAME"] = "testadmin"
os.environ["ADMIN_PASSWORD_HASH"] = _bcrypt.hashpw(b"testpass123", _bcrypt.gensalt()).decode()
os.environ["JWT_SECRET"] = "test-secret-key"


@pytest.fixture(autouse=True)
def setup_posts_dir(tmp_path):
    os.environ["POSTS_DIR"] = str(tmp_path)
    import routers.PostRouter as pr

    pr.POSTS_DIR = str(tmp_path)
    yield tmp_path


@pytest.fixture
def auth_headers():
    from main import app

    client = TestClient(app)
    response = client.post(
        "/auth/login",
        json={"username": "testadmin", "password": "testpass123"},
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def client():
    from main import app

    return TestClient(app)


def test_list_posts_empty(client, auth_headers):
    response = client.get("/posts", headers=auth_headers)
    assert response.status_code == 200
    assert response.json()["posts"] == []


def test_create_post(client, auth_headers):
    response = client.post(
        "/posts",
        json={
            "title": "Test Post",
            "date": "2025-01-15",
            "author": "Test Author",
            "content": "# Hello\n\nThis is a test post.",
        },
        headers=auth_headers,
    )
    assert response.status_code == 201
    data = response.json()
    assert data["filename"] == "test-post.md"
    assert data["title"] == "Test Post"
    assert data["author"] == "Test Author"


def test_create_post_with_custom_filename(client, auth_headers):
    response = client.post(
        "/posts",
        json={
            "title": "My Post",
            "date": "2025-01-15",
            "author": "Author",
            "content": "Content here",
            "filename": "custom-name.md",
        },
        headers=auth_headers,
    )
    assert response.status_code == 201
    assert response.json()["filename"] == "custom-name.md"


def test_create_post_duplicate(client, auth_headers):
    post_data = {
        "title": "Duplicate",
        "date": "2025-01-15",
        "author": "Author",
        "content": "Content",
    }
    client.post("/posts", json=post_data, headers=auth_headers)
    response = client.post("/posts", json=post_data, headers=auth_headers)
    assert response.status_code == 409


def test_get_post(client, auth_headers, setup_posts_dir):
    client.post(
        "/posts",
        json={
            "title": "Read Me",
            "date": "2025-02-20",
            "author": "Author",
            "content": "Some content here",
        },
        headers=auth_headers,
    )

    response = client.get("/posts/read-me.md", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Read Me"
    assert data["content"] == "Some content here"


def test_get_post_not_found(client, auth_headers):
    response = client.get("/posts/nonexistent.md", headers=auth_headers)
    assert response.status_code == 404


def test_update_post(client, auth_headers):
    client.post(
        "/posts",
        json={
            "title": "Original",
            "date": "2025-01-01",
            "author": "Author",
            "content": "Original content",
        },
        headers=auth_headers,
    )

    response = client.put(
        "/posts/original.md",
        json={
            "title": "Updated Title",
            "date": "2025-06-15",
            "author": "New Author",
            "content": "Updated content",
        },
        headers=auth_headers,
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Title"
    assert response.json()["content"] == "Updated content"


def test_delete_post(client, auth_headers):
    client.post(
        "/posts",
        json={
            "title": "To Delete",
            "date": "2025-01-01",
            "author": "Author",
            "content": "Content",
        },
        headers=auth_headers,
    )

    response = client.delete("/posts/to-delete.md", headers=auth_headers)
    assert response.status_code == 204

    response = client.get("/posts/to-delete.md", headers=auth_headers)
    assert response.status_code == 404


def test_path_traversal_prevention(client, auth_headers):
    response = client.get("/posts/..%2F..%2Fetc%2Fpasswd", headers=auth_headers)
    assert response.status_code in (400, 404)

    response = client.get("/posts/../../etc/passwd.md", headers=auth_headers)
    assert response.status_code in (400, 404)


def test_invalid_filename_characters(client, auth_headers):
    response = client.post(
        "/posts",
        json={
            "title": "Test",
            "date": "2025-01-01",
            "author": "Author",
            "content": "Content",
            "filename": "../../etc/passwd",
        },
        headers=auth_headers,
    )
    assert response.status_code == 400


def test_unauthorized_access(client):
    response = client.get("/posts")
    assert response.status_code == 403

    response = client.post(
        "/posts",
        json={
            "title": "Test",
            "date": "2025-01-01",
            "author": "Author",
            "content": "Content",
        },
    )
    assert response.status_code == 403
