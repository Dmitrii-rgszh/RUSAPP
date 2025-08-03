"use client";

import { MessageSquare, MousePointerClick, GitBranch, Webhook, FileQuestion } from 'lucide-react';

const nodeTypes = [
  {
    type: "message",
    label: "Сообщение",
    icon: MessageSquare,
    description: "Отправить текст, изображение или файл",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30"
  },
  {
    type: "buttons",
    label: "Кнопки",
    icon: MousePointerClick,
    description: "Варианты ответов для пользователя",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30"
  },
  {
    type: "condition",
    label: "Условие",
    icon: GitBranch,
    description: "Ветвление логики бота",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30"
  },
  {
    type: "question",
    label: "Вопрос",
    icon: FileQuestion,
    description: "Сбор информации от пользователя",
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30"
  },
  {
    type: "webhook",
    label: "Webhook",
    icon: Webhook,
    description: "Вызов внешнего API",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30"
  },
];

export function NodePanel() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-80 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <span className="text-xl">🧩</span>
        </div>
        <h3 className="text-lg font-bold text-white">Блоки</h3>
      </div>
      
      <div className="space-y-3">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            draggable
            onDragStart={(e) => onDragStart(e, nodeType.type)}
            className="group cursor-move bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${nodeType.color} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <nodeType.icon className="h-5 w-5 text-white" />
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {nodeType.label}
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {nodeType.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tips */}
      <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💡</span>
          <h4 className="text-sm font-semibold text-indigo-300">Подсказка</h4>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Перетащите блок в рабочую область, чтобы добавить его в сценарий бота
        </p>
      </div>
    </div>
  );
}