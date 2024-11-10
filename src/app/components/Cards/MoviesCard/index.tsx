import { FC, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Card, Text } from "@mantine/core";

import { IGenre } from "@/app/interfaces/searchMoviesDataInterfaces";

import { useGetMovieGenresQuery } from "@/app/store/movies.api";

import { IMAGE_URL } from "@/app/const";
import { useReplaceGenreId, useResize } from "@/app/hooks";

import Heading from "../../Heading";
import DateComponent from "../../DateComponent";
import RateComponent from "../../RateComponent";
import PopularityComponent from "../../PopularityComponent";
import NoImageSmall from "../../NoImage/NoImageSmall";
import NoImageBig from "../../NoImage/NoImageBig";

interface customCardProps {
  link: string;
  image: string;
  title: string;
  rate: number;
  date: string;
  popularity: number;
  list: number[];
}

const MoviesCard: FC<customCardProps> = ({
  link,
  image,
  title,
  rate,
  date,
  popularity,
  list,
}) => {
  const { data: genres } = useGetMovieGenresQuery();
  const { genresList, replaceGenreIdToGenreString } = useReplaceGenreId();

  const { isScreenLg } = useResize();

  useEffect(() => {
    replaceGenreIdToGenreString(genres as IGenre[], list);
  }, [list]);

  return (
    <Link href={link} className="flex max-w-[482px] 2xl:max-w-full">
      <Card radius="md" shadow="sm" className="relative w-full flex-1 sm:p-2">
        <Box className="grid flex-1 grid-cols-[119px_1fr] gap-4 lg:flex lg:flex-col lg:gap-2">
          {image ? (
            <Image
              className="lg:w-full"
              src={`${IMAGE_URL}${image}`}
              width="119"
              height="170"
              alt={title}
            />
          ) : isScreenLg ? (
            <NoImageBig />
          ) : (
            <NoImageSmall />
          )}

          <Box className="break-word flex h-full flex-col">
            <Box className="flex items-start justify-between gap-4">
              <Heading
                tag="h2"
                text={title}
                className="mb-2 text-xl font-semibold leading-tight text-purple-500 xl:text-lg xl:leading-tight lg:text-base lg:leading-tight sm:mb-1 sm:text-sm sm:leading-tight"
              />
              <Box className="flex-shrink-0 cursor-pointer lg:absolute lg:left-4 lg:top-4 lg:p-3 sm:left-1 sm:top-1">
                <Image
                  className="sm:h-5 sm:w-5"
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

            {genresList ? (
              <>
                <Box className="mt-auto flex flex-wrap gap-x-1 lg:text-sm">
                  <Text
                    c="dimmed"
                    className="text-md leading-tight lg:text-sm sm:text-xs"
                  >
                    Жанр:
                  </Text>

                  {genresList?.map((genre: string) => (
                    <Text
                      key={genre}
                      className="text-md leading-tight first-letter:uppercase lg:text-sm sm:text-xs [&:not(:last-child)]:after:content-[',']"
                    >
                      {genre}
                    </Text>
                  ))}
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </Card>
    </Link>
  );
};

export default MoviesCard;
