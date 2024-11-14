import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, IconButton, Card, CardContent, CardActions, Grid, Divider, Snackbar, Alert } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);

  const handleCityChange = (e) => setCity(e.target.value);

  const fetchWeatherData = async (selectedCity = city) => {
    if (!selectedCity) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`http://localhost:5000/api/weather?city=${selectedCity}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setWeatherData(data);
    } catch (err) {
      
      if (err.response) {
        setError(`Error ${err.response.status}: ${err.response.statusText}`);
      } else {
        setError('Server is not responding. Please try again later.');
      }
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    const updatedFavorites = favorites.includes(city)
      ? favorites.filter((fav) => fav !== city)
      : [...favorites, city];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleSelectFavorite = (favorite) => {
    setCity(favorite);
    fetchWeatherData(favorite);
  };

  const handleCloseError = () => {
    setError(null); 
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 4, borderRadius: 2, backgroundColor: 'background.default' }}>
      
      {/* Input Section */}
      <Box sx={{ display: 'flex', mb: 3, p: 2, borderRadius: 2, backgroundColor: 'background.paper', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <TextField
          label="Enter City"
          variant="outlined"
          value={city}
          onChange={handleCityChange}
          sx={{ flex: 1, mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={() => fetchWeatherData()} sx={{ flexShrink: 0 }}>
          Get Weather
        </Button>
      </Box>

      
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}
      {weatherData && (
        <Card sx={{ mt: 3, p: 2, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', borderRadius: 2, backgroundColor: 'background.paper' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>{weatherData.city}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>Temperature: {weatherData.temperature} °C</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>Weather: {weatherData.weather}</Typography>
            <Typography variant="body1">Humidity: {weatherData.humidity}%</Typography>
          </CardContent>
          <CardActions>
            <IconButton color="secondary" onClick={handleToggleFavorite}>
              {favorites.includes(city) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </CardActions>
        </Card>
      )}

     
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Favorite Cities</Typography>
        <Grid container spacing={2}>
          {favorites.map((favorite) => (
            <Grid item xs={6} sm={4} key={favorite}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleSelectFavorite(favorite)}
                fullWidth
                sx={{ textTransform: 'capitalize' }}
              >
                {favorite}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

     
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WeatherSearch;
