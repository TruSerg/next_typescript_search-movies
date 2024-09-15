import Image from "next/image";
import { Box, Text } from "@mantine/core";

import StartSearchingImage from "../../static/img/search-movies-image.png";

const StartSearchingComponent = () => (
  <Box className="absolute left-1/2 top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%]">
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
      Start searching movies
    </Text>
  </Box>
);

export default StartSearchingComponent;
