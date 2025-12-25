import { useState, useEffect } from "react";
import axios from "axios";
import CountryWeather from "./CountryWeather";
import weatherService from "../services/weather";

const CountryInfo = ({country}) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(()=>{
        
        if (country && !weatherData){
            
            
            const capitalName = country.capital;
            // deactivated api, need to activate to use https://home.openweathermap.org/api_keys
            weatherService.getCityData(capitalName).then((data)=>{
                // extract needed info 
                const newWeatherData = {
                    weather: data.weather[0],
                    main: data.main,
                    wind: data.wind,
                }
                setWeatherData(newWeatherData);                
            }).catch((error) => {
                alert("error with loading from weather api");
                console.log("error with loading from weather api"); 
                setWeatherData(null);
            })

            
        }
    }, [])


    // if (!weatherData){
    //     return null;
    // }
        
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h2>Languages</h2>
            <ul>
                {
                    Object.values(country.languages).map((lang)=>{
                        return <li key={lang}>{lang}</li>
                    })
                }
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            <h2>Weather in {country.capital}</h2>

            {weatherData && <CountryWeather weatherData={weatherData}/>}
        </>
    )
}

export default CountryInfo;