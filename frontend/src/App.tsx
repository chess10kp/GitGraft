import { useState, useEffect, useRef, MutableRefObject } from 'react'

import './App.css'

import Expense from './components/Expense'

import UserLoggedIn from "./types"
import ExpenseHeader from './components/ExpenseHeader'
import NavBar from './components/NavBar'
import Hero from './components/Hero'

import { AvatarGenerator } from 'random-avatar-generator'

import awaitPostRequestHandler from './utils'
import Dashboard from './components/Dashboard'

function App() {
  const username: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const password: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const [expenses, setExpenses] = useState<Array<string>>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [update, setUpdate] = useState(false)
  const loggedInUser: MutableRefObject<UserLoggedIn | null> = useRef(null)
  const [showDashboard, setShowDashboard] = useState(true)


  const onCreateExpenseHandler = async (expenseAmount:string, expenseCategory:string, expenseDescription:string) => { 
    const response  = await awaitPostRequestHandler(`http://localhost:8000/spender/${loggedInUser.current?.id || -1}/expenses/new`, 
      JSON.stringify({
        amount: expenseAmount, 
        category: expenseCategory,
        description: expenseDescription
      }) ,"POST") 
    if (!response.ok) {
      alert("Error creating expense. Is the server running?")
    }
    setUpdate((prev) => !prev)

  }


  const onDeleteExpenseHandler = (expense_id: Number) => {
    awaitPostRequestHandler(`http://localhost:8000/spender/${loggedInUser.current?.id}/expenses/delete/${expense_id}`, null, "DELETE")
    find_expenses(loggedInUser.current?.id || -1)
    setUpdate((prev) => !prev)
  }

  const find_expenses = (id: Number) => {
    try {
      fetch(`http://localhost:8000/spender/${id}/expenses`).then(
        res => {
          return res.json()
        }
      ).then(
        data => {
          setExpenses(data)
        }
      )
    } catch (error) {
    }
  }

  const generateAvatar = (loggedInUser: any) => {
    const generator = new AvatarGenerator();
    // @ts-ignore 
    loggedInUser.current.avatarUrl = generator.generateRandomAvatar(loggedInUser.current.username);
  }
  const onLoginHandler = async () => {
    try {
      const response = await fetch(`http://localhost:8000/login/${username.current.value}/${password.current.value}`)
      const data = await response.json()
      if (data == null) {
        alert("login failed")
      }
      loggedInUser.current = data
      generateAvatar(loggedInUser)
      setIsLoggedIn(true)
      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      find_expenses(loggedInUser.current?.id || -1)
    }
  }, [update])

  return (
    <div className='app'>
      {isLoggedIn ?
        (
          <>
            <NavBar isLoggedIn={isLoggedIn}
              user={loggedInUser.current}
              loginPasswordRef={password}
              loginUsernameRef={username}
              onCreateExpenseHandler={onCreateExpenseHandler}
              onLoginHandler={onLoginHandler}
              setShowDashboard={setShowDashboard}>
              {showDashboard ? 
                <Dashboard
                  expenses={expenses}
              ></Dashboard> : 
                expenses.length ?  
              <>
                <ExpenseHeader>
                  {expenses.map((expense: any) => (
                    // @ts-ignore
                    <Expense key={expense.id}
                      {...expense}
                      setUpdate={setUpdate}
                      onDeleteHandler={onDeleteExpenseHandler}
                    />
                  ))}
                </ExpenseHeader>
              </>
              : null} 
            </NavBar>
          </>
        ) :
        (
          <Hero
            loginPasswordRef={password}
            loginUsernameRef={username}
            onLoginHandler={onLoginHandler}
          ></Hero>
        )
      }
    </div>
  )
}

export default App


