import Image from "next/image";
import { Box } from "@mantine/core";

import NoImage from "../../../static/img/no-image.jpg";

const NoImageSmall = () => (
  <Box className="flex">
    <Image src={NoImage} width="119" height="170" alt="No image" />
  </Box>
);

export default NoImageSmall;
