import React from "react";
import Zoom from "./Controls/Zoom";
import LayersControl from "./Controls/LayersControl";

const MapTools = () => {
  return (
    <div>
      <Zoom />
      <LayersControl />
      {/* 继续添加其他自定义控件 */}
    </div>
  );
};

export default MapTools;
