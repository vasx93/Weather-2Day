const { getGeocodeAPI } = require('../forecast/geocode');
const { currentWeather } = require('../forecast/current-weather');
const { dailyWeather } = require('../forecast/daily-weather');
const { hourlyWeather } = require('../forecast/hourly-weather');

module.exports = {
	async getCurrentWeather(req, res) {
		try {
			if (!req.body.address || req.body.address.length === 0) {
				return res.status(400).send();
			}

			const geocodeData = await getGeocodeAPI(req.body.address);

			if (!geocodeData) {
				return res.status(500).send();
			}

			const weather = await currentWeather(geocodeData);

			if (!weather) {
				return res.status(404).send();
			}

			res.status(200).send({
				weather,
				location: geocodeData.location,
			});
		} catch (err) {
			res.status(400).send(err);
		}
	},

	async getDailyWeather(req, res) {
		try {
			if (!req.body.address) {
				return res.status(400).send();
			}
			const geocodeData = await getGeocodeAPI(req.body.address);

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
		} catch (err) {
			res.status(400).send(err.message);
		}
	},

	async getHourlyWeather(req, res) {
		try {
			if (!req.body.address) {
				return res.status(400).send();
			}
			const geocodeData = await getGeocodeAPI(req.body.address);

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
		} catch (err) {
			res.status(400).send(err.message);
		}
	},
};
