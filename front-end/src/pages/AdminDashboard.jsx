import { useEffect, useRef } from "react";
import React from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/listSlice";
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

import { syncName } from "../redux/nameSlice";
import { logoutAdmin } from "../redux/adminSlice";
import { EditIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";

import AllBook from "../components/allbook";
import CreateBook from "../components/admin/createbook";
import Stats from "../components/admin/stats";

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.listSlice.value);
  const data1 = useSelector((state) => state.nameSlice.value);
  const { username } = useSelector((state) => state.adminSlice.value);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const inputTitle = useRef("");
  const inputAuthor = useRef("");
  const inputPublisher = useRef("");
  const inputGenre = useRef("");
  const inputAbstract = useRef("");

  const onLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("tokenAdmin");
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
      const res = await Axios.get(`http://localhost:2000/users/allUser`);
      console.log(res.data);
      dispatch(syncName(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const onDelete = async (id) => {
    try {
      const res = await Axios.delete(`http://localhost:2000/books/${id}`);
      console.log(res);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdate = async (id) => {
    try {
      const updateBook = {
        title: inputTitle.current.value,
        author: inputAuthor.current.value,
        publisher: inputPublisher.current.value,
        genre: inputGenre.current.value,
        sinopsis: inputAbstract.current.value,
      };
      console.log(updateBook);
      let inputFromUser = prompt("Edit Here");
      getData();
      console.log(inputFromUser);

      const res = await Axios.patch(
        `http://localhost:2000/books/${id}`,
        updateBook
      );

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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

                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Stats />

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
                  <Th>Stock</Th>
                  <Th>Images</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              {data.map((item) => {
                return (
                  <Tbody>
                    <Tr>
                      <Td>{item.Title}</Td>
                      <Td>{item.author}</Td>
                      <Td>{item.genre}</Td>
                      <Td>{item.publisher}</Td>
                      <Td>{item.stock}</Td>
                      <Td>
                        <Image w="20px" h="20px" src={item.images}></Image>
                      </Td>
                      <Td>
                        <Flex>
                          <Button
                            colorScheme="teal"
                            onClick={() => onDelete(item.id)}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            colorScheme="teal"
                            display="flex"
                            justifyContent=""
                            onClick={() => onUpdate(item.id)}
                          >
                            <EditIcon />
                          </Button>
                        </Flex>
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
          <CreateBook />

          {/* <UpdateComp /> */}
          <AllBook/>
        </Box>
      </Stack>
    </div>
  );
};

// return (
//   <Flex
//     minH={"100vh"}
//     align={"center"}
//     justify={"center"}
//     bg={useColorModeValue("white.50", "white.800")}
//   >
//     <Stack
//       spacing={4}
//       w={"full"}
//       maxW={"md"}
//       bg={useColorModeValue("white", "white.700")}
//       rounded={"xl"}
//       boxShadow={"lg"}
//       p={6}
//       my={12}
//     >
//       <Heading
//         lineHeight={1.1}
//         fontSize={{ base: "2xl", sm: "3xl" }}
//         textAlign="center"
//       >
//         Update Data Here
//       </Heading>
//       <Flex></Flex>
//       <Flex>
//         <FormControl id="title" isRequired>
//           <FormLabel>Title</FormLabel>
//           <Input
//             _placeholder={{ color: "gray.500" }}
//             type="text"
//             ref={inputTitle}
//           />
//         </FormControl>
//       </Flex>
//       <FormControl id="author" isRequired>
//         <FormLabel>Author</FormLabel>
//         <Input
//           _placeholder={{ color: "gray.500" }}
//           type="author"
//           ref={inputAuthor}
//         />
//       </FormControl>
//       <FormControl id="publisher" isRequired>
//         <FormLabel>Publisher</FormLabel>
//         <Input
//           _placeholder={{ color: "gray.500" }}
//           type="publisher"
//           ref={inputPublisher}
//         />
//       </FormControl>
//       <FormControl id="genre" isRequired>
//         <FormLabel>Genre</FormLabel>
//         <Input
//           _placeholder={{ color: "gray.500" }}
//           type="genre"
//           ref={inputGenre}
//         />
//       </FormControl>
//       <FormControl id="abstract" isRequired>
//         <FormLabel>Abstract</FormLabel>
//         <Textarea _placeholder={{ color: "gray.500" }} ref={inputAbstract} />
//       </FormControl>

//       <Stack spacing={6} direction={["column", "row"]}>
//         <Button
//           bg={"blue.400"}
//           color={"white"}
//           w="full"
//           _hover={{
//             bg: "blue.500",
//           }}
//           onClick={onUpdate}
//         >
//           Submit
//         </Button>
//       </Stack>
//     </Stack>
//   </Flex>
// );
