import React, { useState } from "react";
import './App.css'
import ListItem from "./ListItem";
import Form from "./Form";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const _handleSubmit = e => {
    e.preventDefault();
    // check if input is empty
    if (inputValue === "") return alert("Name is required");
    // check if name exists in todos
    const nameExists = todos.some(todo => todo.name === inputValue);
    const noteObject = {
      content: inputValue,
      date: new Date().toLocaleDateString('fi-FI'),
      important: Math.random() > 0.5,
      id: todos.length + 1,
    }
    if (nameExists) return alert("Name already exists on the list");
    const newArr = todos.slice();
    newArr.splice(0, 0, { name: inputValue, done: false });
    setTodos(newArr.concat(noteObject));
    console.log(noteObject);
    setInputValue("");
    return noteObject;
  };

  const _handleBntClick = ({ type, index }) => {
    const newArr = todos.slice();
    if (type === "remove") newArr.splice(index, 1);
    // else if (type === "completed") newArr[index].done = true;
    return setTodos(newArr);
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Seoul</h1>
        <Form onSubmit={_handleSubmit} value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <br />
        <ul>
        {todos.map((todo, index) => (
          <ListItem
            key={index}
            todo={todo}
            remove={() => _handleBntClick({ type: "remove", index })}
            // completed={() => _handleBntClick({ type: "completed", index })}
          />
        ))}
      </ul>
      </header>
    </div>
  )
}

export default App
