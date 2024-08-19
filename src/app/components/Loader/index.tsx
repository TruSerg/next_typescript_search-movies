import { FC } from "react";
import { Loader } from "@mantine/core";

interface CustomLoaderProps {
  className?: string;
  size: number;
}

const CustomLoader: FC<CustomLoaderProps> = ({ className, size }) => (
  <Loader className={className} size={size} color="#9854f6" />
);

export default CustomLoader;
