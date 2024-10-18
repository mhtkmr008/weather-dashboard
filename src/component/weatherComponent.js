import React from 'react';
import { useState,useEffect } from 'react';
import WeatherService from '../service/weatherService';

const WeatherComponent=()=>{
    const [weatherData,setWeatherData]=useState(null);
    const [city,setCity]=useState('Deoghar');//default city

    useEffect(()=>{
        const fetchWeather=async (city)=>{
            try{
                const response=await WeatherService.getWeather(city);
                setWeatherData(response.data);
            }catch(error){
                console.error("Error fetching data",error);
            };
        };

        fetchWeather(city);
    },[city]);

    const handleSearch=(e)=>{
        e.preventDefault();
    };

    return(
        <div className='weather-component'>
      <h1>Weather Dashboard</h1>
      <form onSubmit={handleSearch}>
        <input type='text' placeholder='Enter City' value={city} onChange={(e)=>setCity(e.target.value)}></input>
        <button type='submit'>Search</button>
      </form>

        {weatherData ?(
            <div>
                <h2>{weatherData.name}</h2>
                <p>Temperature: {weatherData.main.temp}°C</p>
                <p>Weather:{weatherData.weather[0].description}</p>
                <p>Humidity:{weatherData.main.humidity}%</p>
            </div>):(
                <p>Loading....</p>
            )}
    </div>
    );
};

export default WeatherComponent;