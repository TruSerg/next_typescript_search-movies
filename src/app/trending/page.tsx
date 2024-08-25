"use client";
import { Box } from "@mantine/core";

import {
  useGetMovieGenresQuery,
  useTrendingMoviesQuery,
} from "../store/movies.api";

import { usePagination } from "../hooks";

import BasicPagination from "../components/Pagination";
import CustomCard from "../components/Cards/Card";
import CustomLoader from "../components/Loader";
import Heading from "../components/Heading";

const TrendingMoviesPage = () => {
  const { currentPage, handlePageChange } = usePagination();

  const {
    data: genres,
    isLoading: isGenresLoading,
    isFetching: isGenresFetching,
    isError: isGenresError,
    error: genresError,
  } = useGetMovieGenresQuery();

  const {
    data: trendingMovies,
    isLoading: isTrendingMoviesLoading,
    isFetching: isTrendingMoviesFetching,
    isError: isMoviesError,
    error: moviesError,
  } = useTrendingMoviesQuery({ currentPage });

  const trendingMoviesList = trendingMovies?.results;
  const totalPages = trendingMovies?.total_pages;

  return (
    <main className="m-auto w-full max-w-[1010px] pb-20 pl-[15px] pr-[15px] pt-10">
      <Heading text="Trending movies" className="mb-10 text-[32px] font-bold" />

      <Box className="relative mb-6 min-h-screen">
        {isTrendingMoviesLoading ||
        isTrendingMoviesFetching ||
        isGenresLoading ? (
          <CustomLoader
            className="absolute left-1/2 top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%]"
            size={40}
          />
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-4">
              {trendingMoviesList?.map(
                ({
                  id,
                  poster_path,
                  title,
                  vote_average,
                  release_date,
                  popularity,
                  genre_ids,
                }) => {
                  return (
                    <CustomCard
                      key={id}
                      image={poster_path}
                      title={title}
                      rate={vote_average}
                      date={release_date}
                      popularity={popularity}
                      list={genre_ids}
                    />
                  );
                },
              )}
            </ul>
          </>
        )}
      </Box>
      {totalPages ? (
        <BasicPagination
          className="flex justify-end"
          currentPage={currentPage}
          pageCount={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : null}
    </main>
  );
};

export default TrendingMoviesPage;
