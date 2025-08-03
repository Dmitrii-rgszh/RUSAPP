import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MessageSquare, Users, TrendingUp } from "lucide-react"

const stats = [
  { name: "Активные боты", value: "5", icon: Bot, change: "+2" },
  { name: "Сообщений сегодня", value: "1,234", icon: MessageSquare, change: "+12%" },
  { name: "Пользователи", value: "342", icon: Users, change: "+8%" },
  { name: "Успешность", value: "89%", icon: TrendingUp, change: "+3%" },
]

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Добро пожаловать в BotCraft!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последняя активность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div>
                      <p className="text-sm font-medium">Бот поддержки</p>
                      <p className="text-xs text-gray-500">
                        Новое сообщение от пользователя
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">2 мин назад</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">➕ Создать нового бота</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">📊 Посмотреть аналитику</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium">📋 Выбрать шаблон</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
