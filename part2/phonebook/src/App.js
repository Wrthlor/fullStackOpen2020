import React, { useState } from 'react';
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  // Creates a new array of people  
  const personList = persons.map((individual) => <Person key={individual.name} info={individual} />)

  // Function to deal with people, add new person to "phonebook"
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Person object (contains name, number, id, etc..)
    const personObject = {
        name: newName,
    };
    
    // Updates persons state with new array (includes new person object)
    setPersons(persons.concat(personObject));
    setNewName("");
  };

  // Function to deal with new names
  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
          {personList}
      </div>
    </div>
  )
};

export default App;