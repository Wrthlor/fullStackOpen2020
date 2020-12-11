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
  const [ nameFilter, setNameFilter ] = useState("");

  // Creates an array of existing names (all lower case) from person object
  const lowerCasedNames = persons.map( (individual) => individual.name.toLowerCase());

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
                (s) => s.toUpperCase() 
            );
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
    alert(`${casedName} has been added`);
  }

  // Function to check for valid numbers - number input is numeric (can contain "singular dashes")
  const validNumber = (numbr) => {
    // \s* = zero or more whitespaces, \d+ = one or more numbers, -? = zero or one dash, 
    // Supports up to 2 dashes in between 3 groups of numbers - ex. ###-###-#### (good), #-### (good), ##--# (bad), #-###-###-#### (bad)
    const numbRegex = /^(\s*|\d+-?\d*-?\d*)$/;
    return numbRegex.test(numbr);
  }

  // Function to check for existing profile
  const checkProfile = () => lowerCasedNames.includes(newName.toLowerCase());

  // Function to deal with (potential) new profile submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkProfile) {
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

  // Function to deal with new entries
  // "type" argument to determine event handler type
  const handleChange = (event, type) => {
    switch(type) {
      case "name":
        setNewName(event.target.value);
        break;
      case "number":
        setNewNumber(event.target.value);
        break;
      case "filtering":
        setNameFilter(event.target.value);
        break;
      default:
        break;
    }
  };

  // Creates new array with filtered list of names (case-insensitive)
  const filteredList = persons.filter( (people) => {
    return people.name.toLowerCase().includes(nameFilter.toLowerCase())
  });

  // Creates a new array of people (dislaying via <Person /> component)
  const personList = filteredList.map( (individual) => <Person key={individual.name} info={individual} />)

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter list of names: <input value={nameFilter} onChange={(event) => handleChange(event, "filtering")} />
      </div>

      <h2>Add new profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={(event) => handleChange(event, "name")} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(event) => handleChange(event, "number")} />
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