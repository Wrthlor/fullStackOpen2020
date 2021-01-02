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
      .then(initialProfiles => setPersons(initialProfiles))
      .catch(error => console.error(error))
  }, []);

  const lowerCasedNames = persons.map(individual => individual.name.toLowerCase());

  // regex variable to get first letter of words in string 
  // \b = word boundary, \w = one word character, g = global
  const titleCase = str => {
    const regex = /\b(\w)/g;
    return str
      .toLowerCase()
      .replace(
        regex, 
        s => s.toUpperCase() 
      );
  };

  const createProfile = () => {
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
      .catch(error => console.error(error))
  }

  // Number input is numeric (can contain "singular dashes")
  // \s* = zero or more whitespaces, \d+ = one or more numbers, -? = zero or one dash, 
  // Supports up to 2 dashes in between 3 groups of numbers - ex. ###-###-#### (good), #-### (good), ##--# (bad), #-###-###-#### (bad)
  const checkValidNumber = number => {    
    const numbRegex = /^(\s*|\d+-?\d*-?\d*)$/;
    return numbRegex.test(number);
  }

  const checkDupeProfile = name => lowerCasedNames.includes(name.toLowerCase())

  const confirmUpdate = name =>  window.confirm(`"${name}" is already added to phonebook, replace the old number with a new one?`);

  const updateProfile = (name, newNumb) => {
    const oldProf = persons.find(p => p.name.toLowerCase() === name.toLowerCase());
    const idVal = oldProf.id;
    const updatedProf = {...oldProf, number: newNumb};

    phonebook 
      .update(idVal, updatedProf)
      .then(updatedP => 
        setPersons(persons.map(p => 
          p.id !== idVal ? p : updatedP
        ))
      )
      .catch(error => console.error(error))

    alert(`${titleCase(name)} has been update`);
  }

  const handleSubmit = event => {
    event.preventDefault();

    if(!checkValidNumber(newNumber)) {
      alert('Invalid number');
    }
    else {
      if (newName === "" && newNumber !== "") {
        alert('Please enter a name');
      }
      else {
        if (checkDupeProfile(newName)) {
          if (confirmUpdate(newName)) {
            updateProfile(newName, newNumber);
          }
        }
        else {
          createProfile();
        }        
      }
    }

    setNewName("");
    setNewNumber("");
  }

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
        .catch(error => console.error(error))
    }
  }

  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);
  const handleNameFilter = event => setNameFilter(event.target.value);

  const filteredList = persons.filter(people => 
    people.name.toLowerCase().includes(nameFilter.toLowerCase())
  )

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