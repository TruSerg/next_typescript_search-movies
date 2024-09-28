import { FC, FormEvent } from "react";
import { UnstyledButton } from "@mantine/core";

interface CustomButtonProps {
  text: string;
  className: string;
  // handleClick?: (e: FormEvent<HTMLFormElement>) => void;
}

const UnstyleButton: FC<CustomButtonProps> = ({ text, className }) => {
  return <UnstyledButton className={className}>{text}</UnstyledButton>;
};

export default UnstyleButton;
