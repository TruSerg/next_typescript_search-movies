import { FC } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Box, Text } from "@mantine/core";

import {
  IGenre,
  IMovieProduction,
} from "@/app/interfaces/searchMoviesDataInterfaces";

import { IMAGE_URL, TOKEN } from "@/app/const";
import { getTimeFromMins } from "@/app/utils/getTimeFormat";
import { replaceCurrencyByComma } from "@/app/utils/replaceCurrencyByComma";

import Heading from "@/app/components/Heading";
import RateComponent from "@/app/components/RateComponent";
import PopularityComponent from "@/app/components/PopularityComponent";
import DateComponent from "@/app/components/DateComponent";
import NoImageBig from "@/app/components/NoImage/NoImageBig";

const getMovieDetails = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ru`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    );

    const data = response.json();

    return data;
  } catch (err) {
    return err;
  }
};

const getMovieVideos = async (id: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=ru`,
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      },
    );

    const data = response.json();

    return data;
  } catch (err) {
    return err;
  }
};

interface MovieDetailsProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params: { id },
}: MovieDetailsProps): Promise<Metadata> => {
  const movie = await getMovieDetails(id);

  return {
    title: movie.title,
  };
};

const MovieDetails: FC<MovieDetailsProps> = async ({ params: { id } }) => {
  const movie = await getMovieDetails(id);
  const video = await getMovieVideos(id);

  const title = movie.title;
  const image = movie.poster_path;
  const date = movie.release_date;
  const rate = movie.vote_average;
  const popularity = movie.popularity;
  const genresList: IGenre[] = movie.genres;
  const duration = movie.runtime;
  const budget = movie.budget;
  const grossWorldwide = movie.revenue;
  const movieTrailerId = video.results ? video.results[0]?.key : null;
  const movieDescription = movie.overview;
  const movieProduction: IMovieProduction[] = movie.production_companies;
  const isShowDetailsBlock =
    movieTrailerId ?? movieDescription ?? movieProduction;

  return (
    <main className="m-auto w-full max-w-[1010px] pb-10 pl-[15px] pr-[15px] pt-10 xl:m-0 xl:max-w-full xl:pb-5 xl:pt-5 sm:pb-3 sm:pt-3">
      <Box className="mb-5 min-h-[400px] rounded-xl bg-white p-6 sm:p-3">
        <Box className="grid flex-1 grid-cols-[250px_1fr] gap-4 md:flex md:flex-col">
          {image ? (
            <Image
              className="sm:m-auto sm:w-full sm:max-w-[280px]"
              src={`${IMAGE_URL}${image}`}
              width="250"
              height="352"
              alt={title}
            />
          ) : (
            <NoImageBig />
          )}

          <Box className="break-word flex flex-col gap-3">
            <Box className="flex items-start justify-between gap-4">
              <Heading
                tag="h1"
                text={title}
                className="mb-2 text-xl font-semibold leading-tight text-purple-500 xl:text-lg xl:leading-tight lg:text-base lg:leading-tight sm:mb-1 sm:text-sm sm:leading-tight"
              />
              <Box className="flex-shrink-0 cursor-pointer">
                <Image
                  src="/emptyRate.svg"
                  width="25"
                  height="25"
                  alt="Empty rate icon"
                />
              </Box>
            </Box>

            {date && (
              <DateComponent
                c="dimmed"
                className="mb-2 text-base sm:mb-1 sm:text-sm"
                date={date}
                dateFormat="YYYY"
              />
            )}

            <Box className="mb-2 flex items-center gap-2 sm:mb-1">
              <RateComponent rate={rate} />

              <PopularityComponent rate={rate} popularity={popularity} />
            </Box>

            <ul className="mt-auto flex flex-col gap-3 lg:text-sm sm:gap-2">
              {duration !== 0 && (
                <li className="flex gap-3 sm:justify-between">
                  <Text
                    c="dimmed"
                    className="text-md w-full max-w-40 leading-tight lg:text-sm sm:max-w-0 sm:text-xs"
                  >
                    Продолжительность
                  </Text>

                  <Text className="text-md leading-tight lg:text-sm sm:text-xs">
                    {getTimeFromMins(duration)}
                  </Text>
                </li>
              )}

              {date && (
                <li className="flex gap-3 sm:justify-between">
                  <Text
                    c="dimmed"
                    className="text-md w-full max-w-40 leading-tight lg:text-sm sm:max-w-0 sm:text-xs"
                  >
                    Премьера
                  </Text>
                  <DateComponent
                    c="#000"
                    className="text-md leading-tight lg:text-sm sm:text-xs"
                    date={date}
                    dateFormat="MMMM D, YYYY"
                  />
                </li>
              )}

              {budget !== 0 && (
                <li className="flex gap-3 sm:justify-between">
                  <Text
                    c="dimmed"
                    className="text-md w-full max-w-40 leading-tight lg:text-sm sm:max-w-0 sm:text-xs"
                  >
                    Бюджет
                  </Text>

                  <Text className="text-md leading-tight lg:text-sm sm:text-xs">
                    {`$${replaceCurrencyByComma(budget)}`}
                  </Text>
                </li>
              )}

              {grossWorldwide !== 0 && (
                <li className="flex items-end gap-3 sm:justify-between">
                  <Text
                    c="dimmed"
                    className="text-md w-full max-w-40 leading-tight lg:text-sm sm:max-w-0 sm:text-xs"
                  >
                    Мировые сборы
                  </Text>

                  <Text className="text-md leading-tight lg:text-sm sm:text-xs">
                    {`$${replaceCurrencyByComma(grossWorldwide)}`}
                  </Text>
                </li>
              )}

              {genresList.length !== 0 && (
                <li className="flex gap-3 sm:justify-between">
                  <Text
                    c="dimmed"
                    className="text-md w-full max-w-40 leading-tight lg:text-sm sm:max-w-10 sm:text-xs"
                  >
                    Жанр
                  </Text>

                  <Box className="flex flex-wrap justify-end gap-1">
                    {genresList?.map(({ id, name }) => (
                      <Text
                        key={id}
                        className="text-md leading-tight lg:text-sm sm:text-xs [&:not(:last-child)]:after:content-[',']"
                      >
                        {name}
                      </Text>
                    ))}
                  </Box>
                </li>
              )}
            </ul>
          </Box>
        </Box>
      </Box>

      {isShowDetailsBlock && (
        <>
          <Box className="rounded-xl bg-white p-6 sm:p-3">
            {movieTrailerId && (
              <Box className="border-b-solid border-b-#D5D6DC mb-5 border-b-[1px] pb-5">
                <Heading
                  tag="h2"
                  text="Трейлер"
                  className="text-black-500 mb-5 text-xl font-semibold leading-tight xl:text-lg xl:leading-tight lg:text-base lg:leading-tight sm:leading-tight"
                />

                <iframe
                  className="min-h-[281px] w-full max-w-[500px] sm:min-h-[200px]"
                  src={`https://www.youtube.com/embed/${movieTrailerId}`}
                  allowFullScreen
                />
              </Box>
            )}

            {movieDescription && (
              <Box className="border-b-solid border-b-#D5D6DC mb-5 border-b-[1px] pb-5">
                <Heading
                  tag="h2"
                  text="Описание"
                  className="text-black-500 mb-2 text-xl font-semibold leading-tight xl:text-lg xl:leading-tight lg:text-base lg:leading-tight sm:leading-tight"
                />

                <Text className="text-base md:text-sm sm:text-xs">
                  {movieDescription}
                </Text>
              </Box>
            )}

            {movieProduction.length !== 0 && (
              <>
                <Heading
                  tag="h2"
                  text="Производство"
                  className="text-black-500 mb-3 text-xl font-semibold leading-tight xl:text-lg xl:leading-tight lg:text-base lg:leading-tight sm:mb-2 sm:leading-tight"
                />

                {movieProduction.map(({ id, logo_path, name }) => (
                  <Box
                    key={id}
                    className="flex items-center gap-2 [&:not(:last-child)]:mb-3"
                  >
                    {logo_path ? (
                      <Box className="w-10">
                        <Image
                          src={`${IMAGE_URL}${logo_path}`}
                          width="40"
                          height="40"
                          alt={name}
                        />
                      </Box>
                    ) : (
                      <Box className="w-10">
                        <Image
                          src={"/emptyLogoProduction.svg"}
                          width="20"
                          height="20"
                          alt={name}
                        />
                      </Box>
                    )}

                    <Heading
                      tag="h3"
                      text={name}
                      className="text-black-700 text-base font-semibold leading-tight sm:text-sm"
                    />
                  </Box>
                ))}
              </>
            )}
          </Box>
        </>
      )}
    </main>
  );
};

export default MovieDetails;
