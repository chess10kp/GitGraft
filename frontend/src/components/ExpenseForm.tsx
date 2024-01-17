import { useState } from "react"
import { FormControl, Select, FormLabel, NumberInput, Button, Input, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper } from "@chakra-ui/react"

import awaitPostRequestHandler from '../utils.ts'

import UserLoggedIn from '../types'

type Props = {
    isLoggedIn: Boolean
    user: UserLoggedIn | null | {}
}

const ExpenseForm = (props: Props) => {
    const [amount, setAmount] = useState<string>("0")
    const [description, setDescription] = useState<string>("")
    const [category, setCategory] = useState<string>("")

    const clickHandler = async (event: any) => {
        event.preventDefault()
        const response = awaitPostRequestHandler(`http://localhost:8000/spender/3/expenses/new/`,
            JSON.stringify(
                { amount: amount, category: category, description: description }
            )
        )
    }

    return (
        <FormControl>
            <FormLabel>Amount</FormLabel>
            <NumberInput>
                <NumberInputField value={amount.toString()} onChange={e => setAmount(e.target.value)} />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <FormLabel>category</FormLabel>
            <Select value={category} onChange={e => setCategory(e.target.value)} placeholder="Category">
                <option value={'Work'}>Work</option>
                <option value={'Home'}>Home</option>
                <option value={'Food'}>Food</option>
                <option value={'School'}>School</option>
                <option value={'Miscellaneous'}>Miscellaneous</option>
                <option value={'Travel'}>Travel</option>
            </Select>
            <FormLabel>description</FormLabel>
            <Input value={description} onChange={e => setDescription(e.target.value)}></Input>
            <Button colorScheme='green' onClick={clickHandler}>Create Expense</Button>
        </FormControl>
    )
}

export default ExpenseForm
