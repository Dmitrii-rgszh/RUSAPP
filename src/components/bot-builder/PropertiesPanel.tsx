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

            {selectedNode.data.messageType === "file" && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  URL файла
                </label>
                <input
                  type="url"
                  value={selectedNode.data.fileUrl || ""}
                  onChange={(e) => handleChange("fileUrl", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                  placeholder="https://example.com/file.pdf"
                />
              </div>
            )}

            {selectedNode.data.messageType === "video" && (
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  URL видео
                </label>
                <input
                  type="url"
                  value={selectedNode.data.videoUrl || ""}
                  onChange={(e) => handleChange("videoUrl", e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
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