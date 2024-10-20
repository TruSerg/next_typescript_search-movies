import Image from "next/image";
import { Box, Text } from "@mantine/core";

import StartSearchingImage from "../../static/img/search-movies-image.png";

const StartSearchingComponent = () => (
  <Box>
    <Image
      className="mb-5"
      src={StartSearchingImage}
      width={400}
      height={400}
      alt="Start searching image"
    />
    <Text
      c="dimmed"
      className="text-center text-2xl font-bold lg:text-xl sm:text-lg"
    >
      Начните поиск фильмов
    </Text>
  </Box>
);

export default StartSearchingComponent;
