const axios = require('axios');

module.exports = {
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
