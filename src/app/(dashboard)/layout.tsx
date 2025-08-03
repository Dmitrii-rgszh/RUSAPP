import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

// Настройка шрифта Inter
const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BotCraft - Создайте умного бота за 10 минут',
  description: 'Визуальный конструктор для создания ботов в Telegram, WhatsApp и ВКонтакте без программирования',
  keywords: 'боты, чат-боты, telegram, whatsapp, вконтакте, no-code, конструктор ботов',
  openGraph: {
    title: 'BotCraft - Создайте умного бота за 10 минут',
    description: 'Визуальный конструктор для создания ботов без программирования',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BotCraft - Создайте умного бота за 10 минут',
    description: 'Визуальный конструктор для создания ботов без программирования',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
