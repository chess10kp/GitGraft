import { Modal, ModalHeader, NumberInput, ModalCloseButton, NumberInputField, ModalOverlay, FormLabel, Input, Box, FormControl, Select, ModalContent, ModalBody, Stack } from "@chakra-ui/react"
import { useDisclosure, Button } from "@chakra-ui/react"

import { useState } from 'react'
import awaitPostRequestHandler from "../utils"

type Props = {
  spender_id: Number
}

const InputForm = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [expenseCategory, setCategory] = useState("")
  const [expenseName, setExpenseName] = useState<string>("")
  const [expenseDescription, setExpenseDescription] = useState<string>("")
  const [expenseAmount, setAmount] = useState<string>("")

  const onCreateExpenseHandler = () => {
    awaitPostRequestHandler(`http://localhost:8000/spender/${props.spender_id}/expenses/new`, 
      JSON.stringify({
        amount: expenseAmount, 
        category: expenseCategory,
        description: expenseDescription
      }) ,"POST") 
  }

  return (
    <>
      <Button onClick={onOpen}></Button>
      <Box>
        <Modal onClose={onClose} isOpen={true}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Expense</ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody>
              <FormControl m={2}>
                <FormLabel>Expense Name</FormLabel>
                <Input type='text' value={expenseName} placeholder='Ex: Rent' isRequired onChange={e => setExpenseName(e.target.value)}></Input>
                <FormLabel my={2}>Description</FormLabel>
                <Input type='text' value={expenseDescription} placeholder='Ex: I need a place to live' isRequired onChange={e => setExpenseDescription(e.target.value)}></Input>
                <Stack direction={'row'}>
                  <Stack>
                    <FormLabel my={2}>Amount</FormLabel>
                    <NumberInput min={0} >
                      <NumberInputField value={expenseAmount} onChange={e => setAmount(e.target.value)}></NumberInputField>
                    </NumberInput>
                  </Stack>
                  <Stack>
                    <FormLabel my={2} >Category</FormLabel>
                    <Select value={expenseCategory} onChange={e => setCategory(e.target.value)} placeholder="Category">
                      <option value={'Work'}>Work</option>
                      <option value={'Home'}>Home</option>
                      <option value={'Food'}>Food</option>
                      <option value={'School'}>School</option>
                      <option value={'Miscellaneous'}>Miscellaneous</option>
                      <option value={'Travel'}>Travel</option>
                    </Select>
                  </Stack>
                </Stack>
                <Button colorScheme='' mt={4} onClick={onCreateExpenseHandler} bg={'black'} color={"white"}>Create Expense</Button>
              </FormControl>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>

    </>
  )
}

export default InputForm
