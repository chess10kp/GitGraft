import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { MutableRefObject } from "react";

type Props = {
  username: MutableRefObject<string>
  password: MutableRefObject<string>
  clickHandler: Function
}

const LoginForm = (props: Props) => {
  return (
    <Box>
      <FormControl>
        <FormLabel>Username</FormLabel>
         {/* @ts-ignore */}
        <Input ref={props.username} ></Input>
        <FormLabel>Password</FormLabel>
         {/* @ts-ignore */}
        <Input ref={props.password} ></Input>
      </FormControl>
         {/* @ts-ignore */}
      <Button colorScheme='green' onClick={props.clickHandler}>Login</Button>
    </Box>
  )
}

export default LoginForm
