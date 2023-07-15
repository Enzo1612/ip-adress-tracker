import React, { useState } from "react";
import "./App.css";
import Details from "./components/details/Details";
import Ip from "./components/ipAdress/Ip";

function App() {
  const [ipAddress, setIPAddress] = useState("");

  const handleIPChange = (newIPAddress, newLocation) => {
    setIPAddress(newIPAddress);
  };

  return (
    <div className="App">
      <Ip onIPChange={handleIPChange} />
      <Details ipAddress={ipAddress} onLocationChange={handleIPChange} />
    </div>
  );
}

export default App;
