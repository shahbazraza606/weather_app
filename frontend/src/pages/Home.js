import React from 'react';
import { Box, Typography } from '@mui/material';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Home = ({ onLoginSuccess }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="80vh">
      <Typography variant="h4" gutterBottom>Welcome to the Weather App</Typography>
      <Typography variant="subtitle1" gutterBottom>Login with Google to access the latest weather updates.</Typography>
      <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
    </Box>
  );
};

export default Home;
