import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/common/form.jsx";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice.js"
import axios from "axios"
import { Spinner } from "../components/common/spinner.jsx";
import { toast } from "react-toastify";


export default function Register() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.alerts)


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validating that the user has filled all the fields
      if (fName && lName && email && password) {
        // Sending userdata to the backend using a proxy
        dispatch(showLoading());
        
        const response = await axios.post("/api/v1/auth/register", {
          fName,
          lName,
          email,
          password
        });
  
        dispatch(hideLoading());
        
        if (response.data.success) {
          toast.success("Successfully Registered!");
          navigate("/dashboard");
        }
      } 
      else {
        toast.error("Please fill in all the fields");
      }
    } 
    catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Form Details!");
      console.log(error);
    }
  };
  

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
        <form className="card p-2" onSubmit={handleSubmit}>
          <img src="/public/logo.png" alt="logo" height={200} width={400} />

          <Form
            htmlFor="email"
            labelText={"Email Address"}
            type={"email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            name="email"
          />

          <Form
            htmlFor="fName"
            labelText={"First Name"}
            type={"text"}
            value={fName}
            handleChange={(e) => setFName(e.target.value)}
            name="fName"
          />

          <Form
            htmlFor="lName"
            labelText={"Last Name"}
            type={"text"}
            value={lName}
            handleChange={(e) => setLName(e.target.value)}
            name="lName"
          />

          <Form
            htmlFor="password"
            labelText={"Password"}
            type={"password"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          <div className="d-flex justify-content-between">
            <p>
              Already Registered <Link to="/login">Login</Link>{" "}
            </p>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
      )}
    </>
  );
}
