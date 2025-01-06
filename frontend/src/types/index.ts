// src/types/index.ts
export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genres: string[];
  }
  
  export interface MovieSearchResponse {
    answer: string;
    movies: Movie[];
    citations: string[];
  }