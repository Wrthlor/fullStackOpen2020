import React from 'react';

const Person = ({ info }) => {
    return (
      <li>{info.name} {info.number}</li>
    )
};

export default Person;