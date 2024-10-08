import { FC } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Box, Text } from "@mantine/core";

import { IGenre } from "@/app/interfaces/searchMoviesDataInterfaces";

import { IMAGE_URL, TOKEN } from "@/app/const";
import { getTimeFromMins } from "@/app/utils/getTimeFormat";
import { replaceCurrencyByComma } from "@/app/utils/replaceCurrencyByComma";

import Heading from "@/app/components/Heading";
import RateComponent from "@/app/components/RateComponent";
import PopularityComponent from "@/app/components/PopularityComponent";
import DateComponent from "@/app/components/DateComponent";
import NoImageSmall from "@/app/components/NoImage/NoImageSmall";
import VideoComponent from "@/app/components/VideoComponent";

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
  console.log("video: ", video);

  const title = movie.title;
  const image = movie.poster_path;
  const date = movie.release_date;
  const rate = movie.vote_average;
  const popularity = movie.popularity;
  const genresList: IGenre[] = movie.genres;
  const duration = movie.runtime;
  const budget = movie.budget;
  const grossWorldwide = movie.revenue;
  const movieTrailer = video.results ? video.results[1]?.key : null;
  console.log("movieTrailer: ", movieTrailer);

  return (
    <main className="relative m-auto min-h-[80vh] w-full max-w-[1010px] pb-20 pl-[15px] pr-[15px] pt-10 xl:m-0 xl:max-w-full xl:pb-10 xl:pt-5 sm:pt-3">
      <Box className="mb-5 min-h-[400px] rounded-xl bg-white p-6">
        <Box className="grid flex-1 grid-cols-[250px_1fr] gap-4 lg:flex lg:flex-col lg:gap-2">
          {image ? (
            <Image
              className="lg:w-full"
              src={`${IMAGE_URL}${image}`}
              width="250"
              height="352"
              alt={title}
            />
          ) : (
            <NoImageSmall />
          )}

          <Box className="break-word flex flex-col gap-3">
            <Box className="flex items-start justify-between gap-4">
              <Heading
                tag="h2"
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

            <DateComponent
              c="dimmed"
              className="mb-2 text-base sm:mb-1 sm:text-sm"
              date={date}
              dateFormat="YYYY"
            />

            <Box className="mb-2 flex items-center gap-2 sm:mb-1">
              <RateComponent rate={rate} />

              <PopularityComponent rate={rate} popularity={popularity} />
            </Box>

            <ul className="mt-auto flex flex-col gap-3 lg:text-sm">
              <li className="flex gap-3">
                <Text
                  c="dimmed"
                  className="text-md w-full max-w-40 leading-tight lg:text-sm sm:text-xs"
                >
                  Продолжительность
                </Text>

                <Text className="text-md leading-tight lg:text-sm sm:text-xs">
                  {getTimeFromMins(duration)}
                </Text>
              </li>
              <li className="flex gap-3">
                <Text
                  c="dimmed"
                  className="text-md w-full max-w-40 leading-tight lg:text-sm sm:text-xs"
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

              {budget !== 0 && (
                <li className="flex gap-3">
                  <Text
                    c="dimmed"
                    className="text-md w-full max-w-40 leading-tight lg:text-sm sm:text-xs"
                  >
                    Бюджет
                  </Text>

                  <Text className="text-md leading-tight lg:text-sm sm:text-xs">
                    {`$${replaceCurrencyByComma(budget)}`}
                  </Text>
                </li>
              )}

              {grossWorldwide !== 0 && (
                <li className="flex gap-3">
                  <Text
                    c="dimmed"
                    className="text-md w-full max-w-40 leading-tight lg:text-sm sm:text-xs"
                  >
                    Мировые сборы
                  </Text>

                  <Text className="text-md leading-tight lg:text-sm sm:text-xs">
                    {`$${replaceCurrencyByComma(grossWorldwide)}`}
                  </Text>
                </li>
              )}

              <li className="flex gap-3">
                <Text
                  c="dimmed"
                  className="text-md w-full max-w-40 leading-tight lg:text-sm sm:text-xs"
                >
                  Жанр
                </Text>
                <Box className="flex gap-1">
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
            </ul>
          </Box>
        </Box>
      </Box>

      <Box className="min-h-[1189px] rounded-xl bg-white p-6">
        <VideoComponent key={movieTrailer} />
      </Box>
    </main>
  );
};

export default MovieDetails;
