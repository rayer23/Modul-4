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
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Box
            w='380px'
            h='493px'
            borderWidth='1px'
            m='10px'
            boxShadow='base'
            borderRadius='13px'>
            <Box h='155px' w='full' borderTopRadius='13px'>
              <Image
                rounded={'md'}
                alt={data?.title}
                src={data?.images}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              />
            </Box>
          </Box>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              textColor='#010101'>
              {data?.title}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              mt={10}
              fontWeight={300}
              fontSize={'4xl'}>
              {data?.genre}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }>
            <VStack spacing={{ base: 4, sm: 1 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'bold'}
                textAlign={'left'}>
                Abstract
              </Text>
              <Text fontSize={'lg'}>{data?.sinopsis}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '10px', lg: '25px' }}
                textColor='#718096'
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Author
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <Text as={'span'} fontWeight={'bold'}>
                    <ListItem>{data?.author}</ListItem>
                  </Text>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '10px', lg: '25px' }}
                textColor='#718096'
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Publisher
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    {data?.publisher}
                  </Text>{' '}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'30px'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={'#010101'}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
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
