"use client";

import { MessageSquare, MousePointerClick, GitBranch, Webhook, FileQuestion } from "lucide-react";

const nodeTypes = [
  {
    type: "message",
    label: "Сообщение",
    icon: MessageSquare,
    description: "Отправить текст, изображение или файл",
  },
  {
    type: "buttons",
    label: "Кнопки",
    icon: MousePointerClick,
    description: "Варианты ответов для пользователя",
  },
  {
    type: "condition",
    label: "Условие",
    icon: GitBranch,
    description: "Ветвление логики бота",
  },
  {
    type: "question",
    label: "Вопрос",
    icon: FileQuestion,
    description: "Сбор информации от пользователя",
  },
  {
    type: "webhook",
    label: "Webhook",
    icon: Webhook,
    description: "Вызов внешнего API",
  },
];

export function NodePanel() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("nodeType", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Блоки</h3>
      <div className="space-y-2">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            draggable
            onDragStart={(e) => onDragStart(e, nodeType.type)}
            className="bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <nodeType.icon className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {nodeType.label}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {nodeType.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}