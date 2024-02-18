import { Flex } from "@chakra-ui/react"
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Box
} from '@chakra-ui/react'



type Props = {  
  expenses : [{amount: string, category: string, description: string}]
}

import PieChart from "./PieChart"


const Dashboard = (props: Props) => {
  const t_expenses = props.expenses.filter((expense: any) => 
    parseInt(expense.amount) > 0 
  )
  const t_expense = t_expenses.reduce((acc: number, expenses: any) => acc + parseInt(expenses.amount) , 0) 

  const t_savings = props.expenses.filter((expense: any) => 
    parseInt(expense.amount) < 0 
  )
  const t_saving = t_savings.reduce((acc: number, expenses: any) => acc + parseInt(expenses.amount) , 0) 

  const net = t_saving - t_expense

 return (
    <Box>
    <Flex>
      <Stat>
        <StatLabel>Expenses</StatLabel>
        <StatNumber>-${t_expense}</StatNumber>
        <StatHelpText>{net < 0 ? `Expenes uncleared ${-net*100/t_expense}%` : null}<StatArrow/>
        </StatHelpText>
      <PieChart transactions={t_expenses}></PieChart>
      </Stat>

      <Stat>
        <StatLabel>Savings</StatLabel>
        <StatNumber>${t_saving}</StatNumber>
        <StatHelpText>{net > 0 ? `${t_saving * 100 / t_expense} percent higher than expenses` : null }</StatHelpText>
      </Stat>
    </Flex>
  </Box>
  )
}

export default Dashboard
