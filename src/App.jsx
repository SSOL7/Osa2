import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Form from "./Form";
import Phone from "./Phone";
import Endpoint from './api/endpoint';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('some error happened...');


  // JSON SERVER STARTS WITH COMMAND: npm run server.
  useEffect(() => {
    Endpoint.getAll().then(response => {
        setNotes(response.data);
        console.log(notes);
    });
  }, [])
  console.log('render', notes.length - 1, 'notes')

  const _handleSubmit = e => {
    e.preventDefault();
    
    if (inputValue === "") return alert("Name is required");
    const nameExists = todos.some(todo => todo.name === inputValue);

    const todo_object = {
      name: inputValue,
      number: numberInput,
      date: new Date().toLocaleDateString('fi-FI'),
      id: uuidv4(),
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
    setNumberInput("");

    // AXIOS
    Endpoint.create(todo_object).then(response => {
      setContacts(contacts.concat(response.data));
      console.log(response.data);
      setNumberInput('');
      });
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
  
  const _handleBntClick = ({ type, index }) => {
    const newArr = todos.slice();
    if (type === "remove") newArr.splice(index, 1);
    Endpoint.delete().then(response => {
      setContacts(contacts.concat(response.data))
      setNumberInput('');
    });
    return setTodos(newArr);
  };

  function handleDelete(id) {
    if(window.confirm(`Are you sure you want to delete ${id}?`)) {
      const newList = todos.filter((item) => item.id !== id);
      Endpoint.delete(id).then(response => {
        setContacts(contacts.concat(response.data))
        setNumberInput('');
      }).catch(error => {
       alert(error + '' + 'This person is already deleted from the database');
      });
      setTodos(newList);
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Seoul</h1>
        <ol>
        {notes.map((todo) => {
          return (
            <li key={todo.id} className="contacts">
                <span>Name: {todo.name}. </span>
                <span>Phone {todo.number}. </span>
                <span>Date {todo.date}, </span>
                <button type="button" onClick={() => handleDelete(todo.id)}>
                Remove
                </button>
              </li>
          )      
        })}
    </ol>
        {/* <Error message={errorMessage} /> */}

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
                        )})
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
