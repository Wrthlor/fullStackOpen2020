import React from 'react';

const Person = ({ info, handleDelete }) => {

  return (
    <li>
      {info.name} {""}
      {info.number} {""}
      <button onClick={() => handleDelete(info.id)} >
        Delete
      </button>
    </li>
  )
};

export default Person;