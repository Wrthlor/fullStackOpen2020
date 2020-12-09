import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
};

// Exercise 2.3
// Utilized Array.prototype.reduce() method to determine sum
const Total = ({ course }) => {
  const total = course.reduce( (sum, amnt) => sum + amnt.exercises , 0)

  return(
    <p>
      <b>Total number of exercises: {total}</b>
    </p>
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

// Exercise 2.4
// Supports arbitrary number of courses -> use Array.prototype.map() method to create array of courses
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map( (indivCourse) => <Course key={indivCourse.id} course={indivCourse} /> )}
    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'))