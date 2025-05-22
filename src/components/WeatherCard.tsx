import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  condition: string;
  icon: string;
  location: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  humidity,
  condition,
  icon,
  location,
}) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {location}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <img src={icon} alt={condition} style={{ width: 64, height: 64 }} />
          <Typography variant="h4" sx={{ ml: 2 }}>
            {temperature}°C
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThermostatIcon sx={{ fontSize: 24 }} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {temperature}°C
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WaterDropIcon sx={{ fontSize: 24 }} />
            <Typography variant="body1" sx={{ ml: 1 }}>
              {humidity}%
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {condition}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard; 