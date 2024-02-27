import React, { useContext } from 'react'
import UserContext from './contexts/UserContext'

const Header = props => { 
    const {handleLogout} = props;
    const {loggedInUser} = useContext(UserContext)
    
  return (
    <div>
        <h3>Welcome to the awesome app!</h3>
        {loggedInUser._id && <button onClick={handleLogout}>Log out</button> }
    </div>
  )
}

export default Header