const express = require('express');
const { getWeatherData } = require('../controllers/weatherController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.get('/weather', authenticate, getWeatherData);

module.exports = router;
