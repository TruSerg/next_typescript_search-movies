// import { FC } from "react";
// import { Metadata } from "next";
// import { Box } from "@mantine/core";

// import { MoviesServerResponse } from "@/app/interfaces/searchMoviesDataInterfaces";
// import { BASE_URL, TOKEN } from "@/app/const";
// import { correctFiltersText } from "@/app/utils/correctFiltersText";

// import MoviesFilterCard from "@/app/components/Cards/MoviesFilterCard";
// import Heading from "@/app/components/Heading";
// import GetMoreMoviesButton from "@/app/components/Buttons/GetMoreMoviesButton";

// const getMoviesByFilters = async (filter: string) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/movie/${filter}?language=en-US&page=1`,
//       {
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       },
//     );

//     const data = await response.json();

//     return data;
//   } catch (err) {
//     return err;
//   }
// };

// interface DetailsProps {
//   params: {
//     filter: string;
//   };
// }

// export const generateMetadata = async ({
//   params: { filter },
// }: DetailsProps): Promise<Metadata> => {
//   return {
//     title: `${correctFiltersText(filter)} movies`,
//   };
// };

// const TrendingMoviesPage: FC<DetailsProps> = async ({ params: { filter } }) => {
//   const movies: MoviesServerResponse = await getMoviesByFilters(filter);

//   const moviesList = movies?.results;

//   return (
//     <main className="m-auto w-full max-w-[1210px] pb-20 pl-[24px] pr-[24px] pt-10">
//       <Heading
//         text={`${correctFiltersText(filter)} movies`}
//         className="mb-10 text-[32px] font-bold"
//       />
//       <Box className="mb-6 min-h-screen">
//         <ul className="grid grid-cols-5 gap-6">
//           {moviesList?.map(
//             ({ id, poster_path, title, release_date, vote_average }) => {
//               return (
//                 <MoviesFilterCard
//                   key={id}
//                   image={poster_path}
//                   title={title}
//                   date={release_date}
//                   rate={vote_average}
//                 />
//               );
//             },
//           )}
//         </ul>
//       </Box>
//       <GetMoreMoviesButton
//         text="Load more..."
//         className="rounded-lg bg-purple-200 p-[10px] text-base font-bold text-purple-500"
//       />
//     </main>
//   );
// };

// export default TrendingMoviesPage;
"use client";
import { useEffect } from "react";

import { Box } from "@mantine/core";

import { useLazyGetMoviesByFilterQuery } from "../store/movies.api";

import { usePagination } from "../hooks";
import { useAppSelector } from "../hooks/useStoreHooks";

import { correctFiltersText } from "@/app/utils/correctFiltersText";

import MoviesFilterCard from "@/app/components/Cards/MoviesFilterCard";
import Heading from "@/app/components/Heading";
import CustomLoader from "../components/Loader";
import BasicPagination from "../components/Pagination";

const TrendingMoviesPage = () => {
  const { currentPage, handlePageChange } = usePagination();

  const { moviesFilterValue } = useAppSelector((state) => state.searchMovies);
  console.log("moviesFilterValue: ", moviesFilterValue);

  const [
    fetchMovies,
    {
      data: movies,
      isLoading: isMoviesLoading,
      isFetching: isMoviesFetching,
      isError: isMoviesError,
      error: moviesError,
    },
  ] = useLazyGetMoviesByFilterQuery();

  useEffect(() => {
    fetchMovies({moviesFilterValue, currentPage});
  }, [moviesFilterValue, currentPage]);

  const moviesList = movies?.results;
  console.log("moviesList: ", moviesList);
  const totalPages = movies?.total_pages;

  return (
    <main className="m-auto w-full max-w-[1210px] pb-20 pl-[24px] pr-[24px] pt-10">
      <Heading
        text={`${correctFiltersText(moviesFilterValue)} movies`}
        className="mb-10 text-[32px] font-bold"
      />
      <Box className="relative mb-6 min-h-screen">
        {isMoviesLoading || isMoviesFetching ? (
          <CustomLoader
            className="absolute left-[50%] top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%]"
            size={40}
          />
        ) : (
          <ul className="grid grid-cols-5 gap-6">
            {moviesList?.map(
              ({ id, poster_path, title, release_date, vote_average }) => {
                return (
                  <MoviesFilterCard
                    key={id}
                    image={poster_path}
                    title={title}
                    date={release_date}
                    rate={vote_average}
                  />
                );
              },
            )}
          </ul>
        )}
      </Box>
      {totalPages ? (
        <BasicPagination
          className="flex justify-end"
          currentPage={currentPage}
          pageCount={totalPages}
          handlePageChange={handlePageChange}
        />
      ) : null}
    </main>
  );
};

export default TrendingMoviesPage;
