import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/form.jsx";
import { Dispatch } from "react-redux";

export default function Register() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      console.log(fName, lName, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
}
