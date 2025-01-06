# app/models/movie.py
from pydantic import BaseModel
from typing import List, Optional

class Movie(BaseModel):
    id: int
    title: str
    overview: str
    poster_path: Optional[str] = None
    release_date: str
    vote_average: float
    genres: List[str]

class MovieResponse(BaseModel):
    answer: str
    movies: List[Movie]
    citations: List[str]