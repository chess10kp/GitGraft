import { useState, useEffect, useRef, MutableRefObject } from 'react'

import './App.css'

import Expense from './components/Expense'

import UserLoggedIn from "./types"
import ExpenseHeader from './components/ExpenseHeader'
import NavBar from './components/NavBar'
import Hero from './components/Hero'

import { AvatarGenerator } from 'random-avatar-generator'

import awaitPostRequestHandler from './utils'

function App() {
  const username: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const password: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const [expenses, setExpenses] = useState<Array<string>>([])
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const loggedInUser: MutableRefObject<UserLoggedIn | null> = useRef({ id: 1, username: "shivani", password: "$2b$12$pn.WVVUJAk5OqLdQrF2wd.TLpQUjoukPAtqKk.srATROquDiBGUyy", avatarUrl: "https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Red&clotheType=ShirtScoopNeck&eyeType=Dizzy&eyebrowType=AngryNatural&facialHairColor=Platinum&facialHairType=MoustacheMagnum&hairColor=Red&hatColor=PastelGreen&mouthType=Eating&skinColor=DarkBrown&topType=ShortHairDreads02" })




  const onDeleteExpenseHandler = (expense_id: Number) => {
    awaitPostRequestHandler(`http://localhost:8000/spender/${loggedInUser.current?.id}/expenses/delete/${expense_id}`, null, "DELETE")
    find_expenses(loggedInUser.current?.id || -1)
  }

  const onCreateExpenseHandler = (amount:Number, description: string, category:string) => {
    awaitPostRequestHandler(`http://localhost:8000/${loggedInUser.current?.id}/expenses/new`, 
    JSON.stringify(
        {
        amount: amount, 
        description: description, 
        category: category
        }
      ))
  }

  const find_expenses = (id: Number) => {
    try {
      fetch(`http://localhost:8000/spender/${id}/expenses`).then(
        res => {
          console.log(res)
          return res.json()
        }
      ).then(
        data => {
          setExpenses(data)
          console.log(data)
        }
      )
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
    if (isLoggedIn) {
      find_expenses(loggedInUser.current?.id || -1)
    }
  }, [])

  useEffect(() => {
    console.log(expenses)
  }, [expenses])

  return (
    <div className='app'>
      {isLoggedIn ?
        (
          <>
            <NavBar isLoggedIn={isLoggedIn}
              user={loggedInUser.current}
              loginPasswordRef={password}
              loginUsernameRef={username}
              onLoginHandler={onLoginHandler}>
              <>
                <ExpenseHeader>
                  {expenses.map((expense: any) => (
                    // @ts-ignore
                    <Expense key={expense.id}
                      {...expense}
                      onDeleteHandler={onDeleteExpenseHandler}
                    />
                  ))}
                </ExpenseHeader>
              </>
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


