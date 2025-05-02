"use client";

import { useState } from "react";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from "@mui/icons-material/History";
import BookmarksIcon from "@mui/icons-material/Bookmarks";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: <HistoryIcon />, label: "最近聊天记录" },
    { icon: <BookmarksIcon />, label: "已保存的POI" },
  ];

  return (
    <aside
      className={clsx(
        "flex flex-col h-screen bg-white items-center py-6 shadow-lg rounded-br-2xl",
        isOpen ? "w-48" : "w-16"
      )}
    >
      {/* 菜单按钮 */}
      <button
        className="mb-10 p-3 rounded-full hover:bg-blue-50 py-2 transition-colors"
        onClick={toggleMenu}
      >
        {isOpen ? <MenuIcon /> : <MenuIcon />}
      </button>
      {/* 功能选择区 */}
      <nav className="flex flex-col gap-6 w-full items-center">
        {menuItems.map((item) => (
          <button
            className={clsx(
              "items-center flex gap-1 text-gray-700 hover:bg-blue-50 py-2 rounded-full transition-colors",
              isOpen ? "flex-row p-2" : "flex-col p-2"
            )}
          >
            {item.icon}
            <span
              className={clsx("text-xs font-medium", isOpen ? "" : "hidden")}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
