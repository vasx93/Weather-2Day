const axios = require('axios');
const request = require('request');

module.exports = {
	currentWeather(data, callback) {
		const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.latitude}&lon=${data.longitude}&exclude=current,minutely&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;

		request({ url, json: true }, (error, { body }) => {
			if (error) {
				callback('Unable to connect to weather service!', undefined);
			} else if (body.error) {
				callback('Unable to find location', undefined);
			} else {
				callback(undefined, [body.daily[0], body.hourly[0]]);
			}
		});
	},
	// async currentWeather(weatherObj) {
	// 	try {
	// 		const res = await axios.get(
	// 			`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherObj.latitude}&lon=${weatherObj.longitude}&exclude=current,minutely&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
	// 		);
	// 		return [res.data.daily[0], res.data.hourly[0]];
	// 	} catch (err) {
	// 		console.log(err.message);
	// 	}
	// },
};
