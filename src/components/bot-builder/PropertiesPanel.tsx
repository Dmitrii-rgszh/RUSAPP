"use client";

import { Node } from "@xyflow/react";

interface PropertiesPanelProps {
  selectedNode: Node | null;
  updateNodeData: (nodeId: string, data: any) => void;
}

export function PropertiesPanel({ selectedNode, updateNodeData }: PropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Настройки</h3>
        <p className="text-sm text-gray-500">Выберите блок для настройки</p>
      </div>
    );
  }

  const handleChange = (field: string, value: any) => {
    updateNodeData(selectedNode.id, { [field]: value });
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Настройки</h3>
      
      <div className="space-y-4">
        {/* MESSAGE NODE */}
        {selectedNode.type === "message" && (
          <>
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
                <option value="video">Видео</option>
                <option value="file">Файл</option>
              </select>
            </div>

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

            {selectedNode.data.messageType === "file" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL файла
                </label>
                <input
                  type="url"
                  value={selectedNode.data.fileUrl || ""}
                  onChange={(e) => handleChange("fileUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://example.com/file.pdf"
                />
              </div>
            )}

            {selectedNode.data.messageType === "video" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL видео
                </label>
                <input
                  type="url"
                  value={selectedNode.data.videoUrl || ""}
                  onChange={(e) => handleChange("videoUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://example.com/video.mp4"
                />
              </div>
            )}
          </>
        )}

        {/* BUTTONS NODE */}
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
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={button}
                      onChange={(e) => {
                        const newButtons = [...(selectedNode.data.buttons || [])];
                        newButtons[index] = e.target.value;
                        handleChange("buttons", newButtons);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder={`Кнопка ${index + 1}`}
                    />
                    <button
                      onClick={() => {
                        const newButtons = [...(selectedNode.data.buttons || [])];
                        newButtons.splice(index, 1);
                        handleChange("buttons", newButtons);
                      }}
                      className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      ✕
                    </button>
                  </div>
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

        {/* CONDITION NODE */}
        {selectedNode.type === "condition" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Переменная для проверки
              </label>
              <input
                type="text"
                value={selectedNode.data.variable || ""}
                onChange={(e) => handleChange("variable", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="last_user_message"
              />
            </div>

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

        {/* QUESTION NODE */}
        {selectedNode.type === "question" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Текст вопроса
              </label>
              <textarea
                value={selectedNode.data.questionText || ""}
                onChange={(e) => handleChange("questionText", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Как вас зовут?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Тип ответа
              </label>
              <select
                value={selectedNode.data.questionType || "text"}
                onChange={(e) => handleChange("questionType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="text">Текст</option>
                <option value="number">Число</option>
                <option value="email">Email</option>
                <option value="phone">Телефон</option>
                <option value="date">Дата</option>
                <option value="choice">Выбор из списка</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя переменной
              </label>
              <input
                type="text"
                value={selectedNode.data.variableName || ""}
                onChange={(e) => handleChange("variableName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="user_name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Подсказка для пользователя
              </label>
              <input
                type="text"
                value={selectedNode.data.placeholder || ""}
                onChange={(e) => handleChange("placeholder", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Введите ваше имя"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="required"
                checked={selectedNode.data.required || false}
                onChange={(e) => handleChange("required", e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
                Обязательное поле
              </label>
            </div>

            {selectedNode.data.questionType === "choice" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Варианты выбора
                </label>
                <div className="space-y-2">
                  {(selectedNode.data.choices || []).map((choice: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={choice}
                        onChange={(e) => {
                          const newChoices = [...(selectedNode.data.choices || [])];
                          newChoices[index] = e.target.value;
                          handleChange("choices", newChoices);
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Вариант ${index + 1}`}
                      />
                      <button
                        onClick={() => {
                          const newChoices = [...(selectedNode.data.choices || [])];
                          newChoices.splice(index, 1);
                          handleChange("choices", newChoices);
                        }}
                        className="px-2 py-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newChoices = [...(selectedNode.data.choices || []), ""];
                      handleChange("choices", newChoices);
                    }}
                    className="w-full px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-400"
                  >
                    + Добавить вариант
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* WEBHOOK NODE */}
        {selectedNode.type === "webhook" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                type="url"
                value={selectedNode.data.url || ""}
                onChange={(e) => handleChange("url", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://api.example.com/webhook"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HTTP метод
              </label>
              <select
                value={selectedNode.data.method || "GET"}
                onChange={(e) => handleChange("method", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Заголовки (JSON)
              </label>
              <textarea
                value={JSON.stringify(selectedNode.data.headers || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const headers = JSON.parse(e.target.value);
                    handleChange("headers", headers);
                  } catch {
                    // Игнорируем некорректный JSON
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                rows={4}
                placeholder='{\n  "Authorization": "Bearer token",\n  "Content-Type": "application/json"\n}'
              />
            </div>

            {(selectedNode.data.method === "POST" || selectedNode.data.method === "PUT") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Тело запроса (JSON)
                </label>
                <textarea
                  value={typeof selectedNode.data.body === 'string' ? selectedNode.data.body : JSON.stringify(selectedNode.data.body || {}, null, 2)}
                  onChange={(e) => handleChange("body", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
                  rows={4}
                  placeholder='{\n  "user_id": "{{user_id}}",\n  "message": "{{last_user_message}}"\n}'
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Таймаут (мс)
              </label>
              <input
                type="number"
                value={selectedNode.data.timeout || 5000}
                onChange={(e) => handleChange("timeout", parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min="1000"
                max="30000"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Сохранить ответ в переменную
              </label>
              <input
                type="text"
                value={selectedNode.data.responseVariable || ""}
                onChange={(e) => handleChange("responseVariable", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="webhook_response"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}