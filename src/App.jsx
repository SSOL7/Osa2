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

  // calculate total of exercises
  const totalExercises = course.reduce((total, course) => total + course.exercises, 0);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Seoul</h1>
        <Course course={course} totalExercises={totalExercises} />
      </header>
    </div>
  )
}

export default App
