import React, { useState } from "react";
import "./Ip.css";

const Ip = ({ onIPChange }) => {
  // Destructure onIPChange from props
  const [ipAddress, setIPAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onIPChange(ipAddress);
    // You can perform further actions with the IP address value here
  };

  const handleChange = (e) => {
    setIPAddress(e.target.value);
  };

  return (
    <div className="ipContainer">
      <h1 id="ipTitle">IP Address Tracker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={ipAddress}
            placeholder="Search for any IP address or domain"
            id="ipInput"
            onChange={handleChange}
          />
        </label>
        <button type="submit" id="ipButton">
          {">"}
        </button>
      </form>
    </div>
  );
};

export default Ip;
