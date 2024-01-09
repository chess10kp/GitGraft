import { useState, useEffect, useRef } from 'react'

import './App.css'

import Form from './components/Form'
import Expense from './components/Expense'

type Expense = {
  id: string // to use it as a key
  description: string
  amount: Number
  timestamp: string
}

function App() {
  const username = useRef("")
  const password = useRef("")
  const [spenders, setSpenders] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)


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
      <Form username={username} password={password} clickHandler={onLoginHandler} ></Form>
      {spenders.map((spender: Expense) => (
        <Expense key={spender.id} amount={spender.amount} expense={spender.description}></Expense>
      ))}
    </div>
  )
}

export default App
