import './App.css'
import Course from './Course'

function App() {
  const course = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
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
