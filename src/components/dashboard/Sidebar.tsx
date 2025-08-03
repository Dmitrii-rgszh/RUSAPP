'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

export default function Sidebar() {
  const pathname = usePathname();

  const mainNavigation: NavItem[] = [
    { id: 'dashboard', name: 'Главная', href: '/dashboard', icon: '🏠' },
    { id: 'bots', name: 'Мои боты', href: '/bots', icon: '🤖', badge: '3' },
    { id: 'analytics', name: 'Аналитика', href: '/analytics', icon: '📊' },
    { id: 'templates', name: 'Шаблоны', href: '/templates', icon: '📋', badge: 'New' },
  ];

  const secondaryNavigation: NavItem[] = [
    { id: 'integrations', name: 'Интеграции', href: '/integrations', icon: '🔌' },
    { id: 'team', name: 'Команда', href: '/team', icon: '👥' },
    { id: 'settings', name: 'Настройки', href: '/settings', icon: '⚙️' },
  ];

  const planData = {
    name: 'Pro Plan',
    usage: {
      current: 12,
      limit: 50,
      percentage: 24
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-800/90 backdrop-blur-xl border-r border-gray-700/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700/50">
        <Link href="/dashboard" className="block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-purple-500/20">
              🤖
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold gradient-text">
                BotCraft
              </h1>
              <p className="text-xs text-gray-500">v2.1.0</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-2">
        {/* Main Navigation */}
        <div className="flex flex-col gap-1">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }
                `}
              >
                <span className={`mr-3 text-base ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                
                {/* Badge */}
                {item.badge && (
                  <span className={`
                    inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold
                    ${item.badge === 'New' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }
                    text-white rounded-full
                  `}>
                    {item.badge}
                  </span>
                )}
                
                {/* Active Indicator */}
                {isActive && (
                  <span className="ml-2 text-blue-400 text-xs">▶</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700/50"></div>

        {/* Secondary Navigation */}
        <div className="flex flex-col gap-1">
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center px-3 py-2.5 text-sm font-medium rounded-lg
                  transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }
                `}
              >
                <span className={`mr-3 text-base ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Plan Information */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg opacity-20 blur"></div>
          
          <div className="relative glass p-4 rounded-lg">
            {/* Plan Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base text-yellow-400">👑</span>
                <span className="text-sm font-medium text-white">{planData.name}</span>
              </div>
              <span className="text-xs text-green-400 font-medium">Активен</span>
            </div>

            {/* Usage Info */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Использовано ботов</span>
                <span className="text-gray-300 font-medium">
                  {planData.usage.current}/{planData.usage.limit}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${planData.usage.percentage}%` }}
                />
              </div>
            </div>

            {/* Upgrade Button */}
            <button className="w-full mt-3 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-md hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
              Улучшить план →
            </button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-gray-400 truncate">john@example.com</p>
          </div>
          <span className="text-gray-400 text-sm">⚙️</span>
        </div>
      </div>
    </aside>
  );
}
