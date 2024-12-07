document.addEventListener("DOMContentLoaded", () => {
    const weatherButton = document.getElementById("get-weather");
    const cityInput = document.getElementById("city-input");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const conditions = document.getElementById("conditions");
    const feelsLike = document.getElementById("feels-like");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("wind-speed");
    const localTimeHeader = document.getElementById("local-time-header");
    const weatherDisplay = document.getElementById("weather-display");
    const errorMessage = document.getElementById("error-message");
    const errorText = document.getElementById("error-text");

    const apiKey = "55609dec91446de16e3189e92f473f60";
    const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather";

    function updateLocalTime() {
        const now = new Date();
        localTimeHeader.textContent = `Local Time: ${now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })}`;
    }

    setInterval(updateLocalTime, 1000);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude: lat, longitude: lon } = position.coords;
            fetch(`${weatherBaseUrl}?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(() => showError("Could not fetch current location weather."));
        });
    }

    weatherButton.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (!city) {
            showError("Please enter a city name.");
            return;
        }
        fetchWeather(city);
    });

    function fetchWeather(city) {
        const apiUrl = `${weatherBaseUrl}?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found. Please check the name and try again.");
                }
                return response.json();
            })
            .then(data => displayWeather(data))
            .catch(error => showError(error.message));
    }

    function displayWeather(data) {
        cityName.textContent = `Weather in ${data.name}`;
        temperature.textContent = `Temperature: ${data.main.temp}°F`;
        feelsLike.textContent = `Feels Like: ${data.main.feels_like}°F`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;
        conditions.textContent = `Conditions: ${data.weather[0].description}`;
        weatherDisplay.style.display = "block";
        errorMessage.style.display = "none";
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.style.display = "block";
        weatherDisplay.style.display = "none";
    }
});