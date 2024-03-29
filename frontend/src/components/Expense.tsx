import { Tr, Td, IconButton, Text } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import {Dispatch, SetStateAction} from 'react'

type Props = {
  id: Number
  description: string
  expense: string
  amount: Number
  category: string
  timestamp: string
  onDeleteHandler : (expense_id: Number) => void
  setUpdate: Dispatch<SetStateAction<boolean>>
}
const Expense = (props: Props) => {
  const onDeleteHandler = (expense_id: Number) => {
    props.onDeleteHandler(expense_id)
    props.setUpdate((prev) => !prev)
  }

  return (
    <Tr>
      <Td><Text>{props.description}</Text><Text fontSize={'0.5em'}>{props.timestamp.slice(0,10)}</Text></Td>
      <Td>{props.amount.toString()}</Td>
      <Td><span className="px-2 py-1 bg-red-200 text-red-800 rounded-md">
        <svg
          xmlns="http://www.w4.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 inline-block mr-1"
        >
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
          <path d="M7 7h.01"></path>
        </svg>
        {props.category}
      </span></Td>
      <Td>
        <IconButton aria-label="delete task" onClick={() => onDeleteHandler( props.id)} icon={<DeleteIcon />} ></IconButton>
      </Td>
    </Tr>
  )
}

export default Expense
