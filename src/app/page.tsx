"use client";
import { FormEvent, useEffect, useState } from "react";
import { Box, rem } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import { IGenre } from "./interfaces/searchMoviesDataInterfaces";

import {
  useGetMovieGenresQuery,
  useLazySearchMoviesQuery,
} from "./store/movies.api";

import { useInput, usePagination, useReplaceGenreId, useSelect } from "./hooks";

import CustomForm from "./components/CustomForm";
import UnstyleButton from "./components/Buttons/UnstyleButton";
import Heading from "./components/Heading";
import CustomSelect from "./components/CustomSelect";
import CustomCard from "./components/Cards/Card";
import CustomLoader from "./components/Loader";
import BasicPagination from "./components/Pagination";
import YearPickerComponent from "./components/Inputs/YearPickerInput";
import { replaceGenreMovieValue } from "./utils/replaceGenreMovieValue";

const MoviesPage = () => {
  const [isFirstRequest, setIsFirstRequest] = useState(false);

  const {
    moviesGenreValue,
    rateFrom,
    rateTo,
    sortValue,
    handleMovieValueChange,
    handleRateFromChange,
    handleRateToChange,
    handleSortValueChange,
  } = useSelect();
  const { currentPage, handlePageChange } = usePagination();
  const { yearPickerValue, handleYearPickerValue } = useInput();

  console.log("sortValue: ", sortValue);

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

    if (moviesGenreValue) {
      handlePageChange(1);
      fetchSearchMovies({
        currentPage,
        sortValue,
        moviesGenreValue,
        releaseYear: yearPickerValue,
        from: rateFrom,
        to: rateTo,
      });
      setIsFirstRequest(true);
    }
  };

  console.log(movies ? movies.results : null);

  console.log(movies);

  useEffect(() => {
    if (isFirstRequest) {
      fetchSearchMovies({
        currentPage,
        sortValue,
        moviesGenreValue,
        releaseYear: yearPickerValue,
        from: rateFrom,
        to: rateTo,
      });
    }
  }, [isFirstRequest, currentPage]);

  const totalPages = movies?.total_pages;

  return (
    <main className="m-auto w-full max-w-[1010px] pb-20 pl-[15px] pr-[15px] pt-10">
      <Heading
        text={
          isFirstRequest
            ? `${replaceGenreMovieValue(genres, moviesGenreValue)} movies`
            : "Movies"
        }
        className="mb-10 text-[32px] font-bold"
      />
      <CustomForm
        className="mb-6 grid grid-cols-[600px_1fr_80px] grid-rows-2 gap-4"
        handleSubmit={handleFormSubmit}
        id="searchMoviesForm"
      >
        <Box className="grid grid-cols-2 gap-4">
          <CustomSelect
            data={genres ? genres.map(({ name }) => name) : []}
            label="Genres"
            placeholder="Select genre"
            handleChange={(value) =>
              handleMovieValueChange(value, genres as IGenre[])
            }
          >
            {isGenresLoading ? (
              <CustomLoader size={20} />
            ) : (
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            )}
          </CustomSelect>

          <YearPickerComponent
            label="Release year"
            placeholder="Select release year"
            handleChange={(value) => handleYearPickerValue(value)}
          >
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          </YearPickerComponent>
        </Box>

        <Box className="grid grid-cols-2 items-end gap-2">
          <CustomSelect
            data={["1", "2", "3", " 4", "5", "6", "7", "8", "9", "10"]}
            label="Ratings"
            placeholder="From"
            handleChange={(value) => handleRateFromChange(value)}
          />

          <CustomSelect
            data={["1", "2", "3", " 4", "5", "6", "7", "8", "9", "10"]}
            placeholder="To"
            handleChange={(value) => handleRateToChange(value)}
          />
        </Box>

        <UnstyleButton
          handleClick={handleFormSubmit}
          className="flex items-end justify-end pb-[13px] text-sm font-medium text-gray-600 transition-colors hover:text-purple-500"
          text="Reset&nbsp;filters"
        />

        <Box className="col-start-2 col-end-4">
          <CustomSelect
            className="col-start-3"
            data={[
              "Most popular",
              "Less popular",
              "Higher rating",
              "Lower rating",
              "Late date",
              "Early date",
              "Title (A-Z)",
              "Title (Z-A)",
            ]}
            label="Sort by"
            placeholder="Most popular"
            handleChange={(value) => handleSortValueChange(value)}
          >
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          </CustomSelect>
        </Box>
      </CustomForm>

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

      <BasicPagination
        className="flex justify-end"
        currentPage={currentPage}
        pageCount={totalPages}
        handlePageChange={handlePageChange}
      />
    </main>
  );
};

export default MoviesPage;
