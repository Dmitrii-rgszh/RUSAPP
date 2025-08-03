'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createBotSchema = z.object({
  name: z.string().min(2, 'Название должно содержать минимум 2 символа'),
  description: z.string().optional(),
  platform: z.enum(['telegram', 'whatsapp', 'vk', 'webchat']),
});

type CreateBotForm = z.infer<typeof createBotSchema>;

export default function CreateBotPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<CreateBotForm>({
    resolver: zodResolver(createBotSchema),
    defaultValues: {
      platform: 'telegram'
    }
  });

  const selectedPlatform = watch('platform');

  const platforms = [
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '✈️',
      description: 'Самая популярная платформа для ботов',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '💬',
      description: 'Мессенджер для бизнеса',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'vk',
      name: 'VKontakte',
      icon: '📱',
      description: 'Социальная сеть №1 в России',
      color: 'from-blue-600 to-blue-700'
    },
    {
      id: 'webchat',
      name: 'Web Chat',
      icon: '🌐',
      description: 'Виджет для вашего сайта',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const templates = [
    { id: 1, name: 'Бот поддержки', icon: '🆘', description: 'Отвечает на часто задаваемые вопросы' },
    { id: 2, name: 'Бот продаж', icon: '🛒', description: 'Помогает клиентам выбрать товар' },
    { id: 3, name: 'HR-бот', icon: '👔', description: 'Проводит первичные собеседования' },
    { id: 4, name: 'Образовательный бот', icon: '🎓', description: 'Обучает и тестирует знания' },
  ];

  const onSubmit = async (data: CreateBotForm) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/bots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Ошибка создания бота');
      }

      const bot = await response.json();
      router.push(`/bots/${bot.id}/edit`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/bots" 
          className="text-gray-400 hover:text-white transition-colors mb-4 inline-flex items-center gap-2"
        >
          ← Назад к ботам
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Создание нового бота</h1>
        <p className="text-gray-400">Выберите платформу и настройте базовые параметры</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Platform Selection */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Выберите платформу</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <label
                key={platform.id}
                className={`
                  relative cursor-pointer rounded-xl p-6 transition-all
                  ${selectedPlatform === platform.id 
                    ? 'bg-gradient-to-br ' + platform.color + ' text-white shadow-lg scale-105' 
                    : 'card-glass hover:scale-105'
                  }
                `}
              >
                <input
                  type="radio"
                  {...register('platform')}
                  value={platform.id}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-4xl mb-3">{platform.icon}</div>
                  <h3 className="font-semibold mb-1">{platform.name}</h3>
                  <p className={`text-sm ${selectedPlatform === platform.id ? 'text-white/90' : 'text-gray-400'}`}>
                    {platform.description}
                  </p>
                </div>
                {selectedPlatform === platform.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-green-500">✓</span>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Bot Details */}
        <div className="card-glass space-y-6">
          <h2 className="text-xl font-semibold text-white">Основная информация</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Название бота
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="Например: Помощник по продажам"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Описание (опционально)
            </label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Опишите, что будет делать ваш бот..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Начать с шаблона (опционально)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="card-glass hover:scale-105 transition-all cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{template.icon}</div>
                  <h3 className="font-medium text-white mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-400">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-700">
          <Link
            href="/bots"
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
          >
            Отмена
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gradient px-8 py-3 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Создание...' : 'Создать бота'}
          </button>
        </div>
      </form>
    </div>
  );
}