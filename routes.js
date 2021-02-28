const path = require('path');
const express = require('express');
const router = express.Router();
const {
	getCurrentWeather,
	getDailyWeather,
	getHourlyWeather,
} = require('./controllers/weather-forecast');

//*                STATIC ROUTES

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

router.get('/daily', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/daily.html'));
});

router.get('/hourly', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/hourly.html'));
});

router.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/about.html'));
});

router.post('/weather', getCurrentWeather);
router.post('/day', getDailyWeather);
router.post('/hour', getHourlyWeather);

module.exports = router;