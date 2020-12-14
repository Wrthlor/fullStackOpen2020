import React from 'react';
import Person from './Person';

const ListNames = ({ people }) => {

    // Creates a new array of people (dislaying via <Person /> component)
    const personList = people.map( (individual) => <Person key={individual.name} info={individual} />)
    
    return (
        <div>
            {personList}
        </div>
    )
}

export default ListNames; 