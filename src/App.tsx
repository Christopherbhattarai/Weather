import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Autocomplete, TextField } from '@mui/material';
import WeatherCard from './components/WeatherCard';
import WeatherCharts from './components/WeatherCharts';
import { fetchWeatherData } from './services/weatherService';
import { WeatherData } from './types/weather';

// Common cities for suggestions
const commonCities = [
  'London',
  'New York',
  'Tokyo',
  'Paris',
  'Sydney',
  'Berlin',
  'Moscow',
  'Dubai',
  'Singapore',
  'Toronto',
  'Los Angeles',
  'Hong Kong',
  'Rome',
  'Amsterdam',
  'Barcelona',
  'Seoul',
  'Mumbai',
  'Cairo',
  'Istanbul',
  'Bangkok'
];

function App() {
  const [city, setCity] = useState('London');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [city]);

  const handleCityChange = (_event: React.SyntheticEvent, newValue: string | null) => {
    if (newValue) {
      setCity(newValue);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Autocomplete
          freeSolo
          options={commonCities}
          value={city}
          onChange={handleCityChange}
          onInputChange={(_event, newValue) => setCity(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Enter City"
              variant="outlined"
            />
          )}
          sx={{ width: '100%' }}
        />
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box sx={{ color: 'error.main', textAlign: 'center', my: 2 }}>
          {error}
        </Box>
      )}

      {weatherData && !loading && (
        <>
          <WeatherCard
            temperature={weatherData.current.temp_c}
            humidity={weatherData.current.humidity}
            condition={weatherData.current.condition.text}
            icon={weatherData.current.condition.icon}
            location={`${weatherData.location.name}, ${weatherData.location.country}`}
          />
          <WeatherCharts forecastData={weatherData.forecast.forecastday} />
        </>
      )}
    </Container>
  );
}

export default App;
