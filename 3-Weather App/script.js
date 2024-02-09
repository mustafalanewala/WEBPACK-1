const apiKey = 'JCUX6QA65Q9N4F6GLW6H2JR4T';
const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

async function getWeather(city) {
    const response = await fetch(`${apiUrl}${city}?unitGroup=metric&key=${apiKey}`);
    const data = await response.json();
    return data;
}

function updateWeather(data) {
    const currentWeather = data.days[0];
    const currentTemp = currentWeather.temp;
    const city = data.resolvedAddress;
    const humidity = currentWeather.humidity;
    const windSpeed = currentWeather.windspeed;
    const weatherDescription = currentWeather.conditions;

    document.getElementById('weather-icon').src = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}`;
    document.getElementById('temperature').textContent = `${currentTemp}°C`;
    document.getElementById('city').textContent = city;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;
    document.getElementById('weather-description').textContent = `Description: ${weatherDescription}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultCity = 'Mumbai'; // Default city set to Mumbai
    getWeather(defaultCity)
        .then(data => updateWeather(data))
        .catch(err => console.error('Error fetching weather data:', err));

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    // Function to handle search
    const handleSearch = () => {
        const city = searchInput.value.trim();
        if (city !== '') {
            getWeather(city)
                .then(data => updateWeather(data))
                .catch(err => console.error('Error fetching weather data:', err));
        } else {
            alert('Please Enter City');
        }
    };

    // Search button click event
    searchButton.addEventListener('click', handleSearch);

    // Enter key press event
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});

// Transition
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector('.container').classList.add('show');
});
