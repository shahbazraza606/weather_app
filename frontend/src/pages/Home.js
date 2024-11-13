// frontend/src/pages/Home.js
import React from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Home = ({ onLoginSuccess }) => {
  return (
    <div className="home">
      <h2>Welcome to the Weather App</h2>
      <GoogleLoginButton onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

export default Home;
