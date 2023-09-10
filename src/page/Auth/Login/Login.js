import { Box, Button, Stack, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Processing from "../../../components/Processing";
import { LOGIN } from "../../../store/actions/user";
import { ERROR } from "../../../store/actions/message";
const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [model, setModel] = useState(false);
  let schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const history = useHistory();
  const handleLogin = () => {
    schema
      .validate(form, { abortEarly: true })
      .then((v) => {
        setModel(true);
        dispatch(
          LOGIN(
            v,
            async () => {
              let config = await window.localStorage.getItem("configuration");
              setModel(false);
              if (config) {
                history.push("/dashboard", { config: JSON.parse(config) });
              } else {
                history.push("/dashboard/project");
              }
            },
            () => {
              setModel(false);
            }
          )
        );
      })
      .catch(({ errors }) => {
        dispatch(ERROR(errors[0]));
      });
  };
  return (
    <div className="login">
      <Processing visible={model} title="Authenticating" />
      <Stack
        direction={["column", "row"]}
        h="100vh"
        alignItems="center"
        justifyContent="flex-start"
      >
        <img
          src="images/pulse-image.png"
          alt="Login"
          style={{ flexGrow: 0.5, height: "100vh" }}
          className="login-img"
        />
        <VStack alignItems="center" style={{ flexGrow: 0.5 }}>
          <Box
            boxShadow="2xl"
            alignSelf="center"
            bg="white"
            style={{ margin: 30, padding: 20 }}
            rounded="2xl"
            // w={{
            //   small: "100vw",
            //   md: "-moz-fit-content",
            //   lg: "-moz-max-content",
            // }}
          >
            <VStack spacing="18px">
              <Text fontSize="4xl" className="title" color="#838383">
                WELCOME TO PULSE
              </Text>
              <Text fontSize="18px" className="sub-title" color="#838383">
                Join our community that have more than 10000 <br />
                subscribers and learn new things everyday
              </Text>
              <Input
                placeholder="User Name"
                variant="filled"
                size="lg"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              <Input
                placeholder="Password"
                variant="filled"
                size="lg"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <Button
                variant="ghost"
                alignSelf="flex-end"
                align="right"
                size="lg"
                onClick={handleLogin}
              >
                Login
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Stack>
    </div>
  );
};

export default Login;
