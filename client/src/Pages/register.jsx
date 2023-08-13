import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    fName: "",
    email: "",
    lName: "",
    password: "",
  });

  const handleChange = (event) => {
    const { content, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [content]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form className="card p-2" onSubmit={handleSubmit}>
        <img src="/public/logo.png" alt="logo" height={200} width={400} />

        <div className="mb-1">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={data.email}
            onChange={handleChange}
            name="email"
          />
        </div>

        <div className="mb-1">
          <label htmlFor="fName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            name="fName"
            value={data.fName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1">
          <label htmlFor="lName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            name="lName"
            value={data.lName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-1">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={data.password}
            onChange={handleChange}
            name="password"
          />
        </div>

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
