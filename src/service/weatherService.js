import axios from 'axios';

const API_KEY='c571255850f2f8c99f5c2be8f13fde30';

const WeatherService={
    getWeather(city)
        {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            return axios.get(url);
        }
};
        
    
export default WeatherService;