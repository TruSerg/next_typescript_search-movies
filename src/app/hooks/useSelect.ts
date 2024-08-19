import { useState } from "react";

import { IGenre } from "../interfaces/searchMoviesDataInterfaces";

const useSelect = () => {
  const [moviesGenreValue, setMoviesGenreValue] = useState<string>("");

  const handleGenreChange = (value: string) => {
    setMoviesGenreValue(value);
  };

  const handleMovieValueChange = (value: string | null, array: IGenre[]) => {
    array?.find(({ id, name }) => {
      if (value === name) {
        handleGenreChange(`${id}`);
      }
    });
  };

  return {
    moviesGenreValue,
    handleMovieValueChange,
  };
};

export default useSelect;
