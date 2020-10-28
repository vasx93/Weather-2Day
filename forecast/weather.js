const request = require('request')

//open weather api  1c991d24d0cd49c462d60dcb3c10a85b

module.exports = {

  forecast(latitude, longitude, next) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely&appid=1c991d24d0cd49c462d60dcb3c10a85b&units=metric`

    request({ url, json: true}, (error, {body}) => {
      
      if (error) {
        next('Error occured', undefined)
      } else if (!latitude && !longitude) {
        next('Coordinates not found', undefined)
      } else if(body.error) {
        next('Error!',  undefined)
      } else {

        next(undefined, [body.daily[0], body.hourly[0]])
      }
    })
  },


















  //!    ONE CALL API, has to go through geocoding

  // forecast(latitude, longitude, next) {
  //   const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=1c991d24d0cd49c462d60dcb3c10a85b&units=metric`

  //   request({ url, json: true}, (error, {body}) => {

  //     if (error) {
  //       next('Error occured', )
  //     } else if (!latitude && !longitude) {
  //       next('Coordinates not found', )
  //     } else if(body.error) {
  //       next('Error!', )
  //     } else {

  //       next(undefined,
          
  //           {
  //             temp: body.current.temp,
  //             pressure: body.current.pressure,
  //             humid: body.current.humidity,
  //             wind: body.current.wind_speed,
  //             feels: body.current.feels_like,
  //             date: body.current.dt
  //           }
  //       )
  //     }
  //   })
  // }
}


