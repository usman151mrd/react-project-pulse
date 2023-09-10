import { Center, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import {
  FaNewspaper,
  FaRedditAlien,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import Surface from "../../../common/Surface";
const Task = ({ data }) => {
  return (
    <div className="task">
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={4}
        my={3}
      >
        <GridItem colSpan={1}>
          <Surface w="100%">
            <VStack>
              <HStack alignItems="center" justifyContent="flex-start" w="100%">
                <FaNewspaper />
                <Text>News</Text>
              </HStack>
              <Center>
                <Text fontSize="6xl" color="facebook.300">
                  {data.news}
                </Text>
              </Center>
              <Center>
                <Text fontSize="3xl" color="facebook.300">
                  Post
                </Text>
              </Center>
            </VStack>
          </Surface>
        </GridItem>
        <GridItem colSpan={1}>
          <Surface w="100%">
            <VStack>
              <HStack alignItems="center" justifyContent="flex-start" w="100%">
                <FaTwitter />
                <Text>Twitter</Text>
              </HStack>
              <Center>
                <Text fontSize="6xl" color="twitter.300">
                  {data.twitter}
                </Text>
              </Center>
              <Center>
                <Text fontSize="3xl" color="twitter.300">
                  Post
                </Text>
              </Center>
            </VStack>
          </Surface>
        </GridItem>
        <GridItem colSpan={1}>
          <Surface w="100%">
            <VStack>
              <HStack alignItems="center" justifyContent="flex-start" w="100%">
                <FaYoutube />
                <Text>YouTube</Text>
              </HStack>
              <Center>
                <Text fontSize="6xl" color="#FF0000">
                  {data.youtube}
                </Text>
              </Center>
              <Center>
                <Text fontSize="3xl" color="#FF0000">
                  Post
                </Text>
              </Center>
            </VStack>
          </Surface>
        </GridItem>
        <GridItem colSpan={1}>
          <Surface w="100%">
            <VStack>
              <HStack alignItems="center" justifyContent="flex-start" w="100%">
                <FaRedditAlien />
                <Text>Reddit</Text>
              </HStack>
              <Center>
                <Text fontSize="6xl" color="#FF5722">
                  {data.reddit}
                </Text>
              </Center>
              <Center>
                <Text fontSize="3xl" color="#FF5722">
                  Post
                </Text>
              </Center>
            </VStack>
          </Surface>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Task;
