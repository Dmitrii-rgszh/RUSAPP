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
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    features: ['Inline кнопки', 'Файлы до 2ГБ', 'Группы и каналы']
  },
  {
    id: 'WHATSAPP',
    name: 'WhatsApp',
    icon: Phone,
    description: 'Мировой лидер среди мессенджеров',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    features: ['Бизнес API', 'Шаблоны сообщений', 'Медиа контент']
  },
  {
    id: 'VK',
    name: 'ВКонтакте',
    icon: MessageCircle,
    description: 'Популярная соцсеть в России',
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    features: ['Сообщества', 'Клавиатуры', 'Стикеры']
  },
  {
    id: 'WEBCHAT',
    name: 'Веб-чат',
    icon: Globe,
    description: 'Виджет для вашего сайта',
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
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
        router.push(`/dashboard/bots/${mockBotId}/edit`);
      }, 1500);
      
    } catch (error) {
      console.error('Ошибка создания бота:', error);
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-6">
          <Link 
            href="/dashboard/bots"
            className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Создать нового бота</h1>
            <p className="text-gray-300 text-lg">Настройте основные параметры и выберите платформу</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Основная информация */}
          <div className="card-glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Bot className="h-6 w-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Основная информация</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Название бота *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all"
                  placeholder="Например: Бот поддержки"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 transition-all resize-none"
                  rows={4}
                  placeholder="Краткое описание назначения бота"
                />
              </div>
            </div>
          </div>

          {/* Выбор платформы */}
          <div className="card-glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Выберите платформу</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                    formData.platform === platform.id
                      ? `${platform.borderColor} bg-gradient-to-br ${platform.bgColor} shadow-lg scale-105`
                      : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 hover:scale-102'
                  }`}
                  onClick={() => setFormData({...formData, platform: platform.id})}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${platform.color} shadow-lg`}>
                      <platform.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                      <p className="text-sm text-gray-300 mb-4">{platform.description}</p>
                      
                      <div className="space-y-2">
                        {platform.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-gray-400">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      formData.platform === platform.id
                        ? 'border-indigo-400 bg-indigo-500'
                        : 'border-gray-500'
                    }`}>
                      {formData.platform === platform.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
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
              href="/dashboard/bots"
              className="px-8 py-4 bg-white/10 border border-white/20 text-gray-300 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-200 font-semibold"
            >
              Отмена
            </Link>
            
            <button
              type="submit"
              disabled={isCreating}
              className="btn-gradient px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 min-w-[200px] justify-center"
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Создание...
                </>
              ) : (
                <>
                  <Bot className="h-5 w-5" />
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