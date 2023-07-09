//Variables 
var currentDay; //For getting the current Day + Date dddd, D, MMMM, YYYY
var currentDate; //For getting current Date D/M/YYYY
var currentTime; //For getting the current Time + Timezone HH:mm:ss Z [AEST]
var city = "";

//Api 
//Api key from Openweather 
var apiKey = "f62c9d6db823b3bd186bc980988733d1";

//Api call

var apiCall = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={f62c9d6db823b3bd186bc980988733d1}";


//Day.js to get our current time 

function getWeatherData(city) {
    // Convert the cities to lowercase to make the search case-insensitive
    city = city.toLowerCase();
  
    // Construct the API URL with the city name and API key + retrieves metric results
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",AU&units=metric&appid=" + apiKey;

    // Make the API call using fetch function
    fetch(apiUrl) //initates an HTTP request to the OpenWeatherMap API, returns a promise that resolves to the response object 
      .then(function(response) { //inside the "then" method is called when the promise is fulfilled 
        if (!response.ok) {
          throw new Error("City not found"); //if the response status is not within successful range 200-299 throw a error
        }
        return response.json();
      })
      .then(function(data) {
        // Process the response data
        console.log(data); // logs the response data
        console.log(data.main.temp); // Logs the value of the 'temp' property

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


    // Fetch current date + 1
var currentDatePlusOne = dayjs().add(1, 'day').format("D/M/YYYY");

// Updates the temperature information for +1 day in the HTML
document.getElementById("temp-1").textContent = "Temp: " + currentDatePlusOne + "ºC";









      })
      .catch(function(error) {
        // Handle any errors that occur during the API call
        console.log('An error occurred:', error); 
        document.getElementById("currentCity").textContent = "Sorry there was a error";
  
        // Checks if the error is due to a city not found
        if (error.message === "City not found") {
          console.log("City not found. Please enter a valid city name.");
          document.getElementById("currentCity").textContent = "Sorry the city was not found";
        }
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