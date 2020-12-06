import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//Button component
//Exercise 1.10 
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

//Statistic component
//Exercise 1.10 (single statistic) 
//Exercise 1.11 (updated for HTML table format)
const Statistic = ({text, counter}) => (
  <tr>
    <td>{text}: </td>
    <td>{counter}</td>
  </tr>
)

//Statistics component
//Exercise 1.9 (dynamic rendering)
//Exercise 1.11 (updated for HTML table format)
const Statistics = ({good, neutral, bad}) => {  
  // Calculating total, average, percent positive
  const total = good + neutral + bad;     //total count
  const avg = (good - bad) / total;       //average VALUE
  const pos = good / total * 100;         //percentage of positive counts

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  else {
    return (
      <div>
        <table>
          <tbody>
            <Statistic text='Good' counter={good} />
            <Statistic text='Neutral' counter={neutral} />
            <Statistic text='Bad' counter={bad} />
            <Statistic text='All' counter={total} />
            <Statistic text='Average' counter={avg.toFixed(3)} />
            <Statistic text='Positive' counter={pos.toFixed(2) + "%"} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] =  useState(0);

  //Incrememts good counter
  const goodCounter = () => {
    setGood(good + 1);
  }

  //Increments neutral counter
  const neutralCounter = () => {
    setNeutral(neutral + 1);
  }

  //Increments bad counter
  const badCounter = () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>Please provide feedback!</h1>
      <Button onClick={goodCounter} text='Good' />
      <Button onClick={neutralCounter} text='Neutral' />
      <Button onClick={badCounter} text='Bad' />
      <h2>The stats:</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))