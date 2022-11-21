import { Center, Heading } from "@chakra-ui/react";
import { Button, FormControl, Flex, Stack, HStack } from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { Navigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
const url = "http://localhost:2000/users/verification";

export const VerificationPage = () => {
  const params = useParams();
  const [move, setMove] = useState(false);
  const otp1 = useRef("");
  const otp2 = useRef("");
  const otp3 = useRef("");
  const otp4 = useRef("");
  const otp5 = useRef("");
  const otp6 = useRef("");

  const dispatch = useDispatch();

  const onVerification = async () => {
    try {
      const otp = `${otp1.current.value}${otp2.current.value}${otp3.current.value}${otp4.current.value}${otp5.current.value}${otp6.current.value}`;

      const res = await Axios.post(
        url,
        { code_otp: otp },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );

      dispatch(
        login({
          NIM: res.data.NIM,
          username: res.data.username,
          email: res.data.email,
          isVerified: res.data.isVerified,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Success...",
        text: `${res.data.message}`,
      });
      setMove(true);
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

  return move ? (
    <Navigate to="/" />
  ) : (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={"white"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Email
          </Heading>
        </Center>
        <Center fontSize={{ base: "sm", sm: "md" }}>
          We have sent code to your email
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput>
                <PinInputField ref={otp1} />
                <PinInputField ref={otp2} />
                <PinInputField ref={otp3} />
                <PinInputField ref={otp4} />
                <PinInputField ref={otp5} />
                <PinInputField ref={otp6} />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={onVerification}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
