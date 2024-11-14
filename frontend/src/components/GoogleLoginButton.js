import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Box, Snackbar, Alert } from '@mui/material';

const GoogleLoginButton = ({ onLoginSuccess }) => {
  const [error, setError] = useState(null); 

  const responseGoogle = async (response) => {
    if (!response.credential) {
      setError('Google Login Error');
      console.error('Google Login Error');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/auth/google', {
        token: response.credential
      });

      const userName = data.name;
      onLoginSuccess(data.token, userName);
    } catch (error) {
      
      if (error.response && error.response.status === 500) {
        setError('Server encountered an error. Please try again later.');
      } else if (error.code === 'ERR_BAD_RESPONSE' || error.message.includes('Network Error') || error.message.includes('ETIMEDOUT')) {
        setError('Server is not responding. Please try again later.');
      } else {
        setError('Error during authentication.');
      }
      console.error('Error during authentication:', error);
    }
  };

  const handleClose = () => {
    setError(null); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: { xs: '100%', sm: 'auto' },
        mx: 'auto', 
        my: 2,
      }}
    >
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => setError('Login Failed')}
        useOneTap
      />
      
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GoogleLoginButton;
