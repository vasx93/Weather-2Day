const { currentWeather } = require('./forecast/current-weather');
const { dailyWeather } = require('./forecast/daily-weather');
const { hourlyWeather } = require('./forecast/hourly-weather');

module.exports = {
	async getWeatherAPI(geocodeData, url) {
		let weather;

		// checking for url endpoint
		if (url === '/') {
			weather = await currentWeather(geocodeData);
		} else if (url === '/daily') {
			weather = await dailyWeather(geocodeData);
		} else if (url === '/hourly') {
			weather = await hourlyWeather(geocodeData);
		}
		return weather;
	},
};
