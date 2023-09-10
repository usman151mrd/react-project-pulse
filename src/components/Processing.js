import {
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { CircularProgress } from "@material-ui/core";
import React from "react";
const Processing = ({ visible, title }) => {
  return (
    <div>
      <Modal isOpen={visible}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={5} width="auto">
            <HStack justifyContent="center">
              <CircularProgress color="secondary" />
              <Text fontSize="xl">{title}</Text>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Processing;
