let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentYear = now.getFullYear();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();

let todayDate = document.querySelector("#current-date");
todayDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let todayTime = document.querySelector("#current-time");
todayTime.innerHTML = `${currentHour}:${currentMinutes}`;

function showSearchedCityWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  // Humidity percentage
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //Sky description
  document.querySelector("#sky").innerHTML = response.data.weather[0].main;
  //WindSpeed
  let windSpeed = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = `Wind speed: ${windSpeed}km/h`;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchedCityWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-new-city").value;
  searchCity(city);
}
let goButton = document.querySelector("#search-form");
goButton.addEventListener("submit", handleSubmit);

searchCity("Warsaw");

//navigation button

function searchCurrentLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchedCityWeather);
}
function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let locationButton = document.querySelector("#my-location-button");
locationButton.addEventListener("click", getMyLocation);
