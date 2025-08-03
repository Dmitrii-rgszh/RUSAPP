"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { MousePointerClick } from "lucide-react";

export const ButtonNode = memo(({ data, selected }: NodeProps) => {
  const buttons = data.buttons || ["Кнопка 1", "Кнопка 2"];

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
          <MousePointerClick className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Кнопки</span>
        </div>
        
        {data.question && (
          <div className="text-sm text-gray-600 mb-2">
            {data.question}
          </div>
        )}
        
        <div className="space-y-1">
          {buttons.map((button: string, index: number) => (
            <div key={index} className="relative">
              <div className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                {button || `Кнопка ${index + 1}`}
              </div>
              <Handle
                type="source"
                position={Position.Right}
                id={`button-${index}`}
                className="!bg-indigo-500"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});