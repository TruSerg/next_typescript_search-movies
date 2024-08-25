import { FC, FormEvent } from "react";
import { UnstyledButton } from "@mantine/core";

interface CustomButtonProps {
  text: string;
  className: string;
  handleClick?: (e: FormEvent<HTMLFormElement>) => void;
}

const UnstyleButton: FC<CustomButtonProps> = ({
  text,
  className,
  handleClick,
}) => {
  return (
    <UnstyledButton onClick={handleClick} className={className}>
      {text}
    </UnstyledButton>
  );
};

export default UnstyleButton;
