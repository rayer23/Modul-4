import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const params = useParams();
  const [data, setData] = useState();

  const getBook = async () => {
    try {
      const result = await Axios.get(
        `http://localhost:2000/books/details/${params.id}`
      );
      //   console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 15, md: 10 }}
      >
        <Flex>
          <Box
            w="380px"
            h="493px"
            borderWidth="1px"
            m="10px"
            boxShadow="base"
            borderRadius="13px"
          >
            <Box h="155px" w="full" borderTopRadius="13px">
              <Image
                rounded={"md"}
                alt={data?.title}
                src={data?.images}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Box>
          </Box>
        </Flex>
        <Stack spacing={{ base: 3, md: 8 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "2xl", lg: "3xl" }}
              textColor="#010101"
            >
              {data?.title}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              mt={2}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {data?.genre}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 2, sm: 3 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 2, sm: 1 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"xl"}
                fontWeight={"200"}
                textAlign={"left"}
              >
                Abstract
              </Text>
              <Text fontSize={"lg"}>{data?.sinopsis}</Text>
            </VStack>

            <VStack spacing={{ base: 2, sm: 1 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"xl"}
                fontWeight={"200"}
                textAlign={"left"}
              >
                Author
              </Text>
              <Text fontSize={"lg"}>{data?.author}</Text>
            </VStack>

            <VStack spacing={{ base: 2, sm: 1 }}>
              <Text
                color={useColorModeValue("gray.500", "gray.400")}
                fontSize={"xl"}
                fontWeight={"200"}
                textAlign={"left"}
              >
                Publisher
              </Text>
              <Text fontSize={"lg"}>{data?.publisher}</Text>
            </VStack>
          </Stack>

          <Button
            rounded={"10px"}
            w={"full"}
            mt={3}
            size={"lg"}
            py={"4"}
            borderColor="gray.400"
            borderRadius="6px"
            bg="white"
            borderWidth="2px"
            bgColor="inherit"
            _hover={{ bg: "silver" }}
          >
            Borrow
          </Button>

          {/* <Stack direction='row' alignItems='center' justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack> */}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
