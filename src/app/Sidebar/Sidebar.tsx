"use client";

import { useState } from "react";
import clsx from "clsx";
import {Menu, History, Bookmarks} from "@mui/icons-material"

export default function Sidebar() {
  const [isExpanded, setisExpanded] = useState(false);

  const toggleMenu = () => {
    setisExpanded(!isExpanded);
  };

  const menuItems = [
    { id: "history", icon: <History />, label: "最近聊天记录" },
    { id: "bookmarks", icon: <Bookmarks />, label: "已保存的POI" },
  ];

  return (
    <div className="fixed top-0 left-0">
      <aside
        className={clsx(
          "flex flex-col h-screen bg-white items-center py-6 shadow-lg transition-all duration-300",
          isExpanded ? "w-48" : "w-16"
        )}
      >
        {/* 菜单按钮 */}
        <button
          className="mb-10 p-3 rounded-full hover:bg-blue-50 py-2 transition-colors"
          onClick={toggleMenu}
        >
          {isExpanded ? <Menu /> : <Menu />}
        </button>
        {/* 功能选择区 */}
        <nav className="flex flex-col gap-6 w-full items-center">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={clsx(
                "items-center flex flex-row p-2 gap-1 text-gray-700 hover:bg-blue-50 py-2 rounded-full transition-colors overflow-clip",
                isExpanded? "w-36":"w-10"
              )}
            >
              {item.icon}
              <span
                className={clsx(
                  "text-xs font-medium transition-all duration-300 whitespace-nowrap ml-1",
                  isExpanded
                    ? "opacity-100"
                    : "opacity-0"
                )}
              >
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}
