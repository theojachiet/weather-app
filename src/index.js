import './reset.css';
import './style.css';
let location = 'toulouse,FR';
let url = '';

//Importing images
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

function dynamicImport() {
    const images = importAll(require.context('./images/weather-icons/', false, /\.(png|jpe?g|svg)$/));

    return images;
}

const images = dynamicImport();



//Assigning weather info and icons
const currentLocation = document.querySelector('.current-location');
const currentTemperature = document.querySelector('.temperature-info');
const currentDescription = document.querySelector('.description-info');
const tomorrow = document.querySelector('.tomorrow-info');
const icon = document.querySelector('img');

//Search bar button and input
const searchButton = document.querySelector('button');
const searchInput = document.querySelector('input');
const searchError = document.querySelector('.error');

async function getWeather(location) {
    try {
        url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=54G4W6L2AJ2KDSZXAG9BBLGYG`
        const response = await fetch(url);

        if (response.status == 400) {
            throw new Error('unknown location');
        }

        const data = await response.json();

        const locationWeather = processData(data);
        displayWeather(locationWeather);

        //Not displaying the error
        searchError.textContent = '';
        searchError.className = 'error';
        console.log(data);
    } catch (error) {
        searchError.textContent = 'Invalid Location, please try another or put the country initials to clarify';
        searchError.className = 'error active';
    }
}

const updateWeather = () => {
    location = searchInput.value;
    getWeather(location);
};

searchButton.addEventListener('click', updateWeather);

function processData(data) {
    return {
        currentAdress: data.resolvedAddress,
        currentDay: data.days[0].datetime,
        currentTempF: data.currentConditions.temp,
        currentTempC: Math.round((data.currentConditions.temp - 32) * (5 / 9)),
        currentDescription: data.currentConditions.conditions,
        tomorrowMaxTemp: Math.round((data.days[1].tempmax - 32) * (5 / 9)),
        tomorrowMinTemp: Math.round((data.days[1].tempmin - 32) * (5 / 9)),
        tomorrowDescription: data.description,
        icon: data.currentConditions.icon
    }
}

function displayWeather(locationWeather) {
    currentLocation.textContent = locationWeather.currentAdress + ' ' + locationWeather.currentDay;

    currentTemperature.textContent = locationWeather.currentTempC + '°C (' + locationWeather.currentTempF + '°F)';

    currentDescription.textContent = locationWeather.currentDescription;

    tomorrow.textContent = `${locationWeather.tomorrowDescription} (max ${locationWeather.tomorrowMaxTemp}°C / min ${locationWeather.tomorrowMinTemp}°C )`;

    let imgAdress = locationWeather.icon + '.svg';
    icon.src = images[imgAdress];
    icon.alt = locationWeather.currentDescription;
}

getWeather(location);