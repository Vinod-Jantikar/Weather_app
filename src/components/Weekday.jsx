import { Typography } from "@mui/material";
import { Box } from "@mui/material";

export const Weekday = ({ data }) => {
  const getDay = (day) => {
    return new Date(day * 1000).toString().slice(0, 3);
  };

  const getIcon = (weather) => {
    return weather === "Rain"
      ? "./rain.png"
      : weather === "Clear"
      ? "./sunny.svg"
      : "./cloudy.svg";
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      {data.map((item) => (
        <Box sx={{ textAlign: "center" }}>
          <Typography>{getDay(item?.dt)}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{Math.round(item.temp.max) + "°"}</Typography>
            <Typography>{Math.round(item.temp.min) + "°"}</Typography>
          </Box>
          <Box sx={{ maxWidth: "30px", margin: "auto" }}>
            <img
              style={{ width: "100%" }}
              src={getIcon(item.weather[0].main)}
              alt=""
            />
          </Box>
          <Typography>{item.weather[0].main}</Typography>
        </Box>
      ))}
    </Box>
  );
};
