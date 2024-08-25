import { FC } from "react";
import { Button } from "@mantine/core";

interface CustomButtonProps {
  variant?: string;
  text: string;
  handleClick: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({
  variant,
  text,
  handleClick,
}) => {
  return (
    <Button onClick={handleClick} variant={variant}>
      {text}
    </Button>
  );
};

export default CustomButton;
