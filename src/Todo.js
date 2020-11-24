import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "./App";
import { v4 as uuidv4 } from "uuid";

//creating the actual todo list and sending it to the server and to mongodb
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);
  const [filter, setFilter] = useState("uncompleted");
  
//send data to the server that will the be sent to mongodb
  const persist = (newTodos) => {
    fetch(`https://to-do-list-app-mt.herokuapp.com/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => {});
  };

//everytime something changes, this will get the information from the server/mongodb
  useEffect(() => {
    fetch(`https://to-do-list-app-mt.herokuapp.com/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

//function that adds more todo items
  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

//changes if the item is checked or not
  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

//returns either checked or unchecked todo items
  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "completed" ? todo.checked : !todo.checked
    );
  };

//when clicking on an item, it'll change the item to 'completed' or 'uncompleted'
  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };
  return (
    <div>
      <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      {getTodos().map((todo) => (
        <div key={todo.id}>
          <input
            checked={todo.checked}
            onChange={() => toggleTodo(todo.id)}
            type="checkbox"
          />
          <label>{todo.text}</label>
        </div>
      ))}
      <br />
      <form onSubmit={addTodo}>
        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          type="text"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Todo;
