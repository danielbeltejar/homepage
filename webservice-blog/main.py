from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routers.HealthRouter import health_router
from src.routers.LatestBlogEntryRouter import latest_blog_entry

app = FastAPI()
app.include_router(health_router)
app.include_router(latest_blog_entry)

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development
    allow_methods=["GET"],
    allow_headers=["*"],
)
