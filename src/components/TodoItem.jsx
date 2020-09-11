import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ title, summary, id, removeTodo }) => (
  <li className='list-group-item'>
    <div className='card  mb-3'>
      <div className='card-header'>{title}</div>
      <div className='card-body text-primary'>
        <p className='card-text'>{summary}</p>
      </div>
      <div className='card-footer bg-transparent '>
        <Link
          to={{
            pathname: "/edit",
            state: { prevTitle: title, prevSummary: summary, id },
          }}
          className='btn btn-outline-primary float-left'
        >
          Edit
        </Link>
        <button
          className='btn btn-outline-warning float-right'
          onClick={() => {
            removeTodo(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </li>
);

export default TodoItem;
