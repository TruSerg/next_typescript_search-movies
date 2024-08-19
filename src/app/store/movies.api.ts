import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { BASE_URL, TOKEN } from "../const";
import {
  IGenre,
  MoviesSearchParams,
  MoviesServerResponse,
  ServerResponse,
} from "../interfaces/searchMoviesDataInterfaces";
import {
  ISearchMoviesDataErrorObject,
  ISearchMoviesErrorObject,
} from "../interfaces/searchMoviesErrorsInterfaces";

export const moviesApi = createApi({
  reducerPath: "movies/api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${TOKEN}`);
      return headers;
    },
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    ISearchMoviesErrorObject | ISearchMoviesDataErrorObject,
    unknown
  >,
  endpoints: (builder) => ({
    getMovieGenres: builder.query<IGenre[], void>({
      query: () => `/genre/movie/list?language=en`,
      transformResponse: (response: ServerResponse) => response?.genres,
    }),
    searchMovies: builder.query<MoviesServerResponse, MoviesSearchParams>({
      query: ({ currentPage, moviesGenreValue }) =>
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc&with_genres=${moviesGenreValue}'`,
    }),
    trendingMovies: builder.query<MoviesServerResponse, MoviesSearchParams>({
      query: ({ currentPage }) =>
        `trending/movie/day?language=en-US&page=${currentPage}`,
    }),
  }),
});

export const { useGetMovieGenresQuery, useLazySearchMoviesQuery, useTrendingMoviesQuery } = moviesApi;
