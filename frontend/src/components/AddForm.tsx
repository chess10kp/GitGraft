import { Box, Button, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton , NumberInput, NumberInputField} from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/hooks'

type Props = {}

const AddForm = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Modal onClose={onClose} isOpen={true}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Expense</ModalHeader>
          <ModalCloseButton onClick={onClose}/>
          <ModalBody>
            <FormControl>
               <FormLabel>Expense Name</FormLabel> 
              <Input type='text' placeholder='Ex: Rent' isRequired></Input>
              <FormLabel>Description</FormLabel>
              <Input type='text' placeholder='Ex: I need a place to live' isRequired></Input>
              <FormLabel>Amount</FormLabel>
              <NumberInput min={0}>
                  <NumberInputField></NumberInputField> 
              </NumberInput>
              <FormLabel>Category</FormLabel>
              <Select placeholder='Select Category'>
                <option>Fun</option>
                <option>Rent</option>
                <option>School</option>
                <option>Fun</option>
              </Select>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>

  )
}

export default AddForm
