import { Modal, ModalHeader, NumberInput, ModalCloseButton, NumberInputField, ModalOverlay, FormLabel, Input, Box, FormControl, Select, ModalContent, ModalBody, Stack } from "@chakra-ui/react"
import { useDisclosure, IconButton, Button } from "@chakra-ui/react"

import { useState, Dispatch, SetStateAction } from 'react'
import { PlusSquareIcon } from "@chakra-ui/icons"

type Props = {
  spender_id: Number
  isOpen: Boolean 
  onOpen: () => void 
  onClose: () => void
  onCreateExpenseHandler: (expenseAmount: string, expenseDescription: string, expenseCategory: string) => void
}

const ExpenseTypes = Object.freeze({
  EXPENSE: "expenses",
  SAVING: "savings"
});

const InputForm = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [expenseCategory, setExpenseCategory] = useState("")
  const [expenseDescription, setExpenseDescription] = useState<string>("")
  const [expenseAmount, setExpenseAmount] = useState<string>("")
  const [expenseType, setExpenseType] = useState(ExpenseTypes.EXPENSE.toString())

  const onCreateExpenseClick = async () => {
    if (!expenseAmount || !expenseCategory || !expenseDescription) {
        alert("Please fill out all fields")
        return
    }
    const signedExpenseAmount = (expenseType == ExpenseTypes.SAVING ? expenseAmount : -expenseAmount).toString()
    props.onCreateExpenseHandler(signedExpenseAmount, expenseDescription, expenseCategory)
    onClose()
    setExpenseAmount("")
    setExpenseCategory("")
    setExpenseDescription("")
  }

  const onExpenseTypeChangeHandler = (value: string) => {
     setExpenseType(value) 
  }

  return (
    <>
      <IconButton aria-label="menu" icon={<PlusSquareIcon/>} onClick={onOpen}></IconButton>
      <Box>
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Expense</ModalHeader>
            <ModalCloseButton onClick={onClose} />
            <ModalBody>
              <FormControl m={2}>
                <FormLabel my={2}>Description</FormLabel>
                <Input type='text' value={expenseDescription} 
                  placeholder={ expenseType == "expense" ?  "Who did you pay?" : "Who paid you?" } isRequired onChange={e => 
                  setExpenseDescription(e.target.value)}>
                </Input>
                <Stack direction={'row'}>
                  <Stack>
                    <FormLabel my={2}>Amount</FormLabel>
                    <NumberInput min={0} isRequired>
                      <NumberInputField value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)}></NumberInputField>
                    </NumberInput>
                  </Stack>
                  <Stack>
                    <FormLabel my={2} >Category</FormLabel>
                    <Select value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)}>
                      <option value={'Miscellaneous'}>Misc</option>
                      <option value={'Work'}>Work</option>
                      <option value={'Home'}>Home</option>
                      <option value={'Food'}>Food</option>
                      <option value={'School'}>School</option>
                      <option value={'Travel'}>Travel</option>
                    </Select>
                  </Stack>
                  <Stack>
                    <FormLabel my={2}>Type</FormLabel>
                    <Select defaultValue={ExpenseTypes.EXPENSE} onChange={e => onExpenseTypeChangeHandler(e.target.value) }>
                      <option value={ExpenseTypes.EXPENSE}>Expense</option>
                      <option value={ExpenseTypes.SAVING}>Credit</option>
                    </Select>
                  </Stack>
                </Stack>
                <Button colorScheme='' mt={4} onClick={onCreateExpenseClick} bg={'black'} color={"white"}>Create Expense</Button>
              </FormControl>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>

    </>
  )
}

export default InputForm
