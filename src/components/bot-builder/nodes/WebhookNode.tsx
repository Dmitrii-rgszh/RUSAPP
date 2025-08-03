"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Webhook, ExternalLink } from "lucide-react";

export const WebhookNode = memo(({ data, selected }: NodeProps) => {
  const methodColors = {
    GET: "bg-green-100 text-green-700",
    POST: "bg-blue-100 text-blue-700", 
    PUT: "bg-yellow-100 text-yellow-700",
    DELETE: "bg-red-100 text-red-700"
  };

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
          <Webhook className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Webhook</span>
        </div>
        
        {data.url ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className={`text-xs px-2 py-1 rounded font-medium ${
                methodColors[data.method as keyof typeof methodColors] || "bg-gray-100 text-gray-700"
              }`}>
                {data.method || "GET"}
              </span>
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </div>
            
            <div className="text-xs text-gray-600 break-all">
              {data.url}
            </div>
            
            {data.headers && Object.keys(data.headers).length > 0 && (
              <div className="text-xs text-gray-500">
                Headers: {Object.keys(data.headers).length}
              </div>
            )}
            
            {data.body && (
              <div className="text-xs text-gray-500">
                Body: {typeof data.body === 'string' ? 'Text' : 'JSON'}
              </div>
            )}
            
            {data.timeout && (
              <div className="text-xs text-gray-500">
                Таймаут: {data.timeout}ms
              </div>
            )}
            
            <div className="space-y-1 mt-2">
              <div className="relative">
                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  ✓ Успех
                </div>
                <Handle
                  type="source"
                  position={Position.Right}
                  id="success"
                  className="!bg-green-500"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                />
              </div>
              <div className="relative">
                <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                  ✗ Ошибка
                </div>
                <Handle
                  type="source"
                  position={Position.Right}
                  id="error"
                  className="!bg-red-500"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">
            Настройте URL и метод запроса
          </div>
        )}
      </div>
    </div>
  );
});