const fetch = require('node-fetch');

module.exports = {
	async currentWeather(weatherObj) {
		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherObj.latitude}&lon=${weatherObj.longitude}&exclude=current,minutely&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
		);
		const data = await res.json();

		return [data.daily[0], data.hourly[0]];
	},
};
