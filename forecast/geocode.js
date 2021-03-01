const axios = require('axios');
const request = require('request');

module.exports = {
	// getGeocodeAPI(address, callback) {
	// 	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`;

	// 	request({ url, json: true }, (error, { body }) => {
	// 		if (error) {
	// 			callback('Unable to connect to location services!', undefined);
	// 		} else {
	// 			callback(undefined, {
	// 				latitude: body.features[0].center[1],
	// 				longitude: body.features[0].center[0],
	// 				location: body.features[0].place_name,
	// 			});
	// 		}
	// 	});
	// },
	async getGeocodeAPI(address) {
		try {
			const res = await axios.get(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`
			);

			return {
				latitude: res.data.features[0].center[1],
				longitude: res.data.features[0].center[0],
				location: res.data.features[0].place_name,
			};
		} catch (err) {
			console.log(err.message);
		}
	},
};
