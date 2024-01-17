import { useState, useEffect, useRef, MutableRefObject } from 'react'
import {useDisclosure} from '@chakra-ui/react'

import './App.css'

import LoginForm from './components/LoginForm'
import Expense from './components/Expense'
import ExpenseForm from './components/ExpenseForm'
import RegisterForm from './components/RegisterForm'

import UserLoggedIn from "./types"

type Spender = {
  id: string // to use it as a key
  description: string
  amount: Number
  timestamp: string
  category: string
}

function App() {
  const username = useRef<string>("")
  const password = useRef<string>("")
  const [expenses, setExpenses] = useState<Array<string>>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const loggedInUser : MutableRefObject<UserLoggedIn | null>  = useRef(null)
  
  const { isOpen, onOpen, onClose } = useDisclosure()


  const find_spenders = async (id : Number) => {
    try {
      const response = await fetch(`http://localhost:8000/spender/${id}/expenses`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const onLoginHandler = async () => {
    try {
      // @ts-ignore
      const response = await fetch(`http://localhost:8000/login/${username.current.value}/${password.current.value}`) 
      const data = await response.json()
      loggedInUser.current = data
      setIsLoggedIn(true)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    if (isLoggedIn && loggedInUser.current) {
    find_spenders(loggedInUser.current.id)
      .then(expense => setExpenses(expense))
    }
  }, [])

  console.log(loggedInUser.current, isLoggedIn)
  return (
    <div className='app'>
      <RegisterForm isOpen={isOpen} onClose={onClose}></RegisterForm>
      <button onClick={onOpen}>Open login</button> 
      {!isLoggedIn ? (
            <LoginForm username={username} password={password} clickHandler={onLoginHandler}></LoginForm> 
      ): 
        // @ts-ignore
       (<div>{loggedInUser.current.username}</div>)
      }
      <ExpenseForm isLoggedIn={isLoggedIn} user={loggedInUser.current}></ExpenseForm>
      {expenses.map((expense: Spender) => (
        // @ts-ignore
        <Expense key={expense.id} category={expense.category} timestamp={expense.timestamp} amount={expense.amount} description={expense.description}></Expense>
      ))}
    </div>
  )
}

export default App
