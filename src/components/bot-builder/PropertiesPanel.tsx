"use client";

import { Node } from "@xyflow/react";
import { Settings, X } from 'lucide-react';

interface PropertiesPanelProps {
  selectedNode: Node | null;
  updateNodeData: (nodeId: string, data: any) => void;
}

export function PropertiesPanel({ selectedNode, updateNodeData }: PropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <div className="w-80 bg-gray-800/50 backdrop-blur-xl border-l border-gray-700/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-500/20 rounded-lg">
            <Settings className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Настройки</h3>
        </div>
        
        <div className="text-center py-12">
          <div className="p-4 bg-gray-500/10 rounded-full w-fit mx-auto mb-4">
            <span className="text-3xl">⚙️</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Выберите блок на схеме для настройки его параметров
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (field: string, value: any) => {
    updateNodeData(selectedNode.id, { [field]: value });
  };

  const getNodeTypeInfo = (type: string) => {
    const nodeTypes = {
      message: { icon: '💬', name: 'Сообщение', color: 'from-blue-500 to-blue-600' },
      buttons: { icon: '🔘', name: 'Кнопки', color: 'from-green-500 to-green-600' },
      condition: { icon: '🔀', name: 'Условие', color: 'from-purple-500 to-purple-600' },
      question: { icon: '❓', name: 'Вопрос', color: 'from-yellow-500 to-orange-600' },
      webhook: { icon: '🔗', name: 'Webhook', color: 'from-red-500 to-red-600' }
    };
    return nodeTypes[type as keyof typeof nodeTypes] || { icon: '⚙️', name: 'Блок', color: 'from-gray-500 to-gray-600' };
  };

  const nodeInfo = getNodeTypeInfo(selectedNode.type);

  return (
    <div className="w-80 bg-gray-800/50 backdrop-blur-xl border-l border-gray-700/50 p-6 custom-scrollbar overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 bg-gradient-to-r ${nodeInfo.color} rounded-lg shadow-lg`}>
            <span className="text-lg">{nodeInfo.icon}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{nodeInfo.name}</h3>
            <p className="text-xs text-gray-400">ID: {selectedNode.id}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* MESSAGE NODE */}
        {selectedNode.type === "message" && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Тип сообщения
              </label>
              <select
                value={selectedNode.data.messageType || "text"}
                onChange={(e) => handleChange("messageType", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
              >
                <option value="text" className="bg-gray-800">Текст</option>
                <option value="image" className="bg-gray-800">Изображение</option>
                <option value="video" className="bg-gray-800">Видео</option>
                <option value="file" className="bg-gray-800">Файл</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Текст сообщения
              </label>
              <textarea
                value={selectedNode.data.text || ""}
                onChange={(e) => handleChange("text", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all resize-none"
                rows={4}
                placeholder="Введите текст сообщения..."
              />
            </div>

            {selectedNode.data.messageType === "image" && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  URL изображения
                </label>
                <input
                  type="url"
                  value={selectedNode.data.imageUrl || ""}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            )}
          </>
        )}

        {/* BUTTONS NODE */}
        {selectedNode.type === "buttons" && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Текст вопроса
              </label>
              <textarea
                value={selectedNode.data.question || ""}
                onChange={(e) => handleChange("question", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all resize-none"
                rows={3}
                placeholder="Что вас интересует?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Кнопки
              </label>
              <div className="space-y-3">
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
                      className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                      placeholder={`Кнопка ${index + 1}`}
                    />
                    <button
                      onClick={() => {
                        const newButtons = [...(selectedNode.data.buttons || [])];
                        newButtons.splice(index, 1);
                        handleChange("buttons", newButtons);
                      }}
                      className="px-3 py-3 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    const newButtons = [...(selectedNode.data.buttons || []), ""];
                    handleChange("buttons", newButtons);
                  }}
                  className="w-full px-4 py-3 border-2 border-dashed border-white/30 rounded-xl text-sm text-gray-400 hover:border-white/50 hover:text-white transition-all duration-200"
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
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Переменная для проверки
              </label>
              <input
                type="text"
                value={selectedNode.data.variable || ""}
                onChange={(e) => handleChange("variable", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                placeholder="last_user_message"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Тип условия
              </label>
              <select
                value={selectedNode.data.conditionType || "equals"}
                onChange={(e) => handleChange("conditionType", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
              >
                <option value="equals" className="bg-gray-800">Равно</option>
                <option value="contains" className="bg-gray-800">Содержит</option>
                <option value="starts_with" className="bg-gray-800">Начинается с</option>
                <option value="regex" className="bg-gray-800">Регулярное выражение</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Значение для сравнения
              </label>
              <input
                type="text"
                value={selectedNode.data.conditionValue || ""}
                onChange={(e) => handleChange("conditionValue", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                placeholder="Введите значение..."
              />
            </div>
          </>
        )}

        {/* QUESTION NODE */}
        {selectedNode.type === "question" && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Текст вопроса
              </label>
              <textarea
                value={selectedNode.data.questionText || ""}
                onChange={(e) => handleChange("questionText", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all resize-none"
                rows={3}
                placeholder="Как вас зовут?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Тип ответа
              </label>
              <select
                value={selectedNode.data.questionType || "text"}
                onChange={(e) => handleChange("questionType", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
              >
                <option value="text" className="bg-gray-800">Текст</option>
                <option value="number" className="bg-gray-800">Число</option>
                <option value="email" className="bg-gray-800">Email</option>
                <option value="phone" className="bg-gray-800">Телефон</option>
                <option value="date" className="bg-gray-800">Дата</option>
                <option value="choice" className="bg-gray-800">Выбор из списка</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Имя переменной
              </label>
              <input
                type="text"
                value={selectedNode.data.variableName || ""}
                onChange={(e) => handleChange("variableName", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                placeholder="user_name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Подсказка для пользователя
              </label>
              <input
                type="text"
                value={selectedNode.data.placeholder || ""}
                onChange={(e) => handleChange("placeholder", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                placeholder="Введите ваше имя"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <label htmlFor="required" className="text-sm font-medium text-gray-300">
                Обязательное поле
              </label>
              <input
                type="checkbox"
                id="required"
                checked={selectedNode.data.required || false}
                onChange={(e) => handleChange("required", e.target.checked)}
                className="h-4 w-4 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500 focus:ring-2"
              />
            </div>
          </>
        )}

        {/* WEBHOOK NODE */}
        {selectedNode.type === "webhook" && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                URL
              </label>
              <input
                type="url"
                value={selectedNode.data.url || ""}
                onChange={(e) => handleChange("url", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                placeholder="https://api.example.com/webhook"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                HTTP метод
              </label>
              <select
                value={selectedNode.data.method || "GET"}
                onChange={(e) => handleChange("method", e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
              >
                <option value="GET" className="bg-gray-800">GET</option>
                <option value="POST" className="bg-gray-800">POST</option>
                <option value="PUT" className="bg-gray-800">PUT</option>
                <option value="DELETE" className="bg-gray-800">DELETE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Таймаут (мс)
              </label>
              <input
                type="number"
                value={selectedNode.data.timeout || 5000}
                onChange={(e) => handleChange("timeout", parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                min="1000"
                max="30000"
                step="1000"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}