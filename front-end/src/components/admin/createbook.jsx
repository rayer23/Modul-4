import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Textarea,
  } from "@chakra-ui/react";
  
  import Axios from "axios";
  import { useRef } from "react";
  
  export default function CreateBook() {
    const inputTitle = useRef("");
    const inputAuthor = useRef("");
    const inputPublisher = useRef("");
    const inputGenre = useRef("");
    const inputSinopsis = useRef("");
    const inputStock = useRef("");
  
    const onCreate = async () => {
      try {
        const addBook = {
          title: inputTitle.current.value,
          author: inputAuthor.current.value,
          publisher: inputPublisher.current.value,
          genre: inputGenre.current.value,
          sinopsis: inputSinopsis.current.value,
          stock: inputStock.current.value,
        };
        console.log(addBook);
  
        const res = await Axios.post(
          `http://localhost:2000/books`,
          addBook
        );
  
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("white.50", "white.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "white.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
            textAlign="center"
          >
            Add Book Here
          </Heading>
          <Flex></Flex>
          <Flex>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                _placeholder={{ color: "gray.500" }}
                type="text"
                ref={inputTitle}
              />
            </FormControl>
          </Flex>
          <FormControl id="author" isRequired>
            <FormLabel>Author</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="author"
              ref={inputAuthor}
            />
          </FormControl>
          <FormControl id="publisher" isRequired>
            <FormLabel>Publisher</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="publisher"
              ref={inputPublisher}
            />
          </FormControl>
          <FormControl id="genre" isRequired>
            <FormLabel>Genre</FormLabel>
            <Input
              _placeholder={{ color: "gray.500" }}
              type="genre"
              ref={inputGenre}
            />
          </FormControl>
          <FormControl id="abstract" isRequired>
            <FormLabel>Sinopsis</FormLabel>
            <Textarea _placeholder={{ color: "gray.500" }} ref={inputSinopsis} />
          </FormControl>
          <FormControl id="stock" isRequired>
            <FormLabel>Stock</FormLabel>
            <Textarea _placeholder={{ color: "gray.500" }} ref={inputStock} />
          </FormControl>
          {/* <FormControl id="picture">
            <FormLabel>Picture</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Avatar size="xl" src="">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
              <Center></Center>
              <Center w="full">
                <Button w="full">Upload Picture</Button>
              </Center>
            </Stack>
          </FormControl> */}
          <Stack spacing={6} direction={["column", "row"]}>
            {/* <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button> */}
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              onClick={onCreate}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
  