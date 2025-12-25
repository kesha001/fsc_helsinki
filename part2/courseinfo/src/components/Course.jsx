const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map((part) => {
      return <Part key={part.id} part={part} />
    })}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><strong>Total number of exercises {props.total}</strong></p>

const Course = ({course}) => {

  const totalExercises = course.parts.reduce((total, part) =>{
    return total + part.exercises;
  }, 0)

  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={totalExercises}
      />
    </div>
  )
}

export default Course;