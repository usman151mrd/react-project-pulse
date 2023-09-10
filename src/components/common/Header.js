import { HStack, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaFacebookF,
  FaRedditAlien,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import TagsModal from "../RightPanels/Dashboard/components/TagsModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <HStack spacing="21px" justifyContent="space-around">
        <IconButton
          variant="ghost"
          colorScheme="white"
          aria-label="facebook"
          bg="facebook.500"
          isRound
          size="lg"
          fontSize="2xl"
          onClick={() => {
            setIsOpen(true);
            setType("Facebook");
          }}
          icon={<FaFacebookF />}
        />
        <IconButton
          variant="ghost"
          colorScheme="white"
          aria-label="twitter"
          bg="twitter.500"
          isRound
          size="lg"
          fontSize="2xl"
          onClick={() => {
            setIsOpen(true);
            setType("Twitter");
          }}
          icon={<FaTwitter />}
        />
        <IconButton
          variant="ghost"
          colorScheme="white"
          aria-label="youtube"
          bg="#FF0000"
          isRound
          size="lg"
          fontSize="2xl"
          onClick={() => {
            setIsOpen(true);
            setType("YouTube");
          }}
          icon={<FaYoutube />}
        />
        <IconButton
          variant="ghost"
          colorScheme="white"
          aria-label="reddit"
          bg="#FF5722"
          isRound
          size="lg"
          fontSize="2xl"
          onClick={() => {
            setIsOpen(true);
            setType("Reddit");
          }}
          icon={<FaRedditAlien />}
        />
      </HStack>
      <TagsModal
        isOpen={isOpen}
        onClose={onClose}
        handleButton={() => {}}
        type={type}
      />
    </div>
  );
};

export default Header;
