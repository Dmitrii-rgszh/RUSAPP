'use client'
import { useEffect, useState } from 'react'

type Message = {
  id: number
  type: 'bot' | 'user'
  text: string
  show: boolean
}

export default function LandingPhoneMockup() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const messageSequence: Omit<Message, 'show'>[] = [
      { 
        id: 1, 
        type: 'bot', 
        text: 'Привет! 👋 Я помогу вам с заказом. Что вас интересует?' 
      },
      { 
        id: 2, 
        type: 'user', 
        text: 'Хочу заказать пиццу' 
      },
      { 
        id: 3, 
        type: 'bot', 
        text: 'Отлично! У нас есть много вкусных вариантов 🍕\n\nКакой размер предпочитаете?' 
      }
    ]

    messageSequence.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { ...msg, show: true }])
      }, index * 1000)
    })
  }, [])

  return (
    <div className="landing-phone-mockup">
      <div className="landing-phone-screen">
        <div className="landing-chat-header">
          <div className="landing-bot-avatar">🤖</div>
          <div>
            <div style={{fontWeight: 600, fontSize: '16px'}}>Бот поддержки</div>
            <div style={{fontSize: '12px', color: 'rgba(255,255,255,0.6)'}}>онлайн</div>
          </div>
        </div>
        
        <div className="landing-chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`landing-message ${message.type}`}>
              {message.text}
            </div>
          ))}
          
          {messages.length >= 2 && (
            <div className="landing-quick-replies">
              <div className="landing-quick-reply">🍕 Маленькая</div>
              <div className="landing-quick-reply">🍕 Средняя</div>
              <div className="landing-quick-reply">🍕 Большая</div>
            </div>
          )}

          {messages.length >= 3 && (
            <div className="landing-typing-indicator">
              <div className="landing-typing-dot"></div>
              <div className="landing-typing-dot"></div>
              <div className="landing-typing-dot"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}