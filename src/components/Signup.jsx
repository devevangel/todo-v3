import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { signup } from "./../Api/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    status: "",
    message: "",
    redirectTo: false,
  });

  const { name, email, password, status, message, redirectTo } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password).then((response) => {
      if (response?.status === "success") {
        localStorage.setItem("jwt", response.token);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          status: response.status,
          redirectTo: true,
        });
      } else if (response?.status === "fail") {
        setValues({
          ...values,
          status: response.status,
          message: response.message,
        });
      }
    });
  };

  const redirectUser = () => {
    if (redirectTo) {
      return <Redirect to='/' />;
    }
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: status === "fail" ? "" : "none" }}
    >
      {message}
    </div>
  );

  const form = () => (
    <div className='card text-center' style={{ width: "30rem" }}>
      <h6 className='card-header text-right'>
        <Link to='/login'>Login</Link>
      </h6>
      <h5 className='card-header'>Signup</h5>
      <div className='card-body'>
        {showError()}
        <form>
          <div className='form-group'>
            <label>Fullname</label>
            <input
              required={true}
              type='text'
              className='form-control'
              value={name}
              onChange={handleChange("name")}
            />
          </div>
          <div className='form-group'>
            <label>Email address</label>
            <input
              required={true}
              type='email'
              className='form-control'
              value={email}
              onChange={handleChange("email")}
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              className='form-control'
              onChange={handleChange("password")}
            />
          </div>
          <button
            type='submit'
            className='btn btn-outline-primary'
            onClick={handleSubmit}
          >
            Submit
          </button>
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

export default Signup;
