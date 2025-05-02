"use client"

export default function ChatWindow() {
  return (
    <div className="absolute inset-0 flex flex-col justify-end p-4">
      {/* 聊天内容 */}
      <div className="flex-1 overflow-y-auto mb-4">
        {/* 聊天气泡等 */}
        <div>AI 聊天、信息汇集处</div>
      </div>
      {/* AI引导按钮 */}
      <div className="flex gap-2 mb-2">
        <button className="bg-blue-200 rounded px-3 py-1">推荐活动</button>
        <button className="bg-blue-200 rounded px-3 py-1">附近活动</button>
        <button className="bg-blue-200 rounded px-3 py-1">推荐景点</button>
      </div>
      {/* 输入框 */}
      <div className="flex">
        <input className="flex-1 border rounded-l px-3 py-2" placeholder="输入消息..." />
        <button className="bg-blue-400 text-white px-4 rounded-r">发送</button>
      </div>
    </div>
  );
}