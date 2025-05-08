import React, { useState, useEffect } from "react";
import { Map as OlMap } from "ol";
import { useMap } from "../MapComponent";
import ReactDOM from "react-dom/client";
import Control from "ol/control/Control";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import mapboxOutdoors from "../../../assets/map/layers/mapbox-outdoors.png";
import mapboxSatellite from "../../../assets/map/layers/mapbox-satellite.png";
import mapboxSatelliteStreet from "../../../assets/map/layers/mapbox-satellite-streets.png";
import mapboxStreets from "../../../assets/map/layers/mapbox-streets.png";
import clsx from "clsx";

const INITIAL_LAYER = "mapbox-outdoors";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiemhpZnUiLCJhIjoiY205azNyNGY1MGkyZDJxcTJleDUwaHV1ZCJ9.wOmSdOnDDdre-mB1Lpy6Fg"; // 替换为你的token

const streetsLayer = new TileLayer({
  source: new XYZ({
    url: `https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`,
    tileSize: 512,
    maxZoom: 20,
    projection: "EPSG:3857",
    attributions:
      '数据来源：<a href="https://www.mapbox.com/">Mapbox</a> & <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  }),
});
const outdoorsLayer = new TileLayer({
  source: new XYZ({
    url: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`,
    tileSize: 512,
    maxZoom: 20,
    projection: "EPSG:3857",
    attributions:
      '数据来源：<a href="https://www.mapbox.com/">Mapbox</a> & <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  }),
});
const satelliteLayer = new TileLayer({
  source: new XYZ({
    url: `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`,
    tileSize: 512,
    maxZoom: 20,
    projection: "EPSG:3857",
    attributions:
      '数据来源：<a href="https://www.mapbox.com/">Mapbox</a> & <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  }),
});
const satelliteStreetsLayer = new TileLayer({
  source: new XYZ({
    url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`,
    tileSize: 512,
    maxZoom: 20,
    projection: "EPSG:3857",
    attributions:
      '数据来源：<a href="https://www.mapbox.com/">Mapbox</a> & <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  }),
});

const baseLayers = [
  {
    id: "mapbox-outdoors",
    name: "户外地图",
    layer: outdoorsLayer,
    img: mapboxOutdoors.src,
  },
  {
    id: "mapbox-satellite",
    name: "卫星地图",
    layer: satelliteLayer,
    img: mapboxSatellite.src,
  },
  {
    id: "mapbox-satellite-streets",
    name: "卫星街道地图",
    layer: satelliteStreetsLayer,
    img: mapboxSatelliteStreet.src,
  },
  {
    id: "mapbox-streets",
    name: "街道地图",
    layer: streetsLayer,
    img: mapboxStreets.src,
  },
];

class MapLayerControl extends Control {
  private root: ReactDOM.Root | null = null;

  constructor(map: OlMap) {
    const container = document.createElement("div");
    super({ element: container });

    // 初始化默认添加底图
    const initialLayerInfo = baseLayers.find(
      (layer) => layer.id === INITIAL_LAYER
    );
    if (initialLayerInfo) {
      map.addLayer(initialLayerInfo.layer);
    }

    const handleMapLayers = (id: string) => {
      if (map) {
        // 先移除所有基础图层
        baseLayers.forEach(({ layer }) => {
          if (map.getLayers().getArray().includes(layer)) {
            map.removeLayer(layer);
          }
        });
        // 添加新图层
        const layerInfo = baseLayers.find((layerInfo) => layerInfo.id === id);
        if (layerInfo) {
          map.addLayer(layerInfo.layer);
        }
      }
    };
    // React 渲染控件内容到 container
    const root = ReactDOM.createRoot(container);
    root.render(<MapLayerControlContent handleMapLayers={handleMapLayers} />);
  }
  disposeInternal() {
    // 使用 root.unmount 卸载 React 组件
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    super.disposeInternal();
  }
}

const MapLayerControlContent: React.FC<{
  handleMapLayers: (id: string) => void;
}> = ({ handleMapLayers }) => {
  // 切换底图选项展开，控制显示和卸载+
  const [isShow, setShow] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  // 快速切换底图
  const [activeId, setActiveId] = useState(INITIAL_LAYER);
  const handleQuickSwitch = () => {
    const nextId =
      activeId === baseLayers[0].id ? baseLayers[1].id : baseLayers[0].id;
    setActiveId(nextId);
    handleMapLayers(nextId);
  };
  // 记录定时器，避免多次触发
  const hideTimer = React.useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setShow(true);
    setExpanded(true);
  };

  const handleLeave = () => {
    setShow(false);
    hideTimer.current = setTimeout(() => {
      setExpanded(false);
    }, 300);
  };
  return (
    <div className="fixed right-18 bottom-4">
      <div
        className="w-20 h-20 bg-white rounded-xl drop-shadow-xl shadow-black"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <div className="w-20 h-20 p-1">
          <button onClick={() => handleQuickSwitch()}>
            <img
              width={240}
              height={100}
              src={
                activeId === baseLayers[0].id
                  ? baseLayers[1].img
                  : baseLayers[0].img
              }
              alt={
                activeId === baseLayers[0].id
                  ? baseLayers[1].name
                  : baseLayers[0].name
              }
              className="object-cover object-left w-18 h-18 rounded-xl"
            />
            <div className=" absolute left-1 bottom-1 flex w-18 h-auto items-center justify-center rounded-b-xl text-xs text-white bg-black opacity-80">
              <span>
                {activeId === baseLayers[0].id
                  ? baseLayers[1].name
                  : baseLayers[0].name}
              </span>
            </div>
          </button>
        </div>
      </div>
      {isExpanded && (
        <div
          className={clsx(
            "absolute flex right-24 bottom-0 w-90 h-25 bg-white rounded-xl  drop-shadow-xl shadow-black transition-all duration-300",
            isShow ? "opacity-100" : "opacity-0"
          )}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {baseLayers.map((item) => (
            <button
              key={item.id}
              className="flex flex-auto flex-col  justify-center items-center text-gray-500 text-xs"
              onClick={() => handleMapLayers(item.id)}
            >
              <img
                width={240}
                height={100}
                src={item.img}
                alt={item.name}
                className="object-cover object-left w-16 h-16 rounded-md border-2 border-white hover:border-blue-500"
              />
              <span className="pt-1">{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const LayersControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const control = new MapLayerControl(map);
    map.addControl(control);
    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
};

export default LayersControl;
