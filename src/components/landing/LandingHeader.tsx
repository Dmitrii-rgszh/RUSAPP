'use client'
import Link from 'next/link'

export default function LandingHeader() {
  return (
    <header className="landing-header">
      <nav className="landing-nav">
        <div className="landing-logo">🤖 BotCraft</div>
        <div className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Возможности</a>
          <a href="#templates" className="landing-nav-link">Шаблоны</a>
          <a href="#pricing" className="landing-nav-link">Цены</a>
          <a href="#help" className="landing-nav-link">Помощь</a>
          <Link href="/login" className="btn-primary">
            Войти
          </Link>
        </div>
      </nav>
    </header>
  )
}