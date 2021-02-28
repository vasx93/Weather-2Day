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
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.get('/daily', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/daily.html'));
});

router.get('/hourly', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/hourly.html'));
});

router.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/about.html'));
});

router.post('/', getCurrentWeather);
router.post('/daily', getDailyWeather);
router.post('/hourly', getHourlyWeather);

module.exports = router;
