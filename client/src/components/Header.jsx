import React, { useContext } from "react";
import UserContext from "./contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = (props) => {
  const { handleLogout } = props;
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleLogoutClick = () => {
    axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then(res => {
        handleLogout(); //reset the user to {}
        navigate("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      {/* <h3>Welcome to the awesome app!</h3> */}
      {loggedInUser._id && <button onClick={handleLogout}>Log out</button>}
    </div>
  );
};

export default Header;
