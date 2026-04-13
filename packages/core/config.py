"""
App configuration — reads values from the .env file.

Pydantic's BaseSettings validates that all required environment
variables exist and are the correct type when the app starts.
If anything is missing, the app crashes immediately with a clear error.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str

    class Config:
        env_file = ".env"


# One single instance used across the entire app
settings = Settings()
