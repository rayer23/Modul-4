import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
  useColorMode,
  Image,
  FormControl,
  Input,
  Menu,
  MenuDivider,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Link as Link2 } from "react-router-dom";
import NavbarLogin from "./login";
import { Register } from "./register";

import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../redux/userSlice";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { loanDel, loanSync } from "../redux/loanSlice";
import { cartSync, cartDel } from "../redux/cartSlice";

export default function NavbarComp() {
  const { NIM, username, email, isVerified } = useSelector(
    (state) => state.userSlice.value
  );
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  //   const { colorMode, toggleColorMode } = useColorMode();
  const tokenlocalstorage = localStorage.getItem("token");
  const dispatch = useDispatch();
    
  let [token, setToken] = useState("");
  let navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(cartDel())
    dispatch(loanDel())
    localStorage.removeItem("token");
  };

  const onVerification = async () => {
    try {
      const result = await Axios.post("http://localhost:2000/users/changeotp", {
        NIM,
      });
      setToken(result.data.token);
      Swal.fire({
        icon: "success",
        title: "Your verification code already sent to your email.",
        text: `${result.data.message}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
      setTimeout(() => navigate(`/verification/${result.data.token}`), 2000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.name
        ? error.response.data.errors[0].message
        : error.response.data,
        customClass: {
          container: "my-swal",
        },
      });
    }
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          as={Link2}
          to="/"
          flex={{ base: 2 }}
          justify={{ md: "start" }}
          align="center"
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2997/2997509.png"
            w="8"
          />
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            LibraryID
          </Text>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {/* <Button
          onClick={toggleColorMode}
          bg={useColorModeValue("white", "gray.800")}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button> */}

        {tokenlocalstorage ? (
          <Menu>
            <MenuButton
              display={{ base: "none", md: "inline-flex" }}
              as={Button}
              rounded={"full"}
              cursor={"pointer"}
              minW={0}
              p="0"
            >
              <Flex>
                <Avatar name={username} size="md" />
              </Flex>
            </MenuButton>
            <MenuList alignItems={"center"}>
              <MenuItem>{username}</MenuItem>
              <MenuItem>{NIM}</MenuItem>
              <MenuDivider />
              {/* <MenuItem>Profile</MenuItem> */}
              {isVerified ? (
                ""
              ) : (
                <MenuItem onClick={onVerification}>Verification Account</MenuItem>
              )}
              <MenuItem as={Link2} to="/" onClick={onLogout}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Stack
            display={{ base: "none", md: "inline-flex" }}
            justify={"flex-end"}
            direction={"row"}
          >
            <NavbarLogin />
            <Register />
          </Stack>
        )}
        <Flex display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <>
      <Stack direction={"row"} spacing={4}>
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
      </Stack>
    </>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const tokenlocalstorage = localStorage.getItem("token");
  const { NIM, username, email, isVerified } = useSelector(
    (state) => state.userSlice.value
  );
  const dispatch = useDispatch();
  // const inputNIM = useRef("");
  // const inputPASS = useRef("");
  let [token, setToken] = useState("");

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  //   const onLogin = async () => {
  //     try {
  //       const user = {
  //         password: inputPASS.current.value,
  //         NIM: inputNIM.current.value,
  //       };

  //       console.log(user);

  //       const result = await Axios.post(url, user);

  //       dispatch(
  //         login({
  //           NIM: result.data.isUserExist.NIM,
  //           username: result.data.isUserExist.username,
  //           email: result.data.isUserExist.email,
  //         })
  //       );

  //       localStorage.setItem("token", result.data.token);
  //     } catch (err) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: `${err.response.data}`,
  //         timer: 1000,
  //         customClass: {
  //           container: "my-swal",
  //         },
  //       });
  //     }
  //   };

  const onVerification = async () => {
    try {
      const result = await Axios.post("http://localhost:2000/users/changeotp", {
        NIM,
      });
      setToken(result.data.token);
      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: `${result.data.massage}`,
        timer: 2000,
        customClass: {
          container: "my-swal",
        },
      });
      // setTimeout(() => setMove(true), 2000);
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
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        pr={4}
        pl={4}
        display={{ md: "none" }}
      >
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}

        {tokenlocalstorage ? (
          <Menu>
            <MenuButton>
              <Flex>
                <Avatar size="sm" name={username} />
                {/* <Box ml="3">
                  <Text fontWeight="bold">
                    {username} {NIM}
                  </Text>
                </Box> */}
                <MenuItem>{username}</MenuItem>
                <MenuItem>{NIM}</MenuItem>
              </Flex>
            </MenuButton>

            <MenuList alignItems={"center"}>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={onLogout}>Log Out</MenuItem>
              {isVerified ? (
                ""
              ) : (
                <MenuItem onClick={onVerification}>Verification Account</MenuItem>
              )}
            </MenuList>
          </Menu>
        ) : (
          <Stack justify={"flex-end"}>
            <Stack direction="row">
              <NavbarLogin/>
              <Register />
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

const NAV_ITEMS = [
  // {
  //   label: "Inspiration",
  //   children: [
  //     {
  //       label: "Explore Design Work",
  //       subLabel: "Trending Design to inspire you",
  //       href: "/",
  //     },
  //     {
  //       label: "New & Noteworthy",
  //       subLabel: "Up-and-coming Designers",
  //       href: "/",
  //     },
  //   ],
  // },
  // {
  //   label: "Find Work",
  //   children: [
  //     {
  //       label: "Job Board",
  //       subLabel: "Find your dream design job",
  //       href: "/",
  //     },
  //     {
  //       label: "Freelance Projects",
  //       subLabel: "An exclusive list for contract work",
  //       href: "/",
  //     },
  //   ],
  // },
];

