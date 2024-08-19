import { ReactNode, FC } from "react";
import { Box } from "@mantine/core";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <Box className="m-auto max-w-[1470px] pl-[15px] pr-[15px]">{children}</Box>
  );
};

export default Container;
