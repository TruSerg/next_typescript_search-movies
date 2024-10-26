import { FC } from "react";
import Image from "next/image";
import { Box, Text } from "@mantine/core";

interface RateComponentProps {
  rate: number;
}

const RateComponent: FC<RateComponentProps> = ({ rate }) => {
  if (!rate) return null;

  return (
    <Box className="flex items-center gap-1">
      <Box className="sm:h-5 sm:w-5">
        <Image src="/rate.svg" width="28" height="28" alt="Rate icon" />
      </Box>

      <Text className="text-base font-semibold sm:text-sm">
        {rate % 1 === 0 ? rate : rate?.toFixed(1)}
      </Text>
    </Box>
  );
};

export default RateComponent;
