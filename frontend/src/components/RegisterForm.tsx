import {useState } from 'react'
import { Button, Input, FormLabel, FormControl } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const RegisterForm = (props: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword ] = useState('')
  const [repeatPassword, setRepeatPassword ] = useState('')

  const submitHandler () => {
    if (repeatPassword == password) {
      // TODO: check for password and make login request
    }
  }
  return (
   <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type='email' value={username} onChange={e => setUsername(e.target.value)} />
          <FormLabel>Password</FormLabel>
          <Input type='password' value={password} onChange={e => setPassword( e.target.password )} />
          <FormLabel>Repeat Password</FormLabel>
          <Input type='password' value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)}/>
        </FormControl>
          <ModalBody>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost'>Register</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default RegisterForm
