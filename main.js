const cityName = document.getElementById('city-name');
const countryName = document.getElementById('country-name');
const weather = document.getElementById('weather');
const temperature = document.getElementById('main-temp');
const feelsLike = document.getElementById('feels-like');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const locationInput = document.getElementById('location-input');
const searchButton = document.getElementById('search-button');
const body = document.querySelector('body');
const form = document.querySelector('form');

let currentLocation = '';
let tempIndex = false;
let temps = {
    main: [],
    feelslike: []
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value;
    getWeatherData(location)
    .then(data => {
        updateInterface(data);
    })
    .catch(error => {
        console.log(error);
    });
});

temperature.addEventListener('click', () => {
    updateTemps(true);
});

function updateTemps(toggle) {
    if (toggle) {
        tempIndex = !tempIndex;
        temperature.classList.toggle('celsius');
        feelsLike.classList.toggle('celsius');
    }
    temperature.textContent = Math.round(+temps.main[+tempIndex]);
    feelsLike.textContent = `FEELS LIKE: ${Math.round(+temps.feelslike[+tempIndex])}`;
}

function updateInterface(data) {
    console.log(data);
    cityName.textContent = data.location.name;
    if (data.location.country.match('United States of America')) {
        countryName.textContent = data.location.region;
    } else {
        countryName.textContent = data.location.country;
    }
    updateTemps();
    weather.textContent = data.current.condition.text;
    wind.textContent = `WIND: ${data.current.wind_mph} MPH`
    humidity.textContent = `HUMIDITY: ${data.current.humidity}%`;

    const hour = data.location.localtime.split(' ')[1].split(':')[0];
    if (hour > 6 && hour < 18) {
        body.classList.add('day-clear');
        body.classList.remove('night-clear');
    } else {
        body.classList.add('night-clear');
        body.classList.remove('day-clear');
    }
}

async function getWeatherData(location) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=9bcfe5344ca84e389a145440240403&q=${location}&days=3`, {mode: 'cors'});
        if (response.status === 400) {
            throw new Error("Couldn't find location: " + location);
        }
        const weatherData = await response.json();
        temps.main = [weatherData.current.temp_f, weatherData.current.temp_c];
        temps.feelslike = [weatherData.current.feelslike_f, weatherData.current.feelslike_c];
        return weatherData;
    }
    catch (error) {
        throw new Error(error);
    }
}

getWeatherData('Fall River').then(data => {
    updateInterface(data);
});