import { useEffect } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/listSlice";
// import { addNew, edit, remove } from "../redux/editSlice";
import {
  Image,
  Button,
  Box,
  Text,
  Icon,
  Flex,
  Center,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuDivider,
  MenuItem,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";
import StatsComp from "../components/admin/stats";
import { syncName } from "../redux/nameSlice";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import AllBook from "../components/allbook";


export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.listSlice.value);
  const data1 = useSelector((state) => state.nameSlice.value);
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const getData = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/books`);
      console.log(res.data);
      dispatch(syncData(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getUser = async () => {
    try {
      const res = await Axios.get(`http://localhost:2000/users/alluser`);
      console.log(res.data);
      dispatch(syncName(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Admin</Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {/* <MenuItem>Your Servers</MenuItem> */}
                  {/* <MenuItem>Account Settings</MenuItem> */}
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <StatsComp />
      <Stack mt="20px" mb="20px" ml="20px" mr="20px">
        <Box m="20px">
          <Heading align="center">Books</Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Author</Th>
                  <Th>Genre</Th>
                  <Th>Publisher</Th>
                  <Th>Images</Th>
                </Tr>
              </Thead>
              {data.map((item) => {
                return (
                  <Tbody>
                    <Tr>
                      <Td>{item.title}</Td>
                      <Td>{item.author}</Td>
                      <Td>{item.genre}</Td>
                      <Td>{item.publisher}</Td>
                      <Td>
                        <Image w="20px" h="20px" src={item.images}></Image>
                      </Td>
                    </Tr>
                  </Tbody>
                );
              })}
            </Table>
          </TableContainer>

          <Heading align={"center"}>Users</Heading>
          <TableContainer>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>NIM</Th>
                  <Th>Username</Th>
                  <Th>Email</Th>
                  <Th>Password</Th>
                </Tr>
              </Thead>
              {data1.map((item) => {
                return (
                  <Tbody>
                    <Tr>
                      <Td>{item.NIM}</Td>
                      <Td>{item.username}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.password}</Td>
                    </Tr>
                  </Tbody>
                );
              })}
            </Table>
          </TableContainer>
          <AllBook />
        </Box>
      </Stack>
    </div>
  );
};
