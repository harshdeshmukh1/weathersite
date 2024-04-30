
//making object of weatherapi
// const weatherApi = {
//     key: '4eb3703790b356562054106543b748b2',
//     baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
// }

//anonymous function
//adding event listener key press of enter
let searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        // console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        
    }
})


//get weather report

function getWeatherReport(city) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=e857b69a0de34dac88b113333240703&q=${city}&aqi=yes`)  // fetch method fetching the data from  base url ...metric is used for unit in celcius......here i am appending the base url to get data by city name .  
        .then(weather => {   //weather is from api
            return weather.json(); // return data from api in JSON
        }).then(showWeaterReport);  // calling showweatherreport function

}

//show weather report

function showWeaterReport(weather) {
    let city_code=weather.cod;
    if(city_code==='400'){ 
        swal("Empty Input", "Please enter any city", "error");
        reset();
    }else if(city_code==='404'){
        swal("Bad Input", "entered city didn't matched", "warning");
        reset();
    }
    else{

    // console.log(weather.cod);
    // console.log(weather);  
    let op = document.getElementById('weather-body');
    op.style.display = 'block';
    let todayDate = new Date();
    let parent=document.getElementById('parent');
    let weather_body = document.getElementById('weather-body');
    weather_body.innerHTML =
        `
    <div class="location-deatils">
        <div class="city" id="city">${weather.location.name}, ${weather.location.country}</div>
        <div class="date" id="date"> ${dateManage(todayDate)}</div>
    </div>
    <div class="weather-status">
        <div class="temp" id="temp">${Math.round(weather.current.temp_c)}&deg;C </div>
        <div class="weather" id="weather"> ${weather.current.condition.text} <i class="${getIconClass(weather.current.condition.text)}"></i>  </div>
        <div class="min-max" id="min-max">${Math.floor(weather.current.feelslike_c)}&deg;C  / ${Math.ceil(weather.current.feelslike_f)}&deg;F  </div>
        <div id="updated_on">Updated as of ${getTime(todayDate)}</div>
    </div>
    <hr>
    <div class="day-details">
        <div class="basic">Feels like ${weather.current.feelslike_c}&deg;C | Humidity ${weather.current.humidity}%  <br> Pressure ${weather.current.pressure_in} mb | Wind ${weather.current.wind_kph} KMPH</div>
    </div>
    `;
    parent.append(weather_body);
    changeBg(weather.current.condition.text);
    reset();
    let brief = document.querySelector('.brief');
    brief.style.display = 'none';
    console.log(weather);
    }
}



//making a function for the  last update current time 

function getTime(todayDate) {
    let hour =addZero(todayDate.getHours());
    let minute =addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

//date manage for return  current date
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    // console.log(year+" "+date+" "+day+" "+month);
    return `${date} ${month} (${day}) , ${year}`
}

// function for the dynamic background change  according to weather status
function changeBg(status) {
    if (status === 'Partly Cloudy' || status === 'Partly cloudy' || status === 'Cloudy' || status === 'cloudy') {
        document.body.style.backgroundImage = 'url(partlyCloudy.jpeg)';
    } else if (status.includes('rain') || status.includes('Rain') || status.includes('drizzle')) {
        document.body.style.backgroundImage = 'url(lightrain2.jpeg)';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url(clear.jpeg)';
    }
    else if (status === 'Overcast') {
        document.body.style.backgroundImage = 'url(overcast.jpeg)';
    }
    else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url(sunny.jpeg)';
    } else if (status.includes('thunder') || status.includes('Thundery')) {
        document.body.style.backgroundImage = 'url(thunder.jpeg)';
    } else if (status.includes('snow') || status.includes('Snow')) {
        document.body.style.backgroundImage = 'url(snow.jpeg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url(haze.jpeg)';
    } else if (status === 'Moderate or heavy snow showers ') {
        document.body.style.backgroundImage = 'url(heavysnow.jpeg)';
    }
    else {
        document.body.style.backgroundImage = 'url(default1.jpeg)';
    }
}

//making a function for the classname of icon
function getIconClass(classarg) {
    if (classarg.includes('rain') || classarg.includes('Rain') || classarg.includes('drizzle') || classarg.includes('Drizzle')) {
        return 'fas fa-cloud-showers-heavy';
    } else if (classarg.includes('cloudy') || classarg.includes('Cloudy')) {
        return 'fas fa-cloud';
    } else if (classarg === 'Clear') {
        return 'fas fa-cloud-sun';
    } else if (classarg.includes('Snow') ||  classarg.includes('snow')) {
        return 'fas fa-snowman';
    } else if (classarg === 'Sunny') {
        return 'fas fa-sun';
    } else if (classarg === 'Mist') {
        return 'fas fa-smog';
    } else if (classarg.includes('Thunder') || classarg.includes('Thundery')){
        return 'fas fa-thunderstorm';
    } else {
        return 'fas fa-cloud-sun';
    }
}

function reset() {
    let input = document.getElementById('input-box');
    input.value = "";
}

// funtion to add zero if hour and minute less than 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
