import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
import { MutableRefObject } from "react";

type Props = {
  username: MutableRefObject<string>
  password: MutableRefObject<string>
  clickHandler: Function
}

const Form = (props: Props) => {
  return (
    <Box>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input ref={props.username} ></Input>
        <FormLabel>Password</FormLabel>
        <Input ref={props.password} ></Input>
      </FormControl>
      <Button colorScheme='green' onClick={props.clickHandler}>Login</Button>
    </Box>
  )
}

export default Form
