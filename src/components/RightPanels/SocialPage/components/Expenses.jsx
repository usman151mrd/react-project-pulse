import { Text } from "@chakra-ui/react";
import React from "react";
import Surface from "../../../common/Surface";
const Expenses = ({ data, title }) => {
  return (
    <div style={{ width: "100%" }}>
      <Surface w="full">
        <Text fontSize="xl" textAlign="left">
          {title}
        </Text>
        <Text fontSize="xl" color="white" textAlign="left" mt={5}>
          {data}
        </Text>
        {/* <HStack mt={2} spacing="0px">
          <AiOutlineRise color="#30A330" />
          <Text color="#30A330">2 </Text>
          <Text fontSize="sm" color="#838383" style={{ marginLeft: 7 }}>
            Below Projected
          </Text>
        </HStack> */}
      </Surface>
    </div>
  );
};

export default Expenses;
