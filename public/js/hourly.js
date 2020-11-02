//CLIENTSIDE JS FILE HERE---

const form = document.querySelector('form')
const userSearch = document.querySelector('input')
const message1 = document.querySelector('#first')
const btn = document.querySelector('.fa-search')


const weatherSection = document.querySelector('.hourly-forecast')
const left = document.querySelector('#left')
const right = document.querySelector('#right')





//*          daily weather cards 

async function loadHourlyWeather() {
  const location = userSearch.value

  const response = await axios.get(`/hour?address=${location}`)
  

  if (response.error) {
    return message1.textContent = 'No location found, try again?'
  }

  console.log(response.data.forecast)
  message1.textContent = response.data.location

  //* left loop dom

  for (let i = 0; i < response.data.forecast.length - 36; i++) {
        
    const hourCard = document.createElement('div')
    hourCard.classList.add('card')
    hourCard.innerHTML = hour(response.data.forecast[i])

    weatherSection.appendChild(hourCard)
  }
  
 }


function hour(hourly) {
  let timestamp = hourly.dt
  let date = new Date(timestamp * 1000)
  let h = date.toLocaleTimeString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit'
  })

  let temp = parseInt(hourly.temp)
  let rain = parseInt(hourly.pop)
  let feels = parseInt(hourly.feels_like)
  let wind = parseInt(hourly.wind_speed)
  

  return `
      
        
          
          <div class="top">

            <div class="week">${h}</div>

            <div class="icon"><img src="https://openweathermap.org/img/wn/${hourly.weather[0].icon}@2x.png"></div>
            

            <div class="current">
              <h1><span>${temp}°C</span></h1>
            </div>

            <div class="description"
              <p>${hourly.weather[0].description}</p>
            </div>

            <div class="rain">
                <i class="fa fa-umbrella fa-lg"></i>  ${rain}%
            </div>
          </div>`
    
}

form.addEventListener('submit', async(ev) => {
  ev.preventDefault()

  if (weatherSection.innerHTML != '') {

    weatherSection.innerHTML = ''
    message1.textContent = ''

    await loadHourlyWeather()
    btn.classList.toggle('flip')
  }
  else {

    await loadHourlyWeather()
    btn.classList.toggle('flip')
  }
})

