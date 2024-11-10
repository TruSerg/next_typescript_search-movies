"use client";
import { Box } from "@mantine/core";

import Container from "@/app/components/Container";
import ErrorComponent from "@/app/components/ErrorComponent";

const ErrorWrapper = () => {
  return (
    <Container>
      <Box className="pl-[15px] pr-[15px]">
        <ErrorComponent error="Not found details" />
      </Box>
    </Container>
  );
};

export default ErrorWrapper;
