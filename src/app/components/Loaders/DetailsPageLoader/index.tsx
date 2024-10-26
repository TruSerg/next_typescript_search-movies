import { FC } from "react";
import { Loader } from "@mantine/core";

interface DetailsPageLoaderProps {
  className?: string;
}

const DetailsPageLoader: FC<DetailsPageLoaderProps> = ({ className }) => {
  return <Loader size="md" className={className} color="#9854f6" />;
};

export default DetailsPageLoader;
