async function getWeatherData(location) {
    const weatherData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9bcfe5344ca84e389a145440240403&q=${location}&days=3`, {mode: 'cors'});
    const weatherJSON = await weatherData.json();
    console.log(weatherJSON);
    return weatherJSON;
}

function fToC(f) {
    return (f - 32) * 5/9;
}

getWeatherData("ireland");