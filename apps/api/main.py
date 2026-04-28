from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from apps.api.routes import organizations, users
from packages.core.config import settings
from packages.core.db import get_session, setup_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    # STARTUP — runs once when the app starts
    # Creates the engine (connection pool) and session_factory
    engine, session_factory = setup_database(settings.DATABASE_URL)

    # Store them on app.state so any route can access them
    app.state.engine = engine
    app.state.session_factory = session_factory

    yield  # app is running here, handling requests

    # SHUTDOWN — runs once when the app stops
    # Cleanly closes all database connections
    await engine.dispose()


app = FastAPI(lifespan=lifespan)

app.include_router(organizations.router)
app.include_router(users.router)


@app.get("/")
def home():
    return {"message": "QA Buddy is running!"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/db-check")
async def db_check(session: AsyncSession = Depends(get_session)):
    result = await session.execute(text("SELECT 1 AS value"))
    row = result.first()
    return {"db_says": row.value}
