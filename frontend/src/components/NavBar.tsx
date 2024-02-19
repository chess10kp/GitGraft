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

import {Dispatch, SetStateAction, useState} from 'react'

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import InputForm from "./InputForm.tsx"

import { AiOutlineHome } from 'react-icons/ai';
import { MdAttachMoney } from "react-icons/md";
import { BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';

import User from '../types';

import { MutableRefObject, useEffect } from 'react';

type Props = {
  loginUsernameRef: MutableRefObject<HTMLInputElement>
  loginPasswordRef: MutableRefObject<HTMLInputElement>
  onLoginHandler: () => Promise<boolean>
  onCreateExpenseHandler: (expenseAmount: string, expenseDescription: string, expenseCategory: string) => void
  isLoggedIn: Boolean
  user: User | null
  children: (any | null)
  setShowDashboard : Dispatch<SetStateAction<boolean>>
}


export default function NavBar(props: Props) {
  const { isOpen: isSidebarOpen, onClose: onSideBarClose, onOpen: onSideBarOpen } = useDisclosure();
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure()
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure()
  const { isOpen: isNewExpenseOpen, onOpen: onNewExpenseOpen, onClose: onNewExpenseClose } = useDisclosure()
  const [update, setUpdate] = useState(true)


  useEffect(() => {
    console.log("navbar rerendered")
  }, [update])

  const onNewExpenseClick = () => {
    onNewExpenseOpen()
  }
  const handleExpenseCreate = (expenseAmount: string, expenseDescription: string, expenseCategory: string) => { 
    props.onCreateExpenseHandler(expenseAmount, expenseDescription, expenseCategory)
  }

  const onShowdasshboardClick = () => { 
    props.setShowDashboard((prev) => !prev)
  } 
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
      <NavItem icon={AiOutlineHome}>Home</NavItem>
      <NavItem icon={BsCalendarCheck} onClick={onShowdasshboardClick}>Dashboard</NavItem>
      <Box ml={{ base: 0, md: 0 }} transition=".3s ease">
        <Flex
          as="header"
          justifyContent={{ base: 'space-between', md: 'space-between' }}
          w="100"
          px="4"
          borderBottomWidth="1px"
          borderColor={useColorModeValue('inherit', 'gray.700')}
          bg={useColorModeValue('gray.50', 'gray.800')}
          boxShadow="sm"
          h="14"
        >
          <Flex flexDirection={"row"} align={'center'}>
            <IconButton
              aria-label="Menu"
              display={{ base: 'inline-flex', md: 'inline-flex' }}
              onClick={onSideBarOpen}
              icon={<FiMenu />}
              size="md"
            />
        <InputForm spender_id={props.user?.id || -1} 
              isOpen={isNewExpenseOpen} 
              onOpen={onNewExpenseOpen} 
              onClose={onNewExpenseClose}
              onCreateExpenseHandler={handleExpenseCreate} />
            <MdAttachMoney></MdAttachMoney>
            <Text paddingY={0}> GitGraft</Text>
          </Flex>
          <Flex align="center" >
            {props.user?.username}
            <Avatar
              ml="4"
              size="sm"
              src="https://avatars2.githubusercontent.com/u/37842853?v=4"
              cursor="pointer"
            />
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

const SidebarContent = ({ ...props }: BoxProps, children_button: any) => (
  <Box>
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




