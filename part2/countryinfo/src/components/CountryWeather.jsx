const CountryWeather = ({weatherData}) => {
    const kelvinToCelsius = (kelvin) => {
        const factor = Math.pow(10, 2); // round to 2 decimals
        return Math.round((kelvin - 273.15)*factor) / factor;
    }
    
    return (
        <figure>
            <p>Temperature is {kelvinToCelsius(weatherData.main["temp"])} &#8451;</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather["icon"]}@2x.png`} 
            alt={weatherData.weather.description}/>
            <figcaption>{weatherData.weather.description}</figcaption>
            <p>Wind is {weatherData.wind["speed"]} m/s</p>
        </figure>
    )
}

export default CountryWeather;