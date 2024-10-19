import React from 'react';
import { useState,useEffect } from 'react';
import WeatherService from '../service/weatherService';
import '../css/weatherComponent.css';

const WeatherComponent=()=>{
    const [weatherData,setWeatherData]=useState(null);
    const [city,setCity]=useState('Deoghar');//default city
    const [background, setBackground] = useState('');

    useEffect(()=>{
        const fetchWeather=async (city)=>{
            try{
                const response=await WeatherService.getWeather(city);
                setWeatherData(response.data);

                const currentHour = new Date().getHours();
                const weatherMain = response.data.weather[0].main;

                if (weatherMain === "Rain" || weatherMain==="thunderstorm with light rain") {
                    setBackground('lightgray'); // Rainy background
                  } 
                //   else if (weatherMain === "Clear") {
                //     setBackground('yellow'); // Sunny background
                //   } else if (weatherMain === "Snow") {
                //     setBackground('lightblue'); // Snowy background
                //   } 
                  else {
                if (currentHour >= 5 && currentHour < 6) 
                    {
                        // Early Morning
                        setBackground('darkblue'); // Dark morning
                    } 
                   else if (currentHour >= 6 && currentHour < 7) 
                        {
                            setBackground('six-seven-lightblue');
                        } 
                    else if (currentHour >= 7 && currentHour < 8) 
                        {
                            setBackground('seven-eight-lightblue');
                        }
                    else if (currentHour >= 8 && currentHour < 9) 
                        {
                            setBackground('eight-nine-lightblue');
                        }
                  else if (currentHour >= 9 && currentHour < 12) 
                    {
                        // Morning
                        setBackground('lightblue'); // Light morning
                    } 
                  else if (currentHour >= 12 && currentHour < 16) 
                    {
                        // Afternoon
                        setBackground('saffron'); // Saffron afternoon
                    } 
                  else if (currentHour >= 16 && currentHour < 19) 
                    {
                        // Evening
                        setBackground('lightorange'); // Orange sunset
                    }
                   else 
                    {
                        // Night
                        setBackground('darkpurple'); // Dark night
                    }
                  }

            }catch(error){
                console.error("Error fetching data",error);
            };
        };

        fetchWeather(city);
    },[city]);

    const handleSearch=(e)=>{
        e.preventDefault();
        const trimmedCity = city.trim(); // Trim any whitespace  <-- **Added**
        if (trimmedCity) {  // Check if trimmed city is not empty  <-- **Added**
            setCity(trimmedCity); // Update the city state
        }
    };

    return(
        <div className={`weather-component ${background}`}>
      <h1>Weather Dashboard</h1>
      <form onSubmit={handleSearch}>
        <input type='text' placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)}></input>
        <button type='submit'>Search</button>
      </form>

        {weatherData ?(
            <div>
                <h2>{weatherData.name}</h2>
                <p>Temperature:🌡️{weatherData.main.temp}°C</p>
                <p>Feels Like:🌡️{weatherData.main.feels_like}°C</p>
                <p>Weather:<img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} style={{ width: '30px', height: '30px' }}></img>{weatherData.weather[0].description}</p>
                <p>Humidity:💦{weatherData.main.humidity}%</p>
                <p>Wind: 💨{weatherData.wind.speed}</p>
                <p>Coordinates: 🧭longitude:{weatherData.coord.lon}    latitude:{weatherData.coord.lat}</p>
            </div>):(
                <p>Loading....</p>
            )}
    </div>
    );
};

export default WeatherComponent;