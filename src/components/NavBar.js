import {
  Avatar,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useHistory } from "react-router-dom";
const NavBar = () => {
  const history = useHistory();
  return (
    <div style={{ margin: 12, marginRight: 50 }}>
      <Popover>
        <PopoverTrigger>
          <Avatar
            size="lg"
            name="Segun Adebayo"
            src="https://image.flaticon.com/icons/png/512/3237/3237472.png"
          />
        </PopoverTrigger>
        <PopoverContent color="black" justifyContent="flex-start" w="auto">
          <PopoverArrow />
          <PopoverBody>
            <Button
              variant="ghost"
              width="100%"
              justifyContent="flex-start"
              leftIcon={<IoLogOutOutline size={26} />}
              _hover={{ bg: "gray.400", color: "white" }}
              onClick={() => {
                history.push("/");
              }}
            >
              Log Out
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NavBar;
