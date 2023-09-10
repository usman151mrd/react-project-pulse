import { Center, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Sentimental = ({ positive, negative }) => {
  return (
    <div>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2,1fr)",
        }}
        gap={4}
        my={3}
      >
        <GridItem colSpan={1} bg="red.100" rounded="2xl" p={2}>
          <VStack alignItems="center" justifyContent="center">
            <Center>
              <Text fontSize="xl" color="red.400">
                {positive}
              </Text>
            </Center>
            <Center>
              <Text fontSize="xl" color="red.400">
                Positive Sentiment
              </Text>
            </Center>
          </VStack>
        </GridItem>
        <GridItem colSpan={1} bg="teal.100" rounded="2xl" p={2}>
          <VStack alignItems="center" justifyContent="center">
            <Center>
              <Text fontSize="xl" color="teal.600">
                {negative}
              </Text>
            </Center>
            <Center>
              <Text fontSize="xl" color="teal.600">
                Negative Sentiment
              </Text>
            </Center>
          </VStack>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Sentimental;
