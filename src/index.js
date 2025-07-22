import './reset.css';
import './style.css';
let location = 'paris,FR';
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

    currentLocation.textContent = data.resolvedAddress + ' ' + data.days[0].datetime;

    const tempInDegrees = Math.round((data.currentConditions.temp - 32) * (5/9));
    currentTemperature.textContent = tempInDegrees + '°C (' + data.currentConditions.temp + '°F)';

    currentDescription.textContent = data.currentConditions.conditions;

    const maxTempTomorrow = Math.round((data.days[1].tempmax - 32) * (5/9));
    const minTempTomorrow = Math.round((data.days[1].tempmin - 32) * (5/9));
    const descriptionTomorrow = data.description;
    tomorrow.textContent = `${descriptionTomorrow} (max ${maxTempTomorrow}°C / min ${minTempTomorrow}°C )`
    console.log(data);
}

getWeather(location);