import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { useEffect, useState } from "react";

function App() {
  const [position, setPosition] = useState({
    lat: null,
    lon: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console.log(navigator.geolocation);
    }
  }, []);

  function showPosition(position) {
    setPosition({
      ...position,
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  }

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px 0" }}>
      <Home latitude={position.lat} longitude={position.lon} />
    </div>
  );
}

export default App;
