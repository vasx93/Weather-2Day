const { getGeocodeAPI } = require('../forecast/geocode');
const { getWeatherAPI } = require('../helper');

module.exports = {
	async getWeather(req, res) {
		try {
			if (!req.body.address || req.body.address.length === 0) {
				return res.status(404).send();
			}

			// Geocode api call -> coords + location
			const geocodeData = await getGeocodeAPI(req.body.address);

			if (!geocodeData) {
				return res.status(400).send();
			}

			// current, daily, hourly
			const url = req.originalUrl;

			// receives a weather forecast object depending on endpoint
			const weather = await getWeatherAPI(geocodeData, url);

			if (!weather) {
				return res.status(400).send();
			}

			res.status(200).send({
				weather,
				location: geocodeData.location,
			});
		} catch (err) {
			res.status(400).send(err);
		}
	},
};
