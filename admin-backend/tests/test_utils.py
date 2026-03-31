import pytest
from fastapi import HTTPException

from routers.PostRouter import (
    build_post_content,
    parse_front_matter,
    slugify,
    validate_filename,
)


# --- slugify ---


def test_slugify_basic():
    assert slugify("Hello World") == "hello-world"


def test_slugify_special_characters():
    assert slugify("Hello, World! #2025") == "hello-world-2025"


def test_slugify_accented_characters():
    assert slugify("Café résumé") == "cafe-resume"


def test_slugify_multiple_spaces_and_hyphens():
    assert slugify("too   many---hyphens") == "too-many-hyphens"


def test_slugify_strips_leading_trailing_hyphens():
    assert slugify("--hello--") == "hello"


# --- validate_filename ---


def test_validate_filename_valid():
    assert validate_filename("my-post.md") == "my-post.md"


def test_validate_filename_adds_md_extension():
    assert validate_filename("my-post") == "my-post.md"


def test_validate_filename_single_char():
    assert validate_filename("a") == "a.md"


def test_validate_filename_rejects_uppercase():
    with pytest.raises(HTTPException) as exc_info:
        validate_filename("MyPost.md")
    assert exc_info.value.status_code == 400


def test_validate_filename_rejects_path_traversal():
    with pytest.raises(HTTPException) as exc_info:
        validate_filename("../etc/passwd.md")
    assert exc_info.value.status_code == 400


def test_validate_filename_rejects_backslash():
    with pytest.raises(HTTPException) as exc_info:
        validate_filename("foo\\bar.md")
    assert exc_info.value.status_code == 400


# --- parse_front_matter ---


def test_parse_front_matter_valid():
    content = '$$$\ntitle: "Test"\ndate: "2025-01-01"\n$$$\n\nBody'
    fm = parse_front_matter(content)
    assert fm["title"] == "Test"
    assert fm["date"] == "2025-01-01"


def test_parse_front_matter_empty():
    assert parse_front_matter("No front matter here") == {}


def test_parse_front_matter_incomplete_delimiters():
    content = "$$$\ntitle: Test"
    assert parse_front_matter(content) == {}


# --- build_post_content ---


def test_build_post_content_format():
    from datetime import date

    result = build_post_content("My Title", date(2025, 3, 15), "Author", "Body text")
    assert '$$$\ntitle: "My Title"' in result
    assert 'date: "2025-03-15"' in result
    assert 'author: "Author"' in result
    assert result.endswith("Body text")


def test_build_post_content_string_date():
    result = build_post_content("Title", "2025-01-01", "Author", "Content")
    assert 'date: "2025-01-01"' in result
