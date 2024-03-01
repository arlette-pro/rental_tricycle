import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import UserContext from "./contexts/UserContext";

const LoginForm = () => {
    const { saveLoggedInUser } = useContext(UserContext)
    // State variables for the form data and for the form errors
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formDataError, setFormatDataError] = useState("");
  const navigate = useNavigate()
//   setting state based on what value we've changed in the form
const handleFormChange = (e) => {
    let fieldName = e.target.name;
    let newValue = e.target.value;
    setFormData({ ...formData, [fieldName]: newValue });// update with the nw value for the form
  };

  //handle form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault(); // stop page from refreshing and going to new route by default
    // Log in - we're missing an important piece with credentials!
    axios
      .post("http://localhost:8000/api/login",formData, {withCredentials: true})
      .then((res) => {
        console.log(res);
        //save the user and redirect !!!
        saveLoggedInUser(res.data)
        navigate('/dashboard')
      })
      .catch((err) => { // there was a least on validation error
        // console.log(err);
        setFormatDataError(err.response.data.message) // save error in the state
        // display invalid credentials error here!!!
      });
  };
 
  return (
    <div>
      <h1>Login form</h1>
      <p>
        New to this app? then <Link to="/">Register</Link>!
      </p>
      <form onSubmit={handleLoginSubmit}>
        <div>
          {formDataError && <p style={{ color: "red" }}> {formDataError}</p>}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </div>
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default LoginForm;
