'use client'

import { useState } from 'react'
import axios from 'axios'
import { SearchBar, MovieList } from '@/components/movie-components'
import type { MovieSearchResponse } from '@/types'

export default function Home() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<MovieSearchResponse | null>(null)

  const handleSearch = async (query: string) => {
    try {
      setIsSearching(true)
      const { data } = await axios.post('http://localhost:8000/api/search', {
        query
      })
      setSearchResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Movie RAG</h1>
          <p className="text-muted-foreground">
            Ask anything about movies and get intelligent recommendations
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        <MovieList data={searchResults} isLoading={isSearching} />
      </div>
    </main>
  )
}