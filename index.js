const path = require('path')
const express = require('express')
const {geocode} = require('./forecast/geocode')
const { forecast } = require('./forecast/weather')
const {dailyWeather} = require('./forecast/daily-weather')
const {hourlyWeather} = require('./forecast/hourly-weather')





const server = express()


//*             MIDDLEWARE

server.use(express.static(path.join(__dirname, './public')))
server.use(express.urlencoded({
  extended: true
}))
server.use(express.json())



//*                ROUTES


server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})


server.get('/daily', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/daily.html'))
})

server.get('/hourly', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/hourly.html'))
})

server.get('/about', (req,res) => {
  res.sendFile(path.join(__dirname, 'views/about.html'))
})


//!           WEATHER ROUTING


server.get('/weather', (req, res) => {
  
  const address = req.query.address

  if (!address) {
    return res.send({
      error: 'Address is required'
    })
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {

    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, data) => {

      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: data,
        location
      })
    })
  })
})


//!                      DAILY 

server.get('/day', (req, res) => {
  
  const address = req.query.address

  if (!address) {
    return res.send({
      error: 'Address is required'
    })
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {

    if (error) {
      return res.send({ error })
    }

    dailyWeather(latitude, longitude, (error, data) => {

      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: data,
        location
      })
    })
  })
})


//!                    HOURLY

server.get('/hour', (req, res) => {
  
  const address = req.query.address

  if (!address) {
    return res.send({
      error: 'Address is required'
    })
  }

  geocode(address, (error, {latitude, longitude, location} = {}) => {

    if (error) {
      return res.send({ error })
    }

    hourlyWeather(latitude, longitude, (error, data) => {

      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: data,
        location
      })
    })
  })
})



const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log('---Server running')
})