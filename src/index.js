import './reset.css';
import './style.css';
let location = 'auch,FR';
let url = '';

async function getWeather(location) {
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=54G4W6L2AJ2KDSZXAG9BBLGYG`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}

getWeather(location);