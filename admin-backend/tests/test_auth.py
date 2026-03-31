import os

import bcrypt as _bcrypt
from fastapi.testclient import TestClient

os.environ["ADMIN_USERNAME"] = "testadmin"
os.environ["ADMIN_PASSWORD_HASH"] = _bcrypt.hashpw(b"testpass123", _bcrypt.gensalt()).decode()
os.environ["JWT_SECRET"] = "test-secret-key"

from main import app

client = TestClient(app)


def test_login_success():
    response = client.post(
        "/auth/login",
        json={"username": "testadmin", "password": "testpass123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_username():
    response = client.post(
        "/auth/login",
        json={"username": "wronguser", "password": "testpass123"},
    )
    assert response.status_code == 401


def test_login_wrong_password():
    response = client.post(
        "/auth/login",
        json={"username": "testadmin", "password": "wrongpass"},
    )
    assert response.status_code == 401


def test_get_me_with_valid_token():
    login_response = client.post(
        "/auth/login",
        json={"username": "testadmin", "password": "testpass123"},
    )
    token = login_response.json()["access_token"]

    response = client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert response.status_code == 200
    assert response.json()["username"] == "testadmin"


def test_get_me_without_token():
    response = client.get("/auth/me")
    assert response.status_code == 403


def test_get_me_with_invalid_token():
    response = client.get(
        "/auth/me",
        headers={"Authorization": "Bearer invalid-token"},
    )
    assert response.status_code == 401
