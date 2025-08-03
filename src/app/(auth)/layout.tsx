import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

// Тот же шрифт для consistency
const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Авторизация - BotCraft',
  description: 'Войдите в BotCraft для создания ботов',
}

export default function AuthLayout({
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