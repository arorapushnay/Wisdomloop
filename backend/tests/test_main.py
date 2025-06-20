from fastapi.testclient import TestClient
from backend.main import app

def test_root():
    client = TestClient(app)
    response = client.get("/")
    assert response.status_code == 200
    assert "Wisdomloop backend" in response.json()["message"]
