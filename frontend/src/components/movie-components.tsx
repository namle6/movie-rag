// src/components/movie-components.tsx
'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import type { MovieSearchResponse } from '@/types'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Ask about movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  )
}

export function MovieList({ 
  data, 
  isLoading 
}: { 
  data: MovieSearchResponse | null
  isLoading: boolean 
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-8">
      {data.answer && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{data.answer}</p>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.movies.map((movie) => (
          <Card key={movie.id} className="flex flex-col overflow-hidden">
            <div className="relative aspect-[2/3] w-full">
              <img
                src={movie.poster_path ? 
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 
                  "/api/placeholder/500/750"
                }
                alt={movie.title}
                className="object-cover w-full h-full"
              />
              <Badge variant="secondary" className="absolute top-2 right-2">
                ★ {movie.vote_average.toFixed(1)}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
              <CardDescription>{movie.release_date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genres.map((genre) => (
                  <Badge key={genre} variant="outline">
                    {genre}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {movie.overview}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function MovieCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-[2/3] w-full bg-muted animate-pulse" />
      <CardHeader>
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-5 w-16 bg-muted animate-pulse rounded-full" />
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`h-4 bg-muted animate-pulse rounded w-${['full', '5/6', '4/6'][i]}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}