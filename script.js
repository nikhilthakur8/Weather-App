const temp=document.getElementsByClassName("temp")[0].innerHTML;
const apiKey = "007193865e62e18444f3159eb9a7f2b1";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?"
let longitude=0;
let latitude=0;
const ipGeoURL ="https://ipgeolocation.abstractapi.com/v1/?api_key=3b1a6ae9221d44d2b45524aceca7818e";

navigator.geolocation.getCurrentPosition(
    function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        const apiLink = apiURL+`&lat=${latitude}&lon=${longitude}&units=metric&appid=`+apiKey;
        checkWeather(apiLink);
    },
    function(error){
            ipAddress(ipGeoURL);
    }
    );
    document.querySelector(".search button").addEventListener('click',()=>{
        const cityName = document.getElementsByClassName("cityName")[0].value;
        const apiLink = apiURL+`q=${cityName}&units=metric&appid=`+apiKey;
        checkWeather(apiLink);
    }
    )

async function ipAddress(link){
    const response = await fetch(link);
    const data = await response.json();
    const apiLink = apiURL+`&lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=`+apiKey;
    checkWeather(apiLink);
}
async  function checkWeather(link){
    const response = await fetch(link);
    const data = await response.json();
    document.getElementsByClassName("temp")[0].innerHTML = Math.round(data.main.temp)+`&degC`;
    document.getElementsByClassName("windSpeed")[0].innerHTML = Math.round(data.wind.speed*3.6)+` Km/h`;
    document.getElementsByClassName("city")[0].innerHTML= data.name;
    document.getElementsByClassName("humidity")[0].innerHTML= data.main.humidity+`%`;
    document.querySelector(".weather img").src= `Images/${data.weather[0].main}.png`;
    document.querySelector(".condition").innerHTML= data.weather[0].main;
}
