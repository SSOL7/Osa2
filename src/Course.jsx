import React from 'react'

function Course({ course, totalExercises }) {
  return (
    <div>
        <p>{course.map(course => <p key={course.name}>{course.name} {course.exercises}</p>)}</p>
        <p>Total exercises: { totalExercises }</p>
    </div>
  )
}

export default Course