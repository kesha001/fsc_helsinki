import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from "./services/persons";
import Notification from './components/Notification';
import "./index.css";


function App() {

  useEffect(() => {
    personsService
    .getAll()
    .then((personsAll) => {
      setPersons(personsAll);
    })
  }, [])

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  }

  const displayMessage = (message, delayTime=5000) => {
    setMessage(message);
    // could use condition, but easier to set it every time
    // setErrorStatus(isError); 
    setTimeout(()=>{
      setMessage(null);
      // setErrorStatus(false);
    }, delayTime)
  }

  const displayError = (message, delayTime=5000) => {
    setErrorStatus(true);
    displayMessage(message, delayTime);
    setTimeout(()=>{
      setErrorStatus(false);
    }, delayTime)
  }

  const addPerson = (event) => {
    event.preventDefault();
    // console.log(newName);
    const existingPerson = persons.find((person)=>person.name===newName)
    if (existingPerson){

        const confirmed = window.confirm(`${existingPerson.name}? is already added` +
          " to phonebook, replace the old number with the new one?")
        
        if (confirmed){
          updatePerson(existingPerson);
        }

    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personsService
        .create(newPerson)
        .then((createdPerson)=>{
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewNumber("");
          displayMessage(`${createdPerson.name} has been added to the list`)
        })
    }
  }

  const updatePerson = (existingPerson) => {
    const updatedPerson = {
      ...existingPerson,
      number: newNumber
    }
    personsService
      .update(updatedPerson)
      .then((returnedPerson)=>{
        setPersons(persons.map((person)=>{
          return person.id === returnedPerson.id ? returnedPerson : person;
        }))
        displayMessage(`${returnedPerson.name}'s number has been updated`);
      })
      .catch(error => {
        displayError(
          `Information of ${updatedPerson.name} has already been removed from the server`
        );
        setPersons(persons.filter(person => person.id !== updatedPerson.id));
      })
    setNewName("");
    setNewNumber("");
  }

  const deletePerson = (toDeletePerson) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${toDeletePerson.name}?`)
    if (confirmed){
      personsService
        .remove(toDeletePerson.id)
        // deletedPerson is nothing because delete api does not return enything
        // so I replace this with to delete in filter
        .then((deletedPerson) => {
          // console.log(deletedPerson);
          
          setPersons(persons.filter((person) => {
            return person.id !== toDeletePerson.id;
          }))
        })
    }
  }

  const personsToShow = filterName 
    ? persons.filter((person)=>(
      person.name.toLowerCase().includes(filterName.toLowerCase())
    ))
    : persons
  
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} errorStatus={errorStatus}/>

      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deleteHandler={deletePerson} />
    </div>
  )
}

export default App
