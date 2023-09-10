import { HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import React from "react";

const PageTitle = ({ name }) => {
  return (
    <div>
      <HStack>
        <VStack flexGrow={1} spacing="7px" alignItems="flex-start" my={5}>
          <Text fontSize="5xl">{name}</Text>
          <Text fontSize="2xl" color="#6E7371">
            {moment().format("L")}
          </Text>
        </VStack>

      </HStack>
    </div>
  );
};

export default PageTitle;
