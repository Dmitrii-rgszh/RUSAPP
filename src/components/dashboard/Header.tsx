"use client";

import { Bell, Search, Settings } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Left side - Title */}
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-white">BotCraft Dashboard</h2>
        </div>
        
        {/* Right side - Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск..."
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all w-64"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Settings */}
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          
          {/* Profile */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">👤</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-white">Тестовый пользователь</div>
              <div className="text-xs text-gray-400">test@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}