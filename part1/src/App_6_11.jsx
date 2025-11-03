
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
              <StatisticLine text={"positive"} value={`${props.positive}%`} />
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