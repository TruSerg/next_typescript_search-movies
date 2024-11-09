import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Card } from "@mantine/core";

import { IMAGE_URL } from "@/app/const";

import DateComponent from "../../DateComponent";
import RateComponent from "../../RateComponent";
import NoImageBig from "../../NoImage/NoImageBig";
import Heading from "../../Heading";

interface MoviesFilterCardProps {
  link: string;
  classNameText?: string;
  image: string;
  title: string;
  date?: string;
  rate: number;
}

const MoviesFilterCard: FC<MoviesFilterCardProps> = ({
  link,
  image,
  title,
  date,
  rate,
}) => (
  <Link href={link} className="flex">
    <Card className="relative w-full" radius="md" shadow="sm" padding="none">
      {image ? (
        <Image
          className="w-full"
          src={`${IMAGE_URL}${image}`}
          width="150"
          height="250"
          alt={title}
        />
      ) : (
        <NoImageBig />
      )}

      <Box className="flex h-full flex-col p-2">
        <Box className="mb-2">
          <RateComponent rate={rate} />
        </Box>

        <Heading
          tag="h2"
          text={title}
          className="break-word mb-2 text-xl font-semibold leading-tight text-purple-500 2xl:text-lg xl:leading-tight lg:text-base lg:leading-tight sm:mb-1 sm:text-sm sm:leading-tight"
        />

        {date ? (
          <DateComponent
            c="dimmed"
            className="mt-auto text-base lg:text-sm sm:mb-1 sm:text-xs"
            date={date}
            dateFormat={"D MMM YYYY"}
          />
        ) : null}
      </Box>
      <Box className="absolute left-0 top-0 flex-shrink-0 cursor-pointer p-3">
        <Image
          className="sm:h-5 sm:w-5"
          src="/emptyRate.svg"
          width="25"
          height="25"
          alt="Empty rate icon"
        />
      </Box>
    </Card>
  </Link>
);

export default MoviesFilterCard;
