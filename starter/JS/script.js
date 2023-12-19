const apiKey = '4e527d21554479cdc7d03042a0b71131'; //my API key
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const history = document.getElementById('history');

//Function to fetch and display weather data for a specific city
function fetchAndDisplayWeather(city) {

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {

    const todaySection = document.getElementById('today');
    todaySection.innerHTML = `
      <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
      <p>Temperature: ${Math.round(data.main.temp)}°C</p> 
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon"> `; //icons for weather conditions
  });


  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; //Clearing previous content

    const uniqueDates = [];
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!uniqueDates.includes(date) && item.dt_txt.includes('12:00:00')) {
        uniqueDates.push(date);

      
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-day');
        
        forecastItem.style.backgroundColor = '#e0e0e0'; 

        //content of the forecast item
        forecastItem.innerHTML = `
          <p>${date}</p>
          <p>Temperature: ${Math.round(item.main.temp)}°C</p>
          <p>Humidity: ${item.main.humidity}%</p>
          <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="Weather Icon">
        `; //icons for weather conditions

        forecastContainer.appendChild(forecastItem);
      }
    });
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const city = input.value;
  fetchAndDisplayWeather(city);

  const cityItem = document.createElement('button');
  cityItem.textContent = city;
  history.appendChild(cityItem);
});


history.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    const selectedCity = e.target.textContent;
    fetchAndDisplayWeather(selectedCity);
  }
});
