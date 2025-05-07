import React, { useState, useEffect } from "react";
import { Map as OlMap } from "ol";
import { useMap } from "../MapComponent";
import ReactDOM from "react-dom/client";
import Control from "ol/control/Control";
import Geolocation from "ol/Geolocation";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";
import clsx from "clsx";

const INITIAL_ZOOM = 14; // 默认缩放级别

class ZoomControl extends Control {
  private root: ReactDOM.Root | null = null;

  constructor(map: OlMap) {
    const container = document.createElement("div");
    super({ element: container });
    // 放大函数
    const handleZoomIn = () => {
      const view = map.getView();
      view.animate({ zoom: (view.getZoom() ?? 0) + 1, duration: 200 });
    };
    // 缩小函数
    const handleZoomOut = () => {
      const view = map.getView();
      view.animate({ zoom: (view.getZoom() ?? 0) - 1, duration: 200 });
    };
    // 定位功能
    const geolocation = new Geolocation({
      trackingOptions: { enableHighAccuracy: true },
      projection: map.getView().getProjection(),
    });
    const handleLocate = () => {
      geolocation.once("change:position", () => {
        const coords = geolocation.getPosition();
        if (coords) {
          map
            .getView()
            .animate({ center: coords, zoom: INITIAL_ZOOM, duration: 500 });
        }
        geolocation.setTracking(false);
      });
      geolocation.setTracking(true);
    };

    // React 渲染控件内容到 container
    const root = ReactDOM.createRoot(container);
    root.render(
      <ZoomContent
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleLocate={handleLocate}
      />
    );
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

const ZoomContent: React.FC<{
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleLocate: () => void;
}> = ({ handleZoomIn, handleZoomOut, handleLocate }) => {
  const [locateDisabled, setLocateDisabled] = useState(false);

  // 包装 handleLocate，点击后禁用按钮一段时间
  const onLocateClick = () => {
    navigator.geolocation.getCurrentPosition(
      (geolocation) => {
        handleLocate();
      },
      (error) => {
        console.log(error.message);
        setLocateDisabled(true); // 定位失败后禁用按钮
        // alert("定位失败，将使用默认位置。");
      }
    );
  };
  return (
    <div className="fixed right-4 bottom-4">
      <div className="w-8 h-26 flex flex-col gap-2 items-center">
        <div
          className={clsx(
            "w-8 h-8 bg-gray-50 flex items-center justify-center rounded-xl drop-shadow-xl shadow-black",
            locateDisabled && "text-gray-300"
          )}
        >
          <button
            className="w-6 h-6 flex items-center justify-center rounded-xl  hover:bg-white transition-all duration-100"
            onClick={onLocateClick}
            disabled={locateDisabled}
          >
            <GpsFixedRoundedIcon fontSize="small" />
          </button>
        </div>
        <div className="w-8 h-16 flex flex-col items-center justify-center bg-gray-50 rounded-xl drop-shadow-xl shadow-black">
          <button
            className="w-6 h-6 flex items-center justify-center rounded-xl hover:bg-white transition-all duration-100"
            onClick={handleZoomIn}
            aria-label="放大"
          >
            <AddRoundedIcon />
          </button>
          <div className="m-0.5 border-t-1 border-gray-300 w-6"></div>
          <button
            className="w-6 h-6 flex items-center justify-center rounded-xl hover:bg-white transition-all duration-100"
            onClick={handleZoomOut}
            aria-label="缩小"
          >
            <RemoveRoundedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const Zoom: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const control = new ZoomControl(map);
    map.addControl(control);
    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
};

export default Zoom;
