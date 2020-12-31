import React, { useState, useEffect } from 'react';

import List from './components/List';
import Form from './components/Form';
import Filter from './components/Filter';

import phonebook from './services/profiles';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [ nameFilter, setNameFilter ] = useState("");

  useEffect(() => {    
    phonebook
      .getAll()
      .then(initialProfiles => {
        setPersons(initialProfiles);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  const lowerCasedNames = persons.map( (individual) => individual.name.toLowerCase());

  const createProfile = () => {
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

    const casedName = titleCase(newName);

    const personObject = {
        name: casedName,
        number: newNumber,
    };

    // Sends personObject to server 
    // Updates persons state with new array (includes new person object)
    phonebook
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response));
        alert(`${casedName} has been added`);
      })
      .catch(error => {
        console.error(error);
      })
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

  const handleSubmit = event => {
    event.preventDefault();

    if (validity(newName, "name")) {
        alert(`${newName} is already added to phonebook`);
    }
    else {
      if(!validity(newNumber, "number")) {
        alert('Invalid number');
      }
      else {
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

  const handleDelete = id => {
    const indiv = persons.find(p => p.id === id);
    const confirmDel = window.confirm(`Delete "${indiv.name}"?`);

    if(confirmDel) {
      phonebook
        .deletePerson(id)
        .then(() => {
          const filteredPeople = persons.filter(people => people.id !== id);
          setPersons(filteredPeople);
          setNameFilter("");
        })
    }
  }

  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);
  const handleNameFilter = event => setNameFilter(event.target.value);

  const filteredList = persons.filter(people => {
    return people.name.toLowerCase().includes(nameFilter.toLowerCase())
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={nameFilter} 
        onChange={handleNameFilter} 
      />

      <h3>Add new profile</h3>
      <Form 
        handleSubmit={handleSubmit}
        nameValue={newName}
        nameChange={handleNewName}
        numberValue={newNumber}
        numberChange={handleNewNumber}
      />

      <h3>Numbers</h3>
      <List
        people={filteredList} 
        handleDelete={handleDelete}
      />
    </div>
  )
};

export default App;