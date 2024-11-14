import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Switch } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ authToken, onLogout, userName, lastLoginTime, isDarkMode, toggleTheme }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isDarkMode ? '#333' : '#1976d2',
        width: '100%',
        padding: '0.5rem 0',
        borderRadius: '0px 0px 50px 50px', 
        overflow: 'hidden',
        transform: 'translateY(-10px)', 
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(0)',
        },
        clipPath: 'ellipse(130% 100% at 50% 0%)', 
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: authToken ? 'space-between' : 'center', 
          alignItems: 'center',
          padding: { xs: '0 1rem', sm: '0 2rem' },
        }}
      >
        
        {!authToken && (
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' }, 
              flexGrow: 1,
              textAlign: 'center',
            }}
          >
            Weather Application
          </Typography>
        )}

        {authToken && (
          <>
            
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.5rem', md: '1.8rem' },
                display: { xs: 'none', sm: 'block' },
                flexGrow: 1,
                textAlign: 'left',
              }}
            >
              Weather Application
            </Typography>

            <Box display="flex" alignItems="center">
              <Box mr={2} textAlign="right">
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Hello, {userName || 'User'}
                </Typography>
                
              </Box>
              <IconButton color="inherit" onClick={onLogout}>
                <PowerSettingsNewIcon fontSize="medium" />
              </IconButton>
            </Box>
          </>
        )}

      
        <Box ml={authToken ? 2 : 0} display="flex" alignItems="center">
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
