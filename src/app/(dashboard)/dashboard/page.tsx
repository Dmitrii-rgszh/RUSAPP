'use client';

import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    { 
      id: 1, 
      icon: '🤖', 
      value: '2', 
      label: 'Активных ботов', 
      change: '+2',
      color: 'from-blue-500 to-indigo-600',
      changeColor: 'text-green-400'
    },
    { 
      id: 2, 
      icon: '💬', 
      value: '1,250', 
      label: 'Сообщений всего', 
      change: '+12%',
      color: 'from-green-500 to-emerald-600',
      changeColor: 'text-green-400'
    },
    { 
      id: 3, 
      icon: '👥', 
      value: '45', 
      label: 'Контактов', 
      change: '+8%',
      color: 'from-purple-500 to-pink-600',
      changeColor: 'text-green-400'
    },
    { 
      id: 4, 
      icon: '📈', 
      value: '3', 
      label: 'Всего ботов', 
      change: '-',
      color: 'from-orange-500 to-red-600',
      changeColor: 'text-gray-400'
    }
  ];

  const recentActivity = [
    { id: 1, user: 'Иван Петров', action: 'Начал диалог', bot: 'Поддержка 24/7', time: '5 мин назад', avatar: '👨‍💼' },
    { id: 2, user: 'Мария Смирнова', action: 'Завершила покупку', bot: 'Продажи Bot', time: '12 мин назад', avatar: '👩‍💼' },
    { id: 3, user: 'Алексей Козлов', action: 'Оставил отзыв', bot: 'Отзывы Bot', time: '1 час назад', avatar: '👤' },
  ];

  const botPerformance = [
    { id: 1, name: 'Поддержка 24/7', messages: 523, conversion: 92, trend: '↗️' },
    { id: 2, name: 'Продажи Bot', messages: 341, conversion: 78, trend: '↗️' },
    { id: 3, name: 'HR Assistant', messages: 156, conversion: 85, trend: '➡️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Добро пожаловать в BotCraft! 👋
            </h1>
            <p className="text-gray-300 text-lg">
              Управляйте своими ботами и анализируйте их эффективность
            </p>
          </div>
          <Link 
            href="/dashboard/bots/new" 
            className="btn-gradient flex items-center gap-3 px-6 py-3 text-lg font-semibold"
          >
            <span>🚀</span>
            Создать бота
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className="card-glass group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                {stat.change !== '-' && (
                  <div className={`text-sm font-bold ${stat.changeColor} bg-white/10 px-2 py-1 rounded-lg`}>
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="card-glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white">Последняя активность</h3>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center">
                      <span className="text-lg">{activity.avatar}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{activity.user}</div>
                      <div className="text-xs text-gray-400">{activity.action} • {activity.bot}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded-lg">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bot Performance */}
          <div className="card-glass">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white">Производительность ботов</h3>
            </div>
            <div className="space-y-4">
              {botPerformance.map((bot) => (
                <div key={bot.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-lg">🤖</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{bot.name}</div>
                      <div className="text-xs text-gray-400">{bot.messages} сообщений</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{bot.trend}</span>
                    <div className="text-lg font-bold text-green-400">{bot.conversion}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card-glass">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <span className="text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white">Быстрые действия</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/test-builder"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 group hover:scale-105"
            >
              <div className="text-3xl mb-4">🔧</div>
              <div className="font-bold text-white group-hover:text-indigo-300 mb-2">Тест конструктора</div>
              <div className="text-sm text-gray-400">Попробовать визуальный редактор</div>
            </Link>
            
            <Link 
              href="/dashboard/bots"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 group hover:scale-105"
            >
              <div className="text-3xl mb-4">🤖</div>
              <div className="font-bold text-white group-hover:text-indigo-300 mb-2">Мои боты</div>
              <div className="text-sm text-gray-400">Управление всеми ботами</div>
            </Link>
            
            <Link 
              href="/test"
              className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-200 group hover:scale-105"
            >
              <div className="text-3xl mb-4">🏠</div>
              <div className="font-bold text-white group-hover:text-indigo-300 mb-2">Навигация</div>
              <div className="text-sm text-gray-400">Все тестовые страницы</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
