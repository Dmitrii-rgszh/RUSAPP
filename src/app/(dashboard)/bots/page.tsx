'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Bot {
  id: string;
  name: string;
  description: string;
  platform: 'telegram' | 'whatsapp' | 'vk';
  isActive: boolean;
  stats: {
    messages: number;
    users: number;
    conversion: number;
  };
  lastActive: string;
}

export default function BotsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const bots: Bot[] = [
    {
      id: '1',
      name: 'Поддержка 24/7',
      description: 'Автоматический бот для обработки вопросов клиентов',
      platform: 'telegram',
      isActive: true,
      stats: {
        messages: 523,
        users: 89,
        conversion: 92
      },
      lastActive: '2 минуты назад'
    },
    {
      id: '2',
      name: 'Продажи Bot',
      description: 'Помогает клиентам выбрать и купить товары',
      platform: 'whatsapp',
      isActive: true,
      stats: {
        messages: 341,
        users: 56,
        conversion: 78
      },
      lastActive: '15 минут назад'
    },
    {
      id: '3',
      name: 'HR Assistant',
      description: 'Отвечает на вопросы кандидатов и сотрудников',
      platform: 'vk',
      isActive: false,
      stats: {
        messages: 156,
        users: 34,
        conversion: 85
      },
      lastActive: '3 часа назад'
    }
  ];

  const platformConfig = {
    telegram: {
      name: 'Telegram',
      icon: '✈️',
      color: {
        bg: 'rgba(34, 158, 217, 0.2)',
        text: '#229ed9',
        border: 'rgba(34, 158, 217, 0.3)'
      }
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: '💬',
      color: {
        bg: 'rgba(37, 211, 102, 0.2)',
        text: '#25d366',
        border: 'rgba(37, 211, 102, 0.3)'
      }
    },
    vk: {
      name: 'VKontakte',
      icon: '📱',
      color: {
        bg: 'rgba(0, 119, 255, 0.2)',
        text: '#0077ff',
        border: 'rgba(0, 119, 255, 0.3)'
      }
    }
  };

  const filteredBots = bots.filter(bot => {
    if (filter !== 'all' && bot.platform !== filter) return false;
    if (searchQuery && !bot.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Мои боты</h1>
          <p className="text-gray-400">Управляйте своими ботами и сценариями</p>
        </div>
        <Link href="/bots/create" className="btn-gradient flex items-center gap-2">
          <span>+</span>
          Создать бота
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'telegram', 'whatsapp', 'vk'].map((platform) => (
            <button
              key={platform}
              onClick={() => setFilter(platform)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === platform
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:text-white hover:bg-gray-800/70'
              }`}
            >
              {platform === 'all' ? 'Все платформы' : platformConfig[platform as keyof typeof platformConfig]?.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBots.map((bot) => {
          const platform = platformConfig[bot.platform];
          
          return (
            <div key={bot.id} className="card-glass group hover:scale-[1.02] transition-all duration-200">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">{bot.name}</h3>
                    <div className={`w-2 h-2 rounded-full ${bot.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: platform.color.bg,
                        color: platform.color.text,
                        border: `1px solid ${platform.color.border}`
                      }}
                    >
                      {platform.icon} {platform.name}
                    </span>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded transition-colors">
                  ⋮
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {bot.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{bot.stats.messages}</div>
                  <div className="text-xs text-gray-500">Сообщений</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{bot.stats.users}</div>
                  <div className="text-xs text-gray-500">Пользователей</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">{bot.stats.conversion}%</div>
                  <div className="text-xs text-gray-500">Конверсия</div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                <span className="text-xs text-gray-500">
                  Активен: {bot.lastActive}
                </span>
                <div className="flex gap-2">
                  <Link 
                    href={`/bots/${bot.id}/edit`}
                    className="px-3 py-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Редактировать
                  </Link>
                  <Link 
                    href={`/bots/${bot.id}/analytics`}
                    className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    Аналитика
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Create New Bot Card */}
        <Link 
          href="/bots/create" 
          className="card-glass min-h-[300px] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-600 hover:border-gray-500 hover:bg-gray-800/30 transition-all group cursor-pointer"
        >
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            +
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">
              Создать нового бота
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Начните с шаблона или с нуля
            </p>
          </div>
        </Link>
      </div>

      {/* Empty State */}
      {filteredBots.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-xl font-medium text-gray-300 mb-2">
            Боты не найдены
          </h3>
          <p className="text-gray-500">
            Попробуйте изменить фильтры или создайте нового бота
          </p>
        </div>
      )}
    </div>
  );
}
