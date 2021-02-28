const fetch = require('node-fetch');

module.exports = {
	async getGeocodeAPI(address) {
		const res = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_API_KEY}&limit=1`
		);
		const data = await res.json();
		return {
			latitude: data.features[0].center[1],
			longitude: data.features[0].center[0],
			location: data.features[0].place_name,
		};
	},
};
