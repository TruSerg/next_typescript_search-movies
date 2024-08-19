import { FC, FormEvent, ReactNode } from "react";

interface CustomFormProps {
  id: string;
  className: string;
  children: ReactNode;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CustomForm: FC<CustomFormProps> = ({
  children,
  handleSubmit,
  id,
  className,
}) => {
  return (
    <form onSubmit={handleSubmit} id={id} className={className}>
      {children}
    </form>
  );
};

export default CustomForm;
