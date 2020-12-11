import React, { useState } from 'react';
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");


  // Creates a new array of people  
  const personList = persons.map( (individual) => <Person key={individual.name} info={individual} />)

  // Function to deal with people, add new person to "phonebook"
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Checks if name already exists in phonebook (case-insensitive)
    // Creates an array of existing names (all lower case) from person object
    const names = persons.map( (individual) => individual.name.toLowerCase());

    // Creates a new profile to be "added" to the phonebook
    const createProfile = () => {
      // Function to "title case" given name
      // regex variable to get first letter of words in string 
      // \b = word boundary, \w = one word character, g = global
      const regex = /\b(\w)/g;
      const titleCase = (str) => {
          return str
              .toLowerCase()
              .replace(
                  regex, 
                  (s) => s.toUpperCase() );
      };

      // Capitalized first letter of names
      const casedName = titleCase(newName);

      // Person object (contains name, number, id, etc..)
      const personObject = {
          name: casedName,
          number: newNumber,
      };

      // Updates persons state with new array (includes new person object)
      setPersons(persons.concat(personObject));
    }
    
    // Functin to check for valid numbers - number input is numeric (can contain "singular dashes")
    const validNumber = (numbr) => {
      // \s* = zero or more whitespaces, \d+ = one or more numbers, -? = zero or one dash, 
      // Supports up to 2 dashes in between 3 groups of numbers - ex. ###-###-#### (good), #-### (good), ##--# (bad), #-###-###-#### (bad)
      const numbRegex = /^(\s*|\d+-?\d*-?\d*)$/;
      return numbRegex.test(numbr);
    }

    if (names.includes(newName.toLowerCase())) {
        alert(`${newName} is already added to phonebook`);
    }
    else {
      if(!validNumber(newNumber)) {
        alert('Invalid number');
      }
      else {
        // Checks for name input if number is given
        if (newName === "" && newNumber !== "") {
          alert('Please enter a name');
        }
        else {
          createProfile();
        }
      }
    }

    setNewName("");
    setNewNumber("");
  };

  // Function to deal with new names
  // "type" argument to determine event handler type
  const handleChange = (event, type) => {
    switch(type) {
      case "name":
        setNewName(event.target.value);
        break;
      case "number":
        setNewNumber(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={(event) => handleChange(event, "name")} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => handleChange(event, "number")} />
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