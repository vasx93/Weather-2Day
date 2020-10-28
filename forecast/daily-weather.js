const request = require('request')

module.exports = {

  dailyWeather(latitude, longitude, next) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,hourly,minutely&appid=1c991d24d0cd49c462d60dcb3c10a85b&units=metric`

    request({ url, json: true}, (error, {body}) => {

      if (error) {
        next('Error occured', )
      } else if (!latitude && !longitude) {
        next('Coordinates not found', )
      } else if(body.error) {
        next('Error!', )
      } else {

        next(undefined, body.daily)
      }
    })
  }
}


