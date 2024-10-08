import { FC } from "react";
import Image from "next/image";

import Heading from "../Heading";

import ErrorImage from "../../static/img/error.png";

interface ErrorComponentProps {
  error: string | string[] | undefined;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
  return (
    <div className="break-word flex flex-col items-center">
      <div className="max-w-[600px] rounded border border-solid border-purple-500 p-5">
        <Heading tag="h2" className="text-red-500" text={`${error}!`} />
      </div>

      <Image src={ErrorImage} width={400} height={400} alt="Error" />
    </div>
  );
};

export default ErrorComponent;
