import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

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

export default Course;