import { FC } from "react";
import { Loader } from "@mantine/core";

import { useResize } from "@/app/hooks";

interface CustomLoaderProps {
  className?: string;
}

const CustomLoader: FC<CustomLoaderProps> = ({ className }) => {
  const { isScreenSm } = useResize();

  return (
    <Loader
      className={className}
      size={isScreenSm ? "md" : "lg"}
      color="#9854f6"
    />
  );
};

export default CustomLoader;
