const fetch = require('node-fetch');

module.exports = {
	async dailyWeather(weatherObj) {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherObj.latitude}&lon=${weatherObj.longitude}&exclude=current,hourly, minutely&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
		);
		const data = await res.json();

		return data.daily;
	},
};
