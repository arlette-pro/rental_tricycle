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
import BookedTricycle from './components/BookedTricycle'
import EditBookedTricycles from './components/EditBookedTricycles'
import TricycleDetails from './components/TricycleDetails.jsx'

function App() {
 

  const [loggedInUser, setLoggedInUSer] = useState({});
  const saveLoggedInUser = userData => {
    const userObj = {...userData, password:""}; // clear password after registering/ logging in
    setLoggedInUSer(userObj);
  }
  const [allTricycles, setAllTricycles] = useState([])
  return (

    <>
    <UserContext.Provider value={{loggedInUser, saveLoggedInUser}} >
    <Header handleLogout={() => setLoggedInUSer({}) }/>
    <Routes>
      <Route path="/" element = {<RegistrationForm/>} />
      <Route path="/login" element = {<LoginForm/>} />
      <Route path="/dashboard" element = {<Dashboard/>} />
      <Route path="/book" element = {<BookedTricycle allTricycles={allTricycles} setAllTricycles={setAllTricycles}/>} />
      <Route path="/book/:id/edit" element = {<EditBookedTricycles />} />
      <Route path="/book/:id/details" element = {<TricycleDetails />} />
      
    </Routes>
    </UserContext.Provider>
    </>
  )
}

export default App
