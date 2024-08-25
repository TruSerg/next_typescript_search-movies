
import { useState } from "react";
import dayjs from "dayjs";
import { DateValue } from "@mantine/dates";

const useInput = () => {
  const [yearPickerValue, setYearPickerValue] = useState<number>(0);

  const handleYearPickerValue = (value: DateValue) => {
    const year = dayjs(value).year();

    setYearPickerValue(year);
  };

  return { yearPickerValue, handleYearPickerValue };
};

export default useInput;
