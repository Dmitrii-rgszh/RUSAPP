"use client";

import { FlowEditor } from '@/components/bot-builder/FlowEditor';

export default function TestBuilderPage() {
  return (
    <div className="h-screen w-full">
      <div className="bg-gray-900 text-white p-4 border-b">
        <h1 className="text-xl font-bold">🤖 Тестирование конструктора ботов</h1>
        <p className="text-gray-300 text-sm mt-1">
          Перетаскивайте блоки из левой панели в рабочую область
        </p>
      </div>
      
      <div className="h-[calc(100vh-80px)]">
        <FlowEditor />
      </div>
    </div>
  );
}