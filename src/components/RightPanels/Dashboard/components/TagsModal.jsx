import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  Button,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
const TagsModal = ({ isOpen, onClose, HandleButton, type }) => {
  const [tags, setTags] = useState([]);
  const [text, setText] = useState("");
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Tags for {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              placeholder="Tags"
              variant="filled"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setTags([...tags, event.target.value]);
                  setText("");
                }
              }}
            />
            <HStack spacing={4} my={5} flexWrap="wrap">
              {tags.map((item, i) => (
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
                      setTags(tags.filter((tag) => tag !== item));
                    }}
                  />
                </Tag>
              ))}
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={HandleButton}>
              Search
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TagsModal;
