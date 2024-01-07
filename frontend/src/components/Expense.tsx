import { Card, CardBody, Text } from '@chakra-ui/react'

type Props = {
  expense: string
  amount: Number
}

const Expense = (props: Props) => {
  return (
    <Card>
      <CardBody>
        <Text>{props.expense}</Text>
      </CardBody>
    </Card>
  )
}

export default Expense
