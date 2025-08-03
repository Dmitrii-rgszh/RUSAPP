"use client";

import { FlowEditor } from '@/components/bot-builder/FlowEditor';
import { ArrowLeft, Home, Plus } from 'lucide-react';

export default function TestBuilderPage() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      <div className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Тестирование конструктора ботов</h1>
              <p className="text-gray-300 text-sm mt-1">
                Перетаскивайте блоки из левой панели в рабочую область
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <a 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 rounded-lg hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <Home className="h-4 w-4" />
              Главная
            </a>
            <a 
              href="/dashboard/bots" 
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-lg hover:bg-indigo-500/30 hover:text-indigo-200 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              К дашборду
            </a>
            <a 
              href="/dashboard/bots/new" 
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 font-semibold"
            >
              <Plus className="h-4 w-4" />
              Создать бота
            </a>
          </div>
        </div>
      </div>
      
      <div className="h-[calc(100vh-80px)]">
        <FlowEditor />
      </div>
    </div>
  );
}