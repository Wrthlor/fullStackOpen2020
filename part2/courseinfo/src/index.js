import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
};

// Exercise 2.3
// Utilized Array.prototype.reduce() method to determine sum
const Total = ({ course }) => {
  const total = course.reduce( (sum, amnt) => sum + amnt.exercises , 0)

  return(
    <p>Number of exercises {total}</p>
  ) 
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map( partsInfo => <Part key={partsInfo.id} part={partsInfo} />) }
    </div>
  )
};

// Exercises 2.1, 2.2, 2.3
// Single Course component to contain Header, Content, Total components 
const Course = ({ course }) => {

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total course={course.parts} />
    </div>
  )
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'))