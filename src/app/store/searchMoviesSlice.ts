import { createSlice } from "@reduxjs/toolkit";

import { IGenre } from "../interfaces/searchMoviesDataInterfaces";

interface SearchMoviesState {
  moviesFilterValue: string;
  titleMovies: string;
  genresList: IGenre[];
}

const initialState: SearchMoviesState = {
  moviesFilterValue: "",
  titleMovies: "",
  genresList: [],
};

const searchMoviesSlice = createSlice({
  name: "searchMovies",
  initialState,
  reducers: {
    changeMovieFilterValue(state, { payload }) {
      state.moviesFilterValue = payload;
    },
    changeTitleMovies(state, { payload }) {
      state.titleMovies = payload;
    },
    handleGenresListChange(state, { payload }) {
      state.genresList.push(payload);
    },
  },
});

export const {
  changeMovieFilterValue,
  changeTitleMovies,
  handleGenresListChange,
} = searchMoviesSlice.actions;

export default searchMoviesSlice.reducer;
