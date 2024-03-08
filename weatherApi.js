let input = document.querySelector('.input');
let btn = document.querySelector('.btn');
let weatherIcon = document.querySelector('.weather-img');

let apiKey = 'cb0dc549034112e97bd6e6181924deda';
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=metric&q=';

function updateToday() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = new Date().getDay();
    const currentDay = days[currentDayIndex];
    document.querySelector('.today').textContent = currentDay;
}

updateToday();
async function getWeather(city) {
    const response = await fetch(apiUrl + city);
    var data = await response.json();

    if (!response.ok) {
        // Handle the case where city data is not found
        document.querySelector('.CityName').innerHTML = "City not found";
        document.querySelector('.celsius').innerHTML = "0 °C";
        document.querySelector('.humidity1').innerHTML = "0%";
        document.querySelector('.wind1').innerHTML = "0 Km/h";
        weatherIcon.src = "./3D/NotFound.png"; 
        return;
    }

    console.log(data);
    document.querySelector('.CityName').innerHTML = data.name;
    document.querySelector('.celsius').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity1').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind1').innerHTML = data.wind.speed + ' Km/h';

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "./3D/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "./3D/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./3D/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "./3D/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "./3D/mist.png";
    }
}

btn.addEventListener('click', () => {
    getWeather(input.value);
    input.value = '';
});