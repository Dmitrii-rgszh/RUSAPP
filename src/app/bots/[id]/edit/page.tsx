"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FlowEditor } from '@/components/bot-builder/FlowEditor';
import { ArrowLeft, Save, Play, Share, Eye } from 'lucide-react';

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
    <div className="h-screen flex flex-col">
      {/* Шапка редактора */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/bots"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {botData.name}
              </h1>
              <p className="text-sm text-gray-600">{botData.description}</p>
            </div>
            
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full border border-blue-200">
              {botData.platform}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleTest}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Eye className="h-4 w-4" />
              Тест
            </button>
            
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </button>
            
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Play className="h-4 w-4" />
              Запустить
            </button>
          </div>
        </div>
      </div>
      
      {/* Редактор ботов */}
      <div className="flex-1">
        <FlowEditor />
      </div>
    </div>
  );
}