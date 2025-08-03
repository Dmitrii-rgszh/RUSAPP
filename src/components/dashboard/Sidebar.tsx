'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const mainNavigation = [
    { id: 'dashboard', name: 'Главная', icon: '🏠', href: '/dashboard', badge: null },
    { id: 'bots', name: 'Боты', icon: '🤖', href: '/bots', badge: 5 },
    { id: 'analytics', name: 'Аналитика', icon: '📊', href: '/analytics', badge: null },
    { id: 'contacts', name: 'Контакты', icon: '👥', href: '/contacts', badge: null },
    { id: 'templates', name: 'Шаблоны', icon: '📋', href: '/templates', badge: null },
    { id: 'integrations', name: 'Интеграции', icon: '⚡', href: '/integrations', badge: null },
  ];

  const secondaryNavigation = [
    { id: 'settings', name: 'Настройки', icon: '⚙️', href: '/settings' },
    { id: 'help', name: 'Помощь', icon: '❓', href: '/help' },
  ];

  const planData = {
    name: 'Старт',
    bots: { used: 3, total: 5 },
    messages: { used: 2340, total: 5000 }
  };

  return (
    <div style={{
      width: '256px',
      height: '100vh',
      background: 'rgba(17, 24, 39, 0.95)',
      backdropFilter: 'blur(12px)',
      borderRight: '1px solid rgba(75, 85, 99, 0.5)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px',
        borderBottom: '1px solid rgba(75, 85, 99, 0.5)'
      }}>
        <Link href="/dashboard" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none'
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              🤖
            </div>
            <div style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '12px',
              height: '12px',
              background: '#34d399',
              borderRadius: '50%',
              border: '2px solid #111827'
            }}></div>
          </div>
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              BotCraft
            </h1>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: 0
            }}>v2.1.0</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{
        flex: 1,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* Main Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  background: isActive 
                    ? 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                    : 'transparent',
                  color: isActive ? '#ffffff' : '#9ca3af',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.background = 'rgba(75, 85, 99, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ 
                  marginRight: '12px', 
                  fontSize: '16px',
                  color: isActive ? '#60a5fa' : '#6b7280'
                }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1 }}>{item.name}</span>
                
                {/* Badge */}
                {item.badge && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2px 8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #22c55e, #16a34a)',
                    color: 'white',
                    borderRadius: '12px'
                  }}>
                    {item.badge}
                  </span>
                )}
                
                {/* Active Indicator */}
                {isActive && (
                  <span style={{ 
                    marginLeft: '8px', 
                    color: '#60a5fa',
                    fontSize: '12px'
                  }}>
                    ▶
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{
          margin: '24px 0',
          borderTop: '1px solid rgba(75, 85, 99, 0.5)'
        }}></div>

        {/* Secondary Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  background: isActive 
                    ? 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
                    : 'transparent',
                  color: isActive ? '#ffffff' : '#9ca3af',
                  border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.background = 'rgba(75, 85, 99, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#9ca3af';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ 
                  marginRight: '12px', 
                  fontSize: '16px',
                  color: isActive ? '#60a5fa' : '#6b7280'
                }}>
                  {item.icon}
                </span>
                <span style={{ flex: 1 }}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Plan Information */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid rgba(75, 85, 99, 0.5)'
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-2px',
            background: 'linear-gradient(to right, #22c55e, #3b82f6)',
            borderRadius: '8px',
            opacity: 0.2,
            filter: 'blur(4px)'
          }}></div>
          
          <div style={{
            position: 'relative',
            background: 'rgba(55, 65, 81, 0.8)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(75, 85, 99, 0.5)',
            borderRadius: '8px',
            padding: '16px'
          }}>
            {/* Plan Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ 
                  fontSize: '16px', 
                  color: '#facc15' 
                }}>👑</span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#ffffff'
                }}>{planData.name}</span>
              </div>
              <span style={{
                fontSize: '12px',
                color: '#22c55e',
                fontWeight: '500'
              }}>АКТИВЕН</span>
            </div>

            {/* Usage Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Bots Usage */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  marginBottom: '4px'
                }}>
                  <span style={{ color: '#9ca3af' }}>Боты</span>
                  <span style={{
                    color: '#22c55e',
                    fontWeight: '500'
                  }}>
                    {planData.bots.used}/{planData.bots.total}
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  background: '#374151',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(planData.bots.used / planData.bots.total) * 100}%`,
                    background: 'linear-gradient(to right, #22c55e, #16a34a)',
                    transition: 'all 0.5s'
                  }}></div>
                </div>
              </div>

              {/* Messages Usage */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  marginBottom: '4px'
                }}>
                  <span style={{ color: '#9ca3af' }}>Сообщения</span>
                  <span style={{
                    color: '#3b82f6',
                    fontWeight: '500'
                  }}>
                    {planData.messages.used.toLocaleString()}/{planData.messages.total.toLocaleString()}
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  background: '#374151',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${(planData.messages.used / planData.messages.total) * 100}%`,
                    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                    transition: 'all 0.5s'
                  }}></div>
                </div>
              </div>
            </div>

            {/* Upgrade Button */}
            <button style={{
              width: '100%',
              marginTop: '16px',
              padding: '8px 12px',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #2563eb, #7c3aed)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #3b82f6, #8b5cf6)';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              <span>👑</span>
              <span>Улучшить план</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
