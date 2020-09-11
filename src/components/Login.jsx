import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { login } from "./../Api/index";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    status: "",
    mesasge: "",
    redirectTo: false,
  });

  const { email, password, status, mesasge, redirectTo } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((response) => {
      if (response?.status === "success") {
        localStorage.setItem("jwt", response.token);
        // localStorage.setItem("user", response.data.user._id);
        setValues({
          ...values,
          email: "",
          password: "",
          status: response.status,
          redirectTo: true,
        });
      } else if (response?.status === "fail") {
        setValues({
          ...values,
          status: response.status,
          mesasge: response.messsage,
        });
      } else {
        setValues({
          ...values,
          status: "fail",
          mesasge: "Invalid input data",
        });
      }
    });
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: status === "fail" ? "" : "none" }}
    >
      {mesasge}
    </div>
  );

  const redirectUser = () => {
    if (redirectTo) {
      return <Redirect to='/' />;
    }
  };

  const form = () => (
    <div className='card' style={{ width: "30rem" }}>
      <h6 className='card-header text-right'>
        <Link to='/signup'>Signup</Link>
      </h6>
      <h5 className='card-header text-center'>Login</h5>
      <div className='card-body'>
        {showError()}
        <form>
          <div className='form-group'>
            <label>Email address</label>
            <input
              type='email'
              className='form-control'
              onChange={handleChange("email")}
              value={email}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              className='form-control'
              onChange={handleChange("password")}
              value={password}
            />
          </div>
          <center>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </center>
        </form>
      </div>
    </div>
  );

  return (
    <div className='d-flex justify-content-center mt-5'>
      {form()}
      {redirectUser()}
    </div>
  );
};

export default Login;
