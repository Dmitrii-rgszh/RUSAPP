"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { MessageSquare } from "lucide-react";

export const MessageNode = memo(({ data, selected }: NodeProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border-2 transition-all ${
        selected ? "border-indigo-500" : "border-gray-200"
      } min-w-[200px]`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-400"
      />
      
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Сообщение</span>
        </div>
        
        <div className="text-sm text-gray-600">
          {data.text || "Нажмите для редактирования"}
        </div>
        
        {data.messageType && data.messageType !== "text" && (
          <div className="mt-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {data.messageType === "image" && "🖼️ Изображение"}
            {data.messageType === "file" && "📎 Файл"}
            {data.messageType === "video" && "🎥 Видео"}
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400"
      />
    </div>
  );
});