import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { WeatherChart } from "./Chart";
import { Weekday } from "./Weekday";

const Home = ({ latitude, longitude }) => {
  const [weatherData, setweatherData] = useState({});
  const [hourlyData, setHourlyData] = useState([]);
  const [weekDayData, setWeekDayData] = useState([]);
  const [city, setCity] = useState("");

  const api_key = `64a1b2bf693c8827c861e064d96655e2`;

  let lat = weatherData?.coord?.lat || latitude;
  let lon = weatherData?.coord?.lon || longitude;
  useEffect(() => {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setweatherData({ ...data });
        setCity(data.name);
      });
  }, [latitude, longitude, weekDayData]);

  useEffect(() => {
    let weekDay_api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${api_key}&units=metric`;

    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely,current,alerts&units=metric&appid=${api_key}`;

    fetch(weekDay_api)
      .then((res) => res.json())
      .then((data) => setWeekDayData([...data?.daily]));

    fetch(api)
      .then((res) => res.json())
      .then((data) => setHourlyData([...data?.hourly]));
  }, [lat, lon, latitude, longitude]);

  const getTime = (time) => {
    return new Date(time * 1000).toString().slice(16, 24);
  };

  const getIcon = (weather) => {
    return weather === "Rain"
      ? "./rain.png"
      : weather === "Clear"
      ? "./sunny.svg"
      : "./cloudy.svg";
  };

  const getCity = () => {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => setweatherData({ ...data }));
  };

  console.log(weatherData);

  if (!weatherData?.weather) {
    return <Box>Loading</Box>;
  }

  return (
    <Stack sx={{ color: "black", gap: 3 }}>
      <Box sx={{ display: "flex", mt: 2, mb: 2 }}>
        <TextField
          sx={{ width: "100%" }}
          id="input-with-icon-textfield"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              getCity();
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Button variant="text" onClick={getCity}>
          <SearchIcon />
        </Button>
      </Box>
      <Weekday data={weekDayData} />
      <WeatherChart data={hourlyData} />
      <Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">
            {Math.round(weatherData?.main?.temp - 273) + "°C"}
          </Typography>
          <Box sx={{ height: "3em", marginLeft: "1rem" }}>
            <img
              style={{ height: "100%" }}
              src={getIcon(weatherData?.weather[0]?.main)}
              alt="img"
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box flex={1} sx={{ background: "#f3fbff", padding: "1rem" }}>
          <Typography>Pressure</Typography>
          <Typography>{weatherData?.main?.pressure}</Typography>
        </Box>
        <Box flex={1} sx={{ background: "#f3fbff", padding: "1rem" }}>
          <Typography>Humidity</Typography>
          <Typography>{weatherData?.main?.humidity}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box flex={1} sx={{ background: "#f3fbff", padding: "1rem" }}>
          <Typography>Sunrise</Typography>
          <Typography>{getTime(weatherData?.sys?.sunrise)}</Typography>
        </Box>
        <Box flex={1} sx={{ background: "#f3fbff", padding: "1rem" }}>
          <Typography>Sunset</Typography>
          <Typography>{getTime(weatherData?.sys?.sunset)}</Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default Home;
