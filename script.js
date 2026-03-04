import apiKey from "./config.js";

const input = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const weatherImg = document.querySelector("#weather-img");
const temp = document.querySelector("#temperature");
const cityLocation = document.querySelector("#location");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const infoContainer = document.querySelector("#info");
const visibleContainer = document.querySelector("#visible");
const errorContainer = document.querySelector("#error");
async function weatherInfo(city) {
  try {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(apiURL);
    if (!res.ok) {
      infoContainer.classList.add("hidden");
      visibleContainer.classList.add("hidden");
      errorContainer.classList.remove("hidden");
      if (res.status === 404) {
        errorContainer.innerHTML = "City Not Found!";
      } else {
        errorContainer.innerHTML = "Something went wrong. Try again.";
      }
      return;
    }
    const data = await res.json();
    errorContainer.classList.add("hidden");
    visibleContainer.classList.add("hidden");
    infoContainer.classList.remove("hidden");
    const weatherType = data.weather[0].main;

    switch (weatherType) {
      case "Clear":
        weatherImg.src = "assets/sun.png";
        break;

      case "Clouds":
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Fog":
        weatherImg.src = "assets/clouds.png";
        break;

      case "Rain":
      case "Drizzle":
      case "Thunderstorm":
        weatherImg.src = "assets/rain.png";
        break;

      case "Snow":
        weatherImg.src = "assets/snowy.png";
        break;

      default:
        weatherImg.src = "assets/strome.png";
    }

    cityLocation.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp);
    humidity.innerHTML = data.main.humidity;
    windSpeed.innerHTML = data.wind.speed;
  } catch (error) {
    console.error("Network Error:", error);
    infoContainer.classList.add("hidden");
    errorContainer.classList.remove("hidden");
    errorContainer.innerHTML = "Unable to connect to the weather service.";
  }
}

searchBtn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) {
    weatherInfo(city);
  }
});
