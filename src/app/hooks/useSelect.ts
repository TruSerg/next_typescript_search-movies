import { useState } from "react";

import { IGenre } from "../interfaces/searchMoviesDataInterfaces";

const useSelect = () => {
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

  const sortValueDateMap = new Map();

  sortValueDateMap.set("Most popular", "popularity.desc");
  sortValueDateMap.set("Less popular", "popularity.asc");
  sortValueDateMap.set("Higher rating", "vote_average.desc");
  sortValueDateMap.set("Lower rating", "vote_average.asc");
  sortValueDateMap.set("Late date", "primary_release_date.desc");
  sortValueDateMap.set("Early date", "primary_release_date.asc");
  sortValueDateMap.set("Title (A-Z)", "original_title.asc");
  sortValueDateMap.set("Title (Z-A)", "original_title.desc");

  const handleSortValueChange = (currentValue: string | null) => {
    for (const value of sortValueDateMap.keys()) {
      if (value === currentValue) {
        setSortValue(sortValueDateMap.get(value));
      }
    }
  };

  return {
    moviesGenreValue,
    setMoviesGenreValue,
    handleGenreChange,
    rateFrom,
    rateTo,
    sortValue,
    handleMovieValueChange,
    handleRateFromChange,
    handleRateToChange,
    handleSortValueChange,
  };
};

export default useSelect;
