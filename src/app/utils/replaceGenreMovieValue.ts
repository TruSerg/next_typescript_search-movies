import { IGenre } from "../interfaces/searchMoviesDataInterfaces";

export const replaceGenreMovieValue = (
  array: IGenre[] | undefined,
  value: string,
) => {
  const genre = array
    ?.map(({ id, name }) => {
      if (id === +value) {
        return name;
      }
    })
    .join()
    .replaceAll(",", "");

  return genre;
};
