import {MouseEventHandler} from "react"
import { FormControl, FormLabel, Input, Button, Box, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { MutableRefObject } from "react";

type Props = {
  username: MutableRefObject<HTMLInputElement>
  password: MutableRefObject<HTMLInputElement>
  clickHandler: MouseEventHandler<HTMLButtonElement>
    isOpen: boolean
    onClose: () => void
}

const LoginForm = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay/>
      <ModalContent>
    <Box m={4}>
      <FormControl>
        <FormLabel htmlFor="login-username">Username</FormLabel>
        <Input id="login-username" ref={props.username} mb={2} ></Input>
        <FormLabel htmlFor="login-password">Password</FormLabel>
         {/* @ts-ignore */}
        <Input ref={props.password} id="login-password"></Input>
      </FormControl>
      <Button bg={'gray.700'} color={'white'} mt={2} onClick={props.clickHandler}>Login</Button>
    </Box>
</ModalContent>
</Modal>
  )
}

export default LoginForm
