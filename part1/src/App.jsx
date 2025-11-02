// exercises 1.1-1.5
// TODO add them to a separate file

// const Header = (props) => {
//   console.log(props);
//   return (
//     <h1>{props.course}</h1>
//   )
// }

// const Part = (props) => {
//   return (
//     <p>
//         {props.part.name} {props.part.exercises}
//     </p>
//   )
// }

// const Content = (props) => {
//   return (
//     <div>
//       <Part part={props.parts[0]} />
//       <Part part={props.parts[1]} />
//       <Part part={props.parts[2]} />
//     </div>
//   )
// }

// const Total = (props) => {
//   return (
//     <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//   )
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }



//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts}/>
//       <Total parts={course.parts}/>
//     </div>
//   )
// }


// C

// const Display = ({counter}) => <div>{counter}</div>

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// import { useState } from "react"

// const App = () => {
//   const [counter, setCounter] = useState(0)

//   console.log('rendering with counter value', counter)

//   const increaseByOne = () => {

//     console.log('increasing, value before', counter)
//     setCounter(counter + 1)
//   }

//   const decreaseByOne = () => { 

//     console.log('decreasing, value before', counter)
//     setCounter(counter - 1)
//   }

//   const setToZero = () => {

//     console.log('resetting to zero, value before', counter)
//     setCounter(0)
//   }

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text="plus" />
//       <Button onClick={setToZero} text="zero" />
//       <Button onClick={decreaseByOne} text="minus" />
//     </div>
//   )
// } 


// D

// import { use } from "react"
// import { useState } from "react"

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// const History = (props) => {
//   if (props.allClicks.length == 0) {
//     return (
//       <div>the app is used by pressing the buttons</div>
//     )
//   }

//   return (
//     <div>
//       button press history: {props.allClicks.join(" ")}
//     </div>
//   )
// }

// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([]);
//   const [total, setTotal] = useState(0);


//   const handleLeftClick = () => {
//     setAll(allClicks.concat("L"));
//     const updateLeft = left + 1
//     setLeft(updateLeft);
//     setTotal(updateLeft+right);
//   }

  
//   const handleRightClick = () => {
//     setAll(allClicks.concat("R"));
//     const updateRight = right + 1;
//     setRight(updateRight);
//     setTotal(left+updateRight);
//   }

  

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text="Left" />
//       <Button onClick={handleRightClick} text="Right"/>
//       {right}
//       <History allClicks={allClicks} />
//       <p>Total: {total}</p>
//     </div>
//   )
// }


// exercises 1.6-1.11

import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <th>
        {text} 
      </th>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
    if (props.all > 0){  
      return (
        <div>
          <h1>statistics</h1>
          <table>
            <tbody>
              <StatisticLine text={"good"} value={props.good} />
              <StatisticLine text={"neutral"} value={props.neutral} />
              <StatisticLine text={"bad"} value={props.bad} />
              <StatisticLine text={"all"} value={props.all} />
              <StatisticLine text={"average"} value={props.average} />
              <StatisticLine text={"positive"} value={props.positive} />
            </tbody>
          </table>
        </div>
      )  
    }

    return (
      <div>
        <h1>statistics</h1>

        No feedback given
      </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good+neutral+bad;
  const average = (good*1 + neutral*0 + bad*-1) / all;
  const positive = (good / all)*100;


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good+1)} text={"good"}/>
      <Button onClick={() => setNeutral(neutral+1)} text={"neutral"}/>
      <Button onClick={() => setBad(bad+1)} text={"bad"}/>

      <Statistics good={good} bad={bad} neutral={neutral}
                  all={all} average={average} positive={positive}
        />
    </div>
  )
}


export default App