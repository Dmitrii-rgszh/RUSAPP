const features = [
  {
    icon: '🎨',
    title: 'Визуальный конструктор',
    description: 'Создавайте сложные сценарии простым перетаскиванием блоков. Никаких навыков программирования не требуется.'
  },
  {
    icon: '📱',
    title: 'Мультиплатформенность', 
    description: 'Один бот работает сразу в Telegram, WhatsApp, ВКонтакте и на вашем сайте.'
  },
  {
    icon: '🧠',
    title: 'AI-ассистент',
    description: 'Интеграция с ChatGPT для умных ответов на любые вопросы клиентов.'
  },
  {
    icon: '📊',
    title: 'Аналитика в реальном времени',
    description: 'Отслеживайте конверсии, популярные пути и поведение пользователей.'
  },
  {
    icon: '👥',
    title: 'CRM встроен',
    description: 'База клиентов, история переписки и сегментация аудитории из коробки.'
  },
  {
    icon: '🚀',
    title: 'Готовые шаблоны',
    description: '50+ проверенных шаблонов для разных бизнес-задач. Запуск за 5 минут.'
  }
]

export default function LandingFeatures() {
  return (
    <section className="landing-features" id="features">
      <div className="landing-features-container">
        <h2>Максимум возможностей</h2>
        <p>Все инструменты для создания умных ботов в одном месте</p>
        
        <div className="landing-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="landing-feature-card">
              <span className="landing-feature-icon">{feature.icon}</span>
              <h3 className="landing-feature-title">{feature.title}</h3>
              <p className="landing-feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}