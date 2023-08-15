import React, { useState } from "react";
import Form from '../components/common/form.jsx';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice.js";
import { Spinner } from "../components/common/spinner.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((state) => state.alerts)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading())
      const { response } = await axios.post("/api/v1/auth/login", {email, password})
      if(response.success){
        dispatch(hideLoading())
        localStorage.setItem("token", response.token)
        toast.success("Login Successfully")
        navigate("/dashboard")
      }
    }
     catch(error){
      dispatch(hideLoading())
      toast.error("Invalid Credentials!")
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (<Spinner/>) : (
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
            htmlFor="password"
            labelText={"Password"}
            type={"password"}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            name="password"
          />

          <div className="d-flex justify-content-between">
            <p>
              Not a user! <Link to="/register">Register</Link>{" "}
            </p>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
      )}
    </>
  )
}

export default Login;