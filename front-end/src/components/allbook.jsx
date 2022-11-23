import {

  Box,
  Button,
  Icon,
  Text,
  useToast,
  Image,
  Stack,
  Flex,
  FormControl,
  Select,
  InputGroup,
  Input,
  InputRightElement,
  FormHelperText,
  Tooltip,
  useColorModeValue,
  Center,
  FormLabel,
} from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";

import Axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { syncData } from "../redux/bookSlice";
import { RiSearchEyeFill, RiRestartFill } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Allbook() {
  const { NIM, isVerified, cart } = useSelector(
    (state) => state.userSlice.value
  );
  const [limit, setLimit] = useState(10);
  const [searchProduct, setSearchProduct] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [order, setOrder] = useState("title");
  const [order_direction, setOrder_direction] = useState("ASC");
  const [idbook, setIdbook] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.bookSlice.value);
  const url = `http://localhost:2000/books/search?search_query=${searchProduct}&page=${
    page - 1
  }&limit=${limit}&order=${order ? order : `id`}&order_direction=${
    order_direction ? order_direction : "ASC"
  }`;

  const getData = async () => {
    try {
      const res = await Axios.get(url);
      dispatch(syncData(res.data.result));
      setTotalPage(Math.ceil(res.data.totalRows / res.data.limit));
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchProduct(filter) {
    setOrder_direction(filter);
  }
  async function fetchCategory(filter) {
    setOrder(filter);
  }
  async function fetchLimit(filter) {
    setLimit(filter);
  }

  const onAddCart = async (BookId) => {
    try {
      if (!NIM) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "Login First",
          timer: 2000,
          customClass: {
            container: "my-swal",
          },
        });

      }
      if (cart >= 5) {
        return Swal.fire({
          icon: "error",
          title: "Oooops ...",
          text: "Keranjang Penuh",
          timer: 2000,

          customClass: {
            container: "my-swal",
          },
        });
      }


      const result = await Axios.post("http://localhost:2000/carts", {
        UserNIM: NIM,
        BookId,
      });

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
      console.log(err);
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
  const formik = useFormik({
    initialValues: {
      searchName: ``,
    },
    validationSchema: Yup.object().shape({
      searchName: Yup.string(),
      // .min(2, 'Minimun 2 characters')
    }),
    validateOnChange: false,
    onSubmit: async () => {
      const { searchName } = formik.values;

      setSearchProduct(searchName);
    },
  });

  useEffect(() => {
    getData();
  }, [searchProduct, limit, page, totalPage, order, order_direction]);

  useEffect(() => {
    fetchProduct();
    fetchCategory();
    fetchLimit();
  }, []);

  return (
    <>
      <Center>
        <Flex flexWrap={"wrap"} color={useColorModeValue("black", "white")}>
          <Flex m={4} wrap="wrap">
            <FormControl w="" m={1}>
              {/* <FormLabel fontSize="x-small">Search</FormLabel> */}
              <InputGroup>
                <Input
                  placeholder="Search"
                  _placeholder={{
                    color: useColorModeValue("black", "white"),
                    opacity: 0.5,
                  }}
                  id="search"
                  type="text"
                  onChange={(event) =>
                    formik.setFieldValue("searchName", event.target.value)
                  }
                />
                <InputRightElement>
                  <Icon
                    fontSize="xl"
                    as={RiSearchEyeFill}
                    sx={{ _hover: { cursor: "pointer" } }}
                    onClick={() => formik.handleSubmit()}
                  />
                </InputRightElement>
              </InputGroup>
              <FormHelperText color="red">
                {formik.errors.searchName}
              </FormHelperText>
            </FormControl>
            <FormControl w="" m={3}>
              <Icon
                sx={{ _hover: { cursor: "pointer" } }}
                boxSize="6"
                as={RiRestartFill}
                onClick={() => {
                  async function submit() {
                    setSearchProduct("");
                    document.getElementById("search").value = "";
                    formik.values.searchName = "";
                  }
                  submit();
                }}
              />
            </FormControl>
            <FormControl w="" m={1}>
              {/* <FormLabel fontSize="x-small">Pilih Category</FormLabel> */}
              <Select
                onChange={(event) => {
                  fetchCategory(event.target.value);
                }}
              >
                <option value="">
                  <Text color={useColorModeValue("black", "white")}>
                    {" "}
                    Category{" "}
                  </Text>
                </option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="publisher">Publisher</option>
              </Select>
            </FormControl>
            <FormControl w="" m={1}>
              {/* <FormLabel fontSize="x-small" >Format Sort</FormLabel> */}
              <Select
                onChange={(event) => {
                  fetchProduct(event.target.value);
                }}
              >
                <option value="">
                  <Text color={useColorModeValue("black", "white")}>
                    {" "}
                    Order{" "}
                  </Text>
                </option>
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
              </Select>
            </FormControl>
            <FormControl w="" m={1}>
              {/* <FormLabel fontSize="x-small">Show</FormLabel> */}
              <Select
                onChange={(event) => {
                  fetchLimit(event.target.value);
                }}
              >
                <option value="">
                  <Text color={useColorModeValue("black", "white")}>
                    {" "}
                    Total{" "}
                  </Text>
                </option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </Select>
            </FormControl>
          </Flex>
          {/* </Box> */}
          {/* </Box> */}
        </Flex>
      </Center>

      <Center>
        <Flex flexWrap={"wrap"}>
          {data.map((item) => {
            return (
              <Box
                w="248px"
                h="370px"
                borderWidth="1px"
                m="10px"
                _hover={{ boxShadow: "xl" }}
                boxShadow="base"
                borderRadius="10px"
              >
                <Box
                  as={Link}
                  to={`/details/${item.id}`}
                  h="240px"
                  w="full"
                  _hover={{ cursor: "pointer" }}
                  borderTopRadius="10px"
                  overflow="hidden"
                >
                  <Image
                    objectFit="cover"
                    src={item.images}
                    width="248px"
                    height="240px"
                  />
                </Box>

                <Box as={Link} to={`/details/${item.id}`} px="10px" h="70px">
                  <Box h="60px">
                    <Text
                      _hover={{ cursor: "pointer", color: "grey" }}
                      fontWeight="bold"
                    >
                      {item.title.substring(0, 30)}
                      {item.title.length >= 30 ? "..." : null}
                    </Text>
                  </Box>
                  <Box display="flex" fontSize="xs">
                    <Text fontWeight="bold" mr="5px">
                      {" "}
                      {item.publisher.substring(0, 25)}
                      {item.publisher.length >= 25 ? "..." : null}{" "}
                    </Text>
                  </Box>
                  <Box display="flex" fontSize="xs">
                    <Text fontWeight="bold" textColor="#3182CE" mr="5px">
                      {" "}
                      {item.author}{" "}
                    </Text>
                  </Box>
                </Box>
                {/* <Box pb="12px" px="10px" h="40px">
                    {item.Carts.find((item2) => item2["UserNIM"] === NIM) ? (
                      <Button
                        disabled
                        w="full"
                        borderRadius="9px"
                        size="sm"
                        my="5px"
                      >
                        <Icon boxSize="4" as={IoCartOutline} mr="5px" x />
                        Keranjang
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onAddCart(item.id)}
                        w="full"
                        borderColor="pink.400"
                        borderRadius="9px"
                        borderWidth="2px"
                        size="sm"
                        my="5px"
                        _hover={{ bg: "pink", color: "white" }}
                      >
                        <Icon boxSize="4" as={IoCartOutline} mr="5px" x />
                        Keranjang
                      </Button>
                    )}
                  </Box> */}

              </Box>
            );
          })}
        </Flex>
      </Center>

      <Box display="flex" justifyContent="center" alignContent="center">
        <Button
          onClick={() => {
            async function submit() {
              setPage(page === 1 ? 1 : page - 1);
            }
            submit();
            var pageNow = page - 1;
            pageNow = pageNow <= 0 ? 1 : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
          }}
          size="sm"
          m="3px"
          borderColor="gray.400"
          borderRadius="6px"
          bg="white"
          borderWidth="2px"
          bgColor="inherit"
          _hover={{ bg: "silver" }}
        >
          Prev
        </Button>
        <Text alignSelf="center" mx="5px">
          {" "}
          {page} of {totalPage}
        </Text>
        <Button
          onClick={() => {
            async function submit() {
              setPage(totalPage === page ? page : page + 1);
            }
            submit();
            var pageNow = page + 1;
            pageNow = pageNow > totalPage ? page : pageNow;
            document.getElementById("pagingInput").value = parseInt(pageNow);
          }}
          size="sm"
          m="3px"
          borderColor="gray.400"
          borderRadius="6px"
          bg="white"
          borderWidth="2px"
          bgColor="inherit"
          _hover={{ bg: "silver" }}
        >
          Next
        </Button>
      </Box>
    </>
  );
}
