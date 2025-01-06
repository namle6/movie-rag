
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { searchMovies } from '@/lib/api';
import { MovieSearchResponse } from '@/types';

export function useMovieSearch() {
  const queryClient = useQueryClient();
  
  const { mutate: search, isPending: isSearching } = useMutation({
    mutationFn: searchMovies,
    onSuccess: (data) => {
      queryClient.setQueryData(['movieSearch'], data);
    },
  });

  const data = queryClient.getQueryData<MovieSearchResponse>(['movieSearch']);

  return {
    search,
    isSearching,
    data,
  };
}