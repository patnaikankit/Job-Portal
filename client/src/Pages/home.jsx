import React from "react";
import "./home.css"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <video autoPlay muted loop id="video">
        <source src="/public/bg.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div className="card w-25">
          <img src="/public/logo.png" alt="logo" />
          <hr />
          <div className="card-body" style={{ marginTop: "-60px" }}>
            <h5 className="card-title">Indias No #1 Carrer Platform</h5>
            <p className="card-text">
              Search and manage your jobs with ease. A free and open source Job
              Portal Application by Ankit Patnaik
            </p>
            <div className="d-flex justify-content-between mt-5">
              <p>
                Not a user <Link to="/register">Register Here!</Link>{" "}
              </p>
              <p>
                <Link to="/login" className="button">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
