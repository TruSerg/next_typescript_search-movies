import Image from "next/image";

import NoImage from "../../../static/img/no-image-big.jpg";

const NoImageBig = () => (
  <Image
    className="flex w-full"
    src={NoImage}
    width={200}
    height={300}
    alt="No image"
  />
);

export default NoImageBig;
