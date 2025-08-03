"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FlowEditor } from '@/components/bot-builder/FlowEditor';
import { ArrowLeft, Save, Play, Share, Eye, Settings } from 'lucide-react';

export default function BotEditPage() {
  const params = useParams();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  // Мокапные данные бота
  const botId = params.id as string;
  const [botData] = useState({
    id: botId,
    name: 'Бот поддержки',
    description: 'Автоматическая поддержка клиентов',
    platform: 'TELEGRAM'
  });

  const handleSave = async () => {
    setIsSaving(true);
    
    // Здесь будет логика сохранения
    setTimeout(() => {
      setIsSaving(false);
      // Показать уведомление об успешном сохранении
    }, 1000);
  };

  const handleTest = () => {
    // Логика тестирования бота
    console.log('Тестирование бота...');
  };

  const handlePublish = () => {
    // Логика публикации бота
    console.log('Публикация бота...');
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900">
      {/* Шапка редактора */}
      <div className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/bots"
              className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Settings className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {botData.name}
                </h1>
                <p className="text-sm text-gray-400">{botData.description}</p>
              </div>
            </div>
            
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30 font-semibold">
              {botData.platform}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleTest}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 rounded-lg hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
              Тест
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-lg hover:bg-indigo-500/30 hover:text-indigo-200 transition-all duration-200 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
            
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 font-semibold"
            >
              <Play className="h-4 w-4" />
              Запустить
            </button>
          </div>
        </div>
      </div>
      
      {/* Редактор ботов */}
      <div className="flex-1 relative">
        {/* Добавляем wrapper для стилизации редактора */}
        <div className="absolute inset-0">
          <FlowEditor />
        </div>
      </div>
      
      {/* Статус бар (опционально) */}
      <div className="bg-gray-800/30 backdrop-blur-sm border-t border-gray-700/50 px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-400">
            <span>Узлов: 3</span>
            <span>Соединений: 2</span>
            <span>Последнее сохранение: только что</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Автосохранение включено</span>
          </div>
        </div>
      </div>
    </div>
  );
}
