import React from "react";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
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

function LoginPage() {
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
      console.log(result.data);
      dispatch(
        login({
          NIM: result.data.NIM,
          username: result.data.username,
          email: result.data.email,
        })
      );
      localStorage.setItem("token", result.data.token);

      Swal.fire({
        icon: "success",
        title: "Yeay!",
        text: result.data.message,
      });
      setMove(true);
    } catch (err) {
      console.log(err);
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
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>NIM</FormLabel>
            <Input type="email" placeholder="Enter your NIM here" ref={data} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password here"
              ref={password}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
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
            {/* <Button colorScheme={"blue"} variant={"solid"}>
              Sign in
            </Button> */}
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}

export default LoginPage;

{
  /* <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80"
          }
        />
      </Flex> */
}
