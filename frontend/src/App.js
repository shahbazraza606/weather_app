import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import WeatherPage from './pages/WeatherPage';
import Navbar from './components/Navbar';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [lastLoginTime, setLastLoginTime] = useState(localStorage.getItem('lastLoginTime'));
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem('isDarkMode')) || false
  );

  const handleLoginSuccess = (token, name) => {
    const currentTime = new Date().toLocaleString();
    setAuthToken(token);
    setUserName(name);
    setLastLoginTime(currentTime);

    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', name);
    localStorage.setItem('lastLoginTime', currentTime);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUserName(null);
    setLastLoginTime(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('lastLoginTime');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  };

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    }
  }, [authToken]);

  return (
    <GoogleOAuthProvider clientId={"1098545996230-r51cdgtqdpbqibfrsanj7jl2pkqoidho.apps.googleusercontent.com"}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <Container maxWidth="lg">
            <Navbar
              authToken={authToken}
              onLogout={handleLogout}
              userName={userName}
              lastLoginTime={lastLoginTime}
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
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
          </Container>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
