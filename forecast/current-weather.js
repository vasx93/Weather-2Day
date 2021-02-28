const axios = require('axios');

module.exports = {
	async currentWeather(weatherObj) {
		const res = await axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherObj.latitude}&lon=${weatherObj.longitude}&exclude=current,minutely&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
		);
		return [res.data.daily[0], res.data.hourly[0]];
	},
};
