#!/bin/bash
set -euo pipefail

COMPOSE_CMD="podman-compose"
if ! command -v podman-compose &> /dev/null; then
    COMPOSE_CMD="podman compose"
fi

VOLUME_NAME="homepage-tailwind_posts-data"
SOURCE_DIR="posts/posts"

echo "Seeding posts into shared volume..."

# Create a temporary container to copy files
$COMPOSE_CMD up -d admin-backend
sleep 2

# Copy each markdown file
for file in "$SOURCE_DIR"/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  Copying $filename..."
        podman cp "$file" "$(podman ps -q -f name=admin-backend):/app/posts/$filename"
    fi
done

echo "Done! Seeded $(ls -1 "$SOURCE_DIR"/*.md 2>/dev/null | wc -l | tr -d ' ') posts."
