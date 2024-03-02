import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditBookedTricycles = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [errors, setErrors] = useState([]);
    const [tricycle, setTricycle] = useState({
      location: "",
      dropOffLocation: "",
      pickUpDate: "",
      pickUpTime: "",
    });
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
    
      const handleInputChange = (e) => {
        setTricycle({ ...tricycle, [e.target.name]: e.target.value });
      };
      const submitHandler = (e) => {
        e.preventDefault();
        axios
          .put("http://localhost:8000/api/editTricycle/" + id, tricycle)
          .then((res) => {
            navigate("/dashboard");
          })
          .catch((err) => {
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
          });
      };

return (
    <div className="container mt-3 w-75">
      <div>
        <div className="d-flex justify-content-between">
          <h1>Edit Booked Tricycles</h1>
          <Link to={`/tricycles/${tricycle._id}/details`}>tricycle details</Link>        </div>
      </div>

      <form className="w-50 mt-5 row" onSubmit={submitHandler}>
        <div className="col">
        {errors.location ? (
              <p className="text-danger">{errors.location.message}</p>
            ) : null}
          <div className="mb-3 mt-3">
            <label className="form-label">Location:</label>
            <input
              className="form-control"
              type="text"
              onChange={handleInputChange}
              value={tricycle.location}
              name="location"
            />
           
          </div>
          {errors.dropOffLocation ? (
              <p className="text-danger">{errors.dropOffLocation.message}</p>
            ) : null}
          <div className="mb-3">
            <label className="form-label">DropOffLocation</label>
            <input
              className="form-control"
              type="text"
              onChange={handleInputChange}
              value={tricycle.dropOffLocation}
              name="dropOffLocation"
            />
           
          </div>
          {errors.pickUpDate ? (
              <p className="text-danger">{errors.pickUpDate.message}</p>
            ) : null}
          <div className="mb-3">
            <label className="form-label">pickUpDate</label>
            <input
              className="form-control"
              type="text"
              onChange={handleInputChange}
              value={tricycle.pickUpDate}
              name="pickUpDate"
            />
            
          </div>
          {errors.pickUpTime ? (
              <p className="text-danger">{errors.pickUpTime.message}</p>
            ) : null}
          <div>
            <label className="form-label">pickUpTime</label>
            <input
              className="form-control"
              type="text"
              onChange={handleInputChange}
              value={tricycle.pickUpTime}
              name="pickUpTime"
            />
           
            
             <button type="submit" className="btn btn-primary mt-2">
          Update
        </button>
          </div>

        </div>

     

        
      </form>
    </div>
  )
};

export default EditBookedTricycles;

