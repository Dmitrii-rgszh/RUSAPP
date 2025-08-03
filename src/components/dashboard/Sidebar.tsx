'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Bot, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle, 
  BarChart3,
  Zap,
  Crown,
  ChevronRight
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const mainNavigation = [
    { id: 'dashboard', name: 'Главная', icon: Home, href: '/dashboard', badge: null },
    { id: 'bots', name: 'Боты', icon: Bot, href: '/bots', badge: 5 },
    { id: 'analytics', name: 'Аналитика', icon: BarChart3, href: '/analytics', badge: null },
    { id: 'contacts', name: 'Контакты', icon: Users, href: '/contacts', badge: null },
    { id: 'templates', name: 'Шаблоны', icon: FileText, href: '/templates', badge: null },
    { id: 'integrations', name: 'Интеграции', icon: Zap, href: '/integrations', badge: null },
  ];

  const secondaryNavigation = [
    { id: 'settings', name: 'Настройки', icon: Settings, href: '/settings' },
    { id: 'help', name: 'Помощь', icon: HelpCircle, href: '/help' },
  ];

  const planData = {
    name: 'Старт',
    bots: { used: 3, total: 5 },
    messages: { used: 2340, total: 5000 }
  };

  return (
    <div className="w-64 h-screen bg-gray-900/95 backdrop-blur-md border-r border-gray-700/50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700/50">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-gray-900"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              BotCraft
            </h1>
            <p className="text-xs text-gray-500">v2.1.0</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 shadow-lg' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 transition-colors ${
                  isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'
                }`} />
                <span className="flex-1 text-left">{item.name}</span>
                
                {/* Badge */}
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
                
                {/* Active Indicator */}
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-blue-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700/50"></div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 transition-colors ${
                  isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'
                }`} />
                <span className="flex-1 text-left">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Plan Information */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            {/* Plan Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">{planData.name}</span>
              </div>
              <span className="text-xs text-emerald-400 font-medium">АКТИВЕН</span>
            </div>

            {/* Usage Bars */}
            <div className="space-y-3">
              {/* Bots Usage */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Боты</span>
                  <span className="text-emerald-400 font-medium">
                    {planData.bots.used}/{planData.bots.total}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 relative"
                    style={{ width: `${(planData.bots.used / planData.bots.total) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Messages Usage */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Сообщения</span>
                  <span className="text-blue-400 font-medium">
                    {planData.messages.used.toLocaleString()}/{planData.messages.total.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500 relative"
                    style={{ width: `${(planData.messages.used / planData.messages.total) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upgrade Button */}
            <button className="w-full mt-4 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95">
              <div className="flex items-center justify-center space-x-2">
                <Crown className="h-4 w-4" />
                <span>Улучшить план</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
