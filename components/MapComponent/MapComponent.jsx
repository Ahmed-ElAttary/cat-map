"use client";
import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
// import { Button } from "primereact/button";
import "ol/ol.css";

import View from "ol/View";

import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

import { fromLonLat } from "ol/proj";
import MapContext from "./MapContext";
function MapComponent({ children }) {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  useEffect(() => {
    const mapObject = new Map({
      target: "map",
      layers: [
        // new TileLayer({
        //   source: new XYZ({
        //     url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
        //   }),
        // }),
        new TileLayer({ source: new OSM() }),
      ],
      view: new View({
        center: [30.2, 28],
        zoom: 5.8,
        projection: "EPSG:4326",
      }),
    });
mapObject
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} id="map">
        {children}
      </div>
    </MapContext.Provider>
  );
}

export default MapComponent;
