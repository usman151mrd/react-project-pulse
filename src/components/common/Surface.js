import { Box } from "@chakra-ui/react";
import React from "react";

const Surface = (props) => {
  return (
    <Box bg="#343A40" p={4} rounded="2xl" w="auto" {...props}>
      {props.children}
    </Box>
  );
};

export default Surface;
