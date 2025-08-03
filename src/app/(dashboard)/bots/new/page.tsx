"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const platforms = [
  {
    id: "TELEGRAM",
    name: "Telegram",
    description: "Самый простой для начала",
    color: "border-blue-500",
  },
  {
    id: "WHATSAPP",
    name: "WhatsApp",
    description: "Для бизнес-коммуникаций",
    color: "border-green-500",
  },
  {
    id: "VK",
    name: "ВКонтакте",
    description: "Для российской аудитории",
    color: "border-indigo-500",
  },
  {
    id: "WEBCHAT",
    name: "Веб-чат",
    description: "Виджет для сайта",
    color: "border-gray-500",
  },
];

export default function NewBotPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platform: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.platform) {
      setError("Выберите платформу");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании бота");
      }

      const bot = await response.json();
      router.push(`/dashboard/bots/${bot.id}/edit`);
    } catch (error) {
      setError("Произошла ошибка при создании бота");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href="/dashboard/bots"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к ботам
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Создание нового бота
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Название бота
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Например: Бот поддержки"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Описание (необязательно)
            </label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Краткое описание назначения бота"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Выберите платформу
            </label>
            <div className="grid grid-cols-2 gap-4">
              {platforms.map((platform) => (
                <label
                  key={platform.id}
                  className={`relative rounded-lg border-2 p-4 cursor-pointer hover:bg-gray-50 ${
                    formData.platform === platform.id
                      ? platform.color
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="platform"
                    value={platform.id}
                    className="sr-only"
                    onChange={(e) =>
                      setFormData({ ...formData, platform: e.target.value })
                    }
                  />
                  <div>
                    <p className="font-medium text-gray-900">
                      {platform.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {platform.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Создание..." : "Создать бота"}
            </button>
            <Link
              href="/dashboard/bots"
              className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Отмена
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}