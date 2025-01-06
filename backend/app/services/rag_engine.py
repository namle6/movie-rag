# app/services/rag_engine.py
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from app.core.config import settings
from app.services.tmdb import TMDBClient
from typing import List, Tuple
import asyncio

class MovieRAG:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)
        self.llm = ChatOpenAI(
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY
        )
        self.tmdb_client = TMDBClient()
        self.vector_store = None

    async def initialize_vector_store(self, movies: List[dict]):
        # Create embeddings for movie data
        texts = [
            f"Title: {movie['title']}\nOverview: {movie['overview']}\n" +
            f"Genres: {', '.join(movie['genres'])}\n" +
            f"Release Date: {movie['release_date']}\n" +
            f"Rating: {movie['vote_average']}"
            for movie in movies
        ]
        metadatas = [{"movie_id": movie["id"]} for movie in movies]
        
        # Create vector store
        self.vector_store = Chroma.from_texts(
            texts=texts,
            embedding=self.embeddings,
            metadatas=metadatas
        )

    async def get_movie_recommendations(self, query: str) -> Tuple[str, List[dict]]:
        # Search for relevant movies
        search_results = await self.tmdb_client.search_movies(query)
        
        # Initialize vector store if needed
        if not self.vector_store:
            await self.initialize_vector_store([
                movie.dict() for movie in search_results
            ])

        # Create prompt template
        prompt_template = """You are a knowledgeable movie expert. Based on the following context and user query, 
        provide movie recommendations and explanations. Be specific about why each movie matches the query.
        
        Context: {context}
        
        User Query: {question}
        
        Provide a detailed response that explains why these movies are relevant to the query. 
        Focus on specific aspects like plot elements, themes, or style that match the user's interests.
        """

        PROMPT = PromptTemplate(
            template=prompt_template,
            input_variables=["context", "question"]
        )

        # Create QA chain
        qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type="stuff",
            retriever=self.vector_store.as_retriever(),
            chain_type_kwargs={"prompt": PROMPT},
            return_source_documents=True
        )

        # Get response
        response = await asyncio.to_thread(
            qa_chain,
            {"query": query}
        )

        # Extract recommended movie IDs from source documents
        movie_ids = [
            doc.metadata["movie_id"] 
            for doc in response["source_documents"]
        ]

        # Get full movie details
        recommended_movies = []
        for movie_id in movie_ids:
            movie = await self.tmdb_client.get_movie_details(movie_id)
            if movie:
                recommended_movies.append(movie)

        return response["result"], recommended_movies

# app/api/movie_router.py
from fastapi import APIRouter, HTTPException
from app.services.rag_engine import MovieRAG
from app.models.movie import MovieResponse
from typing import Dict

router = APIRouter()
rag_engine = MovieRAG()

@router.post("/search", response_model=MovieResponse)
async def search_movies(query: Dict[str, str]):
    try:
        answer, movies = await rag_engine.get_movie_recommendations(query["query"])
        
        # Extract citations from the answer (you might want to implement a more sophisticated citation system)
        citations = [movie.title for movie in movies]
        
        return MovieResponse(
            answer=answer,
            movies=movies,
            citations=citations
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))