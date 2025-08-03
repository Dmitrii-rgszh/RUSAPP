import Link from "next/link";
import { Bot, Plus, MoreVertical } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function BotsPage() {
  const session = await getServerSession(authOptions);
  
  const bots = await prisma.bot.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Мои боты</h1>
          <p className="mt-2 text-gray-600">
            Управляйте своими ботами и создавайте новые
          </p>
        </div>
        <Link
          href="/dashboard/bots/new"
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Создать бота
        </Link>
      </div>

      {bots.length === 0 ? (
        <div className="rounded-lg bg-white p-12 text-center shadow">
          <Bot className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            У вас пока нет ботов
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Начните с создания вашего первого бота
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard/bots/new"
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Создать бота
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>
      )}
    </div>
  );
}

function BotCard({ bot }: { bot: any }) {
  const platformColors = {
    TELEGRAM: "bg-blue-100 text-blue-800",
    WHATSAPP: "bg-green-100 text-green-800",
    VK: "bg-indigo-100 text-indigo-800",
    WEBCHAT: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="relative rounded-lg bg-white p-6 shadow hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <Bot className="h-8 w-8 text-gray-400" />
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900">{bot.name}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {bot.description || "Без описания"}
      </p>
      
      <div className="mt-4 flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${platformColors[bot.platform]}`}>
          {bot.platform}
        </span>
        <span className={`text-sm ${bot.isActive ? "text-green-600" : "text-gray-500"}`}>
          {bot.isActive ? "Активен" : "Остановлен"}
        </span>
      </div>
      
      <div className="mt-6 flex gap-2">
        <Link
          href={`/dashboard/bots/${bot.id}/edit`}
          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Редактировать
        </Link>
        <Link
          href={`/dashboard/bots/${bot.id}/analytics`}
          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Аналитика
        </Link>
      </div>
    </div>
  );
}
