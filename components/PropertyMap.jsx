"use client";

import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import { Image } from "next/image";
import pin from "@/assets/images/pin.svg";
import { FaMapMarker } from 'react-icons/fa';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });

  const [loading, setLoading] = useState(true);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: "en",
    region: "us",
  });

  useEffect(() => {
    const fetchCoords = async () => {
      const res = await fromAddress(
        `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zip}`
      );

      const { lat, lng } = res.results[0].geometry.location;

      setLat(lat);

      setLng(lng);

      setViewport({
        ...viewport,
        latitude: lat,
        longitude: lng,
      });

      setLoading(false);
    };

    fetchCoords();
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 12,
        }}
        style={{
          width: "100%",
          height: "500px",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker latitude={lat} longitude={lng} anchor="bottom">
        <FaMapMarker className="fa-solid fa-location-dot text-2xl text-orange-700 mr-2"></FaMapMarker>  
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
