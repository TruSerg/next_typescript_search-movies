import { FC, ReactNode } from "react";
import { Select } from "@mantine/core";

interface SelectProps {
  clearable?: boolean;
  className?: string;
  rightSection?: ReactNode;
  label?: string;
  data: string[] | undefined;
  value?: string;
  placeholder: string;
  handleChange: (value: string | null) => void;
}

const CustomSelect: FC<SelectProps> = ({
  clearable,
  className,
  rightSection,
  label,
  data,
  value,
  placeholder,
  handleChange,
}) => {
  return (
    <Select
      clearable={clearable}
      className={className}
      size="md"
      radius="md"
      rightSection={rightSection}
      label={label}
      data={data}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default CustomSelect;
