import React, { useState, useEffect } from 'react';
import ListNames from './components/ListNames';
import Form from './components/Form';
import Filter from './components/Filter';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [ nameFilter, setNameFilter ] = useState("");

  useEffect(() => {
    console.log('effect')
  
    const eventHandler = response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }
  
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, []);

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

  // Function to check for valid names/numbers 
  // Name is unique (not already added)
  // Number input is numeric (can contain "singular dashes")
  const validity = (check, item) => {
    
    if (item === "number") {
      // \s* = zero or more whitespaces, \d+ = one or more numbers, -? = zero or one dash, 
      // Supports up to 2 dashes in between 3 groups of numbers - ex. ###-###-#### (good), #-### (good), ##--# (bad), #-###-###-#### (bad)
      const numbRegex = /^(\s*|\d+-?\d*-?\d*)$/;
      return numbRegex.test(check);
    }

    if (item === "name") {
      return lowerCasedNames.includes(check.toLowerCase())
    }
  }
  
  // Function to deal with (potential) new profile submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validity(newName, "name")) {
        alert(`${newName} is already added to phonebook`);
    }
    else {
      if(!validity(newNumber, "number")) {
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={nameFilter} 
        onChange={(event) => handleChange(event, "filtering")} 
      />

      <h3>Add new profile</h3>
      <Form 
        handleSubmit={(event) => handleSubmit(event)}
        nameValue={newName}
        nameChange={(event) => handleChange(event, "name")}
        numberValue={newNumber}
        numberChange={(event) => handleChange(event, "number")}
      />

      <h3>Numbers</h3>
      <ListNames people={filteredList} />
    </div>
  )
};

export default App;