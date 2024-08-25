import { createSlice } from "@reduxjs/toolkit";

interface SearchMoviesState {
  moviesFilterValue: string;
}

const initialState: SearchMoviesState = {
  moviesFilterValue: "",
};

const searchMoviesSlice = createSlice({
  name: "searchMovies",
  initialState,
  reducers: {
    changeMovieFilterValue(state, { payload }) {
      state.moviesFilterValue = payload;
    },
  },
});

export const { changeMovieFilterValue } = searchMoviesSlice.actions;

export default searchMoviesSlice.reducer;
