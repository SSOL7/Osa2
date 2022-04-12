import React from 'react'

function Phone({ contact, todos, remove }) {
  return (
  <>
    <ol>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
                <h1>{todo.name}</h1>
                <h1>{contact.phone}</h1>
                <button onClick={remove}>Remove</button>
              </li>
          )      
        })}
    </ol>
  </>
  )
}

export default Phone