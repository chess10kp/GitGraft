import { useState, useEffect, useRef } from 'react'
import {useDisclosure} from '@chakra-ui/react'

import './App.css'

import Form from './components/Form'
import Expense from './components/Expense'
import ExpenseForm from './components/ExpenseForm'
import RegisterForm from './components/RegisterForm'

type Props = {
  id: string // to use it as a key
  description: string
  amount: Number
  timestamp: string
  category: string
}

function App() {
  const username = useRef("")
  const password = useRef("")
  const [spenders, setSpenders] = useState([])
  const isLoggedIn = useRef(false)
  
  const { isOpen, onOpen, onClose } = useDisclosure()


  const find_spenders = async () => {
    try {
      const response = await fetch("http://localhost:8000/spender/1/expenses")
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
      console.log(typeof(data))
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    find_spenders()
      .then(expense => setSpenders(expense))
  }, [])

  return (
    <div className='app'>
      <RegisterForm isOpen={isOpen} onClose={onClose}></RegisterForm>
      <button onClick={onOpen}>Open login</button> 
      <Form username={username} password={password} clickHandler={onLoginHandler}></Form>
      <ExpenseForm isLoggedIn={isLoggedIn.current}></ExpenseForm>
      {spenders.map((spender: Props) => (
        // @ts-ignore
        <Expense key={spender.id} category={spender.category} timestamp={spender.timestamp} amount={spender.amount} description={spender.description}></Expense>
      ))}
    </div>
  )
}

export default App
