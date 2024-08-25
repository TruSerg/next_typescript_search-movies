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

  const handleMovieValueChange = (value: string | null, array: IGenre[]) => {
    array?.find(({ id, name }) => {
      if (value === name) {
        handleGenreChange(`${id}`);
      }
    });
  };

  const sortValueDate = {
    "Most popular": "popularity.desc",
    "Less popular": "popularity.asc",
    "Higher rating": "vote_average.desc",
    "Lower rating": "vote_average.asc",
    "Late date": "primary_release_date.desc",
    "Early date": "primary_release_date.asc",
    "Title (A-Z)": "original_title.asc",
    "Title (Z-A)": "original_title.desc",
  };

  const handleSortValueChange = (currentValue: string | null) => {
    for (const value in sortValueDate) {
      if (value === currentValue) {
        setSortValue(sortValueDate[value]);
      }
    }
  };

  return {
    moviesGenreValue,
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
