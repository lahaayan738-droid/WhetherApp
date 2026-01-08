
let inputValue = document.querySelector("header input");
let searchBtn = document.querySelector(".search-button");
let cityHeading = document.querySelector("#cityName");
let tempValue = document.querySelector("#temp");
let conditionValue = document.querySelector("#condition");
let humidValue = document.querySelector("#humidity");
let windSpeedValue = document.querySelector("#windSpeed");
let forcastHeader = document.querySelectorAll(".forcastDegree");
let forcastDate = document.querySelectorAll(".forcastDate");

let whetherIcon = document.querySelector(".image img");
let forcastImg = document.querySelectorAll(".forcastImg");

const fetchData = async (city)=>{
    let key = "d5bcb97feea444b8b1625550260701";
    let URL = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city},India&days=7`;
    let response = await fetch(URL);
    let data = await response.json();
    return data;
};
searchBtn.addEventListener("click", async()=>{
    handleSearch();
});
inputValue.addEventListener("keydown", async (e)=>{
    if(e.key == "Enter"){
        handleSearch();
    }
})
async function handleSearch(){
  let cityName = inputValue.value.trim();
      if(!cityName)
          {
              return;
          }
  let data = await fetchData(cityName);
  cityHeading.textContent = inputValue.value;
  inputValue.value = "";
  
  const iconPath = getWeatherIcon(data.current.condition.code, data.current.is_day);
  whetherIcon.src = iconPath;
  content(data);
  forcastTemp(data);
  forcastDateContent(data);
  setForcastIcons(data);
}
function getWeatherIcon(code, isDay) {
  // Sunny / Clear
  if (code === 1000) {
    return isDay ? "clear-day.svg" : "clear-night.svg";
  }

  // Cloudy
  if ([1003, 1006, 1009].includes(code)) {
    return isDay ? "overcast-day.svg":"overcast-night.svg";
  }

  // Fog / Mist
  if ([1030, 1135, 1147].includes(code)) {
    return "fog.svg";
  }

  // Rain / Drizzle
  if (
    (code >= 1063 && code <= 1201) ||
    (code >= 1240 && code <= 1252)
  ) {
    return "rain.svg";
  }

  // Snow
  if (code >= 1210 && code <= 1225) {
    return "snow.svg";
  }

  // Thunder
  if (code >= 1273 && code <= 1282) {
    return isDay ? "thunderstorms.svg":"thunderstorms-night.svg";
  }

  // Default
  return "thunderstorms-day-rain.svg";
}

function updateTodayDate() {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-GB", {
    weekday: "short", // Mon, Tue
    day: "2-digit",   // 06
    month: "short"    // Jan
  });

  document.querySelector("#todayDate").textContent = formattedDate;
}
updateTodayDate();


function content(data){
  tempValue.textContent = `${data.current.temp_c}°C`;
  conditionValue.textContent = `${data.current.condition.text}`;
  humidValue.textContent = `${data.current.humidity}%`;
  windSpeedValue.textContent = `${data.current.wind_kph}m/s`;
}

function forcastTemp(data){
  forcastHeader.forEach((h5, index ) =>{

    h5.innerHTML = `${data.forecast.forecastday[index + 1].day.avgtemp_c}°C`;
  })
}
function forcastDateContent(data){
  forcastDate.forEach((h5, index) =>{
    h5.innerHTML = formatDate(data.forecast.forecastday[index + 1].date);
  })
}
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}`;
}
function forcastingImg(code){
  if (code === 1000) {
    return "clear-day.svg";
  }

  // Cloudy
  if ([1003, 1006, 1009].includes(code)) {
    return "overcast-day.svg";
  }

  // Fog / Mist
  if ([1030, 1135, 1147].includes(code)) {
    return "fog.svg";
  }

  // Rain / Drizzle
  if (
    (code >= 1063 && code <= 1201) ||
    (code >= 1240 && code <= 1252)
  ) {
    return "rain.svg";
  }

  // Snow
  if (code >= 1210 && code <= 1225) {
    return "snow.svg";
  }

  // Thunder
  if (code >= 1273 && code <= 1282) {
    return "thunderstorms.svg";
  }

  // Default
  return "thunderstorms-day-rain.svg";
}
// Day 1

function setForcastIcons(data){
  forcastImg.forEach((img, index) => {
    const dayData = data.forecast.forecastday[index + 1];
    if (!dayData) return;

    img.src = forcastingImg(dayData.day.condition.code);
  });
}

// function setForcastIcons(data){
//   forcastImg[0].src = forcastingImg(data.forecast.forecastday[1].day.condition.code);
//   forcastImg[1].src = forcastingImg(data.forecast.forecastday[2].day.condition.code);
//   forcastImg[2].src = forcastingImg(data.forecast.forecastday[3].day.condition.code);
//   forcastImg[3].src = forcastingImg(data.forecast.forecastday[4].day.condition.code);
//   forcastImg[4].src = forcastingImg(data.forecast.forecastday[5].day.condition.code);
//   forcastImg[5].src = forcastingImg(data.forecast.forecastday[6].day.condition.code);
// }

// function forcastTemp(data) {
//   forcastHeader[0].innerHTML = `${data.forecast.forecastday[1].day.avgtemp_c}°C`;
//   forcastHeader[1].innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c}°C`;
//   forcastHeader[2].innerHTML = `${data.forecast.forecastday[3].day.avgtemp_c}°C`;
//   forcastHeader[3].innerHTML = `${data.forecast.forecastday[4].day.avgtemp_c}°C`;
//   forcastHeader[4].innerHTML = `${data.forecast.forecastday[5].day.avgtemp_c}°C`;
//   forcastHeader[5].innerHTML = `${data.forecast.forecastday[6].day.avgtemp_c}°C`;
// }
// function forcastDateContent(data) {
//   forcastDate[0].innerHTML = formatDate(data.forecast.forecastday[1].date);
//   forcastDate[1].innerHTML = formatDate(data.forecast.forecastday[2].date);
//   forcastDate[2].innerHTML = formatDate(data.forecast.forecastday[3].date);
//   forcastDate[3].innerHTML = formatDate(data.forecast.forecastday[4].date);
//   forcastDate[4].innerHTML = formatDate(data.forecast.forecastday[5].date);
//   forcastDate[5].innerHTML = formatDate(data.forecast.forecastday[6].date);
// }









