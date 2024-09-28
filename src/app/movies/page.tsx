"use client";
import { useEffect } from "react";

import { Box } from "@mantine/core";

import { useLazyGetMoviesByFilterQuery } from "../store/movies.api";

import { usePagination } from "../hooks";
import { useAppSelector } from "../hooks/useStoreHooks";

import MoviesFilterCard from "@/app/components/Cards/MoviesFilterCard";
import Heading from "@/app/components/Heading";
import CustomLoader from "../components/Loaders/Loader";
import BasicPagination from "../components/Pagination";

const TrendingMoviesPage = () => {
  const { currentPage, handlePageChange } = usePagination();

  const { moviesFilterValue, titleMovies } = useAppSelector(
    (state) => state.searchMovies,
  );

  const [
    fetchMovies,
    {
      data: movies,
      isLoading: isMoviesLoading,
      isFetching: isMoviesFetching,
      isError: isMoviesError,
      error: moviesError,
    },
  ] = useLazyGetMoviesByFilterQuery();

  useEffect(() => {
    fetchMovies({ moviesFilterValue, currentPage });
  }, [moviesFilterValue, currentPage]);

  const moviesList = movies?.results;
  const totalPages = movies?.total_pages;

  return (
    <main className="m-auto w-full max-w-[1210px] pb-20 pl-[24px] pr-[24px] pt-10 xl:pb-10 xl:pl-[15px] xl:pr-[15px] xl:pt-5 sm:pb-5 sm:pt-3">
      <Box className="relative mb-6 min-h-[60vh]">
        {isMoviesLoading || isMoviesFetching ? (
          <CustomLoader className="absolute left-[50%] top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%]" />
        ) : (
          <>
            <Heading
              text={titleMovies}
              className="mb-10 text-[32px] font-bold xl:mb-5 lg:text-[28px] sm:mb-3 sm:text-[18px]"
            />

            <ul className="grid grid-cols-5 gap-6 xl:gap-[15px] lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
              {moviesList?.map(
                ({ id, poster_path, title, release_date, vote_average }) => (
                  <MoviesFilterCard
                    classNameText="font-semibold text-xl mb-2 leading-tight break-word text-purple-500 xl:leading-tight lg:leading-tight sm:leading-tight xl:text-lg  lg:text-base sm:mb-1 sm:text-sm"
                    key={id}
                    image={poster_path}
                    title={title}
                    date={release_date}
                    rate={vote_average}
                    width={200}
                    height={300}
                  />
                ),
              )}
            </ul>
          </>
        )}
      </Box>
      {totalPages ? (
        <BasicPagination
          className="flex justify-end"
          currentPage={currentPage}
          pageCount={totalPages > 500 ? 500 : totalPages}
          handlePageChange={handlePageChange}
        />
      ) : null}
    </main>
  );
};

export default TrendingMoviesPage;
