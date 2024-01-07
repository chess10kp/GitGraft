import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  username : string
  setUsername : Dispatch<SetStateAction<string>>
  password : string
  setPassword : Dispatch<SetStateAction<string>>
}

const Form = (props: Props) => {
  return (
    <FormControl>
      <FormLabel>Username</FormLabel>
      <Input value={props.username} onChange={(e) => props.setUsername(e.target.value) }></Input>
      <FormLabel>Password</FormLabel>
      <Input value={props.password} onChange={(e) => props.setPassword(e.target.value)}></Input>
    </FormControl>
  )
}

export default Form
