"use client";

import { useState, useEffect } from 'react';

export interface Bot {
  id: string;
  name: string;
  description: string;
  platform: 'TELEGRAM' | 'WHATSAPP' | 'VK' | 'WEBCHAT';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  messagesCount: number;
  usersCount: number;
}

// Мокапные данные для тестирования
const mockBots: Bot[] = [
  {
    id: 'cmdw352t60002evkc2m6caau',
    name: 'Бот поддержки',
    description: 'Автоматическая поддержка клиентов 24/7',
    platform: 'TELEGRAM',
    isActive: true,
    createdAt: '2025-01-15',
    updatedAt: '2025-01-16',
    messagesCount: 1250,
    usersCount: 342
  },
  {
    id: 'bot2',
    name: 'Бот продаж',
    description: 'Помощь в выборе и покупке товаров',
    platform: 'WHATSAPP',
    isActive: false,
    createdAt: '2025-01-10',
    updatedAt: '2025-01-12',
    messagesCount: 834,
    usersCount: 156
  },
  {
    id: 'bot3',
    name: 'HR Assistant',
    description: 'Автоматизация HR процессов',
    platform: 'VK',
    isActive: true,
    createdAt: '2025-01-08',
    updatedAt: '2025-01-15',
    messagesCount: 567,
    usersCount: 89
  }
];

export function useBots() {
  const [bots, setBots] = useState<Bot[]>(mockBots);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setIsLoading(true);
    try {
      // В реальном приложении здесь будет API запрос
      await new Promise(resolve => setTimeout(resolve, 500));
      setBots(mockBots);
    } catch (err) {
      setError('Ошибка загрузки ботов');
    } finally {
      setIsLoading(false);
    }
  };

  const updateBot = async (id: string, updates: Partial<Bot>) => {
    setBots(prevBots => 
      prevBots.map(bot => 
        bot.id === id ? { ...bot, ...updates } : bot
      )
    );
  };

  const deleteBot = async (id: string) => {
    setBots(prevBots => prevBots.filter(bot => bot.id !== id));
  };

  return {
    bots,
    isLoading,
    error,
    refetch,
    updateBot,
    deleteBot
  };
}