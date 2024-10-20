import { FC } from "react";
import Image from "next/image";
import { Box } from "@mantine/core";

import Heading from "../Heading";

import ErrorImage from "../../static/img/error.png";

interface ErrorComponentProps {
  error: string | string[] | undefined;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
  return (
    <Box className="break-word flex flex-col items-center">
      <Box className="max-w-[600px] rounded border border-solid border-purple-500 p-5 lg:p-4 sm:p-2">
        <Heading
          tag="h2"
          className="text-2xl text-red-500 lg:text-xl sm:text-lg"
          text={`${error}!`}
        />
      </Box>

      <Image src={ErrorImage} width={400} height={400} alt="Error" />
    </Box>
  );
};

export default ErrorComponent;
