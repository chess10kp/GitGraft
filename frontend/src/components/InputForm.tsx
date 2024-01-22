import { useRef } from 'react'
import { Modal, ModalOverlay, FormLabel, Input, Box, FormControl, Select, ModalContent, ModalBody } from "@chakra-ui/react"
import { useDisclosure, Button } from "@chakra-ui/react"

import ExpenseForm from './ExpenseForm'

type Props = {
        spender_id: Number
}

const InputForm = (props: Props) => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const description = useRef('')
        const amount = useRef(0)
        const category = useRef('')

        const onClickHandler = () => {
                fetch(`http://localhost:8000/spender/${props.spender_id}/expenses/new`)
        }

        return (
                <>
                        <Button onClick={onOpen}></Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalBody>
                                        <ModalContent>
                                                <Box m={4}>
                                                        <ExpenseForm isLoggedIn={isLoggedIn} user={loggedInUser.current}></ExpenseForm>
                                                        <Button bg={'gray.700'} color={'white'} mt={2} onClick={onClickHandler}>Login</Button>
                                                </Box>
                                        </ModalContent>

                                </ModalBody>
                        </Modal>
                </>
        )
}

export default InputForm
