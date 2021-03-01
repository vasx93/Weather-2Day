const path = require('path');
const express = require('express');
const router = express.Router();
const { getWeather } = require('./controllers/weather-forecast');

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

router.post('/', getWeather);
router.post('/daily', getWeather);
router.post('/hourly', getWeather);

module.exports = router;
