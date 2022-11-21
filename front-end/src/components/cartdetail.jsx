import {
    Flex, Box, Text, Button, InputGroup, InputLeftElement, Icon, useDisclosure,
    InputRightElement, Input, Tooltip, useToast, Image,
    Modal, ModalOverlay, ModalHeader, ModalBody, ModalCloseButton, ModalContent, Divider
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom"
import Axios from "axios";
import Swal from 'sweetalert2'
import { FaTrashAlt } from 'react-icons/fa';
import { addLoan, CartLoan, delCart } from '../redux/userSlice';
import { cartDel, cartSync } from '../redux/cartSlice';
import { loanSync } from '../redux/loanSlice';

export default function CartDetail() {
    const { NIM, email ,isVerified, cart, loan } = useSelector((state) => state.userSlice.value)
    const data = useSelector((state) => state.cartSlice.value);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const url = "http://localhost:2000/loans"

    const onBorrow = async () => {
        try {
            const Borrow_date = document.getElementById("Borrow_date").value
            const Return_date = document.getElementById("Return_date").value
            const res = await Axios.post(url, {Borrow_date, Return_date, NIM, data, isVerified, isActive: loan})

            Swal.fire({
                icon: 'success',
                title: 'Good Job',
                text: `${res.data.massage}`,
                timer: 2000,
                customClass: {
                    container: 'my-swal'
                }
            })

            const result = await Axios.get(`http://localhost:2000/loans/${NIM}`);
            dispatch(loanSync(result.data))
            dispatch(cartDel())
            dispatch(CartLoan())
            dispatch(addLoan())

            setTimeout(() => navigate(`/loan`), 2000);

        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response.data.name
                    ? err.response.data.errors[0].message
                    : err.response.data,
            });
        }
    }

    const onDeleteCart = async (id) => {
        try {
            await Axios.delete(`http://localhost:2000/carts/${id}`);
        
            Swal.fire({
                icon: 'success',
                title: 'Good Job',
                text: "Cart Berhasil Dihapus",
                timer: 2000,
                customClass: {
                    container: 'my-swal'
                }
            })
            const result = await Axios.get(`http://localhost:2000/carts/${NIM}`);
            dispatch(cartSync(result.data))
            dispatch(delCart())
        
            } catch (err) {
            console.log(err)
        }
    }

return (
    <Box>
    <Box display='flex' justifyContent='center' flexWrap={'wrap'}>
    <Box h='450px' p='25px' minW='370px' w={'22vw'} mx='15px' mt='10px' mb='20px' justifyContent={'center'} boxShadow='md' borderWidth='1px' borderRadius="10px">
        <Text fontWeight='bold' fontSize='lg'>
            Keterangan
        </Text>
        <Box display='flex' mt='10px' justifyContent='space-between' >
            <Text fontWeight='semibold'>
            NIM :
            </Text>
            <Text fontWeight='semibold'>
            {NIM}
            </Text>
        </Box>
        <Box display='flex' mt='10px' justifyContent='space-between' >
            <Text fontWeight='semibold'>
            Email :
            </Text>
            <Text fontWeight='semibold'>
            {email}
            </Text>
        </Box>

        <Divider my='20px' />

        <Box display='flex' mt='20px' justifyContent='space-between' >
            <Text fontSize="small" fontWeight='semibold' >
            Tanggal Peminjaman :
            </Text>
        </Box>
        <Input
            id='Borrow_date'
            mt='10px'
            placeholder="Select Date"
            size="md"
            type="date"
        />
        <Box display='flex' mt='10px' justifyContent='space-between' >
            <Text fontSize="small" fontWeight='semibold' >
            Tanggal Pengembalian :
            </Text>
        </Box>
        <Input
            id="Return_date"
            mt='10px'
            placeholder="Select Date"
            size="md"
            type="date"
        />
        
        
        <Box display='flex' mt='30px' justifyContent='space-between' >
            <Text fontWeight='bold'>
            Jumlah Buku :
            </Text>
            <Text fontWeight='bold'>
            {cart}
            </Text>
        </Box>
        <Box mt='10px' display='flex' justifyContent='flex-end' >
            <Button onClick={() => onBorrow()} w='full' borderColor="pink.400" borderRadius='9px' borderWidth='2px'
            _hover={{ bg: "pink" }} disabled={data.length === 0 ? true : false}>
            Ajukan Peminjaman
            </Button>
        </Box>
        </Box>

        <Box minW='370px' w={'55vw'} mx='15px' my='10px' p='25px' px='20px' justifyContent={'center'} boxShadow='md' borderWidth='1px' borderRadius="10px">
        {
            data.length === 0 ?
            <>
            <Box align='center'>
                <Image src='https://www.kibrispdr.org/data/1779/gif-pendidikan-4.gif' objectFit='contain' w='400px' h='300px' />
                <Text textAlign='center' fontWeight='bold'>Keranjang anda kosong</Text>
                <Text as={Link} to="/" textAlign='center' fontWeight='bold' color="pink.400" w='150px' _hover={{ cursor: 'pointer', textDecoration: 'underline' }}>
                Pinjam Sekarang
                </Text>
            </Box>
            </>
            :
            // {data.map(item => {
            //     return (
                <Box boxShadow='sm' borderWidth='1px' borderRadius='10px' mb='20px' p='10px' _hover={{ boxShadow: 'lg' }}>
                {data.map(item => {
                    return (
                    <>
                    <Flex justifyContent='space-between'>
                        <Box display='flex'>
                        <Box minW='100px' minH='100px' overflow='hidden' borderWidth='1px' >
                            <Link href={`/productdetails/${item.Book.id}`}>
                            <Image objectFit='cover' src={item.Book.Images} width='100px' height='100px' />
                            </Link>
                        </Box>
                        <Box ml='15px' alignSelf="center" >
                            <Link href={`/productdetails/${item.Book.id}`}>
                                <Text fontWeight='semibold'>
                                    {item.Book.Title}
                                </Text>
                                <Text fontWeight='semibold' fontSize="small">
                                    {item.Book.Publisher}
                                </Text>
                                <Text fontWeight='semibold' color='#213360' textColor='#FF6B6B'>
                                    {item.Book.Author}
                                </Text>
                            </Link>
                        </Box>
                        </Box>
                        <Tooltip label='Hapus Dari Keranjang' fontSize='sm' >
                        <Button variant='link' color="pink.400" size='sm'
                            onClick={() => onDeleteCart(item.id)} 
                            _hover={{ color: "pink" }}>
                            <Icon boxSize={4} as={FaTrashAlt} />
                        </Button>
                        </Tooltip>
                    </Flex>
                        <Divider my='20px' />
                </>
                    )
                })}
                </Box>
                }
        </Box>

    </Box>
    </Box>
)
}