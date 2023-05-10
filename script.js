const apiKey = 'f23ee9deb4e1a7450f3157c44ed020e1';
const searchBtn = document.getElementById('search');
const locationInput = document.getElementById('location');
const forecastContainer = document.getElementById('forecast');

searchBtn.addEventListener('click', () => {
  const userLocation = locationInput.value.trim();
  if (userLocation === '') {
    setLocationError('Please enter a location');
  } else {
    lookupLocation(userLocation);
  }
});

const api_url = 'https://api.openweathermap.org';
const daily_forecast = 5;

const recentLocations = [];
const clearError = () => {
  const errorDisplay = document.getElementById('error');
  errorDisplay.textContent = '';
};

const setLocationError = (text) => {
  const errorDisplay = document.getElementById('error');
  errorDisplay.textContent = text;
  setTimeout(clearError, 3000);
};

const lookupLocation = (search) => {
  const apiUrl = `${api_url}/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const lat = data.coord.lat;
      const lon = data.coord.lon;

      const myData = {
        name: data.name,
        country: data.sys.country,
        lat: lat,
        lon: lon
      };

      const forecastUrl = `${api_url}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}&units=metric`;

      fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
          displayCurrentWeather(myData, data.current);
          displayWeatherForecast(data.daily);
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
};

const displayCurrentWeather = (myData, currentWeather) => {
  document.getElementById('location-name').textContent = myData.name;
  document.getElementById('temp-value').textContent = `${currentWeather.temp}`;
  document.getElementById('wind-value').textContent = `${currentWeather.wind_speed}`;
  document.getElementById('Humid-value').textContent = `${currentWeather.humidity}`;
  document.getElementById('uv-value').textContent = `${currentWeather.uvi}`;
};

const displayWeatherForecast = (dailyForecast) => {
  forecastContainer.innerHTML = '';
  for (let i = 0; i < daily_forecast; i++) {
    const card = document.createElement('div');
    const temp = document.createElement('p');
    const wind = document.createElement('p');
    const humid = document.createElement('p');

    temp.textContent = dailyForecast[i].temp.day;
    wind.textContent = dailyForecast[i].wind_speed;
    humid.textContent = dailyForecast[i].humidity;

    card.append(temp, wind, humid);
    forecastContainer.append(card);
  }
  forecastContainer.style.display = 'block';
};
