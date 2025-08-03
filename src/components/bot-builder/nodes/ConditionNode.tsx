"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { GitBranch } from "lucide-react";

export const ConditionNode = memo(({ data, selected }: NodeProps) => {
  const conditionTypeLabels = {
    equals: "Равно",
    contains: "Содержит",
    starts_with: "Начинается с",
    regex: "RegEx",
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
          <GitBranch className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Условие</span>
        </div>
        
        <div className="text-xs text-gray-600">
          <div>
            {conditionTypeLabels[data.conditionType as keyof typeof conditionTypeLabels] || "Условие"}
          </div>
          {data.conditionValue && (
            <div className="font-mono bg-gray-100 px-1 py-0.5 rounded mt-1">
              {data.conditionValue}
            </div>
          )}
        </div>
        
        <div className="mt-2 space-y-1">
          <div className="relative">
            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              ✓ Да
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id="yes"
              className="!bg-green-500"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            />
          </div>
          <div className="relative">
            <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
              ✗ Нет
            </div>
            <Handle
              type="source"
              position={Position.Right}
              id="no"
              className="!bg-red-500"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});