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
import ErrorComponent from "../components/ErrorComponent";
import { getRequestErrors } from "../utils/getRequestErrors";

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

  console.log("moviesError: ", moviesError);

  return (
    <main className="m-[0_auto] w-full max-w-[1210px] pb-10 pl-[15px] pr-[15px] pt-10 xl:pb-5 xl:pt-5">
      <Box className="relative mb-6 min-h-[80vh]">
        {isMoviesLoading || isMoviesFetching ? (
          <CustomLoader className="absolute left-[50%] top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%]" />
        ) : (
          <>
            {isMoviesError ? (
              <ErrorComponent error={getRequestErrors(moviesError)} />
            ) : (
              <>
                <Heading
                  text={titleMovies}
                  className="mb-10 text-[32px] font-bold xl:mb-5 lg:text-[28px] sm:mb-3 sm:text-[18px]"
                />

                <ul className="grid grid-cols-5 gap-[15px] lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                  {moviesList?.map(
                    ({
                      id,
                      poster_path,
                      title,
                      release_date,
                      vote_average,
                    }) => (
                      <MoviesFilterCard
                        classNameText="font-semibold text-xl mb-2 leading-tight break-word text-purple-500 xl:leading-tight lg:leading-tight sm:leading-tight xl:text-lg  lg:text-base sm:mb-1 sm:text-sm"
                        key={id}
                        link={`/details/${id}`}
                        image={poster_path}
                        title={title}
                        date={release_date}
                        rate={vote_average}
                      />
                    ),
                  )}
                </ul>
              </>
            )}
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
