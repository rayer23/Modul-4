import {
    Box,
    chakra,
    Flex,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { BsPerson } from "react-icons/bs";
  import { FiServer } from "react-icons/fi";
  import { GoLocation } from "react-icons/go";
  import { useDispatch, useSelector } from "react-redux";
  import { syncName } from "../../redux/nameSlice";
  import { syncData } from "../../redux/listSlice";
  import Axios from "axios";
  import { useEffect } from "react";
  
  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.800", "gray.500")}
        rounded={"lg"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }
  
  export default function StatsComp() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.nameSlice.value);
    const data1 = useSelector((state) => state.listSlice.value);
  
    const getData = async () => {
      try {
        const res = await Axios.get(`http://localhost:2000/users/allUser`);
        console.log(res.data);
        dispatch(syncName(res.data));
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    const getBook = async () => {
      try {
        const res = await Axios.get(`http://localhost:2000/books/`);
        console.log(res.data);
        dispatch(syncData(res.data));
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      getBook();
    }, []);
  
    return (
      <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        ></chakra.h1>
  
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
              <StatsCard
                title={"Users"}
                stat={data.length}
                icon={<BsPerson size={"3em"} />}
              />
              <StatsCard
                title={"Books"}
                stat={data1.length}
                icon={<FiServer size={"3em"} />}
              />
              <StatsCard
                title={"Transactions"}
                stat={"Coming Soon"}
                icon={<GoLocation size={"3em"} />}
              />
            </SimpleGrid>
      </Box>
    );
  }
  