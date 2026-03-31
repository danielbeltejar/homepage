from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.AuthRouter import auth_router
from routers.HealthRouter import health_router
from routers.PostRouter import post_router

app = FastAPI(title="Admin API", docs_url="/docs", redoc_url=None)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(post_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
