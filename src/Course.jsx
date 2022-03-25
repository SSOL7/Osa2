function Course({ course, totalExercises }) {
  return (
    <>
      <ul>
        {course.map((course) => (
          <li key={course.id}>
          <p>{course.name} {course.exercises}</p>
              {course.parts.map((part,i) => {
                  return(
                      <div key={i}>
                          <p>{part.name}</p>
                          <p>Total exercises: {part.exercises},</p>
                      </div>
                  )
              })}
          </li>
        ))}
      </ul>
      <p>Total exercises: {totalExercises()}</p>
    </>
  );
}

export default Course;