import React from 'react'

function Course({ course, totalExercises }) {
  return (
    <div>
        {/* <p>{course.map(course => <p key={course.name}>{course.name} {course.exercises}</p>)}</p>
        <p>{course.map(course => <p key={course.name}>{course.parts[0].name} {course.exercises}</p>)}</p> */}

        {course.map(course => {
          return (
          <li key={course.name}>
            {course.name} {course.parts[0].name} {course.parts[0].exercises}
            {course.parts[1].name} {course.parts[1].exercises}
          </li>
          )
        })}

        
        
        <p>Total exercises: { totalExercises }</p>
    </div>
  )
}

export default Course