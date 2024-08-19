import { FC } from "react";
import Image from "next/image";
import { Box, Text } from "@mantine/core";

import { shortNum } from "@/app/utils/generatePopularityNumber";

interface RateComponentProps {
  rate: number;
  popularity: number;
}

const RateComponent: FC<RateComponentProps> = ({ rate, popularity }) => (
  <Box className="mb-2 flex items-center gap-2">
    <Box className="flex items-center gap-1">
      <Image src="/rate.svg" width={28} height={28} alt="Rate icon" />
      <Text className="text-base font-semibold">
        {rate % 1 === 0 ? rate : rate.toFixed(1)}
      </Text>
    </Box>
    <Text c="dimmed" className="text-base">
      {`(${shortNum(+popularity.toString().replace(".", ""))})`}
    </Text>
  </Box>
);

export default RateComponent;
