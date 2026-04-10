"""Full CRUD workflow integration test."""

import os

import bcrypt as _bcrypt
import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("ADMIN_USERNAME", "testadmin")
os.environ.setdefault(
    "ADMIN_PASSWORD_HASH",
    _bcrypt.hashpw(b"testpass123", _bcrypt.gensalt()).decode(),
)
os.environ.setdefault("JWT_SECRET", "test-secret-key")


@pytest.fixture(autouse=True)
def setup_posts_dir(tmp_path):
    import routers.PostRouter as pr

    pr.POSTS_DIR = str(tmp_path)
    yield tmp_path


@pytest.fixture
def client():
    from main import app

    return TestClient(app)


@pytest.fixture
def auth_headers(client):
    response = client.post(
        "/auth/login",
        json={"username": "testadmin", "password": "testpass123"},
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_full_crud_workflow(client, auth_headers):
    """Test complete lifecycle: create → list → read → update → read → delete → verify."""

    # 1. Create
    create_resp = client.post(
        "/admin/posts",
        json={
            "title": "Integration Test",
            "date": "2025-06-15",
            "author": "Tester",
            "content": "Original content",
        },
        headers=auth_headers,
    )
    assert create_resp.status_code == 201
    filename = create_resp.json()["filename"]
    assert filename == "integration-test.md"

    # 2. List — should contain the new post
    list_resp = client.get("/admin/posts", headers=auth_headers)
    assert list_resp.status_code == 200
    titles = [p["title"] for p in list_resp.json()["posts"]]
    assert "Integration Test" in titles

    # 3. Read
    get_resp = client.get(f"/admin/posts/{filename}", headers=auth_headers)
    assert get_resp.status_code == 200
    assert get_resp.json()["content"] == "Original content"

    # 4. Update
    update_resp = client.put(
        f"/admin/posts/{filename}",
        json={
            "title": "Integration Test Updated",
            "date": "2025-06-16",
            "author": "Tester",
            "content": "Updated content",
        },
        headers=auth_headers,
    )
    assert update_resp.status_code == 200
    assert update_resp.json()["title"] == "Integration Test Updated"

    # 5. Read after update
    get_resp2 = client.get(f"/admin/posts/{filename}", headers=auth_headers)
    assert get_resp2.json()["content"] == "Updated content"

    # 6. Delete
    del_resp = client.delete(f"/admin/posts/{filename}", headers=auth_headers)
    assert del_resp.status_code == 204

    # 7. Verify deleted
    get_resp3 = client.get(f"/admin/posts/{filename}", headers=auth_headers)
    assert get_resp3.status_code == 404
