def test_list_posts_empty(client):
    response = client.get("/posts")
    assert response.status_code == 200
    assert response.json()["posts"] == []


def test_list_posts_returns_all(client, multiple_posts):
    response = client.get("/posts")
    assert response.status_code == 200
    posts = response.json()["posts"]
    assert len(posts) == 3


def test_list_posts_sorted_by_date_desc(client, multiple_posts):
    response = client.get("/posts")
    posts = response.json()["posts"]
    dates = [str(p.get("date") or "") for p in posts]
    assert dates == sorted(dates, reverse=True)


def test_list_posts_includes_front_matter(client, sample_post):
    response = client.get("/posts")
    posts = response.json()["posts"]
    assert len(posts) == 1
    post = posts[0]
    assert post["title"] == "Sample Post"
    assert str(post["date"]) == "2025-06-11"
    assert post["author"] == "Test Author"
    assert post["filename"] == "sample-post.md"


def test_list_posts_includes_content(client, sample_post):
    response = client.get("/posts")
    post = response.json()["posts"][0]
    assert "content" in post
    assert "# Hello" in post["content"]


def test_get_newest_post(client, multiple_posts):
    response = client.get("/posts/newest")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Post B"
    assert str(data["date"]) == "2025-06-15"
    assert "content" in data


def test_get_newest_post_empty(client):
    response = client.get("/posts/newest")
    assert response.status_code == 200


def test_get_single_post(client, sample_post):
    response = client.get("/posts/sample-post.md")
    assert response.status_code == 200
    data = response.json()
    assert data["filename"] == "sample-post.md"
    assert data["title"] == "Sample Post"
    assert "content" in data
    assert "# Hello" in data["content"]


def test_get_single_post_strips_front_matter(client, sample_post):
    response = client.get("/posts/sample-post.md")
    data = response.json()
    assert "$$$" not in data["content"]


def test_get_single_post_not_found(client):
    response = client.get("/posts/nonexistent.md")
    assert response.status_code == 404


def test_post_without_front_matter(client, posts_dir):
    (posts_dir / "plain.md").write_text("Just plain text", encoding="utf-8")
    response = client.get("/posts")
    posts = response.json()["posts"]
    assert len(posts) == 1
    assert posts[0]["filename"] == "plain.md"
