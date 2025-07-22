import './reset.css';
import './style.css';
let location = 'toulouse,FR';
let url = '';

//Assigning weather info
const currentLocation = document.querySelector('.current-location');
const currentTemperature = document.querySelector('.temperature-info');
const currentDescription = document.querySelector('.current-description');
const tomorrow = document.querySelector('.tomorrow-info');

async function getWeather(location) {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=54G4W6L2AJ2KDSZXAG9BBLGYG`
    const response = await fetch(url);
    const data = await response.json();

    const locationWeather = processData(data);
    displayWeather(locationWeather);
}

function processData(data) {
    return {
        currentAdress: data.resolvedAddress,
        currentDay: data.days[0].datetime,
        currentTempF: data.currentConditions.temp,
        currentTempC: Math.round((data.currentConditions.temp - 32) * (5 / 9)),
        currentDescription: data.currentConditions.conditions,
        tomorrowMaxTemp: Math.round((data.days[1].tempmax - 32) * (5 / 9)),
        tomorrowMinTemp: Math.round((data.days[1].tempmin - 32) * (5 / 9)),
        tomorrowDescription: data.description
    }
}

function displayWeather(locationWeather) {
    currentLocation.textContent = locationWeather.currentAdress + ' ' + locationWeather.currentDay;

    currentTemperature.textContent = locationWeather.currentTempC + '°C (' + locationWeather.currentTempF + '°F)';

    currentDescription.textContent = locationWeather.currentDescription;

    tomorrow.textContent = `${locationWeather.tomorrowDescription} (max ${locationWeather.tomorrowMaxTemp}°C / min ${locationWeather.tomorrowMinTemp}°C )`;
}

getWeather(location);