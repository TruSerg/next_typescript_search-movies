import { useState } from "react";

import { IGenre } from "../interfaces/searchMoviesDataInterfaces";
import { useAppDispatch } from "./useStoreHooks";
import {
  changeMovieFilterValue,
  changeTitleMovies,
} from "../store/searchMoviesSlice";

const useSelect = () => {
  const dispatch = useAppDispatch();

  const [moviesGenreValue, setMoviesGenreValue] = useState<string>("");
  const [rateFrom, setRateFrom] = useState<string | null>("");
  const [rateTo, setRateTo] = useState<string | null>("");
  const [sortValue, setSortValue] = useState<string | null>("");

  const handleGenreChange = (value: string) => {
    setMoviesGenreValue(value);
  };

  const handleRateFromChange = (value: string | null) => {
    setRateFrom(value);
  };

  const handleRateToChange = (value: string | null) => {
    setRateTo(value);
  };

  const handleMovieValueChange = (
    value: string | null,
    array: IGenre[] | undefined,
  ) => {
    array?.find(({ id, name }) => {
      if (value === name) {
        handleGenreChange(`${id}`);
      }
    });
  };

  const filterTypeMovies = new Map();

  filterTypeMovies.set("Популярные", "popular");
  filterTypeMovies.set("Предстоящие", "upcoming");
  filterTypeMovies.set("Самый высокий рейтинг", "top_rated");
  filterTypeMovies.set("Сейчас в кино", "now_playing");

  const handleFilterTypeOfMoviesChange = (currentValue: string) => {
    for (const value of filterTypeMovies.keys()) {
      if (value === currentValue) {
        dispatch(changeMovieFilterValue(filterTypeMovies.get(value)));
        dispatch(changeTitleMovies(currentValue));
      }
    }
  };

  const sortValueDateMap = new Map();

  sortValueDateMap.set("Самые популярные", "popularity.desc");
  sortValueDateMap.set("Менее популярные", "popularity.asc");
  sortValueDateMap.set("Более высокий рейтинг", "vote_average.desc");
  sortValueDateMap.set("Менее высокий рейтинг", "vote_average.asc");
  sortValueDateMap.set("Поздняя дата", "primary_release_date.desc");
  sortValueDateMap.set("Ранняя дата", "primary_release_date.asc");
  sortValueDateMap.set("Название (А-Я)", "original_title.asc");
  sortValueDateMap.set("Название (Я-А)", "original_title.desc");

  const handleSortValueChange = (currentValue: string | null) => {
    for (const value of sortValueDateMap.keys()) {
      if (value === currentValue) {
        setSortValue(sortValueDateMap.get(value));
      }
    }
  };

  return {
    sortValueDateMap,
    moviesGenreValue,
    setMoviesGenreValue,
    handleGenreChange,
    rateFrom,
    rateTo,
    sortValue,
    handleMovieValueChange,
    handleRateFromChange,
    handleRateToChange,
    handleFilterTypeOfMoviesChange,
    handleSortValueChange,
  };
};

export default useSelect;
