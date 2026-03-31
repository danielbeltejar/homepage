def test_healthz_returns_200(client):
    response = client.get("/healthz")
    assert response.status_code == 200
