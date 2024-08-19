import { FC, useEffect } from "react";
import { Box, Card, Text } from "@mantine/core";
import Image from "next/image";

import { IGenre } from "@/app/interfaces/searchMoviesDataInterfaces";

import { useGetMovieGenresQuery } from "@/app/store/movies.api";

import { IMAGE_URL } from "@/app/const";
import { useReplaceGenreId } from "@/app/hooks";

import Heading from "../Heading";
import DateComponent from "../DateComponent";
import RateComponent from "../RateComponent";
import NoImageComponent from "../NoImageComponent";

interface customCardProps {
  image: string;
  title: string;
  rate: number;
  date: string;
  popularity: number;
  list: number[];
}

const CustomCard: FC<customCardProps> = ({
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
    <li className="flex max-w-[482px]">
      <Card radius="md" shadow="sm" className="w-full flex-1">
        <Box className="grid flex-1 grid-cols-[119px_1fr_26px] gap-4">
          {image ? (
            <Image
              src={`${IMAGE_URL}${image}`}
              width="119"
              height="170"
              alt={title}
            />
          ) : (
            <NoImageComponent />
          )}

          <Box className="word-wrap-[break-word] flex flex-col">
            <Heading
              tag="h2"
              text={title}
              className="mb-2 text-xl font-semibold text-purple-500"
            />

            {date ? (
              <DateComponent
                c="dimmed"
                className="mb-2 text-base"
                date={date}
                dateFormat={"YYYY"}
              />
            ) : null}

            {rate > 0 ? (
              <RateComponent rate={rate} popularity={popularity} />
            ) : null}

            <Box className="mt-auto flex flex-wrap gap-x-2">
              <Text c="dimmed" className="text-base">
                Genres:
              </Text>

              {genresList?.map((genre: string) => (
                <Text
                  key={genre}
                  className="text-base [&:not(:last-child)]:after:content-[',']"
                >
                  {genre}
                </Text>
              ))}
            </Box>
          </Box>

          <Box className="items-end">
            <Image
              src="/emptyRate.svg"
              width="25"
              height="25"
              alt="Empty rate icon"
            />
          </Box>
        </Box>
      </Card>
    </li>
  );
};

export default CustomCard;
