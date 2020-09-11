import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { editTodo } from "./../Api/index";

const EditTodo = ({ history, location }) => {
  const [values, setValues] = useState({
    title: location.state.prevTitle,
    summary: location.state.prevSummary,
    id: location.state.id,
    status: "",
    message: "",
    redirectTo: false,
  });

  const { title, summary, id, status, message, redirectTo } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    editTodo(localStorage.getItem("jwt"), id, title, summary).then(
      (response) => {
        if (response?.status === "success") {
          setValues({
            ...values,
            title: "",
            summary: "",
            id: "",
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
      },
    );
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
      <h5 className='card-header text-center'>Edit todo</h5>
      <div className='card-body'>
        {showError()}
        <form>
          <div className='form-group'>
            <label>Title</label>
            <input
              type='text'
              className='form-control'
              onChange={handleChange("title")}
              value={title}
            />
          </div>
          <div className='form-group'>
            <label>Summary</label>
            <input
              type='text'
              className='form-control'
              onChange={handleChange("summary")}
              value={summary}
            />
          </div>
          <center>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleUpdate}
            >
              Update
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

export default EditTodo;
