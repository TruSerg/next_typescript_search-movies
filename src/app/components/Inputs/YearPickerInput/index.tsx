import { FC, ReactNode } from "react";
import { DateValue, YearPickerInput } from "@mantine/dates";


interface YearPickerComponentProps {
  children?: ReactNode;
  label: string;
  placeholder: string;
  handleChange: (value: DateValue) => void;
}

const YearPickerComponent: FC<YearPickerComponentProps> = ({
  children,
  label,
  placeholder,
  handleChange,
}) => (
  <YearPickerInput
    size="md"
    radius="md"
    minDate={new Date("01.01.1895")}
    maxDate={new Date()}
    rightSection={children}
    label={label}
    placeholder={placeholder}
    onChange={handleChange}
  />
);

export default YearPickerComponent;
