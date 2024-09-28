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
  require("dayjs/locale/ru");

  return (
    <Text c={c} className={className}>
      {dayjs(date).locale("ru").format(dateFormat)}
    </Text>
  );
};

export default DateComponent;
