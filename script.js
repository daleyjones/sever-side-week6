// const apiKey = 'f23ee9deb4e1a7450f3157c44ed020e1';
const searchBtn = document.getElementById('search');
// const cityName = document.getElementById('location-name');
// const temp = document.getElementById('temp-value');
// const wind = document.getElementById('wind-value');
// const humidity = document.getElementById('Humid-value');
// const uvIndex = document.getElementById('uv-value');


searchBtn.addEventListener('click', () => {









const api_url = 'https://api.openweathermap.org';
const api_key = 'f23ee9deb4e1a7450f3157c44ed020e1';
const daily_forecast = 5;

const recentLocations = [];
const getLocation = () => {
    const userLocation = locationInput.value;
    if (userLocation === '') {
        setLocationError('Please enter a location');
    } else {
        lookupLocation(userLocation);
    }
};

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
    let apiUrl = `${api_url}/data/2.5/weather?q=${search}&appid=${api_key}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const lat = data.coord.lat;
            const lon = data.coord.lon;

            const myData = {
                name: data.name,
                country: data.sys.country,
                lat: lat,
                lon: lon
            };

            console.log(myData);

            const forecastUrl = `${api_url}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${api_key}&units=metric`;

            console.log(forecastUrl);

            fetch(forecastUrl)
                .then(response => response.json())
                .then(data => {
                    displayCurrentWeather(data);
                    displayWeatherForecast(data);
                    console.log(data);
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
};

const displayCurrentWeather = (weatherData) => {
    const currentWeather = weatherData.current;

    document.getElementById('location-name').textContent = document.getElementById('location').value;
    document.getElementById('temp-value').textContent = `${currentWeather.temp}`;
    document.getElementById('wind-value').textContent = `${currentWeather.wind_speed}`;
    document.getElementById('Humid-value').textContent = `${currentWeather.humidity}`;
    document.getElementById('uv-value').textContent = `${currentWeather.uvi}`;
};

const displayWeatherForecast = (weatherData) => {
    const daily_forecast = weatherData.daily;
    document.getElementById('forecast').innerHTML= "";
for (var i = 0; i < 5; i ++ ){
   const card = document.createElement("div")
   const temp = document.createElement("p")
   const wind = document.createElement("p")
   const humid = document.createElement("div")

   temp.textContent = daily_forecast[i].temp.day;
   wind.textContent = daily_forecast[i].wind_speed;
   humid.textContent = daily_forecast[i].humidity;
card.append(temp, wind, humid);
document.getElementById('forecast').append(card);


  
}
    document.getElementById('forecast').style.display = 'block';
   
};

const displayWeather = (myData) => {
    
};
