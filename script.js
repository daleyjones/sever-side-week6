const apiKey = 'f23ee9deb4e1a7450f3157c44ed020e1'; 
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const description = document.getElementById('description');

searchBtn.addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            cityName.textContent = data.name;
            weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            temp.textContent = `${data.main.temp}°C`;
            description.textContent = data.weather[0].description;
        })
        .catch(error => console.error(error));
});
