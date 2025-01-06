# app/core/config.py
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    TMDB_API_KEY: str
    ENVIRONMENT: str = "development"
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()