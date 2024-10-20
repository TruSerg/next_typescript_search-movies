"use client";
import { useEffect, useState } from "react";
import { Box, Button, rem } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

import { movieFromToRateList, movieSortList } from "./const";

import {
  useGetMovieGenresQuery,
  useLazySearchMoviesQuery,
} from "./store/movies.api";

import { useInput, usePagination, useResize, useSelect } from "./hooks";

import CustomForm from "./components/CustomForm";
import Heading from "./components/Heading";
import CustomSelect from "./components/Selects/CustomSelect";
import CustomCard from "./components/Cards/MoviesCard";
import CustomLoader from "./components/Loaders/Loader";
import BasicPagination from "./components/Pagination";
import YearPickerComponent from "./components/Inputs/YearPickerInput";
import StartSearchingComponent from "./components/StartSearchingComponent";
import SelectLoader from "./components/Loaders/SelectLoader";

const MoviesPage = () => {
  const { isScreenSm, isScreenLg } = useResize();
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

  const handleFormSubmit = (e: globalThis.KeyboardEvent) => {
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
  }, [isFirstRequest, currentPage, sortValue]);

  const moviesList = movies?.results;
  const totalPages = movies?.total_pages;

  console.log(moviesList?.length);

  return (
    <main className="m-auto w-full max-w-[1010px] pb-20 pl-[15px] pr-[15px] pt-10 xl:m-0 xl:max-w-full xl:pb-10 xl:pt-5 sm:pt-3">
      <Heading
        text="Фильмы"
        className="mb-10 text-[32px] font-bold xl:mb-5 lg:text-[24px] sm:mb-3 sm:text-[18px]"
      />
      <CustomForm
        className="mb-6 grid grid-cols-[2fr_1fr] gap-4 lg:grid-cols-1 sm:m-auto sm:mb-3 sm:max-w-80 sm:gap-2"
        handleSubmit={handleFormSubmit}
        id="searchMoviesForm"
      >
        <Box className="grid grid-cols-2 gap-4 md:gap-2 sm:grid-cols-1">
          <CustomSelect
            data={genres?.map(({ name }) => name)}
            label="Жанры"
            placeholder="Выберите жанр"
            handleChange={(value) => handleMovieValueChange(value, genres)}
            rightSection={
              isGenresLoading ? (
                <SelectLoader size={20} />
              ) : (
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
              )
            }
          />

          <YearPickerComponent
            label="Год выпуска"
            placeholder="Выберите год выпуска"
            rightSection={
              !yearPickerValue ? (
                <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
              ) : null
            }
            handleChange={(value) => handleYearPickerValue(value)}
          />
        </Box>

        <Box className="grid grid-cols-2 items-end gap-2 lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-2 sm:grid-cols-2">
          <CustomSelect
            clearable={true}
            data={movieFromToRateList}
            label="Рейтинг"
            placeholder="От"
            handleChange={(value) => handleRateFromChange(value)}
          />

          <CustomSelect
            clearable={true}
            data={movieFromToRateList.toReversed()}
            placeholder="До"
            handleChange={(value) => handleRateToChange(value)}
          />
        </Box>
      </CustomForm>

      <Box className="mb-6 flex justify-end sm:m-auto sm:mb-3 sm:max-w-80">
        <Button
          form="searchMoviesForm"
          type="submit"
          color="#9854f6"
          className="flex justify-center items-center max-w-[200px] justify-end sm:h-8 sm:w-[70px] sm:text-sm"
        >
          Search
        </Button>
      </Box>

      {isFirstRequest && (
        <Box className="mb-6 grid grid-cols-3 gap-2 lg:grid-cols-2 sm:grid-cols-1">
          <CustomSelect
            className="col-start-3 lg:col-start-2"
            data={movieSortList}
            label="Сортировка"
            placeholder="Выбор сортировки"
            handleChange={(value) => handleSortValueChange(value)}
            rightSection={
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
            }
          />
        </Box>
      )}

      <Box className="relative mb-6 flex min-h-[80vh] items-start justify-center">
        {isMoviesLoading || isMoviesFetching ? (
          <CustomLoader className="absolute left-1/2 top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%] sm:h-1 sm:w-1" />
        ) : (
          <>
            {!moviesList ? (
              <StartSearchingComponent />
            ) : (
              <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:gap-2">
                {moviesList?.map(
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

export default MoviesPage;
