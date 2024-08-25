import { FC } from "react";
import Image from "next/image";
import { Box, Card, Text } from "@mantine/core";

import { IMAGE_URL } from "@/app/const";

import DateComponent from "../../DateComponent";
import RateComponent from "../../RateComponent";
import NoImageBig from "../../NoImage/NoImageBig";

interface MoviesFilterCardProps {
  image: string;
  title: string;
  date: string;
  rate: number;
}

const MoviesFilterCard: FC<MoviesFilterCardProps> = ({
  image,
  title,
  date,
  rate,
}) => (
  <Card radius="md" shadow="sm" padding="none">
    {image ? (
      <Image
        className="h-[300px] w-full"
        src={`${IMAGE_URL}${image}`}
        width={200}
        height={300}
        alt={title}
      />
    ) : (
      <NoImageBig />
    )}

    <Box className="p-2">
      <RateComponent rate={rate} />

      <Text
        fw={600}
        size="md"
        mt="sm"
        className="font-semibold text-purple-500"
      >
        {title}
      </Text>

      <DateComponent
        c="dimmed"
        className=""
        date={date}
        dateFormat={"D MMM, YYYY"}
      />
    </Box>
  </Card>
);

export default MoviesFilterCard;
