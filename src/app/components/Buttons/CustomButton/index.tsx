import { FC } from "react";
import { Button } from "@mantine/core";

interface CustomButtonProps {
  variant?: string;
  text: string;
}

const CustomButton: FC<CustomButtonProps> = ({ variant, text }) => {
  return <Button variant={variant}>{text}</Button>;
};

export default CustomButton;
