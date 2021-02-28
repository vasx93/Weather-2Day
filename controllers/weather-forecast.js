const { getGeocodeAPI } = require('../forecast/geocode');
const { currentWeather } = require('../forecast/current-weather');
const { dailyWeather } = require('../forecast/daily-weather');
const { hourlyWeather } = require('../forecast/hourly-weather');

module.exports = {
	async getCurrentWeather(req, res) {
		if (!req.body.location) {
			return res.status(400).send({
				error: 'Address is required',
			});
		}
		const geocodeData = await getGeocodeAPI(req.body.location);

		if (!geocodeData) {
			return res.status(404).send();
		}

		const weather = await currentWeather(geocodeData);

		if (!weather) {
			return res.status(404).send();
		}

		res.status(200).send({
			weather,
			location: geocodeData.location,
		});
	},
	async getDailyWeather(req, res) {
		if (!req.body.location) {
			return res.status(400).send({
				error: 'Address is required',
			});
		}
		const geocodeData = await getGeocodeAPI(req.body.location);

		if (!geocodeData) {
			return res.status(404).send();
		}

		const weather = await dailyWeather(geocodeData);

		if (!weather) {
			return res.status(404).send();
		}

		res.status(200).send({
			weather,
			location: geocodeData.location,
		});
	},

	async getHourlyWeather(req, res) {
		if (!req.body.location) {
			return res.status(400).send({
				error: 'Address is required',
			});
		}
		const geocodeData = await getGeocodeAPI(req.body.location);

		if (!geocodeData) {
			return res.status(404).send();
		}

		const weather = await hourlyWeather(geocodeData);

		if (!weather) {
			return res.status(404).send();
		}

		res.status(200).send({
			weather,
			location: geocodeData.location,
		});
	},
};
