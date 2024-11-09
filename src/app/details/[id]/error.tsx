"use client";
import { Box } from "@mantine/core";

import Container from "@/app/components/Container";
import ErrorComponent from "@/app/components/ErrorComponent";

const ErrorWrapper = () => {
  return (
    <Container>
      <Box className="flex min-h-[80vh] items-center justify-center pb-[30px] pl-[15px] pr-[15px] pt-[30px]">
        <ErrorComponent error={"Not found details"} />
      </Box>
    </Container>
  );
};

export default ErrorWrapper;
