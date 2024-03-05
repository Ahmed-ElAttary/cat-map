"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import MapContext from "@components/MapComponent/MapContext";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

const CurrentPositionBtn = () => {
  const { map } = useContext(MapContext);
  const vlRef = useRef();
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
    const vectorSource = new VectorSource({
      features: [new Feature(new Point(position))],
    });
    map.getView().fit(vectorSource.getExtent(), { maxZoom: 20 });
    map.removeLayer(vlRef.current);
    vlRef.current = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vlRef.current);
    setPosition(position);
    console.log(map.getLayers());
  };

  return (
    <>
      <Button icon="pi pi-map-marker" onClick={getLocation} />
      {/* <div>{position.join(" , ")}</div> */}
    </>
  );
};

export default CurrentPositionBtn;
