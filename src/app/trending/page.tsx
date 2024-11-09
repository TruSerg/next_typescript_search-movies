"use client";
import { Box } from "@mantine/core";

import {
  useGetMovieGenresQuery,
  useTrendingMoviesQuery,
} from "../store/movies.api";

import { getRequestErrors } from "../utils/getRequestErrors";

import { usePagination } from "../hooks";

import BasicPagination from "../components/Pagination";
import CustomCard from "../components/Cards/MoviesCard";
import CustomLoader from "../components/Loaders/Loader";
import Heading from "../components/Heading";
import ErrorComponent from "../components/ErrorComponent";

const TrendingMoviesPage = () => {
  const { currentPage, handlePageChange } = usePagination();

  const { isLoading: isGenresLoading } = useGetMovieGenresQuery();

  const {
    data: trendingMovies,
    isLoading: isTrendingMoviesLoading,
    isFetching: isTrendingMoviesFetching,
    isError: isTrendingMoviesError,
    error: trendingMoviesError,
  } = useTrendingMoviesQuery({ currentPage });

  const trendingMoviesList = trendingMovies?.results;
  const totalPages = trendingMovies?.total_pages;

  return (
    <main className="m-[0_auto] w-full max-w-[1010px] pb-10 pl-[15px] pr-[15px] pt-10 xl:pb-5 xl:pt-5 lg:text-[28px] sm:text-[24px]">
      <Box className="relative mb-6 min-h-[80vh]">
        {isTrendingMoviesLoading ||
        isTrendingMoviesFetching ||
        isGenresLoading ? (
          <CustomLoader className="absolute left-1/2 top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%]" />
        ) : (
          <>
            {isTrendingMoviesError ? (
              <ErrorComponent error={getRequestErrors(trendingMoviesError)} />
            ) : (
              <>
                <Heading
                  text="На пике популярности"
                  className="mb-10 text-[32px] font-bold xl:mb-5 lg:text-[24px] sm:mb-3 sm:text-[18px]"
                />

                <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-2">
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
                          link={`/details/${id}`}
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
