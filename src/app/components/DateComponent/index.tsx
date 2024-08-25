import { FC } from "react";
import { Text } from "@mantine/core";
import dayjs from "dayjs";

interface DateComponentProps {
  c: string;
  className: string;
  date: string;
  dateFormat: string;
}

const DateComponent: FC<DateComponentProps> = ({
  c,
  className,
  date,
  dateFormat,
}) => {
  if (!date) return null;

  return (
    <Text c={c} className={className}>
      {dayjs(date).format(dateFormat)}
    </Text>
  );
};

export default DateComponent;
