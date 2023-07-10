//Variables 
var currentDay; //For getting the current Day + Date dddd, D, MMMM, YYYY
var currentDate = dayjs().format("dddd, D, MMMM, YYYY"); //For getting current Date D/M/YYYY
var currentTime; //For getting the current Time + Timezone HH:mm:ss Z [AEST]

//Api 
//Api key from Openweather 
var apiKey = "f62c9d6db823b3bd186bc980988733d1";
var lonKey = "&lon=";
var latitude = " ";
var longitude = " ";
//Api Call 5 day / 3 hour forecast data

var apiCall = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={f62c9d6db823b3bd186bc980988733d1}";


//Day.js to get our current time 

function getWeatherData(city) {
  // Convert the city name to lowercase to make the search case-insensitive
  city = city.toLowerCase();

  // Construct the API URL to get the latitude and longitude
  var geocodingUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + ",AU&limit=1&appid=" + apiKey;

  // Make the API call to fetch the latitude and longitude
  fetch(geocodingUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(function(data) {
      if (data.length === 0) {
        throw new Error("City not found");
      }

      // Get the latitude and longitude from the response
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      // Construct the API URL for weather data using the obtained latitude and longitude
      var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + apiKey;

      // Make the API call using fetch function
      fetch(apiUrl)
        .then(function(response) {
          if (!response.ok) {
            throw new Error("City not found");
          }
          return response.json();
        })
        .then(function(data) {
          // Process the response data
          console.log(data);
          console.log(data.main.temp);

      //Through the Open WeatherMap API response
        // Updates the City information in the HTML by getting the value of the name property 
        document.getElementById("currentCity").textContent = data.name;
        // Updates the temperature information in the HTML by getting the temp property 
        document.getElementById("currentTemp").textContent = "Temp: " + data.main.temp + "ºC";
        // Updates the Wind information in the HTML by getting wind property which contains properties such as speed
        document.getElementById("currentWind").textContent = "Wind: " + data.wind.speed + "m/s";
        // Updates the Humidity information in the HTML by getting humidity property
        document.getElementById("currentHumidity").textContent = "Humidity: " + data.main.humidity + "%";
        //Updates the description in the HTML by getting the weather property -> weather array -> first index (0) -> description property 
        document.getElementById("description").textContent = "Description: " + data.weather[0].description;
        // Adds a icon from the openweather API corresponding to particular weather codes 
        document.getElementById("currentIcon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      })
        .catch(function(error) {
          // Handle any errors that occur during the API call
          console.log("An error occurred:", error);
          document.getElementById("currentCity").textContent = "Sorry, there was an error";

          // Checks if the error is due to a city not found
          if (error.message === "City not found") {
            console.log("City not found. Please enter a valid city name.");
            document.getElementById("currentCity").textContent = "Sorry, the city was not found";
          }
        });
    })
    .catch(function(error) {
      // Handle any errors that occur during the API call
      console.log("An error occurred:", error);
      document.getElementById("currentCity").textContent = "Sorry, there was an error";

      // Checks if the error is due to a city not found
      if (error.message === "City not found") {
        console.log("City not found. Please enter a valid city name.");
        document.getElementById("currentCity").textContent = "Sorry, the city was not found";
      }
    });
}

function fetchForecastData(city) {
  // Convert the city name to lowercase to make the search case-insensitive
  city = city.toLowerCase();

  // Construct the geocoding API URL to get the latitude and longitude
  var geocodingUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + ",AU&limit=1&appid=" + apiKey;

  // Make the API call to fetch the latitude and longitude
  fetch(geocodingUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(function(data) {
      if (data.length === 0) {
        throw new Error("City not found");
      }

      // Get the latitude and longitude from the response
      var latitude = data[0].lat;
      var longitude = data[0].lon;

      // Construct the forecast API URL using the obtained latitude and longitude
      var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + apiKey;

      // Make the API call to fetch the forecast data
      fetch(forecastUrl)
        .then(function(response) {
          if (!response.ok) {
            throw new Error("Failed to fetch forecast data");
          }
          return response.json();
        })
        .then(function(data) {
          // Process the forecast data and update the HTML elements
          console.log(data);

          // Update the forecast data for each day
          // Day 1
          document.getElementById("date-plus-1").textContent = dayjs().add(1, "day").format("DD/MM/YY");
          // document.querySelector("#icon-1").src = "https://openweathermap.org/img/w/" + data.list[1].weather[0].icon + ".png";
          // document.querySelector("#temp-1").textContent = "Temp: " + data.list[1].main.temp + " ºF";
          // document.querySelector("#wind-1").textContent = "Wind: " + data.list[1].wind.speed + " MPH";
          // document.querySelector("#humidity-1").textContent = "Humidity: " + data.list[1].main.humidity + " %";
        })
        .catch(function(error) {
          console.log('An error occurred:', error);
        });
    })
    .catch(function(error) {
      console.log('An error occurred:', error);
    });
}

//Event Listeners
//Search for a city 
document.getElementById('searchBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    console.log("search button clicked");
  
    // Get the user input value
    var city = document.getElementById('userInput').value;
  
    // Call the function to fetch weather data based on the user input
    getWeatherData(city);
  });

//Get current Day  
document.addEventListener("DOMContentLoaded", function() {
    var currentDate = dayjs().format("dddd, D, MMMM, YYYY");
    document.getElementById("currentDay").textContent = currentDate;
//Get current time  
    var currentTime = dayjs().format("HH:mm:ss Z [AEST]");
    document.getElementById("currentTime").textContent = currentTime;
//Get current Date
    var currentDate = dayjs().format("D/M/YYYY")
    document.getElementById("currentDate").textContent = currentDate;
});
// +1 Day
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("date-plus-1").textContent = dayjs().add(1, "day").format("DD/MM/YY");
});

// +2 Day
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("date-plus-2").textContent = dayjs().add(2, "day").format("DD/MM/YY");
});

// +3 Day
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("date-plus-3").textContent = dayjs().add(3, "day").format("DD/MM/YY");
});

// +4 Day
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("date-plus-4").textContent = dayjs().add(4, "day").format("DD/MM/YY");
});

// +5 Day
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("date-plus-5").textContent = dayjs().add(5, "day").format("DD/MM/YY");
});

