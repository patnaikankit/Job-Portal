import React, { useState } from "react";
import Form from '../components/common/form.jsx';
import { Link } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      console.log(email, password);
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
  )
}

export default Login;