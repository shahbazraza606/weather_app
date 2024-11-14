import React from 'react';
import WeatherSearch from '../components/WeatherSearch';
import { Box, Typography } from '@mui/material';

const WeatherPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>Weather Information</Typography>
      <WeatherSearch />
    </Box>
  );
};

export default WeatherPage;
