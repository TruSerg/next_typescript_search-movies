"use client";
import { FormEvent, useEffect } from "react";
import { Box, rem } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import { IGenre } from "./interfaces/searchMoviesDataInterfaces";

import {
  useGetMovieGenresQuery,
  useLazySearchMoviesQuery,
} from "./store/movies.api";

import { usePagination, useSelect } from "./hooks";

import CustomForm from "./components/CustomForm";
import UnstyleButton from "./components/Buttons/UnstyleButton";
import Heading from "./components/Heading";
import CustomSelect from "./components/CustomSelect";
import CustomCard from "./components/Card";
import CustomLoader from "./components/Loader";
import BasicPagination from "./components/Pagination";

const MoviesPage = () => {
  const { moviesGenreValue, handleMovieValueChange } = useSelect();
  const { currentPage, handlePageChange } = usePagination();

  const {
    data: genres,
    isLoading: isGenresLoading,
    isFetching: isGenresFetching,
    isError: isGenresError,
    error: genresError,
  } = useGetMovieGenresQuery();

  const [
    fetchSearchMovies,
    {
      data: movies,
      isLoading: isMoviesLoading,
      isFetching: isMoviesFetching,
      isError: isMoviesError,
      error: moviesError,
    },
  ] = useLazySearchMoviesQuery();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handlePageChange(1);

    fetchSearchMovies({ currentPage, moviesGenreValue });
  };

  console.log(movies ? movies.results : null);

  console.log(movies);

  const totalPages = movies?.total_pages;

  useEffect(() => {
    if (currentPage > 1) {
      fetchSearchMovies({ currentPage, moviesGenreValue });
    }
  }, [currentPage]);

  return (
    <main className="m-auto w-full max-w-[1010px] pb-20 pl-[15px] pr-[15px] pt-10">
      <Heading text="Movies" className="mb-10 text-[32px] font-bold" />
      <CustomForm
        className="mb-6 grid grid-cols-[600px_1fr_80px] gap-4"
        handleSubmit={handleFormSubmit}
        id="searchMoviesForm"
      >
        <Box className="grid grid-cols-2 gap-4">
          <CustomSelect
            handleChange={(value) =>
              handleMovieValueChange(value, genres as IGenre[])
            }
            data={genres ? genres.map(({ name }) => name) : []}
            label="Genres"
            placeholder="Select genre"
          >
            {isGenresLoading ? (
              <CustomLoader size={20} />
            ) : (
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            )}
          </CustomSelect>
          <CustomSelect label="Release year" placeholder="Select release year">
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          </CustomSelect>
        </Box>

        <Box className="grid grid-cols-2 items-end gap-2">
          <CustomSelect label="Ratings" placeholder="From" />

          <CustomSelect placeholder="To" />
        </Box>

        <UnstyleButton
          handleClick={handleFormSubmit}
          className="flex items-end justify-end pb-[13px] text-sm font-medium text-gray-600 transition-colors hover:text-purple-500"
          text="Reset&nbsp;filters"
        />
      </CustomForm>
      <Box className="col-start-2 mb-6 grid grid-cols-[1fr_1fr_295px]">
        <CustomSelect
          className="col-start-3"
          label="Sort by"
          placeholder="Most popular"
        >
          <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
        </CustomSelect>
      </Box>
      <Box className="relative mb-6 min-h-screen">
        {isMoviesLoading || isMoviesFetching ? (
          <CustomLoader
            className="absolute left-1/2 top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%]"
            size={40}
          />
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-4">
              {movies?.results.map(
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
          pageCount={totalPages as number}
          handlePageChange={handlePageChange}
        />
      ) : null}
    </main>
  );
};

export default MoviesPage;
