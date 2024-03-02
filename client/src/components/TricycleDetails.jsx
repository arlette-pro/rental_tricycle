import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const TricycleDetails = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tricycle, setTricycle] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/detailsTricycle/" + id)
      .then((res) => {
        console.log(res.data);
        setTricycle(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  const deleteHandle = () => {
    axios
      .delete("http://localhost:8000/api/deleteTricycle/" + id)
      .then((err) => {
        navigate("/dashboard");
      })
      .catch((err) => {});
  };

  return (
    <div className="mt-5 container w-75 mx-auto">
      <div className="d-flex justify-content-between">
        <h1>details tricycle</h1>
        {/* <Link to={"/"}>Back to home </Link> */}
      </div>
      <div className="d-flex justify-content-between">
        <p className="text-secondary fs-3 ">Location: {tricycle.location}</p>
        
      </div>
      <div className="w-75 mx-auto ">
        <p className="text-secondary fs-4">
          dropOffLocation: {tricycle.dropOffLocation}
        </p>
      </div>
      <div>
      <p className="text-secondary fs-4">pickUpDate: {tricycle.pickUpDate}</p> 
      </div>
      <div>
      <p className="text-secondary fs-4">pickUpTime: {tricycle.pickUpTime}</p> 
      </div>
      <button onClick={deleteHandle} className="btn btn-danger">
          REMOVE
        </button>
    </div>
  );
};

export default TricycleDetails;
