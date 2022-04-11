import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Form from "./Form";
import Phone from "./Phone";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [notes, setNotes] = useState([]);
  // JSON SERVER STARTS WITH COMMAND: npm run server.
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const _handleSubmit = e => {
    e.preventDefault();
    // check if input is empty
    if (inputValue === "") return alert("Name is required");
    // check if name exists in todos
    const nameExists = todos.some(todo => todo.name === inputValue);
    const todo_object = {
      content: inputValue,
      phone: numberInput,
      date: new Date().toLocaleDateString('fi-FI'),
      important: Math.random() > 0.5,
      id: uuidv4(), 
      // id: todos.length + 1,
    };
    // contact information object
    // const phonenumbers = {
    //   content: numberInput,
    //   date: new Date().toLocaleDateString('fi-FI'),
    //   id: uuidv4(),
    //   // id: contacts.length + 1,
    // };
    if (nameExists) return alert("Name already exists on the list");
    const newArr = todos.slice();
    newArr.splice(0, 0, { name: inputValue, done: false });
    setTodos(newArr.concat(todo_object));
    console.log(todo_object);
    setInputValue("");
    // Adding contact information
    const newNum = contacts.slice();
    newNum.splice(0, 0, { number: numberInput });
    // setContacts(newNum.concat(phonenumbers));
    // console.log(phonenumbers);
    setNumberInput("");
    // axios.post('http://localhost:3001/notes', todo_object).then(response => {
    //   setTodos(todos.concat(response.data));
    // })

    // axios post request to add contact information
    axios.post('http://localhost:3001/notes', todo_object).then(response => {
      setContacts(contacts.concat(response.data));
    });


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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Seoul</h1>
        <ol>
        {notes.map((todo, index) => {
          return (
            <li key={index}>
                <span>{todo.name}: </span>
                <span>{todo.number}</span>
              </li>
          )      
        })}
    </ol>
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
