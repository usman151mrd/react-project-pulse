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
        {/* {selected_stock.map((item, i) => (
          <Tag
            size="lg"
            key={i}
            borderRadius="full"
            variant="outline"
            colorScheme="green"
            m={2}
          >
            <TagLabel>{item}</TagLabel>
            <TagCloseButton
              onClick={() => {
                let a = [...selected_stock];
                a = a.filter((tag) => tag !== item);
                dispatch(SET_STOCK(a));
              }}
            />
          </Tag>
        ))} */}
      </HStack>
    </div>
  );
};

export default PageTitle;
