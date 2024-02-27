import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import UserContext from './components/contexts/UserContext'

function App() {
 

  const [loggedInUser, setLoggedInUSer] = useState({});
  const saveLoggedInUser = userData => {
    const userObj = {...userData, password:""}; // clear password after registering/ logging in
    setLoggedInUSer(userObj);
  }

  return (

    <>
    <UserContext.Provider value={{loggedInUser, saveLoggedInUser}} >
    <Header handleLogout={() => setLoggedInUSer({}) }/>
    <Routes>
      <Route path="/" element = {<RegistrationForm/>} />
      <Route path="/login" element = {<LoginForm/>} />
      <Route path="/dashboard" element = {<Dashboard/>} />
    </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
