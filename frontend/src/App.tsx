import { useState, useEffect } from 'react'

import './App.css'

import Form from './components/Form'
import Expense from './components/Expense'


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

  console.log(spenders)
  return (
    <div className='app'>
      {spenders.map((spender) => (
        <Expense key={spender.id} amount={spender.amount} expense={spender.description}></Expense>
      ))}
      {username}
      {password}
      <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword}></Form>
    </div>
  )
}

export default App
