import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import XYZ from 'ol/source/XYZ.js';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiemhpZnUiLCJhIjoiY205azNyNGY1MGkyZDJxcTJleDUwaHV1ZCJ9.wOmSdOnDDdre-mB1Lpy6Fg'; // 替换为你的token

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`,
            tileSize: 512,
            maxZoom: 22,
            attributions:
              '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }),
        }),
      ],
      view: new View({
        center: [120, 30],
        zoom: 2,
        projection: 'EPSG:3857',
      }),
    });

    return () => map.setTarget('map');
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;

