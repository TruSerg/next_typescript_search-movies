import { FC } from "react";
import { Loader } from "@mantine/core";

import { useResize } from "@/app/hooks";

interface CustomLoaderProps {
  className?: string;
  size?: number;
}

const CustomLoader: FC<CustomLoaderProps> = ({ className, size }) => {
  const { isScreenSm, isScreenLg } = useResize();

  return (
    <Loader
      className={className}
      size={
        isScreenSm ? "sm" : "md" ? (isScreenLg ? "md" : "lg") : "lg" ?? size
      }
      color="#9854f6"
    />
  );
};

export default CustomLoader;
