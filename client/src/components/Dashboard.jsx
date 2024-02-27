import React, { useContext, useEffect } from 'react'
import UserContext from './contexts/UserContext';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const {loggedInUser} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!loggedInUser._id){
            navigate("/")
        }
    })
  return (
    <div>Welcome {loggedInUser.firstName}!</div>
  )
}

export default Dashboard