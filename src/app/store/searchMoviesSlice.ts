import { createSlice } from "@reduxjs/toolkit";

import { IGenre } from "../interfaces/searchMoviesDataInterfaces";

interface SearchMoviesState {
  moviesFilterValue: string;
  genresList: IGenre[];
}

const initialState: SearchMoviesState = {
  moviesFilterValue: "",
  genresList: [],
};

const searchMoviesSlice = createSlice({
  name: "searchMovies",
  initialState,
  reducers: {
    changeMovieFilterValue(state, { payload }) {
      state.moviesFilterValue = payload;
    },
    handleGenresListChange(state, { payload }) {
      state.genresList.push(payload);
    },
  },
});

export const { changeMovieFilterValue, handleGenresListChange } =
  searchMoviesSlice.actions;

export default searchMoviesSlice.reducer;
