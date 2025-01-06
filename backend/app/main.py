# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.movie_router import router as movie_router

app = FastAPI(title="Movie RAG API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(movie_router, prefix="/api", tags=["movies"])

@app.get("/")
async def root():
    return {"message": "Movie RAG API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}