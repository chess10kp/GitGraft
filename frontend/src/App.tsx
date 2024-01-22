import { useState, useEffect, useRef, MutableRefObject } from 'react'

import './App.css'

import Expense from './components/Expense'
import ExpenseForm from './components/ExpenseForm'

import UserLoggedIn from "./types"
import ExpenseHeader from './components/ExpenseHeader'
import NavBar from './components/NavBar'

import { AvatarGenerator } from 'random-avatar-generator'

function App() {
  const username : MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const password : MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const [expenses, setExpenses] = useState<Array<string>>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const loggedInUser: MutableRefObject<UserLoggedIn | null> = useRef(null)



  const find_expenses = async (id: Number) => {
    try {
      const response = await fetch(`http://localhost:8000/spender/${id}/expenses`)
      const data = await response.json()
      return data
    } catch (error) {
      console.log("Error: ", error)
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
      console.log("Error: ", error)
												return false;
    }
  }

  useEffect(() => {
    console.log("Login: " + isLoggedIn)
    if (isLoggedIn) {
      find_expenses(loggedInUser.current?.id || -1)
        .then(expense => setExpenses(expense))
    }
  }, [])

  return (
    <div className='app'>
      <NavBar isLoggedIn={isLoggedIn}
        user={loggedInUser.current}
        loginPasswordRef={password}
        loginUsernameRef={username}
        onLoginHandler={onLoginHandler}>
        {isLoggedIn ? (
          <>
            <ExpenseHeader>
              {expenses.map((expense: any) => (
                // @ts-ignore
                <Expense key={expense.id} {...expense} />
              ))}
            </ExpenseHeader>
          </>
        ) : null}
      </NavBar>
    </div>
  )
}

export default App
