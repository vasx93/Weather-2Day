const axios = require('axios');

module.exports = {
	async getWeatherAPI(geocodeData, url) {
		try {
			// Current weather
			if (url === '/') {
				const res = await axios.get(
					`https://api.openweathermap.org/data/2.5/onecall?lat=${geocodeData.latitude}&lon=${geocodeData.longitude}&exclude=current,minutely&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
				);
				return [res.data.daily[0], res.data.hourly[0]];
			}

			// Daily Weather
			else if (url === '/daily') {
				const res = await axios.get(
					`https://api.openweathermap.org/data/2.5/onecall?lat=${geocodeData.latitude}&lon=${geocodeData.longitude}&exclude=current,hourly,minutely&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
				);
				return res.data.daily;
			}

			// Hourly Weather
			else if (url === '/hourly') {
				const res = await axios.get(
					`https://api.openweathermap.org/data/2.5/onecall?lat=${geocodeData.latitude}&lon=${geocodeData.longitude}&exclude=current,minutely,daily&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
				);
				return res.data.hourly;
			}
		} catch (err) {
			console.log(err.message);
		}
	},
};
