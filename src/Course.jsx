import React from 'react'

function Course({ course }) {
  return (
    <div>
        {course.map(course => <p key={course.name}>{course.name} {course.exercises}</p>)}
    </div>
  )
}

export default Course