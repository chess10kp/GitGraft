import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Text,
  BoxProps,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue
} from '@chakra-ui/react';


import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

import { AiOutlineHome } from 'react-icons/ai';
import { MdAttachMoney } from "react-icons/md";
import { BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';

import User from '../types';

import { MutableRefObject } from 'react';

type Props = {
  loginUsernameRef: MutableRefObject<HTMLInputElement>
  loginPasswordRef: MutableRefObject<HTMLInputElement>
  onLoginHandler: () => Promise<boolean>
  isLoggedIn: Boolean
  user: User | null
  children: (any | null)
}


export default function NavBar(props: Props) {
  const { isOpen: isSidebarOpen, onClose: onSideBarClose, onOpen: onSideBarOpen } = useDisclosure();
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()


  const onLoginHandler = () => {
    props.onLoginHandler().then((res) => {
      if (res) {
        onLoginClose()
      }
    }
    )
  }

  return (
    <Box as="section" bg={useColorModeValue('white', 'gray.40')} minH="100vh">
      <SidebarContent display={{ base: 'none', md: 'unset' }} />
      <Drawer isOpen={isSidebarOpen} onClose={onSideBarClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('gray.100', 'gray.40')}>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 0 }} transition=".3s ease">
        <Flex
          as="header"
          justifyContent={{ base: 'space-between', md: 'flex-end' }}
          w="100"
          px="4"
          borderBottomWidth="1px"
          borderColor={useColorModeValue('inherit', 'gray.700')}
          bg={useColorModeValue('gray.50', 'gray.800')}
          boxShadow="sm"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: 'inline-flex', md: 'none' }}
            onClick={onSideBarOpen}
            icon={<FiMenu />}
            size="md"
          />
          <Flex align="center" >
            {props.isLoggedIn && props.user?.username ?
              (
                <>
                {props.user.username}
                <Avatar
                ml="4"
                size="sm"
                src="https://avatars2.githubusercontent.com/u/37842853?v=4"
                cursor="pointer"
              />
              </>
              ) :
              (
                <>
                  <Button bg={'gray.50'} color={'black'} onClick={onRegisterOpen}>Register</Button>
                  <Button bg={'black'} color={'white'} onClick={onLoginOpen}>Login</Button>
                </>
              )
            }
          </Flex>
        </Flex>
        <LoginForm
          username={props.loginUsernameRef} password={props.loginPasswordRef}
          clickHandler={onLoginHandler} isOpen={isLoginOpen}
          onClose={onLoginClose} />
        <RegisterForm isOpen={isRegisterOpen} onClose={onRegisterClose} />
        <Box as="main" p={14} minH="25rem" bg={useColorModeValue('auto', 'gray.800')}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ ...props }: BoxProps) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    pb="10"
    overflowX="hidden"
    overflowY="auto"
    bg={useColorModeValue('gray.50', 'gray.40')}
    borderColor={useColorModeValue('inherit', 'gray.800')}
    borderRightWidth="2px"
    w="60"
    {...props}
  >
    <Flex px="4" py="5" align="center">
      <Icon as={MdAttachMoney} h={7} w={7}/>
      <Text
        fontSize="2xl"
        ml="2"
        mt="1"
        color={useColorModeValue('brand.500', 'white')}
        fontWeight="semibold"
        width={'100%'}
      >
        GitGraft
      </Text>
    </Flex>
    <Flex direction="column" as="nav" fontSize="md" color="gray.600" aria-label="Main Navigation">
      <NavItem icon={AiOutlineHome}>Dashboard</NavItem>
      <NavItem icon={BsCalendarCheck}>Dashboard</NavItem>
    </Flex>
  </Box>
);

const NavItem = (props: any) => {
  const color = useColorModeValue('gray.600', 'gray.300');

  const { icon, children } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.300', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200')
      }}
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};




