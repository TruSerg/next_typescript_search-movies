import { FC } from "react";
import { Text } from "@mantine/core";
import moment from "moment";

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
  return (
    <Text c={c} className={className}>
      {moment(date).format(dateFormat)}
    </Text>
  );
};

export default DateComponent;
