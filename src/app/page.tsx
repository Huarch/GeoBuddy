"use client";

// import dynamic from "next/dynamic";
import Sidebar from "./Sidebar/Sidebar";
// import ChatListPanel from "./Chat/ChatListPanel";
import UserPanel from "./UserPanel/UserPanel";
// import ChatWindow from "./Chat/ChatWindow";
// import FooterBar from "./Footer/FooterBar";
// import MapTools from "./Map/MapTools";
import MapComponent from "./OlMap/MapComponent";
// const MapComponent = dynamic(() => import("./Map/MapComponent"), {
//   ssr: false,
// });

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <MapComponent />
      <Sidebar />
      <UserPanel />
      
    </div>
  );
}
