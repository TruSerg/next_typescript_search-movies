import { FC } from "react";
import { Loader } from "@mantine/core";

interface CustomSelectLoaderProps {
  className?: string;
  size?: number;
}

const SelectLoader: FC<CustomSelectLoaderProps> = ({ className, size }) => {
  return <Loader className={className} size="20" color="#9854f6" />;
};

export default SelectLoader;
