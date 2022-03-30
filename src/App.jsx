import React, { useState } from "react";
import './App.css'
import ListItem from "./ListItem";
import Form from "./Form";
import Phone from "./Phone";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [numberInput, setNumberInput] = useState("");
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const _handleSubmit = e => {
    e.preventDefault();
    // check if input is empty
    if (inputValue === "") return alert("Name is required");
    // check if name exists in todos
    const nameExists = todos.some(todo => todo.name === inputValue);
    const todo_object = {
      content: inputValue,
      date: new Date().toLocaleDateString('fi-FI'),
      important: Math.random() > 0.5,
      id: todos.length + 1,
    };
    // contact information object
    const phonenumbers = {
      content: numberInput,
      date: new Date().toLocaleDateString('fi-FI'),
      id: contacts.length + 1,
    };
    if (nameExists) return alert("Name already exists on the list");
    const newArr = todos.slice();
    newArr.splice(0, 0, { name: inputValue, done: false });
    setTodos(newArr.concat(todo_object));
    console.log(todo_object);
    setInputValue("");
    // Adding contact information
    const newNum = contacts.slice();
    newNum.splice(0, 0, { number: numberInput });
    setContacts(newNum.concat(phonenumbers));
    console.log(phonenumbers);
    setNumberInput("");
  };

  const _handleBntClick = ({ type, index }) => {
    const newArr = todos.slice();
    if (type === "remove") newArr.splice(index, 1);
    return setTodos(newArr);
  };

  // search filter to filter todos array
  const searchData = (value) => {
    setSearchTerm(value)
    if (searchTerm !== '') {
        const filteredData = todos.filter((todo) => {
            return Object.values(todo).join('').toLowerCase().includes(searchTerm.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else {
        setFilteredResults(todos);
    }
}

// Jaettu eri kmponentteihin

  return (
    <div className="App">
      <header className="App-header">
        <h1>Seoul</h1>
        <Form
          onSubmit={_handleSubmit}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          number={numberInput}
          onNumberChange={e => setNumberInput(e.target.value)}
          />
        <br />

        <input type="text" placeholder="Search" onChange={(e) => searchData(e.target.value)} />
        {searchTerm.length > 1 ? (
                    filteredResults.map((todo, index) => {
                        return (
                          <li key={index}>
                          <h1>{todo.name}</h1>
                        </li>
                        )
                    })
                ) : (
                    contacts.map((contact, index,) => {
                        return (
                        <Phone
                          key={index}
                          contact={contact}
                          todos={todos}
                          remove={() => _handleBntClick({ type: "remove", index })}
                        />
                        )
                    })
                )}
      </header>
    </div>
  )
}

export default App
