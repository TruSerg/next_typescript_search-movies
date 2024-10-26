import { FC } from "react";
import { Loader } from "@mantine/core";

import { useResize } from "@/app/hooks";

interface CustomLoaderProps {
  className?: string;
}

const CustomLoader: FC<CustomLoaderProps> = ({ className }) => {
  return <Loader className={className} size="md" color="#9854f6" />;
};

export default CustomLoader;
