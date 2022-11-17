import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Axios from "axios";
// import { Field, Formik } from "formik";
import Swal from "sweetalert2";
// import redux from "@reduxjs/toolkit";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { Navigate } from "react-router-dom";
const url = "http://localhost:2000/users/login";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const data = useRef("");
  const password = useRef("");
  const [move, setMove] = useState(false);
  const onLogin = async (values) => {
    try {
      const user = {
        data: data.current.value,
        password: password.current.value,
      };
      console.log(user);
      const result = await Axios.post(url, user);
      console.log(result);
      dispatch(login(result.data.user)); //Result.data.user= {username, NIM}

      Swal.fire({
        icon: "success",
        title: "Yeay!",
        text: result.data.message,
      });
      setMove(true);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.data,
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  return move ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            and bask in the glory of knowledge
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          // bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="NIM">
              <FormLabel>NIM</FormLabel>
              <Input
                // as={Field}
                name="NIM"
                placeholder="Enter your email here"
                ref={data}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                // as={Field}
                name="password"
                placeholder="Enter your password here"
                ref={password}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                type="submit"
                onClick={onLogin}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
