"use client"

export default function ChatListPanel() {
  return (
    <div className="w-72 bg-white rounded-xl shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-lg">最近</span>
        <button className="text-gray-400">X</button>
      </div>
      <ul className="space-y-2">
        <li>聊天记录1</li>
        <li>聊天记录2</li>
        <li>聊天记录3</li>
      </ul>
    </div>
  );
}