import React from 'react';

export default function DashboardPage() {
  return (
    <div style={{ 
      padding: '24px',
      background: 'linear-gradient(135deg, #1f2937, #111827)',
      minHeight: '100vh',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #60a5fa, #a78bfa, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          Добро пожаловать в BotCraft!
        </h1>
        <p style={{ color: '#9ca3af' }}>
          Ваша панель управления ботами
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Card 1 */}
        <div style={{
          background: 'rgba(55, 65, 81, 0.8)',
          border: '1px solid rgba(75, 85, 99, 0.5)',
          borderRadius: '12px',
          padding: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              padding: '8px',
              borderRadius: '8px'
            }}>
              🤖
            </div>
            <span style={{ color: '#34d399', fontSize: '14px' }}>+12</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            52
          </div>
          <div style={{ fontSize: '14px', color: '#d1d5db' }}>
            Активные боты
          </div>
        </div>

        {/* Card 2 */}
        <div style={{
          background: 'rgba(55, 65, 81, 0.8)',
          border: '1px solid rgba(75, 85, 99, 0.5)',
          borderRadius: '12px',
          padding: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              padding: '8px',
              borderRadius: '8px'
            }}>
              💬
            </div>
            <span style={{ color: '#34d399', fontSize: '14px' }}>+12%</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            1,234
          </div>
          <div style={{ fontSize: '14px', color: '#d1d5db' }}>
            Сообщений сегодня
          </div>
        </div>

        {/* Card 3 */}
        <div style={{
          background: 'rgba(55, 65, 81, 0.8)',
          border: '1px solid rgba(75, 85, 99, 0.5)',
          borderRadius: '12px',
          padding: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              padding: '8px',
              borderRadius: '8px'
            }}>
              👥
            </div>
            <span style={{ color: '#34d399', fontSize: '14px' }}>+8%</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            342
          </div>
          <div style={{ fontSize: '14px', color: '#d1d5db' }}>
            Пользователи
          </div>
        </div>

        {/* Card 4 */}
        <div style={{
          background: 'rgba(55, 65, 81, 0.8)',
          border: '1px solid rgba(75, 85, 99, 0.5)',
          borderRadius: '12px',
          padding: '24px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              padding: '8px',
              borderRadius: '8px'
            }}>
              📈
            </div>
            <span style={{ color: '#34d399', fontSize: '14px' }}>+3%</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            89%
          </div>
          <div style={{ fontSize: '14px', color: '#d1d5db' }}>
            Успешность
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div style={{
        background: 'rgba(55, 65, 81, 0.8)',
        border: '1px solid rgba(75, 85, 99, 0.5)',
        borderRadius: '12px',
        padding: '24px',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          marginBottom: '24px' 
        }}>
          Последняя активность
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(75, 85, 99, 0.3)'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#60a5fa'
            }}></div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>
                Бот поддержки
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                Новое сообщение от пользователя
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}>
              2 мин назад
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(75, 85, 99, 0.3)'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#34d399'
            }}></div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>
                Бот продаж
              </div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                Завершена воронка продаж
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}>
              5 мин назад
            </div>
          </div>
        </div>
      </div>

      {/* Test Message */}
      <div style={{
        marginTop: '32px',
        padding: '16px',
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#34d399', marginBottom: '8px' }}>
          ✅ Стили работают!
        </h3>
        <p style={{ color: '#9ca3af' }}>
          Если вы видите эту красивую панель - дизайн применился успешно!
        </p>
      </div>
    </div>
  );
}
