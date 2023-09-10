import {
  Text,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FaNewspaper,
  FaRedditAlien,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NEW_PROJECT } from "../store/actions/project";
import Processing from "./Processing";

const LeftSidePanel = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    keyword: "",
  });
  const default_project = useSelector((state) => state.Project.default);
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const list = [
    {
      image: "/images/dashboard.svg",
      alt: "dashboard",
      name: "Dashboard",
      onClick: () =>
        history.push("/dashboard", {
          config: default_project,
        }),
    },
    {
      image: "/images/project.svg",
      alt: "project",
      name: "Project",
      onClick: () => history.push("/dashboard/project"),
    },
    {
      image: "/images/project.svg",
      alt: "new project",
      name: "New Project",
      onClick: () => setIsOpen(true),
    },
    // {
    //   image: "/images/analytics.svg",
    //   alt: "analytics",
    //   name: "Analytics",
    //   onClick: () => {},
    // },
    {
      image: "/images/stocks.svg",
      alt: "stocks",
      name: "Stocks",
      onClick: () => history.push("/dashboard/stocks"),
    },
  ];
  return (
    <div>
      <VStack spacing="14px" m={7}>
        {list.map((item, i) => (
          <Button
            key={i}
            spacing="10px"
            align="center"
            flexDirection="column"
            width="full"
            h="full"
            fontSize={{ base: "24px", md: "40px", lg: "56px" }}
            bg="transparent"
            p={3}
            _hover={{ bg: "gray.900" }}
            onClick={item.onClick}
          >
            <img
              src={item.image}
              style={{ width: 40, height: 40 }}
              alt={item.alt}
            />
            <Text fontSize={{ base: "10px", md: "12px", lg: "18px" }}>
              {item.name}
            </Text>
          </Button>
        ))}
      </VStack>
      <Text align="left" ml={2}>
        Social Sites
      </Text>
      <Divider w="unset" m={2} />
      <Button
        variant="ghost"
        colorScheme="white"
        aria-label="facebook"
        bg="facebook.500"
        width="90%"
        m={2}
        onClick={() => history.push("/social-media/news", { name: "News" })}
        leftIcon={<FaNewspaper size={20} />}
      >
        News
      </Button>
      {/*<Button*/}
      {/*  variant="ghost"*/}
      {/*  colorScheme="white"*/}
      {/*  aria-label="twitter"*/}
      {/*  bg="twitter.500"*/}
      {/*  width="90%"*/}
      {/*  m={2}*/}
      {/*  onClick={() =>*/}
      {/*    history.push("/social-media/twitter", { name: "Twitter" })*/}
      {/*  }*/}
      {/*  leftIcon={<FaTwitter size={20} />}*/}
      {/*>*/}
      {/*  Twitter*/}
      {/*</Button>*/}
      <Button
        variant="ghost"
        colorScheme="white"
        aria-label="youtube"
        bg="#FF0000"
        width="90%"
        m={2}
        onClick={() =>
          history.push("/social-media/youtube", { name: "YouTube" })
        }
        leftIcon={<FaYoutube size={20} />}
      >
        YouTube
      </Button>
      <Button
        variant="ghost"
        colorScheme="white"
        aria-label="reddit"
        bg="#FF5722"
        width="90%"
        m={2}
        onClick={() => history.push("/social-media/reddit", { name: "Reddit" })}
        leftIcon={<FaRedditAlien size={20} />}
      >
        Reddit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              placeholder="Title"
              variant="filled"
              my={4}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
              }}
            />
            <Input
              placeholder="Keyword"
              variant="filled"
              my={4}
              onChange={(e) => setForm({ ...form, keyword: e.target.value })}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setModel(true);

                dispatch(
                  NEW_PROJECT(
                    form,
                    () => {
                      setIsOpen(false);
                      setModel(false);
                    },
                    () => {
                      setModel(false);
                    }
                  )
                );
              }}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Processing visible={model} title="Adding New Project" />
    </div>
  );
};

export default LeftSidePanel;
