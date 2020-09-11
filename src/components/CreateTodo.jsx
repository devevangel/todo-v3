import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { createTodo } from "./../Api/index";

const CreateTodo = () => {
  const [values, setValues] = useState({
    title: "",
    summary: "",
    status: "",
    message: "",
    redirectTo: false,
  });

  const { title, summary, status, message, redirectTo } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    createTodo(localStorage.getItem("jwt"), title, summary).then((response) => {
      if (response?.status === "success") {
        setValues({
          ...values,
          title: "",
          summary: "",
          status: response.status,
          redirectTo: true,
        });
      } else if (response?.status === "fail") {
        setValues({
          ...values,
          status: response.status,
          message: response.message,
        });
      } else {
        setValues({
          ...values,
          status: "fail",
          message: "Invalid input data",
        });
      }
    });
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: status === "fail" ? "" : "none" }}
    >
      {message}
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
        <Link to='/'>Back</Link>
      </h6>
      <h5 className='card-header text-center'>Create todo</h5>
      <div className='card-body'>
        {showError()}
        <form>
          <div className='form-group'>
            <label>Title</label>
            <input
              type='text'
              className='form-control'
              value={title}
              onChange={handleChange("title")}
            />
          </div>
          <div className='form-group'>
            <label>Summary</label>
            <input
              type='text'
              className='form-control'
              value={summary}
              onChange={handleChange("summary")}
            />
          </div>
          <center>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleAdd}
            >
              Add
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

export default CreateTodo;
