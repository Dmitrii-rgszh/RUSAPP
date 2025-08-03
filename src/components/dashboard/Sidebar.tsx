"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Bot, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle 
} from "lucide-react"

const navigation = [
  { name: "Главная", href: "/dashboard", icon: LayoutDashboard },
  { name: "Боты", href: "/bots", icon: Bot },
  { name: "Контакты", href: "/contacts", icon: Users },
  { name: "Шаблоны", href: "/templates", icon: FileText },
]

const secondaryNavigation = [
  { name: "Настройки", href: "/settings", icon: Settings },
  { name: "Помощь", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-[#0A0A14] border-r border-white/10">
      <div className="flex items-center h-16 px-6">
        <span className="text-xl font-bold gradient-text">BotCraft</span>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-gradient-to-r from-[#818CF8]/20 to-[#A78BFA]/20 text-white border border-[#818CF8]/30"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive ? "text-[#818CF8]" : "text-gray-500 group-hover:text-gray-300"
                  )} />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
        
        <div className="mt-8">
          <ul className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200 group"
                  >
                    <Icon className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-300" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
      
      <div className="px-4 py-4 border-t border-white/10">
        <div className="glass rounded-lg p-4">
          <div className="mb-3">
            <p className="text-xs text-gray-400">Тариф</p>
            <p className="text-sm font-medium text-white">Старт</p>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">3 / 5 ботов</span>
              <span className="text-[#4ADE80]">60%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4ADE80] to-[#22C55E] transition-all duration-500" 
                style={{ width: "60%" }} 
              />
            </div>
          </div>
          <button className="mt-3 w-full text-xs text-[#818CF8] hover:text-[#A78BFA] transition-colors">
            Улучшить план →
          </button>
        </div>
      </div>
    </div>
  )
}
