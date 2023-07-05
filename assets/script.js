//Variables 
var currentDate; //For getting the current Date
var currentTime; //For getting the current Time + Timezone
var city = "";

//Api 
//Api key from Openweather 
var apiKey = "f62c9d6db823b3bd186bc980988733d1";

//Api call

var apiCall = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={f62c9d6db823b3bd186bc980988733d1}";


//Day.js to get our current time 

function getWeatherData(city) {
    // Convert the city to lowercase to make the search case-insensitive
    city = city.toLowerCase();
  
    // Construct the API URL with the city name and API key
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    
    // Make the API call using fetch
    fetch(apiUrl)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then(function(data) {
        // Process the response data
        console.log(data); // logs the response data
        // Temperatures are in Kelvin by default
        console.log(data.main.temp);      // Logs the value of the 'temp' property
        console.log(data.main.temp_max);  // Logs the value of the 'temp_max' property
        console.log(data.main.temp_min);  // Logs the value of the 'temp_min' property
  
        // Update the weather information in your HTML
        document.getElementById("currentCity").textContent = data.name;
        // Update other elements with the weather data as needed
  
        // You can also store the recent searches or perform other actions with the data
      })
      .catch(function(error) {
        // Handle any errors that occur during the API call
        console.log('An error occurred:', error);
  
        // Check if the error is due to a city not found
        if (error.message === "City not found") {
          // Handle the case of a city not found
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

//Get current Date  
document.addEventListener("DOMContentLoaded", function() {
    var currentDate = dayjs().format("dddd, D, MMMM, YYYY");
    document.getElementById("currentDay").textContent = currentDate;
//Get current time  
    var currentTime = dayjs().format("HH:mm:ss Z [AEST]");
    document.getElementById("currentTime").textContent = currentTime;
  });
  