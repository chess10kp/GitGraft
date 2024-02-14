import { Flex } from "@chakra-ui/react"
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'


type Props = {  
  expenses : [] 
}


const Dashboard = (props: Props) => {
  console.log(props.expenses)
  const t_expenses = props.expenses.filter((expense: any) => 
    parseInt(expense.amount) > 0 
  ).reduce((acc: number, expenses: any) => acc + parseInt(expenses.amount) , 0) 
  const t_savings = props.expenses.filter((expense: any) => 
    parseInt(expense.amount) < 0 
  ).reduce((acc: number, expenses: any) => acc + parseInt(expenses.amount) , 0) 
 return (
    <Flex>
      <Stat>
        <StatLabel>Balance</StatLabel>
        <StatNumber>${t_expenses}</StatNumber>
        <StatHelpText>Total expenses <StatArrow/>
        </StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Savings</StatLabel>
        <StatNumber>${t_savings}</StatNumber>
        <StatHelpText>Total expenses <StatArrow/>
        </StatHelpText>
      </Stat>
    </Flex>
  )
}

export default Dashboard
