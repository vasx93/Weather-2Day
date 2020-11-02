//CLIENTSIDE JS FILE HERE---

const form = document.querySelector('form')
const userSearch = document.querySelector('input')
const message1 = document.querySelector('#first')
const weatherSection = document.querySelector('.daily-forecast')
const btn = document.querySelector('.fa-search')


async function loadDailyWeather() {
  const location = userSearch.value

  const response = await axios.get(`/day?address=${location}`)

  if (response.error) {
    return message1.textContent = 'No location found, try again?'
  }

  console.log(response.data.forecast)
  message1.textContent = response.data.location


  for (let day of response.data.forecast) {
    
    const dayCard = document.createElement('div')
    dayCard.classList.add('card')
    dayCard.innerHTML = daily(day)

    weatherSection.append(dayCard)
  }
}


function daily(day) {
  let timestamp = day.dt
  let date = new Date(timestamp * 1000)
  let dayOfWeek = date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
  })

  let temp = parseInt(day.temp.day)
  let max = parseInt(day.temp.max)
  let min = parseInt(day.temp.min)
  let rain = parseInt(day.pop)

  return `
      
        <div class="front">
          <div class="top">
            <div class="week">${dayOfWeek}.</div>
            <div class="icon"><img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"></div>
          </div>
            <div class="current">
              <h1><span>${temp}°C</span></h1>
              <p>${day.weather[0].description}</p>
            </div>

            <ul class="forecast">
                <li>
                  <div class="left">Temperature</div>
                  <div class="right"><i class="fa fa-sun" aria-hidden="true"></i> ${max}°C/${min}°C </div>
                </li>
                <li>
                <div class="left">Humidity</div>
                <div class="right"><i class="fa fa-tint" aria-hidden="true"></i> ${day.humidity}%</div>
                </li>
                <li>
                <div class="left">Precipitation</div>
                <div class="right"><i class="fa fa-umbrella" aria-hidden="true"></i> ${rain}%</div>
                </li>
            </ul>
        </div>
        
        </div>`
    
}

form.addEventListener('submit', async(ev) => {
  ev.preventDefault()

  if (weatherSection.innerHTML != '') {

    weatherSection.innerHTML = ''
    message1.textContent = ''

    await loadDailyWeather()
    btn.classList.toggle('flip')
  
  } else {

    
    await loadDailyWeather()
    btn.classList.toggle('flip')
  }
})

