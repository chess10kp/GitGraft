import { useState, useEffect } from 'react'

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
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [spenders, setSpenders] = useState([])


  function find_spenders() {
    try {
      const response = fetch("http://localhost:8000/spender/0/expenses")
        .then(res => res.json()
        )
      return response
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    let expenses = find_spenders()
      .then(expense => setSpenders(expense))
  }, [])

  return (
    <div className='app'>
      <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword}></Form>
      {spenders.map((spender: Expense) => (
        <Expense key={spender.id} amount={spender.amount} expense={spender.description}></Expense>
      ))}
    </div>
  )
}

export default App
