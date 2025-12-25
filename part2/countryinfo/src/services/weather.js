import axios from 'axios';

const getCityData = (city) =>{

    const api_key = import.meta.env.VITE_OPENWEATHER_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const request = axios.get(apiUrl);
    return request.then(response=>response.data)
}

export default {
    getCityData
}