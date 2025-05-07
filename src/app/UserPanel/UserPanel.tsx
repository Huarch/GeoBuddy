"use client";

import Image from "next/image";
import avatarSmall from "../../assets/avatar/avatar-small.jpeg";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Button, Icon, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import clsx from "clsx";

export default function UserPanel() {
  const [isExpanded, setisExpanded] = useState(false);

  const toggleAvatar = () => {
    setisExpanded(!isExpanded);
  };

  return (
    <div
      className={clsx(
        "fixed top-4 right-4",
        "transition-all duration-0 ease-initial",
        isExpanded
          ? "w-78 h-60 rounded-3xl bg-gray-50 drop-shadow-xl shadow-black flex flex-col items-center p-6"
          : "w-12 h-12 rounded-full bg-white drop-shadow-xl shadow-black flex items-center justify-center"
      )}
    >
      <div className=" absolute top-0 right-0">
        {!isExpanded ? (
          <Image
            onClick={toggleAvatar}
            width={48}
            height={48}
            src={avatarSmall}
            className="rounded-full mx-auto"
            alt="Avatar"
            priority
            draggable="false"
          />
        ) : (
          <IconButton
            className=" absolute top-2 right-2 w-10 h-10"
            onClick={toggleAvatar}
            size="small"
            aria-label="关闭"
          >
            <Close />
          </IconButton>
        )}
      </div>
      {isExpanded && (
        <div className="flex flex-col items-center mt-4 w-full">
          <Image
            width={64}
            height={64}
            src={avatarSmall}
            className="rounded-full mx-auto"
            alt="Avatar"
            priority
            draggable="false"
          />
          <div className="font-bold mt-2 select-none">你好👋</div>
          <div className="flex mt-8 w-65">
            <button className="flex pl-3 w-full text-sm bg-white mr-0.5 text-gray-700 hover:bg-blue-50 py-2 rounded-l-2xl rounded-r-sm transition-colors">
              <FileUploadIcon fontSize="small" className="mr-2" />
              导入数据
            </button>
            <button className="flex pl-3 w-full text-sm bg-white ml-0.5 text-gray-700 hover:bg-blue-50 py-2 rounded-r-2xl rounded-l-sm transition-colors">
              <FileDownloadIcon fontSize="small" className="mr-2" />
              导出数据
            </button>
          </div>
        </div>
      )}
      {/* <button className="bg-blue-400 text-white rounded px-4 py-2 mt-2">导入数据</button>
      <button className="bg-blue-400 text-white rounded px-4 py-2 mt-2">导出数据</button> */}
    </div>
  );
}
