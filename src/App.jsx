import { useState } from 'react'
import './App.css'
import Course from './Course'

function App() {
  const course = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div className="App">
      <header className="App-header">
        <h1>Seoul</h1>
        <Course course={course} />
      </header>
    </div>
  )
}

export default App
