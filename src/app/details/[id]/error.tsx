"use client";

import Container from "@/app/components/Container";
import ErrorComponent from "@/app/components/ErrorComponent";

const ErrorWrapper = () => {
  return (
    <Container>
      <div className="flex min-h-[80vh] items-center justify-center pb-[30px] pt-[30px]">
        <ErrorComponent error={"Not found details"} />
      </div>
    </Container>
  );
};

export default ErrorWrapper;
