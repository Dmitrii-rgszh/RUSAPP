"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Webhook, ExternalLink } from "lucide-react";

export const WebhookNode = memo(({ data, selected }: NodeProps) => {
  const methodColors = {
    GET: "bg-green-500/20 text-green-300 border-green-500/30",
    POST: "bg-blue-500/20 text-blue-300 border-blue-500/30", 
    PUT: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    DELETE: "bg-red-500/20 text-red-300 border-red-500/30"
  };

  return (
    <div
      className={`bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border-2 transition-all duration-200 ${
        selected 
          ? "border-red-400 shadow-red-500/25 scale-105" 
          : "border-gray-600/50 hover:border-gray-500/70"
      } min-w-[250px] max-w-[300px]`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-gray-500 !border-2 !border-gray-400 !w-3 !h-3"
      />
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg">
            <Webhook className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-red-300">Webhook</span>
        </div>
        
        {data.url ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded font-semibold border ${
                methodColors[data.method as keyof typeof methodColors] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
              }`}>
                {data.method || "GET"}
              </span>
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </div>
            
            <div className="text-xs text-gray-300 break-all bg-white/5 px-2 py-1 rounded border border-white/10">
              {data.url}
            </div>
            
            <div className="text-xs text-gray-400 space-y-1">
              {data.headers && Object.keys(data.headers).length > 0 && (
                <div>Headers: {Object.keys(data.headers).length}</div>
              )}
              
              {data.body && (
                <div>Body: {typeof data.body === 'string' ? 'Text' : 'JSON'}</div>
              )}
              
              {data.timeout && (
                <div>Таймаут: {data.timeout}ms</div>
              )}
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="relative">
                <div className="text-xs bg-green-500/20 text-green-300 px-3 py-2 rounded-lg border border-green-500/30 font-medium flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Успех
                </div>
                <Handle
                  type="source"
                  position={Position.Right}
                  id="success"
                  className="!bg-green-500 !border-2 !border-green-400 !w-3 !h-3"
                  style={{ 
                    top: "50%", 
                    right: '-6px',
                    transform: "translateY(-50%)" 
                  }}
                />
              </div>
              
              <div className="relative">
                <div className="text-xs bg-red-500/20 text-red-300 px-3 py-2 rounded-lg border border-red-500/30 font-medium flex items-center gap-2">
                  <span className="text-red-400">✗</span>
                  Ошибка
                </div>
                <Handle
                  type="source"
                  position={Position.Right}
                  id="error"
                  className="!bg-red-500 !border-2 !border-red-400 !w-3 !h-3"
                  style={{ 
                    top: "75%", 
                    right: '-6px',
                    transform: "translateY(-50%)" 
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-400 italic bg-white/5 p-3 rounded-lg border border-white/10">
            Настройте URL и метод запроса
          </div>
        )}
      </div>
    </div>
  );
});