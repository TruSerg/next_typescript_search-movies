import { FC, useEffect } from "react";
import { Box, Card, Text } from "@mantine/core";
import Image from "next/image";

import { IGenre } from "@/app/interfaces/searchMoviesDataInterfaces";

import { useGetMovieGenresQuery } from "@/app/store/movies.api";

import { IMAGE_URL } from "@/app/const";
import { useReplaceGenreId } from "@/app/hooks";

import Heading from "../../Heading";
import DateComponent from "../../DateComponent";
import RateComponent from "../../RateComponent";
import PopularityComponent from "../../PopularityComponent";
import NoImageSmall from "../../NoImage/NoImageSmall";

interface customCardProps {
  image: string;
  title: string;
  rate: number;
  date: string;
  popularity: number;
  list: number[];
}

const MoviesCard: FC<customCardProps> = ({
  image,
  title,
  rate,
  date,
  popularity,
  list,
}) => {
  const { data: genres } = useGetMovieGenresQuery();
  const { genresList, replaceGenreIdToGenreString } = useReplaceGenreId();

  useEffect(() => {
    replaceGenreIdToGenreString(genres as IGenre[], list);
  }, [list]);

  return (
    <li className="flex max-w-[482px] 2xl:max-w-full">
      <Card radius="md" shadow="sm" className="w-full flex-1 sm:p-2">
        <Box className="mb-3 grid flex-1 grid-cols-[119px_1fr] gap-4 lg:mb-2 lg:flex lg:flex-col lg:gap-2 sm:mb-2">
          {image ? (
            <Image
              className="lg:w-full"
              src={`${IMAGE_URL}${image}`}
              width="119"
              height="170"
              alt={title}
            />
          ) : (
            <NoImageSmall />
          )}

          <Box className="word-wrap-[break-word] flex flex-col">
            <Box className="flex items-start justify-between gap-4">
              <Heading
                tag="h2"
                text={title}
                className="mb-2 text-xl font-semibold text-purple-500 xl:text-lg lg:text-base sm:mb-1 sm:text-sm"
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
          </Box>
        </Box>
        <Box className="mt-auto flex flex-wrap gap-x-2 lg:text-sm">
          <Text c="dimmed" className="text-md lg:text-sm sm:text-xs">
            Genres:
          </Text>

          {genresList?.map((genre: string) => (
            <Text
              key={genre}
              className="text-md lg:text-sm sm:text-xs [&:not(:last-child)]:after:content-[',']"
            >
              {genre}
            </Text>
          ))}
        </Box>
      </Card>
    </li>
  );
};

export default MoviesCard;