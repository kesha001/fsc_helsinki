const Filter = ({filterName, handleFilterNameChange}) => {
    return(    
        <div>
            Filter shown with: <input value={filterName} onChange={handleFilterNameChange}/>
        </div>
    )
}

export default Filter;