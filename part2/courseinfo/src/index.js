import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
};

const Total = ({ course }) => {
  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return(
    <p>Number of exercises {sum}</p>
  ) 
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
};

const Content = ({ parts }) => {
  //console.log("What is this? ", parts)
  return (
    <div>
      {parts.map( partsInfo => <Part key={partsInfo.id} part={partsInfo} />) }
    </div>
  )
};

// Exercise 2.1
// Single Course component to contain Header, Content components 
const Course = (props) => {
  const course = props.course;
  //console.log("Array: ", course.parts.map(partsInfo => partsInfo.name))
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />

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