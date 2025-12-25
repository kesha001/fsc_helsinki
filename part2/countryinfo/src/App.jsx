import { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import CountryList from './components/CountryList';
import serviceCountries from "./services/countries";


function App() {
  const [filterCountry, setFilterCountry] = useState('');
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleFilterCountry = (event) => {
    setFilterCountry(event.target.value);
  }

  useEffect(()=>{
        serviceCountries.getAll()
        .then((respData) => {
        // const respData = response.data
        setAllCountries(respData.map((country)=>{

          return country
         }))
        
      }).catch((error) => {
        console.log(error);
      })

  }, [])


  useEffect(()=>{
    if (filterCountry) {
      const filterMatches = allCountries.filter(
        (country) => country.name.common.toLowerCase().includes(filterCountry.toLowerCase().trim())
      )
      setFilteredCountries(filterMatches);
    } else {
      setFilteredCountries([]);
    }
  }, [filterCountry])


  const handleShowCountry = (country) => {
    setFilterCountry(country.name.common);
  }



  return (
    <>
      <div>
        find countries 
        <input type="text" value={filterCountry} onChange={handleFilterCountry}/>
      </div>
      <CountryList countries={filteredCountries} handleShowCountry={handleShowCountry} />
    </>
  )
}

export default App
