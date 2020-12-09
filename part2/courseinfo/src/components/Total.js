import React from 'react';

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

export default Total;