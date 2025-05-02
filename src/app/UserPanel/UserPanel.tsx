"use client"

export default function UserPanel() {
  return (
    <div className="w-64 bg-white rounded-xl shadow p-4 flex flex-col items-center">
      <div className="flex justify-end w-full">
        <img src="s" className="w-8 h-8 rounded-full" alt="Avatar" />
      </div>
      <div className="my-2 text-center">
        <img src="src/assets/avatar/avatar-small.jpeg" className="w-16 h-16 rounded-full mx-auto" alt="Avatar" />
        <div className="font-bold mt-2">用户</div>
      </div>
      <button className="bg-blue-400 text-white rounded px-4 py-2 mt-2">导入数据</button>
      <button className="bg-blue-400 text-white rounded px-4 py-2 mt-2">导出数据</button>
    </div>
  );
}