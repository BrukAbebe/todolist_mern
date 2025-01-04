import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const Loading = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    width="100vw"
    position="fixed"
    top="0"
    left="0"
    backgroundColor="white"
    zIndex="9999"
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Box>
);

export default Loading;
