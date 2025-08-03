'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Play, 
  Pause, 
  Edit3, 
  BarChart3, 
  Users,
  MessageSquare,
  Zap,
  Clock
} from 'lucide-react';

export default function BotsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const bots = [
    {
      id: 1,
      name: 'Бот поддержки',
      description: 'Автоматическая поддержка клиентов 24/7',
      platform: 'TELEGRAM',
      isActive: true,
      users: 234,
      messages: 1547,
      successRate: 89,
      createdAt: '15.01.2024',
      lastActivity: '2 мин назад',
      template: 'Поддержка клиентов'
    },
    {
      id: 2,
      name: 'Бот продаж',
      description: 'Воронка продаж и обработка заказов',
      platform: 'WHATSAPP',
      isActive: false,
      users: 156,
      messages: 892,
      successRate: 76,
      createdAt: '10.01.2024',
      lastActivity: '1 час назад',
      template: 'Продажи'
    },
    {
      id: 3,
      name: 'HR бот',
      description: 'Подбор кандидатов и собеседования',
      platform: 'VK',
      isActive: true,
      users: 67,
      messages: 234,
      successRate: 94,
      createdAt: '08.01.2024',
      lastActivity: '15 мин назад',
      template: 'HR и рекрутинг'
    },
    {
      id: 4,
      name: 'Бот заказов',
      description: 'Прием заказов и оплата',
      platform: 'TELEGRAM',
      isActive: true,
      users: 189,
      messages: 567,
      successRate: 82,
      createdAt: '05.01.2024',
      lastActivity: '5 мин назад',
      template: 'Ресторан'
    }
  ];

  const platformConfig = {
    TELEGRAM: { 
      name: 'Telegram', 
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      icon: '📱'
    },
    WHATSAPP: { 
      name: 'WhatsApp', 
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      icon: '📞'
    },
    VK: { 
      name: 'ВКонтакте', 
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      icon: '🌐'
    }
  };

  const filteredBots = bots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || bot.platform === filterPlatform;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && bot.isActive) || 
      (filterStatus === 'inactive' && !bot.isActive);
    
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Мои боты
          </h1>
          <p className="text-gray-400">Управляйте своими ботами и отслеживайте их эффективность</p>
        </div>
        
        <Link
          href="/bots/new"
          className="group relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95">
            <Plus className="h-5 w-5 mr-2" />
            Создать бота
          </div>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl blur opacity-20"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск ботов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                />
              </div>

              {/* Platform Filter */}
              <div className="relative">
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  className="appearance-none bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="all">Все платформы</option>
                  <option value="TELEGRAM">Telegram</option>
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="VK">ВКонтакте</option>
                </select>
                <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                >
                  <option value="all">Все статусы</option>
                  <option value="active">Активные</option>
                  <option value="inactive">Остановленные</option>
                </select>
                <Zap className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bots Grid */}
      {filteredBots.length === 0 ? (
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500/20 to-gray-400/20 rounded-xl blur opacity-20"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gray-600/20 to-gray-500/20 rounded-xl flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              {searchTerm || filterPlatform !== 'all' || filterStatus !== 'all' 
                ? 'Боты не найдены' 
                : 'У вас пока нет ботов'}
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || filterPlatform !== 'all' || filterStatus !== 'all'
                ? 'Попробуйте изменить фильтры поиска'
                : 'Начните с создания вашего первого бота'}
            </p>
            <Link
              href="/bots/new"
              className="group relative inline-block"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium">
                <Plus className="h-5 w-5 mr-2" />
                Создать бота
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBots.map((bot, index) => (
            <div
              key={bot.id}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                      <Bot className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{bot.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${platformConfig[bot.platform].color}`}>
                        {platformConfig[bot.platform].icon} {platformConfig[bot.platform].name}
                      </span>
                    </div>
                  </div>
                  <div className="relative group">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{bot.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">{bot.users}</div>
                    <div className="text-xs text-gray-400">Пользователи</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-emerald-400">{bot.messages}</div>
                    <div className="text-xs text-gray-400">Сообщения</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-purple-400">{bot.successRate}%</div>
                    <div className="text-xs text-gray-400">Успешность</div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${bot.isActive ? 'bg-emerald-400' : 'bg-gray-500'}`}></div>
                    <span className={`text-sm ${bot.isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
                      {bot.isActive ? 'Активен' : 'Остановлен'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{bot.lastActivity}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/bots/${bot.id}/edit`}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white text-sm font-medium rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-all duration-200"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Править
                  </Link>
                  <Link
                    href={`/bots/${bot.id}/analytics`}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white text-sm font-medium rounded-lg border border-gray-600/50 hover:border-gray-500/50 transition-all duration-200"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Статистика
                  </Link>
                  <button className={`p-2 rounded-lg border transition-all duration-200 ${
                    bot.isActive 
                      ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30' 
                      : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {bot.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
