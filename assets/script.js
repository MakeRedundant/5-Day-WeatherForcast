//Variables 

//Api 
//Api key from Openweather 
var apiKey = "f62c9d6db823b3bd186bc980988733d1";

//Api call

// var apiCall = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={f62c9d6db823b3bd186bc980988733d1}";


// var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=CITY_NAME&appid=${f62c9d6db823b3bd186bc980988733d1}`;

//Day.js to get our current time 

var city = "";

//Event Listeners

// var currentDateTime = dayjs().format("DD/MM/YY: HH:mm:ss");
// document.getElementById("currentDateTime").textContent = currentDateTime;

document.addEventListener("DOMContentLoaded", function() {
    var currentDate = dayjs().format("dddd, D, MMMM, YYYY");
    document.getElementById("currentDay").textContent = currentDate;
  
    var currentTime = dayjs().format("HH:mm:ss Z [AEST]");
    document.getElementById("currentTime").textContent = currentTime;
  });
  