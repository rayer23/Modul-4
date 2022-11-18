// import { useState } from "react";
import React, { useEffect } from "react";
import {
  Input,
  Button,
  FormLabel,
  VStack,
  FormControl,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalBody,
  Center,
  HStack,
  ModalCloseButton,
} from "@chakra-ui/react";
import Axios from "axios";
import * as Yup from "yup";
import { Field, ErrorMessage, Formik, Form } from "formik";
import Swal from "sweetalert2";
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const url = "http://localhost:2000/users/register";

export const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const registerSchema = Yup.object().shape({
    NIM: Yup.string().required(),
    username: Yup.string().required().min(5, "Username  min 5 Character"),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8, "Password min 8 Character"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Confirm password is not same as your password"
    ),
  });

  const onRegister = async (data) => {
    try {

      if (data.password !== data.confirmPassword) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "Your password is not match",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });
      }

      const result = await Axios.post(url, data);

      dispatch(
        login({
          NIM: result.data.NIM,
          username: result.data.username,
          email: result.data.email,
          isVerified: result.data.isVerified,

        })
      );

      localStorage.setItem("token", result.data.token);

      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: `${result.data.message}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

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
          Sign Up
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay zIndex="1000" />
          <ModalContent>
            <ModalHeader>
              <Center>Register Form</Center>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Formik
                initialValues={{
                  password: "",
                  username: "",
                  email: "",
                  confirmPassword: "",
                  NIM: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values, action) => {
                  onRegister(values);
                  action.setFieldValue("username", "");
                  action.setFieldValue("password", "");
                  action.setFieldValue("email", "");
                  action.setFieldValue("confirmPassword", "");
                  action.setFieldValue("NIM", "");
                }}
              >
                {(props) => {
                  return (
                    <>
                      <Form>
                        <VStack spacing={4} align="flex-start">
                          <FormControl>
                            <FormLabel htmlFor="NIM">NIM</FormLabel>
                            <Field
                              as={Input}
                              type="text"
                              name="NIM"
                              variant="filled"
                            />
                            <ErrorMessage
                              style={{ color: "red" }}
                              component="div"
                              name="NIM"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Field
                              as={Input}
                              type="text"
                              name="username"
                              variant="filled"
                            />
                            <ErrorMessage
                              style={{ color: "red" }}
                              component="div"
                              name="username"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Field
                              as={Input}
                              type="email"
                              name="email"
                              variant="filled"
                            />
                            <ErrorMessage
                              style={{ color: "red" }}
                              component="div"
                              name="email"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Field
                              as={Input}
                              type="password"
                              name="password"
                              variant="filled"
                            />
                            <ErrorMessage
                              component="div"
                              name="password"
                              style={{ color: "red" }}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Confirmation Password</FormLabel>
                            <Field
                              as={Input}
                              type="password"
                              name="confirmPassword"
                              variant="filled"
                            />
                            <ErrorMessage
                              component="div"
                              name="confirmPassword"
                              style={{ color: "red" }}
                            />
                          </FormControl>
                          <ModalFooter>
                            <Button type="submit" colorScheme="blue" mr={3}>
                              Sign up
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                          </ModalFooter>
                        </VStack>
                      </Form>
                    </>
                  );
                }}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
    </>
  );
};
