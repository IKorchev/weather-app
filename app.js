const city = document.querySelector(".city")
const getWeatherBtn = document.querySelector(".getWeather")
const API_KEY = "4e500205a616505955675518272633a4"
const weatherText = document.querySelector(".weather-text")
const app = document.querySelector(".main")
const body = document.querySelector("body")

// Function to capitalise the 1st letter of the fetched weather description

const capitalise = (str) => {
  let splitStr = str.split(" ")
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i][0].toUpperCase() + splitStr[i].substr(1)
  }
  str = splitStr.join(" ")
  return str
}

const clickHandler = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${API_KEY}`
    )
    let weather = await response.json()
    console.log(weather)
    city.value = ""
    let description = capitalise(weather.weather[0].description)
    weatherText.innerHTML = `
    <h1>${
      weather.name
    }</h1> <img class="small" src="http://openweathermap.org/img/wn/${
      weather.weather[0].icon
    }@2x.png"> <h5>${description}</h5> <br></br>
    <h2>${weather.main.temp.toFixed(
      1
    )}° feels like ${weather.main.feels_like.toFixed(1)}°</h2>
      `
    console.log(await response)
    if (weather.main.temp < 15 && body.classList.contains("sun")) {
      body.classList.replace("sun", "cold")
    } else if (weather.main.temp <= 15 && !body.classList.contains("sun")) {
      body.classList.add("cold")
    } else if (weather.main.temp > 15 && body.classList.contains("cold")) {
      body.classList.replace("cold", "sun")
    } else if (weather.main.temp >= 15 && !body.classList.contains("cold")) {
      body.classList.add("sun")
    }
  } catch (err) {
    alert(err)
  }
}

getWeatherBtn.addEventListener("click", clickHandler)
