'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
      color: { bg: 'rgba(59, 130, 246, 0.2)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
      icon: '📱'
    },
    WHATSAPP: { 
      name: 'WhatsApp', 
      color: { bg: 'rgba(34, 197, 94, 0.2)', text: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' },
      icon: '📞'
    },
    VK: { 
      name: 'ВКонтакте', 
      color: { bg: 'rgba(139, 92, 246, 0.2)', text: '#a78bfa', border: 'rgba(139, 92, 246, 0.3)' },
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
    <div style={{ 
      padding: '24px',
      background: 'linear-gradient(135deg, #1f2937, #111827)',
      minHeight: '100vh',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px'
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #60a5fa, #a78bfa, #34d399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px'
          }}>
            Мои боты
          </h1>
          <p style={{ color: '#9ca3af' }}>
            Управляйте своими ботами и отслеживайте их эффективность
          </p>
        </div>
        
        <Link
          href="/bots/new"
          style={{
            position: 'relative',
            textDecoration: 'none'
          }}
        >
          <div style={{
            position: 'absolute',
            inset: '-2px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            borderRadius: '8px',
            opacity: 0.3,
            filter: 'blur(4px)'
          }}></div>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '12px 24px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            transition: 'all 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #8b5cf6)';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            <span style={{ marginRight: '8px', fontSize: '18px' }}>➕</span>
            Создать бота
          </div>
        </Link>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-2px',
            background: 'linear-gradient(to right, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))',
            borderRadius: '12px',
            opacity: 0.2,
            filter: 'blur(4px)'
          }}></div>
          <div style={{
            position: 'relative',
            background: 'rgba(55, 65, 81, 0.8)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(75, 85, 99, 0.5)',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Search */}
              <div style={{ position: 'relative', flex: 1 }}>
                <span style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '16px'
                }}>🔍</span>
                <input
                  type="text"
                  placeholder="Поиск ботов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    background: 'rgba(75, 85, 99, 0.5)',
                    border: '1px solid rgba(107, 114, 128, 0.5)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(107, 114, 128, 0.5)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                {/* Platform Filter */}
                <div style={{ position: 'relative' }}>
                  <select
                    value={filterPlatform}
                    onChange={(e) => setFilterPlatform(e.target.value)}
                    style={{
                      background: 'rgba(75, 85, 99, 0.5)',
                      border: '1px solid rgba(107, 114, 128, 0.5)',
                      borderRadius: '8px',
                      padding: '8px 32px 8px 16px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">Все платформы</option>
                    <option value="TELEGRAM">Telegram</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="VK">ВКонтакте</option>
                  </select>
                  <span style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#9ca3af'
                  }}>🔽</span>
                </div>

                {/* Status Filter */}
                <div style={{ position: 'relative' }}>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{
                      background: 'rgba(75, 85, 99, 0.5)',
                      border: '1px solid rgba(107, 114, 128, 0.5)',
                      borderRadius: '8px',
                      padding: '8px 32px 8px 16px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">Все статусы</option>
                    <option value="active">Активные</option>
                    <option value="inactive">Остановленные</option>
                  </select>
                  <span style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#9ca3af'
                  }}>⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bots Grid */}
      {filteredBots.length === 0 ? (
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-2px',
            background: 'linear-gradient(to right, rgba(107, 114, 128, 0.2), rgba(75, 85, 99, 0.2))',
            borderRadius: '12px',
            opacity: 0.2,
            filter: 'blur(4px)'
          }}></div>
          <div style={{
            position: 'relative',
            background: 'rgba(55, 65, 81, 0.8)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(75, 85, 99, 0.5)',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <div style={{
              margin: '0 auto 16px',
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.2), rgba(75, 85, 99, 0.2))',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              🤖
            </div>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '500', 
              color: 'white', 
              marginBottom: '8px' 
            }}>
              {searchTerm || filterPlatform !== 'all' || filterStatus !== 'all' 
                ? 'Боты не найдены' 
                : 'У вас пока нет ботов'}
            </h3>
            <p style={{ 
              color: '#9ca3af', 
              marginBottom: '24px' 
            }}>
              {searchTerm || filterPlatform !== 'all' || filterStatus !== 'all'
                ? 'Попробуйте изменить фильтры поиска'
                : 'Начните с создания вашего первого бота'}
            </p>
            <Link
              href="/bots/new"
              style={{
                position: 'relative',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: '-2px',
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                borderRadius: '8px',
                opacity: 0.3,
                filter: 'blur(4px)'
              }}></div>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '500'
              }}>
                <span style={{ marginRight: '8px' }}>➕</span>
                Создать бота
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
        }}>
          {filteredBots.map((bot, index) => (
            <div
              key={bot.id}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute',
                inset: '-2px',
                background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2), rgba(34, 197, 94, 0.2))',
                borderRadius: '12px',
                opacity: 0.2,
                filter: 'blur(4px)'
              }}></div>
              <div style={{
                position: 'relative',
                background: 'rgba(55, 65, 81, 0.8)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(75, 85, 99, 0.5)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.5)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      padding: '8px',
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                      borderRadius: '8px'
                    }}>
                      <span style={{ fontSize: '24px' }}>🤖</span>
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: 'white',
                        margin: 0,
                        marginBottom: '4px'
                      }}>{bot.name}</h3>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        background: platformConfig[bot.platform].color.bg,
                        color: platformConfig[bot.platform].color.text,
                        border: `1px solid ${platformConfig[bot.platform].color.border}`
                      }}>
                        {platformConfig[bot.platform].icon} {platformConfig[bot.platform].name}
                      </span>
                    </div>
                  </div>
                  <button style={{
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.background = 'rgba(75, 85, 99, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.background = 'transparent';
                  }}>
                    ⋮
                  </button>
                </div>

                {/* Description */}
                <p style={{
                  color: '#9ca3af',
                  fontSize: '14px',
                  marginBottom: '16px',
                  lineHeight: '1.5'
                }}>{bot.description}</p>

                {/* Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: 'white'
                    }}>{bot.users}</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#9ca3af'
                    }}>Пользователи</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#22c55e'
                    }}>{bot.messages}</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#9ca3af'
                    }}>Сообщения</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#a78bfa'
                    }}>{bot.successRate}%</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#9ca3af'
                    }}>Успешность</div>
                  </div>
                </div>

                {/* Status */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: bot.isActive ? '#22c55e' : '#6b7280'
                    }}></div>
                    <span style={{
                      fontSize: '14px',
                      color: bot.isActive ? '#22c55e' : '#6b7280'
                    }}>
                      {bot.isActive ? 'Активен' : 'Остановлен'}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    <span>🕐</span>
                    <span>{bot.lastActivity}</span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    href={`/bots/${bot.id}/edit`}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 12px',
                      background: 'rgba(75, 85, 99, 0.5)',
                      color: '#d1d5db',
                      fontSize: '14px',
                      fontWeight: '500',
                      borderRadius: '8px',
                      border: '1px solid rgba(107, 114, 128, 0.5)',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(107, 114, 128, 0.5)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'rgba(156, 163, 175, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(75, 85, 99, 0.5)';
                      e.currentTarget.style.color = '#d1d5db';
                      e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.5)';
                    }}
                  >
                    <span style={{ marginRight: '4px' }}>✏️</span>
                    Править
                  </Link>
                  <Link
                    href={`/bots/${bot.id}/analytics`}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px 12px',
                      background: 'rgba(75, 85, 99, 0.5)',
                      color: '#d1d5db',
                      fontSize: '14px',
                      fontWeight: '500',
                      borderRadius: '8px',
                      border: '1px solid rgba(107, 114, 128, 0.5)',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(107, 114, 128, 0.5)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = 'rgba(156, 163, 175, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(75, 85, 99, 0.5)';
                      e.currentTarget.style.color = '#d1d5db';
                      e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.5)';
                    }}
                  >
                    <span style={{ marginRight: '4px' }}>📊</span>
                    Статистика
                  </Link>
                  <button style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    background: bot.isActive 
                      ? 'rgba(239, 68, 68, 0.2)' 
                      : 'rgba(34, 197, 94, 0.2)',
                    color: bot.isActive ? '#f87171' : '#22c55e',
                    borderColor: bot.isActive ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = bot.isActive 
                      ? 'rgba(239, 68, 68, 0.3)' 
                      : 'rgba(34, 197, 94, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = bot.isActive 
                      ? 'rgba(239, 68, 68, 0.2)' 
                      : 'rgba(34, 197, 94, 0.2)';
                  }}>
                    {bot.isActive ? '⏸️' : '▶️'}
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
