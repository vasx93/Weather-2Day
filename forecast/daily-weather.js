const axios = require('axios');

module.exports = {
	async dailyWeather(weatherObj) {
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherObj.latitude}&lon=${weatherObj.longitude}&exclude=current,hourly, minutely&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
		);

		return res.data.daily;
	},
};
