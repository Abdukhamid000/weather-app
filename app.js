const country = document.querySelector("[data-country]");
const locationText = document.querySelector("[data-location]");
const gradusText = document.querySelector("[data-gradus]");
const humidityText = document.querySelector("[data-humidity]");
const cloudText = document.querySelector("[data-cloud]");
const windSpeedText = document.querySelector("[data-wind-speed]");
const errorMsgText = document.querySelector("[data-error]");

const body = document.body;
let loading = true;

//24d4e334899b405ab7811259230104
async function getCats(location) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=24d4e334899b405ab7811259230104&q=${location}&aqi=no`,
    { mode: "cors" }
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      if (!res.ok) {
        errorMsgText.textContent = res?.error?.message;
      }
      const { location, current } = res;
      injectToHtml(location, current);
    })
    .catch((err) => {
      console.log(err);
    });
}

function injectToHtml(location, current) {
  if ((location, current)) {
    //   body.style.background = "url(./ocean.jpg)";
    locationText.textContent = location?.country;
    cloudText.textContent = `Cloud: ${current?.cloud}`;
    humidityText.textContent = `Humidity: ${current?.humidity}`;
    windSpeedText.textContent = `Wind Speed: ${current?.wind_mph}`;
    gradusText.textContent = `${current?.temp_c} °C`;
  } else {
    setTimeout(() => window.location.reload(), 1000);
  }
}

function validate(input) {
  if (input.trim() !== "") return true;
}

country.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const val = e.target.value;
    if (validate(val)) {
      getCats(val);
      country.value = "";
    }
  }
});
