import { FC, ReactNode } from "react";
import { Select } from "@mantine/core";

interface SelectProps {
  className?: string;
  children?: ReactNode;
  label?: string;
  data: string[];
  placeholder: string;
  handleChange: (value: string | null) => void;
}

const CustomSelect: FC<SelectProps> = ({
  className,
  children,
  label,
  data,
  placeholder,
  handleChange,
}) => {
  return (
    <Select
      className={className}
      size="md"
      radius="md"
      rightSection={children}
      label={label}
      data={data}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default CustomSelect;
