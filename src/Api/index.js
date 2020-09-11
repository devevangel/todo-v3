exports.signup = (name, email, password) => {
  return fetch(
    `https://desolate-reef-21809.herokuapp.com/api/v1/users/signup`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    },
  )
    .then((result) => {
      return result.json();
    })
    .catch((err) => console.log(err));
};

exports.login = (email, password) => {
  return fetch(`https://desolate-reef-21809.herokuapp.com/api/v1/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((result) => {
      return result.json();
    })
    .catch((err) => console.log(err));
};

exports.isAuthenticated = () => {
  if (localStorage.getItem("jwt")) {
    return true;
  }
};

exports.logout = () => {
  localStorage.removeItem("jwt");
};

exports.createTodo = (token, title, summary) => {
  return fetch(`https://desolate-reef-21809.herokuapp.com/api/v1/todos`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, summary }),
  })
    .then((result) => {
      return result.json();
    })
    .catch((err) => console.log(err));
};

exports.listTodos = (token) => {
  return fetch(`https://desolate-reef-21809.herokuapp.com/api/v1/todos`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((result) => result.json())
    .catch((err) => console.log(err));
};

exports.editTodo = (token, id, title, summary) => {
  return fetch(`https://desolate-reef-21809.herokuapp.com/api/v1/todos/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, summary }),
  })
    .then((result) => {
      return result.json();
    })
    .catch((err) => console.log(err));
};

exports.deleteTodo = (token, id) => {
  return fetch(`https://desolate-reef-21809.herokuapp.com/api/v1/todos/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).catch((err) => console.log(err));
};
