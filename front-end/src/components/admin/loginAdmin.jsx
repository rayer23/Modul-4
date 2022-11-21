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
  useDisclosure,
  useColorMode,
  Collapse,
  Avatar,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Swal from "sweetalert2";
import { loginAdmin } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:2000/admins/login";

export default function LoginAdmin() {
  const { username } = useSelector((state) => state.userSlice.value);
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const tokenlocalstorage = localStorage.getItem("tokenAdmin");
  const dispatch = useDispatch();
  const inputUsername = useRef("");
  const inputPASS = useRef("");
  const navigate = useNavigate();

  const onLogin = async (data) => {
    data.preventDefault();
    try {
      const user = {
        password: inputPASS.current.value,
        username: inputUsername.current.value,
      };

      console.log(user);

      const result = await Axios.post(url, user);

      dispatch(
        loginAdmin({
          username: result.data.isUserExist.username,
        })
      );

      localStorage.setItem("tokenAdmin", result.data.token);
      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.response.data}`,
        timer: 1000,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <Box>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Admin Page</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input type="text" ref={inputUsername} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" ref={inputPASS} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {/* <Link color={"blue.400"}>
                    Forgot password?
                    <Badge ml="1" fontSize="0.8em" colorScheme="green">
                      Coming Soon
                    </Badge>
                  </Link> */}
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={onLogin}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}
