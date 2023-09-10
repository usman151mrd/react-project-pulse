import { Box, HStack, Text, Stack } from "@chakra-ui/react";
import React from "react";
import Surface from "../../../common/Surface";
import "./style.css";

const OverView = () => {
  const newIssue = [
    {
      issue: "New Issue",
      total: 232,
    },
    {
      issue: "New Issue",
      total: 232,
    },
    {
      issue: "New Issue",
      total: 232,
    },
    {
      issue: "New Issue",
      total: 232,
    },
  ];
  const list = [
    {
      fixed: 2,
      wont_fixed: 2,
      re_open: 2,
      trace: 2,
    },
    {
      fixed: 2,
      wont_fixed: 2,
      re_open: 2,
      trace: 2,
    },
  ];
  return (
    <div>
      <Stack
        direction={["column", "row"]}
        my={5}
        alignItems="center"
        justifyContent="flex-start"
      >
        <Surface className="issues" w="40%">
          <HStack
            flexWrap="wrap"
            justifyContent="space-evenly"
            alignItems="center"
            spacing="14px"
          >
            {newIssue.map((issue, i) => (
              <Box bg="#1A1E26" key={i} p={3} m={2} rounded="2xl" w={180}>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#EC6666"
                >
                  {issue.total}
                </Text>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#EC6666"
                >
                  {issue.issue}
                </Text>
              </Box>
            ))}
          </HStack>
        </Surface>
        <Surface w="60%">
          {list.map((issue, i) => (
            <HStack justifyContent="space-evenly" key={i} alignItems="center">
              <Box bg="#1A1E26" p={3} m={3} rounded="2xl" w={40}>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#147AD6"
                >
                  {issue.fixed}
                </Text>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#147AD6"
                >
                  Fixed
                </Text>
              </Box>
              <Box bg="#1A1E26" p={3} m={3} rounded="2xl" w={40}>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#147AD6"
                >
                  {issue.wont_fixed}
                </Text>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#147AD6"
                >
                  Wont Fixed
                </Text>
              </Box>
              <Box bg="#1A1E26" p={3} m={3} rounded="2xl" w={40}>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#147AD6"
                >
                  {issue.re_open}
                </Text>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#147AD6"
                >
                  Reopen
                </Text>
              </Box>
              <Box bg="#1A1E26" p={3} m={3} rounded="2xl" w={40}>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#147AD6"
                >
                  {issue.trace}
                </Text>
                <Text
                  fontSize={{ base: "8px", md: "12px", lg: "20px" }}
                  color="#147AD6"
                >
                  Need Trace
                </Text>
              </Box>
            </HStack>
          ))}
        </Surface>
      </Stack>
    </div>
  );
};

export default OverView;
