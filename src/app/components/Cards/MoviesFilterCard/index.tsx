import { FC } from "react";
import Image from "next/image";
import { Box, Card, Text } from "@mantine/core";

import { IMAGE_URL } from "@/app/const";

import DateComponent from "../../DateComponent";
import RateComponent from "../../RateComponent";
import NoImageBig from "../../NoImage/NoImageBig";

interface MoviesFilterCardProps {
  className?: string;
  classNameText?: string;
  image: string;
  title: string;
  date?: string;
  rate: number;
  width: number;
  height: number;
}

const MoviesFilterCard: FC<MoviesFilterCardProps> = ({
  className,
  classNameText,
  image,
  title,
  date,
  rate,
  width,
  height,
}) => (
  <Card className={className} radius="md" shadow="sm" padding="none">
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

      <Text fw={600} className={classNameText}>
        {title}
      </Text>

      {date ? (
        <DateComponent
          c="dimmed"
          className="text-base sm:mb-1 sm:text-sm"
          date={date}
          dateFormat={"D MMM, YYYY"}
        />
      ) : null}
    </Box>
  </Card>
);

export default MoviesFilterCard;
