const Persons = ({personsToShow, deleteHandler}) => {
    return(
        <ul>
            {personsToShow.map((person) => 
            <li key={person.name}>{person.name} {person.number} <button onClick={()=>deleteHandler(person)}>Delete</button></li>
            )}
        </ul>
    )
}

export default Persons;