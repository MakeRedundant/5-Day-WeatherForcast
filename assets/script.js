//Variables 
var currentDay; //For getting the current Day + Date dddd, D, MMMM, YYYY
var currentDate = dayjs().format("dddd, D, MMMM, YYYY"); //For getting current Date D/M/YYYY
var currentTime; //For getting the current Time + Timezone HH:mm:ss Z [AEST]
var recentSearches = []; //array for recent searches 

let city = document.getElementById('userInput').value;
//Api 
//Api key from Openweather 
const apiKey = "f62c9d6db823b3bd186bc980988733d1";
var lonKey = "&lon=";
var latitude = " ";
var longitude = " ";
//Api Call 5 day / 3 hour forecast data
const apiCall = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={f62c9d6db823b3bd186bc980988733d1}";

function getWeatherData(city) {
  // Convert the city name to lowercase to make the search case-insensitive
  city = city.toLowerCase();

  // Construct the API URL to get the latitude and longitude
  var geocodingUrl = /*base url*/ "https://api.openweathermap.org/geo/1.0/direct?q="/*query parameters */ + city + ",limit=1&appid=" + apiKey; //limit one to return the most releveant result + apikey to authenicate the request

  // Make the API call to fetch the latitude and longitude
   // makes a fetch request to the geocodingUrl we constructed
  fetch(geocodingUrl) 
    .then(function(response) { //then() method to handle response when it is successfully recevied.
      if (!response.ok) { 
        throw new Error("response not within 200-299"); //not withint 200-299 an error is thrown
      }
      return response.json(); //if successful json () is called on the response to parse the response body as JSON which returns another promise that resolves to the parse data
    })
    .then(function(data) { //another then() method to handle the parsed JSON data 
      if (data.length === 0) {
        throw new Error("Parsed JSON data is empty"); 
      }

      // Get the latitude and longitude from the response
      var latitude = data[0].lat;
      var longitude = data[0].lon;
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      // Construct the API URL for weather data using the obtained latitude and longitude
      var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + apiKey; //query parameters of lat+ lon retrives metric data 

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
          console.log("Forecast data:", data);
          console.log("Current temperature:", data.list[0].main.temp);

      //Through the Open WeatherMap API response
      //Current day
        // Updates the City information in the HTML by getting the value of the name property 
        document.getElementById("currentCity").textContent = data.city.name;
        // Updates the temperature information in the HTML by getting the temp property 
        document.getElementById("currentTemp").textContent = "Temp: " + data.list[0].main.temp + "ºC";
        // Updates the Wind information in the HTML by getting wind property which contains properties such as speed
        document.getElementById("currentWind").textContent = "Wind: " + data.list[0].wind.speed + "m/s";
        // Updates the Humidity information in the HTML by getting humidity property
        document.getElementById("currentHumidity").textContent = "Humidity: " + data.list[0].main.humidity + "%";
        //Updates the description in the HTML by getting data.list property than is an array -> data.list[0] -> weather array[0]-> description property
        document.getElementById("description").textContent = "Description: " + data.list[0].weather[0].description;
        // Adds a icon from the openweather API corresponding to particular weather codes 
        document.getElementById("currentIcon").src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";
        var time = data.list[0].dt_txt;
        console.log(time);

        //Day +1 
        document.querySelector("#icon-1").src = "https://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + ".png";
        document.querySelector("#temp-1").textContent = "Temp: " + data.list[1].main.temp + " ºC";
        document.querySelector("#wind-1").textContent = "Wind: " + data.list[1].wind.speed + " m/s";
        document.querySelector("#humidity-1").textContent = "Humidity: " + data.list[1].main.humidity + " %";
        document.getElementById("description-1").textContent = "Description: " + data.list[1].weather[0].description;

        //Day +2 
        document.querySelector("#icon-2").src = "https://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + ".png";
        document.querySelector("#temp-2").textContent = "Temp: " + data.list[2].main.temp + " ºC";
        document.querySelector("#wind-2").textContent = "Wind: " + data.list[2].wind.speed + " m/s";
        document.querySelector("#humidity-2").textContent = "Humidity: " + data.list[2].main.humidity + " %";
        document.getElementById("description-2").textContent = "Description: " + data.list[2].weather[0].description;

        //Day +3 
        document.querySelector("#icon-3").src = "https://openweathermap.org/img/wn/" + data.list[3].weather[0].icon + ".png";
        document.querySelector("#temp-3").textContent = "Temp: " + data.list[3].main.temp + " ºC";
        document.querySelector("#wind-3").textContent = "Wind: " + data.list[3].wind.speed + " m/s";
        document.querySelector("#humidity-3").textContent = "Humidity: " + data.list[3].main.humidity + " %";
        document.getElementById("description-3").textContent = "Description: " + data.list[3].weather[0].description;

        //Day +4 
        document.querySelector("#icon-4").src = "https://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + ".png";
        document.querySelector("#temp-4").textContent = "Temp: " + data.list[4].main.temp + " ºC";
        document.querySelector("#wind-4").textContent = "Wind: " + data.list[4].wind.speed + " m/s";
        document.querySelector("#humidity-4").textContent = "Humidity: " + data.list[4].main.humidity + " %";
        document.getElementById("description-4").textContent = "Description: " + data.list[4].weather[0].description;

        //Day +5 
        document.querySelector("#icon-5").src = "https://openweathermap.org/img/wn/" + data.list[5].weather[0].icon + ".png";
        document.querySelector("#temp-5").textContent = "Temp: " + data.list[5].main.temp + " ºC";
        document.querySelector("#wind-5").textContent = "Wind: " + data.list[5].wind.speed + " m/s";
        document.querySelector("#humidity-5").textContent = "Humidity: " + data.list[5].main.humidity + " %";
        document.getElementById("description-5").textContent = "Description: " + data.list[5].weather[0].description;
        
      })
        .catch(function(error) {
          // Handle any errors that occur during the API call
          console.log("An error occurred:", error);
          document.getElementById("currentCity").textContent = "Sorry, there was an error";

          // Checks if the error is due to a city not found
          if (error.message === "City not found") {
            console.log("City not found. Please enter a valid city name.");
            document.getElementById("currentCity").textContent = "City not found. Please enter a valid city name.";
          }
        });
    })
}

function appendRecentSearches(city) {
  var recentSearchesContainer = document.getElementById("recentSearches");

  // Check if the city input is empty
  if (city === "") {
    window.alert("Please input a city"); // Display a window popup asking to input a city
    return; // If the city input is empty, stop the function execution
  }

  // Clear the container before appending new list items
  recentSearchesContainer.innerHTML = "";
  var errorOccurred = document.getElementById("currentCity").textContent === "Sorry, there was an error";

  if (errorOccurred) {
    return; // If there was an error, stop the function execution
  }

  // Create a list item for each recent search
  for (var index = 0; index < recentSearches.length; index++) {
    var city = recentSearches[index];
    var listItem = document.createElement("li");
    var recentSearchButton = document.createElement("button");
    recentSearchButton.innerText = city;
    recentSearchButton.className = "btn btn-primary";
    recentSearchButton.onclick = function() {
      var cityName = this.innerText;
      console.log("City button clicked: " + cityName);
      getWeatherData(cityName);
    };

    // Append the button to the list item
    listItem.appendChild(recentSearchButton);

    // Append the list item to the container
    recentSearchesContainer.appendChild(listItem);
  }
}


//Event Listeners
//Search for a city 
document.getElementById('searchBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
    console.log("search button clicked");
  
    // Gets the user input value
    var city = document.getElementById('userInput').value;
    recentSearches.push(city); //Adds the searches city to the array
    //Saves to local storage 
    localStorage.setItem('RecentSearches', JSON.stringify(recentSearches)); // Save the array to local storage
    console.log("City saved");

    // Check if the city input is empty
  if (city.trim() === "") {
    window.alert("Please input a city"); // Display a window popup asking to input a city
    return; // Stop the function execution
  }

    // Call the function to fetch weather data based on the user input
    getWeatherData(city);  
    // Append recent searches to the HTML
    appendRecentSearches(city);
  });
//Day.js to get our current time 
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
  document.getElementById("date-plus-1").textContent = dayjs().add(1, "day").format("dddd DD/MM/YY");
});

// +2 Day
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("date-plus-2").textContent = dayjs().add(2, "day").format("dddd DD/MM/YY");
});

// +3 Day
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("date-plus-3").textContent = dayjs().add(3, "day").format("dddd DD/MM/YY");
});

// +4 Day
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("date-plus-4").textContent = dayjs().add(4, "day").format("dddd DD/MM/YY");
});

// +5 Day
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("date-plus-5").textContent = dayjs().add(5, "day").format("dddd DD/MM/YY");
});

