import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "@mantine/core";

import { VT323 } from "next/font/google";

import Heading from "../Heading";
import ErrorImage from "../../static/img/error.png";

const vt323 = VT323({
  weight: ["400"],
  subsets: ["latin"],
});

interface ErrorComponentProps {
  error: string | string[] | undefined;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
  const pathname = usePathname();

  return (
    <Box className="absolute left-[50%] top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%] text-center">
      <Image src={ErrorImage} width="656" height="51" alt="Error" />
      <Box className="text-7xl md:text-6xl sm:text-5xl">
        <span className={vt323.className}>ERROR</span>
      </Box>

      <Image src={ErrorImage} width="656" height="51" alt="Error" />

      <Box className="w-full max-w-[656px] p-5 text-center lg:p-4 sm:p-2">
        <Heading
          tag="h2"
          className="mb-4 text-xl font-semibold text-black sm:text-lg"
          text={`${error}`}
        />

        {pathname !== "/" ? (
          <Link
            href="/"
            className="whitespace-nowrap rounded-lg bg-purple-500 p-[10px] text-base font-bold text-white transition delay-150 ease-in-out hover:bg-purple-600 sm:p-2 sm:text-sm"
          >
            На главную
          </Link>
        ) : null}
      </Box>
    </Box>
  );
};

export default ErrorComponent;
