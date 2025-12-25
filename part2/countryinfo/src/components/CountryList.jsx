import CountryInfo from './CountryInfo';

const CountryList = ({countries, handleShowCountry}) => {

    if (countries.length > 10){
        
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (countries.length > 1){
        return (
            <div>
                {
                    countries.map(
                        (country)=><p key={country.name.common}>
                                {country.name.common} 
                                <button onClick={()=>{handleShowCountry(country)}}>Show</button>
                            </p>
                    )
                }
            </div>
        )
    }

    if (countries.length == 1){
        return(
            <div>
                <CountryInfo country={countries[0]}/>
            </div>
        )
        

    }
}

export default CountryList;