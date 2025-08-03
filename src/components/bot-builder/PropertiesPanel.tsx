"use client";

import { Node } from "@xyflow/react";
import { X } from "lucide-react";

interface PropertiesPanelProps {
  selectedNode: Node | null;
  updateNodeData: (nodeId: string, data: any) => void;
}

export function PropertiesPanel({ selectedNode, updateNodeData }: PropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <p className="text-sm text-gray-500 text-center mt-8">
          Выберите блок для редактирования
        </p>
      </div>
    );
  }

  const handleChange = (field: string, value: any) => {
    updateNodeData(selectedNode.id, { [field]: value });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Настройки блока
          </h3>
          <button
            onClick={() => {}}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {selectedNode.type === "message" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Текст сообщения
              </label>
              <textarea
                value={selectedNode.data.text || ""}
                onChange={(e) => handleChange("text", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Введите текст сообщения..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Тип сообщения
              </label>
              <select
                value={selectedNode.data.messageType || "text"}
                onChange={(e) => handleChange("messageType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="text">Текст</option>
                <option value="image">Изображение</option>
                <option value="file">Файл</option>
                <option value="video">Видео</option>
              </select>
            </div>

            {selectedNode.data.messageType === "image" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL изображения
                </label>
                <input
                  type="url"
                  value={selectedNode.data.imageUrl || ""}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}
          </>
        )}

        {selectedNode.type === "buttons" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Текст вопроса
              </label>
              <textarea
                value={selectedNode.data.question || ""}
                onChange={(e) => handleChange("question", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Что вас интересует?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Кнопки
              </label>
              <div className="space-y-2">
                {(selectedNode.data.buttons || []).map((button: string, index: number) => (
                  <input
                    key={index}
                    type="text"
                    value={button}
                    onChange={(e) => {
                      const newButtons = [...(selectedNode.data.buttons || [])];
                      newButtons[index] = e.target.value;
                      handleChange("buttons", newButtons);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Кнопка ${index + 1}`}
                  />
                ))}
                <button
                  onClick={() => {
                    const newButtons = [...(selectedNode.data.buttons || []), ""];
                    handleChange("buttons", newButtons);
                  }}
                  className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-400"
                >
                  + Добавить кнопку
                </button>
              </div>
            </div>
          </>
        )}

        {selectedNode.type === "condition" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Тип условия
              </label>
              <select
                value={selectedNode.data.conditionType || "equals"}
                onChange={(e) => handleChange("conditionType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="equals">Равно</option>
                <option value="contains">Содержит</option>
                <option value="starts_with">Начинается с</option>
                <option value="regex">Регулярное выражение</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Значение для сравнения
              </label>
              <input
                type="text"
                value={selectedNode.data.conditionValue || ""}
                onChange={(e) => handleChange("conditionValue", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Введите значение..."
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}