const form = document.querySelector('form');
const userSearch = document.querySelector('input');
const message1 = document.querySelector('#first');
const weatherCard = document.querySelector('.weather-card');
const btn = document.querySelector('.fa-search');

async function loadWeather() {
	try {
		const address = userSearch.value;

		const response = await axios.post(`/`, { address });

		if (!response) {
			return (message1.textContent = 'No location found, try again?');
		}
		console.log(response.data);
		// Create weather card
		message1.textContent = response.data.location;

		const temp = document.createElement('div');
		temp.classList.add('card');
		temp.innerHTML = renderWeather(response.data.weather);
		weatherCard.append(temp);
	} catch (err) {
		console.error(err.message);
	}
}

// Render and display current weather data
function renderWeather(data) {
	let timestamp = data[0].dt;
	let date = new Date(timestamp * 1000);

	let dayOfWeek = date.toLocaleDateString(undefined, {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});

	let time = new Date(data[1].dt * 1000).toLocaleTimeString(undefined, {
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
	});

	let sunrise = new Date(data[0].sunrise * 1000).toLocaleTimeString(undefined, {
		hour: '2-digit',
		minute: '2-digit',
	});

	let sunset = new Date(data[0].sunset * 1000).toLocaleTimeString(undefined, {
		hour: '2-digit',
		minute: '2-digit',
	});

	let temp = parseInt(data[0].temp.day);
	let feels = parseInt(data[0].feels_like.day);
	let max = parseInt(data[0].temp.max);
	let min = parseInt(data[0].temp.min);
	let rain = parseInt(data[0].pop);
	let wind = parseInt(data[0].wind_speed);
	let description = data[0].weather[0].description;
	let uv = parseInt(data[0].uvi);
	let windDeg;

	if (data[0].wind_deg > 90 && data[0].wind_deg < 180) {
		windDeg = 'SE';
	} else if (data[0].wind_deg > 180 && data[0].wind_deg < 270) {
		windDeg = 'SW';
	} else if (data[0].wind_deg > 270 && data[0].wind_deg < 360) {
		windDeg = 'NW';
	} else if (data[0].wind_deg < 90) {
		windDeg = 'NE';
	}

	return `
         
    <div class="front">

      <div class="top">
        <div class="week">${dayOfWeek}.</div>
      </div>

      <div class="current">
        <div class="icon">
          <img src="https://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png">
          <h1><span>${temp}°C</span></h1>
        </div>
        
        <div class="text">
          <p> Feels Like ${feels}°C</p>
          <p>${description}</p>
        </div>
      </div>

      <div class="forecast">

            <div class="row">
              <div class="left">Temperature</div>
              <div class="right"> ${max}°C/${min}°C</div>
            </div>

            <div class="row">
              <div class="left">Humidity</div>
              <div class="right">${data[0].humidity}%</div>
            </div>

            <div class="row">
              <div class="left">Precipitation</div>
              <div class="right">${rain}%</div>
            </div>

            <div class="row">
              <div class="left">Pressure</div>
              <div class="right">${data[0].pressure}mbar</div>
            </div>

            <div class=" row">
              <div class="left">Wind Speed</div>
              <div class="right">${wind}km/h</div>
            </div>

            <div class=" row">
              <div class="left">Wind Direction</div>
              <div class="right">${data[0].wind_deg}°${windDeg}</div>
            </div>


            <div class="row">
              <div class="left">Morning</div>
              <div class="right">${data[0].temp.morn}°C</div>
            </div>

            <div class="row">
              <div class="left">Sunrise</div>
              <div class="right">${sunrise}</div>
            </div>

            <div class="last"  id="tr">
              <div class="left">Night</div>
              <div class="right">${data[0].temp.night}°C</div>
            </div>

            <div class="last">
              <div class="left">Sunset</div>
              <div class="right">${sunset}</div>
            </div>

        </div>
    </div>
  
  </div>`;
}

form.addEventListener('submit', ev => {
	ev.preventDefault();
	if (weatherCard.innerHTML != '') {
		weatherCard.innerHTML = '';
		message1.textContent = '';

		loadWeather();
		btn.classList.toggle('flip');
	} else {
		loadWeather();
		btn.classList.toggle('flip');
	}
});
