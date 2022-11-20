import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  Image,
  Collapse,
  Avatar,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Icon,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  CloseIcon,
  HamburgerIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Swal from "sweetalert2";
import { login, logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:2000/admins/login";

export default function LoginAdmin() {
  const { username } = useSelector((state) => state.userSlice.value);
  
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const tokenlocalstorage = localStorage.getItem("token");
  const dispatch = useDispatch();
  const inputUsername = useRef("");
  const inputPASS = useRef("");
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  const onLogin = async () =>
    // data
    {
      // data.preventDefault()
      try {
        const user = {
          password: inputPASS.current.value,
          username: inputUsername.current.value,
        };

        console.log(user);

        const result = await Axios.post(url, user);

        dispatch(
          login({
            username: result.data.isUserExist.username,
            email: result.data.isUserExist.email,
          })
        );

        localStorage.setItem("token", result.data.token);
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
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
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
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
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

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <>
      {/* <Stack direction={"row"} spacing={4}>
          {NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
              <Popover trigger={"hover"} placement={"bottom-start"}>
                <PopoverTrigger>
                  <Link
                    p={2}
                    href={navItem.href ?? "#"}
                    fontSize={"sm"}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: "none",
                      color: linkHoverColor,
                    }}
                  >
                    {navItem.label}
                  </Link>
                </PopoverTrigger>
  
                {navItem.children && (
                  <PopoverContent
                    border={0}
                    boxShadow={"xl"}
                    bg={popoverContentBgColor}
                    p={4}
                    rounded={"xl"}
                    minW={"sm"}
                  >
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </PopoverContent>
                )}
              </Popover>
            </Box>
          ))}
        </Stack> */}
    </>
  );
};

const MobileNav = () => {
  const tokenlocalstorage = localStorage.getItem("token");
  const { username } = useSelector((state) => state.userSlice.value);
  const dispatch = useDispatch();
  const inputUsername = useRef("");
  const inputPASS = useRef("");
  // let [token, setToken] = useState("")

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  const onLogin = async () => {
    try {
      const user = {
        password: inputPASS.current.value,
        username: inputUsername.current.value,
      };

      console.log(user);

      const result = await Axios.post(url, user);

      dispatch(
        login({
          username: result.data.isUserExist.username,
          email: result.data.isUserExist.email,
        })
      );

      localStorage.setItem("token", result.data.token);
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
    <>
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        pr={4}
        pl={4}
        display={{ md: "none" }}
      >
        {tokenlocalstorage ? (
          <Menu>
            <MenuButton>
              <Flex>
                <Avatar
                  size="sm"
                  src="https://avatars.dicebear.com/api/male/username.svg"
                />
                <Box ml="3">
                  <Text fontWeight="bold">{username}</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList alignItems={"center"}>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={onLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Stack justify={"flex-end"}>
            <FormControl id="Username">
              <Input type="text" placeholder="Username" ref={inputUsername} />
            </FormControl>
            <FormControl id="Password">
              <Input type="password" placeholder="Password" ref={inputPASS} />
            </FormControl>

            <Stack direction="row">
              <Button fontSize={"sm"} fontWeight={600} onClick={onLogin}>
                Sign In
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? "#"}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Stack
            pl={4}
            borderLeft={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
            align={"start"}
          >
            {children &&
              children.map((child) => (
                <Link key={child.label} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    </>
  );
};


