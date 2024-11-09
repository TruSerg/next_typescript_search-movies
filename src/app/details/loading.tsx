import { Box } from "@mantine/core";

import CustomLoader from "../components/Loaders/Loader";

const Loading = () => {
  return (
    <Box className="relative min-h-[80vh] w-full">
      <CustomLoader className="absolute left-[50%] top-1/2 mr-[-50%] translate-x-[-50%] translate-y-[-50%]" />
    </Box>
  );
};

export default Loading;
