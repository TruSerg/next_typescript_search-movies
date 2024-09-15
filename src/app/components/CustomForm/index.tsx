import { FC, FormEvent, ReactNode, useEffect } from "react";

interface CustomFormProps {
  id: string;
  className: string;
  children: ReactNode;
  handleSubmit: (e: globalThis.KeyboardEvent) => void;
}

const CustomForm: FC<CustomFormProps> = ({
  children,
  handleSubmit,
  id,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();

        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);

  return (
    <form
      onSubmit={
        handleSubmit as unknown as (e: FormEvent<HTMLFormElement>) => void
      }
      id={id}
      className={className}
    >
      {children}
    </form>
  );
};

export default CustomForm;
