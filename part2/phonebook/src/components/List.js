import React from 'react';
import Person from './Person';

const List = ({ people, handleDelete}) => {

    // Creates a new array of people (dislaying via <Person /> component)
    const profileList = people.map( (individual) => <Person key={individual.id} info={individual} handleDelete={handleDelete} />)
    
    return (
        <div>
            {profileList}
        </div>
    )
};

export default List; 