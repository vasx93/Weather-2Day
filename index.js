require('dotenv').config();
const path = require('path');
const express = require('express');
const server = express();
const {
	getCurrentWeather,
	getDailyWeather,
	getHourlyWeather,
} = require('./controllers/weather-forecast');

//*             MIDDLEWARE

server.use(express.static(path.join(__dirname, './public')));
server.use(
	express.urlencoded({
		extended: true,
	})
);
server.use(express.json());

//*                STATIC ROUTES

server.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

server.get('/daily', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/daily.html'));
});

server.get('/hourly', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/hourly.html'));
});

server.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/about.html'));
});

server.post('/weather', getCurrentWeather);
server.post('/day', getDailyWeather);
server.post('/hour', getHourlyWeather);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('---Server running');
});
