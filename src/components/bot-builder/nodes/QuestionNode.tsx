"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { FileQuestion } from "lucide-react";

export const QuestionNode = memo(({ data, selected }: NodeProps) => {
  const questionTypeLabels = {
    text: "Текст",
    number: "Число",
    email: "Email",
    phone: "Телефон",
    date: "Дата",
    choice: "Выбор"
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
          <FileQuestion className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">Вопрос</span>
        </div>
        
        <div className="text-sm text-gray-600 mb-2">
          {data.questionText || "Задайте вопрос пользователю"}
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-gray-500">
            Тип: {questionTypeLabels[data.questionType as keyof typeof questionTypeLabels] || "Текст"}
          </div>
          
          {data.required && (
            <div className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
              Обязательно
            </div>
          )}
          
          {data.placeholder && (
            <div className="text-xs text-gray-400 italic">
              Подсказка: {data.placeholder}
            </div>
          )}
          
          {data.questionType === "choice" && data.choices && (
            <div className="mt-1">
              <div className="text-xs text-gray-500 mb-1">Варианты:</div>
              {data.choices.map((choice: string, index: number) => (
                <div key={index} className="text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded mb-1">
                  {choice}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-2">
          <div className="text-xs text-gray-500">Переменная: ${data.variableName || "answer"}</div>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-gray-400"
      />
    </div>
  );
});