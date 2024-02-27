import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import Header from './components/Header'

function App() {
 

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element = {<RegistrationForm/>} />
      <Route path="/login" element = {<LoginForm/>} />
      <Route path="/dashboard" element = {<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App
