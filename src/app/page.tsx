"use client"

import dynamic from "next/dynamic";
import Sidebar from "./Sidebar/Sidebar";
import ChatListPanel from "./Chat/ChatListPanel";
import UserPanel from "./UserPanel/UserPanel";
import ChatWindow from "./Chat/ChatWindow";
// import FooterBar from "./Footer/FooterBar";
// import MapTools from "./Map/MapTools";

const MapComponent = dynamic(() => import("./Map/MapComponent"), { ssr: false });

export default function Home() {
  return (
    <div className="fixed inset-0 w-screen h-screen max-w-full max-h-full">
      
      <Sidebar />
      <div className="flex flex-col flex-1 relative">
        <div className="flex justify-between p-4">
          <ChatListPanel />
          <UserPanel />
        </div>
        <div className="flex-1 relative">
          <ChatWindow />
          {/* <MapTools /> */}
        </div>
        {/* <FooterBar /> */}
        <MapComponent/>
      </div>
    </div>
  );
}
