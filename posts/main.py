from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.HealthRouter import health_router
from routers.PostRouter import post_router

app = FastAPI()
app.include_router(health_router)
app.include_router(post_router)

# noinspection PyTypeChecker
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development
    allow_methods=["GET"],
    allow_headers=["*"],
)