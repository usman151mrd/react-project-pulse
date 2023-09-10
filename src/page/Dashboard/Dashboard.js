import { Box, HStack } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import LeftSidePanel from "../../components/LeftSidePanel";
import NavBar from "../../components/NavBar";
import "./style.css";
const Dashboard = ({ content }) => {
  const history = useHistory();
  if (!localStorage.getItem("Token")) {
    history.push("/");
  }
  return (
    <div>
      <HStack spacing="0px" color="white" alignItems="flex-start" h="100vh">
        <Box className="left-side-panel">
          <LeftSidePanel />
        </Box>
        <Box bg="#212529" className="right-side-panel">
          <HStack bg="#343A40" justifyContent="flex-end">
            <NavBar />
          </HStack>
          <Box m={4}>{content}</Box>
        </Box>
      </HStack>
    </div>
  );
};

export default Dashboard;
