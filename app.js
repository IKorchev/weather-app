const API_KEY = "4e500205a616505955675518272633a4"
const city = document.querySelector(".city")
const getWeatherBtn = document.querySelector(".get-weather")
const weatherText = document.querySelector(".weather-text")
const app = document.querySelector(".main")
const body = document.querySelector("body")
const hourly = document.querySelector(".hourly")
// Function to capitalise the 1st letter of the fetched weather description

const capitalise = (str) => {
  let splitStr = str.split(" ")
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i][0].toUpperCase() + splitStr[i].substr(1)
  }
  str = splitStr.join(" ")
  return str
}

// Checks if the temperature is above 15° and adds the correct class to change BG
const changeBackground = (data) => {
  const temp = data.main.temp
  const typeOfWeather = data.weather[0].main
  switch (typeOfWeather) {
    case "Clouds":
      body.style.backgroundImage = "url('clouds.jpg')"
      return
    case "Clear":
      body.style.backgroundImage = "url('sunny.jpg'"
      return
    case "Rain":
      body.style.backgroundImage = " url('rain.jpg')"
      return
    case "Mist":
      body.style.backgroundImage = "url('mist.jpg')"
      return
  }
}

const clickHandler = async (e) => {
  e.preventDefault()
  // Fetching data from API
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${API_KEY}`)
    let data = await response.json()
    city.value = ""
    let description = capitalise(data.weather[0].description)
    console.log(data)
    weatherText.innerHTML = `
    <div class="text-center">
    <h1 class="display-4">${data.name}</h1> <img class="small" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"> 
    <h5 class="display-6">${description}</h5>
    <h2 class="display-5">${data.main.temp.toFixed(1)}° feels like ${data.main.feels_like.toFixed(1)}°</h2></div>
      `
    changeBackground(data)
  } catch (err) {
    alert("Something went wrong! Please make sure you are typing the correct city name.")
  }
}

getWeatherBtn.addEventListener("click", clickHandler)
