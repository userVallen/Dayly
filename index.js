import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://api.open-meteo.com/v1/forecast";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const result = await axios.get(API_URL, {
      params: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        hourly: "temperature_2m,weather_code",
        forecast_days: 1,
        timezone: "auto",
      },
    });
    console.log(result.data);

    // * Interpret weather codes
    let weatherCodes = [];

    if (
      result.data.hourly &&
      result.data.hourly.weather_code &&
      result.data.hourly.weather_code.length > 0
    ) {
      const codes = result.data.hourly.weather_code;
      codes.map((weatherCode) => {
        if (weatherCode === 0 || weatherCode === 1) {
          weatherCodes.push({
            name: "Clear",
            iconURL: "images/clear.png",
          });
        } else if (weatherCode === 2 || weatherCode === 3) {
          weatherCodes.push({
            name: "Cloudy",
            iconURL: "images/cloudy.png",
          });
        } else if (weatherCode === 45 || weatherCode === 48) {
          weatherCodes.push({ name: "Fog", iconURL: "images/fog.png" });
        } else if (
          weatherCode === 51 ||
          weatherCode === 53 ||
          weatherCode === 55
        ) {
          weatherCodes.push({
            name: "Drizzle",
            iconURL: "images/drizzle.png",
          });
        } else if (weatherCode === 56 || weatherCode === 57) {
          weatherCodes.push({
            name: "Freezing drizzle",
            iconURL: "images/fr-drizzle.png",
          });
        } else if (
          weatherCode === 61 ||
          weatherCode === 63 ||
          weatherCode === 65
        ) {
          weatherCodes.push({
            name: "Rain",
            iconURL: "images/rain.png",
          });
        } else if (weatherCode === 66 || weatherCode === 67) {
          weatherCodes.push({
            name: "Freezing rain",
            iconURL: "images/fr-rain.png",
          });
        } else if (
          weatherCode === 71 ||
          weatherCode === 73 ||
          weatherCode === 75
        ) {
          weatherCodes.push({
            name: "Snowfall",
            iconURL: "images/snowfall.png",
          });
        } else if (weatherCode === 77) {
          weatherCodes.push({
            name: "Snow",
            iconURL: "images/snow.png",
          });
        } else if (
          weatherCode === 80 ||
          weatherCode === 81 ||
          weatherCode === 82
        ) {
          weatherCodes.push({
            name: "Rain showers",
            iconURL: "images/r-showers.png",
          });
        } else if (weatherCode === 85 || weatherCode === 86) {
          weatherCodes.push({
            name: "Snow showers",
            iconURL: "images/s-showers.png",
          });
        } else if (weatherCode === 95) {
          weatherCodes.push({
            name: "Thunderstorm",
            iconURL: "images/thunderstorm.png",
          });
        } else if (weatherCode === 96 || weatherCode === 99) {
          weatherCodes.push({
            name: "Hailstorm",
            iconURL: "images/hailstorm.png",
          });
        } else {
          weatherCodes.push({ name: "Unknown", iconURL: "" });
        }
      });
    } else {
      console.log("hourly or weather_code is missing");
    }

    console.log(weatherCodes);

    // * Interpret temperature
    let temps = [];

    if (
      result.data.hourly &&
      result.data.hourly.temperature_2m &&
      result.data.hourly.temperature_2m.length > 0
    ) {
      const temperatures = result.data.hourly.temperature_2m;
      temperatures.map((temp) => {
        temps.push(Math.floor(temp));
      });
    }

    console.log(temps);

    // * Interpret time
    let times = [];

    if (
      result.data.hourly &&
      result.data.hourly.time &&
      result.data.hourly.time.length > 0
    ) {
      const ISO_times = result.data.hourly.time;
      ISO_times.map((timeString) => {
        const hour = new Date(timeString).getHours();
        const formattedHour = `${String(hour).padStart(2, "0")}:00`;
        times.push(formattedHour);
      });
    }

    console.log(times);

    res.render("index.ejs", {
      ...result.data,
      weatherCodes: weatherCodes,
      temps: temps,
      times: times,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
