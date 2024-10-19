export interface IGenre {
  id: number;
  name: string;
}

export interface ServerResponse {
  genres: IGenre[];
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesServerResponse {
  total_pages: number;
  total_results: number;
  page: number;
  results: IMovie[];
}

export interface MoviesSearchParams {
  currentPage?: number;
  sortValue?: string | null;
  moviesGenreValue?: string;
  releaseYear?: number;
  from?: string | null;
  to?: string | null;
  moviesFilterValue?: string;
}

export interface IMovieProduction {
  id: number;
  logo_path: string;
  name: string;
}
