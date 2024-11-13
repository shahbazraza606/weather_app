// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated imports
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the GoogleOAuthProvider
import Home from './pages/Home';
import WeatherPage from './pages/WeatherPage';
import './App.css';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const handleLoginSuccess = (token) => {
    setAuthToken(token);
  };

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    }
  }, [authToken]);

  return (
    // Wrap the app with GoogleOAuthProvider and pass clientId
    <GoogleOAuthProvider clientId="1098545996230-r51cdgtqdpbqibfrsanj7jl2pkqoidho.apps.googleusercontent.com">
      <Router>
        <div className="app">
          <h1>Weather Application</h1>
          <Routes>
            <Route
              path="/"
              element={authToken ? <Navigate to="/weather" /> : <Home onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/weather"
              element={authToken ? <WeatherPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
