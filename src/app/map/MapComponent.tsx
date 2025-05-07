"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Map as OlMap } from "ol";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import MapTools from "./MapTools";

// const MAPBOX_TOKEN =
//   "pk.eyJ1IjoiemhpZnUiLCJhIjoiY205azNyNGY1MGkyZDJxcTJleDUwaHV1ZCJ9.wOmSdOnDDdre-mB1Lpy6Fg"; // 替换为你的token

// 跨组件传递
const MapContext = createContext<OlMap | undefined>(undefined);

export const useMap = () => {
  return useContext(MapContext);
};
const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<OlMap>();

  useEffect(() => {
    if (!mapRef.current) return;
    let center = [116.4, 39.9];

    const mapView = new View({
      center: fromLonLat(center),
      zoom: 14,
      projection: "EPSG:3857",
    });

    // const outerdoorsLayer = new TileLayer({
    //   source: new XYZ({
    //     url: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`,
    //     tileSize: 512,
    //     maxZoom: 20,
    //     projection: "EPSG:3857",
    //     attributions:
    //       '数据来源：<a href="https://www.mapbox.com/">Mapbox</a> & <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    //   }),
    // });

    navigator.geolocation.getCurrentPosition(
      (geolocation) => {
        const { longitude, latitude } = geolocation.coords;
        center = fromLonLat([longitude, latitude]);
        mapView.animate({ center, duration: 500 }, { zoom: 14, duration: 300 });
      },
      (error) => {
        console.log(error.message);
        // alert("定位失败，将使用默认位置。");
      }
    );

    const map = new OlMap({
      target: mapRef.current,
      // layers: [outerdoorsLayer],
      view: mapView,
      controls: [],
    });
    setMap(map);

    // 清理函数
    return () => map.setTarget(undefined);
  }, []);

  return (
    <div>
      <MapContext.Provider value={map}>
        <div ref={mapRef} className="w-screen h-screen" />
        <MapTools />
      </MapContext.Provider>
    </div>
  );
};

export default MapComponent;
