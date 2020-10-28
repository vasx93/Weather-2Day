const request = require('request')

//my open weather api: 1c991d24d0cd49c462d60dcb3c10a85b


module.exports = {

  geocode(address, next) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2V2ZXJ1c3NuYXBlIiwiYSI6ImNrZjgzZmF1dzA4Zncyc3BwbThpcDh0eDQifQ.bntCJ20Alx1akmuUTvRL4w&limit=1`

    request( {url, json: true}, (error, {body}) => {
      if (error) {
        next('Unable to connect to location services!', )
    } else if (body.features.length === 0) {
        next('Unable to find location. Try another search.', )
    } else {

        next(undefined,
          {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
          }
        )
      }
    })
  }
}





