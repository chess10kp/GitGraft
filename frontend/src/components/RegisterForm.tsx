import { useState } from 'react'
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
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [checkRepeatPassword, setCheckRepeatPassword] = useState(false)

    const onSubmitHandler = async () => {
        if (repeatPassword == password) {
            setCheckRepeatPassword(false)
            awaitPostRequestHandler("http://localhost:8000/spender/new",
                JSON.stringify(
                    {
                        username: username,
                        password: password
                    }
                ))
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
                <ModalBody>
                <FormControl isInvalid={checkRepeatPassword} isRequired>
                    <FormLabel htmlFor='register_email'>Email address</FormLabel>
                    <Input type='email' value={username} id='email' onChange={e => setUsername(e.target.value)} />
                    <FormLabel htmlFor='register_password'>Password</FormLabel>
                    <Input type='password' value={password} id="register_password" onChange={e => setPassword(e.target.value)} />
                    <FormLabel htmlFor='register_repeat_password'>Repeat Password</FormLabel>
                    <Input type='password' value={repeatPassword} id="register_repeat_password" onChange={e => setRepeatPassword(e.target.value)} />
                    <FormHelperText> </FormHelperText>
                    <FormErrorMessage>Passwords do not match </FormErrorMessage>
                </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onSubmitHandler} bgColor={'black'} color={'white'} variant='solid'>Register</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RegisterForm
