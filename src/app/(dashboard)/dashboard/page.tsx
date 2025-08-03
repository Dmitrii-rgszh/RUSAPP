'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { useUserStats } from '@/hooks/useUserStats';

export default function DashboardPage() {
  const { user } = useUser();
  const { stats: userStats, isLoading } = useUserStats();

  const stats = [
    { 
      id: 1, 
      icon: '🤖', 
      value: userStats?.bots.active.toString() || '0', 
      label: 'Активных ботов', 
      change: '+2', 
      changeType: 'positive' as const
    },
    { 
      id: 2, 
      icon: '💬', 
      value: userStats?.messages.toString() || '0', 
      label: 'Сообщений всего', 
      change: '+12%', 
      changeType: 'positive' as const
    },
    { 
      id: 3, 
      icon: '👥', 
      value: userStats?.contacts.toString() || '0', 
      label: 'Контактов', 
      change: '+8%', 
      changeType: 'positive' as const
    },
    { 
      id: 4, 
      icon: '📈', 
      value: userStats?.bots.total.toString() || '0', 
      label: 'Всего ботов', 
      change: '-', 
      changeType: 'neutral' as const
    }
  ];

  const recentActivity = [
    { id: 1, user: 'Иван Петров', action: 'Начал диалог', bot: 'Поддержка 24/7', time: '5 мин назад' },
    { id: 2, user: 'Мария Смирнова', action: 'Завершила покупку', bot: 'Продажи Bot', time: '12 мин назад' },
    { id: 3, user: 'Алексей Козлов', action: 'Оставил отзыв', bot: 'Отзывы Bot', time: '1 час назад' },
  ];

  const botPerformance = [
    { id: 1, name: 'Поддержка 24/7', messages: 523, conversion: 92 },
    { id: 2, name: 'Продажи Bot', messages: 341, conversion: 78 },
    { id: 3, name: 'HR Assistant', messages: 156, conversion: 85 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Добро пожаловать{user?.name ? `, ${user.name}` : ' в BotCraft'}!
          </h1>
          <p className="text-gray-400">
            Управляйте своими ботами и анализируйте их эффективность
          </p>
        </div>
        <Link href="/bots/create" className="btn-gradient flex items-center gap-2">
          <span>🚀</span>
          Создать бота
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          // Skeleton loading
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-glass animate-pulse">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
                  <div className="w-12 h-4 bg-gray-700 rounded"></div>
                </div>
                <div className="h-8 bg-gray-700 rounded w-20 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-24"></div>
              </div>
            ))}
          </>
        ) : (
          stats.map((stat) => (
            <div key={stat.id} className="card-glass group hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-center mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 
                  stat.changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 card-glass">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Последняя активность</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Все события →
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-400">{activity.action} • {activity.bot}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bot Performance */}
        <div className="card-glass">
          <h2 className="text-xl font-semibold text-white mb-6">Эффективность ботов</h2>
          
          <div className="space-y-4">
            {botPerformance.map((bot) => (
              <div key={bot.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-300">{bot.name}</span>
                  <span className="text-xs text-gray-500">{bot.messages} сообщений</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${bot.conversion}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Конверсия</span>
                  <span className="text-xs font-medium text-green-400">{bot.conversion}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 px-4 py-2 text-sm font-medium text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors">
            Подробная аналитика
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-gradient-border">
        <h2 className="text-lg font-semibold text-white mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
            <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">📝</span>
            <span className="text-sm text-gray-300">Создать сценарий</span>
          </button>
          <button className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
            <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">📊</span>
            <span className="text-sm text-gray-300">Экспорт данных</span>
          </button>
          <button className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
            <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">🔔</span>
            <span className="text-sm text-gray-300">Настроить алерты</span>
          </button>
          <button className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors group">
            <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">🎯</span>
            <span className="text-sm text-gray-300">A/B тестирование</span>
          </button>
        </div>
      </div>
    </div>
  );
}
