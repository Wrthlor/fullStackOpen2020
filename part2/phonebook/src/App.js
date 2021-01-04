import React, { useState, useEffect } from 'react';

import List from './components/List';
import Form from './components/Form';
import Filter from './components/Filter';
import Notification from './components/Notification'

import phonebook from './services/profiles';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNumber, setNewNumber ] = useState("");
  const [ nameFilter, setNameFilter ] = useState("");
  const [ notificationMessage, setNotificationMessage ] = useState(null);
  const [ notificationType, setNotificationType ] = useState(null);

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

  const getNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotificationMessage(null);
      setNotificationType(null);
    }, 5000);
  }

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
        getNotification(`"${casedName}" has been added`, "update");
      })
      .catch(error => console.log(error))
  }

  // Number input is numeric (can contain "singular dashes")
  // \s* = zero or more whitespaces, \d+ = one or more numbers, -? = zero or one dash, 
  // Supports up to 2 dashes in between 3 groups of numbers - ex. ###-###-#### (good), #-### (good), ##--# (bad), #-###-###-#### (bad)
  const checkValidNumber = number => {    
    const numbRegex = /^(\s*|\d+-?\d*-?\d*)$/;
    return numbRegex.test(number);
  }

  const checkDupeProfile = name => lowerCasedNames.includes(name.toLowerCase())

  const confirmUpdate = message =>  window.confirm(message);

  const updateProfile = (name, newNumb) => {
    const oldProf = persons.find(people => people.name.toLowerCase() === name.toLowerCase());
    const idVal = oldProf.id;
    const updatedProf = {...oldProf, number: newNumb};

    phonebook 
      .update(idVal, updatedProf)
      .then(updatedP => {
        setPersons(persons.map(people => people.id !== idVal ? people : updatedP));
        getNotification(`${titleCase(name)}'s number has been updated`, "update");
      })
      .catch(error => {
        setPersons(persons.filter(people => people.id !== idVal));
        getNotification(`Information for "${titleCase(name)}" has already been removed from server`, "error");
        console.log(error);
      })
  }

  const handleSubmit = event => {
    event.preventDefault();

    if(!checkValidNumber(newNumber)) {
      getNotification(`Invalid number`, "error");
    }
    else {
      if (newName === "" && newNumber !== "") {
        getNotification(`Please enter a name`, "error");
      }
      else {
        if (checkDupeProfile(newName)) {
          if (confirmUpdate(`"${newName}" is already added to server, replace the old number with a new one?`)) {
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
    const indiv = persons.find(people => people.id === id);
    const confirmDel = window.confirm(`Delete "${indiv.name}"?`);

    if(confirmDel) {
      phonebook
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(people => people.id !== id));
          getNotification(`"${indiv.name}" has been removed from server`, "update");
          setNameFilter("");
        })
        .catch(error => {
          setPersons(persons.filter(people => people.id !== id))
          getNotification(`Information of "${indiv.name}" has already been removed from server`, "error");
          console.log(error)
        })
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
      <Notification 
        message={notificationMessage}
        className={notificationType}
      />
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