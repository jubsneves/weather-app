let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search-form-input");
let searchButton = document.querySelector("#search-form-button");
let cityEl = document.querySelector("#city");

function refreshWeather(response) {
  let temperatureEl = document.querySelector(".temperature");
  let humidityEl = document.querySelector(".humidity");
  let feelsLikeEl = document.querySelector(".feels-like");
  let windEl = document.querySelector(".wind");
  let temperatureInfo = document.querySelector("#temperature-info");
  let timeEl = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconEl = document.querySelector("#icon-current-weather");

  cityEl.innerHTML = response.data.city;
  timeEl.innerHTML = `${formatDate(date)}`;
  temperatureEl.innerHTML = `${Math.round(response.data.temperature.current)}°`;
  humidityEl.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;
  feelsLikeEl.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  windEl.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  temperatureInfo.innerHTML = `- ${response.data.condition.description}`;
  iconEl.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon">`;
}

function formatDate(date) {
  let day = date.getDay();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]}, ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "0b98c3896ab4c90fe37831e4t5ob09e9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(e) {
  e.preventDefault();
  let city = searchInput.value;
  searchCity(city);
}

searchForm.addEventListener("submit", handleSearchSubmit);
