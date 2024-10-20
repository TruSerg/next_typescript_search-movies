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
  width: number;
  height: number;
}

const MoviesFilterCard: FC<MoviesFilterCardProps> = ({
  link,
  image,
  title,
  date,
  rate,
  width,
  height,
}) => (
  <Link href={link} className='flex'>
    <Card className="w-full" radius="md" shadow="sm" padding="none">
      {image ? (
        <Image
          src={`${IMAGE_URL}${image}`}
          width={width}
          height={height}
          alt={title}
        />
      ) : (
        <NoImageBig />
      )}

      <Box className="p-2">
        <Box className="mb-2">
          <RateComponent rate={rate} />
        </Box>

        <Heading
          tag="h2"
          text={title}
          className="mb-2 break-all text-xl font-semibold leading-tight text-purple-500 xl:text-lg xl:leading-tight lg:text-base lg:leading-tight sm:mb-1 sm:text-sm sm:leading-tight"
        />

        {date ? (
          <DateComponent
            c="dimmed"
            className="text-base lg:text-sm sm:mb-1 sm:text-xs"
            date={date}
            dateFormat={"D MMM YYYY"}
          />
        ) : null}
      </Box>
    </Card>
  </Link>
);

export default MoviesFilterCard;
