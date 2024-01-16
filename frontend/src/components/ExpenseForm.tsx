import { useState } from "react"
import { FormControl, Select,  FormLabel, NumberInput, Button, Input, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper } from "@chakra-ui/react"

type Props = {
  isLoggedIn: Boolean
}

const ExpenseForm = (props: Props) => {
  const [amount, setAmount] = useState(0) 
  const [ description, setDescription ] = useState("")
  const [ category, setCategory ] = useState("")

  const clickHandler = async (event : any ) => {
   event.preventDefault() 
    const response = await fetch("http://localhost:8000/spender/1/expenses/new/", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ amount: amount, category: category, description: description })
    })
    console.log(response)
  }

  return (
    <FormControl>
      {category}
      <FormLabel>Amount</FormLabel>
      {/* @ts-ignore */}
      <NumberInput>
        <NumberInputField value={amount} onChange={e => setAmount(e.target.value)} /> 
        <NumberInputStepper> 
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper> 
      </NumberInput>

      <FormLabel>category</FormLabel>
      {/* @ts-ignore */}
      <Select value={category} onChange={e => setCategory(e.target.value)} placeholder="Category">
        <option value={'Work'}>Work</option>
        <option value={'Home'}>Home</option>
        <option value={'Food'}>Food</option>
        <option value={'School'}>School</option>
        <option value={'Miscellaneous'}>Miscellaneous</option>
        <option value={'Travel'}>Travel</option>
      </Select>
      <FormLabel>description</FormLabel>
      {/* @ts-ignore */}
      <Input value={description} onChange={e => setDescription(e.target.value)}></Input>
      <Button colorScheme='green' onClick={clickHandler}>Create Expense</Button>
    </FormControl>
  )
}

export default ExpenseForm