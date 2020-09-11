import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <HashRouter className='container'>
      <Switch>
        <Route path='/home' exact component={Home} />
        <Route path='/signup' exact component={Signup} />
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/add' exact component={CreateTodo} />
        <PrivateRoute path='/edit' exact component={EditTodo} />
        <PrivateRoute path='/' exact component={TodoList} />
      </Switch>
    </HashRouter>
  );
}

export default App;
