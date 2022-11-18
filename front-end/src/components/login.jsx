import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

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
  HStack,
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

function NavbarLogin() {
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
          NIM: result.data.user.NIM,
          username: result.data.user.username,
          email: result.data.user.email,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack bg="white">
        <Button
          onClick={onOpen}
          fontSize={"sm"}
          fontWeight={600}
          color={"white"}
          bg={"blue.500"}
        >
          Sign In
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign in</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {" "}
              <FormControl id="email">
                <FormLabel>NIM</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your NIM here"
                  ref={data}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password here"
                  ref={password}
                />
              </FormControl>
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
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
    </>
  );
}

export default NavbarLogin;
