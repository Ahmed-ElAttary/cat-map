"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import MapContext from "@components/MapComponent/MapContext";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
const CurrentPositionBtn = () => {
  const { map } = useContext(MapContext);
  const [position, setPosition] = useState([]);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setPoint([position.coords.longitude, position.coords.latitude]);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  const setPoint = (position) => {
    const iconFeature = new Feature(new Point(position));
    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);
    setPosition(position);
    console.log(position);
  };

  return (
    <>
      <Button icon="pi pi-map-marker" onClick={getLocation} />
      <div>{position.join(" , ")}</div>
    </>
  );
};

export default CurrentPositionBtn;
