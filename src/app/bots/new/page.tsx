"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bot, MessageCircle, Phone, Globe, Zap } from 'lucide-react';

const platforms = [
  {
    id: 'TELEGRAM',
    name: 'Telegram',
    icon: MessageCircle,
    description: 'Самый популярный мессенджер в России',
    color: 'bg-blue-500',
    features: ['Inline кнопки', 'Файлы до 2ГБ', 'Группы и каналы']
  },
  {
    id: 'WHATSAPP',
    name: 'WhatsApp',
    icon: Phone,
    description: 'Мировой лидер среди мессенджеров',
    color: 'bg-green-500',
    features: ['Бизнес API', 'Шаблоны сообщений', 'Медиа контент']
  },
  {
    id: 'VK',
    name: 'ВКонтакте',
    icon: MessageCircle,
    description: 'Популярная соцсеть в России',
    color: 'bg-indigo-500',
    features: ['Сообщества', 'Клавиатуры', 'Стикеры']
  },
  {
    id: 'WEBCHAT',
    name: 'Веб-чат',
    icon: Globe,
    description: 'Виджет для вашего сайта',
    color: 'bg-gray-500',
    features: ['Встройка в сайт', 'Кастомизация', 'Аналитика']
  }
];

export default function NewBotPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    platform: 'TELEGRAM'
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Введите название бота');
      return;
    }

    setIsCreating(true);

    try {
      // В реальном приложении здесь будет API запрос
      const mockBotId = 'cmdw352t60002evkc2m6caau';
      
      // Имитация создания бота
      setTimeout(() => {
        router.push(`/bots/${mockBotId}/edit`);
      }, 1000);
      
    } catch (error) {
      console.error('Ошибка создания бота:', error);
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Шапка */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/bots"
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Создать нового бота</h1>
            <p className="text-gray-600 mt-1">Настройте основные параметры и выберите платформу</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Основная информация */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Основная информация</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название бота *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Например: Бот поддержки"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  placeholder="Краткое описание назначения бота"
                />
              </div>
            </div>
          </div>

          {/* Выбор платформы */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Выберите платформу</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.platform === platform.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, platform: platform.id})}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${platform.color} text-white`}>
                      <platform.icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{platform.description}</p>
                      
                      <div className="space-y-1">
                        {platform.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-1 text-xs text-gray-500">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData.platform === platform.id
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.platform === platform.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex justify-end gap-4">
            <Link
              href="/bots"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </Link>
            
            <button
              type="submit"
              disabled={isCreating}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Создание...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4" />
                  Создать бота
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}