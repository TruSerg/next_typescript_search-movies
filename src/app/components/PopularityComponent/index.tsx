import { FC } from "react";
import { Text } from "@mantine/core";

import { shortNum } from "@/app/utils/generatePopularityNumber";

interface PopularityComponentProps {
  rate: number;
  popularity: number;
}

const PopularityComponent: FC<PopularityComponentProps> = ({
  rate,
  popularity,
}) => {
  if (!rate) return null;
  if (!popularity) return null;

  return (
    <Text c="dimmed" className="text-base sm:text-sm">
      {`(${shortNum(+popularity.toString().replace(".", ""))})`}
    </Text>
  );
};

export default PopularityComponent;
