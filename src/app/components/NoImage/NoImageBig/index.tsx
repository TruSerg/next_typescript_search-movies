import Image from "next/image";
import { Box } from "@mantine/core";

import NoImage from "../../../static/img/no-image-big.jpg";

const NoImageBig = () => (
  <Image
    className="h-[300px] w-full"
    src={NoImage}
    width={200}
    height={300}
    alt="No image"
  />
);

export default NoImageBig;
