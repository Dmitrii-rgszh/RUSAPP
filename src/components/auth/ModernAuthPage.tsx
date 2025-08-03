'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    // Имитация API запроса
    setTimeout(() => {
      setIsLoading(false)
      if (isLogin) {
        router.push('/dashboard')
      } else {
        alert('Регистрация успешна!')
        setIsLogin(true)
      }
    }, 1500)
  }

  return (
    <div className="auth-page">
      {/* Фоновые элементы */}
      <div className="auth-background">
        <div className="auth-bg-gradient"></div>
        <div className="auth-bg-shapes">
          <div className="auth-shape auth-shape-1"></div>
          <div className="auth-shape auth-shape-2"></div>
          <div className="auth-shape auth-shape-3"></div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="auth-container">
        {/* Логотип и навигация */}
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            🤖 BotCraft
          </Link>
          <Link href="/" className="auth-back-link">
            ← На главную
          </Link>
        </div>

        {/* Форма авторизации */}
        <div className="auth-form-container">
          <div className="auth-form-card">
            {/* Заголовок */}
            <div className="auth-form-header">
              <h1 className="auth-title">
                {isLogin ? 'Добро пожаловать!' : 'Создать аккаунт'}
              </h1>
              <p className="auth-subtitle">
                {isLogin 
                  ? 'Войдите в свой аккаунт для управления ботами' 
                  : 'Зарегистрируйтесь и создайте первого бота бесплатно'
                }
              </p>
            </div>

            {/* Переключатель */}
            <div className="auth-toggle">
              <button
                type="button"
                className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Вход
              </button>
              <button
                type="button"
                className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Регистрация
              </button>
            </div>

            {/* Поля ввода */}
            <div className="auth-form">
              <div className="auth-input-group">
                <label htmlFor="email" className="auth-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="auth-input"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="auth-input-group">
                <label htmlFor="password" className="auth-label">
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="auth-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              {!isLogin && (
                <div className="auth-input-group">
                  <label htmlFor="confirmPassword" className="auth-label">
                    Повторите пароль
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="auth-input"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              {isLogin && (
                <div className="auth-forgot">
                  <Link href="/forgot-password" className="auth-forgot-link">
                    Забыли пароль?
                  </Link>
                </div>
              )}

              <button
                type="button"
                disabled={isLoading}
                onClick={handleSubmit}
                className="auth-submit-btn"
              >
                {isLoading ? (
                  <div className="auth-loading">
                    <div className="auth-spinner"></div>
                    {isLogin ? 'Входим...' : 'Создаем аккаунт...'}
                  </div>
                ) : (
                  <>
                    {isLogin ? '🚀 Войти' : '✨ Создать аккаунт'}
                  </>
                )}
              </button>
            </div>

            {/* Дополнительная информация */}
            <div className="auth-footer">
              {isLogin ? (
                <p className="auth-footer-text">
                  Нет аккаунта? {' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="auth-switch-link"
                  >
                    Зарегистрироваться
                  </button>
                </p>
              ) : (
                <p className="auth-footer-text">
                  Уже есть аккаунт? {' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="auth-switch-link"
                  >
                    Войти
                  </button>
                </p>
              )}
            </div>

            {/* Преимущества */}
            <div className="auth-benefits">
              <div className="auth-benefit">
                <span className="auth-benefit-icon">🎨</span>
                <span className="auth-benefit-text">Визуальный конструктор</span>
              </div>
              <div className="auth-benefit">
                <span className="auth-benefit-icon">⚡</span>
                <span className="auth-benefit-text">Быстрый запуск</span>
              </div>
              <div className="auth-benefit">
                <span className="auth-benefit-icon">📱</span>
                <span className="auth-benefit-text">Все мессенджеры</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .auth-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .auth-bg-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0F0C29 0%, #24243e 50%, #16213e 100%);
        }

        .auth-bg-shapes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .auth-shape {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, transparent 70%);
          animation: float 8s ease-in-out infinite;
        }

        .auth-shape-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        }

        .auth-shape-2 {
          width: 200px;
          height: 200px;
          bottom: 15%;
          left: 5%;
          animation-delay: -3s;
        }

        .auth-shape-3 {
          width: 150px;
          height: 150px;
          top: 50%;
          left: 15%;
          animation-delay: -1.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }

        .auth-container {
          width: 100%;
          max-width: 1200px;
          position: relative;
          z-index: 10;
        }

        .auth-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .auth-logo {
          font-size: 28px;
          font-weight: 700;
          color: white;
          text-decoration: none;
          background: linear-gradient(45deg, #818CF8, #A78BFA);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-back-link {
          color: #A1A1AA;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .auth-back-link:hover {
          color: white;
          transform: translateX(-4px);
        }

        .auth-form-container {
          display: flex;
          justify-content: center;
        }

        .auth-form-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 48px;
          backdrop-filter: blur(20px);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
          width: 100%;
          max-width: 480px;
          position: relative;
          overflow: hidden;
        }

        .auth-form-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.5), transparent);
        }

        .auth-form-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .auth-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-subtitle {
          color: #A1A1AA;
          font-size: 16px;
          line-height: 1.5;
        }

        .auth-toggle {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 32px;
        }

        .auth-toggle-btn {
          flex: 1;
          padding: 12px 24px;
          border: none;
          background: transparent;
          color: #A1A1AA;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .auth-toggle-btn.active {
          background: linear-gradient(45deg, #818CF8, #A78BFA);
          color: white;
          box-shadow: 0 4px 20px rgba(129, 140, 248, 0.3);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .auth-label {
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
        }

        .auth-input {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 16px 20px;
          color: white;
          font-size: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .auth-input::placeholder {
          color: #71717A;
        }

        .auth-input:focus {
          outline: none;
          border-color: #818CF8;
          box-shadow: 0 0 20px rgba(129, 140, 248, 0.2);
          background: rgba(255, 255, 255, 0.12);
        }

        .auth-forgot {
          text-align: right;
          margin-top: -12px;
        }

        .auth-forgot-link {
          color: #818CF8;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .auth-forgot-link:hover {
          text-decoration: underline;
        }

        .auth-submit-btn {
          background: linear-gradient(45deg, #818CF8, #A78BFA);
          border: none;
          border-radius: 16px;
          padding: 18px 32px;
          color: white;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(129, 140, 248, 0.3);
          margin-top: 8px;
        }

        .auth-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(129, 140, 248, 0.4);
        }

        .auth-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .auth-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .auth-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .auth-footer {
          text-align: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .auth-footer-text {
          color: #A1A1AA;
          font-size: 14px;
        }

        .auth-switch-link {
          background: none;
          border: none;
          color: #818CF8;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .auth-benefits {
          display: flex;
          justify-content: space-between;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .auth-benefit {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .auth-benefit-icon {
          font-size: 24px;
        }

        .auth-benefit-text {
          color: #A1A1AA;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
        }

        @media (max-width: 768px) {
          .auth-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .auth-form-card {
            padding: 32px 24px;
            margin: 0 16px;
          }

          .auth-title {
            font-size: 28px;
          }

          .auth-benefits {
            flex-direction: column;
            gap: 16px;
          }

          .auth-benefit {
            flex-direction: row;
            text-align: left;
          }
        }
      `}</style>
    </div>
  )
}