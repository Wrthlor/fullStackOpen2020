import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Random number generator function 
// Between two numbers - min inclusive, max exclusive
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// Button for new anecdotes and to vote
// Exercises 1.12, 1.13
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// Exercise 1.13 - added "Vote button"
// Exercise 1.14 - dispalys anecdote with most number of votes
const App = (props) => {
  const [selected, setSelected] = useState(0);
  
  // Creates zero filled array of anecdotes length 
  // Using this for dynamic array length - future proofing for potential more anecdotes
  const anecVotes = Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(anecVotes);

  // Changes "selected" number, uses RNG to get different anecdotes   
  const changeSelected = () => {
    setSelected(getRandomInt(0,6));
  }

  // Exercise 1.13
  // Increments number of votes for selected anecdote
  // Note to self: For javascript updating states in arrays/objects requires to make a copy of the state
  const changeVotes = () => {
    let copy = [...votes];
    copy[selected]++;
    setVotes(copy)
  }

  // Exercise 1.14
  // Function to return index of the largest value from array
  // Note: Method below utilizes ES6 (spread operator) - included function below for "personal completion"
  function indexOfMax(arr) {
    return arr.indexOf(Math.max(...arr));
  }

  /*
  // Exercise 1.14
  // Function to return index of the largest value from array
  // Cycles through each index of array
  // Note: Used var for "old browsers"
  function indexOfMax(arr) {
    if(arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }  
  */

  return (    
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>The above anecdote has <b>{votes[selected]}</b> votes</p>
      <Button onClick={changeVotes} text='Vote' />
      <Button onClick={changeSelected} text='New anecdote' />

      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[indexOfMax(votes)]}</p>
      <p>This anecdote has <b>{votes[indexOfMax(votes)]}</b> votes</p>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes}/>
  </React.StrictMode>,
  document.getElementById('root')
);