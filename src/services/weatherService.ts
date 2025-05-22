import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = 'c4d28763d6cc4a24957190633252105';
const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: city,
        days: 7,
        aqi: 'no',
        alerts: 'no'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}; 