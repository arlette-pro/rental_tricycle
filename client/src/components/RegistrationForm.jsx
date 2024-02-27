import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import UserContext from './contexts/UserContext'

const RegistrationForm = () => {
    const { saveLoggedInUser } = useContext(UserContext);
    // state variables for the form data and for the form errors
    const [formData, setFormData] = useState({
        "firstName":"",
        "lastName":"",
        "email":"",
        "password":"",
        "confirmedPassword":""
    })

    const [formDataErrors, setFormatDataErrors] = useState({
        "firstName":"",
        "lastName":"",
        "email":"",
        "password":"",
        "confirmedPassword":""
    })
    const navigate = useNavigate();

//setting state based on what value we've changed in the form
const handleFormChange = (e) => {
    let fieldName = e.target.name;
    let newValue = e.target.value;
    setFormData({ ...formData, [fieldName]: newValue });// update with the nw value for the form
  };

  //handle form submission
const handleRegistrationSubmit = e => {
    e.preventDefault(); // Stop page for refreshing and going to new route by default
    // Now register - with credentials!!!
    axios.post("http://localhost:8000/api/register", formData,{withCredentials: true})
        .then(res => {
            console.log(res);
            //Save the newly registered user in state and then redirect!!
            saveLoggedInUser(res.data)
            navigate('/dashboard'); 
        })
        .catch(err => {
            let errorsFromBackEnd = err.response.data.errors; // Get error message object
            console.log(errorsFromBackEnd);
            let newErrorObj = {...formDataErrors};
            for (let fieldName in formDataErrors) {
                if(errorsFromBackEnd.hasOwnProperty(fieldName)) { // Error found for this field
                    newErrorObj = {...newErrorObj, [fieldName]: errorsFromBackEnd[fieldName].message};
                }else{ //clear the error otherwise
                    newErrorObj = {...newErrorObj, [fieldName]: ""};
                }
            }
            setFormatDataErrors(newErrorObj);
        });
}  

  return (
    <div>
        <h1>Registration Form</h1>
        <p>Already registered? Then <Link to="/login">Login</Link>!</p>
        <form onSubmit={handleRegistrationSubmit}>
        <div>
                {formDataErrors.firstName && <p style={{color: "red"}}>{formDataErrors.firstName}</p>}
                <label htmlFor="firstName">First name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleFormChange} />
        </div>
        <div>
                {formDataErrors.lastName && <p style={{color: "red"}}>{formDataErrors.lastName}</p>}
                <label htmlFor="lastName">Last name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleFormChange} />
        </div>
        <div>
                {formDataErrors.email && <p style={{color: "red"}}>{formDataErrors.email}</p>}
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleFormChange} />
        </div>
        <div>
                {formDataErrors.password && <p style={{color: "red"}}>{formDataErrors.password}</p>}
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleFormChange} />
        </div>
        <div>
                {formDataErrors.confirmedPassword && <p style={{color: "red"}}>{formDataErrors.confirmedPassword }</p>}
                <label htmlFor="confirmedPassword">Confirmed password:</label>
                <input type="password " name="confirmedPassword" value={formData.confirmedPassword} onChange={handleFormChange} />
                
        </div>
        <input type="submit" value="Register" />
        </form>
    </div>
  )
}

export default RegistrationForm;