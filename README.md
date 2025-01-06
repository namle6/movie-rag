# Movie RAG - Intelligent Movie Recommendation Engine

Movie RAG is an AI-powered movie recommendation system that combines modern UI with intelligent search capabilities. It uses Retrieval Augmented Generation (RAG) to provide context-aware movie suggestions and detailed explanations.

![Movie RAG Screenshot](screenshot.png)

## Features

- 🎬 Natural language movie search
- 🤖 AI-powered recommendations using RAG
- 🎯 Detailed explanations for each suggestion
- 📱 Responsive, modern UI using shadcn/ui
- 🔄 Real-time search results
- 🎨 Beautiful movie cards with posters and details

## Tech Stack

### Frontend
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Query

### Backend
- FastAPI
- LangChain
- OpenAI API
- TMDB API
- Vector embeddings for semantic search

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- OpenAI API key
- TMDB API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/movie-rag.git
cd movie-rag
```

2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Update environment variables
# Add your API URL to .env.local
```

3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Update environment variables
# Add your OpenAI and TMDB API keys to .env
```

### Running the Application

1. Start the frontend
```bash
cd frontend
npm run dev
```

2. Start the backend
```bash
cd backend
uvicorn app.main:app --reload
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Project Structure

### Frontend Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── movie-components.tsx
│   └── types/
│       └── index.ts
```

### Backend Structure
```
backend/
├── app/
│   ├── api/
│   │   └── movie_router.py
│   ├── core/
│   │   └── config.py
│   ├── models/
│   │   └── movie.py
│   └── services/
│       ├── rag_engine.py
│       └── tmdb.py
```

## Future Improvements

- [ ] Implement streaming responses
- [ ] Add user preferences and history
- [ ] Enhanced filtering options
- [ ] Advanced sentiment analysis
- [ ] Caching and performance optimizations
- [ ] Improved error handling
- [ ] User authentication
- [ ] Saved searches and favorites

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [TMDB](https://www.themoviedb.org/) for the movie data
- [OpenAI](https://openai.com/) for the GPT API
- [LangChain](https://langchain.org/) for RAG implementation

