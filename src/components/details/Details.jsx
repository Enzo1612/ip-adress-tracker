import React, { useState, useEffect } from "react";
import "./Details.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToString } from "react-dom/server";

function Details({ ipAddress, onIPChange }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [isp, setIsp] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://geo.ipify.org/api/v1?apiKey=at_5T4aSappF2FwubfFrDOJs28320CDM&ipAddress=${ipAddress}`
        );
        const data = await response.json();
        setLatitude(data.location.lat);
        setLongitude(data.location.lng);
        setCity(data.location.city);
        setPostalCode(data.location.postalCode);
        setTimeZone(data.location.timezone);
        setIsp(data.isp);
      } catch (error) {
        console.error("Error fetching IP geolocation:", error);
      }
    };

    if (ipAddress) {
      fetchLocation();
    }
  }, [ipAddress]);

  useEffect(() => {
    const map = L.map("map", {
      center: [latitude, longitude],
      zoom: 13,
      dragging: false, // Disable map dragging
      zoomControl: false, // Disable zoom control buttons
      scrollWheelZoom: false, // Disable scroll wheel zooming
      doubleClickZoom: false, // Disable double-click zooming
      touchZoom: false, // Disable touch zooming
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    const customIcon = L.divIcon({
      className: "custom-icon",
      html: renderToString(<FaMapMarkerAlt size={24} />),
    });

    L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  return (
    <div className="container">
      <div className="detailsContainer">
        <div className="detailContainer">
          <p className="detailDefault">IP Address</p>
          <p className="detailVariable">{ipAddress}</p>
        </div>
        <div className="detailContainer">
          <p className="detailDefault">Location</p>
          <p className="detailVariable">{city}</p>
          <p className="detailVariable">{postalCode}</p>
        </div>
        <div className="detailContainer">
          <p className="detailDefault">Timezone</p>
          <p className="detailVariable">UTC {timeZone}</p>
        </div>
        <div className="detailContainer">
          <p className="detailDefault">ISP</p>
          <p className="detailVariable">{isp}</p>
        </div>
      </div>

      <div id="map" className="mapContainer"></div>
    </div>
  );
}

export default Details;
