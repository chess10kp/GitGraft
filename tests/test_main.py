from typing_extensions import assert_type
from fastapi.testclient import TestClient
from src.app.main import app

client = TestClient(app)


def test_empty_data():
    with TestClient(app) as client:
        result = client.get("/expenses")
        assert result.status_code == 200


def test_insert_one():
    with TestClient(app) as client:
        result = client.post(
            "/expenses/new",
            json={"amount": 1, "id": 20, "description": "this is a description"},
        )
        assert result.status_code == 200
        result = client.get("/expenses/")
        assert result.json()[0]["amount"] == 1


def test_delete_one():
    with TestClient(app) as client:
        client.post(
            "/expenses/new",
            json={"amount": 1, "id": 20, "description": "this is a description"},
        )
        result = client.delete("/expenses/delete/?id=1")
        assert result.status_code == 200
        result = client.get("/expenses")
        assert result.json() == []
