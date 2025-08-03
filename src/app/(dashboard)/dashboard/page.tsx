import React from 'react';
import { Bot, MessageSquare, Users, TrendingUp, Activity, Plus, ArrowUpRight, BarChart3, Clock } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { 
      name: "Активные боты", 
      value: "52", 
      icon: Bot, 
      change: "+12", 
      changeType: "positive",
      description: "За последний месяц"
    },
    { 
      name: "Сообщений сегодня", 
      value: "1,234", 
      icon: MessageSquare, 
      change: "+12%", 
      changeType: "positive",
      description: "По сравнению с вчера"
    },
    { 
      name: "Пользователи", 
      value: "342", 
      icon: Users, 
      change: "+8%", 
      changeType: "positive",
      description: "Новых за неделю"
    },
    { 
      name: "Успешность", 
      value: "89%", 
      icon: TrendingUp, 
      change: "+3%", 
      changeType: "positive",
      description: "Средняя по всем ботам"
    },
  ];

  const recentActivity = [
    {
      id: 1,
      botName: "Бот поддержки",
      action: "Новое сообщение от пользователя",
      time: "2 мин назад",
      platform: "Telegram",
      status: "active"
    },
    {
      id: 2,
      botName: "Бот продаж",
      action: "Завершена воронка продаж",
      time: "5 мин назад",
      platform: "WhatsApp",
      status: "success"
    },
    {
      id: 3,
      botName: "HR бот",
      action: "Новый кандидат зарегистрирован",
      time: "10 мин назад",
      platform: "VK",
      status: "info"
    },
    {
      id: 4,
      botName: "Бот заказов",
      action: "Получен новый заказ #1547",
      time: "15 мин назад",
      platform: "Telegram",
      status: "success"
    }
  ];

  const quickActions = [
    { icon: Plus, label: "Создать нового бота", href: "/bots/new" },
    { icon: BarChart3, label: "Посмотреть аналитику", href: "/analytics" },
    { icon: Activity, label: "Мониторинг системы", href: "/monitoring" },
  ];

  const topBots = [
    { name: "Бот поддержки", messages: 456, users: 89, platform: "Telegram" },
    { name: "Бот продаж", messages: 312, users: 67, platform: "WhatsApp" },
    { name: "HR бот", messages: 189, users: 34, platform: "VK" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-2">
          Добро пожаловать в BotCraft!
        </h1>
        <p className="text-gray-400">Ваша панель управления ботами</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    stat.changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {stat.change}
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-300">{stat.name}</div>
                </div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-xl blur opacity-20"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Последняя активность</h2>
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-700/30 transition-colors duration-200">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'active' ? 'bg-blue-400' :
                      activity.status === 'success' ? 'bg-emerald-400' : 'bg-yellow-400'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white truncate">
                          {activity.botName}
                        </p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          activity.platform === 'Telegram' ? 'bg-blue-900/50 text-blue-300' :
                          activity.platform === 'WhatsApp' ? 'bg-emerald-900/50 text-emerald-300' :
                          'bg-purple-900/50 text-purple-300'
                        }`}>
                          {activity.platform}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur opacity-20"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Быстрые действия</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className="w-full flex items-center p-3 rounded-lg bg-gray-700/30 hover:bg-gray-600/40 border border-gray-600/50 hover:border-gray-500/50 transition-all duration-200 group"
                    >
                      <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mr-3">
                        <Icon className="h-4 w-4 text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Top Bots */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20"></div>
            <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Топ ботов</h2>
              <div className="space-y-4">
                {topBots.map((bot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30">
                    <div>
                      <p className="text-sm font-medium text-white">{bot.name}</p>
                      <p className="text-xs text-gray-400">{bot.platform}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-400">{bot.messages}</p>
                      <p className="text-xs text-gray-500">{bot.users} польз.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
