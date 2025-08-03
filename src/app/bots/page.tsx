"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Bot, Settings, BarChart3, Play, Pause } from 'lucide-react';

// Мокапные данные для тестирования
const mockBots = [
  {
    id: 'cmdw352t60002evkc2m6caau',
    name: 'Бот поддержки',
    description: 'Автоматическая поддержка клиентов',
    platform: 'TELEGRAM',
    isActive: true,
    createdAt: '2025-01-15',
    messagesCount: 1250
  },
  {
    id: 'bot2',
    name: 'Бот продаж',
    description: 'Помощь в выборе товаров',
    platform: 'WHATSAPP', 
    isActive: false,
    createdAt: '2025-01-10',
    messagesCount: 834
  }
];

export default function BotsPage() {
  const [bots] = useState(mockBots);

  const platformColors = {
    TELEGRAM: 'bg-blue-100 text-blue-800 border-blue-200',
    WHATSAPP: 'bg-green-100 text-green-800 border-green-200',
    VK: 'bg-purple-100 text-purple-800 border-purple-200',
    WEBCHAT: 'bg-gray-100 text-gray-800 border-gray-200'
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Мои боты</h1>
          <p className="text-gray-600 mt-1">Управляйте своими чат-ботами</p>
        </div>
        
        <Link 
          href="/bots/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Создать бота
        </Link>
      </div>

      <div className="grid gap-4">
        {bots.map((bot) => (
          <div key={bot.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Bot className="h-6 w-6 text-indigo-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{bot.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs border ${
                      platformColors[bot.platform as keyof typeof platformColors]
                    }`}>
                      {bot.platform}
                    </span>
                    <div className="flex items-center gap-1">
                      {bot.isActive ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600">Активен</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span className="text-xs text-gray-500">Остановлен</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{bot.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Создан: {bot.createdAt}</span>
                    <span>Сообщений: {bot.messagesCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-lg transition-colors ${
                  bot.isActive 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}>
                  {bot.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                
                <Link 
                  href={`/bots/${bot.id}/analytics`}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                </Link>
                
                <Link 
                  href={`/bots/${bot.id}/edit`}
                  className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {bots.length === 0 && (
        <div className="text-center py-12">
          <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет ботов</h3>
          <p className="text-gray-600 mb-6">Создайте своего первого бота для автоматизации общения</p>
          <Link 
            href="/bots/new"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:bg-indigo-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Создать первого бота
          </Link>
        </div>
      )}
    </div>
  );
}