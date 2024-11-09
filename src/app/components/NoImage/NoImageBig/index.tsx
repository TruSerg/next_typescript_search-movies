import Image from "next/image";

import NoImage from "../../../static/img/no-image-big.jpg";

const NoImageBig = () => (
  <Image
    className="min-h-[300px] w-full object-cover"
    src={NoImage}
    width="200"
    height="300"
    alt="No image"
  />
);

export default NoImageBig;
