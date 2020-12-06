import React, { useState } from 'react';
import ReactDOM from 'react-dom';

//Button component
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] =  useState(0);

  //Incrememts good counter
  const handleGood = () => {
    setGood(good + 1);
  }

  //Increments neutral counter
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  //Increments bad counter
  const handleBad = () => {
    setBad(bad + 1);
  }


  return (
    <div>
      <h1>Please provide feedback!</h1>
      <Button onClick={handleGood} text='Good' />

      <Button onClick={handleNeutral} text='Neutral' />

      <Button onClick={handleBad} text='Bad' />

      <h2>The stats:</h2>
      <p>Good: {good} <br/> Neutral: {neutral} <br/> Bad: {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))