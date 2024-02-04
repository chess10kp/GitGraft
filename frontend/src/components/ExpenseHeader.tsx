import { Table, TableContainer, TableCaption, Thead, Tr ,Th, Tbody } from "@chakra-ui/react"

type Props = {
  children: any
}

const ExpenseHeader = (props: Props) => {
  return (
  <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>Category</Th>
          </Tr>
        </Thead>
        <Tbody>
        {props.children}
        </Tbody>
      </Table>
    </TableContainer>
  )
}



export default ExpenseHeader
