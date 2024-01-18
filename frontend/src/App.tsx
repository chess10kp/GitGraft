import { useState, useEffect, useRef, MutableRefObject } from 'react'
import {useDisclosure} from '@chakra-ui/react'

import './App.css'

import LoginForm from './components/LoginForm'
import Expense from './components/Expense'
import ExpenseForm from './components/ExpenseForm'
import RegisterForm from './components/RegisterForm'

import UserLoggedIn from "./types"
import ExpenseHeader from './components/ExpenseHeader'
import NavBar from './components/NavBar'

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
    if (isLoggedIn) {
    find_spenders(loggedInUser.current?.id || -1)
      .then(expense => setExpenses(expense))
    }
  }, [])

  console.log(expenses)
  return (
    <div className='app'>
      <NavBar></NavBar>
      <RegisterForm isOpen={isOpen} onClose={onClose}></RegisterForm>
      <button onClick={onOpen}>Open login</button> 
      {!isLoggedIn ? (
            <LoginForm username={username} password={password} clickHandler={onLoginHandler}></LoginForm> 
      ): 
        // @ts-ignore
       (<div>{loggedInUser.current.username}</div>)
      }
      {!isLoggedIn ? (
      <>
      <ExpenseForm isLoggedIn={isLoggedIn} user={loggedInUser.current}></ExpenseForm>
      <ExpenseHeader>
      {expenses.map((expense: any) => (
        // @ts-ignore
        <Expense key={expense.id} {...expense}/>
      ))}
      </ExpenseHeader> 
      </>
      ) : null }
    </div>
  )
}

export default App
