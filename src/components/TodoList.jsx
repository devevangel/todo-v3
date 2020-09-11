import React, { Component } from "react";
import { Link } from "react-router-dom";
import TodoItem from "./TodoItem";
import { listTodos, deleteTodo, logout } from "./../Api/index";

class TodoList extends Component {
  state = {
    todos: [],
  };

  UNSAFE_componentWillMount() {
    listTodos(localStorage.getItem("jwt")).then((response) => {
      if (response?.status === "success") {
        this.setState({ todos: response.data.todos });
      } else {
        this.setState({
          todos: {
            title: "You have no todo.",
            summary: "No todos.",
          },
        });
      }
    });
  }

  handleLogout = () => {
    logout();
    this.props.history.push("/home");
  };

  handleDelete = (id) => {
    deleteTodo(localStorage.getItem("jwt"), id);
    const newTodos = this.state.todos.filter((el) => el._id !== id);
    this.setState({ todos: newTodos });
  };

  list = () => (
    <div className='card text-center' style={{ width: "30rem" }}>
      <h6 className='card-header text-right'>
        <button className='btn btn-outline-danger' onClick={this.handleLogout}>
          Logout
        </button>
      </h6>
      <h5 className='card-header'>Todos</h5>
      <div className='card-body'>
        <ul className='list-group'>
          {this.state.todos.length > 0 ? (
            this.state.todos?.map((el, i) => (
              <TodoItem
                title={el.title}
                summary={el.summary}
                id={el._id}
                key={i}
                removeTodo={this.handleDelete}
              />
            ))
          ) : (
            <TodoItem
              title='THIS IS A DEFAULT TODO'
              summary='No summary'
              key={Math.random() * 1}
            />
          )}
        </ul>
        <div className='card-footer bg-transparent'>
          <Link to='/add' className='btn btn-primary'>
            Add todo
          </Link>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className='d-flex justify-content-center mt-5'>{this.list()}</div>
    );
  }
}

export default TodoList;
