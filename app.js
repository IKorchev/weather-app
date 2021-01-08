const city = document.querySelector(".city");
const getWeatherBtn = document.querySelector(".getWeather");
const API_KEY = "65e6a9ab23a26b0551143a053c059dbe";
const weatherText = document.querySelector(".weather-text");
const app = document.querySelector('.main')





getWeatherBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
    const response = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city.value}`);
    weather = await response.json()
    city.value = '';
    weatherText.innerHTML =`In ${weather.location.name} <br></br> it's ${weather.current.temperature}° and feels like ${weather.current.feelslike}°`
    console.log(weather)
    if (weather.current.temperature < 15 && app.classList.contains('sun')) {
        app.classList.replace('sun', 'cold') 
    }else if (weather.current.temperature <= 15 && !app.classList.contains('sun')) {
        app.classList.add('cold')
    } else if ( weather.current.temperature > 15 && app.classList.contains('cold')){
        app.classList.replace('cold', 'sun')
    } else if (weather.current.temperature <= 15 && !app.classList.contains('cold')) {
        app.classList.add('sun')
    }}
    catch (err) {
        alert(err)
    }
    
   
})
