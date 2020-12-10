import React, { useState } from 'react';

/*
const Note = ({ note }) => {
    return (
      <li>{note.content}</li>
    )
  }
  */

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  // Function to deal with people, add new person to "phonebook"
  const addPerson = (event) => {
    event.preventDefault();
    // Person object (contains name, number, id, etc..
    const personObject = {
        name: newName,
    }

    /*
    console.log(persons);
    console.log(persons[0]);
    console.log(persons[0].name);
    console.log("typeOf: ", typeof(newName), " Value: ", newName);
    */
    setPersons(persons.concat(personObject));
    setNewName("");
  };

  // Function to deal with new names
  const handleNewName = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
          {persons.map((name) => {
              return <ul>{name.name}</ul>;
          })}
      </div>
    </div>
  )
};

export default App;