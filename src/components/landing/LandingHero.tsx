'use client'
import { useRouter } from 'next/navigation'
import LandingPhoneMockup from './LandingPhoneMockup'

export default function LandingHero() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/register')
  }

  const handleWatchDemo = () => {
    // Здесь можно добавить модальное окно с демо
    console.log('Открыть демо')
  }

  return (
    <section className="landing-hero">
      <div className="landing-hero-content">
        <div className="landing-hero-text">
          <h1>
            Создайте <span className="highlight">умного бота</span> за 10 минут без программирования
          </h1>
          <p>
            Визуальный конструктор для создания ботов в Telegram, WhatsApp и ВКонтакте. 
            Автоматизируйте продажи и поддержку клиентов.
          </p>
          
          <div className="landing-hero-buttons">
            <button 
              className="landing-primary-btn" 
              onClick={handleGetStarted}
            >
              🚀 Начать бесплатно
            </button>
            <button 
              className="landing-secondary-btn"
              onClick={handleWatchDemo}
            >
              ▶️ Посмотреть демо
            </button>
          </div>

          <div className="landing-platforms">
            <div className="landing-platform-card">
              <div className="landing-platform-icon">📱</div>
              <div className="landing-platform-name">Telegram</div>
            </div>
            <div className="landing-platform-card">
              <div className="landing-platform-icon">💬</div>
              <div className="landing-platform-name">WhatsApp</div>
            </div>
            <div className="landing-platform-card">
              <div className="landing-platform-icon">🌐</div>
              <div className="landing-platform-name">ВКонтакте</div>
            </div>
          </div>
        </div>

        <div className="landing-hero-visual">
          <LandingPhoneMockup />
        </div>
      </div>
    </section>
  )
}