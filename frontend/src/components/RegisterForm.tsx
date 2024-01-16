import {useRef, useState } from 'react'
import { Button, Input, FormLabel, FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import awaitPostRequestHandler from '../utils'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const RegisterForm = (props: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword ] = useState('')
  const [repeatPassword, setRepeatPassword ] = useState('')
  const [checkRepeatPassword, setCheckRepeatPassword] = useState(false)

  const onSubmitHandler = async () => {
    if (repeatPassword == password) {
      setCheckRepeatPassword(false)
      console.log(checkRepeatPassword)

      const response = awaitPostRequestHandler("http://localhost:8000/spender/new", 
        JSON.stringify(
          {username: username, 
            password: password}
        ))

      console.log(response)
    }
    else {
      setCheckRepeatPassword(true)
    }
  }
  return (
   <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
        <FormControl isInvalid={checkRepeatPassword} isRequired>
          <FormLabel>Email address</FormLabel>
          <Input type='email' value={username} onChange={e => setUsername(e.target.value)} />
          <FormLabel>Password</FormLabel>
          <Input type='password' value={password} onChange={e => setPassword( e.target.value )} />
          <FormLabel>Repeat Password</FormLabel>
          <Input type='password' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
          <FormHelperText> </FormHelperText>
          <FormErrorMessage>Passwords do not match </FormErrorMessage> 
        </FormControl>
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSubmitHandler} variant='ghost'>Register</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default RegisterForm
