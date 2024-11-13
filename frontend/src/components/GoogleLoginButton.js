// frontend/src/components/GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import '../App.css';

const GoogleLoginButton = ({ onLoginSuccess }) => {
  const clientId = "1098545996230-r51cdgtqdpbqibfrsanj7jl2pkqoidho.apps.googleusercontent.com";  // Replace with your actual Google OAuth Client ID

  const responseGoogle = async (response) => {
    if (!response.credential) {
      console.error('Google Login Error');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/auth/login', {
        token: response.credential
      });

      // Store the JWT token and user info in localStorage or state
      localStorage.setItem('authToken', data.token);
      onLoginSuccess(data.token); // Pass token to parent component
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => console.log('Login Failed')}
        useOneTap
      />
    </div>
  );
};

export default GoogleLoginButton;
